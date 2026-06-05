# 品牌 Theme Presets

写入 `meta.theme`，色值为 6 位 HEX（无 #）。`preset` 字段与 key 一致。

| key | 场景 | primary | accent | bg_dark | bg_light |
|-----|------|---------|--------|---------|----------|
| midnight-exec | 投资/商务 | 1E2761 | F96167 | 1E2761 | F5F7FA |
| tech-dark | 科技/开发者 | 0D1117 | 3FB950 | 0D1117 | F6F8FA |
| coral-energy | 路演/活动 | F96167 | 2F3C7E | 2F3C7E | FFFAF0 |
| forest-calm | ESG/医疗 | 2C5F2D | 40916C | 1B4332 | F1FAEE |
| teal-trust | 金融/信任 | 028090 | F4A261 | 023047 | F8F9FA |
| minimal-white | 学术/极简 | 333333 | 007AFF | 1C1C1E | FFFFFF |

完整对象见 `scripts/theme-presets.json`（含 secondary、text_dark、font_*）。

根据 outline.theme 原样复制到 schema.meta.theme，不要换色。
