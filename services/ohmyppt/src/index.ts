import { serve } from '@hono/node-server'
import { bootstrapOhMyPptRuntime } from './server/bootstrap.js'
import { loadConfig } from './server/config.js'
import { createApp } from './server/app.js'
import { loadRootEnv } from './server/load-env.js'

const envFile = loadRootEnv()
bootstrapOhMyPptRuntime()
const cfg = loadConfig()
const app = createApp(cfg)

console.log(`[ohmyppt] starting on :${cfg.port}`)
console.log(`[ohmyppt] data dir: ${cfg.dataDir}`)
console.log(`[ohmyppt] resources: ${cfg.resourcesRoot}`)
console.log(`[ohmyppt] env file: ${envFile ?? '(none)'}`)
console.log(`[ohmyppt] model: ${cfg.defaultModel.model} @ ${cfg.defaultModel.baseUrl}`)
console.log(`[ohmyppt] cwd: ${process.cwd()}`)

serve({ fetch: app.fetch, port: cfg.port })
