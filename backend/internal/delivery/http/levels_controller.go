package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"lioncombat.com/internal/model"
	"lioncombat.com/internal/usecase"
)

type LevelController struct {
	Log     *logrus.Logger
	UseCase *usecase.LevelUseCase
}

func NewLevelController(logger *logrus.Logger, usecase *usecase.LevelUseCase) *LevelController {
	return &LevelController{
		Log:     logger,
		UseCase: usecase,
	}
}

func (c *LevelController) GetLevelById(ctx *fiber.Ctx) error {
	id := ctx.QueryInt("id", -1)

	if id == -1 {
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.GetLevelById(ctx.UserContext(), int64(id))
	if err != nil {
		c.Log.Warnf("Failed to get level by id : %+v", err)
		return fiber.ErrBadRequest
	}

	return ctx.JSON(model.WebResponse[*model.LevelResponse]{Data: response})
}

func (c *LevelController) AddNewLevel(ctx *fiber.Ctx) error {
	// token := ctx.Get("Authorization", "null")
	// if token != "auth token" {
	// 	c.Log.Warnf("Incorrect auth token")
	// 	return fiber.ErrUnauthorized
	// }

	request := new(model.AddNewLevelRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.AddNewLevel(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to add new level : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.LevelResponse]{Data: response})
}

func (c *LevelController) GetLevels(ctx *fiber.Ctx) error {
	response, err := c.UseCase.GetLevels(ctx.UserContext())
	if err != nil {
		c.Log.Warnf("Failed to get levels : %+v", err)
		return err
	}

	c.Log.Debugf("GET LEVELS: %+v", "get")

	return ctx.JSON(model.WebResponse[*[]model.LevelResponse]{Data: response})
}
