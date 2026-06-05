package deepseek

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// Config DeepSeek / OpenAI-compatible chat API
type Config struct {
	APIKey  string
	BaseURL string
	Model   string
	// SkillTimeout non-streaming calls (skill assistant). Zero defaults to 120s.
	SkillTimeout time.Duration
}

type Client struct {
	cfg        Config
	skillHTTP  *http.Client
	streamHTTP *http.Client
}

func NewClient(cfg Config) *Client {
	base := strings.TrimRight(strings.TrimSpace(cfg.BaseURL), "/")
	if base == "" {
		base = "https://api.deepseek.com"
	}
	model := strings.TrimSpace(cfg.Model)
	if model == "" {
		model = "deepseek-chat"
	}
	skillTimeout := cfg.SkillTimeout
	if skillTimeout <= 0 {
		skillTimeout = 120 * time.Second
	}
	return &Client{
		cfg: Config{
			APIKey:       strings.TrimSpace(cfg.APIKey),
			BaseURL:      base,
			Model:        model,
			SkillTimeout: skillTimeout,
		},
		skillHTTP:  &http.Client{Timeout: skillTimeout},
		streamHTTP: &http.Client{}, // streaming: no client timeout; rely on context
	}
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
	Stream   bool      `json:"stream,omitempty"`
}

type streamChunk struct {
	Choices []struct {
		Delta struct {
			Content string `json:"content"`
		} `json:"delta"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error"`
}

type chatResponse struct {
	Choices []struct {
		Message Message `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error"`
}

const skillAuthorSystemPrompt = `你是 OSINT 情报技能编写专家，帮助管理员创建和修改 intelligence skill。

技能结构：
- key: 唯一标识（英文 snake_case）
- name / description: 中文展示名与描述
- form_schema: JSON，含 fields 数组；字段有 name, label, type(text|textarea|select|...), required, placeholder, options 等
- prompt_template: Handlebars 模板，用 {{field}} 引用表单字段；支持 {{#if field}}、{{#if (eq field "value")}} 等

回答要求：
- 使用中文，简洁专业
- 指出 form_schema 与 prompt_template 之间字段名不一致的问题
- 不要编造不存在的 Handlebars helper；项目支持 if、eq 等常见 helper

当用户要创建新技能、或修改/优化技能内容时，除简要说明外，必须附带一个 skill-patch 代码块，供编辑器自动应用。格式：

` + "```skill-patch\n" + `{
  "key": "snake_case_key",
  "name": "技能名称",
  "description": "技能描述",
  "icon": "图标名",
  "form_schema": { "fields": [...] },
  "prompt_template": "Handlebars 模板内容",
  "active_tab": "schema"
}
` + "```\n\n" + `规则：
- 只包含需要变更的字段，未变更的字段不要写入
- 新建技能时尽量提供 key、name、description、form_schema、prompt_template
- 优化 prompt_template 时只返回 prompt_template（及 active_tab: "template"）
- 修改 form_schema 时只返回 form_schema（及 active_tab: "schema"）
- form_schema 可以是 JSON 对象或已格式化的 JSON 字符串
- active_tab 可选值：schema、template、preview`

func (c *Client) Chat(ctx context.Context, messages []Message, extraSystem string) (string, error) {
	full, err := c.buildMessages(messages, extraSystem)
	if err != nil {
		return "", err
	}
	return c.chatCompletion(ctx, full)
}

func (c *Client) chatCompletion(ctx context.Context, messages []Message) (string, error) {
	body, err := json.Marshal(chatRequest{
		Model:    c.cfg.Model,
		Messages: messages,
	})
	if err != nil {
		return "", err
	}

	url := c.cfg.BaseURL + "/v1/chat/completions"
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.cfg.APIKey)

	resp, err := c.skillHTTP.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var out chatResponse
	if err := json.Unmarshal(raw, &out); err != nil {
		return "", fmt.Errorf("invalid deepseek response: %w", err)
	}
	if out.Error != nil && out.Error.Message != "" {
		return "", fmt.Errorf("deepseek api error: %s", out.Error.Message)
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		msg := strings.TrimSpace(string(raw))
		if len(msg) > 200 {
			msg = msg[:200] + "…"
		}
		return "", fmt.Errorf("deepseek http %d: %s", resp.StatusCode, msg)
	}
	if len(out.Choices) == 0 || strings.TrimSpace(out.Choices[0].Message.Content) == "" {
		return "", fmt.Errorf("empty response from deepseek")
	}
	return out.Choices[0].Message.Content, nil
}

func (c *Client) buildMessages(messages []Message, extraSystem string) ([]Message, error) {
	system := skillAuthorSystemPrompt
	if strings.TrimSpace(extraSystem) != "" {
		system += "\n\n## 当前技能上下文\n" + extraSystem
	}
	return c.buildMessagesWithSystem(system, messages)
}

// ChatWithSystem uses a custom system prompt (Studio pipeline, etc.).
func (c *Client) ChatWithSystem(ctx context.Context, systemPrompt string, messages []Message) (string, error) {
	full, err := c.buildMessagesWithSystem(strings.TrimSpace(systemPrompt), messages)
	if err != nil {
		return "", err
	}
	return c.chatCompletion(ctx, full)
}

// ChatStreamWithSystem streams completion tokens for a custom system prompt.
func (c *Client) ChatStreamWithSystem(ctx context.Context, systemPrompt string, messages []Message, onChunk func(string) error) error {
	full, err := c.buildMessagesWithSystem(strings.TrimSpace(systemPrompt), messages)
	if err != nil {
		return err
	}
	return c.chatStream(ctx, full, onChunk)
}

func (c *Client) buildMessagesWithSystem(system string, messages []Message) ([]Message, error) {
	if c.cfg.APIKey == "" {
		return nil, fmt.Errorf("DEEPSEEK_API_KEY is not configured")
	}
	if strings.TrimSpace(system) == "" {
		return nil, fmt.Errorf("system prompt required")
	}

	full := make([]Message, 0, len(messages)+1)
	full = append(full, Message{Role: "system", Content: system})
	for _, m := range messages {
		role := strings.TrimSpace(m.Role)
		if role != "user" && role != "assistant" {
			continue
		}
		content := strings.TrimSpace(m.Content)
		if content == "" {
			continue
		}
		full = append(full, Message{Role: role, Content: content})
	}
	if len(full) <= 1 {
		return nil, fmt.Errorf("messages required")
	}
	return full, nil
}

// ChatStream streams completion tokens via onChunk.
func (c *Client) ChatStream(ctx context.Context, messages []Message, extraSystem string, onChunk func(string) error) error {
	full, err := c.buildMessages(messages, extraSystem)
	if err != nil {
		return err
	}
	return c.chatStream(ctx, full, onChunk)
}

func (c *Client) chatStream(ctx context.Context, messages []Message, onChunk func(string) error) error {
	body, err := json.Marshal(chatRequest{
		Model:    c.cfg.Model,
		Messages: messages,
		Stream:   true,
	})
	if err != nil {
		return err
	}

	url := c.cfg.BaseURL + "/v1/chat/completions"
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.cfg.APIKey)
	req.Header.Set("Accept", "text/event-stream")

	resp, err := c.streamHTTP.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		raw, _ := io.ReadAll(resp.Body)
		msg := strings.TrimSpace(string(raw))
		if len(msg) > 200 {
			msg = msg[:200] + "…"
		}
		return fmt.Errorf("deepseek http %d: %s", resp.StatusCode, msg)
	}

	scanner := bufio.NewScanner(resp.Body)
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 1024*1024)

	for scanner.Scan() {
		if err := ctx.Err(); err != nil {
			return err
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
			return fmt.Errorf("deepseek api error: %s", chunk.Error.Message)
		}
		if len(chunk.Choices) == 0 {
			continue
		}
		content := chunk.Choices[0].Delta.Content
		if content == "" {
			continue
		}
		if err := onChunk(content); err != nil {
			return err
		}
	}
	return scanner.Err()
}
