package intelligence

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// defaultSkillFile 与 data/skills/defaults/*.json 结构一致
type defaultSkillFile struct {
	Key            string          `json:"key"`
	Name           string          `json:"name"`
	Description    *string         `json:"description"`
	Icon           *string         `json:"icon"`
	FormSchema     json.RawMessage `json:"form_schema"`
	PromptTemplate string          `json:"prompt_template"`
	IsEnabled      bool            `json:"is_enabled"`
	SortOrder      int             `json:"sort_order"`
}

// BuiltinSkillKeys 系统内置技能 key（defaults 目录中的定义）
var BuiltinSkillKeys = map[string]struct{}{
	"fact_check":           {},
	"info_research":        {},
	"data_collection":      {},
	"follow_up":            {},
	"daily_brief":          {},
	"market_analysis":      {},
	"competitor_intel":     {},
	"business_plan_review": {},
	"stock_screener":       {},
	"technical_analysis":   {},
	"earnings_review":      {},
}

// LoadDefaultSkillsFromDir 递归加载目录及子目录下的全部默认技能 JSON
func LoadDefaultSkillsFromDir(dir string) ([]SkillCreateInput, error) {
	var out []SkillCreateInput
	walkErr := filepath.WalkDir(dir, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(strings.ToLower(path), ".json") {
			return nil
		}
		b, err := os.ReadFile(path)
		if err != nil {
			return fmt.Errorf("read skill default %q: %w", path, err)
		}
		var raw defaultSkillFile
		if err := json.Unmarshal(b, &raw); err != nil {
			return fmt.Errorf("parse skill default %q: %w", path, err)
		}
		in, err := raw.toCreateInput()
		if err != nil {
			return fmt.Errorf("skill default %q: %w", path, err)
		}
		out = append(out, in)
		return nil
	})
	if walkErr != nil {
		return nil, fmt.Errorf("read skills defaults dir %q: %w", dir, walkErr)
	}
	if len(out) == 0 {
		return nil, fmt.Errorf("no skill defaults found in %q", dir)
	}
	sort.Slice(out, func(i, j int) bool {
		return out[i].Key < out[j].Key
	})
	return out, nil
}

func (f *defaultSkillFile) toCreateInput() (SkillCreateInput, error) {
	key := strings.TrimSpace(f.Key)
	if key == "" {
		return SkillCreateInput{}, fmt.Errorf("missing key")
	}
	if strings.TrimSpace(f.Name) == "" {
		return SkillCreateInput{}, fmt.Errorf("missing name")
	}
	formSchema := strings.TrimSpace(string(f.FormSchema))
	if formSchema == "" {
		return SkillCreateInput{}, fmt.Errorf("missing form_schema")
	}
	if !json.Valid([]byte(formSchema)) {
		return SkillCreateInput{}, fmt.Errorf("invalid form_schema JSON")
	}
	if strings.TrimSpace(f.PromptTemplate) == "" {
		return SkillCreateInput{}, fmt.Errorf("missing prompt_template")
	}
	return SkillCreateInput{
		Key:            key,
		Name:           strings.TrimSpace(f.Name),
		Description:    f.Description,
		Icon:           f.Icon,
		FormSchema:     formSchema,
		PromptTemplate: f.PromptTemplate,
		IsEnabled:      f.IsEnabled,
		SortOrder:      f.SortOrder,
	}, nil
}

func defaultSkillsByKey(list []SkillCreateInput) map[string]SkillCreateInput {
	m := make(map[string]SkillCreateInput, len(list))
	for _, item := range list {
		m[item.Key] = item
	}
	return m
}
