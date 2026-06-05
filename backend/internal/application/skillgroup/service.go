package skillgroup

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

var (
	ErrGroupNotFound = errors.New("skill group not found")
)

// SkillGroup 技能组
type SkillGroup struct {
	ID          string
	Name        string
	Description *string
	SkillIDs    []string
	RoleID      *string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// Repository 技能组仓储接口
type Repository interface {
	Create(g *SkillGroup) error
	GetByID(id string) (*SkillGroup, error)
	Update(g *SkillGroup) error
	Delete(id string) error
	ListAll() ([]*SkillGroup, error)
}

// Service 技能组管理应用服务
type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// EnsureDefaultGroups 从 defaults/custom 子目录创建/补齐默认技能组
func (s *Service) EnsureDefaultGroups(defaultsDir, customDir string) error {
	expected, err := LoadMergedGroupsFromDirs(defaultsDir, customDir)
	if err != nil {
		return err
	}
	for _, g := range expected {
		existing, err := s.repo.GetByID(g.ID)
		if err != nil {
			if err := s.repo.Create(g); err != nil {
				return err
			}
			continue
		}
		needsUpdate := len(existing.SkillIDs) == 0 ||
			existing.Name != g.Name ||
			len(existing.SkillIDs) != len(g.SkillIDs)
		if needsUpdate {
			existing.Name = g.Name
			existing.Description = g.Description
			existing.SkillIDs = g.SkillIDs
			existing.UpdatedAt = time.Now().UTC()
			if err := s.repo.Update(existing); err != nil {
				return err
			}
		}
	}
	return nil
}

// SkillKeysForGroupIDs 合并多个技能组内的 skill key 集合
func (s *Service) SkillKeysForGroupIDs(groupIDs []string) (map[string]struct{}, error) {
	keys := make(map[string]struct{})
	for _, id := range groupIDs {
		g, err := s.repo.GetByID(id)
		if err != nil {
			continue
		}
		for _, k := range g.SkillIDs {
			k = strings.TrimSpace(k)
			if k != "" {
				keys[k] = struct{}{}
			}
		}
	}
	return keys, nil
}

func strPtr(s string) *string { return &s }

func (s *Service) Create(name string, description *string, skillIDs []string, roleID *string) (*SkillGroup, error) {
	now := time.Now().UTC()
	g := &SkillGroup{
		ID:          uuid.NewString(),
		Name:        name,
		Description: description,
		SkillIDs:    skillIDs,
		RoleID:      roleID,
		CreatedAt:   now,
		UpdatedAt:   now,
	}
	if err := s.repo.Create(g); err != nil {
		return nil, err
	}
	return g, nil
}

func (s *Service) Update(id string, name *string, description *string, skillIDs []string, roleID *string) (*SkillGroup, error) {
	g, err := s.repo.GetByID(id)
	if err != nil {
		return nil, ErrGroupNotFound
	}
	if name != nil {
		g.Name = *name
	}
	if description != nil {
		g.Description = description
	}
	g.SkillIDs = skillIDs
	g.RoleID = roleID
	g.UpdatedAt = time.Now().UTC()
	if err := s.repo.Update(g); err != nil {
		return nil, err
	}
	return g, nil
}

func (s *Service) Delete(id string) error {
	if _, err := s.repo.GetByID(id); err != nil {
		return ErrGroupNotFound
	}
	return s.repo.Delete(id)
}

func (s *Service) List() ([]*SkillGroup, error) {
	return s.repo.ListAll()
}

func (s *Service) Get(id string) (*SkillGroup, error) {
	return s.repo.GetByID(id)
}
