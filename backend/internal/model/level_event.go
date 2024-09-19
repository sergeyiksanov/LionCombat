package model

type LevelEvent struct {
	ID          int64  `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Image       string `json:"image,omitempty"`
	NeedPoints  int64  `json:"need_points,omitempty"`
	LevelNumber int64  `json:"level_number,omitempty"`
	CreatedAt   int64  `json:"created_at,omitempty"`
	UpdatedAt   int64  `json:"updated_at,omitempty"`
}
