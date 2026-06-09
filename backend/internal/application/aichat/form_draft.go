package aichat

import (
	"encoding/json"
	"fmt"
	"strings"

	wsdk "ws-chat-tester/sdk"
)

type formDraftPayload struct {
	DraftID    string `json:"draft_id"`
	SkillID    string `json:"skill_id"`
	SkillKey   string `json:"skill_key"`
	SkillName  string `json:"skill_name"`
	FormSchema string `json:"form_schema"`
	RoundID    string `json:"round_id,omitempty"`
}

func parseFormDraftPayload(ev SessionEvent) formDraftPayload {
	var p formDraftPayload
	if len(ev.Payload) > 0 {
		_ = json.Unmarshal(ev.Payload, &p)
	}
	if p.DraftID == "" {
		p.DraftID = strings.TrimSpace(ev.DraftID)
	}
	return p
}

func draftIDFromEvent(ev SessionEvent) string {
	if id := strings.TrimSpace(ev.DraftID); id != "" {
		return id
	}
	return strings.TrimSpace(parseFormDraftPayload(ev).DraftID)
}

// pendingFormDraftIDs returns draft ids still open (presented but not cancelled/submitted).
func pendingFormDraftIDs(events []SessionEvent) []string {
	presented := map[string]int{}
	cancelled := map[string]bool{}
	submitted := map[string]bool{}
	order := []string{}
	for _, ev := range events {
		switch ev.Type {
		case EventFormPresented:
			id := draftIDFromEvent(ev)
			if id == "" {
				continue
			}
			if _, ok := presented[id]; !ok {
				order = append(order, id)
			}
			presented[id]++
		case EventFormCancelled:
			id := draftIDFromEvent(ev)
			if id != "" {
				cancelled[id] = true
			}
		case EventFormDraftSubmitted:
			id := draftIDFromEvent(ev)
			if id != "" {
				submitted[id] = true
			}
		}
	}
	out := make([]string, 0)
	for _, id := range order {
		if presented[id] > 0 && !cancelled[id] && !submitted[id] {
			out = append(out, id)
		}
	}
	return out
}

func (s *Service) cancelPendingFormDrafts(sessionID string, exceptDraftID string) error {
	st, _, err := s.events.Load(sessionID)
	if err != nil {
		return err
	}
	for _, id := range pendingFormDraftIDs(st.Events) {
		if exceptDraftID != "" && id == exceptDraftID {
			continue
		}
		if _, err := s.events.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
			return SessionEvent{
				Type:    EventFormCancelled,
				DraftID: id,
				Payload: mustJSON(formDraftPayload{DraftID: id}),
			}
		}); err != nil {
			return err
		}
	}
	return nil
}

type PresentFormDraftRequest struct {
	SkillID    string `json:"skill_id"`
	SkillKey   string `json:"skill_key"`
	SkillName  string `json:"skill_name"`
	FormSchema string `json:"form_schema"`
}

// PresentFormDraft appends form_presented and cancels any other pending drafts.
func (s *Service) PresentFormDraft(sessionID string, req PresentFormDraftRequest) (string, error) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return "", err
	}
	skillKey := strings.TrimSpace(req.SkillKey)
	if skillKey == "" {
		return "", fmt.Errorf("skill_key required")
	}
	if strings.TrimSpace(req.FormSchema) == "" {
		return "", fmt.Errorf("form_schema required")
	}
	if err := s.cancelPendingFormDrafts(sessionID, ""); err != nil {
		return "", err
	}
	draftID := "fd-" + wsdk.RandomSessionID(8)
	payload := formDraftPayload{
		DraftID:    draftID,
		SkillID:    strings.TrimSpace(req.SkillID),
		SkillKey:   skillKey,
		SkillName:  strings.TrimSpace(req.SkillName),
		FormSchema: req.FormSchema,
	}
	if _, err := s.events.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventFormPresented,
			DraftID: draftID,
			Topic:   payload.SkillName,
			Body:    payload.SkillName,
			Payload: mustJSON(payload),
		}
	}); err != nil {
		return "", err
	}
	return draftID, nil
}

// CancelFormDraft marks one pending draft as cancelled.
func (s *Service) CancelFormDraft(sessionID, draftID string) error {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return err
	}
	draftID = strings.TrimSpace(draftID)
	if draftID == "" {
		return fmt.Errorf("draft_id required")
	}
	st, _, err := s.events.Load(sessionID)
	if err != nil {
		return err
	}
	pending := pendingFormDraftIDs(st.Events)
	found := false
	for _, id := range pending {
		if id == draftID {
			found = true
			break
		}
	}
	if !found {
		return fmt.Errorf("draft not found or not pending")
	}
	_, err = s.events.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventFormCancelled,
			DraftID: draftID,
			Payload: mustJSON(formDraftPayload{DraftID: draftID}),
		}
	})
	return err
}

func (s *Service) markFormDraftSubmitted(sessionID, draftID, roundID string) error {
	draftID = strings.TrimSpace(draftID)
	if draftID == "" {
		return nil
	}
	_, err := s.events.Append(sessionID, func(st *ConversationState, seq, at int64) SessionEvent {
		return SessionEvent{
			Type:    EventFormDraftSubmitted,
			DraftID: draftID,
			RoundID: roundID,
			Payload: mustJSON(formDraftPayload{DraftID: draftID, RoundID: roundID}),
		}
	})
	return err
}
