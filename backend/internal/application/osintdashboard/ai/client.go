package ai

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/config"
	wsdk "ws-chat-tester/sdk"
)

type Client struct {
	apiKey     string
	baseURL    string
	model      string
	http       *http.Client
	streamHTTP *http.Client
	editHTTP   *http.Client
	w6         *wsdk.Client
	w6Mock     bool
}

func New(deepseek config.DeepSeekConfig, w6 *wsdk.Client) *Client {
	skillTimeout := time.Duration(deepseek.TimeoutSec) * time.Second
	if skillTimeout <= 0 {
		skillTimeout = 120 * time.Second
	}
	editTimeout := time.Duration(deepseek.PipelineStageTimeoutSec) * time.Second
	if editTimeout <= 0 {
		editTimeout = 5 * time.Minute
	}
	c := &Client{
		apiKey:     strings.TrimSpace(deepseek.APIKey),
		baseURL:    strings.TrimSuffix(strings.TrimSpace(deepseek.BaseURL), "/"),
		model:      strings.TrimSpace(deepseek.Model),
		http:       &http.Client{Timeout: skillTimeout},
		streamHTTP: &http.Client{},
		editHTTP:   &http.Client{Timeout: editTimeout},
		w6:         w6,
		w6Mock:     w6 == nil,
	}
	if c.baseURL == "" {
		c.baseURL = "https://api.deepseek.com/v1"
	}
	if c.model == "" {
		c.model = "deepseek-chat"
	}
	return c
}

func (c *Client) MockW6() bool { return c.w6Mock }

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Model          string        `json:"model"`
	Messages       []chatMessage `json:"messages"`
	ResponseFormat *struct {
		Type string `json:"type"`
	} `json:"response_format,omitempty"`
	Temperature float64 `json:"temperature"`
	Stream      bool    `json:"stream,omitempty"`
}

type streamChunk struct {
	Choices []struct {
		Delta struct {
			Content string `json:"content"`
		} `json:"delta"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

func (c *Client) chat(ctx context.Context, body chatRequest) (string, error) {
	return c.chatHTTP(ctx, c.http, body)
}

func (c *Client) chatHTTP(ctx context.Context, httpClient *http.Client, body chatRequest) (string, error) {
	if c.apiKey == "" {
		return "", fmt.Errorf("LLM API key not configured")
	}
	raw, err := json.Marshal(body)
	if err != nil {
		return "", err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/chat/completions", bytes.NewReader(raw))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	resp, err := httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	if resp.StatusCode >= 400 {
		return "", fmt.Errorf("LLM %d: %s", resp.StatusCode, string(b))
	}

	var parsed struct {
		Choices []struct {
			Message struct {
				Content string `json:"content"`
			} `json:"message"`
		} `json:"choices"`
	}
	if err := json.Unmarshal(b, &parsed); err != nil {
		return "", err
	}
	if len(parsed.Choices) == 0 {
		return "", fmt.Errorf("empty LLM response")
	}
	return strings.TrimSpace(parsed.Choices[0].Message.Content), nil
}

func (c *Client) GenerateReport(ctx context.Context, prompt string) (string, error) {
	body := chatRequest{
		Model: c.model,
		Messages: []chatMessage{
			{Role: "system", Content: "你是专业事实核查助手，按用户要求的结构输出完整 Markdown 报告，不要省略章节。"},
			{Role: "user", Content: prompt},
		},
		Temperature: 0.4,
	}
	return c.chat(ctx, body)
}

func (c *Client) GenerateFollowUps(ctx context.Context, markdown, topic string) ([]string, error) {
	excerpt := markdown
	if len(excerpt) > 1500 {
		excerpt = excerpt[:1500]
	}
	body := chatRequest{
		Model: c.model,
		Messages: []chatMessage{
			{Role: "system", Content: `根据报告摘要生成 3~4 个中文引导追问。只输出 JSON：{"questions":["..."]}`},
			{Role: "user", Content: fmt.Sprintf("话题：%s\n\n报告节选：\n%s", topic, excerpt)},
		},
		ResponseFormat: &struct {
			Type string `json:"type"`
		}{Type: "json_object"},
		Temperature: 0.5,
	}
	raw, err := c.chat(ctx, body)
	if err != nil {
		return nil, err
	}
	raw = strings.TrimPrefix(strings.TrimSpace(raw), "```json")
	raw = strings.TrimPrefix(raw, "```")
	raw = strings.TrimSuffix(raw, "```")
	var out struct {
		Questions []string `json:"questions"`
	}
	if err := json.Unmarshal([]byte(raw), &out); err != nil {
		return nil, err
	}
	var qs []string
	for _, q := range out.Questions {
		q = strings.TrimSpace(q)
		if q != "" {
			qs = append(qs, q)
		}
	}
	if len(qs) > 4 {
		qs = qs[:4]
	}
	return qs, nil
}

const maxEditHTMLChars = 120000

var structuralEditPattern = regexp.MustCompile(`(?i)(删除|去掉|移除|去除|清空|隐藏)`)

func editHTMLSystemPrompt(userMessage string, truncated bool) string {
	if structuralEditPattern.MatchString(userMessage) {
		sys := `你是 HTML 情报报告编辑助手。用户要求删除或移除页面中的指定区块/章节（如引用来源、脚注、附录等）。
请直接输出修改后的完整 HTML 文档（含 <!DOCTYPE 或 <html>），不要输出 Markdown、解释或代码围栏。
仅删除用户指定的区块及其标题，保留其余正文、样式与结构不变；勿改动未提及的内容。`
		if truncated {
			sys += "\n注意：输入 HTML 因长度被截断，请在可见部分内完成删除并保持文档结构闭合。"
		}
		return sys
	}
	sys := `你是 HTML 情报报告编辑助手。用户会提供完整 HTML 文档与改版式/样式/结构指令。
请直接输出修改后的完整 HTML 文档（含 <!DOCTYPE 或 <html>），不要输出 Markdown、解释或代码围栏。
保留原有内容与章节，仅按指令调整布局、配色、字体、间距等视觉与结构。不要删除正文信息。`
	if truncated {
		sys += "\n注意：输入 HTML 因长度被截断，请在可见部分内完成修改并保持文档结构闭合。"
	}
	return sys
}

func (c *Client) EditHTML(ctx context.Context, html, topic, userMessage string, history []ChatTurn) (string, error) {
	src := html
	truncated := false
	if len([]rune(src)) > maxEditHTMLChars {
		src = string([]rune(src)[:maxEditHTMLChars])
		truncated = true
	}
	msgs := []chatMessage{
		{Role: "system", Content: editHTMLSystemPrompt(userMessage, truncated)},
		{Role: "user", Content: fmt.Sprintf("【话题】%s\n\n【当前 HTML】\n%s", topic, src)},
	}
	for _, h := range history {
		if h.Content != "" && (h.Role == "user" || h.Role == "assistant") {
			msgs = append(msgs, chatMessage{Role: h.Role, Content: h.Content})
		}
	}
	msgs = append(msgs, chatMessage{Role: "user", Content: userMessage})
	raw, err := c.chatHTTP(ctx, c.editHTTP, chatRequest{Model: c.model, Messages: msgs, Temperature: 0.25})
	if err != nil {
		return "", err
	}
	return extractHTMLDocument(raw), nil
}

// UserFacingError maps LLM/transport failures to concise Chinese messages for the chat UI.
func UserFacingError(err error) string {
	if err == nil {
		return ""
	}
	msg := strings.TrimSpace(err.Error())
	switch {
	case isTimeoutError(err):
		return "报告改版式处理超时，请稍后重试；若报告较长，可尝试更简短的修改指令（例如仅删除「引用来源」章节）。"
	case strings.Contains(msg, "LLM API key not configured"):
		return "未配置 AI 服务密钥，无法修改报告。"
	case strings.Contains(msg, "empty LLM response"):
		return "AI 未返回有效内容，请重试。"
	default:
		return msg
	}
}

func isTimeoutError(err error) bool {
	if errors.Is(err, context.DeadlineExceeded) {
		return true
	}
	var netErr net.Error
	if errors.As(err, &netErr) && netErr.Timeout() {
		return true
	}
	lower := strings.ToLower(err.Error())
	return strings.Contains(lower, "context deadline exceeded") ||
		strings.Contains(lower, "client.timeout") ||
		strings.Contains(lower, "i/o timeout")
}

func extractHTMLDocument(raw string) string {
	s := strings.TrimSpace(raw)
	if strings.HasPrefix(s, "```") {
		lines := strings.Split(s, "\n")
		if len(lines) > 0 {
			lines = lines[1:]
		}
		for len(lines) > 0 && strings.TrimSpace(lines[len(lines)-1]) == "```" {
			lines = lines[:len(lines)-1]
		}
		s = strings.TrimSpace(strings.Join(lines, "\n"))
	}
	lower := strings.ToLower(s)
	if idx := strings.Index(lower, "<!doctype"); idx >= 0 {
		return strings.TrimSpace(s[idx:])
	}
	if idx := strings.Index(lower, "<html"); idx >= 0 {
		return strings.TrimSpace(s[idx:])
	}
	return s
}

func plainChatMessages(userMessage string, history []ChatTurn) []chatMessage {
	msgs := []chatMessage{
		{Role: "system", Content: "你是开源情报与事实核查助手，用简洁中文回答问题，不编造来源。"},
	}
	for _, h := range history {
		if h.Content != "" && (h.Role == "user" || h.Role == "assistant") {
			msgs = append(msgs, chatMessage{Role: h.Role, Content: h.Content})
		}
	}
	msgs = append(msgs, chatMessage{Role: "user", Content: userMessage})
	return msgs
}

func discussMessages(markdown, topic, userMessage string, history []ChatTurn) []chatMessage {
	msgs := []chatMessage{
		{Role: "system", Content: "你是事实核查报告解读助手，基于报告作答，简洁中文，不编造来源。"},
		{Role: "user", Content: fmt.Sprintf("【报告】\n%s\n\n【话题】%s", markdown, topic)},
	}
	for _, h := range history {
		if h.Content != "" && (h.Role == "user" || h.Role == "assistant") {
			msgs = append(msgs, chatMessage{Role: h.Role, Content: h.Content})
		}
	}
	msgs = append(msgs, chatMessage{Role: "user", Content: userMessage})
	return msgs
}

func (c *Client) chatStream(ctx context.Context, body chatRequest, onChunk func(string) error) (string, error) {
	if c.apiKey == "" {
		return "", fmt.Errorf("LLM API key not configured")
	}
	body.Stream = true
	raw, err := json.Marshal(body)
	if err != nil {
		return "", err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/chat/completions", bytes.NewReader(raw))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Accept", "text/event-stream")

	resp, err := c.streamHTTP.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		b, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("LLM %d: %s", resp.StatusCode, string(b))
	}

	var full strings.Builder
	scanner := bufio.NewScanner(resp.Body)
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 1024*1024)

	for scanner.Scan() {
		if err := ctx.Err(); err != nil {
			return full.String(), err
		}
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, ":") {
			continue
		}
		if !strings.HasPrefix(line, "data:") {
			continue
		}
		data := strings.TrimSpace(strings.TrimPrefix(line, "data:"))
		if data == "[DONE]" {
			break
		}

		var chunk streamChunk
		if err := json.Unmarshal([]byte(data), &chunk); err != nil {
			continue
		}
		if chunk.Error != nil && chunk.Error.Message != "" {
			return full.String(), fmt.Errorf("LLM stream error: %s", chunk.Error.Message)
		}
		if len(chunk.Choices) == 0 {
			continue
		}
		content := chunk.Choices[0].Delta.Content
		if content == "" {
			continue
		}
		full.WriteString(content)
		if onChunk != nil {
			if err := onChunk(content); err != nil {
				return full.String(), err
			}
		}
	}
	if err := scanner.Err(); err != nil {
		return full.String(), err
	}
	return strings.TrimSpace(full.String()), nil
}

func (c *Client) PlainChat(ctx context.Context, userMessage string, history []ChatTurn) (string, error) {
	msgs := plainChatMessages(userMessage, history)
	return c.chat(ctx, chatRequest{Model: c.model, Messages: msgs, Temperature: 0.5})
}

func (c *Client) PlainChatStream(ctx context.Context, userMessage string, history []ChatTurn, onChunk func(string) error) (string, error) {
	msgs := plainChatMessages(userMessage, history)
	return c.chatStream(ctx, chatRequest{Model: c.model, Messages: msgs, Temperature: 0.5}, onChunk)
}

func (c *Client) Discuss(ctx context.Context, markdown, topic, userMessage string, history []ChatTurn) (string, error) {
	msgs := discussMessages(markdown, topic, userMessage, history)
	return c.chat(ctx, chatRequest{Model: c.model, Messages: msgs, Temperature: 0.35})
}

func (c *Client) DiscussStream(ctx context.Context, markdown, topic, userMessage string, history []ChatTurn, onChunk func(string) error) (string, error) {
	msgs := discussMessages(markdown, topic, userMessage, history)
	return c.chatStream(ctx, chatRequest{Model: c.model, Messages: msgs, Temperature: 0.35}, onChunk)
}

type ChatTurn struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}
