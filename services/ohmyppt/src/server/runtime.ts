import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import log from 'electron-log/main.js'
import { BrowserWindow } from '../adapters/electron-stub.js'
import { AgentManager } from '../ohmyppt/agent.js'
import { PPTDatabase } from '../ohmyppt/db/database.js'
import { createIpcContext, type IpcContext } from '../ohmyppt/ipc/context.js'
import {
  initializeSkills,
  resolveBuiltinSkillsSourcePath,
  resolveInstalledSkillsPath,
  setSkillsRuntime
} from '../ohmyppt/skills/index.js'
import { setStyleDb } from '../ohmyppt/utils/style-skills.js'
import type { ServiceConfig } from './config.js'

export type OhMyPptRuntime = {
  db: PPTDatabase
  agentManager: AgentManager
  ipc: IpcContext
}

let runtimePromise: Promise<OhMyPptRuntime> | null = null

async function seedDefaultModel(db: PPTDatabase, cfg: ServiceConfig): Promise<void> {
  const active = await db.getActiveModelConfig()
  if (active?.apiKey?.trim()) return

  const { provider, model, baseUrl, apiKey, maxTokens } = cfg.defaultModel
  if (!apiKey.trim()) return

  await db.upsertModelConfig({
    id: 'default',
    name: 'HTTP default',
    provider,
    model,
    apiKey,
    baseUrl,
    maxTokens,
    active: true
  })
}

export async function getOhMyPptRuntime(cfg: ServiceConfig): Promise<OhMyPptRuntime> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      const dbPath = path.join(cfg.dataDir, 'ohmyppt.db')
      const storagePath = path.join(cfg.dataDir, 'projects')

      const db = new PPTDatabase(dbPath)
      await db.init()
      await db.setStoragePath(storagePath)
      await db.setSetting('locale', 'zh')
      await seedDefaultModel(db, cfg)
      setStyleDb(db)

      const installedSkillsPath = resolveInstalledSkillsPath()
      const skillsReadyPromise = initializeSkills({
        builtinSourcePath: resolveBuiltinSkillsSourcePath(),
        installedRootPath: installedSkillsPath,
        logger: log
      }).catch((error) => {
        log.warn('[skills] initialize failed', {
          message: error instanceof Error ? error.message : String(error)
        })
        return null
      })
      setSkillsRuntime({ installedSkillsPath, ready: skillsReadyPromise })

      const agentManager = new AgentManager(db)
      const stubWindow = new BrowserWindow()
      const ipc = createIpcContext(stubWindow, db, agentManager)

      log.info('[runtime] oh-my-ppt headless runtime ready', {
        dbPath,
        storagePath,
        resourcesRoot: cfg.resourcesRoot
      })

      return { db, agentManager, ipc }
    })()
  }
  return runtimePromise
}

export async function upsertRequestModel(
  db: PPTDatabase,
  ipc: IpcContext,
  defaults: ServiceConfig['defaultModel'],
  override?: {
    provider?: string
    api_key?: string
    base_url?: string
    model?: string
    max_tokens?: number
  }
): Promise<void> {
  const provider = override?.provider?.trim() || defaults.provider
  const model = override?.model?.trim() || defaults.model
  const baseUrl = override?.base_url?.trim() || defaults.baseUrl
  const apiKey = override?.api_key?.trim() || defaults.apiKey
  const maxTokens = override?.max_tokens || defaults.maxTokens

  if (!apiKey.trim()) {
    throw new Error(`当前 provider "${provider}" 缺少 API Key`)
  }

  await db.upsertModelConfig({
    id: 'http-request',
    name: 'HTTP request',
    provider,
    model,
    apiKey: ipc.encryptApiKey(apiKey),
    baseUrl,
    maxTokens,
    active: true
  })
}

export async function createOhMyPptSession(args: {
  cfg: ServiceConfig
  runtime: OhMyPptRuntime
  topic: string
  styleId?: string
  pageCount?: number
  locale?: 'zh' | 'en'
  userId?: string
  model?: {
    provider?: string
    api_key?: string
    base_url?: string
    model?: string
    max_tokens?: number
  }
}): Promise<{ sessionId: string }> {
  const { cfg, runtime, topic, styleId, pageCount, locale, model, userId } = args
  const { db, agentManager, ipc } = runtime

  await upsertRequestModel(db, ipc, cfg.defaultModel, model)
  if (locale) {
    await db.setSetting('locale', locale)
  }

  const active = await db.getActiveModelConfig()
  if (!active) {
    throw new Error('缺少可用模型配置，请设置 OHMYPPT_API_KEY 或在请求体传入 model.api_key')
  }

  const storagePath = await ipc.resolveStoragePath()
  const sessionId = crypto.randomUUID()
  const projectDir = path.join(storagePath, sessionId)
  await fs.mkdir(projectDir, { recursive: true })
  await ipc.ensureSessionAssets(projectDir)

  await agentManager.createSession({
    sessionId,
    provider: active.provider,
    model: active.model,
    baseUrl: active.baseUrl,
    projectDir,
    topic,
    styleId: styleId?.trim() || 'swiss-grid',
    pageCount: pageCount ?? 8,
    userId
  })

  await db.createProject({
    session_id: sessionId,
    title: topic,
    output_path: projectDir,
    root_path: projectDir
  })

  return { sessionId }
}
