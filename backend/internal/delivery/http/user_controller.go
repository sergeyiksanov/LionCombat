package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"lioncombat.com/internal/model"
	"lioncombat.com/internal/usecase"
)

type UserController struct {
	Log     *logrus.Logger
	UseCase *usecase.UserUseCase
}

func NewUserController(useCase *usecase.UserUseCase, logger *logrus.Logger) *UserController {
	return &UserController{
		Log:     logger,
		UseCase: useCase,
	}
}

func (c *UserController) AddPointsToUser(ctx *fiber.Ctx) error {
	// token := ctx.Get("Authorization", "null")
	// if token != "auth token" {
	// 	c.Log.Warnf("Incorrect auth token")
	// 	return fiber.ErrUnauthorized
	// }

	request := new(model.UpdateUserCountPointsRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.AddPointsToUser(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed add points to user : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.UserResponse]{Data: response})
}

func (c *UserController) Auth(ctx *fiber.Ctx) error {
	// token := ctx.Get("Authorization", "null")
	// if token != "auth token" {
	// 	c.Log.Warnf("Incorrect auth token")
	// 	return fiber.ErrUnauthorized
	// }

	request := new(model.AuthUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.AuthUser(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to register user : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.UserResponse]{Data: response})
}

func (c *UserController) GetRating(ctx *fiber.Ctx) error {
	response, err := c.UseCase.GetRating(ctx.UserContext())

	if err != nil {
		c.Log.Warnf("Failed to get rating : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*[]model.UserResponse]{Data: response})
}
