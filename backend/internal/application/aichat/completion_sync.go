package aichat

import (
	"context"
	"log"
	"strings"
	"time"
)

// SyncRoundCompletion backfills report_ready and follow_ups from workflow when events are missing.
func (s *Service) SyncRoundCompletion(sessionID, roundID string) {
	if strings.TrimSpace(roundID) == "" {
		roundID = latestSealedW6RoundID(sessionID, s)
	}
	if roundID == "" {
		return
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return
	}
	st, _, err := s.events.Load(sessionID)
	if err != nil || st == nil {
		return
	}
	hasReport, hasFollowUps := roundCompletionFlags(st.Events, roundID, ws.LastMDResourceID, ws.LastHTMLResourceID)
	title := strings.TrimSpace(ws.Topic)
	if title == "" {
		title = "调研报告"
	}
	if !hasReport && strings.TrimSpace(ws.LastHTMLResourceID) != "" {
		s.appendReportReadyWithRetry(sessionID, roundID, title, ws.LastMDResourceID, ws.LastHTMLResourceID)
	}
	if !hasFollowUps && len(ws.FollowUps) > 0 {
		skillKey := skillKeyForRound(s.events, sessionID, roundID)
		questions := ResolveGuidedTopics(ws.FollowUps, skillKey, title)
		if len(questions) > 0 {
			s.appendFollowUpsWithRetry(sessionID, roundID, questions)
		}
	}
	s.MaybeSyncSessionTitle(sessionID)
}

func (s *Service) appendReportReadyWithRetry(sessionID, roundID, title, mdID, htmlID string) {
	var lastErr error
	for attempt := 0; attempt < 3; attempt++ {
		if attempt > 0 {
			time.Sleep(time.Duration(attempt) * 200 * time.Millisecond)
		}
		if _, err := s.events.AppendReportReady(sessionID, roundID, title, mdID, htmlID); err != nil {
			lastErr = err
			continue
		}
		return
	}
	if lastErr != nil {
		log.Printf("[aichat] AppendReportReady failed session=%s round=%s: %v", sessionID, roundID, lastErr)
	}
}

func (s *Service) appendFollowUpsWithRetry(sessionID, roundID string, questions []string) {
	var lastErr error
	for attempt := 0; attempt < 3; attempt++ {
		if attempt > 0 {
			time.Sleep(time.Duration(attempt) * 200 * time.Millisecond)
		}
		if _, err := s.events.AppendFollowUps(sessionID, roundID, questions); err != nil {
			lastErr = err
			continue
		}
		return
	}
	if lastErr != nil {
		log.Printf("[aichat] AppendFollowUps failed session=%s round=%s: %v", sessionID, roundID, lastErr)
	}
}

func (s *Service) RepairSessionCompletion(sessionID string) {
	if _, err := s.EnsureMigrated(sessionID); err != nil {
		return
	}
	st, _, err := s.events.Load(sessionID)
	if err != nil || st == nil {
		return
	}
	if rid := findUnsealedW6Round(st); rid != "" {
		ws, wsErr := s.osint.Workflow().Get(sessionID)
		if wsErr == nil && ws != nil {
			force := workflowCanForceFinalizeOnReload(st.Events, rid, ws)
			if (workflowIsTerminal(ws) || force) && (workflowIdleForSeal(ws) || force) {
				if s.ensureW6RoundFinalized(context.Background(), sessionID, ws, st.Events, rid, force) {
					s.finalizeReconciledRound(sessionID, rid)
					return
				}
			}
		}
	}
	roundID := latestSealedW6RoundIDFromEvents(st.Events)
	if roundID == "" {
		return
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		s.SyncRoundCompletion(sessionID, roundID)
		return
	}
	hasReport, _ := roundCompletionFlags(st.Events, roundID, ws.LastMDResourceID, ws.LastHTMLResourceID)
	if !hasReport && workflowHasDraftMarkdown(ws) && !workflowRoundFinalized(ws) {
		force := workflowCanForceFinalizeOnReload(st.Events, roundID, ws)
		if (workflowIsTerminal(ws) || force) && (workflowIdleForSeal(ws) || force) {
			_ = s.ensureW6RoundFinalized(context.Background(), sessionID, ws, st.Events, roundID, force)
		}
	}
	s.SyncRoundCompletion(sessionID, roundID)
}

func latestSealedW6RoundID(sessionID string, s *Service) string {
	st, _, err := s.events.Load(sessionID)
	if err != nil || st == nil {
		return ""
	}
	return latestSealedW6RoundIDFromEvents(st.Events)
}

func latestSealedW6RoundIDFromEvents(events []SessionEvent) string {
	sealed := map[string]bool{}
	kinds := map[string]RoundKind{}
	order := []string{}
	for _, ev := range events {
		rid := strings.TrimSpace(ev.RoundID)
		if rid == "" {
			continue
		}
		if ev.Type == EventRoundStarted {
			kinds[rid] = RoundKind(ev.Kind)
			if !containsStr(order, rid) {
				order = append(order, rid)
			}
		}
		if ev.Type == EventRoundSealed {
			sealed[rid] = true
		}
	}
	for i := len(order) - 1; i >= 0; i-- {
		rid := order[i]
		if !sealed[rid] {
			continue
		}
		k := kinds[rid]
		if k == RoundKindW6Form || k == RoundKindW6Manual || k == "" {
			return rid
		}
	}
	return ""
}

func roundCompletionFlags(events []SessionEvent, roundID, mdID, htmlID string) (hasReport, hasFollowUps bool) {
	for _, ev := range events {
		if ev.RoundID != roundID {
			continue
		}
		switch ev.Type {
		case EventReportReady:
			if roundHasReportReady(ev) {
				hasReport = true
			}
		case EventFollowUps:
			if len(ev.Questions) > 0 {
				hasFollowUps = true
			}
		}
	}
	_ = mdID
	_ = htmlID
	return hasReport, hasFollowUps
}

func roundHasReportReady(ev SessionEvent) bool {
	return strings.TrimSpace(ev.HTMLID) != "" || strings.TrimSpace(ev.MDID) != ""
}

func containsStr(list []string, v string) bool {
	for _, x := range list {
		if x == v {
			return true
		}
	}
	return false
}
