package render

import (
	"strings"
	"testing"
)

func TestBuildFactCheckReportHTML_quoteEntities(t *testing.T) {
	cases := []struct {
		name string
		md   string
	}{
		{
			name: "plain quotes",
			md: `## 概述

### 1.1 从"稳定中的远程"到"流动中的稳定"

正文。`,
		},
		{
			name: "single-encoded entities",
			md: `## 概述

### 1.1 从&quot;稳定中的远程&quot;到&quot;流动中的稳定&quot;

正文。`,
		},
		{
			name: "double-encoded entities",
			md: `## 概述

### 1.1 从&amp;quot;稳定中的远程&amp;quot;到&amp;quot;流动中的稳定&amp;quot;

正文。`,
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			html := BuildFactCheckReportHTML(tc.md, ReportMeta{Title: "测试"})
			if strings.Contains(html, "&amp;quot;") {
				t.Fatalf("double-encoded quotes in report HTML: %s", html)
			}
			if !strings.Contains(html, "稳定中的远程") {
				t.Fatalf("missing heading text: %s", html)
			}
		})
	}
}
