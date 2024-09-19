package entity

type Level struct {
	ID          int64  `gorm:"column:id;primaryKey"`
	Name        string `gorm:"column:name;unique"`
	Image       string `gorm:"column:image"`
	NeedPoints  int64  `gorm:"column:need_points;unique"`
	LevelNumber int64  `gorm:"column:level_number;unique"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt   int64  `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

func (u *Level) TableName() string {
	return "levels"
}
