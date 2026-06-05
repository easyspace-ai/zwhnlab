package ppthtml

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var titleRe = regexp.MustCompile(`(?is)<title>.*?</title>`)

// BuildDeckHTML injects generated slide sections into a guizang template.
func BuildDeckHTML(skillDir, style, title, slidesHTML string) (string, error) {
	skillDir = strings.TrimSpace(skillDir)
	if skillDir == "" {
		return "", fmt.Errorf("GUIZANG_SKILL_DIR not set and default skill path not found")
	}

	templateName := "template.html"
	if style == "swiss" {
		templateName = "template-swiss.html"
	}
	templatePath := filepath.Join(skillDir, "assets", templateName)
	raw, err := os.ReadFile(templatePath)
	if err != nil {
		return "", fmt.Errorf("read guizang template %s: %w", templatePath, err)
	}
	html := string(raw)

	slidesHTML = strings.TrimSpace(slidesHTML)
	if slidesHTML == "" {
		return "", fmt.Errorf("empty slides HTML")
	}

	if style == "swiss" {
		html = injectSwissSlides(html, slidesHTML)
	} else {
		html = strings.Replace(html, "<!-- SLIDES_HERE -->", slidesHTML, 1)
	}

	if title != "" {
		escaped := escapeHTML(title)
		html = titleRe.ReplaceAllString(html, fmt.Sprintf("<title>%s</title>", escaped))
	}

	return html, nil
}

func injectSwissSlides(html, slidesHTML string) string {
	marker := "<!-- SLIDES_HERE"
	start := strings.Index(html, marker)
	if start == -1 {
		return strings.Replace(html, "<!-- SLIDES_HERE -->", slidesHTML, 1)
	}
	endMarker := "</div>\n\n<div id=\"nav\">"
	end := strings.Index(html[start:], endMarker)
	if end == -1 {
		endMarker = "</div>\r\n\r\n<div id=\"nav\">"
		end = strings.Index(html[start:], endMarker)
	}
	if end == -1 {
		return strings.Replace(html, "<!-- SLIDES_HERE -->", slidesHTML, 1)
	}
	end = start + end
	return html[:start] + slidesHTML + "\n\n" + html[end:]
}

func escapeHTML(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}
