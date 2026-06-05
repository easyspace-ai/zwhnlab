package intelligence

// Repository 情报技能仓储接口
type Repository interface {
	Create(s *Skill) error
	GetByID(id, userID string) (*Skill, error)
	GetByKey(key, userID string) (*Skill, error)
	ListByUserID(userID string) ([]*Skill, error)
	Update(s *Skill) error
	Delete(id, userID string) error
}
