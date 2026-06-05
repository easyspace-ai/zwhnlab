package osintdashboard

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	reIfBlock     = regexp.MustCompile(`\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{/if\}\}`)
	reIfEqBlock   = regexp.MustCompile(`\{\{#if\s+\(eq\s+(\w+)\s+"([^"]*)"\)\}\}([\s\S]*?)\{\{/if\}\}`)
	rePlaceholder = regexp.MustCompile(`\{\{(\w+)\}\}`)
)

// RenderPromptTemplate renders intelligence skill prompt_template (Handlebars-style) with form data.
func RenderPromptTemplate(tpl string, formData map[string]interface{}) (string, error) {
	tpl = strings.TrimSpace(tpl)
	if tpl == "" {
		return "", fmt.Errorf("empty prompt template")
	}

	result := tpl

	result = reIfBlock.ReplaceAllStringFunc(result, func(match string) string {
		sub := reIfBlock.FindStringSubmatch(match)
		if len(sub) < 3 {
			return ""
		}
		key, body := sub[1], sub[2]
		if isPromptValueEmpty(formData[key]) {
			return ""
		}
		return replacePromptPlaceholders(body, formData)
	})

	result = reIfEqBlock.ReplaceAllStringFunc(result, func(match string) string {
		sub := reIfEqBlock.FindStringSubmatch(match)
		if len(sub) < 4 {
			return ""
		}
		key, want, body := sub[1], sub[2], sub[3]
		if fmt.Sprint(formData[key]) != want {
			return ""
		}
		return replacePromptPlaceholders(body, formData)
	})

	result = rePlaceholder.ReplaceAllStringFunc(result, func(match string) string {
		sub := rePlaceholder.FindStringSubmatch(match)
		if len(sub) < 2 {
			return ""
		}
		return formatPromptValue(formData[sub[1]])
	})

	out := strings.TrimSpace(result)
	if out == "" {
		return "", fmt.Errorf("rendered prompt is empty")
	}
	return out, nil
}

func replacePromptPlaceholders(body string, formData map[string]interface{}) string {
	return rePlaceholder.ReplaceAllStringFunc(body, func(match string) string {
		sub := rePlaceholder.FindStringSubmatch(match)
		if len(sub) < 2 {
			return ""
		}
		return formatPromptValue(formData[sub[1]])
	})
}

func isPromptValueEmpty(val interface{}) bool {
	if val == nil {
		return true
	}
	switch v := val.(type) {
	case string:
		return strings.TrimSpace(v) == ""
	case []interface{}:
		return len(v) == 0
	case []string:
		return len(v) == 0
	default:
		return false
	}
}

func formatPromptValue(val interface{}) string {
	if val == nil {
		return ""
	}
	switch v := val.(type) {
	case string:
		return v
	case []interface{}:
		parts := make([]string, 0, len(v))
		for _, item := range v {
			parts = append(parts, formatPromptArrayItem(item))
		}
		return strings.Join(parts, "、")
	case []string:
		return strings.Join(v, "、")
	default:
		return fmt.Sprint(v)
	}
}

func formatPromptArrayItem(item interface{}) string {
	switch v := item.(type) {
	case map[string]interface{}:
		if s, ok := v["label"].(string); ok && strings.TrimSpace(s) != "" {
			return s
		}
		if s, ok := v["value"].(string); ok && strings.TrimSpace(s) != "" {
			return s
		}
		return fmt.Sprint(v)
	default:
		return fmt.Sprint(item)
	}
}
