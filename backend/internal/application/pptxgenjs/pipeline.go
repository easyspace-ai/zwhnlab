package pptxgenjs

import (
	"context"
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/project"
	projectdomain "github.com/easyspace-ai/ylmnote/internal/domain/project"
	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
)

type StageEvent struct {
	Stage   string `json:"stage"`
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
	Chunk   string `json:"chunk,omitempty"`
}

type RunResult struct {
	Warnings           []string `json:"warnings,omitempty"`
	SlideSchemaResource string  `json:"slide_schema_resource_id,omitempty"`
}

type Pipeline struct {
	projectSvc   *project.Service
	llm          *deepseek.Client
	prompts      *PromptLoader
	stageTimeout time.Duration
}

func NewPipeline(projectSvc *project.Service, llm *deepseek.Client, prompts *PromptLoader, stageTimeout time.Duration) *Pipeline {
	if stageTimeout <= 0 {
		stageTimeout = 5 * time.Minute
	}
	return &Pipeline{
		projectSvc:   projectSvc,
		llm:          llm,
		prompts:      prompts,
		stageTimeout: stageTimeout,
	}
}

func (p *Pipeline) Run(ctx context.Context, userID, projectID, md string, preferences map[string]string, onStage func(StageEvent)) (*RunResult, error) {
	if err := p.projectSvc.EnsureProjectBelongsToUser(projectID, userID); err != nil {
		return nil, err
	}

	prefsText := formatPreferences(preferences)
	theme := "midnight-exec"
	if preferences != nil && preferences["theme"] != "" {
		theme = preferences["theme"]
	}

	md = normalizePipelineMarkdown(md)
	if doc, ok := TryParseProductSchema(md); ok {
		if preferences != nil && preferences["theme"] == "" {
			theme = doc.ThemePreset()
		}
		target := ParseTargetSlideCount(preferences, len(doc.Slides))
		emit(onStage, string(StageOutline), "running", "正在解析产品 schema…")
		outlineJSON := doc.ToOutlineJSON(target)
		if _, err := p.saveResource(projectID, "outline_json", "outline.json", &outlineJSON, nil); err != nil {
			return nil, err
		}
		emit(onStage, string(StageOutline), "done", "大纲已从 schema 生成")

		schemaJSON := fallbackSchemaFromOutline(outlineJSON, theme)
		if schemaJSON == "" {
			return nil, fmt.Errorf("generate: failed to build slide schema from product schema")
		}
		schemaRes, err := p.saveResource(projectID, "slide_schema", "schema.json", &schemaJSON, nil)
		if err != nil {
			return nil, err
		}
		emit(onStage, string(StageGenerate), "done", "Slide Schema 已从 schema 生成")
		return &RunResult{SlideSchemaResource: schemaRes.ID}, nil
	}

	outlinePrompt, err := p.prompts.LoadOutline()
	if err != nil {
		return nil, err
	}
	targetSlides := ParseTargetSlideCount(preferences, SuggestSlideCountFromText(md))
	slideCountHint := fmt.Sprintf("## 页数要求\n必须生成恰好 %d 页 slides（含封面 cover_hero 与末页 closing_cta）。不得少于或多于该页数。\n\n", targetSlides)
	outlineUser := fmt.Sprintf("%s## 用户偏好\n%s\n\n## 主题 preset\n%s\n\n## 内容\n%s", slideCountHint, prefsText, theme, truncate(md, 16000))
	outlineRaw, err := p.chatWithSystemStream(ctx, StageOutline, outlinePrompt, outlineUser, onStage)
	if err != nil {
		return nil, fmt.Errorf("outline: %w", err)
	}
	outlineJSON := extractJSON(outlineRaw)
	if outlineJSON == "" {
		return nil, fmt.Errorf("outline: no json in response")
	}
	if _, err := p.saveResource(projectID, "outline_json", "outline.json", &outlineJSON, nil); err != nil {
		return nil, err
	}
	emit(onStage, string(StageOutline), "done", "大纲已生成")

	generatePrompt, err := p.prompts.LoadGenerate()
	if err != nil {
		return nil, err
	}
	generateUser := fmt.Sprintf("## outline\n%s\n\n## theme preset\n%s\n\n## 参考原文\n%s", outlineJSON, theme, truncate(md, 8000))
	generateRaw, err := p.chatWithSystemStream(ctx, StageGenerate, generatePrompt, generateUser, onStage)
	if err != nil {
		return nil, fmt.Errorf("generate: %w", err)
	}

	schemaJSON := extractJSON(generateRaw)
	if schemaJSON == "" {
		schemaJSON = fallbackSchemaFromOutline(outlineJSON, theme)
	}
	if schemaJSON == "" {
		return nil, fmt.Errorf("generate: no slide schema json in response")
	}

	schemaRes, err := p.saveResource(projectID, "slide_schema", "schema.json", &schemaJSON, nil)
	if err != nil {
		return nil, err
	}
	emit(onStage, string(StageGenerate), "done", "Slide Schema 已生成")

	return &RunResult{SlideSchemaResource: schemaRes.ID}, nil
}

func (p *Pipeline) Regenerate(ctx context.Context, userID, projectID, instruction string, onStage func(StageEvent)) (*RunResult, error) {
	if err := p.projectSvc.EnsureProjectBelongsToUser(projectID, userID); err != nil {
		return nil, err
	}
	md := p.getResourceContent(projectID, "markdown")
	if md == "" {
		return nil, fmt.Errorf("markdown source not found")
	}

	prefs := ParsePreferences(p.projectDesc(projectID, userID))
	theme := prefs["theme"]

	outlineJSON := p.getResourceContent(projectID, "outline_json")
	outlinePrompt, _ := p.prompts.LoadOutline()
	outlineUser := fmt.Sprintf("## 调整说明\n%s\n\n## 当前 outline\n%s\n\n## 原文\n%s", instruction, outlineJSON, truncate(md, 12000))
	outlineRaw, err := p.chatWithSystemStream(ctx, StageOutline, outlinePrompt, outlineUser, onStage)
	if err != nil {
		return nil, err
	}
	outlineJSON = extractJSON(outlineRaw)
	if outlineJSON == "" {
		return nil, fmt.Errorf("outline: no json in response")
	}
	_, _ = p.saveResource(projectID, "outline_json", "outline.json", &outlineJSON, nil)
	emit(onStage, string(StageOutline), "done", "大纲已更新")

	generatePrompt, _ := p.prompts.LoadGenerate()
	generateUser := fmt.Sprintf("## 调整\n%s\n\n## outline\n%s\n\n## theme\n%s", instruction, outlineJSON, theme)
	generateRaw, err := p.chatWithSystemStream(ctx, StageGenerate, generatePrompt, generateUser, onStage)
	if err != nil {
		return nil, err
	}
	schemaJSON := extractJSON(generateRaw)
	if schemaJSON == "" {
		schemaJSON = fallbackSchemaFromOutline(outlineJSON, theme)
	}
	schemaRes, err := p.saveResource(projectID, "slide_schema", "schema.json", &schemaJSON, nil)
	if err != nil {
		return nil, err
	}
	emit(onStage, string(StageGenerate), "done", "已更新")

	return &RunResult{SlideSchemaResource: schemaRes.ID}, nil
}

func (p *Pipeline) projectDesc(projectID, userID string) *string {
	proj, err := p.projectSvc.GetProject(projectID, userID)
	if err != nil {
		return nil
	}
	return proj.Description
}

func emit(onStage func(StageEvent), stage, status, msg string) {
	if onStage != nil {
		onStage(StageEvent{Stage: stage, Status: status, Message: msg})
	}
}

func (p *Pipeline) chatWithSystemStream(
	ctx context.Context,
	stage Stage,
	systemPrompt, userContent string,
	onStage func(StageEvent),
) (string, error) {
	stageCtx, cancel := context.WithTimeout(ctx, p.stageTimeout)
	defer cancel()

	stageName := string(stage)
	messages := []deepseek.Message{{Role: "user", Content: userContent}}
	const maxAttempts = 3

	var lastErr error
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		if attempt == 1 {
			emit(onStage, stageName, "running", stageRunningMessage(stage))
		} else {
			emit(onStage, stageName, "retry", fmt.Sprintf("上游繁忙，第 %d 次重试…", attempt))
		}

		var buf strings.Builder
		err := p.llm.ChatStreamWithSystem(stageCtx, systemPrompt, messages, func(chunk string) error {
			buf.WriteString(chunk)
			if onStage != nil {
				onStage(StageEvent{Stage: stageName, Status: "progress", Chunk: chunk})
			}
			return nil
		})
		if err == nil {
			raw := buf.String()
			if strings.TrimSpace(raw) != "" {
				return raw, nil
			}
			lastErr = fmt.Errorf("%s: empty response", stageName)
		} else {
			lastErr = err
		}

		if attempt < maxAttempts && deepseek.IsRetryableLLMError(lastErr) {
			if waitErr := sleepStageBackoff(stageCtx, attempt); waitErr != nil {
				return "", waitErr
			}
			continue
		}
		break
	}

	if deepseek.IsRetryableLLMError(lastErr) {
		emit(onStage, stageName, "running", "流式失败，改用非流式请求…")
		full, err := p.llm.ChatWithSystem(stageCtx, systemPrompt, messages)
		if err == nil && strings.TrimSpace(full) != "" {
			if onStage != nil {
				onStage(StageEvent{Stage: stageName, Status: "progress", Chunk: full})
			}
			return full, nil
		}
		if err != nil {
			lastErr = err
		}
	}

	if lastErr == nil {
		lastErr = fmt.Errorf("%s: failed", stageName)
	}
	return "", fmt.Errorf("%s: %w（DeepSeek 上游暂时不可用，请稍后点击「生成」重试）", stageName, lastErr)
}

func sleepStageBackoff(ctx context.Context, attempt int) error {
	d := time.Duration(attempt) * 2 * time.Second
	t := time.NewTimer(d)
	defer t.Stop()
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-t.C:
		return nil
	}
}

func stageRunningMessage(stage Stage) string {
	switch stage {
	case StageOutline:
		return "正在组织大纲…"
	case StageGenerate:
		return "正在生成 PptxGenJS Slide Schema…"
	default:
		return "处理中…"
	}
}

func (p *Pipeline) saveResource(projectID, resType, name string, content, url *string) (*projectdomain.Resource, error) {
	existing, _ := p.projectSvc.ListResources(projectID, &resType)
	for _, r := range existing {
		_ = p.projectSvc.DeleteResource(projectID, r.ID)
	}
	return p.projectSvc.CreateResource(projectID, nil, resType, name, content, url, nil)
}

func (p *Pipeline) getResourceContent(projectID, resType string) string {
	t := resType
	list, err := p.projectSvc.ListResources(projectID, &t)
	if err != nil || len(list) == 0 {
		return ""
	}
	if list[0].Content != nil {
		return *list[0].Content
	}
	return ""
}

func formatPreferences(prefs map[string]string) string {
	if len(prefs) == 0 {
		return "（默认 midnight-exec 主题）"
	}
	var b strings.Builder
	for k, v := range prefs {
		b.WriteString(fmt.Sprintf("- %s: %s\n", k, v))
	}
	return b.String()
}

var jsonFenceRe = regexp.MustCompile("(?is)```(?:json)?\\s*([\\s\\S]*?)```")

func extractJSON(raw string) string {
	if m := jsonFenceRe.FindStringSubmatch(raw); len(m) > 1 {
		return strings.TrimSpace(m[1])
	}
	raw = strings.TrimSpace(raw)
	if strings.HasPrefix(raw, "{") || strings.HasPrefix(raw, "[") {
		return raw
	}
	return ""
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max] + "\n…(truncated)"
}

type outlineSlide struct {
	LayoutPreset string              `json:"layout_preset"`
	Intent       string              `json:"intent"`
	Title        string              `json:"title"`
	Subtitle     string              `json:"subtitle"`
	Headline     string              `json:"headline"`
	Quote        string              `json:"quote"`
	Bullets      []string            `json:"bullets"`
	Stats        []map[string]string `json:"stats"`
	Cards        []map[string]string `json:"cards"`
	Chart        map[string]any      `json:"chart"`
	Columns      []map[string]any    `json:"columns"`
	Items        []map[string]string `json:"items"`
	Footer       string              `json:"footer"`
}

func fallbackSchemaFromOutline(outlineJSON, theme string) string {
	var outline struct {
		Title    string         `json:"title"`
		Subtitle string         `json:"subtitle"`
		Theme    string         `json:"theme"`
		Slides   []outlineSlide `json:"slides"`
	}
	if json.Unmarshal([]byte(outlineJSON), &outline) != nil {
		return ""
	}
	title := outline.Title
	if title == "" {
		title = "演示文稿"
	}
	if outline.Theme != "" {
		theme = outline.Theme
	}

	themeColors := themePalette(theme)
	slides := make([]map[string]any, 0, len(outline.Slides)+1)

	// Ensure cover if missing
	hasCover := false
	for _, s := range outline.Slides {
		if s.LayoutPreset == "cover_hero" {
			hasCover = true
			break
		}
	}
	if !hasCover {
		slides = append(slides, map[string]any{
			"layout_preset": "cover_hero",
			"slots": map[string]any{
				"title":    title,
				"subtitle": outline.Subtitle,
			},
		})
	}

	for _, s := range outline.Slides {
		preset := s.LayoutPreset
		if preset == "" {
			preset = inferPresetFromIntent(s.Intent)
		}
		slots := buildSlotsFromOutlineSlide(s)
		slide := map[string]any{
			"layout_preset": preset,
			"slots":         slots,
		}
		if preset != "section_break" && preset != "closing_cta" && preset != "cover_hero" {
			slide["bg_color"] = themeColors.bgLight
		}
		if s.Footer != "" {
			slide["footer"] = s.Footer
		}
		slides = append(slides, slide)
	}

	hasClosing := false
	for _, s := range outline.Slides {
		if s.LayoutPreset == "closing_cta" {
			hasClosing = true
			break
		}
	}
	if !hasClosing {
		slides = append(slides, map[string]any{
			"layout_preset": "closing_cta",
			"slots": map[string]any{
				"headline": "谢谢",
				"contact":  title,
			},
		})
	}

	schema := map[string]any{
		"meta": map[string]any{
			"title":    title,
			"language": "zh",
			"layout":   "LAYOUT_16x9",
			"theme": map[string]string{
				"preset":       theme,
				"primary":      themeColors.primary,
				"secondary":    themeColors.secondary,
				"accent":       themeColors.accent,
				"bg_dark":      themeColors.bgDark,
				"bg_light":     themeColors.bgLight,
				"text_dark":    themeColors.textDark,
				"text_light":   "FFFFFF",
				"font_heading": "Microsoft YaHei",
				"font_body":    "Microsoft YaHei",
			},
		},
		"slides": slides,
	}
	b, err := json.Marshal(schema)
	if err != nil {
		return ""
	}
	return string(b)
}

func inferPresetFromIntent(intent string) string {
	switch strings.ToLower(strings.TrimSpace(intent)) {
	case "title":
		return "cover_hero"
	case "agenda":
		return "bullets_dense"
	case "section":
		return "section_break"
	case "metrics", "data_hero":
		return "stat_row"
	case "data", "chart":
		return "chart_sidebar"
	case "comparison", "versus":
		return "comparison_table"
	case "quote", "thesis":
		return "quote_hero"
	case "timeline", "roadmap":
		return "timeline_horizontal"
	case "closing":
		return "closing_cta"
	case "executive_summary", "insight":
		return "split_insight"
	case "pillars", "features":
		return "three_col_cards"
	default:
		return "bullets_dense"
	}
}

func buildSlotsFromOutlineSlide(s outlineSlide) map[string]any {
	slots := map[string]any{}
	if s.Title != "" {
		slots["title"] = s.Title
	}
	if s.Subtitle != "" {
		slots["subtitle"] = s.Subtitle
	}
	if s.Headline != "" {
		slots["headline"] = s.Headline
	}
	if s.Quote != "" {
		slots["quote"] = s.Quote
	}
	if len(s.Bullets) > 0 {
		slots["bullets"] = s.Bullets
	}
	if len(s.Stats) > 0 {
		slots["stats"] = s.Stats
	}
	if len(s.Cards) > 0 {
		slots["cards"] = s.Cards
	}
	if s.Chart != nil {
		slots["chart"] = s.Chart
	}
	if len(s.Columns) > 0 {
		slots["columns"] = s.Columns
	}
	if len(s.Items) > 0 {
		slots["items"] = s.Items
	}
	if s.Footer != "" {
		slots["footer"] = s.Footer
	}
	return slots
}

type palette struct {
	primary, secondary, accent, bgDark, bgLight, textDark string
}

func themePalette(theme string) palette {
	switch theme {
	case "tech-dark":
		return palette{"0D1117", "58A6FF", "3FB950", "0D1117", "F6F8FA", "24292F"}
	case "coral-energy":
		return palette{"F96167", "F9E795", "2F3C7E", "2F3C7E", "FFFAF0", "2F3C7E"}
	case "forest-calm":
		return palette{"2C5F2D", "97BC62", "40916C", "1B4332", "F1FAEE", "1B4332"}
	case "teal-trust":
		return palette{"028090", "02C39A", "F4A261", "023047", "F8F9FA", "023047"}
	case "minimal-white":
		return palette{"333333", "666666", "007AFF", "1C1C1E", "FFFFFF", "333333"}
	default:
		return palette{"1E2761", "CADCFC", "F96167", "1E2761", "F5F7FA", "2C3E50"}
	}
}
