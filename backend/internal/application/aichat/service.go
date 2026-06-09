package aichat

import (
	"context"
	"fmt"
	"strings"
	"sync"

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
	llmMu       sync.Mutex
	llmCancels  map[string]*llmRoundWatch
}

func NewService(
	sessions domainproject.SessionRepository,
	osint *osintdashboard.Service,
) *Service {
	repo := NewRepoSessionStore(sessions)
	events := NewEventStore(repo)
	svc := &Service{
		events:     events,
		osint:      osint,
		sessions:   sessions,
		llmCancels: map[string]*llmRoundWatch{},
	}
	bridge := NewW6Bridge(events, osint.Hub(), func(sessionID, roundID string) {
		svc.SyncRoundCompletion(sessionID, roundID)
	})
	svc.bridge = bridge
	idle := NewIdleWatcher(events, func(sessionID string) (bool, bool) {
		ws, err := osint.Workflow().Get(sessionID)
		if err != nil || ws == nil {
			return false, false
		}
		return osintdashboard.WorkflowIdleForSeal(ws), true
	}, func(sessionID, roundID string) {
		svc.attemptW6RoundCompletion(sessionID, roundID)
	})
	svc.idle = idle
	return svc
}

func (s *Service) EventStore() *EventStore { return s.events }

func (s *Service) EnsureSessionAccess(sessionID, userID string) (*domainproject.Session, error) {
	return s.osint.EnsureSessionAccess(sessionID, userID)
}

// EnsureMigrated loads conversation state. Legacy workflow migration is not supported (fresh data only).
func (s *Service) EnsureMigrated(sessionID string) (*ConversationState, error) {
	st, _, err := s.events.Load(sessionID)
	return st, err
}

// healUnsealedW6Round runs draft sync, reconcile, bridge resume, and completion repair.
func (s *Service) healUnsealedW6Round(sessionID string) {
	s.syncW6DraftIdleStatus(sessionID)
	if !s.ReconcileActiveRound(sessionID) {
		s.ResumeActiveW6(sessionID)
	}
	s.RepairSessionCompletion(sessionID)
}

// healSessionOnTimelineLoad runs W6 finalize/reconcile (page refresh, explicit timeline fetch).
// Incremental SSE polls use sinceSeq > 0 and skip this to avoid hammering finalize + rate limits.
func (s *Service) healSessionOnTimelineLoad(sessionID string) {
	s.healUnsealedW6Round(sessionID)
	s.MaybeSyncSessionTitle(sessionID)
}

// TimelineResult is the paginated timeline payload for GET /timeline.
type TimelineResult struct {
	Events          []SessionEvent
	State           *ConversationState
	HasMore         bool
	OldestSeq       int64
}

// Timeline returns events since seq (incremental) or a paginated window (sinceSeq=0).
func (s *Service) Timeline(sessionID string, sinceSeq int64, limitRounds int, beforeSeq int64) (*TimelineResult, error) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return nil, err
	}
	if sinceSeq <= 0 {
		s.healSessionOnTimelineLoad(sessionID)
	}
	st, _, err := s.events.Load(sessionID)
	if err != nil {
		return nil, err
	}
	if sinceSeq > 0 {
		events, err := s.events.LoadSince(sessionID, sinceSeq)
		if err != nil {
			return nil, err
		}
		return &TimelineResult{Events: events, State: st}, nil
	}
	if limitRounds <= 0 {
		limitRounds = DefaultTimelineLimitRounds
	}
	page := PaginateTimelineEvents(st.Events, limitRounds, beforeSeq)
	return &TimelineResult{
		Events:    page.Events,
		State:     st,
		HasMore:   page.HasMore,
		OldestSeq: page.OldestSeq,
	}, nil
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
	Kind             RoundKind              `json:"kind"`
	SkillKey         string                 `json:"skill_key,omitempty"`
	FormData         map[string]interface{} `json:"form_data,omitempty"`
	Message          string                 `json:"message,omitempty"`
	Prompt           string                 `json:"rendered_prompt,omitempty"`
	ReportStyle      string                 `json:"report_style,omitempty"`
	Mode             string                 `json:"mode,omitempty"` // discuss | edit_html
	TargetResourceID string                 `json:"target_resource_id,omitempty"`
	DraftID          string                 `json:"draft_id,omitempty"`
}

// StartRound begins a new conversation round.
func (s *Service) StartRound(ctx context.Context, sessionID string, req StartRoundRequest) (string, error) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return "", err
	}
	draftID := strings.TrimSpace(req.DraftID)
	if draftID != "" {
		if err := s.cancelPendingFormDrafts(sessionID, draftID); err != nil {
			return "", err
		}
	} else if err := s.cancelPendingFormDrafts(sessionID, ""); err != nil {
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
		if draftID != "" {
			if err := s.markFormDraftSubmitted(sessionID, draftID, roundID); err != nil {
				return "", err
			}
		}
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

	if title := deriveTitleForRound(req.Kind, topic, req.FormData, skillKey); title != "" {
		_, _ = s.events.AppendSessionTitle(sessionID, title)
		_, _, _ = s.osint.UpdateSessionTitleIfAuto(sessionID, title)
	}

	switch req.Kind {
	case RoundKindW6Form, RoundKindW6Manual:
		if req.Kind == RoundKindW6Form && strings.TrimSpace(req.ReportStyle) != "" {
			_ = s.osint.SetReportStyle(sessionID, req.ReportStyle)
		}
		prompt := strings.TrimSpace(req.Prompt)
		if prompt == "" {
			prompt = topic
		}
		_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusRunning)
		s.bridge.Bind(sessionID, roundID)
		s.idle.Track(sessionID, roundID)
		s.osint.StartW6Round(ctx, sessionID, prompt, topic)
		s.bridge.EnsureWatch(context.Background(), sessionID)
	case RoundKindDeepSeek:
		go s.runDeepSeekRound(sessionID, roundID, topic)
	case RoundKindDiscuss:
		if isEditHTMLDiscuss(req.Mode, req.TargetResourceID) {
			go s.runEditHTMLRound(sessionID, roundID, strings.TrimSpace(req.TargetResourceID), topic)
		} else {
			go s.runDiscussRound(sessionID, roundID, topic, strings.TrimSpace(req.TargetResourceID))
		}
	}

	return roundID, nil
}

// StopRound stops the active round (W6 or streaming LLM).
func (s *Service) StopRound(sessionID, roundID string) error {
	st, _, err := s.events.Load(sessionID)
	if err != nil {
		return err
	}
	if isRoundSealed(st.Events, roundID) {
		return nil
	}
	if isW6RoundKind(st.Events, roundID) {
		s.osint.StopW6Round(sessionID)
		s.idle.Stop(sessionID)
		_, _ = s.events.AppendW6Status(sessionID, roundID, W6StatusStopped)
		_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealStopped)
		s.bridge.Unbind(sessionID)
		return nil
	}
	s.cancelLLMRound(sessionID, roundID)
	_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealStopped)
	return nil
}

func (s *Service) ListReports(sessionID string) ([]*domainproject.Resource, error) {
	return s.osint.ListSessionReports(sessionID)
}

func extractTopicFromForm(form map[string]interface{}) string {
	if topic := topicFromFormData(form); topic != "" {
		return topic
	}
	return defaultFormTopic
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
