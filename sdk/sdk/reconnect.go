package sdk

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

// RetryConfig controls WebSocket dial retries (0 MaxAttempts = single try).
type RetryConfig struct {
	MaxAttempts    int
	InitialBackoff time.Duration
	MaxBackoff     time.Duration
}

func (c *Client) retryConfig() RetryConfig {
	rc := c.retry
	if rc.MaxAttempts <= 0 {
		rc.MaxAttempts = envIntDefault("W6_WS_RECONNECT_MAX_ATTEMPTS", 8)
	}
	if rc.InitialBackoff <= 0 {
		rc.InitialBackoff = envDurationDefault("W6_WS_RECONNECT_INITIAL_MS", 1*time.Second, true)
	}
	if rc.MaxBackoff <= 0 {
		rc.MaxBackoff = envDurationDefault("W6_WS_RECONNECT_MAX_MS", 30*time.Second, true)
	}
	return rc
}

// DialSessionRetry dials /api/ws/run with exponential backoff, reusing sessionID each attempt.
func (c *Client) DialSessionRetry(ctx context.Context, sessionID string) (*websocket.Conn, error) {
	rc := c.retryConfig()
	var lastErr error
	backoff := rc.InitialBackoff
	for attempt := 1; attempt <= rc.MaxAttempts; attempt++ {
		if err := ctx.Err(); err != nil {
			return nil, err
		}
		conn, err := c.DialSession(ctx, sessionID)
		if err == nil {
			if attempt > 1 && sdkDebug() {
				log.Printf("[ws-sdk] dial ok session=%q attempt=%d", sessionID, attempt)
			}
			return conn, nil
		}
		lastErr = err
		if attempt >= rc.MaxAttempts {
			break
		}
		if sdkDebug() {
			log.Printf("[ws-sdk] dial failed session=%q attempt=%d/%d: %v", sessionID, attempt, rc.MaxAttempts, err)
		}
		select {
		case <-ctx.Done():
			return nil, ctx.Err()
		case <-time.After(backoff):
		}
		backoff *= 2
		if backoff > rc.MaxBackoff {
			backoff = rc.MaxBackoff
		}
	}
	return nil, fmt.Errorf("dial websocket after %d attempts: %w", rc.MaxAttempts, lastErr)
}

func envIntDefault(key string, def int) int {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return def
	}
	n, err := strconv.Atoi(v)
	if err != nil || n <= 0 {
		return def
	}
	return n
}

func envDurationDefault(key string, def time.Duration, millis bool) time.Duration {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return def
	}
	if millis {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			return time.Duration(n) * time.Millisecond
		}
	}
	if d, err := time.ParseDuration(v); err == nil && d > 0 {
		return d
	}
	return def
}
