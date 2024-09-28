package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"lioncombat.com/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	log := config.NewLogger(viperConfig)
	db := config.NewDatabase(viperConfig, log)
	validate := config.NewValidator(viperConfig)
	app := config.NewFiber(viperConfig)

	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://lioncombat.hopto.org",     // Разрешенные источники
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,OPTIONS", // Разрешенные методы
	}))
	//app.Use(func(ctx *fiber.Ctx) error {
	//	allowedOrigins := []string{"https://lioncombat.hopto.org/", "https://lioncombat.hopto.org/rating", "https://lioncombat.hopto.org/levels", "https://lioncombat.hopto.org/prizes"} // Ваш домен
	//
	//	// Получаем заголовки Origin и Referer
	//	origin := ctx.Get("Origin")
	//	referer := ctx.Get("Referer")
	//	log.Warnf("FROM : %+v", origin)
	//
	//	// Если оба заголовка отсутствуют или не соответствуют разрешённому домену — блокируем запрос
	//	if (origin == "" && referer == "") || (!slices.Contains(allowedOrigins, origin) && !slices.Contains(allowedOrigins, referer)) {
	//		return ctx.Status(fiber.StatusForbidden).SendString("Запрос заблокирован: неразрешённый домен")
	//	}
	//
	//	return ctx.Next()
	//})

	config.Bootstrap(&config.BootstrapConfig{
		DB:       db,
		App:      app,
		Log:      log,
		Validate: validate,
		Config:   viperConfig,
	})

	webPort := viperConfig.GetInt("web.port")
	err := app.Listen(fmt.Sprintf(":%d", webPort))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
