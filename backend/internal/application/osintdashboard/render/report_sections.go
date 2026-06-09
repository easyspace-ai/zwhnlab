package render

import (
	"html"
	"regexp"
	"strings"
)

type sectionKind string

const (
	sectionVerdict  sectionKind = "verdict"
	sectionEvidence sectionKind = "evidence"
	sectionSummary  sectionKind = "summary"
	sectionTimeline sectionKind = "timeline"
	sectionAction   sectionKind = "action"
	sectionCaveat   sectionKind = "caveat"
	sectionData     sectionKind = "data"
	sectionDefault  sectionKind = "default"
	sectionLead     sectionKind = "lead"
)

func classifySection(headingText string) sectionKind {
	h := strings.ToLower(strings.TrimSpace(headingText))
	rules := []struct {
		kind sectionKind
		keys []string
	}{
		{sectionVerdict, []string{"结论", "判定", "评级", "裁定", "verdict", "conclusion", "rating", "总体", "综合判断"}},
		{sectionEvidence, []string{"证据", "来源", "引用", "出处", "核查依据", "evidence", "source", "citation"}},
		{sectionSummary, []string{"摘要", "概述", "背景", "简介", "执行摘要", "summary", "overview", "abstract", "背景说明"}},
		{sectionTimeline, []string{"时间线", "脉络", "传播", "timeline", "chronology", "发展过程"}},
		{sectionAction, []string{"建议", "下一步", "后续", "行动", "recommend", "next step", "follow-up"}},
		{sectionCaveat, []string{"风险", "疑点", "局限", "注意", "免责声明", "caveat", "limitation", "uncertain", "待核实"}},
		{sectionData, []string{"数据", "统计", "指标", "对比", "figures", "metrics", "kpi"}},
	}
	for _, r := range rules {
		for _, k := range r.keys {
			if strings.Contains(h, k) {
				return r.kind
			}
		}
	}
	return sectionDefault
}

var h2StartRe = regexp.MustCompile(`(?i)<h2[\s>]`)

func wrapSection(kind sectionKind, inner string) string {
	return `<section class="report-section report-section--` + string(kind) +
		`"><div class="report-section__inner">` + inner + `</div></section>`
}

// enrichSections wraps content blocks after each h2 with semantic layout classes.
func enrichSections(bodyHTML string) string {
	locs := h2StartRe.FindAllStringIndex(bodyHTML, -1)
	if len(locs) == 0 {
		return wrapSection(sectionDefault, bodyHTML)
	}

	var b strings.Builder
	if preamble := strings.TrimSpace(bodyHTML[:locs[0][0]]); preamble != "" {
		b.WriteString(wrapSection(sectionLead, preamble))
	}
	for i, loc := range locs {
		end := len(bodyHTML)
		if i+1 < len(locs) {
			end = locs[i+1][0]
		}
		chunk := bodyHTML[loc[0]:end]
		kind := sectionDefault
		if m := headingHTMLRe.FindStringSubmatch(chunk); len(m) > 3 {
			kind = classifySection(stripTags(m[3]))
		}
		b.WriteString(wrapSection(kind, chunk))
	}
	return b.String()
}

func buildTOCNav(entries []tocEntry) string {
	if len(entries) == 0 {
		return ""
	}
	var b strings.Builder
	b.WriteString(`<nav class="report-toc" aria-label="报告目录"><p class="report-toc__label">目录</p><ol class="report-toc__list">`)
	for _, e := range entries {
		cls := "report-toc__item"
		if e.Level == 3 {
			cls += " report-toc__item--sub"
		}
		b.WriteString(`<li class="`)
		b.WriteString(cls)
		b.WriteString(`"><a href="#`)
		b.WriteString(e.ID)
		b.WriteString(`">`)
		b.WriteString(escapeHTML(e.Text))
		b.WriteString(`</a></li>`)
	}
	b.WriteString(`</ol></nav>`)
	return b.String()
}

func escapeHTML(s string) string {
	return html.EscapeString(s)
}

func pickVisualTheme(md string) string {
	// Swiss-leaning when report is data-heavy; magazine editorial by default.
	digits := 0
	for _, r := range md {
		if r >= '0' && r <= '9' {
			digits++
		}
	}
	tables := strings.Count(strings.ToLower(md), "|")
	if digits > len(md)/8 || tables > 6 {
		return "swiss"
	}
	return "magazine"
}
