// Package sessionsend 提供后台静默向 W6 会话发送用户消息的能力。
// 流程与前端用户打开会话后手动发消息一致：独立 WebSocket → 鉴权握手 → 发送 input →
// 30s 内通过会话状态（running/busy）或聊天历史比对确认送达，失败则重试。
package sessionsend

import (
	"context"
	"fmt"
	"log/slog"
	"strings"
	"sync/atomic"
	"time"

	sdkclient "github.com/easyspace-ai/ylmnote/internal/infrastructure/ai/gateway/client"
	wsdk "ws-chat-tester/sdk"
)

const LogPrefix = "[session-send]"

// Gateway 上游推送能力（由 ai gateway client 实现）。
type Gateway interface {
	PushUserInput(ctx context.Context, sessionID, content string) (*sdkclient.PushInputResult, error)
}

// Config 发送器配置。
type Config struct {
	// Timeout 单次 WS 发送（含 dial、握手、写 input、短 ack）超时。
	Timeout time.Duration
	// VerifyTimeout 发送后等待确认送达的最长时间（默认 30s）。
	VerifyTimeout time.Duration
	// VerifyPollInterval 确认轮询间隔（历史 / 状态）。
	VerifyPollInterval time.Duration
	// MaxRetries 送达未确认时的最大重试次数（含首次共 MaxRetries 次尝试）。
	MaxRetries int
}

// Sender 后台会话消息发送器，每次发送使用独立 WebSocket 连接。
type Sender struct {
	gw          Gateway
	upstream    *wsdk.Client
	timeout     time.Duration
	verifyTimeout time.Duration
	verifyPoll    time.Duration
	maxRetries    int
	running       atomic.Int64
}

// New 创建发送器。upstream 用于送达确认（拉历史 / 探测状态），可为 nil（仅依赖 WS ack）。
func New(gw Gateway, upstream *wsdk.Client, cfg Config) *Sender {
	timeout := cfg.Timeout
	if timeout <= 0 {
		timeout = 2 * time.Minute
	}
	verifyTimeout := cfg.VerifyTimeout
	if verifyTimeout <= 0 {
		verifyTimeout = 30 * time.Second
	}
	verifyPoll := cfg.VerifyPollInterval
	if verifyPoll <= 0 {
		verifyPoll = 2 * time.Second
	}
	maxRetries := cfg.MaxRetries
	if maxRetries <= 0 {
		maxRetries = 3
	}
	return &Sender{
		gw:            gw,
		upstream:      upstream,
		timeout:       timeout,
		verifyTimeout: verifyTimeout,
		verifyPoll:    verifyPoll,
		maxRetries:    maxRetries,
	}
}

// Request 一次发送请求。
type Request struct {
	SessionID string
	Content   string
	// Label 调用方标识，写入日志便于区分来源（如 dashboard-push、cron-job）。
	Label string
}

// Result 发送结果。
type Result struct {
	SessionID        string
	HandshakeMatched bool
	AckReason        string
	VerifyMethod     VerifyMethod
	Attempts         int
	Elapsed          time.Duration
}

// CompleteFunc 异步发送完成回调（在独立 goroutine 内调用）。
type CompleteFunc func(r *Result, err error)

// Send 同步发送并确认送达：WS 发送 → 最多 30s 内状态/历史确认 → 失败重试。
func (s *Sender) Send(ctx context.Context, req Request) (*Result, error) {
	sessionID := strings.TrimSpace(req.SessionID)
	content := strings.TrimSpace(req.Content)
	label := strings.TrimSpace(req.Label)
	if label == "" {
		label = "default"
	}

	if sessionID == "" {
		return nil, fmt.Errorf("session id is required")
	}
	if content == "" {
		return nil, fmt.Errorf("content is required")
	}

	contentPreview := content
	if len(contentPreview) > 200 {
		contentPreview = contentPreview[:200] + "..."
	}

	slog.Info(LogPrefix+" begin",
		slog.String("label", label),
		slog.String("session_id", sessionID),
		slog.Int("payload_bytes", len(content)),
		slog.String("content_preview", contentPreview),
		slog.Duration("verify_window", s.verifyTimeout),
		slog.Int("max_retries", s.maxRetries),
	)

	overallStart := time.Now()
	var lastErr error

	for attempt := 1; attempt <= s.maxRetries; attempt++ {
		if err := ctx.Err(); err != nil {
			return nil, err
		}

		attemptCtx, cancel := context.WithTimeout(ctx, s.timeout+s.verifyTimeout)
		res, err := s.sendOnce(attemptCtx, sessionID, content, label, attempt)
		cancel()

		if err == nil && res != nil {
			res.Attempts = attempt
			res.Elapsed = time.Since(overallStart)
			slog.Info(LogPrefix+" success",
				slog.String("label", label),
				slog.String("session_id", res.SessionID),
				slog.String("verify_method", string(res.VerifyMethod)),
				slog.String("ack_reason", res.AckReason),
				slog.Int("attempts", attempt),
				slog.Duration("elapsed", res.Elapsed),
			)
			return res, nil
		}

		lastErr = err
		if err == nil {
			lastErr = fmt.Errorf("delivery not verified within %s", s.verifyTimeout)
		}
		slog.Warn(LogPrefix+" attempt failed, will retry if attempts remain",
			slog.String("label", label),
			slog.String("session_id", sessionID),
			slog.Int("attempt", attempt),
			slog.Int("max_retries", s.maxRetries),
			slog.String("error", lastErr.Error()),
		)

		if attempt < s.maxRetries {
			select {
			case <-ctx.Done():
				return nil, ctx.Err()
			case <-time.After(2 * time.Second):
			}
		}
	}

	slog.Error(LogPrefix+" failed after retries",
		slog.String("label", label),
		slog.String("session_id", sessionID),
		slog.Int("max_retries", s.maxRetries),
		slog.String("error", lastErr.Error()),
	)
	return nil, lastErr
}

func (s *Sender) sendOnce(ctx context.Context, sessionID, content, label string, attempt int) (*Result, error) {
	slog.Info(LogPrefix+" ws push attempt",
		slog.String("label", label),
		slog.String("session_id", sessionID),
		slog.Int("attempt", attempt),
	)

	pushCtx, cancel := context.WithTimeout(ctx, s.timeout)
	defer cancel()

	upstream, err := s.gw.PushUserInput(pushCtx, sessionID, content)
	if err != nil {
		return nil, fmt.Errorf("ws push: %w", err)
	}

	ackReason := "unknown"
	handshakeMatched := false
	respSessionID := sessionID
	if upstream != nil {
		ackReason = upstream.AckReason
		handshakeMatched = upstream.HandshakeStateIDMatched
		if upstream.SessionID != "" {
			respSessionID = upstream.SessionID
		}
	}
	slog.Info(LogPrefix+" ws push done, starting delivery verify",
		slog.String("label", label),
		slog.String("session_id", respSessionID),
		slog.Int("attempt", attempt),
		slog.String("ack_reason", ackReason),
		slog.Bool("handshake_matched", handshakeMatched),
		slog.Duration("verify_window", s.verifyTimeout),
	)

	verifyCtx, verifyCancel := context.WithTimeout(ctx, s.verifyTimeout)
	defer verifyCancel()

	ok, method := s.verifyDelivery(verifyCtx, respSessionID, content, label, ackReason)
	if !ok {
		return nil, fmt.Errorf("delivery not verified within %s (last_ack=%s)", s.verifyTimeout, ackReason)
	}

	return &Result{
		SessionID:        respSessionID,
		HandshakeMatched: handshakeMatched,
		AckReason:        ackReason,
		VerifyMethod:     method,
	}, nil
}

// SendAsync 在后台 goroutine 中执行 Send，不阻塞调用方。
func (s *Sender) SendAsync(req Request, onComplete CompleteFunc) {
	s.running.Add(1)
	go func() {
		defer s.running.Add(-1)

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(s.maxRetries)*(s.timeout+s.verifyTimeout)+30*time.Second)
		defer cancel()

		res, err := s.Send(ctx, req)
		if onComplete != nil {
			onComplete(res, err)
		}
	}()
}

// Inflight 返回当前进行中的异步发送数量。
func (s *Sender) Inflight() int64 {
	return s.running.Load()
}
