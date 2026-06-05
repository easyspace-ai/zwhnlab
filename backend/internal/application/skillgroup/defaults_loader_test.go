package skillgroup

import (
	"path/filepath"
	"testing"
)

func TestLoadDefaultGroupsFromDir(t *testing.T) {
	dir := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults")
	groups, err := LoadDefaultGroupsFromDir(dir)
	if err != nil {
		t.Fatal(err)
	}
	if len(groups) != 3 {
		t.Fatalf("expected 3 groups, got %d", len(groups))
	}
	byID := make(map[string]*SkillGroup, len(groups))
	for _, g := range groups {
		byID[g.ID] = g
	}
	want := map[string]struct {
		name     string
		minSkills int
	}{
		GroupBusinessConsultant:  {name: "商业咨询", minSkills: 3},
		GroupIntelligenceAnalyst: {name: "情报分析", minSkills: 5},
		GroupStockAnalyst:        {name: "股票分析", minSkills: 3},
	}
	for id, spec := range want {
		g, ok := byID[id]
		if !ok {
			t.Fatalf("missing group %q", id)
		}
		if g.Name != spec.name {
			t.Fatalf("group %q name %q, want %q", id, g.Name, spec.name)
		}
		if len(g.SkillIDs) < spec.minSkills {
			t.Fatalf("group %q has %d skills, want at least %d", id, len(g.SkillIDs), spec.minSkills)
		}
	}
}
