package aichat

import (
	"context"
	"log"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

// ReconcileActiveRound detects an unsealed W6 round whose upstream work already finished
// (common after server restart) and emits the missing terminal events.
// Returns true when the round was sealed during this call.
func (s *Service) ReconcileActiveRound(sessionID string) bool {
	st, err := s.EnsureMigrated(sessionID)
	if err != nil || st == nil {
		return false
	}
	roundID := findUnsealedW6Round(st)
	if roundID == "" {
		return false
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return false
	}
	force := workflowCanForceFinalizeOnReload(st.Events, roundID, ws)
	if !workflowIsTerminal(ws) && !force {
		return false
	}
	if !workflowIdleForSeal(ws) && !force {
		return false
	}
	if !s.ensureW6RoundFinalized(context.Background(), sessionID, ws, st.Events, roundID, force) {
		return false
	}
	s.finalizeReconciledRound(sessionID, roundID)
	return true
}

// attemptW6RoundCompletion runs render/save when the idle gate passes and seals the round
// if the W6Bridge missed the hub done event.
func (s *Service) attemptW6RoundCompletion(sessionID, roundID string) {
	s.tryCompleteW6Round(sessionID, roundID, false)
}

func (s *Service) tryCompleteW6Round(sessionID, roundID string, forceOnReload bool) {
	ctx := context.Background()
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return
	}
	force := forceOnReload && workflowCanForceFinalizeOnReload(loadEvents(s, sessionID), roundID, ws)
	if !workflowIsTerminal(ws) && !force {
		return
	}
	if !workflowIdleForSeal(ws) && !force {
		return
	}
	st, _, _ := s.events.Load(sessionID)
	events := []SessionEvent{}
	if st != nil {
		events = st.Events
	}
	if !s.ensureW6RoundFinalized(ctx, sessionID, ws, events, roundID, force) {
		return
	}
	if st != nil && isRoundSealed(st.Events, roundID) {
		s.SyncRoundCompletion(sessionID, roundID)
		return
	}
	s.finalizeReconciledRound(sessionID, roundID)
}

func (s *Service) ensureW6RoundFinalized(
	ctx context.Context,
	sessionID string,
	ws *osintdashboard.WorkflowState,
	events []SessionEvent,
	roundID string,
	force bool,
) bool {
	if workflowRoundFinalized(ws) {
		return true
	}
	if !roundHasFinalizeDraft(events, roundID, ws) {
		return false
	}
	if !s.osint.TryFinishW6Round(ctx, sessionID, force) {
		log.Printf("[aichat] reconcile finalize failed session=%s round=%s force=%v ws_md=%v draft_log=%v",
			sessionID, roundID, force, workflowHasDraftMarkdown(ws), hasDraftReadyLog(events, roundID))
		return false
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	return err == nil && ws != nil && workflowRoundFinalized(ws)
}

func (s *Service) finalizeReconciledRound(sessionID, roundID string) {
	if !isRoundSealed(loadEvents(s, sessionID), roundID) {
		if _, err := s.events.AppendW6StatusForRound(sessionID, roundID, W6StatusDone); err != nil {
			log.Printf("[aichat] reconcile w6_status done failed session=%s round=%s: %v", sessionID, roundID, err)
		}
		if _, err := s.events.AppendRoundSealed(sessionID, roundID, SealReconciled); err != nil {
			log.Printf("[aichat] reconcile round_sealed failed session=%s round=%s: %v", sessionID, roundID, err)
		}
	}
	s.SyncRoundCompletion(sessionID, roundID)
	s.bridge.Unbind(sessionID)
	s.idle.Stop(sessionID)
}

func loadEvents(s *Service, sessionID string) []SessionEvent {
	st, _, err := s.events.Load(sessionID)
	if err != nil || st == nil {
		return nil
	}
	return st.Events
}

// roundHasFinalizeDraft is true when workflow holds markdown or timeline logs confirm draft idle.
func roundHasFinalizeDraft(events []SessionEvent, roundID string, ws *osintdashboard.WorkflowState) bool {
	return workflowHasDraftMarkdown(ws) || hasDraftReadyLog(events, roundID)
}

// workflowCanForceFinalizeOnReload is true on GET /timeline when draft exists but HTML was never saved.
// Skips the live 15s idle gate — does not restart upstream W6 research.
func workflowCanForceFinalizeOnReload(events []SessionEvent, roundID string, ws *osintdashboard.WorkflowState) bool {
	if ws == nil || workflowRoundFinalized(ws) {
		return false
	}
	if !roundHasFinalizeDraft(events, roundID, ws) {
		return false
	}
	if roundDraftIdleConfirmed(events, roundID) {
		return true
	}
	return workflowIsTerminal(ws) && workflowHasDraftMarkdown(ws)
}

func roundDraftIdleConfirmed(events []SessionEvent, roundID string) bool {
	if lastW6Status(events, roundID) == string(W6StatusIdle) {
		return true
	}
	return hasDraftReadyLog(events, roundID)
}

func findUnsealedW6Round(st *ConversationState) string {
	if st == nil {
		return ""
	}
	candidates := []string{}
	if rid := strings.TrimSpace(st.ActiveRoundID); rid != "" {
		candidates = append(candidates, rid)
	}
	for _, r := range DeriveRounds(st.Events) {
		if !r.Sealed && (r.Kind == RoundKindW6Form || r.Kind == RoundKindW6Manual) && r.Phase == PhaseW6Running {
			candidates = append(candidates, r.ID)
		}
	}
	seen := map[string]bool{}
	for _, rid := range candidates {
		if seen[rid] || isRoundSealed(st.Events, rid) {
			continue
		}
		if !isW6RoundKind(st.Events, rid) {
			continue
		}
		seen[rid] = true
		return rid
	}
	return ""
}

func isW6RoundKind(events []SessionEvent, roundID string) bool {
	for _, ev := range events {
		if ev.RoundID != roundID || ev.Type != EventRoundStarted {
			continue
		}
		k := RoundKind(ev.Kind)
		return k == RoundKindW6Form || k == RoundKindW6Manual || k == ""
	}
	return false
}

// workflowRoundFinalized is true after render/save produced persisted report resources.
func workflowRoundFinalized(ws *osintdashboard.WorkflowState) bool {
	if ws == nil {
		return false
	}
	return strings.TrimSpace(ws.LastHTMLResourceID) != "" ||
		strings.TrimSpace(ws.LastMDResourceID) != ""
}

func workflowHasDraftMarkdown(ws *osintdashboard.WorkflowState) bool {
	return ws != nil && strings.TrimSpace(ws.Markdown) != ""
}

func workflowIsTerminal(ws *osintdashboard.WorkflowState) bool {
	if ws == nil {
		return false
	}
	switch strings.TrimSpace(ws.SubAgentStatus) {
	case "running":
		return false
	default:
		return true
	}
}

func workflowIdleForSeal(ws *osintdashboard.WorkflowState) bool {
	return osintdashboard.WorkflowIdleForSeal(ws)
}
