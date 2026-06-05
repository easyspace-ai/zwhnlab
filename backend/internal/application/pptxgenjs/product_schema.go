package pptxgenjs

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

var (
	jsonLineCommentRe      = regexp.MustCompile(`(?m)^\s*//.*$`)
	jsonTrailingCommaRe  = regexp.MustCompile(`,(\s*[\]\}])`)
)

// ProductSchema is a feidu-style deck definition (document_title + slides[]).
type ProductSchema struct {
	DocumentTitle string         `json:"document_title"`
	Source        string         `json:"source"`
	TotalPages    int            `json:"total_pages"`
	Style         string         `json:"style"`
	Slides        []ProductSlide `json:"slides"`
}

type ProductSlide struct {
	PageID     int              `json:"page_id"`
	PageType   string           `json:"page_type"`
	Headline   string           `json:"headline"`
	Subtitle   string           `json:"subtitle"`
	Body       []string         `json:"body"`
	Elements   []string         `json:"elements"`
	VisualType string           `json:"visual_type"`
	TableData  *ProductTable    `json:"table_data"`
	ChartData  map[string]any   `json:"chart_data"`
	Left       []string         `json:"left"`
	Right      []string         `json:"right"`
	Note       string           `json:"note"`
}

type ProductTable struct {
	Rows [][]string `json:"rows"`
}

func stripJSONComments(raw string) string {
	return jsonLineCommentRe.ReplaceAllString(raw, "")
}

func stripJSONTrailingCommas(raw string) string {
	for i := 0; i < 8; i++ {
		next := jsonTrailingCommaRe.ReplaceAllString(raw, "$1")
		if next == raw {
			return raw
		}
		raw = next
	}
	return raw
}

func prepareProductJSON(raw string) string {
	raw = stripJSONComments(raw)
	raw = repairJSONInlineQuotes(raw)
	return stripJSONTrailingCommas(raw)
}

// repairJSONInlineQuotes turns unescaped " inside JSON string values into 「」 (common in CN exports).
func repairJSONInlineQuotes(raw string) string {
	runes := []rune(raw)
	var b strings.Builder
	inString := false
	escaped := false
	for i := 0; i < len(runes); i++ {
		r := runes[i]
		if escaped {
			b.WriteRune(r)
			escaped = false
			continue
		}
		if r == '\\' && inString {
			b.WriteRune(r)
			escaped = true
			continue
		}
		if r != '"' {
			b.WriteRune(r)
			continue
		}
		if !inString {
			inString = true
			b.WriteRune(r)
			continue
		}
		j := i + 1
		for j < len(runes) && (runes[j] == ' ' || runes[j] == '\t') {
			j++
		}
		if j >= len(runes) || runes[j] == ',' || runes[j] == ']' || runes[j] == '}' || runes[j] == ':' || runes[j] == '\n' || runes[j] == '\r' {
			inString = false
			b.WriteRune(r)
			continue
		}
		k := i + 1
		for k < len(runes) && runes[k] != '"' {
			k++
		}
		if k < len(runes) {
			b.WriteString("「")
			b.WriteString(string(runes[i+1 : k]))
			b.WriteString("」")
			i = k
			continue
		}
		b.WriteRune(r)
	}
	return b.String()
}

func normalizePipelineMarkdown(md string) string {
	md = strings.TrimSpace(md)
	const marker = "<!-- product-schema -->"
	if idx := strings.Index(md, marker); idx >= 0 {
		rest := strings.TrimSpace(md[idx+len(marker):])
		if rest != "" {
			return rest
		}
	}
	return md
}

func TryParseProductSchema(raw string) (*ProductSchema, bool) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return nil, false
	}
	prepared := prepareProductJSON(raw)
	var doc ProductSchema
	if err := json.Unmarshal([]byte(prepared), &doc); err != nil {
		return nil, false
	}
	if len(doc.Slides) == 0 {
		return nil, false
	}
	looksLikeProduct := doc.DocumentTitle != "" || doc.TotalPages > 0
	for _, s := range doc.Slides {
		if strings.TrimSpace(s.PageType) != "" || s.PageID > 0 {
			looksLikeProduct = true
			break
		}
	}
	if !looksLikeProduct {
		return nil, false
	}
	if doc.TotalPages <= 0 {
		doc.TotalPages = len(doc.Slides)
	}
	return &doc, true
}

func ParseTargetSlideCount(prefs map[string]string, fallback int) int {
	if prefs == nil {
		return clampSlideCount(fallback)
	}
	if v := strings.TrimSpace(prefs["target_slide_count"]); v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			return clampSlideCount(n)
		}
	}
	return clampSlideCount(fallback)
}

func clampSlideCount(n int) int {
	if n < MinSlideCount {
		return MinSlideCount
	}
	if n > MaxSlideCount {
		return MaxSlideCount
	}
	return n
}

const MinSlideCount = 4
const MaxSlideCount = 50

func SuggestSlideCountFromText(text string) int {
	text = strings.TrimSpace(text)
	if text == "" {
		return 8
	}
	n := len([]rune(text))
	switch {
	case n < 2000:
		return 8
	case n < 8000:
		return 12
	case n < 20000:
		return 16
	case n < 40000:
		return 24
	default:
		suggested := n/1500 + 6
		return clampSlideCount(suggested)
	}
}

func (doc *ProductSchema) EffectiveSlideCount(requested int) int {
	n := len(doc.Slides)
	if requested <= 0 || requested >= n {
		return n
	}
	return requested
}

func (doc *ProductSchema) Title() string {
	if t := strings.TrimSpace(doc.DocumentTitle); t != "" {
		return t
	}
	if len(doc.Slides) > 0 {
		return strings.TrimSpace(doc.Slides[0].Headline)
	}
	return "演示文稿"
}

func (doc *ProductSchema) ThemePreset() string {
	switch strings.ToLower(strings.TrimSpace(doc.Style)) {
	case "tech-dark", "tech_dark":
		return "tech-dark"
	case "coral", "coral-energy":
		return "coral-energy"
	case "forest", "forest-calm":
		return "forest-calm"
	case "teal", "teal-trust":
		return "teal-trust"
	case "minimal", "minimal-white":
		return "minimal-white"
	default:
		return "midnight-exec"
	}
}

func (doc *ProductSchema) ToOutlineJSON(requestedPages int) string {
	title := doc.Title()
	theme := doc.ThemePreset()
	slides := doc.Slides
	if requestedPages > 0 && requestedPages < len(slides) {
		slides = pickProductSlides(slides, requestedPages)
	}
	outlineSlides := make([]outlineSlide, 0, len(slides))
	for i, s := range slides {
		preset := productPageTypeToPreset(s.PageType, s.VisualType)
		os := productSlideToOutline(s, preset, i+1, len(slides))
		outlineSlides = append(outlineSlides, os)
	}
	payload := map[string]any{
		"title":    title,
		"subtitle": doc.Source,
		"theme":    theme,
		"slides":   outlineSlides,
	}
	b, _ := json.Marshal(payload)
	return string(b)
}

func (doc *ProductSchema) ToBriefMarkdown(requestedPages int) string {
	title := doc.Title()
	count := doc.EffectiveSlideCount(requestedPages)
	var b strings.Builder
	fmt.Fprintf(&b, "演示目标：根据结构化产品/研究报告 schema 生成 %d 页演示稿。\n", count)
	fmt.Fprintf(&b, "文档标题：%s\n", title)
	if doc.Source != "" {
		fmt.Fprintf(&b, "来源：%s\n", doc.Source)
	}
	b.WriteString("建议大纲：\n")
	slides := doc.Slides
	if requestedPages > 0 && requestedPages < len(slides) {
		slides = pickProductSlides(slides, requestedPages)
	}
	for i, s := range slides {
		line := strings.TrimSpace(s.Headline)
		if line == "" {
			line = fmt.Sprintf("第 %d 页", i+1)
		}
		fmt.Fprintf(&b, "%d. %s (%s)\n", i+1, line, s.PageType)
	}
	b.WriteString("每页要点：\n")
	for i, s := range slides {
		fmt.Fprintf(&b, "第 %d 页：%s\n", i+1, productSlideSummary(s))
	}
	b.WriteString("必须保留的事实/指标/术语：请忠实呈现 schema 中的数据与专有名词，勿编造。\n")
	b.WriteString("风格/表达要求：专业咨询报告风格，章节用 section 页分隔。\n")
	return b.String()
}

func pickProductSlides(slides []ProductSlide, target int) []ProductSlide {
	if target >= len(slides) || target < 4 {
		return slides
	}
	// Keep first cover-like, last conclusion, and evenly sample the rest.
	indices := make([]int, 0, target)
	indices = append(indices, 0)
	if len(slides) > 1 {
		indices = append(indices, len(slides)-1)
	}
	remaining := target - len(indices)
	if remaining > 0 {
		step := float64(len(slides)-2) / float64(remaining+1)
		for i := 1; i <= remaining; i++ {
			idx := int(float64(i)*step + 0.5)
			if idx <= 0 || idx >= len(slides)-1 {
				continue
			}
			dup := false
			for _, existing := range indices {
				if existing == idx {
					dup = true
					break
				}
			}
			if !dup {
				indices = append(indices, idx)
			}
		}
	}
	// Sort and dedupe
	seen := map[int]bool{}
	out := make([]ProductSlide, 0, target)
	for i := 0; i < len(slides); i++ {
		want := false
		for _, idx := range indices {
			if idx == i {
				want = true
				break
			}
		}
		if !want || seen[i] {
			continue
		}
		seen[i] = true
		out = append(out, slides[i])
		if len(out) >= target {
			break
		}
	}
	if len(out) < target {
		for i, s := range slides {
			if len(out) >= target {
				break
			}
			if !seen[i] {
				out = append(out, s)
				seen[i] = true
			}
		}
	}
	return out
}

func productPageTypeToPreset(pageType, visualType string) string {
	switch strings.ToLower(strings.TrimSpace(pageType)) {
	case "section_divider":
		return "section_break"
	case "executive_summary":
		return "split_insight"
	case "insight":
		return "split_insight"
	case "data_point":
		switch strings.ToLower(strings.TrimSpace(visualType)) {
		case "table", "flow_table":
			return "comparison_table"
		case "bar_chart", "chart":
			return "chart_sidebar"
		default:
			return "stat_row"
		}
	case "comparison":
		return "comparison_table"
	case "conclusion":
		return "closing_cta"
	default:
		return "bullets_dense"
	}
}

func productSlideToOutline(s ProductSlide, preset string, pageNum, total int) outlineSlide {
	title := strings.TrimSpace(s.Headline)
	if title == "" {
		title = fmt.Sprintf("第 %d 页", pageNum)
	}
	os := outlineSlide{
		LayoutPreset: preset,
		Intent:       strings.TrimSpace(s.PageType),
		Title:        title,
		Subtitle:     strings.TrimSpace(s.Subtitle),
		Footer:       fmt.Sprintf("%d / %d", pageNum, total),
	}
	if len(s.Body) > 0 {
		if preset == "split_insight" {
			os.Headline = title
			os.Bullets = s.Body
		} else {
			os.Bullets = s.Body
		}
	}
	if len(s.Elements) > 0 && len(os.Bullets) == 0 {
		os.Bullets = s.Elements
	}
	if s.TableData != nil && len(s.TableData.Rows) > 0 {
		os.Columns = tableRowsToColumns(s.TableData.Rows)
	}
	if len(s.Left) > 0 || len(s.Right) > 0 {
		os.Columns = []map[string]any{
			{"header": "优势/要点", "items": s.Left},
			{"header": "风险/待观察", "items": s.Right},
		}
	}
	if s.ChartData != nil {
		os.Chart = s.ChartData
	}
	if pageNum == 1 && strings.EqualFold(s.PageType, "section_divider") {
		os.LayoutPreset = "cover_hero"
		os.Intent = "title"
	} else if strings.EqualFold(s.PageType, "section_divider") {
		os.LayoutPreset = "section_break"
		os.Intent = "section"
	}
	if preset == "closing_cta" {
		os.Headline = title
		if len(s.Body) > 0 {
			os.Bullets = s.Body
		}
	}
	return os
}

func tableRowsToColumns(rows [][]string) []map[string]any {
	if len(rows) == 0 {
		return nil
	}
	if len(rows[0]) >= 2 {
		cols := make([]map[string]any, 0, len(rows[0]))
		for i, h := range rows[0] {
			items := make([]string, 0)
			for _, row := range rows[1:] {
				if i < len(row) {
					items = append(items, row[i])
				}
			}
			cols = append(cols, map[string]any{"header": h, "items": items})
		}
		return cols
	}
	items := make([]string, 0, len(rows))
	for _, row := range rows {
		items = append(items, strings.Join(row, " · "))
	}
	return []map[string]any{{"header": "数据", "items": items}}
}

func productSlideSummary(s ProductSlide) string {
	parts := make([]string, 0, 4)
	if sub := strings.TrimSpace(s.Subtitle); sub != "" {
		parts = append(parts, sub)
	}
	if len(s.Body) > 0 {
		parts = append(parts, strings.Join(s.Body, "；"))
	}
	if s.TableData != nil && len(s.TableData.Rows) > 0 {
		parts = append(parts, fmt.Sprintf("表格 %d 行", len(s.TableData.Rows)))
	}
	if note := strings.TrimSpace(s.Note); note != "" {
		parts = append(parts, note)
	}
	if len(parts) == 0 && len(s.Elements) > 0 {
		parts = append(parts, strings.Join(s.Elements, "；"))
	}
	out := strings.Join(parts, " | ")
	if len(out) > 500 {
		return out[:500] + "…"
	}
	return out
}
