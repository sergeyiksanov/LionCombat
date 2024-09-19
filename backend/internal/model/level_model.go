package model

type LevelResponse struct {
	ID          int64  `gorm:"column:id;primaryKey"`
	Name        string `gorm:"column:name"`
	Image       string `gorm:"column:image"`
	NeedPoints  int64  `gorm:"column:need_points"`
	LevelNumber int64  `gorm:"column:level_number"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt   int64  `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

type AddNewLevelRequest struct {
	ID          int64  `json:"id"`
	Name        string `json:"name" validate:"required"`
	Image       string `json:"image" validate:"required"`
	NeedPoints  int64  `json:"need_points" validate:"required"`
	LevelNumber int64  `json:"level_number" validate:"required"`
}
