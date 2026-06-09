package osintdashboard

import (
	"strings"
	"time"
	"unicode/utf8"
)

const maxSessionTitleRunes = 30

var autoSessionTitles = map[string]struct{}{
	"":     {},
	"新会话":   {},
	"新研究":   {},
	"新对话":   {},
	"调研主题": {},
}

// IsAutoSessionTitle reports whether the title is still the default placeholder.
func IsAutoSessionTitle(title string) bool {
	_, ok := autoSessionTitles[strings.TrimSpace(title)]
	return ok
}

// TruncateSessionTitle shortens text for sidebar display.
func TruncateSessionTitle(s string, maxRunes int) string {
	if maxRunes <= 0 {
		maxRunes = maxSessionTitleRunes
	}
	s = strings.TrimSpace(s)
	if s == "" {
		return ""
	}
	if utf8.RuneCountInString(s) <= maxRunes {
		return s
	}
	runes := []rune(s)
	return string(runes[:maxRunes]) + "…"
}

// UpdateSessionTitleIfAuto sets the session title only when it is still a default placeholder.
// Returns the persisted title and whether it changed.
func (s *Service) UpdateSessionTitleIfAuto(sessionID, title string) (string, bool, error) {
	title = TruncateSessionTitle(title, maxSessionTitleRunes)
	if title == "" {
		return "", false, nil
	}
	sess, err := s.sessions.GetByID(sessionID)
	if err != nil {
		return "", false, err
	}
	if !IsAutoSessionTitle(sess.Title) {
		return sess.Title, false, nil
	}
	if sess.Title == title {
		return title, false, nil
	}
	sess.Title = title
	sess.UpdatedAt = time.Now().UTC()
	if err := s.sessions.Update(sess); err != nil {
		return "", false, err
	}
	return title, true, nil
}
