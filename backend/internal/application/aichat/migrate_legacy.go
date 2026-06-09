package aichat

import (
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

// MigrateLegacyIfEmpty is retained for reference only. AIChat no longer migrates legacy osint-dashboard sessions.
func MigrateLegacyIfEmpty(sessionID string, workflowRaw, conversationRaw string) (*ConversationState, bool) {
	if strings.TrimSpace(conversationRaw) != "" && conversationRaw != "{}" {
		return ParseConversationState(conversationRaw), false
	}
	ws := osintdashboard.ParseWorkflowState(workflowRaw)
	if len(ws.UIMessages) == 0 && len(ws.StreamEvents) == 0 {
		return NewConversationState(), false
	}
	st := NewConversationState()
	roundID := "legacy-" + sessionID
	seq := int64(1)
	now := time.Now().UnixMilli()
	appendEv := func(ev SessionEvent) {
		ev.Seq = seq
		ev.At = now + seq
		ev.RoundID = roundID
		st.Events = append(st.Events, ev)
		seq++
	}
	topic := strings.TrimSpace(ws.Topic)
	if topic == "" {
		topic = "历史会话"
	}
	appendEv(SessionEvent{
		Type: EventRoundStarted,
		Kind: string(RoundKindW6Form),
		Topic: topic,
	})
	for _, ui := range ws.UIMessages {
		if ui.Role == "user" {
			appendEv(SessionEvent{Type: EventFormSubmitted, Body: ui.Content})
		}
	}
	if ws.SubAgentStatus == "running" {
		st.ActiveRoundID = roundID
		appendEv(SessionEvent{Type: EventW6Status, Status: string(W6StatusRunning)})
	} else if len(ws.StreamEvents) > 0 {
		appendEv(SessionEvent{Type: EventW6Status, Status: string(W6StatusDone)})
		appendEv(SessionEvent{Type: EventRoundSealed, Reason: string(SealTerminal)})
	}
	for _, se := range ws.StreamEvents {
		appendEv(SessionEvent{
			Type:     EventW6Log,
			LogType:  se.Type,
			Body:     firstNonEmpty(se.Message, se.Token),
			Progress: se.Progress,
		})
	}
	if ws.LastHTMLResourceID != "" {
		appendEv(SessionEvent{
			Type:   EventReportReady,
			Title:  topic,
			HTMLID: ws.LastHTMLResourceID,
			MDID:   ws.LastMDResourceID,
		})
	}
	if len(ws.FollowUps) > 0 {
		// INV-2: follow_ups after seal (seal event appended above when not running).
		if ws.SubAgentStatus != "running" {
			appendEv(SessionEvent{Type: EventFollowUps, Questions: ws.FollowUps})
		}
	}
	st.NextSeq = seq
	return st, true
}

func firstNonEmpty(parts ...string) string {
	for _, p := range parts {
		if strings.TrimSpace(p) != "" {
			return p
		}
	}
	return ""
}
