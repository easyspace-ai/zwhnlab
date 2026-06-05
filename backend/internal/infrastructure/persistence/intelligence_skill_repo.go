package persistence

import (
	"github.com/easyspace-ai/ylmnote/internal/domain/intelligence"
)

// IntelligenceSkillRepository 情报技能仓储 GORM 实现
type IntelligenceSkillRepository struct {
	db *DB
}

func NewIntelligenceSkillRepository(db *DB) intelligence.Repository {
	return &IntelligenceSkillRepository{db: db}
}

func (r *IntelligenceSkillRepository) Create(s *intelligence.Skill) error {
	return r.db.Create(toIntelligenceSkillModel(s)).Error
}

func (r *IntelligenceSkillRepository) GetByID(id, userID string) (*intelligence.Skill, error) {
	var model IntelligenceSkillModel
	if err := r.db.Where("id = ? AND user_id = ?", id, userID).First(&model).Error; err != nil {
		return nil, err
	}
	return toIntelligenceSkillEntity(&model), nil
}

func (r *IntelligenceSkillRepository) GetByKey(key, userID string) (*intelligence.Skill, error) {
	var model IntelligenceSkillModel
	if err := r.db.Where("key = ? AND user_id = ?", key, userID).First(&model).Error; err != nil {
		return nil, err
	}
	return toIntelligenceSkillEntity(&model), nil
}

func (r *IntelligenceSkillRepository) ListByUserID(userID string) ([]*intelligence.Skill, error) {
	var list []IntelligenceSkillModel
	if err := r.db.Where("user_id = ?", userID).Order("sort_order ASC, updated_at DESC").Find(&list).Error; err != nil {
		return nil, err
	}
	out := make([]*intelligence.Skill, len(list))
	for i := range list {
		out[i] = toIntelligenceSkillEntity(&list[i])
	}
	return out, nil
}

func (r *IntelligenceSkillRepository) Update(s *intelligence.Skill) error {
	model := toIntelligenceSkillModel(s)
	return r.db.Model(&IntelligenceSkillModel{}).Where("id = ? AND user_id = ?", s.ID, s.UserID).Updates(model).Error
}

func (r *IntelligenceSkillRepository) Delete(id, userID string) error {
	res := r.db.Where("id = ? AND user_id = ?", id, userID).Delete(&IntelligenceSkillModel{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return gormErrNotFound
	}
	return nil
}

func toIntelligenceSkillModel(s *intelligence.Skill) *IntelligenceSkillModel {
	return &IntelligenceSkillModel{
		ID:             s.ID,
		UserID:         s.UserID,
		Key:            s.Key,
		Name:           s.Name,
		Description:    s.Description,
		Icon:           s.Icon,
		FormSchema:     s.FormSchema,
		PromptTemplate: s.PromptTemplate,
		IsEnabled:      s.IsEnabled,
		SortOrder:      s.SortOrder,
		CreatedAt:      s.CreatedAt,
		UpdatedAt:      s.UpdatedAt,
	}
}

func toIntelligenceSkillEntity(m *IntelligenceSkillModel) *intelligence.Skill {
	return &intelligence.Skill{
		ID:             m.ID,
		UserID:         m.UserID,
		Key:            m.Key,
		Name:           m.Name,
		Description:    m.Description,
		Icon:           m.Icon,
		FormSchema:     m.FormSchema,
		PromptTemplate: m.PromptTemplate,
		IsEnabled:      m.IsEnabled,
		SortOrder:      m.SortOrder,
		CreatedAt:      m.CreatedAt,
		UpdatedAt:      m.UpdatedAt,
	}
}
