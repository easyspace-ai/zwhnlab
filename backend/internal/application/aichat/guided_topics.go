package aichat

import (
	"regexp"
	"strings"
)

const (
	guidedTopicLimit     = 4
	maxGuidedTopicChars  = 200
)

var guidedSystemPromptPattern = regexp.MustCompile(`你是一个.{0,24}(助手|专家|模型|AI|智能体)`)

// IsUsableGuidedTopicText filters skill prompts and oversized blobs from follow-up chips.
func IsUsableGuidedTopicText(raw string) bool {
	q := strings.TrimSpace(raw)
	if q == "" || len([]rune(q)) > maxGuidedTopicChars {
		return false
	}
	return !guidedSystemPromptPattern.MatchString(q)
}

// ResolveGuidedTopics merges hub/workflow follow-ups with skill-key defaults, capped at 4.
func ResolveGuidedTopics(followUps []string, skillKey, reportTitle string) []string {
	seen := map[string]struct{}{}
	out := make([]string, 0, guidedTopicLimit)

	add := func(raw string) {
		q := strings.TrimSpace(raw)
		if q == "" || !IsUsableGuidedTopicText(q) {
			return
		}
		if _, ok := seen[q]; ok || len(out) >= guidedTopicLimit {
			return
		}
		seen[q] = struct{}{}
		out = append(out, q)
	}

	for _, q := range followUps {
		add(q)
	}
	if len(out) < guidedTopicLimit {
		for _, q := range defaultGuidedTopics(skillKey, reportTitle) {
			add(q)
			if len(out) >= guidedTopicLimit {
				break
			}
		}
	}
	return out
}

func defaultGuidedTopics(skillKey, reportTitle string) []string {
	topic := strings.TrimSpace(reportTitle)
	if topic == "" {
		topic = "本次研究主题"
	}
	switch strings.TrimSpace(skillKey) {
	case "info_research":
		return []string{
			"针对「" + topic + "」还有哪些信息缺口需要补充调研？",
			"请梳理报告中的关键实体及其关联关系",
			"对比不同信源对该主题的说法差异",
			"请给出 3 条可执行的后续开源调查方向",
		}
	case "data_collection":
		return []string{
			"「" + topic + "」相关公开数据还有哪些未收录？",
			"请验证报告中关键数据的原始出处",
			"哪些指标值得建立持续监测？",
			"请列出可复用的数据采集渠道与方法",
		}
	default:
		return []string{
			"报告中对「" + topic + "」的核心结论是什么？",
			"有哪些关键证据仍需要进一步核实？",
			"如果该主张在社交媒体传播，应如何辟谣或标注？",
			"请列出 3 条可执行的下一步调查建议。",
		}
	}
}
