# Slide Schema（阶段 2 · Preset 模式）

**禁止** 手写 `elements[]` 坐标（除非单页特殊装饰）。使用 `layout_preset` + `slots`。

## 顶层

```json
{
  "meta": {
    "title": "…",
    "author": "OSINT Tools",
    "language": "zh",
    "layout": "LAYOUT_16x9",
    "theme": { "preset": "midnight-exec", "primary": "1E2761", … }
  },
  "slides": []
}
```

`meta.theme` 必须从 outline 的 `theme` 复制完整色板（见 brand-themes.md）。

## 单页（标准）

```json
{
  "layout_preset": "three_col_cards",
  "bg_color": "F5F7FA",
  "slots": {
    "title": "三层障碍",
    "cards": [
      { "title": "电信许可", "body": "…" },
      { "title": "AI 备案", "body": "…" },
      { "title": "数据出境", "body": "…" }
    ],
    "footer": "合规 · 03"
  },
  "notes": "讲者备注"
}
```

## Preset 与 slots 对照

| layout_preset | slots 键 |
|---------------|----------|
| cover_hero | title, subtitle?, footer? |
| section_break | title, subtitle? |
| bullets_dense | title, bullets[], footer? |
| three_col_cards | title, cards[], footer? |
| stat_row | title?, stats[], footer? |
| chart_sidebar | title, chart, stats?, footer? |
| comparison_table | title, columns[], highlight_column?, footer? |
| split_insight | kicker?, headline, bullets[], footer? |
| quote_hero | quote, attribution?, footer? |
| timeline_horizontal | title, items[], footer? |
| closing_cta | headline, contact?, cta? |

## bg_color 规则

- 浅色内容页：`meta.theme.bg_light`（6 位 HEX，无 #）
- `section_break` / `closing_cta`：可省略 bg_color（渲染器用 bg_dark）
- 每 3–4 页至少 1 页深色（section / closing）

## chart 数据形状

```json
"chart": {
  "chartType": "BAR",
  "data": [
    { "name": "2024", "labels": ["Q1","Q2","Q3","Q4"], "values": [12, 19, 8, 22] }
  ]
}
```

## 禁止

- icon / icon_group
- HTML
- 连续同 preset（见 narrative-rhythm.md）
