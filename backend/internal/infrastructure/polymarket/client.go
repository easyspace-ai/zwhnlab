package polymarket

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
)

const (
	defaultGammaBase = "https://gamma-api.polymarket.com"
	defaultCLOBBase  = "https://clob.polymarket.com"
)

func gammaBaseURL() string {
	if v := strings.TrimSpace(os.Getenv("POLYMARKET_GAMMA_URL")); v != "" {
		return strings.TrimRight(v, "/")
	}
	return defaultGammaBase
}

func clobBaseURL() string {
	if v := strings.TrimSpace(os.Getenv("POLYMARKET_CLOB_URL")); v != "" {
		return strings.TrimRight(v, "/")
	}
	return defaultCLOBBase
}

// GammaEvent is a subset of Gamma API /events response.
type GammaEvent struct {
	ID            string          `json:"id"`
	Slug          string          `json:"slug"`
	Title         string          `json:"title"`
	Description   string          `json:"description"`
	Image         string          `json:"image"`
	Icon          string          `json:"icon"`
	Volume        float64         `json:"volume"`
	Volume24hr    float64         `json:"volume24hr"`
	Markets       []GammaMarket   `json:"markets"`
	EventMetadata *GammaEventMeta `json:"eventMetadata"`
}

type GammaEventMeta struct {
	ContextDescription      string `json:"context_description"`
	ContextDescriptionCamel string `json:"contextDescription"`
}

func (m *GammaEventMeta) BackgroundText() string {
	if m == nil {
		return ""
	}
	if s := strings.TrimSpace(m.ContextDescription); s != "" {
		return s
	}
	return strings.TrimSpace(m.ContextDescriptionCamel)
}

type GammaMarket struct {
	ID            string  `json:"id"`
	Question      string  `json:"question"`
	Slug          string  `json:"slug"`
	ConditionID   string  `json:"conditionId"`
	Description   string  `json:"description"`
	OutcomePrices string  `json:"outcomePrices"`
	Outcomes      string  `json:"outcomes"`
	VolumeNum     float64 `json:"volumeNum"`
	Volume24hr    float64 `json:"volume24hr"`
	ClobTokenIDs  string  `json:"clobTokenIds"`
	Active        bool    `json:"active"`
	Closed        bool    `json:"closed"`
}

func longestMarketDescription(ev *GammaEvent) string {
	if ev == nil {
		return ""
	}
	var best string
	for i := range ev.Markets {
		s := strings.TrimSpace(ev.Markets[i].Description)
		if len(s) > len(best) {
			best = s
		}
	}
	return best
}

// RulesAndBackground picks long-form copy for UI.
func RulesAndBackground(ev *GammaEvent, m *GammaMarket) (rules, background string) {
	if m != nil {
		rules = strings.TrimSpace(m.Description)
	}
	if rules == "" && ev != nil {
		rules = strings.TrimSpace(ev.Description)
	}
	if rules == "" && ev != nil {
		rules = longestMarketDescription(ev)
	}
	if ev != nil && ev.EventMetadata != nil {
		background = ev.EventMetadata.BackgroundText()
	}
	if background == "" && ev != nil {
		ed := strings.TrimSpace(ev.Description)
		if ed != "" && ed != rules {
			background = ed
		}
	}
	return rules, background
}

type HTTPClient struct {
	http *http.Client
}

// NewHTTPClient 创建 Polymarket HTTP 客户端；proxyURL 为空时不使用代理。
func NewHTTPClient(proxyURL string) *HTTPClient {
	return &HTTPClient{http: newPolymarketHTTPClient(proxyURL)}
}

func newPolymarketTransport(proxyURL string) http.RoundTripper {
	t := http.DefaultTransport.(*http.Transport).Clone()
	raw := strings.TrimSpace(proxyURL)
	if raw == "" {
		raw = strings.TrimSpace(os.Getenv("POLYMARKET_HTTP_PROXY"))
	}
	if raw == "" {
		return t
	}
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return t
	}
	t.Proxy = http.ProxyURL(u)
	return t
}

func newPolymarketHTTPClient(proxyURL string) *http.Client {
	return &http.Client{
		Transport: newPolymarketTransport(proxyURL),
		Timeout:   30 * time.Second,
	}
}

func (c *HTTPClient) FetchMarketByConditionID(ctx context.Context, conditionID string) (*GammaMarket, error) {
	conditionID = strings.TrimSpace(conditionID)
	if conditionID == "" {
		return nil, fmt.Errorf("empty condition id")
	}
	u := fmt.Sprintf("%s/markets?condition_ids=%s", gammaBaseURL(), conditionID)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("gamma markets: status %d", resp.StatusCode)
	}
	var markets []GammaMarket
	if err := json.NewDecoder(resp.Body).Decode(&markets); err != nil {
		return nil, err
	}
	if len(markets) == 0 {
		return nil, fmt.Errorf("market not found")
	}
	return &markets[0], nil
}

func (c *HTTPClient) FetchEventBySlug(ctx context.Context, slug string) (*GammaEvent, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, fmt.Errorf("empty slug")
	}
	u := fmt.Sprintf("%s/events?slug=%s", gammaBaseURL(), strings.TrimPrefix(slug, "/"))
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("gamma events: status %d", resp.StatusCode)
	}
	var events []GammaEvent
	if err := json.NewDecoder(resp.Body).Decode(&events); err != nil {
		return nil, err
	}
	if len(events) == 0 {
		return nil, fmt.Errorf("event not found")
	}
	return &events[0], nil
}

// ParsePolymarketInput extracts event slug from a Polymarket URL or returns the raw slug.
func ParsePolymarketInput(raw string) string {
	s := strings.TrimSpace(raw)
	if s == "" {
		return ""
	}
	if strings.Contains(s, "polymarket.com") {
		if i := strings.Index(s, "/event/"); i >= 0 {
			rest := s[i+len("/event/"):]
			if end := strings.IndexAny(rest, "/?#"); end >= 0 {
				rest = rest[:end]
			}
			return strings.TrimSpace(rest)
		}
	}
	if strings.HasPrefix(s, "http://") || strings.HasPrefix(s, "https://") {
		return ""
	}
	return s
}

func PickPrimaryMarket(ev *GammaEvent) *GammaMarket {
	if ev == nil {
		return nil
	}
	var best *GammaMarket
	var bestVol float64
	for i := range ev.Markets {
		m := &ev.Markets[i]
		if m.Closed || !m.Active {
			continue
		}
		v := m.VolumeNum
		if v == 0 {
			v = m.Volume24hr
		}
		if best == nil || v > bestVol {
			best, bestVol = m, v
		}
	}
	if best != nil {
		return best
	}
	if len(ev.Markets) > 0 {
		return &ev.Markets[0]
	}
	return nil
}

func ParseCLOBTokenIDs(jsonStr string) ([]string, error) {
	jsonStr = strings.TrimSpace(jsonStr)
	if jsonStr == "" {
		return nil, fmt.Errorf("missing clob token ids")
	}
	var ids []string
	if err := json.Unmarshal([]byte(jsonStr), &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

func ParseGammaOutcomePrices(jsonStr string) (yes, no float64, err error) {
	jsonStr = strings.TrimSpace(jsonStr)
	if jsonStr == "" {
		return 0, 0, fmt.Errorf("missing outcome prices")
	}
	var prices []string
	if err := json.Unmarshal([]byte(jsonStr), &prices); err != nil {
		var nums []float64
		if err2 := json.Unmarshal([]byte(jsonStr), &nums); err2 != nil {
			return 0, 0, err
		}
		if len(nums) >= 1 {
			yes = nums[0] * 100
			if len(nums) >= 2 {
				no = nums[1] * 100
			} else {
				no = (1 - nums[0]) * 100
			}
			return yes, no, nil
		}
		return 0, 0, fmt.Errorf("empty prices")
	}
	if len(prices) < 1 {
		return 0, 0, fmt.Errorf("empty prices")
	}
	y, err := strconv.ParseFloat(prices[0], 64)
	if err != nil {
		return 0, 0, err
	}
	yes = y * 100
	if len(prices) >= 2 {
		n, err2 := strconv.ParseFloat(prices[1], 64)
		if err2 != nil {
			return yes, (1 - y) * 100, nil
		}
		no = n * 100
	} else {
		no = (1 - y) * 100
	}
	return yes, no, nil
}

// PriceHistoryPoint matches CLOB /prices-history entries.
type PriceHistoryPoint struct {
	T int64   `json:"t"` // unix seconds
	P float64 `json:"p"` // 0..1
}

type priceHistoryResponse struct {
	History []PriceHistoryPoint `json:"history"`
}

func (c *HTTPClient) FetchPriceHistory(ctx context.Context, tokenID, timeframe string) ([]PriceHistoryPoint, error) {
	tokenID = strings.TrimSpace(tokenID)
	if tokenID == "" {
		return nil, fmt.Errorf("empty token id")
	}
	interval, fidelity := "1d", 15
	switch strings.ToUpper(strings.TrimSpace(timeframe)) {
	case "ALL", "MAX":
		interval, fidelity = "max", 1440
	case "24H", "1D", "":
		interval, fidelity = "1d", 15
	case "7D":
		interval, fidelity = "7d", 60
	case "1M", "30D":
		interval, fidelity = "30d", 240
	default:
		interval, fidelity = "1d", 15
	}
	u := fmt.Sprintf("%s/prices-history?market=%s&interval=%s&fidelity=%d",
		clobBaseURL(), tokenID, interval, fidelity)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("clob prices-history: status %d", resp.StatusCode)
	}
	var body priceHistoryResponse
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return nil, err
	}
	return body.History, nil
}
