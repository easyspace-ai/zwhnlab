import { describe, expect, it } from 'vitest'
import { bootstrapOhMyPptRuntime } from '../src/server/bootstrap.js'
import { loadConfig } from '../src/server/config.js'
import { createApp } from '../src/server/app.js'

describe('ohmyppt service', () => {
  it('health endpoint returns ok', async () => {
    bootstrapOhMyPptRuntime()
    process.env.OHMYPPT_DATA_DIR = '/tmp/ohmyppt-test-data'
    const cfg = loadConfig()
    const app = createApp(cfg)
    const res = await app.request('/health')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
    expect(body.service).toBe('ohmyppt')
    expect(body.architecture).toBe('copy-based')
  })
})
