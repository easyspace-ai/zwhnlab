package aichat

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"strings"
	"time"
)

const (
	deepSeekRoundTimeout = 120 * time.Second
	editHTMLRoundTimeout = 360 * time.Second
	llmMonitorMaxStall   = 5 * time.Minute
)

type llmRoundWatch struct {
	roundID string
	cancel  context.CancelFunc
}

func (s *Service) trackLLMRound(sessionID, roundID string, cancel context.CancelFunc) {
	s.llmMu.Lock()
	defer s.llmMu.Unlock()
	if old, ok := s.llmCancels[sessionID]; ok {
		old.cancel()
	}
	s.llmCancels[sessionID] = &llmRoundWatch{roundID: roundID, cancel: cancel}
}

func (s *Service) cancelLLMRound(sessionID, roundID string) bool {
	s.llmMu.Lock()
	defer s.llmMu.Unlock()
	watch, ok := s.llmCancels[sessionID]
	if !ok || watch.roundID != roundID {
		return false
	}
	watch.cancel()
	delete(s.llmCancels, sessionID)
	return true
}

func (s *Service) untrackLLMRound(sessionID, roundID string) {
	s.llmMu.Lock()
	defer s.llmMu.Unlock()
	if watch, ok := s.llmCancels[sessionID]; ok && watch.roundID == roundID {
		delete(s.llmCancels, sessionID)
	}
}

func (s *Service) llmRoundCtx(sessionID, roundID string) (context.Context, context.CancelFunc) {
	base, cancel := context.WithCancel(context.Background())
	ctx, timeoutCancel := context.WithTimeout(base, deepSeekRoundTimeout)
	s.trackLLMRound(sessionID, roundID, cancel)
	return ctx, func() {
		timeoutCancel()
		cancel()
		s.untrackLLMRound(sessionID, roundID)
	}
}

func (s *Service) runDeepSeekRound(sessionID, roundID, topic string) {
	defer s.recoverLLMRound(sessionID, roundID, "deepseek")
	ctx, done := s.llmRoundCtx(sessionID, roundID)
	defer done()

	onDelta := func(delta string) error {
		_, err := s.events.AppendAssistantDelta(sessionID, roundID, delta)
		return err
	}
	_, err := s.osint.PlainChatStream(ctx, sessionID, topic, onDelta)
	s.finishLLMRound(sessionID, roundID, err)
}

func (s *Service) runDiscussRound(sessionID, roundID, topic, mdResourceID string) {
	defer s.recoverLLMRound(sessionID, roundID, "discuss")
	ctx, done := s.llmRoundCtx(sessionID, roundID)
	defer done()

	onDelta := func(delta string) error {
		_, err := s.events.AppendAssistantDelta(sessionID, roundID, delta)
		return err
	}
	_, err := s.osint.DiscussStream(ctx, sessionID, topic, mdResourceID, onDelta)
	s.finishLLMRound(sessionID, roundID, err)
}

func (s *Service) runEditHTMLRound(sessionID, roundID, htmlResourceID, topic string) {
	defer s.recoverLLMRound(sessionID, roundID, "edit_html")
	ctx, cancel := context.WithTimeout(context.Background(), editHTMLRoundTimeout)
	defer cancel()
	s.trackLLMRound(sessionID, roundID, cancel)
	defer s.untrackLLMRound(sessionID, roundID)

	result, err := s.osint.EditReportHTML(ctx, sessionID, htmlResourceID, topic)
	if err != nil {
		s.finishLLMRound(sessionID, roundID, err)
		return
	}
	if strings.TrimSpace(result.Reply) != "" {
		_, _ = s.events.AppendAssistantDelta(sessionID, roundID, result.Reply)
	}
	if result.Edited && strings.TrimSpace(result.HTMLResourceID) != "" {
		reportTitle := "调研报告"
		if ws, wsErr := s.osint.Workflow().Get(sessionID); wsErr == nil && ws != nil {
			if t := strings.TrimSpace(ws.Topic); t != "" {
				reportTitle = t
			}
		}
		_, _ = s.events.AppendReportReady(sessionID, roundID, reportTitle, "", result.HTMLResourceID)
	}
	s.finishLLMRound(sessionID, roundID, nil)
}

func (s *Service) recoverLLMRound(sessionID, roundID, kind string) {
	if r := recover(); r != nil {
		log.Printf("[aichat] llm round panic session=%s round=%s kind=%s: %v", sessionID, roundID, kind, r)
		s.finishLLMRound(sessionID, roundID, fmt.Errorf("internal error: %v", r))
	}
}

func (s *Service) finishLLMRound(sessionID, roundID string, err error) {
	if err != nil && !errors.Is(err, context.Canceled) {
		_, _ = s.events.AppendAssistantDelta(sessionID, roundID, "❌ "+chatRoundUserFacingError(err))
	}
	st, _, loadErr := s.events.Load(sessionID)
	if loadErr == nil && st != nil && isRoundSealed(st.Events, roundID) {
		return
	}
	_, _ = s.events.AppendRoundSealed(sessionID, roundID, SealTerminal)
}

func chatRoundUserFacingError(err error) string {
	if err == nil {
		return ""
	}
	msg := strings.TrimSpace(err.Error())
	switch {
	case isChatTimeoutError(err):
		return "回复生成超时，请稍后重试。"
	case strings.Contains(msg, "LLM API key not configured"):
		return "未配置 AI 服务密钥，无法生成回复。"
	case strings.Contains(msg, "empty LLM response"):
		return "AI 未返回有效内容，请重试。"
	case strings.Contains(msg, "session report not ready"):
		return "报告尚未就绪，请稍后再试。"
	default:
		if msg == "" {
			return "生成回复失败，请重试。"
		}
		return msg
	}
}

func isEditHTMLDiscuss(mode, targetResourceID string) bool {
	return strings.TrimSpace(mode) == "edit_html" && strings.TrimSpace(targetResourceID) != ""
}

func isChatTimeoutError(err error) bool {
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
