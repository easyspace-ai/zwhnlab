package render

import (
	"fmt"
	"html"
	"strings"
)

// BuildFactCheckReportHTML renders W6 markdown into a single-page editorial HTML document.
// Content is not summarized or rewritten — only structure, typography, and section styling.
func BuildFactCheckReportHTML(markdown string, meta ReportMeta) string {
	markdown = strings.TrimSpace(markdown)
	if meta.Title == "" {
		meta.Title = "事实核查报告"
	}
	theme := ResolveVisualTheme(meta.VisualStyle, markdown)

	bodyHTML := MarkdownToHTMLSafe(markdown)
	entries, bodyHTML := extractTOC(bodyHTML)
	sectionsHTML := enrichSections(bodyHTML)
	tocHTML := buildTOCNav(entries)

	topicLine := ""
	if meta.Topic != "" && meta.Topic != meta.Title {
		topicLine = fmt.Sprintf(`<p class="report-hero__topic">核查对象 · %s</p>`, html.EscapeString(meta.Topic))
	}

	dateLine := ""
	if !meta.Generated.IsZero() {
		dateLine = fmt.Sprintf(`<time class="report-hero__date" datetime="%s">生成于 %s</time>`,
			meta.Generated.Format("2006-01-02T15:04:05"),
			meta.Generated.Format("2006年1月2日 15:04"),
		)
	}

	return fmt.Sprintf(`<!DOCTYPE html>
<html lang="zh-CN" data-theme="%s">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>%s</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&amp;family=Noto+Sans+SC:wght@400;500;700&amp;family=Noto+Serif+SC:wght@500;600;700;900&amp;family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&amp;display=swap" rel="stylesheet"/>
<style>%s</style>
</head>
<body class="report-doc">
<div class="report-bg" aria-hidden="true"></div>
<div class="report-layout">
  <aside class="report-sidebar">%s</aside>
  <main class="report-main">
    <header class="report-hero">
      <div class="report-hero__chrome">
        <span class="report-hero__tag">OSINT · Fact Check</span>
        %s
      </div>
      <h1 class="report-hero__title">%s</h1>
      %s
      <p class="report-hero__note">以下内容与 W6 调研 Markdown 原文一致，仅做排版与阅读结构优化。</p>
    </header>
    <article class="report-body">%s</article>
    <footer class="report-foot">
      <span>事实核查报告 · 单页阅读版</span>
      <span>排版参考电子杂志编辑风格</span>
    </footer>
  </main>
</div>
</body>
</html>`,
		html.EscapeString(theme),
		html.EscapeString(meta.Title),
		reportCSS(),
		tocHTML,
		dateLine,
		html.EscapeString(meta.Title),
		topicLine,
		sectionsHTML,
	)
}

// BuildFactCheckReportFromMarkdown builds with inferred metadata.
func BuildFactCheckReportFromMarkdown(markdown, topic string) string {
	return BuildFactCheckReportHTML(markdown, MetaFromMarkdown(markdown, topic))
}

func reportCSS() string {
	return `
:root {
  --ink: #0a0a0b;
  --ink-rgb: 10, 10, 11;
  --paper: #f1efea;
  --paper-rgb: 241, 239, 234;
  --paper-tint: #e8e5de;
  --accent: #0f4c5c;
  --accent-soft: rgba(15, 76, 92, 0.12);
  --verdict: #9a3412;
  --verdict-bg: #fff7ed;
  --evidence: #1e3a5f;
  --evidence-bg: #f0f7ff;
  --caveat: #7c2d12;
  --caveat-bg: #fef2f2;
  --action: #14532d;
  --action-bg: #ecfdf5;
  --mono: "IBM Plex Mono", ui-monospace, monospace;
  --serif: "Noto Serif SC", "Source Serif 4", Georgia, serif;
  --sans: "Noto Sans SC", system-ui, sans-serif;
  --max: 52rem;
  --sidebar: 13.5rem;
}
html[data-theme="swiss"] {
  --paper: #f7f7f5;
  --accent: #002fa7;
  --accent-soft: rgba(0, 47, 167, 0.1);
}
* { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; }
body.report-doc {
  font-family: var(--sans);
  color: var(--ink);
  background: var(--paper);
  line-height: 1.72;
  -webkit-font-smoothing: antialiased;
}
.report-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 80% 50% at 10% 0%, rgba(15, 76, 92, 0.08), transparent 55%),
    radial-gradient(ellipse 60% 40% at 90% 100%, rgba(154, 52, 18, 0.06), transparent 50%),
    linear-gradient(180deg, var(--paper) 0%, var(--paper-tint) 100%);
}
html[data-theme="swiss"] .report-bg {
  background:
    linear-gradient(90deg, transparent 49.5%, rgba(var(--ink-rgb), 0.04) 49.5%, rgba(var(--ink-rgb), 0.04) 50.5%, transparent 50.5%),
    linear-gradient(0deg, transparent 49.5%, rgba(var(--ink-rgb), 0.04) 49.5%, rgba(var(--ink-rgb), 0.04) 50.5%, transparent 50.5%),
    var(--paper);
  background-size: 24px 24px, 24px 24px, auto;
}
.report-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: var(--sidebar) minmax(0, 1fr);
  gap: 0;
  max-width: calc(var(--max) + var(--sidebar) + 4rem);
  margin: 0 auto;
  min-height: 100vh;
}
.report-sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  max-height: 100vh;
  overflow-y: auto;
  padding: 2rem 1rem 2rem 1.5rem;
  border-right: 1px solid rgba(var(--ink-rgb), 0.08);
}
.report-toc__label {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 0.75rem;
}
.report-toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.report-toc__item { margin-bottom: 0.35rem; }
.report-toc__item--sub { padding-left: 0.75rem; opacity: 0.85; }
.report-toc__item a {
  font-size: 0.78rem;
  color: var(--ink);
  text-decoration: none;
  line-height: 1.4;
  display: block;
  padding: 0.2rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition: border-color 0.15s, opacity 0.15s;
}
.report-toc__item a:hover {
  border-left-color: var(--accent);
  opacity: 0.9;
}
.report-main {
  padding: 2.5rem clamp(1.25rem, 4vw, 3rem) 4rem;
  max-width: calc(var(--max) + 2rem);
}
.report-hero {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(var(--ink-rgb), 0.12);
}
.report-hero__chrome {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-bottom: 1.25rem;
}
.report-hero__tag {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 0.35rem 0.65rem;
  border: 1px solid rgba(var(--ink-rgb), 0.25);
}
.report-hero__date {
  font-family: var(--mono);
  font-size: 0.7rem;
  opacity: 0.6;
}
.report-hero__title {
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 2.65rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.report-hero__topic {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  opacity: 0.75;
}
.report-hero__note {
  margin-top: 1rem;
  font-size: 0.78rem;
  color: rgba(var(--ink-rgb), 0.55);
  font-family: var(--mono);
}
.report-body { animation: reportIn 0.7s ease; }
@keyframes reportIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.report-section {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
}
.report-section__inner {
  padding: 1.5rem clamp(1rem, 3vw, 2rem);
}
.report-section--lead .report-section__inner {
  padding-top: 0;
  font-size: 1.05rem;
  opacity: 0.92;
}
.report-section--verdict {
  background: var(--verdict-bg);
  border: 1px solid rgba(154, 52, 18, 0.2);
  box-shadow: 0 12px 40px rgba(154, 52, 18, 0.06);
}
.report-section--verdict h2 {
  color: var(--verdict);
}
.report-section--evidence {
  background: var(--evidence-bg);
  border-left: 4px solid var(--evidence);
}
.report-section--summary {
  background: rgba(var(--ink-rgb), 0.03);
  border: 1px dashed rgba(var(--ink-rgb), 0.15);
}
.report-section--timeline {
  border-left: 3px solid var(--accent);
  background: var(--accent-soft);
}
.report-section--action {
  background: var(--action-bg);
  border: 1px solid rgba(20, 83, 45, 0.15);
}
.report-section--caveat {
  background: var(--caveat-bg);
  border: 1px solid rgba(124, 45, 18, 0.18);
}
.report-section--data table {
  font-variant-numeric: tabular-nums;
}
.report-section--default .report-section__inner {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.report-body h1 {
  font-family: var(--serif);
  font-size: 1.85rem;
  margin: 0 0 1rem;
  display: none;
}
.report-body h2 {
  font-family: var(--serif);
  font-size: 1.45rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.25;
  scroll-margin-top: 1.5rem;
}
.report-body h3 {
  font-family: var(--serif);
  font-size: 1.15rem;
  margin: 1.25rem 0 0.6rem;
  scroll-margin-top: 1.5rem;
}
.report-body h4, .report-body h5, .report-body h6 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
}
.report-body p {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.75;
}
.report-body ul, .report-body ol {
  margin: 0 0 1.25rem;
  padding-left: 1.35rem;
}
.report-body li { margin-bottom: 0.4rem; }
.report-body li::marker { color: var(--accent); }
.report-body blockquote {
  margin: 1.25rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--accent);
  background: rgba(var(--ink-rgb), 0.04);
  font-family: var(--serif);
  font-size: 1.02rem;
  line-height: 1.6;
}
.report-body blockquote p:last-child { margin-bottom: 0; }
.report-body strong { font-weight: 700; }
.report-body em { font-style: italic; }
.report-body code {
  font-family: var(--mono);
  font-size: 0.88em;
  background: rgba(var(--ink-rgb), 0.06);
  padding: 0.12em 0.35em;
  border-radius: 4px;
}
.report-body pre {
  margin: 1rem 0;
  padding: 1rem;
  overflow-x: auto;
  background: rgba(var(--ink-rgb), 0.06);
  border-radius: 8px;
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.5;
}
.report-body pre code { background: none; padding: 0; }
.report-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.25rem 0;
  font-size: 0.92rem;
}
.report-body th, .report-body td {
  border: 1px solid rgba(var(--ink-rgb), 0.12);
  padding: 0.55rem 0.75rem;
  text-align: left;
}
.report-body th {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(var(--ink-rgb), 0.05);
}
.report-body hr {
  border: none;
  height: 1px;
  background: rgba(var(--ink-rgb), 0.12);
  margin: 2rem 0;
}
.report-body a {
  color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.report-body .footnote-ref {
  line-height: 0;
}
.report-body .footnote-ref .cite-link {
  font-family: var(--mono);
  font-size: 0.72em;
  font-weight: 500;
  text-decoration: none;
  color: var(--accent);
  opacity: 0.85;
  transition: opacity 0.15s;
}
.report-body .footnote-ref .cite-link:hover {
  opacity: 1;
  text-decoration: underline;
}
.report-references {
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(var(--ink-rgb), 0.14);
  scroll-margin-top: 1.5rem;
}
.report-references h2 {
  font-family: var(--serif);
  font-size: 1.25rem;
  margin: 0 0 1rem;
}
.footnote-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footnote-item {
  margin: 0 0 0.85rem;
  padding-left: 0;
  font-size: 0.92rem;
  line-height: 1.65;
  scroll-margin-top: 1.5rem;
}
.footnote-item p {
  display: inline;
  margin: 0;
}
.footnote-label {
  font-family: var(--mono);
  font-size: 0.82em;
  font-weight: 500;
  color: rgba(var(--ink-rgb), 0.65);
  margin-right: 0.35rem;
}
.report-body img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}
.report-foot {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(var(--ink-rgb), 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.5;
}
@media (max-width: 900px) {
  .report-layout { grid-template-columns: 1fr; }
  .report-sidebar {
    position: relative;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid rgba(var(--ink-rgb), 0.08);
    padding: 1rem 1.25rem;
  }
  .report-toc__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.75rem;
  }
  .report-toc__item--sub { padding-left: 0; }
  .report-toc__item a {
    font-size: 0.72rem;
    border: 1px solid rgba(var(--ink-rgb), 0.12);
    border-radius: 99px;
    padding: 0.25rem 0.65rem;
    border-left-width: 1px;
  }
}
`
}
