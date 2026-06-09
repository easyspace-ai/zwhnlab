package aichat

import (
	"context"
	"errors"
	"strings"
	"testing"
)

func TestChatRoundUserFacingError_timeout(t *testing.T) {
	msg := chatRoundUserFacingError(context.DeadlineExceeded)
	if msg != "回复生成超时，请稍后重试。" {
		t.Fatalf("got %q", msg)
	}
}

func TestChatRoundUserFacingError_notEditHTMLMessage(t *testing.T) {
	msg := chatRoundUserFacingError(context.DeadlineExceeded)
	if strings.Contains(msg, "改版式") {
		t.Fatalf("discuss/deepseek timeout must not mention edit_html: %q", msg)
	}
}

func TestChatRoundUserFacingError_reportNotReady(t *testing.T) {
	msg := chatRoundUserFacingError(errors.New("session report not ready"))
	if msg != "报告尚未就绪，请稍后再试。" {
		t.Fatalf("got %q", msg)
	}
}

func TestIsEditHTMLDiscuss(t *testing.T) {
	if !isEditHTMLDiscuss("edit_html", "res-1") {
		t.Fatal("expected edit_html with target")
	}
	if isEditHTMLDiscuss("edit_html", "") {
		t.Fatal("edit_html without target should be discuss path")
	}
	if isEditHTMLDiscuss("", "md-1") {
		t.Fatal("markdown target without edit_html mode must not trigger HTML edit")
	}
}
