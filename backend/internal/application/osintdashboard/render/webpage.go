package render

import (
	"context"
	"regexp"
	"strings"
)

// WebpageGenerator turns markdown into HTML via LLM.
type WebpageGenerator interface {
	GenerateWebpage(ctx context.Context, markdown string) (string, error)
}

// SimpleMarkdownToHTML is a fallback without LLM.
func SimpleMarkdownToHTML(md string) string {
	lines := strings.Split(md, "\n")
	var b strings.Builder
	inList := false
	for _, line := range lines {
		t := strings.TrimSpace(line)
		if t == "" {
			if inList {
				b.WriteString("</ul>")
				inList = false
			}
			b.WriteString("<p></p>")
			continue
		}
		if strings.HasPrefix(t, "### ") {
			b.WriteString("<h3>" + escape(t[4:]) + "</h3>")
			continue
		}
		if strings.HasPrefix(t, "## ") {
			b.WriteString("<h2>" + escape(t[3:]) + "</h2>")
			continue
		}
		if strings.HasPrefix(t, "# ") {
			b.WriteString("<h1>" + escape(t[2:]) + "</h1>")
			continue
		}
		if strings.HasPrefix(t, "- ") || strings.HasPrefix(t, "* ") {
			if !inList {
				b.WriteString("<ul>")
				inList = true
			}
			b.WriteString("<li>" + inlineFormat(t[2:]) + "</li>")
			continue
		}
		if inList {
			b.WriteString("</ul>")
			inList = false
		}
		if strings.HasPrefix(t, "**") && strings.HasSuffix(t, "**") {
			b.WriteString("<p><strong>" + escape(strings.Trim(t, "*")) + "</strong></p>")
			continue
		}
		b.WriteString("<p>" + inlineFormat(t) + "</p>")
	}
	if inList {
		b.WriteString("</ul>")
	}
	return b.String()
}

func escape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}

var boldRe = regexp.MustCompile(`\*\*(.+?)\*\*`)

func inlineFormat(s string) string {
	s = escape(s)
	return boldRe.ReplaceAllString(s, "<strong>$1</strong>")
}
