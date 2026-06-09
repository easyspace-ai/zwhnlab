package render

import (
	stdhtml "html"
	"regexp"
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	gmhtml "github.com/yuin/goldmark/renderer/html"
)

var mdEngine = goldmark.New(
	goldmark.WithExtensions(
		extension.GFM,
		extension.DefinitionList,
	),
	goldmark.WithParserOptions(parser.WithAutoHeadingID()),
	goldmark.WithRendererOptions(
		gmhtml.WithHardWraps(),
		gmhtml.WithXHTML(),
		gmhtml.WithUnsafe(), // preserve inline HTML (footnote ref links, W6 inline HTML)
	),
)

// MarkdownToHTML converts markdown to semantic HTML without altering text content.
// GFM footnotes (`[^id]` / `[^id]:`) become clickable in-body refs plus an end section.
func MarkdownToHTML(md string) (string, error) {
	md = normalizeMarkdownEntities(md)
	if md == "" {
		return "", nil
	}
	bodyMD, footnotesHTML := transformFootnotes(md)
	out, err := markdownToHTMLCore(bodyMD)
	if err != nil {
		return "", err
	}
	if footnotesHTML != "" {
		out = strings.TrimSpace(out) + "\n" + footnotesHTML
	}
	return strings.TrimSpace(out), nil
}

// MarkdownToHTMLSafe falls back to simple converter on goldmark failure.
func MarkdownToHTMLSafe(md string) string {
	md = normalizeMarkdownEntities(md)
	bodyMD, footnotesHTML := transformFootnotes(md)
	out, err := markdownToHTMLCore(bodyMD)
	if err != nil || strings.TrimSpace(out) == "" {
		out = SimpleMarkdownToHTML(bodyMD)
	}
	if footnotesHTML != "" {
		out = strings.TrimSpace(out) + "\n" + footnotesHTML
	}
	return out
}

type tocEntry struct {
	Level int
	ID    string
	Text  string
}

var headingHTMLRe = regexp.MustCompile(`<h([1-6]) id="([^"]*)"[^>]*>([\s\S]*?)</h[1-6]>`)

func extractTOC(bodyHTML string) ([]tocEntry, string) {
	var entries []tocEntry
	bodyHTML = headingHTMLRe.ReplaceAllStringFunc(bodyHTML, func(match string) string {
		sub := headingHTMLRe.FindStringSubmatch(match)
		if len(sub) < 4 {
			return match
		}
		level := int(sub[1][0] - '0')
		if level < 2 || level > 3 {
			return match
		}
		text := stripTags(sub[3])
		if text == "" {
			return match
		}
		entries = append(entries, tocEntry{Level: level, ID: sub[2], Text: text})
		return match
	})
	return entries, bodyHTML
}

var tagStripRe = regexp.MustCompile(`<[^>]+>`)

func stripTags(s string) string {
	s = tagStripRe.ReplaceAllString(s, "")
	return strings.TrimSpace(stdhtml.UnescapeString(s))
}

// normalizeMarkdownEntities reverses HTML entity encoding from upstream W6 output
// (e.g. &quot; or &amp;quot;) so goldmark renders literal quotation marks.
func normalizeMarkdownEntities(md string) string {
	md = strings.TrimSpace(md)
	if md == "" {
		return ""
	}
	prev := ""
	for md != prev {
		prev = md
		md = stdhtml.UnescapeString(md)
	}
	return md
}
