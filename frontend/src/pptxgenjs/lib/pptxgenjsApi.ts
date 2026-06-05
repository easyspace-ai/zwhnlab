import { getOsintAccessToken } from '@/osint/auth'

const API_BASE = '/api/pptxgenjs'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getOsintAccessToken()
  const headers = new Headers(init?.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (init?.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || res.statusText || 'Request failed')
  }
  return res.json() as Promise<T>
}

export interface PptxgenjsProject {
  id: string
  name: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface PptxgenjsResource {
  id: string
  project_id: string
  type: string
  name: string
  content?: string
  url?: string
  created_at: string
}

export interface PipelineResult {
  warnings?: string[]
  slide_schema_resource_id?: string
}

export interface PipelineEvent {
  stage: string
  status: string
  message?: string
  chunk?: string
  result?: PipelineResult
}

export type PptxgenjsChatMessage = { role: 'user' | 'assistant'; content: string }

async function streamPipelineSSE(
  path: string,
  init: RequestInit,
  onEvent: (ev: PipelineEvent) => void,
): Promise<PipelineResult | undefined> {
  const token = getOsintAccessToken()
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  if (!res.ok || !res.body) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Pipeline failed')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  let result: PipelineResult | undefined

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const parts = buf.split('\n\n')
    buf = parts.pop() || ''
    for (const part of parts) {
      const line = part.trim()
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return result
      try {
        const ev = JSON.parse(data) as PipelineEvent
        onEvent(ev)
        if (ev.stage === 'done' && ev.result) {
          result = ev.result
        }
      } catch {
        /* ignore malformed chunks */
      }
    }
  }
  return result
}

export type NormalizedProductSchemaResponse = {
  schema: {
    document_title?: string
    source?: string
    total_pages?: number
    style?: string
    slides: Array<Record<string, unknown>>
  }
  warnings?: string[]
  skipped?: boolean
}

export const pptxgenjsApi = {
  normalizeProductSchema: (body: { raw: string; file_name?: string }) =>
    request<NormalizedProductSchemaResponse>('/normalize-product-schema', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  listProjects: () => request<PptxgenjsProject[]>('/projects'),

  getProject: (id: string) => request<PptxgenjsProject>(`/projects/${id}`),

  listResources: (projectId: string) =>
    request<PptxgenjsResource[]>(`/projects/${projectId}/resources`),

  getChat: (projectId: string) =>
    request<{ messages: PptxgenjsChatMessage[] }>(`/projects/${projectId}/chat`).then(
      (r) => r.messages || [],
    ),

  saveChat: (projectId: string, messages: PptxgenjsChatMessage[]) =>
    request<{ ok: boolean }>(`/projects/${projectId}/chat`, {
      method: 'PUT',
      body: JSON.stringify({ messages }),
    }),

  createProject: (body: {
    name?: string
    markdown: string
    preferences?: Record<string, string>
    run_pipeline?: boolean
  }) =>
    request<{ project: PptxgenjsProject; session_id: string; pipeline?: PipelineResult }>(
      '/projects',
      { method: 'POST', body: JSON.stringify(body) },
    ),

  runPipeline: (projectId: string, onEvent: (ev: PipelineEvent) => void) =>
    streamPipelineSSE(`/projects/${projectId}/pipeline/run`, { method: 'POST' }, onEvent),

  regenerate: (projectId: string, instruction: string, onEvent: (ev: PipelineEvent) => void) =>
    streamPipelineSSE(
      `/projects/${projectId}/pipeline/regenerate`,
      { method: 'POST', body: JSON.stringify({ instruction }) },
      onEvent,
    ),
}
