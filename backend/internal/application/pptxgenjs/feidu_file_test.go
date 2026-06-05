package pptxgenjs

import (
	"os"
	"path/filepath"
	"testing"
)

func TestTryParseProductSchema_feiduFile(t *testing.T) {
	root := findMonorepoRoot(t)
	raw, err := os.ReadFile(filepath.Join(root, "data", "feidu schema.md"))
	if err != nil {
		t.Skip("feidu schema.md not found:", err)
	}
	doc, ok := TryParseProductSchema(string(raw))
	if !ok {
		t.Fatal("expected feidu schema.md to parse")
	}
	if len(doc.Slides) < 30 {
		t.Fatalf("expected many slides, got %d", len(doc.Slides))
	}
	outline := doc.ToOutlineJSON(0)
	schema := fallbackSchemaFromOutline(outline, doc.ThemePreset())
	if schema == "" {
		t.Fatal("empty schema")
	}
}

func findMonorepoRoot(t *testing.T) string {
	t.Helper()
	dir, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	for i := 0; i < 8; i++ {
		if _, err := os.Stat(filepath.Join(dir, "data", "feidu schema.md")); err == nil {
			return dir
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			break
		}
		dir = parent
	}
	t.Fatal("monorepo root not found")
	return ""
}
