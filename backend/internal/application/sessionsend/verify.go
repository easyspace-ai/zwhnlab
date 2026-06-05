package sessionsend

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	wsdk "ws-chat-tester/sdk"
)

// VerifyMethod 送达确认方式。
type VerifyMethod string

const (
	VerifyMethodAckImmediate VerifyMethod = "ack_immediate" // WS 发送后立刻收到 busy/running/update
	VerifyMethodStatus     VerifyMethod = "status_running"  // 轮询 WS 状态为 running/busy
	VerifyMethodHistory    VerifyMethod = "history_match"   // 历史最新消息与发送内容匹配
)

func terminalSessionStatus(st string) bool {
	switch strings.ToLower(strings.TrimSpace(st)) {
	case "idle", "ready", "normal", "paused", "running", "busy", "waiting", "stopped", "completed", "done":
		return true
	default:
		return false
	}
}

func activeSessionStatus(st string) bool {
	switch strings.ToLower(strings.TrimSpace(st)) {
	case "running", "busy", "waiting":
		return true
	default:
		return false
	}
}

func (s *Sender) verifyDelivery(ctx context.Context, sessionID, content, label string, immediateAck string) (bool, VerifyMethod) {
	if immediateAck == "busy" || immediateAck == "running" || immediateAck == "waiting" || immediateAck == "update" {
		slog.Info(LogPrefix+" verify skipped: immediate ws ack",
			slog.String("label", label),
			slog.String("session_id", sessionID),
			slog.String("ack", immediateAck),
		)
		return true, VerifyMethodAckImmediate
	}

	if s.upstream == nil {
		slog.Warn(LogPrefix+" verify skipped: no upstream client for history/status",
			slog.String("label", label),
			slog.String("session_id", sessionID),
		)
		return immediateAck != "" && immediateAck != "ack_timeout", VerifyMethodAckImmediate
	}

	deadline := time.Now().Add(s.verifyTimeout)
	if dl, ok := ctx.Deadline(); ok && dl.Before(deadline) {
		deadline = dl
	}

	attempt := 0
	for time.Now().Before(deadline) {
		attempt++
		select {
		case <-ctx.Done():
			return false, ""
		default:
		}

		if ok, _ := s.verifyByHistory(ctx, sessionID, content); ok {
			slog.Info(LogPrefix+" verify ok via history",
				slog.String("label", label),
				slog.String("session_id", sessionID),
				slog.Int("attempt", attempt),
			)
			return true, VerifyMethodHistory
		}

		probeCtx, cancel := context.WithTimeout(ctx, 8*time.Second)
		if ok := s.verifyBySessionStatus(probeCtx, sessionID); ok {
			cancel()
			slog.Info(LogPrefix+" verify ok via session status",
				slog.String("label", label),
				slog.String("session_id", sessionID),
				slog.Int("attempt", attempt),
			)
			return true, VerifyMethodStatus
		}
		cancel()

		rem := time.Until(deadline)
		if rem <= 0 {
			break
		}
		wait := s.verifyPoll
		if wait > rem {
			wait = rem
		}
		slog.Info(LogPrefix+" verify polling",
			slog.String("label", label),
			slog.String("session_id", sessionID),
			slog.Int("attempt", attempt),
			slog.Duration("next_in", wait),
		)
		select {
		case <-ctx.Done():
			return false, ""
		case <-time.After(wait):
		}
	}

	slog.Warn(LogPrefix+" verify timeout",
		slog.String("label", label),
		slog.String("session_id", sessionID),
		slog.Duration("window", s.verifyTimeout),
	)
	return false, ""
}

func (s *Sender) verifyByHistory(ctx context.Context, sessionID, sentContent string) (bool, error) {
	resp, err := s.upstream.AgentMessages(ctx, sessionID, 30, 0)
	if err != nil {
		return false, err
	}
	if len(resp.Messages) == 0 {
		return false, nil
	}
	for i := len(resp.Messages) - 1; i >= 0; i-- {
		msg := resp.Messages[i]
		if !isUserMessage(msg) {
			continue
		}
		found := extractMessageText(msg)
		if contentMatches(sentContent, found) {
			return true, nil
		}
		// 只比对最新一条用户消息
		break
	}
	return false, nil
}

func (s *Sender) verifyBySessionStatus(ctx context.Context, sessionID string) bool {
	conn, err := s.upstream.DialSession(ctx, sessionID)
	if err != nil {
		return false
	}
	defer conn.Close()

	if err := s.upstreamWaitHandshake(ctx, conn, sessionID); err != nil {
		return false
	}

	deadline := time.Now().Add(6 * time.Second)
	if dl, ok := ctx.Deadline(); ok && dl.Before(deadline) {
		deadline = dl
	}
	for time.Now().Before(deadline) {
		select {
		case <-ctx.Done():
			return false
		default:
		}
		rem := time.Until(deadline)
		if rem <= 0 {
			break
		}
		_ = conn.SetReadDeadline(time.Now().Add(rem))
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return false
		}
		var frame map[string]any
		if err := json.Unmarshal(msg, &frame); err != nil {
			continue
		}
		t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
		if t == "status" {
			st := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
			if activeSessionStatus(st) {
				return true
			}
		}
	}
	return false
}

func (s *Sender) upstreamWaitHandshake(ctx context.Context, conn *websocket.Conn, expectedID string) error {
	deadline := time.Now().Add(15 * time.Second)
	if dl, ok := ctx.Deadline(); ok && dl.Before(deadline) {
		deadline = dl
	}
	var sawUpdate bool
	for time.Now().Before(deadline) {
		if err := ctx.Err(); err != nil {
			return err
		}
		rem := time.Until(deadline)
		_ = conn.SetReadDeadline(time.Now().Add(rem))
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return err
		}
		var frame map[string]any
		if json.Unmarshal(msg, &frame) != nil {
			continue
		}
		t := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["type"])))
		if t == "error" {
			return fmt.Errorf("upstream error: %v", frame["error"])
		}
		if t == "update" {
			sawUpdate = true
			continue
		}
		if t == "status" {
			st := strings.ToLower(strings.TrimSpace(fmt.Sprint(frame["status"])))
			if sawUpdate && terminalSessionStatus(st) {
				return nil
			}
		}
	}
	return fmt.Errorf("handshake timeout")
}

func isUserMessage(msg wsdk.AgentMessage) bool {
	role := strings.ToLower(strings.TrimSpace(msg.Role))
	kind := strings.ToLower(strings.TrimSpace(msg.Kind))
	return role == "user" || kind == "from_user"
}

func extractMessageText(msg wsdk.AgentMessage) string {
	if s := strings.TrimSpace(msg.Content); s != "" {
		return s
	}
	raw, err := json.Marshal(msg.MessagePart)
	if err != nil {
		return ""
	}
	var parts []map[string]any
	if err := json.Unmarshal(raw, &parts); err != nil {
		return ""
	}
	var b strings.Builder
	for _, p := range parts {
		if strings.ToLower(fmt.Sprint(p["type"])) != "text" {
			continue
		}
		b.WriteString(fmt.Sprint(p["content"]))
	}
	return strings.TrimSpace(b.String())
}

// contentMatches 用发送内容前缀与历史消息比对（避免全文略有差异导致误判）。
func contentMatches(sent, found string) bool {
	sent = strings.TrimSpace(sent)
	found = strings.TrimSpace(found)
	if sent == "" || found == "" {
		return false
	}
	prefixLen := 120
	if len(sent) < prefixLen {
		prefixLen = len(sent)
	}
	if prefixLen < 40 && len(sent) >= 20 {
		prefixLen = len(sent)
	}
	prefix := sent[:prefixLen]
	return strings.Contains(found, prefix)
}
