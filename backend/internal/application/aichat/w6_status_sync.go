package aichat

import (
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard/w6"
)

func lastW6Status(events []SessionEvent, roundID string) string {
	last := ""
	for _, ev := range events {
		if ev.RoundID != roundID || ev.Type != EventW6Status {
			continue
		}
		last = strings.TrimSpace(ev.Status)
	}
	return last
}

func hubEventMarksW6Idle(ev w6.Event) bool {
	if strings.TrimSpace(ev.SubAgentStatus) == "idle" {
		return true
	}
	switch ev.Type {
	case "phase":
		return true
	case "log", "status":
		msg := strings.TrimSpace(ev.Message)
		return strings.Contains(msg, "报告草稿就绪") || strings.Contains(msg, "W6 已 idle")
	default:
		return false
	}
}

func roundNeedsIdleWatcher(st *ConversationState, ws *osintdashboard.WorkflowState, roundID string) bool {
	if st == nil || ws == nil || roundID == "" {
		return false
	}
	if isRoundSealed(st.Events, roundID) {
		return false
	}
	if isW6RoundRunning(st.Events, roundID) {
		return true
	}
	if ws.SubAgentStatus == "running" {
		return true
	}
	if !workflowHasDraftMarkdown(ws) || workflowRoundFinalized(ws) {
		return false
	}
	return workflowIsTerminal(ws)
}

// syncW6DraftIdleStatus appends w6_status=idle when upstream finished but timeline still shows running.
func (s *Service) syncW6DraftIdleStatus(sessionID string) {
	st, err := s.EnsureMigrated(sessionID)
	if err != nil || st == nil {
		return
	}
	roundID := findUnsealedW6Round(st)
	if roundID == "" {
		return
	}
	if lastW6Status(st.Events, roundID) != string(W6StatusRunning) {
		return
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return
	}
	if !workflowIsTerminal(ws) && !hasDraftReadyLog(st.Events, roundID) {
		return
	}
	if !workflowHasDraftMarkdown(ws) && !hasDraftReadyLog(st.Events, roundID) {
		return
	}
	_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusIdle)
}

func hasDraftReadyLog(events []SessionEvent, roundID string) bool {
	for _, ev := range events {
		if ev.RoundID != roundID || ev.Type != EventW6Log {
			continue
		}
		body := strings.TrimSpace(ev.Body)
		if strings.Contains(body, "报告草稿就绪") || strings.Contains(body, "W6 已 idle") {
			return true
		}
	}
	return false
}

func (b *W6Bridge) maybeAppendW6Idle(sessionID, roundID string, ev w6.Event) {
	if !hubEventMarksW6Idle(ev) {
		return
	}
	st, _, _ := b.events.Load(sessionID)
	if st == nil || isRoundSealed(st.Events, roundID) {
		return
	}
	if last := lastW6Status(st.Events, roundID); last != string(W6StatusRunning) {
		return
	}
	_, _ = b.events.AppendW6Status(sessionID, roundID, W6StatusIdle)
}
