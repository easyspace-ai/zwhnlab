package pptxgenjs

import (
	"strings"
	"testing"
)

func TestTryParseProductSchema_feiduShape(t *testing.T) {
	raw := `{
  "document_title": "测试报告",
  "total_pages": 3,
  "style": "deloitte",
  "slides": [
    {
      "page_id": 1,
      "page_type": "section_divider",
      "headline": "封面",
      "subtitle": "副标题"
    },
    {
      "page_id": 2,
      "page_type": "insight",
      "headline": "洞察",
      "body": ["要点一", "要点二"]
    },
    {
      "page_id": 3,
      "page_type": "conclusion",
      "headline": "结语",
      "body": ["谢谢"]
    }
  ]
}`
	doc, ok := TryParseProductSchema(raw)
	if !ok || doc == nil {
		t.Fatal("expected product schema parse")
	}
	if doc.Title() != "测试报告" {
		t.Fatalf("title=%q", doc.Title())
	}
	if doc.ThemePreset() != "midnight-exec" {
		t.Fatalf("theme=%q", doc.ThemePreset())
	}
	outline := doc.ToOutlineJSON(0)
	if !strings.Contains(outline, "cover_hero") && !strings.Contains(outline, "section_break") {
		t.Fatalf("missing cover preset in outline: %s", outline)
	}
	schema := fallbackSchemaFromOutline(outline, doc.ThemePreset())
	if schema == "" || !strings.Contains(schema, `"slides"`) {
		t.Fatal("expected slide schema from outline")
	}
}

func TestSuggestSlideCountFromText(t *testing.T) {
	if n := SuggestSlideCountFromText(strings.Repeat("x", 500)); n != 8 {
		t.Fatalf("short=%d", n)
	}
	if n := SuggestSlideCountFromText(strings.Repeat("x", 30000)); n < 16 {
		t.Fatalf("long=%d", n)
	}
}

func TestParseTargetSlideCount(t *testing.T) {
	got := ParseTargetSlideCount(map[string]string{"target_slide_count": "24"}, 8)
	if got != 24 {
		t.Fatalf("got %d", got)
	}
	got = ParseTargetSlideCount(map[string]string{"target_slide_count": "999"}, 8)
	if got != MaxSlideCount {
		t.Fatalf("clamp max got %d", got)
	}
}
