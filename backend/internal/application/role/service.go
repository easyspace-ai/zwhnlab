package role

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

var (
	ErrRoleNotFound = errors.New("role not found")
	ErrRoleExists   = errors.New("role name already exists")
)

// Role 角色/权限组
type Role struct {
	ID           string
	Name         string
	Description  *string
	Permissions  []string
	SkillGroupID *string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

// Repository 角色仓储接口
type Repository interface {
	Create(r *Role) error
	GetByID(id string) (*Role, error)
	GetByName(name string) (*Role, error)
	Update(r *Role) error
	Delete(id string) error
	ListAll() ([]*Role, error)
}

// UserRoleReader 用户绑定的权限组
type UserRoleReader interface {
	ListRoleIDsByUser(userID string) ([]string, error)
}

// Service 角色管理应用服务
type Service struct {
	repo         Repository
	userRoleRepo UserRoleReader
}

func NewService(repo Repository, userRoleRepo UserRoleReader) *Service {
	return &Service{repo: repo, userRoleRepo: userRoleRepo}
}

func (s *Service) Create(name string, description *string, permissions []string, skillGroupID *string) (*Role, error) {
	exists, _ := s.repo.GetByName(name)
	if exists != nil {
		return nil, ErrRoleExists
	}
	now := time.Now().UTC()
	r := &Role{
		ID:           uuid.NewString(),
		Name:         name,
		Description:  description,
		Permissions:  permissions,
		SkillGroupID: skillGroupID,
		CreatedAt:    now,
		UpdatedAt:    now,
	}
	if err := s.repo.Create(r); err != nil {
		return nil, err
	}
	return r, nil
}

func (s *Service) Update(id string, name *string, description *string, permissions []string, skillGroupID *string) (*Role, error) {
	r, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrRoleNotFound
	}
	if name != nil {
		existing, _ := s.repo.GetByName(*name)
		if existing != nil && existing.ID != id {
			return nil, ErrRoleExists
		}
		r.Name = *name
	}
	if description != nil {
		r.Description = description
	}
	r.Permissions = permissions
	r.SkillGroupID = skillGroupID
	r.UpdatedAt = time.Now().UTC()
	if err := s.repo.Update(r); err != nil {
		return nil, err
	}
	return r, nil
}

func (s *Service) Delete(id string) error {
	if _, err := s.repo.GetByID(id); err != nil {
		return ErrRoleNotFound
	}
	return s.repo.Delete(id)
}

func (s *Service) List() ([]*Role, error) {
	return s.repo.ListAll()
}

func (s *Service) Get(id string) (*Role, error) {
	return s.repo.GetByID(id)
}

// RoleIDsForUser 返回用户绑定的全部角色 ID
func (s *Service) RoleIDsForUser(userID string) ([]string, error) {
	if s.userRoleRepo == nil {
		return nil, nil
	}
	return s.userRoleRepo.ListRoleIDsByUser(userID)
}

// SkillGroupIDsForUser 返回用户角色关联的技能组 ID（去重）
func (s *Service) SkillGroupIDsForUser(userID string) ([]string, error) {
	roleIDs, err := s.RoleIDsForUser(userID)
	if err != nil {
		return nil, err
	}
	seen := make(map[string]struct{})
	var out []string
	for _, roleID := range roleIDs {
		ro, err := s.repo.GetByID(roleID)
		if err != nil || ro.SkillGroupID == nil {
			continue
		}
		sgid := strings.TrimSpace(*ro.SkillGroupID)
		if sgid == "" {
			continue
		}
		if _, ok := seen[sgid]; ok {
			continue
		}
		seen[sgid] = struct{}{}
		out = append(out, sgid)
	}
	return out, nil
}

// PermissionsForUser 合并用户绑定的全部权限组权限（去重）
func (s *Service) PermissionsForUser(userID string) ([]string, error) {
	if s.userRoleRepo == nil {
		return nil, nil
	}
	roleIDs, err := s.userRoleRepo.ListRoleIDsByUser(userID)
	if err != nil {
		return nil, err
	}
	seen := make(map[string]struct{})
	var out []string
	for _, roleID := range roleIDs {
		ro, err := s.repo.GetByID(roleID)
		if err != nil {
			continue
		}
		for _, p := range ro.Permissions {
			if _, ok := seen[p]; ok {
				continue
			}
			seen[p] = struct{}{}
			out = append(out, p)
		}
	}
	return out, nil
}
