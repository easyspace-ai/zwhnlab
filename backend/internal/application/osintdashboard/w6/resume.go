package w6

import (
	"context"
	"strings"
)

// CompleteFromMarkdown runs render → save → hub done when MD is already in workflow.
func (r *Runner) CompleteFromMarkdown(ctx context.Context, sessionID, md, topic string) bool {
	return r.completeRound(ctx, sessionID, md, topic, "")
}

// ResumeIfUpstreamIdle fetches MD from an already-idle upstream W6 session and runs the
// post-poll pipeline (render → save → hub done). Used after server restart when the local
// runner goroutine was lost but upstream research already finished.
func (r *Runner) ResumeIfUpstreamIdle(ctx context.Context, sessionID string) bool {
	sessionID = strings.TrimSpace(sessionID)
	if sessionID == "" || r.mockMode || r.client == nil {
		return false
	}
	upstreamID := strings.TrimSpace(r.state.GetUpstreamW6ID(sessionID))
	if upstreamID == "" {
		return false
	}
	if !upstreamIsIdle(r.upstreamStatus(ctx, upstreamID)) {
		return false
	}
	emit := func(ev Event) {
		ev.SubAgentStatus = "running"
		r.hub.Publish(sessionID, ev)
	}
	emit(Event{Type: "log", Message: "恢复：上游 W6 已 idle，拉取 Markdown…", Progress: 85})
	md, err := r.fetchMarkdownWhenIdle(ctx, upstreamID, emit)
	if err != nil || strings.TrimSpace(md) == "" {
		return false
	}
	topic := r.state.GetTopic(sessionID)
	return r.completeRound(ctx, sessionID, md, topic, "")
}

// fetchMarkdownWhenIdle performs one upstream poll assuming W6 is already terminal.
func (r *Runner) fetchMarkdownWhenIdle(ctx context.Context, upstreamID string, emit func(Event)) (string, error) {
	resp, err := r.client.AgentMessages(ctx, upstreamID, 50, 0)
	if err != nil {
		return "", err
	}
	mdCandidate := r.latestMarkdownFromMessages(ctx, resp.Messages)
	if mdCandidate != "" {
		emit(Event{Type: "log", Message: "W6 已 idle，Markdown 报告就绪"})
		return mdCandidate, nil
	}
	if accText := latestUserFacingText(resp.Messages); accText != "" {
		emit(Event{Type: "log", Message: "W6 已 idle，整理聊天文本…"})
		return r.formatTextAsReport(accText), nil
	}
	return "", nil
}
