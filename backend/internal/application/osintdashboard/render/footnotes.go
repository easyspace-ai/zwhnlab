package render

import (
	"bytes"
	"fmt"
	"regexp"
	"strings"
)

var (
	footnoteRefRE       = regexp.MustCompile(`\[\^([^\]\s]+)\]`)
	footnoteDefRE       = regexp.MustCompile(`^\[\^([^\]\s]+)\]:\s?(.*)$`)
	referencesHeadingRE   = regexp.MustCompile(`(?i)^##\s+(参考来源|参考文献|References|引用|信源)\s*$`)
	fencedCodeBlockRE     = regexp.MustCompile("(?s)```.*?```")
	defaultReferencesHead = "参考来源"
)

type footnoteSplit struct {
	bodyLines    []string
	definitions  map[string]string
	definitionID []string
	refHeading   string
}

func splitFootnoteDefinitions(markdown string) footnoteSplit {
	lines := strings.Split(markdown, "\n")
	out := footnoteSplit{
		bodyLines:   make([]string, 0, len(lines)),
		definitions: map[string]string{},
	}

	for i := 0; i < len(lines); i++ {
		match := footnoteDefRE.FindStringSubmatch(lines[i])
		if match == nil {
			out.bodyLines = append(out.bodyLines, lines[i])
			continue
		}

		id := match[1]
		content := strings.TrimSpace(match[2])
		i++
		for i < len(lines) && strings.HasPrefix(lines[i], "    ") {
			content += "\n" + strings.TrimSpace(lines[i])
			i++
		}
		i--

		if _, exists := out.definitions[id]; !exists {
			out.definitionID = append(out.definitionID, id)
		}
		out.definitions[id] = strings.TrimSpace(content)
	}

	out.trimTrailingReferencesHeading()
	return out
}

func (s *footnoteSplit) trimTrailingReferencesHeading() {
	for len(s.bodyLines) > 0 && strings.TrimSpace(s.bodyLines[len(s.bodyLines)-1]) == "" {
		s.bodyLines = s.bodyLines[:len(s.bodyLines)-1]
	}
	if len(s.bodyLines) == 0 {
		return
	}
	last := strings.TrimSpace(s.bodyLines[len(s.bodyLines)-1])
	if m := referencesHeadingRE.FindStringSubmatch(last); m != nil {
		s.refHeading = strings.TrimSpace(m[1])
		s.bodyLines = s.bodyLines[:len(s.bodyLines)-1]
	}
}

func replaceFootnoteRefsOutsideCodeBlocks(markdown string, replacer func(id string) string) string {
	parts := fencedCodeBlockRE.Split(markdown, -1)
	codeBlocks := fencedCodeBlockRE.FindAllString(markdown, -1)
	var b strings.Builder
	for i, part := range parts {
		b.WriteString(footnoteRefRE.ReplaceAllStringFunc(part, func(full string) string {
			sub := footnoteRefRE.FindStringSubmatch(full)
			if len(sub) < 2 {
				return full
			}
			return replacer(sub[1])
		}))
		if i < len(codeBlocks) {
			b.WriteString(codeBlocks[i])
		}
	}
	return b.String()
}

func footnoteAnchorID(id string) string {
	return "ref-" + id
}

func footnoteRefLink(id string) string {
	anchor := footnoteAnchorID(id)
	label := escapeHTML("[^" + id + "]")
	return fmt.Sprintf(
		`<sup class="footnote-ref"><a href="#%s" class="cite-link">%s</a></sup>`,
		escapeHTML(anchor),
		label,
	)
}

func transformFootnotes(markdown string) (string, string) {
	split := splitFootnoteDefinitions(markdown)
	if len(split.definitions) == 0 {
		return markdown, ""
	}

	body := strings.Join(split.bodyLines, "\n")
	body = replaceFootnoteRefsOutsideCodeBlocks(body, func(id string) string {
		if _, ok := split.definitions[id]; !ok {
			return "[^" + id + "]"
		}
		return footnoteRefLink(id)
	})

	refsHTML := buildFootnotesSection(split.definitionID, split.definitions, split.refHeading)
	return body, refsHTML
}

func buildFootnotesSection(order []string, definitions map[string]string, heading string) string {
	if len(order) == 0 {
		return ""
	}
	if heading == "" {
		heading = defaultReferencesHead
	}

	var b strings.Builder
	b.WriteString(`<section class="report-references" aria-label="参考文献">`)
	b.WriteString(`<h2 id="references">`)
	b.WriteString(escapeHTML(heading))
	b.WriteString(`</h2><ol class="footnote-list">`)

	for _, id := range order {
		definition := definitions[id]
		contentHTML, err := markdownToHTMLCore(definition)
		if err != nil || strings.TrimSpace(contentHTML) == "" {
			contentHTML = "<p>" + escapeHTML(definition) + "</p>"
		} else {
			contentHTML = strings.TrimSpace(contentHTML)
		}

		b.WriteString(`<li id="`)
		b.WriteString(escapeHTML(footnoteAnchorID(id)))
		b.WriteString(`" class="footnote-item"><span class="footnote-label">`)
		b.WriteString(escapeHTML("[^" + id + "]"))
		b.WriteString(`</span> `)
		b.WriteString(contentHTML)
		b.WriteString(`</li>`)
	}

	b.WriteString(`</ol></section>`)
	return b.String()
}

// markdownToHTMLCore runs goldmark without footnote post-processing (avoids recursion).
func markdownToHTMLCore(md string) (string, error) {
	md = strings.TrimSpace(md)
	if md == "" {
		return "", nil
	}
	var buf bytes.Buffer
	if err := mdEngine.Convert([]byte(md), &buf); err != nil {
		return "", err
	}
	return strings.TrimSpace(buf.String()), nil
}
