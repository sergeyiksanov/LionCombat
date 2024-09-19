package repository

import (
	"github.com/sirupsen/logrus"
	"lioncombat.com/internal/entity"
)

type UserRepository struct {
	Repository[entity.User]
	Log *logrus.Logger
}

func NewUserRepository(log *logrus.Logger) *UserRepository {
	return &UserRepository{
		Log: log,
	}
}
