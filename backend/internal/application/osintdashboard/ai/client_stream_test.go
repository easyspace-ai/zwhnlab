package ai

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestPlainChatStream_emitsIncrementalChunks(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/chat/completions" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/event-stream")
		fmt.Fprint(w, "data: {\"choices\":[{\"delta\":{\"content\":\"你\"}}]}\n\n")
		fmt.Fprint(w, "data: {\"choices\":[{\"delta\":{\"content\":\"好\"}}]}\n\n")
		fmt.Fprint(w, "data: [DONE]\n\n")
	}))
	defer srv.Close()

	c := &Client{
		apiKey:     "test-key",
		baseURL:    srv.URL,
		model:      "deepseek-chat",
		streamHTTP: srv.Client(),
	}

	var chunks []string
	reply, err := c.PlainChatStream(context.Background(), "hello", nil, func(delta string) error {
		chunks = append(chunks, delta)
		return nil
	})
	if err != nil {
		t.Fatalf("PlainChatStream: %v", err)
	}
	if reply != "你好" {
		t.Fatalf("reply = %q, want 你好", reply)
	}
	if strings.Join(chunks, "") != "你好" {
		t.Fatalf("chunks = %v, want [你 好]", chunks)
	}
}
