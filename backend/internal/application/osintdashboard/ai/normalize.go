package ai

import (
	"context"
	"fmt"
	"strings"
)

// NormalizeReportMarkdown lightly restructures W6 markdown for vertical HTML layout.
// On failure callers should fall back to the original markdown.
func (c *Client) NormalizeReportMarkdown(ctx context.Context, promptTemplate, markdown, topic, style string) (string, error) {
	if c.apiKey == "" {
		return "", fmt.Errorf("LLM API key not configured")
	}
	markdown = strings.TrimSpace(markdown)
	if markdown == "" {
		return "", fmt.Errorf("empty markdown")
	}
	prompt := strings.ReplaceAll(promptTemplate, "{{style}}", strings.TrimSpace(style))
	prompt = strings.ReplaceAll(prompt, "{{topic}}", strings.TrimSpace(topic))
	prompt = strings.ReplaceAll(prompt, "{{markdown}}", markdown)

	body := chatRequest{
		Model: c.model,
		Messages: []chatMessage{
			{
				Role: "system",
				Content: "你是 Markdown 结构编辑。严格遵守用户消息中的规则：只整理版式与标题层级，不改事实与措辞。只输出 Markdown 正文。",
			},
			{Role: "user", Content: prompt},
		},
		Temperature: 0.15,
	}
	out, err := c.chat(ctx, body)
	if err != nil {
		return "", err
	}
	out = stripMarkdownFences(out)
	if out == "" {
		return "", fmt.Errorf("empty normalize output")
	}
	return out, nil
}

func stripMarkdownFences(s string) string {
	s = strings.TrimSpace(s)
	if strings.HasPrefix(s, "```") {
		lines := strings.Split(s, "\n")
		if len(lines) >= 2 && strings.HasPrefix(lines[0], "```") {
			lines = lines[1:]
		}
		if len(lines) > 0 && strings.TrimSpace(lines[len(lines)-1]) == "```" {
			lines = lines[:len(lines)-1]
		}
		s = strings.TrimSpace(strings.Join(lines, "\n"))
	}
	return s
}
