package converter

import (
	"lioncombat.com/internal/entity"
	"lioncombat.com/internal/model"
)

func UserToResponse(user *entity.User) *model.UserResponse {
	return &model.UserResponse{
		ID:          user.ID,
		LevelID:     user.LevelID,
		CountPoints: user.CountPoints,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	}
}

func UserToEvent(user *entity.User) *model.UserEvent {
	return &model.UserEvent{
		ID:          user.ID,
		LevelID:     user.LevelID,
		CountPoints: user.CountPoints,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	}
}
