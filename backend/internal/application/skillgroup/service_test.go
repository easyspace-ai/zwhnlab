package skillgroup

import (
	"path/filepath"
	"testing"
	"time"
)

type memRepo struct {
	groups map[string]*SkillGroup
}

func (m *memRepo) Create(g *SkillGroup) error {
	m.groups[g.ID] = g
	return nil
}
func (m *memRepo) GetByID(id string) (*SkillGroup, error) {
	g, ok := m.groups[id]
	if !ok {
		return nil, ErrGroupNotFound
	}
	return g, nil
}
func (m *memRepo) Update(g *SkillGroup) error {
	m.groups[g.ID] = g
	return nil
}
func (m *memRepo) Delete(id string) error {
	delete(m.groups, id)
	return nil
}
func (m *memRepo) ListAll() ([]*SkillGroup, error) {
	out := make([]*SkillGroup, 0, len(m.groups))
	for _, g := range m.groups {
		out = append(out, g)
	}
	return out, nil
}

func TestSkillUsesW6RunnerAnySkillGroup(t *testing.T) {
	defaults := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults")
	repo := &memRepo{groups: map[string]*SkillGroup{
		GroupIntelligenceAnalyst: {
			ID:       GroupIntelligenceAnalyst,
			Name:     "情报分析",
			SkillIDs: []string{"fact_check", "info_research"},
		},
		"custom_group": {
			ID:       "custom_group",
			Name:     "自定义",
			SkillIDs: []string{"my_skill"},
		},
	}}
	svc := NewService(repo, defaults)

	if !svc.IsBuiltinGroupID(GroupIntelligenceAnalyst) {
		t.Fatal("intelligence_analyst should be builtin")
	}
	if svc.IsBuiltinGroupID("custom_group") {
		t.Fatal("custom_group should not be builtin")
	}
	if !svc.SkillUsesW6Runner("fact_check") {
		t.Fatal("fact_check in skill group should use W6")
	}
	if !svc.SkillUsesW6Runner("my_skill") {
		t.Fatal("custom group skill should use W6")
	}
	if svc.SkillUsesW6Runner("orphan_skill") {
		t.Fatal("skill not in any group should not use W6")
	}
}

func TestEnsureDefaultGroupsOnlyScansExistingDirs(t *testing.T) {
	defaults := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults")
	repo := &memRepo{groups: map[string]*SkillGroup{}}
	svc := NewService(repo, defaults)
	if err := svc.EnsureDefaultGroups(defaults, t.TempDir()); err != nil {
		t.Fatalf("EnsureDefaultGroups: %v", err)
	}
	groups, err := repo.ListAll()
	if err != nil {
		t.Fatal(err)
	}
	if len(groups) != 1 {
		t.Fatalf("expected 1 scanned group, got %d", len(groups))
	}
	if groups[0].ID != GroupIntelligenceAnalyst {
		t.Fatalf("unexpected group id %q", groups[0].ID)
	}
	if len(groups[0].SkillIDs) < 3 {
		t.Fatalf("expected at least 3 skills, got %v", groups[0].SkillIDs)
	}
	_ = time.Now()
}
