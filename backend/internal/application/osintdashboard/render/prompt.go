package render

import (
	"fmt"
	"regexp"
	"strings"
)

// FieldMeta describes a form field for display formatting.
type FieldMeta struct {
	Field   string
	Label   string
	Type    string // select | textarea | text
	Options []Option
}

// Option is a select choice.
type Option struct {
	Label string
	Value string
}

var ifBlock = regexp.MustCompile(`(?s)\{\{#if\s+(\w+)\}\}(.*?)\{\{/if\}\}`)

// Prompt renders fact-check template with collected values (Handlebars subset).
func Prompt(template string, collected map[string]interface{}, fields []FieldMeta) string {
	out := template
	for _, m := range ifBlock.FindAllStringSubmatch(out, -1) {
		key := m[1]
		inner := m[2]
		repl := ""
		if v, ok := collected[key]; ok && !isEmpty(v) {
			repl = inner
		}
		out = strings.Replace(out, m[0], repl, 1)
	}

	metaByField := make(map[string]FieldMeta)
	for _, st := range fields {
		metaByField[st.Field] = st
	}

	for field, val := range collected {
		st, ok := metaByField[field]
		display := fmt.Sprint(val)
		if ok && st.Type == "select" {
			display = formatSelect(val, st.Options)
		}
		out = strings.ReplaceAll(out, "{{"+field+"}}", display)
	}
	out = regexp.MustCompile(`\{\{[^}]+\}\}`).ReplaceAllString(out, "")
	return strings.TrimSpace(out)
}

func isEmpty(v interface{}) bool {
	if v == nil {
		return true
	}
	if s, ok := v.(string); ok {
		return strings.TrimSpace(s) == ""
	}
	return false
}

func formatSelect(v interface{}, options []Option) string {
	s, _ := v.(string)
	for _, o := range options {
		if o.Value == s {
			return o.Label
		}
	}
	return s
}
