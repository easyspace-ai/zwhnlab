package w6

import (
	"os"
	"strconv"
	"strings"
	"time"
)

func pollTimeout() time.Duration {
	key := "W6_POLL_TIMEOUT_SEC"
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return 86400 * time.Second
	}
	if v == "0" {
		return 0
	}
	if sec, err := strconv.Atoi(v); err == nil {
		if sec <= 0 {
			return 0
		}
		return time.Duration(sec) * time.Second
	}
	if d, err := time.ParseDuration(v); err == nil {
		return d
	}
	return 86400 * time.Second
}
