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

type UserUseCase struct {
	DB              *gorm.DB
	Log             *logrus.Logger
	Validate        *validator.Validate
	UserRepository  *repository.UserRepository
	LevelRepository *repository.LevelRepository
}

func NewUserUseCase(
	db *gorm.DB,
	logger *logrus.Logger,
	validate *validator.Validate,
	userRepository *repository.UserRepository,
	levelRepository *repository.LevelRepository,
) *UserUseCase {
	return &UserUseCase{
		DB:              db,
		Log:             logger,
		Validate:        validate,
		UserRepository:  userRepository,
		LevelRepository: levelRepository,
	}
}

func (c *UserUseCase) AddPointsToUser(ctx context.Context, request *model.UpdateUserCountPointsRequest) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	user := new(entity.User)
	if err := c.UserRepository.GetById(tx, user, request.ID); err != nil {
		c.Log.Warnf("User not found : %+v", err)
		return nil, fiber.ErrNotFound
	}

	nextLevel := new(entity.Level)
	if err := c.LevelRepository.GetById(tx, nextLevel, user.LevelID+1); err != nil {
		c.Log.Warnf("Failed to get user level : %+v", err)
		return nil, fiber.ErrInternalServerError
	}
	levelId := user.LevelID
	if user.CountPoints+request.AddCountPoints >= nextLevel.NeedPoints {
		levelId++
	}

	userNew := entity.User{
		ID:          user.ID,
		LevelID:     levelId,
		Username:    user.Username,
		CountPoints: request.AddCountPoints,
		CreatedAt:   user.CreatedAt,
	}

	if err := c.UserRepository.Update(tx, &userNew); err != nil {
		c.Log.Warnf("Failed to update user : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed to commit transaction create user to database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.UserToResponse(&userNew), nil
}

func (c *UserUseCase) GetRating(ctx context.Context) (*[]model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	users, err := c.UserRepository.GetAll(tx)
	if err != nil {
		c.Log.Warnf("Failed to get users : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("failed to commit transaction")
		return nil, fiber.ErrInternalServerError
	}

	sort.SliceStable(users, func(i, j int) bool {
		return users[i].CountPoints > users[j].CountPoints
	})

	responses := make([]model.UserResponse, len(users))
	for i, user := range users {
		responses[i] = *converter.UserToResponse(&user)
	}

	return &responses, nil
}

func (c *UserUseCase) AuthUser(ctx context.Context, request *model.AuthUserRequest) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	c.Log.Debugf("REQUEST: %+v", request)

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.ErrBadRequest
	}

	total, err := c.UserRepository.CountById(tx, request.ID)
	if err != nil {
		c.Log.Warnf("Failed count user from database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if total > 0 {
		user := new(entity.User)
		if err := c.UserRepository.GetById(tx, user, request.ID); err != nil {
			c.Log.Warnf("Failed get user by id : %+v", err)
			return nil, fiber.ErrInternalServerError
		}

		if err := tx.Commit().Error; err != nil {
			c.Log.Warnf("Failed commit transaction get user by id : %+v", err)
			return nil, fiber.ErrInternalServerError
		}

		return converter.UserToResponse(user), nil
	}

	user := &entity.User{
		ID:          request.ID,
		Username:    request.Username,
		AvatarUrl:   request.AvatarUrl,
		LevelID:     1,
		CountPoints: 0,
	}

	if err := c.UserRepository.Create(tx, user); err != nil {
		c.Log.Warnf("Failed to create user to database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed to commit transaction create user to database : %+v", err)
		return nil, fiber.ErrInternalServerError
	}

	return converter.UserToResponse(user), nil
}
