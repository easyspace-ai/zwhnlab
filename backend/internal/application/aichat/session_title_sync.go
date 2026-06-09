package aichat

import (
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

// MaybeSyncSessionTitle updates session + timeline title when still on a default placeholder.
func (s *Service) MaybeSyncSessionTitle(sessionID string) {
	st, _, err := s.events.Load(sessionID)
	if err != nil || st == nil {
		return
	}
	wsTopic := ""
	if ws, wsErr := s.osint.Workflow().Get(sessionID); wsErr == nil && ws != nil {
		wsTopic = strings.TrimSpace(ws.Topic)
	}
	title := deriveTitleFromConversation(st.Events, wsTopic)
	if title == "" || osintdashboard.IsAutoSessionTitle(title) {
		return
	}
	if _, updated, _ := s.osint.UpdateSessionTitleIfAuto(sessionID, title); updated {
		_, _ = s.events.AppendSessionTitle(sessionID, title)
		return
	}
	for i := len(st.Events) - 1; i >= 0; i-- {
		if st.Events[i].Type == EventSessionTitle {
			if osintdashboard.IsAutoSessionTitle(st.Events[i].Title) {
				_, _ = s.events.AppendSessionTitle(sessionID, title)
			}
			return
		}
	}
	_, _ = s.events.AppendSessionTitle(sessionID, title)
}
