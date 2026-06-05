package pptxgenjs

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/easyspace-ai/ylmnote/internal/infrastructure/deepseek"
)

// StandardProductSchema is the canonical feidu-style deck document (alias for ProductSchema).
type StandardProductSchema = ProductSchema

// NormalizeResult holds a normalized schema and non-fatal warnings.
type NormalizeResult struct {
	Schema   *StandardProductSchema `json:"schema"`
	Warnings []string               `json:"warnings,omitempty"`
	Skipped  bool                   `json:"skipped,omitempty"`
}

type SchemaNormalizer struct {
	llm     *deepseek.Client
	prompt  string
	timeout time.Duration
}

func NewSchemaNormalizer(llm *deepseek.Client, prompt string, timeout time.Duration) *SchemaNormalizer {
	if timeout <= 0 {
		timeout = 2 * time.Minute
	}
	return &SchemaNormalizer{llm: llm, prompt: strings.TrimSpace(prompt), timeout: timeout}
}

// NeedsProductSchemaNormalization is true when upload should pass through LLM before generators.
func NeedsProductSchemaNormalization(fileName, raw string) bool {
	lower := strings.ToLower(strings.TrimSpace(fileName))
	if strings.HasSuffix(lower, ".json") {
		return true
	}
	text := strings.TrimSpace(raw)
	if !strings.HasPrefix(text, "{") && !strings.HasPrefix(text, "[") {
		return false
	}
	if doc, ok := TryParseProductSchema(text); ok && IsCanonicalProductSchema(doc) {
		return false
	}
	return true
}

// IsCanonicalProductSchema checks feidu-style completeness for a fast path skip.
func IsCanonicalProductSchema(doc *ProductSchema) bool {
	if doc == nil || len(doc.Slides) == 0 {
		return false
	}
	if strings.TrimSpace(doc.DocumentTitle) == "" {
		return false
	}
	typed := 0
	for _, s := range doc.Slides {
		if strings.TrimSpace(s.PageType) != "" {
			typed++
		}
	}
	return typed >= len(doc.Slides)/2
}

func (n *SchemaNormalizer) NormalizeProductSchema(ctx context.Context, raw string) (*NormalizeResult, error) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return nil, fmt.Errorf("empty input")
	}

	if doc, ok := TryParseProductSchema(raw); ok && IsCanonicalProductSchema(doc) {
		return &NormalizeResult{Schema: doc, Skipped: true}, nil
	}

	if n.llm == nil || n.prompt == "" {
		return nil, fmt.Errorf("schema normalizer not configured")
	}

	callCtx, cancel := context.WithTimeout(ctx, n.timeout)
	defer cancel()

	user := fmt.Sprintf("## Uploaded JSON\n%s", truncate(raw, 48000))
	reply, err := n.llm.ChatWithSystem(callCtx, n.prompt, []deepseek.Message{{Role: "user", Content: user}})
	if err != nil {
		return nil, fmt.Errorf("normalize: %w", err)
	}

	jsonText := extractJSON(reply)
	if jsonText == "" {
		return nil, fmt.Errorf("normalize: no json in model response")
	}

	doc, warnings, err := parseNormalizedSchema(jsonText)
	if err != nil {
		return nil, err
	}
	return &NormalizeResult{Schema: doc, Warnings: warnings}, nil
}

func parseNormalizedSchema(jsonText string) (*StandardProductSchema, []string, error) {
	var warnings []string

	doc, ok := TryParseProductSchema(jsonText)
	if ok {
		repairProductSchema(doc, &warnings)
		return doc, warnings, nil
	}

	var loose ProductSchema
	if err := json.Unmarshal([]byte(stripJSONComments(jsonText)), &loose); err != nil {
		repaired := repairJSONInlineQuotes(stripJSONComments(jsonText))
		if err2 := json.Unmarshal([]byte(repaired), &loose); err2 != nil {
			return nil, warnings, fmt.Errorf("normalize: invalid json: %w", err)
		}
	}
	if len(loose.Slides) == 0 {
		return nil, warnings, fmt.Errorf("normalize: slides array required")
	}
	repairProductSchema(&loose, &warnings)
	if _, ok := TryParseProductSchema(mustMarshalProductSchema(&loose)); !ok {
		return nil, warnings, fmt.Errorf("normalize: could not validate normalized schema")
	}
	return &loose, warnings, nil
}

func repairProductSchema(doc *ProductSchema, warnings *[]string) {
	if doc == nil {
		return
	}
	if doc.TotalPages <= 0 {
		doc.TotalPages = len(doc.Slides)
	}
	if strings.TrimSpace(doc.DocumentTitle) == "" {
		if len(doc.Slides) > 0 && strings.TrimSpace(doc.Slides[0].Headline) != "" {
			doc.DocumentTitle = strings.TrimSpace(doc.Slides[0].Headline)
			*warnings = append(*warnings, "document_title inferred from first slide")
		} else {
			doc.DocumentTitle = "演示文稿"
			*warnings = append(*warnings, "document_title defaulted")
		}
	}
	for i := range doc.Slides {
		s := &doc.Slides[i]
		if s.PageID <= 0 {
			s.PageID = i + 1
		}
		if strings.TrimSpace(s.PageType) == "" {
			s.PageType = "insight"
			*warnings = append(*warnings, fmt.Sprintf("slide %d: page_type defaulted to insight", i+1))
		}
		if strings.TrimSpace(s.Headline) == "" {
			s.Headline = fmt.Sprintf("第 %d 页", i+1)
		}
	}
	if strings.TrimSpace(doc.Style) == "" {
		doc.Style = "deloitte"
	}
}

func mustMarshalProductSchema(doc *ProductSchema) string {
	b, _ := json.Marshal(doc)
	return string(b)
}
