package w6

import (
	"context"
	"log"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/render"
)

// completeRound renders HTML, persists artifacts, and emits the terminal hub event.
func (r *Runner) completeRound(ctx context.Context, sessionID, md, topic, prompt string) bool {
	sessionID = strings.TrimSpace(sessionID)
	if sessionID == "" || strings.TrimSpace(md) == "" {
		return false
	}
	if topic == "" {
		topic = r.state.GetTopic(sessionID)
	}
	style := r.state.GetReportStyle(sessionID)

	var html string
	if r.reportRender != nil {
		var normalized bool
		html, _, normalized = r.reportRender.RenderReportHTML(ctx, md, topic, style)
		if normalized {
			r.hub.Publish(sessionID, Event{Type: "log", Message: "已应用 osint-report-skill 轻度排版"})
		}
	}
	if html == "" {
		meta := render.MetaFromMarkdown(md, topic)
		meta.VisualStyle = style
		html = render.BuildFactCheckReportHTML(md, meta)
	}

	htmlResourceID := ""
	if r.reports != nil {
		title := roundTitle(topic, prompt)
		var err error
		htmlResourceID, err = r.reports.SaveRound(ctx, sessionID, title, md, html)
		if err != nil {
			log.Printf("[osintdashboard] save report: %v", err)
		}
	}
	previewKey := htmlResourceID
	if previewKey == "" {
		previewKey = sessionID
	}
	_ = r.state.UpdateMarkdown(sessionID, md, previewKey)
	_ = r.state.SetSubAgentStatus(sessionID, "idle")

	followUps, _ := r.ai.GenerateFollowUps(ctx, md, topic)
	if len(followUps) == 0 {
		followUps = defaultFollowUps(topic)
	}
	_ = r.state.SetFollowUps(sessionID, followUps)

	r.hub.Publish(sessionID, Event{
		Type:           "done",
		Message:        "调研完成",
		Progress:       100,
		Markdown:       md,
		ReportHTML:     html,
		PreviewFile:    previewKey,
		ReportURL:      previewKey,
		FollowUps:      followUps,
		RoundTitle:     roundTitle(topic, prompt),
		SubAgentStatus: "idle",
	})
	log.Printf("[osintdashboard] round complete session=%s resource=%s", sessionID, htmlResourceID)
	return htmlResourceID != "" || previewKey != ""
}
