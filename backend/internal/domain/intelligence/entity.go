package intelligence

import "time"

// Skill 情报分析技能实体
type Skill struct {
	ID             string
	UserID         string
	Key            string
	Name           string
	Description    *string
	Icon           *string
	FormSchema     string
	PromptTemplate string
	IsEnabled      bool
	SortOrder      int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}
