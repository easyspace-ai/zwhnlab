package xstream

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/infrastructure/persistence"
)

const APIBaseURL = "https://risk.haina.info/api/Monitor/queryMonitorStream"
const StreamGroupAPIURL = "https://risk.haina.info/api/Monitor/queryMonitorStreamGroup"

// StreamGroup is a monitor stream category from the upstream API.
type StreamGroup struct {
	ID   int64  `json:"id"`
	Type string `json:"type"`
}

type streamGroupAPIResponse struct {
	Errcode int          `json:"errcode"`
	Errmsg  string       `json:"errmsg"`
	Data    []StreamGroup `json:"data"`
}

func streamGroupAPIURL() string {
	if u := strings.TrimSpace(os.Getenv("XSTREAM_GROUP_API_URL")); u != "" {
		return u
	}
	return StreamGroupAPIURL
}

// FetchStreamGroups returns current monitor stream categories (no auth).
func FetchStreamGroups(ctx context.Context, client *http.Client) ([]StreamGroup, error) {
	if client == nil {
		client = &http.Client{Timeout: 30 * time.Second}
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, streamGroupAPIURL(), nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("fetch: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API status %d", resp.StatusCode)
	}
	var result streamGroupAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	if result.Errcode != 0 {
		return nil, fmt.Errorf("API error: %s", result.Errmsg)
	}
	return result.Data, nil
}

// FetchPage 调用上游监测流接口。
// sinceId：0 或不传表示拉取最新一批；>0 表示拉取该 ID 之前的历史（上一页返回的 nextSinceId）。
func FetchPage(ctx context.Context, client *http.Client, sinceID int64, limit int, itemType string) (*persistence.XStreamAPIResponse, error) {
	if client == nil {
		client = &http.Client{Timeout: 30 * time.Second}
	}
	if limit <= 0 {
		limit = DefaultLimit
	}
	if limit > 1000 {
		limit = 1000
	}

	q := url.Values{}
	q.Set("limit", strconv.Itoa(limit))
	if sinceID > 0 {
		q.Set("sinceId", strconv.FormatInt(sinceID, 10))
	}
	if itemType != "" && itemType != "all" {
		q.Set("type", itemType)
	}

	reqURL := APIBaseURL + "?" + q.Encode()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, reqURL, nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("fetch: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API status %d", resp.StatusCode)
	}

	var result persistence.XStreamAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	if result.Errcode != 0 {
		return nil, fmt.Errorf("API error: %s", result.Errmsg)
	}
	return &result, nil
}

// NextCursor 解析下一页历史游标。
func NextCursor(data persistence.XStreamAPIData) (nextID int64, hasMore bool) {
	hasMore = data.HasMore
	if data.NextSinceID != nil && *data.NextSinceID > 0 {
		nextID = *data.NextSinceID
	}
	return nextID, hasMore
}

// LimitFromEnv 读取 XSTREAM_FETCH_LIMIT。
func LimitFromEnv() int {
	limit := DefaultLimit
	if l := os.Getenv("XSTREAM_FETCH_LIMIT"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 && parsed <= 1000 {
			limit = parsed
		}
	}
	return limit
}
