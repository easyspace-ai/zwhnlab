package pptxgenjs

import (
	"strings"
	"testing"
)

func TestNeedsProductSchemaNormalization_jsonAlways(t *testing.T) {
	raw := `{"document_title":"T","slides":[{"page_id":1,"page_type":"insight","headline":"A","body":["b"]}]}`
	if !NeedsProductSchemaNormalization("report.json", raw) {
		t.Fatal("expected .json to always need normalization")
	}
}

func TestIsCanonicalProductSchema(t *testing.T) {
	doc := &ProductSchema{
		DocumentTitle: "Report",
		Slides: []ProductSlide{
			{PageID: 1, PageType: "section_divider", Headline: "Cover"},
			{PageID: 2, PageType: "insight", Headline: "Point", Body: []string{"a"}},
		},
	}
	if !IsCanonicalProductSchema(doc) {
		t.Fatal("expected canonical")
	}
	doc.Slides = []ProductSlide{
		{PageID: 1, PageType: "insight", Headline: "Only typed"},
		{PageID: 2, Headline: "No type"},
		{PageID: 3, Headline: "No type 2"},
		{PageID: 4, Headline: "No type 3"},
	}
	if IsCanonicalProductSchema(doc) {
		t.Fatal("expected non-canonical when most slides lack page_type")
	}
}

func TestRepairProductSchema_defaults(t *testing.T) {
	doc := &ProductSchema{Slides: []ProductSlide{{Headline: "Only"}}}
	var warnings []string
	repairProductSchema(doc, &warnings)
	if doc.DocumentTitle == "" || doc.Slides[0].PageType != "insight" {
		t.Fatalf("repair failed: %+v", doc)
	}
	if len(warnings) == 0 {
		t.Fatal("expected warnings")
	}
}

func TestNeedsProductSchemaNormalization_canonicalMdSkips(t *testing.T) {
	raw := strings.TrimSpace(`{
  "document_title": "Report",
  "slides": [
    {"page_id": 1, "page_type": "section_divider", "headline": "Cover"},
    {"page_id": 2, "page_type": "insight", "headline": "Body", "body": ["x"]}
  ]
}`)
	if NeedsProductSchemaNormalization("deck.md", raw) {
		t.Fatal("canonical md-embedded json should skip normalization")
	}
}
