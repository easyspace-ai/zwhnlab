package intelligence

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

func TestLoadMergedSkillsFromDirs_customWins(t *testing.T) {
	root := t.TempDir()
	defaults := filepath.Join(root, "defaults")
	custom := filepath.Join(root, "custom")
	group := "intelligence_analyst"

	if err := os.MkdirAll(filepath.Join(defaults, group), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(filepath.Join(custom, group), 0o755); err != nil {
		t.Fatal(err)
	}

	base := defaultSkillFile{
		Key:            "fact_check",
		Name:           "默认名称",
		FormSchema:     json.RawMessage(`{"fields":[{"name":"target","label":"目标","type":"text","required":true}]}`),
		PromptTemplate: "default prompt",
		IsEnabled:      true,
		SortOrder:      1,
	}
	customFile := base
	customFile.Name = "自定义名称"

	writeJSON := func(dir string, raw defaultSkillFile) {
		b, _ := json.Marshal(raw)
		path := filepath.Join(dir, group, raw.Key+".json")
		if err := os.WriteFile(path, b, 0o644); err != nil {
			t.Fatal(err)
		}
	}
	writeJSON(defaults, base)
	writeJSON(custom, customFile)

	merged, err := LoadMergedSkillsFromDirs(defaults, custom)
	if err != nil {
		t.Fatal(err)
	}
	byKey := make(map[string]SkillFileRecord, len(merged))
	for _, rec := range merged {
		byKey[rec.Key] = rec
	}
	if byKey["fact_check"].Name != "自定义名称" {
		t.Fatalf("custom should win, got name %q", byKey["fact_check"].Name)
	}
}
