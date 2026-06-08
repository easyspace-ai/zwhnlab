import { create } from 'zustand'
import { isSessionNotFoundError } from '@/osint/lib/sessionErrors'
import { sessionApi, skillApi, promptTemplateApi, intelligenceSkillApi, projectApi } from '@/osint/services/api'
import type { SessionWebSocket } from '@/osint/services/ws'
import {
  Message as TMessage,
  Session as TSession,
  Resource,
  Skill as TSkill,
  PromptTemplate as TPromptTemplate,
  IntelligenceSkill,
} from '@/osint/types'
import type { SessionSyncMeta } from '@/osint/stores/apiStoreTypes'
import { createChatConversationSlice } from '@/osint/stores/chatConversationSlice'

export type { SessionSyncMeta } from '@/osint/stores/apiStoreTypes'

/** Newest-created first; stable order (not bumped by last visit). */
function sortSessionsByCreatedAt(sessions: TSession[]): TSession[] {
  return [...sessions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

/** WebSocket 连接状态 */
type WSConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'failed'

// Store 状态
interface AppState {
  // 加载状态
  loading: boolean
  isStreaming: boolean
  streamingBySession: Record<string, boolean>
  error: string | null

  sessions: TSession[]
  resources: Resource[]
  messages: TMessage[]
  activeProjectId: string | null
  activeMessageSessionId?: string
  liveTodosBySession: Record<string, Array<{ text: string; done: boolean }>>
  messagePagination: Record<string, { nextSkip: number; hasMore: boolean; loadingOlder: boolean; pageSize: number }>
  sessionSyncMeta: Record<string, SessionSyncMeta>
  messagesLoadingBySession: Record<string, boolean>

  // WebSocket
  wsConnections: Record<string, SessionWebSocket>
  /** Per-session connect params (Polymarket uses polymarketSavedId for simplified WS URL). */
  wsConnectionMeta: Record<string, { polymarketSavedId?: string }>
  wsStatus: Record<string, WSConnectionStatus>
  wsReconnectAttempt: Record<string, number>
  wsReconnectMaxAttempts: Record<string, number>
  pendingOutgoingQueue: Record<string, Array<{ id: string; content: string; attachments: string[]; createdAt: number }>>

  // 技能
  skills: TSkill[]
  installedSkills: TSkill[]
  recommendedSkills: TSkill[]
  promptTemplates: TPromptTemplate[]
  intelligenceSkills: IntelligenceSkill[]
  intelligenceSkillsLoading: boolean

  // Actions
  uploadResource: (sessionId: string, file: File) => Promise<any>
  fetchResources: (sessionId: string, type?: string) => Promise<void>
  createResource: (sessionId: string, data: { type: string; name: string; content?: string; url?: string; session_id?: string }) => Promise<any>
  deleteResource: (sessionId: string, resourceId: string) => Promise<void>
  updateMessage: (sessionId: string, messageId: string, content: string) => Promise<void>
  deleteMessage: (sessionId: string, messageId: string) => Promise<void>
  updateResource: (sessionId: string, resourceId: string, data: { name?: string; content?: string }) => Promise<void>
  fetchSessions: () => Promise<void>
  fetchMessagesBySession: (
    sessionId: string,
    options?: {
      mode?: 'replaceLatest' | 'prependOlder'
      limit?: number
      polymarketSavedId?: string
      __recoveryScheduled?: boolean
      __retryAfterError?: boolean
      __historyFallbackTried?: boolean
    }
  ) => Promise<void>
  hydrateSessionMessagesFromCache: (sessionId: string) => void
  setActiveMessageSession: (sessionId?: string) => void
  clearSessionMessages: (sessionId?: string) => void
  loadOlderMessages: (sessionId: string) => Promise<void>
  createSession: (title?: string, polymarketSavedEventId?: string) => Promise<TSession>
  updateSession: (sessionId: string, title: string) => Promise<void>
  deleteSession: (sessionId: string) => Promise<void>
  sendMessage: (sessionId: string, content: string, skillId?: string) => Promise<void>
  /** @deprecated 使用 sendMessageWS 替代 */
  sendMessageStream: (
    sessionId: string | undefined,
    content: string,
    skillId?: string,
    onChunk?: (text: string) => void,
    model?: string,
    mode?: string,
    resourceRefs?: Array<{ id: string; name?: string; type?: string }>,
    /** 可选：与内部 controller 并行中止（例如父组件卸载） */
    externalAbortSignal?: AbortSignal
  ) => Promise<void>
  /** 通过 WebSocket 发送消息（attachments 可为 id 或含 name 的 ref，后者用于乐观 UI 预览） */
  sendMessageWS: (
    sessionId: string,
    content: string,
    attachments?: string[] | Array<{ id: string; name?: string; type?: string }>,
  ) => void
  /** 建立 WebSocket 连接 */
  connectWebSocket: (sessionId: string, polymarketSavedId?: string) => void
  /** 断开 WebSocket 连接 */
  disconnectWebSocket: (sessionId: string) => void
  /** 手动重试 WebSocket 连接 */
  retryWebSocketConnection: (sessionId: string) => void
  /** 刷新并发送排队中的消息 */
  flushPendingOutgoingQueue: (sessionId: string) => Promise<void>
  /** 中止流式读取：不传则中止全部；传 sessionId 则仅中止该会话 */
  abortActiveMessageStream: (sessionId?: string) => void
  /** @deprecated W6 功能已移除 */
  sendW6PageFromOutlineStream: () => Promise<void>
  syncSessionState: (sessionId: string, options?: { refreshMessages?: boolean; upstreamSessionId?: string; activateUpstream?: boolean; force?: boolean }) => Promise<void>
  getSessionSyncMeta: (sessionId: string) => SessionSyncMeta | undefined
  getSessionSyncStatus: (sessionId: string) => 'idle' | 'syncing' | 'cooldown' | 'error' | 'ready'

  ensureActiveProject: () => Promise<string | null>
  setActiveProjectId: (projectId: string | null) => void

  // 技能
  fetchSkills: (params?: { category?: string; installed?: boolean; search?: string }) => Promise<void>
  fetchInstalledSkills: () => Promise<void>
  fetchRecommendedSkills: (limit?: number) => Promise<void>
  installSkill: (id: string) => Promise<void>
  uninstallSkill: (id: string) => Promise<void>
  fetchPromptTemplates: () => Promise<void>
  createPromptTemplate: (data: { action_type: string; name: string; prompt: string }) => Promise<TPromptTemplate>
  updatePromptTemplate: (id: string, data: Partial<{ action_type: string; name: string; prompt: string }>) => Promise<TPromptTemplate>
  deletePromptTemplate: (id: string) => Promise<void>

  // 情报技能
  fetchIntelligenceSkills: () => Promise<void>
  createIntelligenceSkill: (data: { key: string; name: string; description?: string; icon?: string; form_schema: string; prompt_template: string; is_enabled?: boolean; sort_order?: number }) => Promise<IntelligenceSkill>
  updateIntelligenceSkill: (id: string, data: Partial<Omit<IntelligenceSkill, 'id' | 'created_at' | 'updated_at'>>) => Promise<IntelligenceSkill>
  deleteIntelligenceSkill: (id: string) => Promise<void>
  restoreIntelligenceSkillToDefault: (id: string) => Promise<IntelligenceSkill>
  executeIntelligenceSkill: (id: string, formData: Record<string, any>) => Promise<string>

  // 工具
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  loading: false,
  isStreaming: false,
  streamingBySession: {},
  error: null,
  sessions: [] as TSession[],
  resources: [] as Resource[],
  messages: [],
  activeMessageSessionId: undefined,
  activeProjectId: null,
  liveTodosBySession: {},
  messagePagination: {},
  skills: [],
  installedSkills: [],
  recommendedSkills: [],
  promptTemplates: [],
  intelligenceSkills: [],
  intelligenceSkillsLoading: false,
  sessionSyncMeta: {},

  ensureActiveProject: async () => {
    let projectId = get().activeProjectId
    if (projectId) return projectId
    try {
      const projects = await projectApi.list({ limit: 1 })
      if (projects && projects.length > 0) {
        projectId = projects[0].id
      } else {
        const created = await projectApi.create({ name: '默认项目' })
        projectId = created.id
      }
      set({ activeProjectId: projectId })
      return projectId
    } catch (error: any) {
      console.error('ensureActiveProject failed:', error)
      set({ error: error.message })
      return null
    }
  },

  setActiveProjectId: (projectId: string | null) => set({ activeProjectId: projectId }),

fetchResources: async (sessionId: string, type?: string) => {
      try {
        set({ loading: true, error: null })
        const allResources = await sessionApi.getSessionResources(sessionId, { type })
        set({ resources: allResources, loading: false })
      } catch (error: any) {
        if (isSessionNotFoundError(error)) {
          console.warn(`[fetchResources] session missing, skipping: ${sessionId}`)
          set({ resources: [], loading: false })
          return
        }
        set({ error: error.message, loading: false })
      }
    },
    createResource: async (sessionId: string, data: { type: string; name: string; content?: string; url?: string; session_id?: string }) => {
      try {
        set({ loading: true, error: null })
        const { session_id, ...resourceData } = data
        const resource = await sessionApi.createResourceDirect(sessionId, resourceData)
        set(state => ({ resources: [resource, ...state.resources], loading: false }))
        return resource
      } catch (error: any) {
        set({ error: error.message, loading: false })
        throw error
      }
    },
updateMessage: async (sessionId, messageId, content) => {
     try {
       await sessionApi.updateMessageDirect(sessionId, messageId, content)
       set(state => ({
         messages: state.messages.map(m => m.id === messageId ? { ...m, content } : m)
       }))
     } catch (error: any) {
       set({ error: error.message })
     }
   },

deleteMessage: async (sessionId, messageId) => {
     try {
       await sessionApi.deleteMessageDirect(sessionId, messageId)
       set(state => ({
         messages: state.messages.filter(m => m.id !== messageId)
       }))
     } catch (error: any) {
       set({ error: error.message })
     }
   },

updateResource: async (sessionId, resourceId, data) => {
     try {
       await sessionApi.updateResourceDirect(sessionId, resourceId, data)
       set(state => ({
         resources: state.resources.map(r => r.id === resourceId ? { ...r, ...data } : r)
       }))
     } catch (error: any) {
       set({ error: error.message })
     }
   },

deleteResource: async (sessionId: string, resourceId: string) => {
     try {
       set({ loading: true, error: null })
       await sessionApi.deleteResourceDirect(sessionId, resourceId)
       set(state => ({
         resources: state.resources.filter((r: any) => r.id !== resourceId),
         loading: false
       }))
     } catch (error: any) {
       set({ error: error.message, loading: false })
     }
   },

uploadResource: async (sessionId: string, file: File) => {
     try {
       set({ loading: true, error: null })
       console.log('[ChatUpload] upload_progress: calling sessionApi.uploadResourceDirect', {
         sessionId,
         fileName: file.name,
       })
       const resource = await sessionApi.uploadResourceDirect(sessionId, file)
       set((state) => ({
         loading: false,
         resources: resource?.id
           ? [resource, ...state.resources.filter((r) => r.id !== resource.id)]
           : state.resources,
       }))
       return resource
     } catch (error: any) {
       console.error('[ChatUpload] upload_failure: apiStore.uploadResource', {
         sessionId,
         fileName: file.name,
         message: error?.message,
       })
       set({ error: error.message, loading: false })
       throw error
     }
   },

fetchSessions: async () => {
     try {
       set({ error: null })
       const sessions = sortSessionsByCreatedAt(await sessionApi.listDirect({ limit: 100 }))
       set({ sessions })
     } catch (error: any) {
       set({ error: error.message, sessions: [] })
     }
   },

  ...createChatConversationSlice(set, get),

createSession: async (title?: string, polymarketSavedEventId?: string) => {
     const data: { title?: string; polymarket_saved_event_id?: string } = {}
     if (title) data.title = title
     if (polymarketSavedEventId) data.polymarket_saved_event_id = polymarketSavedEventId
     const session = await sessionApi.createDirect(Object.keys(data).length > 0 ? data : undefined)
     set(state => ({ sessions: [session, ...state.sessions] }))
     return session
   },

updateSession: async (sessionId: string, title: string) => {
     try {
       await sessionApi.updateDirect(sessionId, { title })
     } catch (directErr: any) {
       // 独立会话接口已覆盖绝大多数情况，此处不再 fallback
       console.error('updateDirect failed, no projectId fallback:', directErr)
       throw directErr
     }
     set(state => ({
       sessions: state.sessions.map(s => s.id === sessionId ? { ...s, title } : s)
     }))
   },

   deleteSession: async (sessionId: string) => {
     try {
       await sessionApi.deleteDirect(sessionId)
     } catch (directErr: any) {
       // 独立会话接口已覆盖绝大多数情况，此处不再 fallback
       console.error('deleteDirect failed, no projectId fallback:', directErr)
       throw directErr
     }
     set(state => ({ sessions: state.sessions.filter(s => s.id !== sessionId) }))
   },

  // 技能操作
  fetchSkills: async (params?: { category?: string; installed?: boolean; search?: string }) => {
    try {
      set({ loading: true, error: null })
      const skills = await skillApi.list(params)
      set({ skills, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  fetchInstalledSkills: async () => {
    try {
      const installedSkills = await skillApi.getInstalled()
      set({ installedSkills })
    } catch (error: any) {
      console.error('Failed to fetch installed skills:', error)
    }
  },

  fetchRecommendedSkills: async (limit = 4) => {
    try {
      const recommendedSkills = await skillApi.getRecommended(limit)
      set({ recommendedSkills })
    } catch (error: any) {
      console.error('Failed to fetch recommended skills:', error)
    }
  },

  installSkill: async (id: string) => {
    try {
      await skillApi.install(id)

      // 更新技能状态
      set(state => ({
        skills: state.skills.map(s =>
          s.id === id ? { ...s, is_installed: true, users_count: s.users_count + 1 } : s
        ),
        installedSkills: [...state.installedSkills, state.skills.find(s => s.id === id)].filter(Boolean) as TSkill[],
        recommendedSkills: state.recommendedSkills.map(s =>
          s.id === id ? { ...s, is_installed: true, users_count: s.users_count + 1 } : s
        )
      }))
    } catch (error: any) {
      set({ error: error.message })
    }
  },

  uninstallSkill: async (id: string) => {
    try {
      await skillApi.uninstall(id)

      // 更新技能状态
      set(state => ({
        skills: state.skills.map(s =>
          s.id === id ? { ...s, is_installed: false } : s
        ),
        installedSkills: state.installedSkills.filter(s => s.id !== id),
        recommendedSkills: state.recommendedSkills.map(s =>
          s.id === id ? { ...s, is_installed: false } : s
        )
      }))
    } catch (error: any) {
      set({ error: error.message })
    }
  },

  fetchPromptTemplates: async () => {
    try {
      set({ error: null })
      const promptTemplates = await promptTemplateApi.list()
      set({ promptTemplates })
    } catch (error: any) {
      set({ error: error.message, promptTemplates: [] })
    }
  },

  createPromptTemplate: async (data) => {
    try {
      const created = await promptTemplateApi.create(data)
      set((state) => ({ promptTemplates: [created, ...state.promptTemplates] }))
      return created
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  updatePromptTemplate: async (id, data) => {
    try {
      const updated = await promptTemplateApi.update(id, data)
      set((state) => ({
        promptTemplates: state.promptTemplates.map((item) => (item.id === id ? updated : item)),
      }))
      return updated
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  deletePromptTemplate: async (id) => {
    try {
      await promptTemplateApi.delete(id)
      set((state) => ({
        promptTemplates: state.promptTemplates.filter((item) => item.id !== id),
      }))
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  // 情报技能操作
  fetchIntelligenceSkills: async () => {
    try {
      set({ intelligenceSkillsLoading: true, error: null })
      const skills = await intelligenceSkillApi.list()
      set({ intelligenceSkills: skills, intelligenceSkillsLoading: false })
    } catch (error: any) {
      set({ error: error.message, intelligenceSkillsLoading: false })
    }
  },

  createIntelligenceSkill: async (data) => {
    try {
      const created = await intelligenceSkillApi.create(data)
      set((state) => ({ intelligenceSkills: [created, ...state.intelligenceSkills] }))
      return created
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  updateIntelligenceSkill: async (id, data) => {
    try {
      const updated = await intelligenceSkillApi.update(id, data)
      set((state) => ({
        intelligenceSkills: state.intelligenceSkills.map((item) => (item.id === id ? updated : item)),
      }))
      return updated
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  deleteIntelligenceSkill: async (id) => {
    try {
      await intelligenceSkillApi.delete(id)
      set((state) => ({
        intelligenceSkills: state.intelligenceSkills.filter((item) => item.id !== id),
      }))
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  restoreIntelligenceSkillToDefault: async (id) => {
    try {
      const updated = await intelligenceSkillApi.restoreDefault(id)
      set((state) => ({
        intelligenceSkills: state.intelligenceSkills.map((item) => (item.id === id ? updated : item)),
      }))
      return updated
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  executeIntelligenceSkill: async (id, formData) => {
    try {
      const skill = get().intelligenceSkills.find((item) => item.id === id)
      if (!skill?.prompt_template) {
        throw new Error('技能不存在或未加载模板')
      }
      const { renderPrompt } = await import('@/osint/lib/renderPrompt')
      return renderPrompt(skill.prompt_template, formData)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  // 工具方法
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}))
