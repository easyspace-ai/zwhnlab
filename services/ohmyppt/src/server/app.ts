import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import fs from 'node:fs/promises'
import { z } from 'zod'
import type { ServiceConfig } from './config.js'
import { listStyles } from './styles.js'
import { getStyleDetail } from '../ohmyppt/utils/style-skills.js'
import { exportProjectZip } from './export.js'
import { buildPptxContentDisposition, buildZipContentDisposition } from './export-headers.js'
import { exportSessionToPptx } from './export-pptx.js'
import { exportGuizangHtmlToPptx } from './export-guizang-pptx.js'
import {
  createOhMyPptSession,
  getOhMyPptRuntime,
  type OhMyPptRuntime
} from './runtime.js'
import { GenerationService } from './generation-service.js'
import type { GenerateChunkEvent } from '@shared/generation'
import { subscribeGenerationChunks } from '../adapters/generation-chunk-bus.js'
import { normalizeMessage } from '../ohmyppt/ipc/utils.js'
import type { SessionRunState } from '../ohmyppt/ipc/context.js'
import {
  accessDeniedResponse,
  requireUserId,
  sessionAccess
} from './auth.js'

const createSessionSchema = z.object({
  topic: z.string().min(1),
  style_id: z.string().optional(),
  page_count: z.number().int().min(1).max(50).optional(),
  locale: z.enum(['zh', 'en']).optional(),
  user_message: z.string().optional(),
  model: z
    .object({
      provider: z.string().optional(),
      api_key: z.string().optional(),
      base_url: z.string().optional(),
      model: z.string().optional(),
      max_tokens: z.number().int().optional()
    })
    .optional()
})

const generateSchema = z.object({
  user_message: z.string().optional(),
  model: z
    .object({
      provider: z.string().optional(),
      api_key: z.string().optional(),
      base_url: z.string().optional(),
      model: z.string().optional(),
      max_tokens: z.number().int().optional()
    })
    .optional()
})

const exportSchema = z.object({
  format: z.enum(['zip', 'pptx']).default('zip'),
  image_only: z.boolean().optional(),
  embed_fonts: z.enum(['auto', 'always', 'never']).optional()
})

const guizangExportSchema = z.object({
  html: z.string().min(1),
  title: z.string().optional(),
  image_only: z.boolean().optional()
})

const updateSessionSchema = z.object({
  title: z.string().trim().min(1).max(120)
})

function resolveStyleSummary(styleId: string | null | undefined): {
  styleId: string | null
  styleLabel: string | null
  styleCategory: string | null
} {
  if (!styleId?.trim()) {
    return { styleId: null, styleLabel: null, styleCategory: null }
  }
  try {
    const detail = getStyleDetail(styleId.trim())
    return {
      styleId: detail.id,
      styleLabel: detail.label,
      styleCategory: detail.category || null
    }
  } catch {
    return { styleId: styleId.trim(), styleLabel: styleId.trim(), styleCategory: null }
  }
}

function mapSessionSummaryRow(
  row: {
    id: string
    title: string
    status: string
    styleId?: string | null
    created_at?: number
    updated_at?: number
    createdAt?: number
    updatedAt?: number
  },
  pageCount: number
) {
  const style = resolveStyleSummary(row.styleId)
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    createdAt: row.createdAt ?? row.created_at ?? 0,
    updatedAt: row.updatedAt ?? row.updated_at ?? 0,
    pageCount,
    ...style
  }
}

async function buildSessionDetail(runtime: OhMyPptRuntime, sessionId: string) {
  const snapshot = await runtime.ipc.buildSessionGenerationSnapshot(
    (await runtime.db.getSession(sessionId)) as unknown as Record<string, unknown> | undefined,
    { includeHtml: false }
  )
  if (!snapshot.session) return null
  return snapshot
}

async function loadOwnedSession(
  runtime: OhMyPptRuntime,
  sessionId: string,
  userId: string
) {
  const session = await runtime.db.getSession(sessionId)
  const access = sessionAccess(session, userId)
  if (access !== 'ok') {
    return { session: null, access: access as 'missing' | 'forbidden' }
  }
  return { session, access: 'ok' as const }
}

function mapActiveRun(state: SessionRunState | undefined) {
  if (!state) return null
  return {
    runId: state.runId,
    status: state.status,
    progress: state.progress,
    totalPages: state.totalPages,
    mode: state.mode,
    error: state.error,
    startedAt: state.startedAt,
    updatedAt: state.updatedAt
  }
}

function resolveActiveRun(runtime: OhMyPptRuntime, sessionId: string) {
  runtime.ipc.pruneFinishedSessionRunStates()
  return mapActiveRun(runtime.ipc.sessionRunStates.get(sessionId))
}

async function writeGenerateChunkSSE(
  stream: { writeSSE: (payload: { event?: string; data: string }) => Promise<void> },
  chunk: GenerateChunkEvent
): Promise<void> {
  await stream.writeSSE({ event: chunk.type, data: JSON.stringify(chunk) })
}

export function createApp(cfg: ServiceConfig) {
  const app = new Hono()

  app.get('/health', (c) =>
    c.json({
      status: 'ok',
      service: 'ohmyppt',
      version: '0.3.0',
      architecture: 'copy-based',
      dataDir: cfg.dataDir,
      resourcesRoot: cfg.resourcesRoot
    })
  )

  app.get('/v1/styles', async (c) => {
    try {
      await getOhMyPptRuntime(cfg)
      const styles = await listStyles()
      return c.json({ styles })
    } catch (err) {
      return c.json(
        { error: err instanceof Error ? err.message : 'failed to load styles' },
        500
      )
    }
  })

  app.get('/v1/sessions', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const limit = Math.min(parseInt(c.req.query('limit') || '50', 10) || 50, 100)
      const offset = Math.max(parseInt(c.req.query('offset') || '0', 10) || 0, 0)
      const rows = await runtime.db.listSessions(userId, limit, offset)
      const sessions = await Promise.all(
        rows.map(async (row) => {
          const detail = await buildSessionDetail(runtime, row.id)
          return mapSessionSummaryRow(row, detail?.pages?.length ?? 0)
        })
      )
      return c.json({ sessions })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.post('/v1/sessions', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const body = await c.req.json().catch(() => null)
    const parsed = createSessionSchema.safeParse(body)
    if (!parsed.success) {
      return c.json({ error: 'invalid request', details: parsed.error.flatten() }, 400)
    }
    const input = parsed.data
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const { sessionId } = await createOhMyPptSession({
        cfg,
        runtime,
        topic: input.topic,
        styleId: input.style_id,
        pageCount: input.page_count,
        locale: input.locale,
        model: input.model,
        userId
      })
      const detail = await buildSessionDetail(runtime, sessionId)
      return c.json({ session: { id: sessionId, ...detail?.session } }, 201)
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.get('/v1/sessions/:id', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const sessionId = c.req.param('id')
      const owned = await loadOwnedSession(runtime, sessionId, userId)
      if (owned.access !== 'ok') {
        return accessDeniedResponse(c, owned.access)
      }
      const detail = await buildSessionDetail(runtime, sessionId)
      if (!detail?.session) return c.json({ error: 'session not found' }, 404)
      const storedMessages = await runtime.db.getSessionMessages(sessionId, { chatScope: 'main' })
      return c.json({
        session: detail.session,
        pages: detail.pages,
        activeRun: resolveActiveRun(runtime, sessionId),
        messages: storedMessages.map((message) =>
          normalizeMessage(message as unknown as Record<string, unknown>)
        )
      })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.patch('/v1/sessions/:id', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const sessionId = c.req.param('id')
    const body = await c.req.json().catch(() => null)
    const parsed = updateSessionSchema.safeParse(body)
    if (!parsed.success) {
      return c.json({ error: 'invalid request', details: parsed.error.flatten() }, 400)
    }

    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const owned = await loadOwnedSession(runtime, sessionId, userId)
      if (owned.access !== 'ok') {
        return accessDeniedResponse(c, owned.access)
      }
      await runtime.db.updateSessionTitle(sessionId, parsed.data.title)
      return c.json({ ok: true, title: parsed.data.title })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.delete('/v1/sessions/:id', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const sessionId = c.req.param('id')
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const owned = await loadOwnedSession(runtime, sessionId, userId)
      if (owned.access !== 'ok') {
        return accessDeniedResponse(c, owned.access)
      }

      runtime.agentManager.removeSession(sessionId)

      let projectDir: string | undefined
      try {
        projectDir = await runtime.ipc.resolveSessionProjectDir(sessionId)
      } catch {
        projectDir = undefined
      }

      await runtime.db.deleteSession(sessionId)

      if (projectDir) {
        await fs.rm(projectDir, { recursive: true, force: true }).catch(() => undefined)
      }

      return c.json({ ok: true })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.get('/v1/sessions/:id/pages/:pageId', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const sessionId = c.req.param('id')
      const owned = await loadOwnedSession(runtime, sessionId, userId)
      if (owned.access !== 'ok') {
        return accessDeniedResponse(c, owned.access)
      }
      const pageId = c.req.param('pageId')
      const htmlPath = await runtime.ipc.assertPathInAllowedRoots({
        filePath: `${pageId}.html`,
        mode: 'read',
        sessionId,
        htmlOnly: true
      })
      const fs = await import('node:fs/promises')
      const html = await fs.readFile(htmlPath, 'utf-8')
      return c.html(html)
    } catch {
      return c.json({ error: 'page not found' }, 404)
    }
  })

  app.get('/v1/sessions/:id/messages', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    try {
      const runtime = await getOhMyPptRuntime(cfg)
      const sessionId = c.req.param('id')
      const owned = await loadOwnedSession(runtime, sessionId, userId)
      if (owned.access !== 'ok') {
        return accessDeniedResponse(c, owned.access)
      }
      const chatScope = c.req.query('chat_scope') === 'page' ? 'page' : 'main'
      const pageId = c.req.query('page_id')?.trim() || undefined
      const messages = await runtime.db.getSessionMessages(sessionId, {
        chatScope,
        pageId
      })
      return c.json({
        messages: messages.map((message) =>
          normalizeMessage(message as unknown as Record<string, unknown>)
        )
      })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.get('/v1/sessions/:id/generate/stream', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const sessionId = c.req.param('id')
    const runtime = await getOhMyPptRuntime(cfg)
    const owned = await loadOwnedSession(runtime, sessionId, userId)
    if (owned.access !== 'ok') {
      return accessDeniedResponse(c, owned.access)
    }

    return streamSSE(c, async (stream) => {
      runtime.ipc.pruneFinishedSessionRunStates()
      const state = runtime.ipc.sessionRunStates.get(sessionId)
      const activeRun = mapActiveRun(state)
      if (activeRun) {
        await stream.writeSSE({
          event: 'run_status',
          data: JSON.stringify({ type: 'run_status', payload: activeRun })
        })
      }

      if (state?.events.length) {
        for (const chunk of state.events) {
          await writeGenerateChunkSSE(stream, chunk)
        }
      }

      if (!state || state.status !== 'running') {
        await stream.writeSSE({ data: '[DONE]' })
        return
      }

      let finished = false
      const unsubscribe = subscribeGenerationChunks(sessionId, async (_sid, chunk) => {
        await writeGenerateChunkSSE(stream, chunk)
        if (chunk.type === 'run_completed' || chunk.type === 'run_error') {
          finished = true
        }
      })

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          const current = runtime.ipc.sessionRunStates.get(sessionId)
          if (finished || !current || current.status !== 'running') {
            clearInterval(timer)
            resolve()
          }
        }, 400)

        c.req.raw.signal.addEventListener(
          'abort',
          () => {
            clearInterval(timer)
            resolve()
          },
          { once: true }
        )
      })

      unsubscribe()
      await stream.writeSSE({ data: '[DONE]' })
    })
  })

  app.post('/v1/sessions/:id/generate', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const sessionId = c.req.param('id')
    const runtime = await getOhMyPptRuntime(cfg)
    const owned = await loadOwnedSession(runtime, sessionId, userId)
    if (owned.access !== 'ok') {
      return accessDeniedResponse(c, owned.access)
    }

    const body = await c.req.json().catch(() => ({}))
    const parsed = generateSchema.safeParse(body)
    if (!parsed.success) {
      return c.json({ error: 'invalid request', details: parsed.error.flatten() }, 400)
    }

    const generator = new GenerationService(cfg, runtime)

    return streamSSE(c, async (stream) => {
      const write = async (event: string, data: unknown) => {
        await stream.writeSSE({ event, data: JSON.stringify(data) })
      }

      try {
        await generator.run(
          sessionId,
          (chunk: GenerateChunkEvent) => {
            void write(chunk.type, chunk)
          },
          {
            userMessage: parsed.data.user_message,
            model: parsed.data.model,
            signal: c.req.raw.signal
          }
        )
        await stream.writeSSE({ data: '[DONE]' })
      } catch (err) {
        await write('run_error', {
          type: 'run_error',
          payload: {
            message: err instanceof Error ? err.message : String(err),
            sessionId
          }
        })
        await stream.writeSSE({ data: '[DONE]' })
      }
    })
  })

  app.post('/v1/sessions/:id/export', async (c) => {
    const userId = requireUserId(c)
    if (userId instanceof Response) return userId
    const sessionId = c.req.param('id')
    const runtime = await getOhMyPptRuntime(cfg)
    const owned = await loadOwnedSession(runtime, sessionId, userId)
    if (owned.access !== 'ok') {
      return accessDeniedResponse(c, owned.access)
    }
    const session = owned.session
    if (!session) return c.json({ error: 'session not found' }, 404)

    const body = await c.req.json().catch(() => ({ format: 'zip' }))
    const parsed = exportSchema.safeParse(body)
    if (!parsed.success) {
      return c.json({ error: 'invalid request', details: parsed.error.flatten() }, 400)
    }

    try {
      const title = String(session.title || sessionId)

      if (parsed.data.format === 'pptx') {
        const result = await exportSessionToPptx(runtime, sessionId, {
          imageOnly: parsed.data.image_only,
          embedFonts: parsed.data.embed_fonts
        })
        return new Response(new Uint8Array(result.buffer), {
          headers: {
            'Content-Type':
              'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'Content-Disposition': buildPptxContentDisposition(title, sessionId)
          }
        })
      }

      const projectDir = await runtime.ipc.resolveSessionProjectDir(sessionId)
      const zip = await exportProjectZip(projectDir)
      return new Response(Buffer.from(zip), {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': buildZipContentDisposition(title, sessionId)
        }
      })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  app.post('/v1/export/guizang-pptx', async (c) => {
    const body = await c.req.json().catch(() => null)
    const parsed = guizangExportSchema.safeParse(body)
    if (!parsed.success) {
      return c.json({ error: 'invalid request', details: parsed.error.flatten() }, 400)
    }

    try {
      const title = parsed.data.title?.trim() || 'deck'
      const result = await exportGuizangHtmlToPptx(parsed.data.html, {
        title,
        imageOnly: parsed.data.image_only
      })
      return new Response(new Uint8Array(result.buffer), {
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'Content-Disposition': buildPptxContentDisposition(title, 'guizang')
        }
      })
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500)
    }
  })

  return app
}
