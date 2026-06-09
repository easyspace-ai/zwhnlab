package w6

import (
	"context"
	"strings"

	wsdk "ws-chat-tester/sdk"
)

func lastUserMessageIndex(messages []wsdk.AgentMessage) int {
	last := -1
	for i, msg := range messages {
		if strings.EqualFold(msg.Kind, "from_user") {
			last = i
		}
	}
	return last
}

// latestMarkdownFromMessages returns the last markdown artifact in the current round
// (messages after the most recent from_user prompt).
func (r *Runner) latestMarkdownFromMessages(ctx context.Context, messages []wsdk.AgentMessage) string {
	start := lastUserMessageIndex(messages) + 1
	if start < 0 {
		start = 0
	}
	var md string
	for i := start; i < len(messages); i++ {
		msg := messages[i]
		if strings.EqualFold(msg.Kind, "from_user") {
			continue
		}
		if candidate := r.extractMarkdownFromMessage(ctx, msg); candidate != "" {
			md = candidate
		}
	}
	return md
}

// latestUserFacingText compiles assistant user_facing text for the current round.
func latestUserFacingText(messages []wsdk.AgentMessage) string {
	start := lastUserMessageIndex(messages) + 1
	if start < 0 {
		start = 0
	}
	var b strings.Builder
	for i := start; i < len(messages); i++ {
		msg := messages[i]
		if strings.EqualFold(msg.Kind, "from_user") {
			continue
		}
		if text := extractRoundText(msg); text != "" {
			b.WriteString(text)
			b.WriteString("\n")
		}
	}
	return strings.TrimSpace(b.String())
}

func extractRoundText(msg wsdk.AgentMessage) string {
	kind := strings.ToLower(strings.TrimSpace(msg.Kind))
	if kind != "" && kind != "user_facing" && kind != "assistant" && kind != "from_assistant" {
		return ""
	}
	return extractTextFromMessage(msg)
}
