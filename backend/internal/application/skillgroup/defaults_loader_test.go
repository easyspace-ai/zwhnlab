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
	if len(groups) < 1 {
		t.Fatalf("expected at least 1 group, got %d", len(groups))
	}

	byID := make(map[string]*SkillGroup, len(groups))
	for _, g := range groups {
		byID[g.ID] = g
	}

	ia, ok := byID[GroupIntelligenceAnalyst]
	if !ok {
		t.Fatalf("missing group %q, got ids: %v", GroupIntelligenceAnalyst, groupIDs(groups))
	}
	if ia.Name != "情报分析" {
		t.Fatalf("group %q name %q, want 情报分析", GroupIntelligenceAnalyst, ia.Name)
	}
	if len(ia.SkillIDs) < 3 {
		t.Fatalf("group %q has %d skills, want at least 3", GroupIntelligenceAnalyst, len(ia.SkillIDs))
	}
}

func TestLoadMergedGroupsFromDirsSkipsMissingDefaultFolders(t *testing.T) {
	defaults := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults")
	groups, err := LoadMergedGroupsFromDirs(defaults, t.TempDir())
	if err != nil {
		t.Fatalf("should not fail when optional default folders are missing: %v", err)
	}
	for _, g := range groups {
		if g.ID == GroupBusinessConsultant || g.ID == GroupStockAnalyst {
			t.Fatalf("unexpected group %q when folder is absent on disk", g.ID)
		}
	}
}

func groupIDs(groups []*SkillGroup) []string {
	ids := make([]string, len(groups))
	for i, g := range groups {
		ids[i] = g.ID
	}
	return ids
}
