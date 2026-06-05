# Outline Schema（阶段 1）

只输出 ```json 代码块。

```json
{
  "title": "演示标题",
  "subtitle": "一句副标题",
  "theme": "midnight-exec",
  "audience": "投资/业务/技术",
  "slides": [
    {
      "id": "s01",
      "intent": "title",
      "layout_preset": "cover_hero",
      "title": "封面主标题",
      "subtitle": "副标题",
      "footer": "2026 Q1 · 内部调研"
    },
    {
      "id": "s02",
      "intent": "agenda",
      "layout_preset": "bullets_dense",
      "title": "议程",
      "bullets": ["要点一", "要点二", "要点三"],
      "footer": "概览"
    },
    {
      "id": "s05",
      "intent": "metrics",
      "layout_preset": "stat_row",
      "title": "关键数字",
      "stats": [{ "value": "92+", "label": "同类产品" }],
      "footer": "市场 · 02"
    }
  ]
}
```

## 字段

| 字段 | 说明 |
|------|------|
| `theme` | 见 brand-themes.md：`midnight-exec` `tech-dark` `coral-energy` `forest-calm` `teal-trust` `minimal-white` |
| `layout_preset` | **必填**，见 narrative-rhythm.md |
| `intent` | 叙事意图，驱动文案语气 |
| `bullets` | 2–8 条 |
| `stats` | `{value, label}[]`，1–3 个 |
| `cards` | `{title, body}[]`，2–3 个 |
| `chart` | `{chartType, data:[{name, values[]}]} ` |
| `columns` | `[{header, items[]}]`，2–3 列 |
| `items` | timeline：`{date, title, description?}[]` |
| `quote` | 金句正文 |
| `headline` | split_insight / closing 主句 |

## 页数

- 短主题：8–10 页
- 长报告：12–16 页，每章前加 `section_break`
