package aichat

import "strings"

func findUnsealedLLMRound(st *ConversationState) string {
	if st == nil {
		return ""
	}
	seen := map[string]bool{}
	candidates := []string{}
	if rid := strings.TrimSpace(st.ActiveRoundID); rid != "" {
		candidates = append(candidates, rid)
	}
	for _, r := range DeriveRounds(st.Events) {
		if r.Sealed {
			continue
		}
		if r.Kind == RoundKindDeepSeek || r.Kind == RoundKindDiscuss {
			candidates = append(candidates, r.ID)
		}
	}
	for _, rid := range candidates {
		if seen[rid] || isRoundSealed(st.Events, rid) {
			continue
		}
		if !isLLMRoundKind(st.Events, rid) {
			continue
		}
		seen[rid] = true
		return rid
	}
	return ""
}

func isLLMRoundKind(events []SessionEvent, roundID string) bool {
	for _, ev := range events {
		if ev.RoundID != roundID || ev.Type != EventRoundStarted {
			continue
		}
		k := RoundKind(ev.Kind)
		return k == RoundKindDeepSeek || k == RoundKindDiscuss
	}
	return false
}

// healUnsealedLLMRound seals discuss/deepseek rounds that stalled without finishLLMRound (e.g. panic, restart).
func (s *Service) healUnsealedLLMRound(sessionID string) {
	st, err := s.EnsureMigrated(sessionID)
	if err != nil || st == nil {
		return
	}
	roundID := findUnsealedLLMRound(st)
	if roundID == "" || isRoundSealed(st.Events, roundID) {
		return
	}
	stall := roundStallDuration(st.Events, roundID)
	if stall < llmMonitorMaxStall {
		return
	}
	s.cancelLLMRound(sessionID, roundID)
	if isRoundSealed(loadEvents(s, sessionID), roundID) {
		return
	}
	_, _ = s.events.AppendAssistantDelta(sessionID, roundID, "❌ 回复生成超时，请稍后重试。")
	_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealReconciled)
}
