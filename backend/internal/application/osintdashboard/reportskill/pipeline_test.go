package reportskill

import (
	"context"
	"strings"
	"testing"
)

func TestResolveDirFindsSkill(t *testing.T) {
	dir := ResolveDir("")
	if dir == "" {
		t.Skip("osint-report-skill not found from monorepo root")
	}
	loader := NewLoader(dir)
	if !loader.Available() {
		t.Fatalf("expected skill at %s", dir)
	}
	tpl, err := loader.LoadPrompt(PromptNormalizeMarkdown)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(tpl, "{{markdown}}") {
		t.Fatal("normalize prompt missing markdown placeholder")
	}
}

func TestPipelineRenderWithoutLLM(t *testing.T) {
	dir := ResolveDir("")
	if dir == "" {
		t.Skip("osint-report-skill not found")
	}
	p := NewPipeline(NewLoader(dir), nil)
	out := p.Render(context.Background(), RenderInput{
		Markdown:    "# 测试\n\n## 章节\n\n- 条目一",
		Topic:       "测试主题",
		VisualStyle: "magazine",
	})
	if out.HTML == "" {
		t.Fatal("expected HTML")
	}
	if !strings.Contains(out.HTML, "测试") {
		t.Fatal("HTML should contain report title")
	}
	if out.Normalized {
		t.Fatal("nil ai client should not normalize")
	}
}
