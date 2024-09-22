package model

type UserResponse struct {
	ID          string `gorm:"column:id;primaryKey"`
	Username    string `gorm:"column:username"`
	AvatarUrl   string `gorm:"column:avatar"`
	LevelID     int64  `gorm:"column:level_id"`
	CountPoints int64  `gorm:"column:count_points"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt   int64  `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

type AuthUserRequest struct {
	ID        string `json:"id" validate:"required"`
	Username  string `json:"username" validate:"required"`
	AvatarUrl string `json:"avatar_url"`
}

type UpdateUserCountPointsRequest struct {
	ID             string `json:"id" validate:"required"`
	AddCountPoints int64  `json:"add_count_points" validate:"required"`
}
