import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as dotenvConfig } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function resolveRepoRoot(): string {
  return path.resolve(__dirname, '../../../..')
}

function resolveEnvFilePath(): string | null {
  const explicit =
    process.env.OHMYPPT_ENV_FILE?.trim() ||
    process.env.DOTENV_PATH?.trim()
  if (explicit) {
    return path.resolve(explicit)
  }
  const repoRoot = resolveRepoRoot()
  const candidates = [
    path.join(repoRoot, '.env'),
    path.join(repoRoot, 'backend', '.env')
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

/** Load repo root .env without overriding existing process.env (CI/container wins). */
export function loadRootEnv(): string | null {
  const envPath = resolveEnvFilePath()
  if (!envPath) return null
  dotenvConfig({ path: envPath, override: false })
  return envPath
}

export function normalizeOpenAiBaseUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, '')
  if (!trimmed) return 'https://api.deepseek.com/v1'
  if (trimmed.endsWith('/v1')) return trimmed
  return `${trimmed}/v1`
}
