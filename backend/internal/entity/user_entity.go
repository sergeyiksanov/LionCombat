package entity

type User struct {
	ID          string `gorm:"column:id;primaryKey"`
	Username    string `gorm:"column:username"`
	AvatarUrl   string `gorm:"column:avatar_url"`
	LevelID     int64  `gorm:"column:level_id"`
	CountPoints int64  `gorm:"column:count_points"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt   int64  `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

func (u *User) TableName() string {
	return "users"
}
