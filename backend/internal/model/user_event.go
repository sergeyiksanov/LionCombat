package model

type UserEvent struct {
	ID          string `json:"id,omitempty"`
	LevelID     int64  `json:"level_id,omitempty"`
	CountPoints int64  `json:"count_points,omitempty"`
	CreatedAt   int64  `json:"created_at,omitempty"`
	UpdatedAt   int64  `json:"updated_at,omitempty"`
}
