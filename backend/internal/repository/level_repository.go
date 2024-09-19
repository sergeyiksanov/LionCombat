package repository

import (
	"github.com/sirupsen/logrus"
	"lioncombat.com/internal/entity"
)

type LevelRepository struct {
	Repository[entity.Level]
	Log *logrus.Logger
}

func NewLevelRepository(log *logrus.Logger) *LevelRepository {
	return &LevelRepository{
		Log: log,
	}
}
