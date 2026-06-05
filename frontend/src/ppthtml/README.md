# HTML PPT (ppthtml)

Guizang 横向翻页网页演示：主题/MD 输入 → LLM 生成 slide HTML → 注入 guizang 模板 → 预览 → 导出 HTML 或图片型 PPTX。

## 前置

1. **DeepSeek API**：后端 `DEEPSEEK_API_KEY`（与 Studio 相同）
2. **Guizang Skill 模板**：安装 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)，或设置环境变量：
   ```bash
   export GUIZANG_SKILL_DIR=$HOME/.claude/skills/guizang-ppt-skill
   ```
3. **PPTX 导出服务**（Playwright 截图）：
   ```bash
   cd frontend && pnpm run postinstall:ppthtml-export
   pnpm run dev:ppthtml-export   # 默认 :6125
   ```

## 开发

```bash
# 终端 1：后端
cd backend && go run ./cmd/server

# 终端 2：前端 + 导出服务
cd frontend && pnpm run dev:ppthtml
```

浏览器打开主应用 → 侧边栏 **HTML PPT** → 输入主题或上传 `.md` → 选择杂志风/瑞士风 → 生成 → 预览 iframe → 导出 HTML / PPT（图片）。

## API

- `POST /api/ppthtml/projects` — 创建项目
- `POST /api/ppthtml/projects/:id/pipeline/run` — SSE 生成
- `POST /api/ppthtml/export/download` — `{ html, filename }` → PPTX（需 export 服务）
