import { getOsintAccessToken } from '@/osint/auth'
import type {
  GenerateChunkEvent,
  OhMyPptMessage,
  OhMyPptSessionDetail,
  OhMyPptSessionSummary,
  OhMyPptStyle,
} from './ohmypptTypes'

const API_BASE = '/api/studio/ohmyppt'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getOsintAccessToken()
  const headers = new Headers(init?.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (init?.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  const text = await res.text()
  const contentType = res.headers.get('content-type') || ''
  const looksLikeHtml = text.trimStart().toLowerCase().startsWith('<!doctype') || text.trimStart().startsWith('<html')

  if (!res.ok) {
    if (contentType.includes('json') && !looksLikeHtml) {
      try {
        const err = JSON.parse(text) as { detail?: string; error?: string }
        throw new Error(err.detail || err.error || res.statusText || 'Request failed')
      } catch (e) {
        if (e instanceof Error && e.message !== res.statusText) throw e
      }
    }
    throw new Error(
      looksLikeHtml
        ? `接口 ${path} 不可用（返回了 HTML，请确认 backend 与 ohmyppt 服务已更新并重启）`
        : text.slice(0, 200) || res.statusText || 'Request failed',
    )
  }

  if (looksLikeHtml || !contentType.includes('json')) {
    throw new Error(`接口 ${path} 返回了非 JSON 响应，请确认 backend 与 ohmyppt 服务已部署`)
  }

  return JSON.parse(text) as T
}

function parseSSEBlock(block: string): GenerateChunkEvent | null {
  const lines = block.split('\n')
  let eventType = ''
  let dataLine = ''
  for (const line of lines) {
    if (line.startsWith('event:')) eventType = line.slice(6).trim()
    if (line.startsWith('data:')) dataLine = line.slice(5).trim()
  }
  if (!dataLine || dataLine === '[DONE]') return null
  try {
    const parsed = JSON.parse(dataLine) as GenerateChunkEvent
    if (parsed.type) return parsed
    if (eventType) return { type: eventType, payload: parsed } as GenerateChunkEvent
  } catch {
    return null
  }
  return null
}

async function consumeGenerateSSE(
  url: string,
  init: RequestInit,
  onChunk: (ev: GenerateChunkEvent) => void,
): Promise<void> {
  const token = getOsintAccessToken()
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Accept')) headers.set('Accept', 'text/event-stream')

  const res = await fetch(url, { ...init, headers })
  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => '')
    const looksLikeHtml = text.trimStart().toLowerCase().startsWith('<!doctype')
    throw new Error(
      looksLikeHtml
        ? '生成接口不可用（返回了 HTML，请确认 backend 与 ohmyppt 服务已更新）'
        : (() => {
            try {
              const err = JSON.parse(text) as { detail?: string; error?: string }
              return err.detail || err.error || 'Generation stream failed'
            } catch {
              return text.slice(0, 200) || 'Generation stream failed'
            }
          })(),
    )
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const parts = buf.split('\n\n')
    buf = parts.pop() || ''
    for (const part of parts) {
      const ev = parseSSEBlock(part.trim())
      if (ev) onChunk(ev)
    }
  }
}

export const ohmypptApi = {
  listStyles: () => request<{ styles: OhMyPptStyle[] }>('/styles').then((r) => r.styles),

  listSessions: () =>
    request<{ sessions: OhMyPptSessionSummary[] }>('/sessions').then((r) => r.sessions),

  createSession: (body: {
    topic: string
    style_id?: string
    page_count?: number
    locale?: 'zh' | 'en'
    user_message?: string
  }) =>
    request<{ session: OhMyPptSessionSummary }>('/sessions', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getSession: (id: string) => request<OhMyPptSessionDetail>(`/sessions/${id}`),

  getMessages: async (sessionId: string) => {
    try {
      return await request<{ messages: OhMyPptMessage[] }>(`/sessions/${sessionId}/messages`).then(
        (r) => r.messages,
      )
    } catch {
      return []
    }
  },

  updateSessionTitle: (sessionId: string, title: string) =>
    request<{ ok: boolean; title: string }>(`/sessions/${sessionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
    }),

  deleteSession: (sessionId: string) =>
    request<{ ok: boolean }>(`/sessions/${sessionId}`, { method: 'DELETE' }),

  streamGenerate: (
    sessionId: string,
    onChunk: (ev: GenerateChunkEvent) => void,
    opts?: { user_message?: string },
  ) =>
    consumeGenerateSSE(
      `${API_BASE}/sessions/${sessionId}/generate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts ?? {}),
      },
      onChunk,
    ),

  streamSubscribe: (sessionId: string, onChunk: (ev: GenerateChunkEvent) => void) =>
    consumeGenerateSSE(`${API_BASE}/sessions/${sessionId}/generate/stream`, { method: 'GET' }, onChunk),

  getPageHtml: async (sessionId: string, pageId: string): Promise<string> => {
    const token = getOsintAccessToken()
    const headers = new Headers()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const res = await fetch(`${API_BASE}/sessions/${sessionId}/pages/${pageId}`, { headers })
    if (!res.ok) throw new Error('Page not found')
    return res.text()
  },

  exportZip: async (sessionId: string, filename = 'deck.zip') => {
    const token = getOsintAccessToken()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const res = await fetch(`${API_BASE}/sessions/${sessionId}/export`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ format: 'zip' }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(
        (err as { detail?: string; error?: string }).detail ||
          (err as { detail?: string; error?: string }).error ||
          'Export failed',
      )
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  },

  exportPptx: async (
    sessionId: string,
    filename = 'deck.pptx',
    opts?: { image_only?: boolean; embed_fonts?: 'auto' | 'always' | 'never' },
  ) => {
    const blob = await ohmypptApi.fetchPptxBlob(sessionId, opts)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  },

  fetchPptxBlob: async (
    sessionId: string,
    opts?: { image_only?: boolean; embed_fonts?: 'auto' | 'always' | 'never' },
  ): Promise<Blob> => {
    const token = getOsintAccessToken()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const res = await fetch(`${API_BASE}/sessions/${sessionId}/export`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        format: 'pptx',
        image_only: opts?.image_only ?? false,
        embed_fonts: opts?.embed_fonts,
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || err.error || 'Export failed')
    }
    return res.blob()
  },
}
