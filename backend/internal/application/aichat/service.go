package aichat

import (
	"context"
	"fmt"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
	domainproject "github.com/easyspace-ai/ylmnote/internal/domain/project"
	wsdk "ws-chat-tester/sdk"
)

// Service is the /aichat conversation kernel.
type Service struct {
	events      *EventStore
	osint       *osintdashboard.Service
	bridge      *W6Bridge
	idle        *IdleWatcher
	sessions    domainproject.SessionRepository
}

func NewService(
	sessions domainproject.SessionRepository,
	osint *osintdashboard.Service,
) *Service {
	repo := NewRepoSessionStore(sessions)
	events := NewEventStore(repo)
	svc := &Service{
		events:   events,
		osint:    osint,
		sessions: sessions,
	}
	bridge := NewW6Bridge(events, osint.Hub(), func(sessionID, roundID string) {
		svc.SyncRoundCompletion(sessionID, roundID)
	})
	svc.bridge = bridge
	idle := NewIdleWatcher(events, func(sessionID string) (string, bool) {
		ws, err := osint.Workflow().Get(sessionID)
		if err != nil || ws == nil {
			return "", false
		}
		return ws.SubAgentStatus, true
	}, func(sessionID, roundID string) {
		svc.SyncRoundCompletion(sessionID, roundID)
	})
	svc.idle = idle
	return svc
}

func (s *Service) EventStore() *EventStore { return s.events }

func (s *Service) EnsureSessionAccess(sessionID, userID string) (*domainproject.Session, error) {
	return s.osint.EnsureSessionAccess(sessionID, userID)
}

// EnsureMigrated loads conversation state, migrating legacy workflow if needed.
func (s *Service) EnsureMigrated(sessionID string) (*ConversationState, error) {
	st, sess, err := s.events.Load(sessionID)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(sess.ConversationEvents) != "" && sess.ConversationEvents != "{}" {
		return st, nil
	}
	migrated, ok := MigrateLegacyIfEmpty(sessionID, sess.WorkflowState, sess.ConversationEvents)
	if !ok {
		return st, nil
	}
	sess.ConversationEvents = MarshalConversationState(migrated)
	if err := s.sessions.Update(sess); err != nil {
		return nil, err
	}
	return migrated, nil
}

// Timeline returns events since seq (0 = all).
func (s *Service) Timeline(sessionID string, sinceSeq int64) ([]SessionEvent, *ConversationState, error) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return nil, nil, err
	}
	s.RepairSessionCompletion(sessionID)
	st, _, err := s.events.Load(sessionID)
	if err != nil {
		return nil, nil, err
	}
	if sinceSeq <= 0 {
		return st.Events, st, nil
	}
	events, err := s.events.LoadSince(sessionID, sinceSeq)
	return events, st, err
}

// Summary returns active round and session title hint.
func (s *Service) Summary(sessionID string) (map[string]interface{}, error) {
	st, err := s.EnsureMigrated(sessionID)
	if err != nil {
		return nil, err
	}
	title := ""
	for i := len(st.Events) - 1; i >= 0; i-- {
		if st.Events[i].Type == EventSessionTitle {
			title = st.Events[i].Title
			break
		}
	}
	return map[string]interface{}{
		"session_id":      sessionID,
		"active_round_id": st.ActiveRoundID,
		"next_seq":        st.NextSeq,
		"session_title":   title,
	}, nil
}

type StartRoundRequest struct {
	Kind       RoundKind              `json:"kind"`
	SkillKey   string                 `json:"skill_key,omitempty"`
	FormData   map[string]interface{} `json:"form_data,omitempty"`
	Message    string                 `json:"message,omitempty"`
	Prompt     string                 `json:"rendered_prompt,omitempty"`
	ReportStyle string                `json:"report_style,omitempty"`
}

// StartRound begins a new conversation round.
func (s *Service) StartRound(ctx context.Context, sessionID string, req StartRoundRequest) (string, error) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return "", err
	}
	roundID := wsdk.RandomSessionID(8)
	topic := strings.TrimSpace(req.Message)
	anchor := topic
	skillKey := strings.TrimSpace(req.SkillKey)

	switch req.Kind {
	case RoundKindW6Form:
		if skillKey == "" {
			return "", fmt.Errorf("skill_key required")
		}
		if topic == "" {
			topic = extractTopicFromForm(req.FormData)
		}
		anchor = buildFormAnchor(skillKey, req.FormData)
		if _, err := s.events.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
			return SessionEvent{
				Type:    EventFormSubmitted,
				RoundID: roundID,
				Body:    anchor,
				Payload: mustJSON(req.FormData),
			}
		}); err != nil {
			return "", err
		}
	case RoundKindW6Manual:
		if !strings.HasPrefix(topic, "@w6") {
			anchor = "@w6 " + topic
		}
	case RoundKindDeepSeek, RoundKindDiscuss:
		if topic == "" {
			return "", fmt.Errorf("message required")
		}
	default:
		return "", fmt.Errorf("unknown round kind")
	}

	if _, err := s.events.AppendRoundStarted(sessionID, roundID, req.Kind, topic, anchor, skillKey); err != nil {
		return "", err
	}

	if title, updated, _ := s.osint.UpdateSessionTitleIfAuto(sessionID, topic); updated {
		_, _ = s.events.AppendSessionTitle(sessionID, title)
	}

	switch req.Kind {
	case RoundKindW6Form, RoundKindW6Manual:
		prompt := strings.TrimSpace(req.Prompt)
		if prompt == "" {
			prompt = topic
		}
		_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusRunning)
		s.bridge.Bind(sessionID, roundID)
		s.idle.Track(sessionID, roundID)
		s.osint.StartW6Round(ctx, sessionID, prompt, topic)
		go s.bridge.Watch(context.Background(), sessionID)
	case RoundKindDeepSeek:
		reply := "（DeepSeek 对话将通过 discuss 适配器接入；当前为占位回复。）"
		_, _ = s.events.AppendAssistantDelta(sessionID, roundID, reply)
		_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealTerminal)
	case RoundKindDiscuss:
		result, err := s.osint.Discuss(ctx, sessionID, topic)
		if err != nil {
			return "", err
		}
		_, _ = s.events.AppendAssistantDelta(sessionID, roundID, result.Reply)
		_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealTerminal)
	}

	return roundID, nil
}

// StopRound stops W6 for a round.
func (s *Service) StopRound(sessionID, roundID string) error {
	s.osint.StopW6Round(sessionID)
	s.idle.Stop(sessionID)
	_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusStopped)
	_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealStopped)
	s.bridge.Unbind(sessionID)
	return nil
}

func (s *Service) ListReports(sessionID string) ([]*domainproject.Resource, error) {
	return s.osint.ListSessionReports(sessionID)
}

func extractTopicFromForm(form map[string]interface{}) string {
	for _, k := range []string{"topic", "target", "subject"} {
		if v, ok := form[k]; ok {
			if s, ok := v.(string); ok && strings.TrimSpace(s) != "" {
				return strings.TrimSpace(s)
			}
		}
	}
	return "调研任务"
}

func buildFormAnchor(skillKey string, form map[string]interface{}) string {
	var b strings.Builder
	b.WriteString("执行：")
	b.WriteString(skillKey)
	for k, v := range form {
		b.WriteString("\n")
		b.WriteString(k)
		b.WriteString(": ")
		b.WriteString(fmt.Sprint(v))
	}
	return b.String()
}
