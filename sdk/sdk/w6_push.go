package sdk

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"os"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

// PushInputResult confirms handshake + user input delivery (same contract as backend gateway).
type PushInputResult struct {
	SessionID               string
	HandshakeStateIDMatched bool
	AckReason               string
}

func sdkDebug() bool {
	v := strings.ToLower(strings.TrimSpace(os.Getenv("AI_SDK_DEBUG")))
	return v == "1" || v == "true" || strings.ToLower(os.Getenv("W6_DEBUG")) == "1"
}

func sdkLog(format string, args ...any) {
	if sdkDebug() {
		log.Printf("[ws-sdk] 1"+format, args...)
	}
}

// RandomSessionID returns an alphanumeric session id of the given length (default 8).
func RandomSessionID(length int) string {
	if length <= 0 {
		length = 8
	}
	const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
	out := make([]byte, length)
	for i := range out {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(alphabet))))
		if err != nil {
			out[i] = alphabet[i%len(alphabet)]
			continue
		}
		out[i] = alphabet[n.Int64()]
	}
	return string(out)
}

// PushUserInput dials W6, handshakes, sends one input, waits for upstream ack (core backend flow).
func (c *Client) PushUserInput(ctx context.Context, sessionHint, content string, attachments []string) (*PushInputResult, error) {
	hint := strings.TrimSpace(sessionHint)
	if hint == "" {
		hint = RandomSessionID(8)
	}
	content = strings.TrimSpace(content)
	if content == "" {
		return nil, fmt.Errorf("content is required")
	}

	sdkLog("dial ws hint=%q", hint)
	conn, err := c.DialSessionRetry(ctx, hint)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	go func() {
		<-ctx.Done()
		_ = conn.Close()
	}()

	resolvedID, matched, err := c.waitRunHandshakeResolve(ctx, conn, hint)
	if err != nil {
		return nil, err
	}
	sdkLog("handshake ok resolved=%q matched=%v", resolvedID, matched)

	remoteID := hint
	if remoteID == "" {
		remoteID = sanitizeSessionID(resolvedID)
	}

	req := SendInputRequest{
		Type:        "input",
		ID:          remoteID,
		Content:     content,
		Attachments: attachments,
	}
	if len(req.Attachments) == 0 {
		req.Attachments = []string{}
	}
	if err := conn.WriteJSON(req); err != nil {
		return nil, fmt.Errorf("write input: %w", err)
	}
	sdkLog("input sent session=%q bytes=%d", remoteID, len(content))

	ack, err := c.waitInputAck(ctx, conn)
	if err != nil {
		return nil, err
	}
	sdkLog("input ack session=%q reason=%s", remoteID, ack)

	return &PushInputResult{
		SessionID:               remoteID,
		HandshakeStateIDMatched: matched,
		AckReason:               ack,
	}, nil
}

func (c *Client) waitInputAck(ctx context.Context, conn *websocket.Conn) (string, error) {
	deadline := time.Now().Add(c.pushAckTimeout())
	if dl, ok := ctx.Deadline(); ok && dl.Before(deadline) {
		deadline = dl
	}
	for time.Now().Before(deadline) {
		if err := ctx.Err(); err != nil {
			return "", err
		}
		rem := time.Until(deadline)
		if rem <= 0 {
			break
		}
		_ = conn.SetReadDeadline(time.Now().Add(rem))
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return "", fmt.Errorf("push ack read: %w", err)
		}
		var frame map[string]any
		if err := json.Unmarshal(msg, &frame); err != nil {
			continue
		}
		t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
		if t == "error" {
			return "", fmt.Errorf("upstream error: %v", frame["error"])
		}
		if t == "update" {
			return "update", nil
		}
		if t == "status" {
			st := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
			switch st {
			case "busy", "running", "waiting":
				return st, nil
			}
		}
	}
	return "ack_timeout", nil
}

func (c *Client) pushAckTimeout() time.Duration {
	if c.pushAckTimeoutDur > 0 {
		return c.pushAckTimeoutDur
	}
	return 30 * time.Second
}

func sanitizeSessionID(v string) string {
	id := strings.TrimSpace(v)
	if id == "" {
		return ""
	}
	lower := strings.ToLower(id)
	if lower == "<nil>" || lower == "nil" || lower == "null" {
		return ""
	}
	if strings.HasPrefix(lower, "call_") || strings.HasPrefix(lower, "msg_") || strings.HasPrefix(lower, "tool_") {
		return ""
	}
	if strings.Contains(id, " ") {
		return ""
	}
	return id
}

func inferUpstreamSessionID(frame map[string]any) string {
	if state, ok := frame["state"].(map[string]any); ok {
		for _, key := range []string{"id", "session_id", "agent_id", "run_id"} {
			if id := sanitizeSessionID(fmt.Sprint(state[key])); id != "" && id != "<nil>" {
				return id
			}
		}
	}
	if stateDelta, ok := frame["state_delta"].(map[string]any); ok {
		for _, key := range []string{"id", "session_id", "agent_id", "run_id"} {
			if id := sanitizeSessionID(fmt.Sprint(stateDelta[key])); id != "" && id != "<nil>" {
				return id
			}
		}
	}
	for _, key := range []string{"session_id", "agent_id", "run_id", "agentId", "runId"} {
		if id := sanitizeSessionID(fmt.Sprint(frame[key])); id != "" {
			return id
		}
	}
	if id := sanitizeSessionID(fmt.Sprint(frame["id"])); id != "" && id != "<nil>" {
		return id
	}
	return ""
}
