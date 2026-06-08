package aichat

import "strings"

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
	hasReport, hasFollowUps := roundCompletionFlags(st.Events, roundID)
	title := strings.TrimSpace(ws.Topic)
	if title == "" {
		title = "调研报告"
	}
	if !hasReport && strings.TrimSpace(ws.LastHTMLResourceID) != "" {
		_, _ = s.events.AppendReportReady(sessionID, roundID, title, ws.LastMDResourceID, ws.LastHTMLResourceID)
	}
	if !hasFollowUps && len(ws.FollowUps) > 0 {
		_, _ = s.events.AppendFollowUps(sessionID, roundID, ws.FollowUps)
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
	roundID := latestSealedW6RoundIDFromEvents(st.Events)
	if roundID == "" {
		return
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

func roundCompletionFlags(events []SessionEvent, roundID string) (hasReport, hasFollowUps bool) {
	for _, ev := range events {
		if ev.RoundID != roundID {
			continue
		}
		switch ev.Type {
		case EventReportReady:
			if strings.TrimSpace(ev.HTMLID) != "" || strings.TrimSpace(ev.MDID) != "" {
				hasReport = true
			}
		case EventFollowUps:
			if len(ev.Questions) > 0 {
				hasFollowUps = true
			}
		}
	}
	return hasReport, hasFollowUps
}

func containsStr(list []string, v string) bool {
	for _, x := range list {
		if x == v {
			return true
		}
	}
	return false
}
