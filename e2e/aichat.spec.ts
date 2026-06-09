import { test, expect } from '@playwright/test'

/**
 * AIChat smoke E2E — requires dev server + backend with test credentials.
 * Set E2E_BASE_URL (default http://localhost:8123) and E2E_TOKEN if needed.
 */
const BASE = process.env.E2E_BASE_URL || 'http://localhost:8123'

test.describe('AIChat module', () => {
  test.skip(!process.env.E2E_TOKEN, 'Set E2E_TOKEN to run authenticated aichat E2E')

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((token) => {
      localStorage.setItem('osint_access_token', token as string)
    }, process.env.E2E_TOKEN)
  })

  test('loads /aichat and shows composer', async ({ page }) => {
    await page.goto(`${BASE}/aichat`)
    await expect(page.getByPlaceholder(/@w6|深度调研/)).toBeVisible({ timeout: 15000 })
  })

  test('sidebar has new session button', async ({ page }) => {
    await page.goto(`${BASE}/aichat`)
    await expect(page.getByRole('button', { name: /新会话/ })).toBeVisible({ timeout: 15000 })
  })
})
