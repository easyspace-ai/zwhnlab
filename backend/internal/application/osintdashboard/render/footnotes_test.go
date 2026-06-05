package render

import (
	"strings"
	"testing"
)

func TestMarkdownToHTMLFootnoteLinks(t *testing.T) {
	md := `正文引用[^alpha]与[^beta]。

[^alpha]: [Alpha Source](https://example.com/a) - Example, 2026-01-01.
[^beta]: [Beta Source](https://example.com/b) - Example, 2026-01-02.
`
	out, err := MarkdownToHTML(md)
	if err != nil {
		t.Fatalf("MarkdownToHTML: %v", err)
	}

	if !strings.Contains(out, `href="#ref-alpha"`) {
		t.Fatalf("missing inline link to alpha: %s", out)
	}
	if !strings.Contains(out, `[^alpha]`) {
		t.Fatalf("missing visible alpha label: %s", out)
	}
	if !strings.Contains(out, `id="ref-alpha"`) {
		t.Fatalf("missing alpha anchor: %s", out)
	}
	if !strings.Contains(out, `id="ref-beta"`) {
		t.Fatalf("missing beta anchor: %s", out)
	}
	if !strings.Contains(out, `class="report-references"`) {
		t.Fatalf("missing references section: %s", out)
	}
	if !strings.Contains(out, `https://example.com/a`) {
		t.Fatalf("missing definition link: %s", out)
	}
}

func TestFootnotesSkipCodeBlocks(t *testing.T) {
	md := "Use `[^fake]` in code.\n\n```\n[^fake]\n```\n\nReal[^real].\n\n[^real]: real definition."
	out, err := MarkdownToHTML(md)
	if err != nil {
		t.Fatalf("MarkdownToHTML: %v", err)
	}
	if strings.Contains(out, `href="#ref-fake"`) {
		t.Fatalf("should not link footnote inside code block: %s", out)
	}
	if !strings.Contains(out, `href="#ref-real"`) {
		t.Fatalf("missing real footnote link: %s", out)
	}
}
