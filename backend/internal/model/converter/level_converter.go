package converter

import (
	"lioncombat.com/internal/entity"
	"lioncombat.com/internal/model"
)

func LevelToResponse(level *entity.Level) *model.LevelResponse {
	return &model.LevelResponse{
		ID:          level.ID,
		Name:        level.Name,
		Image:       level.Image,
		NeedPoints:  level.NeedPoints,
		LevelNumber: level.LevelNumber,
		CreatedAt:   level.CreatedAt,
		UpdatedAt:   level.UpdatedAt,
	}
}

func LevelToEvent(level *entity.Level) *model.LevelEvent {
	return &model.LevelEvent{
		ID:          level.ID,
		Name:        level.Name,
		Image:       level.Image,
		NeedPoints:  level.NeedPoints,
		LevelNumber: level.LevelNumber,
		CreatedAt:   level.CreatedAt,
		UpdatedAt:   level.UpdatedAt,
	}
}
