package skillgroup

import (
	"errors"
	"os"
	"path/filepath"
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
	repo        Repository
	defaultsDir string
}

func NewService(repo Repository, defaultsDir string) *Service {
	return &Service{repo: repo, defaultsDir: strings.TrimSpace(defaultsDir)}
}

// IsBuiltinGroupID is true when the group id matches a folder under data/skills/defaults/.
func (s *Service) IsBuiltinGroupID(groupID string) bool {
	groupID = strings.TrimSpace(groupID)
	if groupID == "" || s.defaultsDir == "" {
		return false
	}
	info, err := os.Stat(filepath.Join(s.defaultsDir, groupID))
	return err == nil && info.IsDir()
}

// SkillUsesW6Runner is true when the skill is listed in any managed skill group.
func (s *Service) SkillUsesW6Runner(skillKey string) bool {
	skillKey = strings.TrimSpace(skillKey)
	if skillKey == "" {
		return false
	}
	groups, err := s.repo.ListAll()
	if err != nil {
		return false
	}
	for _, g := range groups {
		for _, k := range g.SkillIDs {
			if strings.TrimSpace(k) == skillKey {
				return true
			}
		}
	}
	return false
}

// W6RunnerSkillKeys returns all skill keys assigned to skill groups.
func (s *Service) W6RunnerSkillKeys() map[string]struct{} {
	keys := make(map[string]struct{})
	groups, err := s.repo.ListAll()
	if err != nil {
		return keys
	}
	for _, g := range groups {
		for _, k := range g.SkillIDs {
			k = strings.TrimSpace(k)
			if k != "" {
				keys[k] = struct{}{}
			}
		}
	}
	return keys
}

// GroupUsesW6Runner is true for every managed skill group (skills submit via @w6).
func (s *Service) GroupUsesW6Runner(_ string) bool {
	return true
}

// EnsureDefaultGroups 从磁盘上实际存在的 defaults/custom 子目录创建/补齐技能组。
// 已删除且目录不存在的默认组不会重建；用户自建分组保留在 DB 中。
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
		if !skillIDsEqual(existing.SkillIDs, g.SkillIDs) {
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

func skillIDsEqual(a, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	seen := make(map[string]struct{}, len(a))
	for _, id := range a {
		id = strings.TrimSpace(id)
		if id == "" {
			continue
		}
		seen[id] = struct{}{}
	}
	for _, id := range b {
		id = strings.TrimSpace(id)
		if id == "" {
			continue
		}
		if _, ok := seen[id]; !ok {
			return false
		}
		delete(seen, id)
	}
	return len(seen) == 0
}

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
