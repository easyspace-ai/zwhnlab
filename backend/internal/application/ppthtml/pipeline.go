package ppthtml

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
	Warnings     []string `json:"warnings,omitempty"`
	HTMLResource string   `json:"html_resource_id,omitempty"`
}

type Pipeline struct {
	projectSvc   *project.Service
	llm          *deepseek.Client
	prompts      *PromptLoader
	guizangDir   string
	stageTimeout time.Duration
}

func NewPipeline(projectSvc *project.Service, llm *deepseek.Client, prompts *PromptLoader, guizangDir string, stageTimeout time.Duration) *Pipeline {
	if stageTimeout <= 0 {
		stageTimeout = 5 * time.Minute
	}
	return &Pipeline{
		projectSvc:   projectSvc,
		llm:          llm,
		prompts:      prompts,
		guizangDir:   guizangDir,
		stageTimeout: stageTimeout,
	}
}

func (p *Pipeline) Run(ctx context.Context, userID, projectID, md string, preferences map[string]string, onStage func(StageEvent)) (*RunResult, error) {
	if err := p.projectSvc.EnsureProjectBelongsToUser(projectID, userID); err != nil {
		return nil, err
	}

	style := "magazine"
	if preferences != nil && preferences["style"] != "" {
		style = preferences["style"]
	}
	prefsText := formatPreferences(preferences)

	outlinePrompt, err := p.prompts.Load(StageOutline)
	if err != nil {
		return nil, err
	}
	outlineUser := fmt.Sprintf("## 用户偏好\n%s\n\n## 选定风格\n%s\n\n## 内容\n%s", prefsText, style, truncate(md, 16000))
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

	title := parseOutlineTitle(outlineJSON)

	generatePrompt, err := p.prompts.Load(StageGenerate)
	if err != nil {
		return nil, err
	}
	generateUser := fmt.Sprintf("## outline\n%s\n\n## 风格\n%s\n\n## 参考原文\n%s", outlineJSON, style, truncate(md, 8000))
	generateRaw, err := p.chatWithSystemStream(ctx, StageGenerate, generatePrompt, generateUser, onStage)
	if err != nil {
		return nil, fmt.Errorf("generate: %w", err)
	}

	slidesHTML := extractHTMLSlides(generateRaw)
	if slidesHTML == "" {
		slidesHTML = fallbackSlidesHTML(outlineJSON)
	}

	deckHTML, err := BuildDeckHTML(p.guizangDir, style, title, slidesHTML)
	if err != nil {
		return nil, fmt.Errorf("assemble deck: %w", err)
	}

	htmlRes, err := p.saveResource(projectID, "html_deck", "index.html", &deckHTML, nil)
	if err != nil {
		return nil, err
	}
	emit(onStage, string(StageGenerate), "done", "HTML 演示稿已生成")

	return &RunResult{HTMLResource: htmlRes.ID}, nil
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
	style := prefs["style"]

	outlineJSON := p.getResourceContent(projectID, "outline_json")
	outlinePrompt, _ := p.prompts.Load(StageOutline)
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

	title := parseOutlineTitle(outlineJSON)
	generatePrompt, _ := p.prompts.Load(StageGenerate)
	generateUser := fmt.Sprintf("## 调整\n%s\n\n## outline\n%s\n\n## 风格\n%s", instruction, outlineJSON, style)
	generateRaw, err := p.chatWithSystemStream(ctx, StageGenerate, generatePrompt, generateUser, onStage)
	if err != nil {
		return nil, err
	}
	slidesHTML := extractHTMLSlides(generateRaw)
	if slidesHTML == "" {
		slidesHTML = fallbackSlidesHTML(outlineJSON)
	}
	deckHTML, err := BuildDeckHTML(p.guizangDir, style, title, slidesHTML)
	if err != nil {
		return nil, err
	}
	htmlRes, err := p.saveResource(projectID, "html_deck", "index.html", &deckHTML, nil)
	if err != nil {
		return nil, err
	}
	emit(onStage, string(StageGenerate), "done", "已更新")

	return &RunResult{HTMLResource: htmlRes.ID}, nil
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
		return "正在生成 Guizang HTML 幻灯片…"
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
		return "（默认杂志风 + ink 主题）"
	}
	var b strings.Builder
	for k, v := range prefs {
		b.WriteString(fmt.Sprintf("- %s: %s\n", k, v))
	}
	return b.String()
}

var jsonFenceRe = regexp.MustCompile("(?is)```(?:json)?\\s*([\\s\\S]*?)```")
var htmlSlidesFenceRe = regexp.MustCompile("(?is)```(?:html-slides|html)\\s*([\\s\\S]*?)```")

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

func extractHTMLSlides(raw string) string {
	if m := htmlSlidesFenceRe.FindStringSubmatch(raw); len(m) > 1 {
		body := strings.TrimSpace(m[1])
		if strings.Contains(body, "<section") {
			return body
		}
	}
	// fallback: grab all section blocks
	if strings.Contains(raw, "<section") {
		sectionRe := regexp.MustCompile("(?is)(<section[\\s\\S]*?</section>)")
		matches := sectionRe.FindAllString(raw, -1)
		if len(matches) > 0 {
			return strings.Join(matches, "\n\n")
		}
	}
	return ""
}

func parseOutlineTitle(outlineJSON string) string {
	var outline struct {
		Title string `json:"title"`
	}
	if json.Unmarshal([]byte(outlineJSON), &outline) == nil && outline.Title != "" {
		return outline.Title
	}
	return "演示文稿"
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max] + "\n…(truncated)"
}

func fallbackSlidesHTML(outlineJSON string) string {
	var outline struct {
		Title  string `json:"title"`
		Slides []struct {
			Title   string   `json:"title"`
			Subtitle string  `json:"subtitle"`
			Bullets []string `json:"bullets"`
		} `json:"slides"`
	}
	_ = json.Unmarshal([]byte(outlineJSON), &outline)
	title := outline.Title
	if title == "" {
		title = "演示文稿"
	}

	var b strings.Builder
	b.WriteString(`<section class="slide hero dark" data-animate="hero"><div class="canvas"><p class="kicker">Guizang PPT</p><h1 class="h-hero">`)
	b.WriteString(escapeHTML(title))
	b.WriteString(`</h1></div></section>`)

	for i, s := range outline.Slides {
		if i == 0 {
			continue
		}
		t := s.Title
		if t == "" {
			continue
		}
		b.WriteString(`<section class="slide light"><div class="canvas"><h2 class="h-xl">`)
		b.WriteString(escapeHTML(t))
		b.WriteString(`</h2>`)
		if s.Subtitle != "" {
			b.WriteString(`<p class="lead">`)
			b.WriteString(escapeHTML(s.Subtitle))
			b.WriteString(`</p>`)
		}
		if len(s.Bullets) > 0 {
			b.WriteString(`<ul class="lead">`)
			for _, bullet := range s.Bullets {
				b.WriteString(`<li>` + escapeHTML(bullet) + `</li>`)
			}
			b.WriteString(`</ul>`)
		}
		b.WriteString(`</div></section>`)
	}
	return b.String()
}
