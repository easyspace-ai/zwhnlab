package ppthtml

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestBuildDeckHTMLMagazine(t *testing.T) {
	skillDir := DefaultGuizangSkillDir()
	if skillDir == "" {
		t.Skip("guizang skill not installed")
	}
	slides := `<section class="slide hero dark"><div class="canvas"><h1 class="h-hero">Test</h1></div></section>`
	html, err := BuildDeckHTML(skillDir, "magazine", "Test Deck", slides)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(html, "<section class=\"slide hero dark\">") {
		t.Error("slides not injected")
	}
	if !strings.Contains(html, "<title>Test Deck</title>") {
		t.Error("title not set")
	}
	if strings.Contains(html, "<!-- SLIDES_HERE -->") {
		t.Error("placeholder still present")
	}
}

func TestDefaultGuizangSkillDirEnv(t *testing.T) {
	tmp := t.TempDir()
	tmpl := filepath.Join(tmp, "assets", "template.html")
	if err := os.MkdirAll(filepath.Dir(tmpl), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(tmpl, []byte("<html><title>x</title><!-- SLIDES_HERE --></html>"), 0o644); err != nil {
		t.Fatal(err)
	}
	t.Setenv("GUIZANG_SKILL_DIR", tmp)
	if got := DefaultGuizangSkillDir(); got != tmp {
		t.Errorf("got %q want %q", got, tmp)
	}
}
