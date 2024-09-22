package usecase

import (
	"context"
	"sort"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"lioncombat.com/internal/entity"
	"lioncombat.com/internal/model"
	"lioncombat.com/internal/model/converter"
	"lioncombat.com/internal/repository"
)

type LevelUseCase struct {
	DB              *gorm.DB
	Log             *logrus.Logger
	Validate        *validator.Validate
	LevelRepository *repository.LevelRepository
}

func NewLevelUseCase(db *gorm.DB, logger *logrus.Logger, validate *validator.Validate, levelRepository *repository.LevelRepository) *LevelUseCase {
	return &LevelUseCase{
		DB:              db,
		Log:             logger,
		Validate:        validate,
		LevelRepository: levelRepository,
	}
}

func (c *LevelUseCase) GetLevelById(ctx context.Context, id int64) (*model.LevelResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	level := new(entity.Level)
	if err := c.LevelRepository.GetById(tx, level, id); err != nil {
		c.Log.Warnf("Failed find level by id : %+v", err)
		return nil, fiber.ErrNotFound
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.LevelToResponse(level), nil
}

func (c *LevelUseCase) GetLevels(ctx context.Context) (*[]model.LevelResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	levels, err := c.LevelRepository.GetAll(tx)
	if err != nil {
		c.Log.Warnf("Failed get levels : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("failed to commit transaction")
		return nil, fiber.ErrInternalServerError
	}

	responses := make([]model.LevelResponse, len(levels))
	for i, address := range levels {
		responses[i] = *converter.LevelToResponse(&address)
	}

	sort.Slice(responses, func(i, j int) bool {
		return responses[i].ID < responses[j].ID
	})

	return &responses, nil
}

func (c *LevelUseCase) AddNewLevel(ctx context.Context, request *model.AddNewLevelRequest) (*model.LevelResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
	}

	level := &entity.Level{
		Name:        request.Name,
		Image:       request.Image,
		LevelNumber: request.LevelNumber,
		NeedPoints:  request.NeedPoints,
	}

	if err := c.LevelRepository.Create(tx, level); err != nil {
		c.Log.Warnf("Failed to create level to database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed to commit transaction create level to database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.LevelToResponse(level), nil
}
