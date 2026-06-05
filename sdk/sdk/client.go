package sdk

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

const apiKeyHeader = "x-w6service-api-key"

// Config defines upstream gateway configuration for SDK client.
type Config struct {
	BaseURL          string
	APIKey           string
	Timeout          time.Duration
	HandshakeTimeout time.Duration // WS run handshake read deadline; 0 = 15s
	PushAckTimeout   time.Duration // wait for busy/running after input; 0 = 30s
	DialTimeout      time.Duration // WS dial when ctx has no deadline; 0 = 30s
	Retry            RetryConfig   // WebSocket dial retries; zero fields use env defaults
}

// Client wraps HTTP and WebSocket access to the upstream service.
type Client struct {
	baseHTTP           string
	baseWS             string
	apiKey             string
	http               *http.Client
	dialer             websocket.Dialer
	handshakeTimeout   time.Duration
	pushAckTimeoutDur  time.Duration
	dialTimeout        time.Duration
	retry              RetryConfig
}

// Agent describes one upstream session/agent item.
type Agent struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	SOP         string `json:"sop"`
}

// AgentListResponse is /api/agents response.
type AgentListResponse struct {
	Agents []Agent `json:"agents"`
}

// AgentMessage holds one timeline message frame from upstream.
type AgentMessage struct {
	ID          string      `json:"id,omitempty"`
	Role        string      `json:"role,omitempty"`
	Content     string      `json:"content,omitempty"`
	Kind        string      `json:"kind,omitempty"`
	MessagePart interface{} `json:"message_parts,omitempty"`
}

// AgentMessagesResponse is /api/agents/{id}/messages response.
type AgentMessagesResponse struct {
	Messages []AgentMessage `json:"messages"`
}

// SendInputRequest describes one user input frame.
type SendInputRequest struct {
	Type        string   `json:"type"`
	ID          string   `json:"id"`
	Content     string   `json:"content"`
	Attachments []string `json:"attachments,omitempty"`
}

// NewClient creates a validated SDK client.
func NewClient(cfg Config) (*Client, error) {
	if strings.TrimSpace(cfg.BaseURL) == "" {
		return nil, fmt.Errorf("base url is required")
	}
	if strings.TrimSpace(cfg.APIKey) == "" {
		return nil, fmt.Errorf("api key is required")
	}

	u, err := url.Parse(strings.TrimRight(strings.TrimSpace(cfg.BaseURL), "/"))
	if err != nil {
		return nil, fmt.Errorf("parse base url: %w", err)
	}

	httpBase := *u
	wsBase := *u
	switch u.Scheme {
	case "http":
		wsBase.Scheme = "ws"
	case "https":
		wsBase.Scheme = "wss"
	default:
		return nil, fmt.Errorf("unsupported scheme %q", u.Scheme)
	}

	timeout := cfg.Timeout
	if timeout <= 0 {
		timeout = 15 * time.Second
	}
	handshake := cfg.HandshakeTimeout
	if handshake <= 0 {
		handshake = 15 * time.Second
	}
	dialHandshake := handshake
	if dialHandshake < 10*time.Second {
		dialHandshake = 10 * time.Second
	}

	dialTO := cfg.DialTimeout
	if dialTO <= 0 {
		dialTO = 30 * time.Second
	}
	pushAck := cfg.PushAckTimeout
	if pushAck <= 0 {
		pushAck = 30 * time.Second
	}

	return &Client{
		baseHTTP: strings.TrimRight(httpBase.String(), "/"),
		baseWS:   strings.TrimRight(wsBase.String(), "/"),
		apiKey:   strings.TrimSpace(cfg.APIKey),
		http:     &http.Client{Timeout: timeout},
		dialer: websocket.Dialer{
			HandshakeTimeout: dialHandshake,
			Proxy:            http.ProxyFromEnvironment,
		},
		handshakeTimeout:  handshake,
		pushAckTimeoutDur: pushAck,
		dialTimeout:       dialTO,
		retry:             cfg.Retry,
	}, nil
}

func (c *Client) handshakeDeadline(ctx context.Context) time.Time {
	d := c.handshakeTimeout
	if d <= 0 {
		d = 15 * time.Second
	}
	deadline := time.Now().Add(d)
	if dl, ok := ctx.Deadline(); ok && dl.Before(deadline) {
		return dl
	}
	return deadline
}

// ListAgents fetches available sessions from upstream.
func (c *Client) ListAgents(ctx context.Context) (AgentListResponse, error) {
	raw, err := c.doRaw(ctx, http.MethodGet, c.baseHTTP+"/api/agents", nil)
	if err != nil {
		return AgentListResponse{}, err
	}

	var wrapped AgentListResponse
	if err := json.Unmarshal(raw, &wrapped); err == nil && wrapped.Agents != nil {
		return wrapped, nil
	}

	var list []Agent
	if err := json.Unmarshal(raw, &list); err == nil {
		return AgentListResponse{Agents: list}, nil
	}

	return AgentListResponse{}, fmt.Errorf("unsupported /api/agents response shape")
}

// AgentMessages fetches timeline/history for one session.
func (c *Client) AgentMessages(ctx context.Context, sessionID string, limit, offset int) (AgentMessagesResponse, error) {
	var out AgentMessagesResponse
	if limit <= 0 {
		limit = 200
	}
	if offset < 0 {
		offset = 0
	}
	u := fmt.Sprintf("%s/api/agents/%s/messages?limit=%d&offset=%d",
		c.baseHTTP, url.PathEscape(strings.TrimSpace(sessionID)), limit, offset)
	err := c.doJSON(ctx, http.MethodGet, u, nil, &out)
	return out, err
}

// SourceResponse represents the response from /api/source/{id} endpoint.
type SourceResponse struct {
	ID          string `json:"id"`
	Filename    string `json:"filename"`
	ContentType string `json:"content_type"`
	Size        int64  `json:"size"`
	URL         string `json:"url"`
	CreatedAt   string `json:"created_at"`
}

// GetSource fetches source metadata from upstream.
func (c *Client) GetSource(ctx context.Context, sourceID string) (*SourceResponse, error) {
	u := fmt.Sprintf("%s/api/source/%s", c.baseHTTP, url.PathEscape(strings.TrimSpace(sourceID)))
	var out SourceResponse
	if err := c.doJSON(ctx, http.MethodGet, u, nil, &out); err != nil {
		return nil, err
	}
	return &out, nil
}

// DownloadSource downloads source content from upstream via /api/source/{id} endpoint.
// The upstream returns content as a byte array in JSON format.
// It returns the raw bytes and inferred content type.
func (c *Client) DownloadSource(ctx context.Context, sourceID string) ([]byte, string, error) {
	u := fmt.Sprintf("%s/api/source/%s", c.baseHTTP, url.PathEscape(strings.TrimSpace(sourceID)))

	raw, err := c.doRaw(ctx, http.MethodGet, u, nil)
	if err != nil {
		return nil, "", fmt.Errorf("get source: %w", err)
	}

	// 上游响应可能是单个对象或数组，统一处理
	var items []map[string]interface{}
	if err := json.Unmarshal(raw, &items); err != nil {
		// 尝试作为单个对象解析
		var single map[string]interface{}
		if err2 := json.Unmarshal(raw, &single); err2 != nil {
			return nil, "", fmt.Errorf("decode response: %w", err)
		}
		items = []map[string]interface{}{single}
	}

	if len(items) == 0 {
		return nil, "", fmt.Errorf("empty source response")
	}

	item := items[0]

	// 提取 content 字段 - 字节码数组格式 [60, 33, 68, ...]
	contentRaw, ok := item["content"]
	if !ok || contentRaw == nil {
		return nil, "", fmt.Errorf("no content field in source response")
	}

	var result []byte

	switch v := contentRaw.(type) {
	case []interface{}:
		result = make([]byte, 0, len(v))
		for _, b := range v {
			if num, ok := b.(float64); ok {
				result = append(result, byte(int(num)))
			}
		}
	case string:
		result = []byte(v)
	default:
		return nil, "", fmt.Errorf("unexpected content type: %T", contentRaw)
	}

	if len(result) == 0 {
		return nil, "", fmt.Errorf("empty content")
	}

	// 推断 content type
	contentType := "application/octet-stream"
	if data, ok := item["data"].(map[string]interface{}); ok {
		if filename, ok := data["filename"].(string); ok && filename != "" {
			contentType = inferContentTypeFromFilename(filename)
		}
	}

	return result, contentType, nil
}

// inferContentTypeFromFilename 根据文件名推断 Content-Type
func inferContentTypeFromFilename(filename string) string {
	ext := strings.ToLower(filepath.Ext(filename))
	switch ext {
	case ".html", ".htm":
		return "text/html; charset=utf-8"
	case ".md":
		return "text/markdown; charset=utf-8"
	case ".txt":
		return "text/plain; charset=utf-8"
	case ".json":
		return "application/json"
	case ".css":
		return "text/css"
	case ".js":
		return "application/javascript"
	case ".png":
		return "image/png"
	case ".jpg", ".jpeg":
		return "image/jpeg"
	case ".gif":
		return "image/gif"
	case ".svg":
		return "image/svg+xml"
	case ".pdf":
		return "application/pdf"
	case ".mp3":
		return "audio/mpeg"
	case ".mp4":
		return "video/mp4"
	case ".pptx":
		return "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	default:
		return "application/octet-stream"
	}
}

// DialSession opens upstream websocket and sends initial {"id": "<sessionID>"} frame.
func (c *Client) DialSession(ctx context.Context, sessionID string) (*websocket.Conn, error) {
	dialCtx := ctx
	if _, ok := ctx.Deadline(); !ok {
		var cancel context.CancelFunc
		dialCtx, cancel = context.WithTimeout(ctx, c.dialTimeout)
		defer cancel()
	}

	endpoint := c.baseWS + "/api/ws/run"
	headers := make(http.Header)
	headers.Set(apiKeyHeader, c.apiKey)

	if sdkDebug() {
		log.Printf("[ws-sdk] dial %s id=%q", endpoint, sessionID)
	}

	conn, resp, err := c.dialer.DialContext(dialCtx, endpoint, headers)
	if err != nil {
		if resp != nil {
			return nil, fmt.Errorf("dial websocket: %w (status=%s)", err, resp.Status)
		}
		return nil, fmt.Errorf("dial websocket: %w", err)
	}

	initFrame := map[string]string{"id": strings.TrimSpace(sessionID)}
	if writeErr := conn.WriteJSON(initFrame); writeErr != nil {
		_ = conn.Close()
		return nil, fmt.Errorf("send init frame: %w", writeErr)
	}
	return conn, nil
}

// SendInput dials upstream, waits for run handshake, then sends one input frame.
func (c *Client) SendInput(ctx context.Context, sessionID, content string, attachments []string) error {
	conn, err := c.DialSession(ctx, sessionID)
	if err != nil {
		return err
	}
	defer conn.Close()

	if err := c.waitRunHandshake(ctx, conn, sessionID); err != nil {
		return fmt.Errorf("handshake: %w", err)
	}

	req := SendInputRequest{
		Type:        "input",
		ID:          strings.TrimSpace(sessionID),
		Content:     content,
		Attachments: attachments,
	}
	if len(req.Attachments) == 0 {
		req.Attachments = []string{}
	}

	if err := conn.WriteJSON(req); err != nil {
		return fmt.Errorf("write input frame: %w", err)
	}
	return nil
}

// StopSession asks upstream W6 to halt the current run for a session.
func (c *Client) StopSession(ctx context.Context, sessionID string) error {
	conn, err := c.DialSession(ctx, sessionID)
	if err != nil {
		return err
	}
	defer conn.Close()

	if err := c.waitRunHandshake(ctx, conn, sessionID); err != nil {
		return fmt.Errorf("handshake: %w", err)
	}
	if err := conn.WriteJSON(map[string]string{"type": "Stop"}); err != nil {
		return fmt.Errorf("write stop frame: %w", err)
	}
	return nil
}

func handshakeTerminalStatus(st string) bool {
	switch strings.ToLower(strings.TrimSpace(st)) {
	case "idle", "ready", "normal", "paused", "running", "busy", "waiting", "stopped", "completed", "done":
		return true
	default:
		return false
	}
}

func inferFrameSessionID(frame map[string]any) string {
	return inferUpstreamSessionID(frame)
}

// waitRunHandshake reads frames until update(state.id) + terminal status (same as gateway provider).
func (c *Client) waitRunHandshake(ctx context.Context, conn *websocket.Conn, expectedID string) error {
	expectedID = strings.TrimSpace(expectedID)
	deadline := c.handshakeDeadline(ctx)
	var sawUpdateWithID bool
	for time.Now().Before(deadline) {
		if err := ctx.Err(); err != nil {
			return err
		}
		rem := time.Until(deadline)
		if rem <= 0 {
			break
		}
		_ = conn.SetReadDeadline(time.Now().Add(rem))
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return err
		}
		var frame map[string]any
		if err := json.Unmarshal(msg, &frame); err != nil {
			continue
		}
		t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
		if t == "error" {
			return fmt.Errorf("upstream error: %v", frame["error"])
		}
		if t == "update" {
			if inferFrameSessionID(frame) != "" {
				sawUpdateWithID = true
				if expectedID != "" && inferFrameSessionID(frame) != expectedID {
					return fmt.Errorf("handshake session id mismatch: expected %s", expectedID)
				}
			}
			continue
		}
		if t == "status" {
			st := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
			if sawUpdateWithID && handshakeTerminalStatus(st) {
				return nil
			}
		}
	}
	return fmt.Errorf("handshake timeout")
}

// waitRunHandshakeResolve returns the upstream session id from handshake (new id when hint is empty).
func (c *Client) waitRunHandshakeResolve(ctx context.Context, conn *websocket.Conn, hint string) (resolvedID string, matched bool, err error) {
	hint = strings.TrimSpace(hint)
	deadline := c.handshakeDeadline(ctx)
	var sawUpdateWithID bool
	for time.Now().Before(deadline) {
		if err := ctx.Err(); err != nil {
			return "", false, err
		}
		rem := time.Until(deadline)
		if rem <= 0 {
			break
		}
		_ = conn.SetReadDeadline(time.Now().Add(rem))
		_, msg, readErr := conn.ReadMessage()
		if readErr != nil {
			return "", false, readErr
		}
		var frame map[string]any
		if err := json.Unmarshal(msg, &frame); err != nil {
			continue
		}
		t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
		if t == "error" {
			return "", false, fmt.Errorf("upstream error: %v", frame["error"])
		}
		if t == "update" {
			inf := inferUpstreamSessionID(frame)
			if inf == "" {
				if sdkDebug() {
					preview, _ := json.Marshal(frame)
					if len(preview) > 400 {
						preview = preview[:400]
					}
					log.Printf("[ws-sdk] handshake update without session id: %s", preview)
				}
				continue
			}
			sawUpdateWithID = true
			if hint != "" {
				resolvedID = hint
				matched = (inf == hint)
			} else {
				resolvedID = inf
				matched = true
			}
			continue
		}
		if t == "status" {
			st := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
			if sawUpdateWithID && handshakeTerminalStatus(st) {
				if resolvedID == "" {
					resolvedID = hint
				}
				if resolvedID == "" {
					return "", false, fmt.Errorf("handshake finished without session id")
				}
				return resolvedID, matched, nil
			}
		}
	}
	return "", false, fmt.Errorf("handshake timeout")
}

// StartNewSession opens a fresh upstream session via PushUserInput (handshake + input + ack).
func (c *Client) StartNewSession(ctx context.Context, content string, attachments []string) (string, error) {
	out, err := c.PushUserInput(ctx, "", content, attachments)
	if err != nil {
		return "", err
	}
	return out.SessionID, nil
}

func (c *Client) doJSON(ctx context.Context, method, endpoint string, body any, out any) error {
	raw, err := c.doRaw(ctx, method, endpoint, body)
	if err != nil {
		return err
	}
	if out == nil {
		return nil
	}
	if err := json.Unmarshal(raw, out); err != nil {
		return fmt.Errorf("decode response: %w", err)
	}
	return nil
}

func (c *Client) doRaw(ctx context.Context, method, endpoint string, body any) ([]byte, error) {
	var reqBodyReader *strings.Reader
	if body == nil {
		reqBodyReader = strings.NewReader("")
	} else {
		raw, err := json.Marshal(body)
		if err != nil {
			return nil, fmt.Errorf("marshal request: %w", err)
		}
		reqBodyReader = strings.NewReader(string(raw))
	}

	req, err := http.NewRequestWithContext(ctx, method, endpoint, reqBodyReader)
	if err != nil {
		return nil, fmt.Errorf("new request: %w", err)
	}
	req.Header.Set(apiKeyHeader, c.apiKey)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := c.http.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("http status %d", resp.StatusCode)
	}
	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read response body: %w", err)
	}
	return raw, nil
}
