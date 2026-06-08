package persistence

import (
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/role"
)

// RoleRepository 角色仓储 GORM 实现
type RoleRepository struct {
	db *DB
}

func NewRoleRepository(db *DB) role.Repository {
	return &RoleRepository{db: db}
}

func (r *RoleRepository) Create(ro *role.Role) error {
	m := &RoleModel{
		ID:           ro.ID,
		Name:         ro.Name,
		Description:  ro.Description,
		Permissions:  ro.Permissions,
		SkillGroupID: ro.SkillGroupID,
		CreatedAt:    ro.CreatedAt,
		UpdatedAt:    ro.UpdatedAt,
	}
	return r.db.Create(m).Error
}

func (r *RoleRepository) GetByID(id string) (*role.Role, error) {
	var m RoleModel
	if err := r.db.Where("id = ?", id).First(&m).Error; err != nil {
		return nil, err
	}
	return toRoleEntity(&m), nil
}

func (r *RoleRepository) GetByName(name string) (*role.Role, error) {
	var m RoleModel
	if err := r.db.Where("name = ?", name).First(&m).Error; err != nil {
		return nil, err
	}
	return toRoleEntity(&m), nil
}

func (r *RoleRepository) Update(ro *role.Role) error {
	m := &RoleModel{
		ID:           ro.ID,
		Name:         ro.Name,
		Description:  ro.Description,
		Permissions:  ro.Permissions,
		SkillGroupID: ro.SkillGroupID,
		CreatedAt:    ro.CreatedAt,
		UpdatedAt:    ro.UpdatedAt,
	}
	return r.db.Save(m).Error
}

func (r *RoleRepository) Delete(id string) error {
	return r.db.Where("id = ?", id).Delete(&RoleModel{}).Error
}

func (r *RoleRepository) ListAll() ([]*role.Role, error) {
	var models []RoleModel
	if err := r.db.Order("created_at DESC").Find(&models).Error; err != nil {
		return nil, err
	}
	roles := make([]*role.Role, len(models))
	for i, m := range models {
		roles[i] = toRoleEntity(&m)
	}
	return roles, nil
}

func toRoleEntity(m *RoleModel) *role.Role {
	return &role.Role{
		ID:           m.ID,
		Name:         m.Name,
		Description:  m.Description,
		Permissions:  []string(m.Permissions),
		SkillGroupID: m.SkillGroupID,
		CreatedAt:    m.CreatedAt,
		UpdatedAt:    m.UpdatedAt,
	}
}

func (r *RoleRepository) ensureDefaultRole() error {
	var count int64
	r.db.Model(&RoleModel{}).Count(&count)
	if count > 0 {
		return nil
	}
	now := time.Now().UTC()
	return r.db.Create(&RoleModel{
		ID:          "role_admin",
		Name:        "超级管理员",
		Description: strPtr("系统超级管理员，拥有所有权限"),
		Permissions: JSONSlice{"menu_admin", "user_manage", "role_manage", "skill_group_manage", "menu_aichat", "menu_osint_dashboard"},
		CreatedAt:   now,
		UpdatedAt:   now,
	}).Error
}

func strPtr(s string) *string { return &s }
