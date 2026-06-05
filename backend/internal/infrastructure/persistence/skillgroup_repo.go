package persistence

import (
	"github.com/easyspace-ai/ylmnote/internal/application/skillgroup"
)

// SkillGroupRepository 技能组仓储 GORM 实现
type SkillGroupRepository struct {
	db *DB
}

func NewSkillGroupRepository(db *DB) skillgroup.Repository {
	return &SkillGroupRepository{db: db}
}

func (r *SkillGroupRepository) Create(g *skillgroup.SkillGroup) error {
	m := &SkillGroupModel{
		ID:          g.ID,
		Name:        g.Name,
		Description: g.Description,
		SkillIDs:    g.SkillIDs,
		RoleID:      g.RoleID,
		CreatedAt:   g.CreatedAt,
		UpdatedAt:   g.UpdatedAt,
	}
	return r.db.Create(m).Error
}

func (r *SkillGroupRepository) GetByID(id string) (*skillgroup.SkillGroup, error) {
	var m SkillGroupModel
	if err := r.db.Where("id = ?", id).First(&m).Error; err != nil {
		return nil, err
	}
	return toSkillGroupEntity(&m), nil
}

func (r *SkillGroupRepository) Update(g *skillgroup.SkillGroup) error {
	m := &SkillGroupModel{
		ID:          g.ID,
		Name:        g.Name,
		Description: g.Description,
		SkillIDs:    g.SkillIDs,
		RoleID:      g.RoleID,
		CreatedAt:   g.CreatedAt,
		UpdatedAt:   g.UpdatedAt,
	}
	return r.db.Save(m).Error
}

func (r *SkillGroupRepository) Delete(id string) error {
	return r.db.Where("id = ?", id).Delete(&SkillGroupModel{}).Error
}

func (r *SkillGroupRepository) ListAll() ([]*skillgroup.SkillGroup, error) {
	var models []SkillGroupModel
	if err := r.db.Order("created_at DESC").Find(&models).Error; err != nil {
		return nil, err
	}
	groups := make([]*skillgroup.SkillGroup, len(models))
	for i, m := range models {
		groups[i] = toSkillGroupEntity(&m)
	}
	return groups, nil
}

func toSkillGroupEntity(m *SkillGroupModel) *skillgroup.SkillGroup {
	return &skillgroup.SkillGroup{
		ID:          m.ID,
		Name:        m.Name,
		Description: m.Description,
		SkillIDs:    []string(m.SkillIDs),
		RoleID:      m.RoleID,
		CreatedAt:   m.CreatedAt,
		UpdatedAt:   m.UpdatedAt,
	}
}
