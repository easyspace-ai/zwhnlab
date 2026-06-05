# PptxGenJS Studio — 阶段 2：Slide Schema

根据 **outline** 生成最终 Schema。渲染器用 `layout-presets.json` 展开坐标，你**只填 slots**。

## 必读 Skill（已附在下方）

- `slide-schema-presets.md` — 主契约
- `narrative-rhythm.md` — 保持 outline 的 preset 序列
- `brand-themes.md` + `design-system.md`
- `qa-guide.md`

## 输出

**仅**一个 ```json 代码块。

```json
{
  "meta": { "title": "…", "theme": { "preset": "midnight-exec", "primary": "…", … } },
  "slides": [
    {
      "layout_preset": "three_col_cards",
      "bg_color": "F5F7FA",
      "slots": { "title": "…", "cards": [{ "title": "…", "body": "…" }], "footer": "章节 · 02" },
      "notes": ""
    }
  ]
}
```

## 铁律

1. **≥90% 页面** 使用 `layout_preset` + `slots`，禁止 `elements[]`
2. `meta.theme` 从 outline.theme 复制 **完整** 色板（见 brand-themes）
3. `bg_color` 用 theme 的 `bg_light` 或省略（section/closing 用深色 preset）
4. 禁止 icon；禁止 HTML
5. 与 outline 页数、preset 顺序一致，只优化文案与 slots 内容

## slots 速查

| preset | 必填 slots |
|--------|------------|
| cover_hero | title, subtitle? |
| section_break | title |
| bullets_dense | title, bullets[] |
| three_col_cards | title, cards[] |
| stat_row | stats[] |
| chart_sidebar | title, chart |
| comparison_table | title, columns[] |
| split_insight | headline, bullets[] |
| quote_hero | quote |
| timeline_horizontal | title, items[] |
| closing_cta | headline |
