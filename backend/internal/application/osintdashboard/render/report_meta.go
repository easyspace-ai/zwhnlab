package render

import (
	"regexp"
	"strings"
	"time"
)

// ReportMeta is display metadata; body always comes from W6 markdown verbatim.
type ReportMeta struct {
	Title        string
	Topic        string
	Generated    time.Time
	VisualStyle  string // magazine | swiss | auto (auto → heuristic)
}

// MetaFromMarkdown builds display metadata from W6 markdown (body unchanged).
func MetaFromMarkdown(md string, topic string) ReportMeta {
	return metaFromMarkdown(md, topic)
}

func metaFromMarkdown(md string, topic string) ReportMeta {
	title := extractMarkdownTitle(md)
	if title == "" {
		title = strings.TrimSpace(topic)
	}
	if title == "" {
		title = "事实核查报告"
	}
	return ReportMeta{
		Title:     title,
		Topic:     strings.TrimSpace(topic),
		Generated: time.Now(),
	}
}

var h1Re = regexp.MustCompile(`(?m)^#\s+(.+)$`)

func extractMarkdownTitle(md string) string {
	if m := h1Re.FindStringSubmatch(md); len(m) > 1 {
		return strings.TrimSpace(m[1])
	}
	return ""
}
