package config

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
	"lioncombat.com/internal/delivery/http"
	"lioncombat.com/internal/delivery/http/route"
	"lioncombat.com/internal/repository"
	"lioncombat.com/internal/usecase"
)

type BootstrapConfig struct {
	DB       *gorm.DB
	App      *fiber.App
	Log      *logrus.Logger
	Validate *validator.Validate
	Config   *viper.Viper
}

func Bootstrap(config *BootstrapConfig) {
	// setup repositories
	userRepository := repository.NewUserRepository(config.Log)
	levelRepository := repository.NewLevelRepository(config.Log)

	// setup use cases
	userUseCase := usecase.NewUserUseCase(config.DB, config.Log, config.Validate, userRepository, levelRepository)
	levelUseCase := usecase.NewLevelUseCase(config.DB, config.Log, config.Validate, levelRepository)

	// setup controller
	userController := http.NewUserController(userUseCase, config.Log)
	levelController := http.NewLevelController(config.Log, levelUseCase)

	// setup middleware
	// authMiddleware := middleware.NewAuth(userUseCase)

	routeConfig := route.RouteConfig{
		App:             config.App,
		UserController:  userController,
		LevelController: levelController,
	}
	routeConfig.Setup()
}
