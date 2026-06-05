package pptxgenjs

import (
	"encoding/json"
	"strings"
)

func IsPptxgenjsProject(description *string) bool {
	if description == nil {
		return false
	}
	return strings.Contains(*description, `"app":"pptxgenjs"`) || strings.Contains(*description, `"app": "pptxgenjs"`)
}

func ProjectDescription(sessionID string, prefs map[string]string) string {
	meta := map[string]any{"app": "pptxgenjs", "session_id": sessionID}
	for k, v := range prefs {
		meta[k] = v
	}
	b, _ := json.Marshal(meta)
	return string(b)
}

func DeriveTitleFromMD(md string) string {
	for _, line := range strings.Split(md, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		line = strings.TrimLeft(line, "#")
		line = strings.TrimSpace(line)
		if line != "" {
			if len(line) > 120 {
				return line[:120]
			}
			return line
		}
	}
	return "未命名演示"
}

func ParsePreferences(description *string) map[string]string {
	out := map[string]string{"theme": "midnight-exec"}
	if description == nil {
		return out
	}
	var meta map[string]any
	if json.Unmarshal([]byte(*description), &meta) != nil {
		return out
	}
	for _, k := range []string{"theme", "audience", "language", "target_slide_count", "page_count_mode"} {
		if v, ok := meta[k].(string); ok && strings.TrimSpace(v) != "" {
			out[k] = v
		}
	}
	return out
}
