package deepseek

import (
	"errors"
	"net"
	"strings"
)

// IsRetryableLLMError reports transient upstream / transport failures worth retrying.
func IsRetryableLLMError(err error) bool {
	if err == nil {
		return false
	}
	msg := strings.ToLower(err.Error())
	retryable := []string{
		"internal_error",
		"stream error",
		"received from peer",
		"connection reset",
		"connection refused",
		"broken pipe",
		"eof",
		"timeout",
		"temporarily unavailable",
		"rate limit",
		"too many requests",
		"http 502",
		"http 503",
		"http 529",
		"deepseek http 5",
	}
	for _, needle := range retryable {
		if strings.Contains(msg, needle) {
			return true
		}
	}
	var netErr net.Error
	if errors.As(err, &netErr) && netErr.Timeout() {
		return true
	}
	return false
}
