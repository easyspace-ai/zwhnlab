import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeOpenAiBaseUrl } from './load-env.js'
import { resolveResourcesRoot, resolveStylesPath } from './paths.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function resolveDefaultDataDir(): string {
  return path.resolve(__dirname, '../../data')
}

export interface ServiceConfig {
  port: number
  dataDir: string
  stylesPath: string
  resourcesRoot: string
  defaultModel: {
    provider: string
    baseUrl: string
    model: string
    apiKey: string
    maxTokens: number
  }
}

export function loadConfig(): ServiceConfig {
  const port = parseInt(process.env.OHMYPPT_PORT || '8130', 10)
  const dataDir = path.resolve(process.env.OHMYPPT_DATA_DIR || resolveDefaultDataDir())
  const resourcesRoot = path.resolve(
    process.env.OHMYPPT_RESOURCES_ROOT || resolveResourcesRoot()
  )
  const stylesPath = path.resolve(process.env.OHMYPPT_STYLES_PATH || resolveStylesPath())

  return {
    port: Number.isFinite(port) ? port : 8130,
    dataDir,
    stylesPath,
    resourcesRoot,
    defaultModel: {
      provider: process.env.OHMYPPT_PROVIDER || 'openai',
      baseUrl: normalizeOpenAiBaseUrl(
        process.env.OHMYPPT_BASE_URL ||
          process.env.DEEPSEEK_BASE_URL ||
          process.env.OPENAI_BASE_URL ||
          'https://api.deepseek.com/v1'
      ),
      model:
        process.env.OHMYPPT_MODEL ||
        process.env.DEEPSEEK_MODEL ||
        process.env.OPENAI_MODEL ||
        'deepseek-chat',
      apiKey:
        process.env.OHMYPPT_API_KEY ||
        process.env.DEEPSEEK_API_KEY ||
        process.env.OPENAI_API_KEY ||
        '',
      maxTokens: parseInt(process.env.OHMYPPT_MAX_TOKENS || '8192', 10)
    }
  }
}
