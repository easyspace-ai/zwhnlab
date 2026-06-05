package intelligence

import (
	"encoding/json"
	"path/filepath"
	"testing"
)

func TestLoadDefaultSkillsFromDir(t *testing.T) {
	dir := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults")
	list, err := LoadDefaultSkillsFromDir(dir)
	if err != nil {
		t.Fatal(err)
	}
	if len(list) < 5 {
		t.Fatalf("expected at least 5 defaults, got %d", len(list))
	}
	byKey := defaultSkillsByKey(list)
	for key := range BuiltinSkillKeys {
		if _, ok := byKey[key]; !ok {
			t.Fatalf("missing builtin key %q", key)
		}
	}

	// 与 data/*.md 原始设计对齐的默认值
	wantDefaults := map[string]map[string]any{
		"data_collection": {
			"time_range":   "1w",
			"min_sources":  "20",
			"source_types": []any{},
		},
		"fact_check": {
			"depth": "quick",
		},
		"info_research": {
			"depth":          "quick",
			"output_format":  "report",
			"source_types":   []any{},
		},
	}
	for key, fields := range wantDefaults {
		skill := byKey[key]
		var schema struct {
			Fields []struct {
				Name    string          `json:"name"`
				Default json.RawMessage `json:"default"`
			} `json:"fields"`
		}
		if err := json.Unmarshal([]byte(skill.FormSchema), &schema); err != nil {
			t.Fatalf("parse form_schema for %q: %v", key, err)
		}
		byName := make(map[string]json.RawMessage, len(schema.Fields))
		for _, f := range schema.Fields {
			byName[f.Name] = f.Default
		}
		for name, want := range fields {
			raw, ok := byName[name]
			if !ok || len(raw) == 0 {
				t.Fatalf("skill %q field %q: missing default", key, name)
			}
			wantRaw, _ := json.Marshal(want)
			if string(raw) != string(wantRaw) {
				t.Fatalf("skill %q field %q: default %s, want %s", key, name, raw, wantRaw)
			}
		}
	}
}
