# OhMyPPT Headless Service

将 [oh-my-ppt](../../oh-my-ppt/) 桌面版生成能力封装为**独立 Node.js HTTP 服务**，供 osinttools Go 后端与 Studio 前端调用。

## 架构：直接拷贝，非重写

本服务采用 **copy-based** 策略：从 oh-my-ppt 主进程直接拷贝核心代码，通过 adapter 替换 Electron 依赖，HTTP 层调用与 IPC `generation-handlers` 相同的 `deck-flow` 流水线。

```
services/ohmyppt/
├── resources/              # 自 oh-my-ppt/resources 拷贝（styles、skills、runtime）
├── src/
│   ├── index.ts            # 入口
│   ├── server/               # Hono HTTP 路由与运行时引导
│   │   ├── app.ts
│   │   ├── config.ts
│   │   ├── runtime.ts      # DB / Agent / Skills 初始化
│   │   └── generation-service.ts  # 调用 deck-flow
│   ├── adapters/           # Electron 替换层
│   │   ├── electron-stub.ts
│   │   ├── electron-log-stub.ts
│   │   ├── electron-toolkit-stub.ts
│   │   └── generation-chunk-bus.ts
│   ├── ohmyppt/            # 自 oh-my-ppt/src/main 拷贝
│   │   ├── agent.ts
│   │   ├── db/
│   │   ├── ipc/generation/deck-flow.ts
│   │   ├── ipc/engine/generate.ts
│   │   ├── prompt/
│   │   ├── skills/
│   │   ├── thinking/
│   │   └── tools/
│   └── shared/             # 自 oh-my-ppt/src/shared 拷贝
└── tests/
```

### Server / Client 拆分

| 层 | 状态 | 说明 |
|---|---|---|
| **Server（本包）** | ✅ 已实现 | HTTP API + DeepAgent 生成 + SQLite 会话 |
| **Client（未来）** | ⏳ 待定 | 复用 oh-my-ppt `src/renderer` 预览/编辑 UI，通过 HTTP/SSE 替代 IPC |

### 延后的 Electron 耦合能力

- **Renderer 前端**：会话详情、元素检查器、Thinking 聊天 UI
- **PPTX 导出**：`html-pptx/renderer.ts` 通过 Playwright headless Chromium 截图；**部署后必须安装浏览器**（见下文）
- **系统对话框**：文件选择、字体导入
- **托盘 / 自动更新 / 单实例锁**
- **Thinking 阶段完整 UI**（后端 `thinking/` 代码已拷贝，HTTP 未暴露）

## 快速开始

```bash
cd services/ohmyppt
npm install

# LLM 配置：优先读仓库根目录 /.env 中的 DEEPSEEK_*（与 Go 后端共用）
# DEEPSEEK_API_KEY=sk-...
# DEEPSEEK_BASE_URL=https://api.deepseek.com
# DEEPSEEK_MODEL=deepseek-chat

npm run dev    # 默认 :6130
# npm run build && npm start
npm test
npm run typecheck
```

### Linux 服务器部署（PPTX 导出）

`npm install` 会通过 `postinstall` 下载 Chromium。若仍出现 `browserType.launch: Executable doesn't exist`，在 **ohmyppt 目录**手动执行：

```bash
cd services/ohmyppt
npm run playwright:install
# 或
npx playwright install chromium
```

在 Linux 上若导出报错 `error while loading shared libraries: libatk-bridge-2.0.so.0`（或浏览器启动后立即 closed），说明 **Chromium 已下载但系统库未装**。以 root 在 ohmyppt 目录执行：

```bash
npx playwright install-deps chromium
```

`sudo npx` 若提示找不到命令，用：`sudo env "PATH=$PATH" npx playwright install-deps chromium`

Debian/Ubuntu 也可手动安装（至少包含报错里缺的库）：

```bash
apt-get update && apt-get install -y \
  libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libnss3 libnspr4 libcups2 \
  libdrm2 libgbm1 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libpango-1.0-0 libcairo2 libasound2
```

**Alibaba Cloud Linux 3 / RHEL 8**（`dnf`/`yum` 段错误时，用脚本从镜像装 RPM）：

```bash
cd services/ohmyppt
sudo bash scripts/install-playwright-system-deps-alinux.sh
```

脚本会下载 `at-spi2-atk`、`at-spi2-core`、`mesa-libgbm` 及依赖，执行 `rpm -Uvh` 与 `ldconfig`，并用 `ldd` 校验 Playwright Chromium。

若 `dnf` 正常，也可直接：

```bash
dnf install -y at-spi2-atk at-spi2-core mesa-libgbm libdrm libwayland-server libXtst atk
```

查看还缺哪些库：

```bash
ldd /root/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell | grep "not found"
```

Docker / 镜像已预装浏览器时，可跳过下载：

```bash
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
export PLAYWRIGHT_BROWSERS_PATH=/path/to/browsers   # 可选，指向预装目录
```

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `OHMYPPT_PORT` | `6130` | HTTP 端口 |
| `OHMYPPT_DATA_DIR` | `./data` | SQLite + 项目目录 |
| `OHMYPPT_RESOURCES_ROOT` | `./resources` | 拷贝的内置资源 |
| `OHMYPPT_STYLES_PATH` | `{RESOURCES_ROOT}/styles.json` | 风格目录 |
| `DOTENV_PATH` / `OHMYPPT_ENV_FILE` | 仓库根 `/.env` | 启动时加载的环境文件 |
| `OHMYPPT_API_KEY` | — | LLM Key（fallback：`DEEPSEEK_API_KEY` → `OPENAI_API_KEY`） |
| `OHMYPPT_BASE_URL` | — | API 地址（fallback：`DEEPSEEK_BASE_URL`，自动补 `/v1`） |
| `OHMYPPT_MODEL` | `deepseek-chat` | 模型（fallback：`DEEPSEEK_MODEL`） |

## HTTP API

### `GET /health`

```bash
curl http://127.0.0.1:6130/health
```

### `GET /v1/styles`

返回内置风格列表（来自拷贝的 `resources/styles.json` + SQLite seed）。

### `GET /v1/sessions`

列出最近会话（供前端 Home 页）。

```bash
curl http://127.0.0.1:6130/v1/sessions
```

### `POST /v1/sessions`

创建会话（写入 SQLite + 项目目录）。

```bash
curl -X POST http://127.0.0.1:6130/v1/sessions \
  -H 'Content-Type: application/json' \
  -d '{"topic":"AI 中转站商业分析","style_id":"swiss-grid","page_count":8,"locale":"zh"}'
```

### `POST /v1/sessions/:id/generate`

SSE 流式生成，事件与 oh-my-ppt `GenerateChunkEvent` 对齐（由 `deck-flow` + DeepAgent 产出）。

```bash
curl -N -X POST http://127.0.0.1:6130/v1/sessions/SESSION_ID/generate \
  -H 'Content-Type: application/json' \
  -d '{"user_message":"重点突出竞争格局"}'
```

### `GET /v1/sessions/:id`

会话元数据与页面列表。

### `GET /v1/sessions/:id/pages/:pageId`

单页 HTML。

### `POST /v1/sessions/:id/export`

导出 ZIP（`index.html` + 各页 HTML + assets）。

## 与 osinttools 集成

Go 后端代理（需 `.env` 配置 `OHMYPPT_SERVICE_URL=http://127.0.0.1:6130`）：

- `GET /api/studio/ohmyppt/styles`
- `GET /api/studio/ohmyppt/sessions`
- `POST /api/studio/ohmyppt/sessions`
- `GET /api/studio/ohmyppt/sessions/:id`
- `POST /api/studio/ohmyppt/sessions/:id/generate`（SSE）
- `GET /api/studio/ohmyppt/sessions/:id/pages/:pageId`
- `POST /api/studio/ohmyppt/sessions/:id/export`
- `POST /api/studio/ohmyppt/generate`（一步 create+generate，兼容旧客户端）

## Adapter 说明

| Electron API | Headless 替换 |
|---|---|
| `electron.app.getPath('userData')` | `OHMYPPT_DATA_DIR` |
| `BrowserWindow` | Playwright Chromium（需 `npm run playwright:install`） |
| `ipcMain.handle` | 不注册；HTTP 直接调 `resolveDeckContext` + `executeDeckGeneration` |
| `electron-log` | console 输出 |
| `@electron-toolkit/utils.is.dev` | 恒为 `true`，资源从 `cwd/resources` 读取 |

## 数据目录

```
data/
├── ohmyppt.db              # SQLite（Drizzle，与桌面版 schema 一致）
└── projects/{sessionId}/   # 页面 HTML、assets、index.html
```

## 许可证

MIT（与 oh-my-ppt 兼容）
