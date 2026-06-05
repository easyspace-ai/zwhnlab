export interface GenerateStagePayload {
  runId: string
  sessionId?: string
  stage: string
  label: string
  progress?: number
  currentPage?: number
  totalPages?: number
  timestamp?: string
}

export interface GeneratedPagePayload {
  id?: string
  pageNumber: number
  title: string
  html?: string
  htmlPath?: string
  pageId?: string
  sourceUrl?: string
}

export interface PageStatusPayload {
  id?: string
  pageNumber: number
  title: string
  pageId?: string
  htmlPath?: string
  error?: string
}

export type GenerateChunkEvent =
  | { type: 'stage_started' | 'stage_progress'; payload: GenerateStagePayload }
  | {
      type: 'llm_status'
      payload: GenerateStagePayload & { provider?: string; model?: string; detail?: string }
    }
  | {
      type: 'assistant_message'
      payload: {
        id?: string
        runId: string
        sessionId?: string
        content: string
        chatType?: 'main' | 'page'
        pageId?: string
        timestamp?: string
      }
    }
  | { type: 'page_generated'; payload: GenerateStagePayload & GeneratedPagePayload }
  | { type: 'page_updated'; payload: GenerateStagePayload & GeneratedPagePayload }
  | { type: 'page_planned'; payload: GenerateStagePayload & PageStatusPayload }
  | { type: 'page_started' | 'page_failed'; payload: GenerateStagePayload & PageStatusPayload }
  | {
      type: 'run_completed'
      payload: { runId: string; sessionId?: string; totalPages: number; timestamp?: string }
    }
  | {
      type: 'run_error'
      payload: { runId?: string; sessionId?: string; message: string; timestamp?: string }
    }

export interface OhMyPptStyle {
  id: string
  label: string
  description?: string
  category?: string
  styleKey?: string
}

export interface OhMyPptSessionSummary {
  id: string
  title?: string
  status?: string
  createdAt?: number
  updatedAt?: number
  pageCount?: number
  styleId?: string | null
  styleLabel?: string | null
  styleCategory?: string | null
}

export interface OhMyPptPage {
  id?: string
  pageId?: string
  pageNumber: number
  title: string
  status?: string
  htmlPath?: string
}

export interface OhMyPptSessionDetail {
  session: OhMyPptSessionSummary & Record<string, unknown>
  pages: OhMyPptPage[]
  activeRun?: OhMyPptActiveRun | null
  messages?: OhMyPptMessage[]
}

export interface OhMyPptActiveRun {
  runId: string
  status: 'running' | 'completed' | 'failed'
  progress: number
  totalPages: number
  mode?: string
  error?: string | null
  startedAt?: number
  updatedAt?: number
}

export interface OhMyPptMessage {
  id?: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  type?: string
  chat_scope?: string
  page_id?: string | null
  created_at?: number | null
}
