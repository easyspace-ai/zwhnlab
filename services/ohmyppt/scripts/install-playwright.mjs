#!/usr/bin/env node
/**
 * Install Playwright Chromium for headless PPTX export.
 * Skipped when PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 (e.g. pre-baked Docker image).
 */
import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

if (process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD === '1') {
  console.log('[ohmyppt] PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 — skip Chromium download')
  process.exit(0)
}

console.log('[ohmyppt] Installing Playwright Chromium (required for PPTX export)…')
try {
  execSync('npx playwright install chromium', {
    cwd: root,
    stdio: 'inherit',
    env: process.env
  })
  if (process.platform === 'linux' && process.env.OHMYPPT_SKIP_PLAYWRIGHT_DEPS !== '1') {
    console.log('[ohmyppt] Installing Linux system dependencies for Chromium…')
    try {
      execSync('npx playwright install-deps chromium', {
        cwd: root,
        stdio: 'inherit',
        env: process.env
      })
    } catch {
      console.warn(
        '[ohmyppt] install-deps failed (may need root). If export crashes, run as root:\n' +
          '  npx playwright install-deps chromium'
      )
    }
  }
} catch (err) {
  console.error(
    '[ohmyppt] Failed to install Playwright Chromium. PPTX export will not work until you run:\n' +
      '  cd services/ohmyppt && npm run playwright:install'
  )
  process.exit(typeof err.status === 'number' ? err.status : 1)
}
