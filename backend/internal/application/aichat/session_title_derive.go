package aichat

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"

	"github.com/easyspace-ai/ylmnote/internal/application/osintdashboard"
)

var formTitleKeys = []string{
	"topic", "target", "subject", "query", "title", "claim",
	"主题", "调研主题", "关注领域", "核查对象", "研究主题",
	"domain", "focus", "field", "theme",
}

var skipFormValueKeys = map[string]struct{}{
	"report_style": {},
	"skill_key":    {},
	"skill_id":     {},
	"draft_id":     {},
}

const defaultFormTopic = "新会话"

func deriveTitleForRound(kind RoundKind, topic string, formData map[string]interface{}, skillKey string) string {
	switch kind {
	case RoundKindW6Form:
		if title := deriveSessionTitleFromFormData(formData); title != "" && !osintdashboard.IsAutoSessionTitle(title) {
			return title
		}
	case RoundKindW6Manual:
		if title := deriveW6SessionTitle(topic); title != "" {
			return title
		}
	}
	topic = strings.TrimSpace(topic)
	if topic != "" && !osintdashboard.IsAutoSessionTitle(topic) {
		return osintdashboard.TruncateSessionTitle(topic, 0)
	}
	return ""
}

func topicFromFormData(form map[string]interface{}) string {
	if form == nil {
		return ""
	}
	for _, key := range formTitleKeys {
		v, ok := form[key]
		if !ok || v == nil {
			continue
		}
		s := strings.TrimSpace(strings.TrimSpace(fmt.Sprint(v)))
		if s != "" && s != "undefined" {
			return osintdashboard.TruncateSessionTitle(s, 0)
		}
	}
	return firstMeaningfulFormValue(form)
}

func firstMeaningfulFormValue(form map[string]interface{}) string {
	keys := make([]string, 0, len(form))
	for k := range form {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, key := range keys {
		if _, skip := skipFormValueKeys[key]; skip {
			continue
		}
		v := form[key]
		if v == nil {
			continue
		}
		s := strings.TrimSpace(fmt.Sprint(v))
		if len(s) < 2 || s == "undefined" {
			continue
		}
		return osintdashboard.TruncateSessionTitle(s, 0)
	}
	return ""
}

func deriveSessionTitleFromFormData(form map[string]interface{}) string {
	if title := topicFromFormData(form); title != "" {
		return title
	}
	return defaultFormTopic
}

func deriveW6SessionTitle(input string) string {
	stripped := stripW6Prefix(strings.TrimSpace(input))
	topic := stripped
	if idx := strings.IndexAny(topic, "\r\n"); idx >= 0 {
		topic = topic[:idx]
	}
	topic = strings.TrimSpace(topic)
	topic = strings.TrimPrefix(topic, "执行：")
	topic = strings.TrimPrefix(topic, "执行:")
	topic = strings.TrimPrefix(topic, "补充信息")
	topic = strings.TrimSpace(topic)
	if topic == "" {
		topic = stripped
	}
	return osintdashboard.TruncateSessionTitle(topic, 0)
}

func stripW6Prefix(text string) string {
	t := strings.TrimLeft(text, " \t")
	if len(t) >= 3 && strings.EqualFold(t[:3], "@w6") {
		return strings.TrimSpace(t[3:])
	}
	return strings.TrimSpace(text)
}

var anchorTitlePrefixes = []string{
	"主题:", "主题：", "topic:", "topic：",
	"调研主题:", "调研主题：", "关注领域:", "关注领域：",
}

func titleFromFormAnchor(anchor string) string {
	for _, line := range strings.Split(anchor, "\n") {
		line = strings.TrimSpace(line)
		for _, prefix := range anchorTitlePrefixes {
			if strings.HasPrefix(line, prefix) {
				val := strings.TrimSpace(strings.TrimPrefix(line, prefix))
				if val != "" {
					return osintdashboard.TruncateSessionTitle(val, 0)
				}
			}
		}
	}
	return ""
}

func parseFormDataPayload(raw []byte) map[string]interface{} {
	if len(raw) == 0 {
		return nil
	}
	var out map[string]interface{}
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil
	}
	return out
}

// deriveTitleFromConversation picks the best title from timeline + workflow for auto-title sync.
func deriveTitleFromConversation(events []SessionEvent, workflowTopic string) string {
	wt := strings.TrimSpace(workflowTopic)
	if wt != "" && !osintdashboard.IsAutoSessionTitle(wt) {
		return osintdashboard.TruncateSessionTitle(wt, 0)
	}
	for i := len(events) - 1; i >= 0; i-- {
		ev := events[i]
		switch ev.Type {
		case EventFormSubmitted:
			if title := titleFromFormAnchor(strings.TrimSpace(ev.Body)); title != "" {
				return title
			}
			if title := deriveSessionTitleFromFormData(parseFormDataPayload(ev.Payload)); title != "" &&
				!osintdashboard.IsAutoSessionTitle(title) {
				return title
			}
		case EventRoundStarted:
			if title := titleFromFormAnchor(strings.TrimSpace(ev.Body)); title != "" {
				return title
			}
			topic := strings.TrimSpace(ev.Topic)
			if topic != "" && !osintdashboard.IsAutoSessionTitle(topic) {
				return osintdashboard.TruncateSessionTitle(topic, 0)
			}
		}
	}
	return ""
}
