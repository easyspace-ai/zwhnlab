package aichat

import (
	"context"
)

// ResumeActiveW6 re-binds W6Bridge and IdleWatcher when a session still has a running W6 round
// (e.g. after page reload or session switch).
func (s *Service) ResumeActiveW6(sessionID string) {
	st, err := s.EnsureMigrated(sessionID)
	if err != nil || st == nil {
		return
	}
	roundID := findUnsealedW6Round(st)
	if roundID == "" {
		return
	}
	if isRoundSealed(st.Events, roundID) {
		return
	}
	ws, err := s.osint.Workflow().Get(sessionID)
	if err != nil || ws == nil {
		return
	}
	if workflowCanForceFinalizeOnReload(st.Events, roundID, ws) {
		s.tryCompleteW6Round(sessionID, roundID, true)
		st, _ = s.EnsureMigrated(sessionID)
		if st != nil && isRoundSealed(st.Events, roundID) {
			return
		}
	}
	if !roundNeedsIdleWatcher(st, ws, roundID) {
		return
	}
	s.bridge.Bind(sessionID, roundID)
	s.idle.Track(sessionID, roundID)
	s.bridge.EnsureWatch(context.Background(), sessionID)
}

func isRoundSealed(events []SessionEvent, roundID string) bool {
	for _, ev := range events {
		if ev.RoundID == roundID && ev.Type == EventRoundSealed {
			return true
		}
	}
	return false
}

func isW6RoundRunning(events []SessionEvent, roundID string) bool {
	running := false
	for _, ev := range events {
		if ev.RoundID != roundID {
			continue
		}
		switch ev.Type {
		case EventW6Status:
			switch W6Status(ev.Status) {
			case W6StatusRunning:
				running = true
			case W6StatusIdle:
				running = false
			case W6StatusDone, W6StatusError, W6StatusStopped:
				return false
			}
		case EventRoundSealed:
			return false
		}
	}
	return running
}
