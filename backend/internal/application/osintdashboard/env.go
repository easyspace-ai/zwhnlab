package osintdashboard

import (
	"os"
	"strconv"
	"strings"
	"time"
)

// DurationEnv parses seconds (integer) or Go duration string. empty → default. "0" → 0 (unlimited).
func DurationEnv(key string, defaultSec int) time.Duration {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		if defaultSec <= 0 {
			return 0
		}
		return time.Duration(defaultSec) * time.Second
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
	if defaultSec <= 0 {
		return 0
	}
	return time.Duration(defaultSec) * time.Second
}
