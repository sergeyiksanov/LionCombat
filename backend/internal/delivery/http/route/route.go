package route

import (
	"github.com/gofiber/fiber/v2"
	"lioncombat.com/internal/delivery/http"
)

type RouteConfig struct {
	App             *fiber.App
	UserController  *http.UserController
	LevelController *http.LevelController
}

func (c *RouteConfig) Setup() {
	c.SetupRoute()
}

func (c *RouteConfig) SetupRoute() {
	c.App.Post("/api/users/auth", c.UserController.Auth)
	c.App.Post("/api/users/add_points", c.UserController.AddPointsToUser)

	c.App.Post("/api/levels/add", c.LevelController.AddNewLevel)
	c.App.Get("/api/levels", c.LevelController.GetLevels)
	c.App.Get("/api/level", c.LevelController.GetLevelById)

	c.App.Get("/api/rating", c.UserController.GetRating)
}
