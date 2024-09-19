package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"lioncombat.com/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	logger := config.NewLogger(viperConfig)
	logger.Info("Starring worker service")

	ctx, cancel := context.WithCancel(context.Background())

	go RunUserConsumner(logger, viperConfig, &ctx)

	terminateSignals := make(chan os.Signal, 1)
	signal.Notify(terminateSignals, syscall.SIGINT, syscall.SIGKILL, syscall.SIGTERM)

	stop := false
	for !stop {
		select {
		case s := <-terminateSignals:
			logger.Info("Got one of stop signals, shutting down worker gracefully, SIGNAL NAME :", s)
			cancel()
			stop = true
		}
	}

	time.Sleep(5 * time.Second)
}

func RunUserConsumner(logger *logrus.Logger, viperConfig *viper.Viper, ctx *context.Context) {
	logger.Info("setup user consumner")
}
