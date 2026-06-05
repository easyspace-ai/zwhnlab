package reportskill

import (
	"context"
	"log"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/ai"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/render"
)

// Pipeline: optional LLM markdown normalize → deterministic HTML (osint-report-skill + render).
type Pipeline struct {
	loader *Loader
	ai     *ai.Client
}

func NewPipeline(loader *Loader, aiClient *ai.Client) *Pipeline {
	return &Pipeline{loader: loader, ai: aiClient}
}

type RenderInput struct {
	Markdown    string
	Topic       string
	VisualStyle string // magazine | swiss | auto
}

type RenderOutput struct {
	HTML           string
	LayoutMarkdown string // after normalize (or same as input)
	Normalized     bool
}

// Render applies light DeepSeek layout pass when configured, then builds HTML.
func (p *Pipeline) Render(ctx context.Context, in RenderInput) RenderOutput {
	md := strings.TrimSpace(in.Markdown)
	layoutMD := md
	normalized := false

	if p != nil && p.ai != nil && p.loader != nil && p.loader.Available() {
		tpl, err := p.loader.LoadPrompt(PromptNormalizeMarkdown)
		if err != nil {
			log.Printf("[osint-report-skill] prompt load: %v", err)
		} else if out, err := p.ai.NormalizeReportMarkdown(ctx, tpl, md, in.Topic, in.VisualStyle); err != nil {
			log.Printf("[osint-report-skill] normalize skipped: %v", err)
		} else if strings.TrimSpace(out) != "" {
			layoutMD = strings.TrimSpace(out)
			normalized = layoutMD != md
		}
	}

	meta := render.MetaFromMarkdown(layoutMD, in.Topic)
	meta.VisualStyle = in.VisualStyle
	html := render.BuildFactCheckReportHTML(layoutMD, meta)

	return RenderOutput{
		HTML:           html,
		LayoutMarkdown: layoutMD,
		Normalized:     normalized,
	}
}

// RenderReportHTML is the w6.Runner hook (original MD preserved for storage).
func (p *Pipeline) RenderReportHTML(ctx context.Context, md, topic, visualStyle string) (html string, layoutMD string, normalized bool) {
	if p == nil {
		meta := render.MetaFromMarkdown(md, topic)
		meta.VisualStyle = visualStyle
		return render.BuildFactCheckReportHTML(md, meta), md, false
	}
	out := p.Render(ctx, RenderInput{Markdown: md, Topic: topic, VisualStyle: visualStyle})
	return out.HTML, out.LayoutMarkdown, out.Normalized
}
