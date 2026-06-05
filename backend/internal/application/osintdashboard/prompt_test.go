package osintdashboard

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestRenderPromptTemplate_infoResearch(t *testing.T) {
	tpl := readSkillTemplate(t, "info_research.json")
	out, err := RenderPromptTemplate(tpl, map[string]interface{}{
		"topic":         "AI regulation",
		"output_format": "brief",
		"depth":         "quick",
	})
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "AI regulation") {
		t.Fatalf("expected topic in output: %s", out[:200])
	}
	if !strings.Contains(out, "简报") {
		t.Fatalf("expected brief format label")
	}
	if strings.Contains(out, "{{") {
		t.Fatalf("unrendered placeholders remain: %s", out)
	}
}

func TestRenderPromptTemplate_dataCollection(t *testing.T) {
	tpl := readSkillTemplate(t, "data_collection.json")
	out, err := RenderPromptTemplate(tpl, map[string]interface{}{
		"topic":       "supply chain risk",
		"time_range":  "1w",
		"min_sources": "20",
	})
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "supply chain risk") {
		t.Fatal("missing topic")
	}
	if strings.Contains(out, "{{") {
		t.Fatalf("unrendered placeholders remain")
	}
}

func TestRenderPromptTemplate_factCheck(t *testing.T) {
	tpl := readSkillTemplate(t, "fact_check.json")
	out, err := RenderPromptTemplate(tpl, map[string]interface{}{
		"target": "claim text",
		"depth":  "quick",
	})
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "claim text") {
		t.Fatal("missing target")
	}
	if strings.Contains(out, "{{#if") {
		t.Fatalf("unrendered conditionals remain")
	}
}

func readSkillTemplate(t *testing.T, name string) string {
	t.Helper()
	root := filepath.Join("..", "..", "..", "..", "data", "skills", "defaults", "intelligence_analyst")
	raw, err := os.ReadFile(filepath.Join(root, name))
	if err != nil {
		t.Fatalf("read template: %v", err)
	}
	var skill struct {
		PromptTemplate string `json:"prompt_template"`
	}
	if err := json.Unmarshal(raw, &skill); err != nil {
		t.Fatalf("parse skill json: %v", err)
	}
	return skill.PromptTemplate
}
