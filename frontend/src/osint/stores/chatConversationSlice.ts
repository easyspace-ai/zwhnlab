/**
 * 会话消息、WebSocket 连接等与聊天相关的 store 切片（从 apiStore 拆出以减轻单文件体积）。
 */
import { fetchSavedPolymarketChatHistory } from '@/lib/polymarketApi'
import { isSessionNotFoundError } from '@/osint/lib/sessionErrors'
import { SessionWebSocket } from '@/osint/services/ws'
import { sessionApi } from '@/osint/services/api'
import * as historySync from './api/historySync'
import type { Message as TMessage } from '@/osint/types'

/** artifact 刷新防抖定时器 */
let _artifactRefreshTimer: ReturnType<typeof setTimeout> | null = null

/** 发送 Stop 后延迟再断开 WS，避免 close 先于 Stop 帧被代理读入并转发到上游（见 THIRD_PARTY_INTEGRATION.md 4.1.1） */
const STOP_THEN_DISCONNECT_MS = 220

/** 上游消息格式定义 */
interface WSMessagePart {
  type: string
  text_kind?: string
  content?: string
  resource?: {
    id?: string
    name?: string
    kind?: string
    data?: { filename?: string; path?: string }
  }
}

interface WSMessage {
  turn_number: number
  item_id: number
  kind: 'from_user' | 'user_facing' | 'reasoning' | 'internal_thought' | 'episodic_marker' | string
  message_parts: WSMessagePart[]
  author_id?: string | null
  author_display?: string | null
  created_at?: number
  hidden?: boolean
}

interface WSUpdateData {
  type: 'update'
  state: {
    id: string
    status: string
    title?: string
    todos?: Array<{ text: string; done: boolean; children?: any[] }>
    [key: string]: any
  }
  messages: WSMessage[]
}

interface WSStatusData {
  type: 'status'
  status: string
}

type WSData = WSUpdateData | WSStatusData

/** WebSocket 连接状态 - 新增 'failed' 表示达到最大重试次数后失败 */
type WSConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'failed'

type PendingOutgoingMessage = {
  id: string
  content: string
  attachments: string[]
  createdAt: number
}

export function mapHistoryMessagesToLocal(sessionId: string, messages: any[]): TMessage[] {
  const seenStableIds = new Set<string>()
  const converted: TMessage[] = []
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    if (!msg || msg.hidden) continue

    const stableId = historySync.stableMessageId(
      {
        item_id: msg.item_id,
        id: msg.id,
        turn_number: msg.turn_number,
        created_at: msg.created_at,
      },
      sessionId,
      i
    )
    if (seenStableIds.has(stableId)) continue
    seenStableIds.add(stableId)

    const roleRaw = String(msg.role ?? msg.Role ?? '').toLowerCase()
    const role: 'user' | 'assistant' | 'system' =
      msg.kind === 'from_user' || roleRaw === 'user'
        ? 'user'
        : msg.kind === 'episodic_marker' || msg.kind === 'system' || roleRaw === 'system'
          ? 'system'
          : 'assistant'

    const content = Array.isArray(msg.message_parts)
      ? msg.message_parts
          .filter((part: any) => part.type === 'text')
          .map((part: any) => part.content || '')
          .join('')
      : (msg.content || '')

    const resourceRefs = Array.isArray(msg.message_parts)
      ? msg.message_parts
          .filter((part: any) => part.type === 'resource')
          .map((part: any) => ({
            id: part.resource?.id || '',
            name: part.resource?.name || part.resource?.data?.filename || '未命名文件',
            type: part.resource?.kind || 'file',
          }))
          .filter((r: any) => r.id)
      : undefined

    converted.push({
      id: stableId,
      upstream_message_id: historySync.pickUpstreamRawId(msg) ?? stableId,
      session_id: sessionId,
      role,
      content,
      status: 'idle',
      attachments: {
        upstream_kind: msg.kind,
        message_kind: role === 'system' ? 'system' : 'normal',
      },
      resource_refs: resourceRefs && resourceRefs.length > 0 ? resourceRefs : undefined,
      created_at: msg.created_at ? new Date(msg.created_at).toISOString?.() || String(msg.created_at) : new Date().toISOString(),
    } as TMessage)
  }
  return converted
}

/** set/get 使用宽松类型，避免与 zustand AppState 循环依赖 */
export function createChatConversationSlice(set: (partial: any) => void, get: () => any) {
  return {
    // WebSocket 连接状态
    wsConnections: {} as Record<string, SessionWebSocket>,
    wsStatus: {} as Record<string, WSConnectionStatus>,
    wsReconnectAttempt: {} as Record<string, number>,     // 当前重试次数
    wsReconnectMaxAttempts: {} as Record<string, number>, // 最大重试次数（用于显示）
    messagesLoadingBySession: {} as Record<string, boolean>,
    pendingOutgoingQueue: {} as Record<string, PendingOutgoingMessage[]>,
    wsConnectionMeta: {} as Record<string, { polymarketSavedId?: string }>,

    // 连接 WebSocket
    connectWebSocket: (sessionId: string, polymarketSavedId?: string) => {
      const state = get()
      set((s: any) => ({
        wsConnectionMeta: {
          ...s.wsConnectionMeta,
          [sessionId]: {
            polymarketSavedId: polymarketSavedId?.trim() || undefined,
          },
        },
      }))

      // 如果已有连接，先关闭
      if (state.wsConnections[sessionId]) {
        state.wsConnections[sessionId].close()
      }

      // 获取最大重试次数配置
      const MAX_RECONNECT_ATTEMPTS = 5;

      const ws = new SessionWebSocket(
        sessionId,
        {
        onMessage: (data: WSData) => {
          // 处理上游 error 类型消息
          if ((data as any).type === 'error') {
            set((state: any) => ({
              error: (data as any).error || '上游连接失败，请稍后重试',
              isStreaming: false,
            }));
            return;
          }

          // 处理上游消息
          if (data.type === 'update' && data.messages) {
            // 使用与 HTTP 历史一致的 stableMessageId（HTTP 用 id，WS 用 item_id；item_id=0 会撞键）
            const upstreamIdCounts = new Map<string, number>()
            data.messages.forEach((msg: any, i: number) => {
              const id = historySync.stableMessageId(
                {
                  item_id: msg.item_id,
                  id: msg.id,
                  turn_number: msg.turn_number,
                  created_at: msg.created_at,
                },
                sessionId,
                i
              )
              upstreamIdCounts.set(id, (upstreamIdCounts.get(id) || 0) + 1)
            })
            const upstreamDuplicates = Array.from(upstreamIdCounts.entries()).filter(([_, count]) => count > 1)
            if (upstreamDuplicates.length > 0) {
              console.warn('[WebSocket] duplicate stable keys in one frame (same turn/ts?)', upstreamDuplicates)
            }

            // 必须用「原始下标」计算 stable id，否则先 filter 再 map 会改变序号，导致同一条消息前后 id 不一致
            const seenStableIds = new Set<string>()
            const convertedMessages: TMessage[] = []
            for (let i = 0; i < data.messages.length; i++) {
              const msg = data.messages[i] as WSMessage & { id?: string | number }
              if (msg.hidden) continue
              const stableId = historySync.stableMessageId(
                {
                  item_id: msg.item_id,
                  id: msg.id,
                  turn_number: msg.turn_number,
                  created_at: msg.created_at,
                },
                sessionId,
                i
              )
              if (seenStableIds.has(stableId)) continue
              seenStableIds.add(stableId)

              const rawUpstream = historySync.pickUpstreamRawId(msg) ?? stableId

              let content = ''
              let resourceRefs: Array<{ id: string; name?: string; type?: string }> | undefined
              if (msg.message_parts) {
                content = msg.message_parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.content || '')
                  .join('')
                const refs = msg.message_parts
                  .filter((part) => part.type === 'resource')
                  .map((part) => ({
                    id: part.resource?.id || '',
                    name: part.resource?.name || part.resource?.data?.filename || '未命名文件',
                    type: part.resource?.kind || 'file',
                  }))
                  .filter((r) => r.id)
                if (refs.length > 0) resourceRefs = refs
              }

              let role: 'user' | 'assistant' | 'system' = 'assistant'
              if (msg.kind === 'from_user') {
                role = 'user'
              } else if (msg.kind === 'episodic_marker' || msg.kind === 'system') {
                role = 'system'
              }

              let messageKind = 'normal'
              if (msg.kind === 'reasoning' || msg.kind === 'internal_thought') {
                messageKind = 'reasoning'
              } else if (msg.kind === 'episodic_marker' || msg.kind === 'system') {
                messageKind = 'system'
              }

              convertedMessages.push({
                id: stableId,
                upstream_message_id: rawUpstream,
                session_id: sessionId,
                role,
                content,
                status: data.state?.status || 'idle',
                attachments: {
                  upstream_kind: msg.kind,
                  message_kind: messageKind,
                  turn_number: msg.turn_number,
                },
                resource_refs: resourceRefs,
                created_at: msg.created_at
                  ? new Date(msg.created_at * 1000).toISOString()
                  : new Date().toISOString(),
              } as TMessage)
            }

            if (convertedMessages.length !== data.messages.filter((m) => !m.hidden).length) {
              console.log('[WebSocket] deduped by stable id', {
                raw: data.messages.length,
                converted: convertedMessages.length,
              })
            }

            // 先在 set 外部获取当前状态并计算合并结果
            const currentMessages = get().messages
            const tempMessagesCount = currentMessages.filter((m: TMessage) => m.id.startsWith('temp-')).length

            // 上游 from_user 消息的内容集合，用于去重临时消息
            const upstreamUserContents = new Set(
              convertedMessages
                .filter((m: TMessage) => m.role === 'user')
                .map((m: TMessage) => m.content)
            )

            // 上游 echo 的 user 消息通常不含 resource parts；保留 temp 消息里已上传的 resource_refs
            const tempResourceRefsByContent = new Map<
              string,
              Array<{ id: string; name?: string; type?: string }>
            >()
            for (const m of currentMessages) {
              if (
                m.id.startsWith('temp-') &&
                m.role === 'user' &&
                m.resource_refs &&
                m.resource_refs.length > 0
              ) {
                tempResourceRefsByContent.set(m.content, m.resource_refs)
              }
            }
            if (tempResourceRefsByContent.size > 0) {
              for (const msg of convertedMessages) {
                if (
                  msg.role === 'user' &&
                  (!msg.resource_refs || msg.resource_refs.length === 0)
                ) {
                  const preserved = tempResourceRefsByContent.get(msg.content)
                  if (preserved) {
                    msg.resource_refs = preserved
                  }
                }
              }
            }

            // 过滤掉已被上游确认的临时消息
            const filteredExisting = currentMessages.filter(
              (m: TMessage) => !(m.id.startsWith('temp-') && upstreamUserContents.has(m.content))
            )

            const removedTempCount = currentMessages.length - filteredExisting.length
            if (removedTempCount > 0 || tempMessagesCount > 0) {
              console.log('[WebSocket] merging messages', {
                tempMessagesCount,
                removedTempCount,
                upstreamUserContents: Array.from(upstreamUserContents).slice(0, 3),
                existingCount: currentMessages.length,
                incomingCount: convertedMessages.length,
              })
            }

            // 使用 Map 来去重
            const messageMap = new Map<string, TMessage>()

            // 先添加已存在的消息
            for (const msg of filteredExisting) {
              messageMap.set(String(msg.id), msg)
            }

            // 再添加/更新新消息
            for (const msg of convertedMessages) {
              const msgId = String(msg.id)
              const existing = messageMap.get(msgId)
              if (existing) {
                // 更新已存在的消息
                messageMap.set(msgId, {
                  ...existing,
                  content: msg.content,
                  status: msg.status,
                  attachments: msg.attachments,
                  resource_refs: msg.resource_refs ?? existing.resource_refs,
                })
              } else {
                messageMap.set(msgId, msg)
              }
            }

            // 按时间排序得到最终合并消息
            let mergedMessages = Array.from(messageMap.values()).sort(
              (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )

            mergedMessages = historySync.dedupeMessagesByCanonicalKey(mergedMessages)

            // 更新 UI
            set({ messages: mergedMessages })

            // 更新会话标题（如果远端返回了标题）
            if (data.state?.title) {
              set((state: any) => {
                const sessionIndex = state.sessions.findIndex((s: any) => s.id === sessionId)
                if (sessionIndex >= 0 && state.sessions[sessionIndex].title !== data.state.title) {
                  const updatedSessions = [...state.sessions]
                  updatedSessions[sessionIndex] = {
                    ...updatedSessions[sessionIndex],
                    title: data.state.title,
                  }
                  return { sessions: updatedSessions }
                }
                return {}
              })
            }

            // 更新 todos
            if (data.state?.todos) {
              set((state: any) => ({
                liveTodosBySession: {
                  ...state.liveTodosBySession,
                  [sessionId]: data.state.todos,
                },
              }))
            }

            // 检测是否有新的 artifact（resource 类型的 message_parts）或 todos 更新，延迟刷新资源列表
            const hasNewArtifacts = data.messages.some((msg: WSMessage) =>
              msg.message_parts?.some((part: WSMessagePart) => part.type === 'resource')
            )
            const hasTodosUpdate = data.state?.todos != null

            if (hasNewArtifacts || hasTodosUpdate) {
              if (_artifactRefreshTimer) clearTimeout(_artifactRefreshTimer)
              _artifactRefreshTimer = setTimeout(() => {
                _artifactRefreshTimer = null
                const activeSid = get().activeMessageSessionId
                if (activeSid) {
                  void get().fetchResources(activeSid)
                }
              }, 500)
            }
          }

          // 处理状态更新
          if (data.type === 'status') {
            set((state: any) => ({
              streamingBySession: {
                ...state.streamingBySession,
                [sessionId]: data.status !== 'idle',
              },
              isStreaming: data.status !== 'idle',
            }))
          }
        },
        onStatusChange: (status: string) => {
          set((state: any) => ({
            wsStatus: { ...state.wsStatus, [sessionId]: status },
            error: status === 'connected' || status === 'reconnecting' ? null : state.error,
          }))
          if (status === 'connected') {
            void get().flushPendingOutgoingQueue(sessionId)
          }
        },
        onError: (error: Error, isFatal?: boolean) => {
          console.error('WebSocket error:', error, isFatal ? '(fatal)' : '')
          set((state: any) => ({
            error:
              isFatal || state.wsStatus?.[sessionId] === 'disconnected'
                ? error.message
                : state.error,
            wsStatus: {
              ...state.wsStatus,
              [sessionId]:
                isFatal
                  ? 'failed'
                  : (state.wsStatus?.[sessionId] === 'reconnecting' || state.wsStatus?.[sessionId] === 'connecting')
                    ? state.wsStatus?.[sessionId]
                    : 'disconnected',
            },
          }))
        },
        onClose: () => {
          // 连接关闭处理 - ws.ts 会自动重连，这里不需要额外处理
          console.log('WebSocket closed for session:', sessionId)
        },
        onReconnectAttempt: (attempt: number, maxAttempts: number) => {
          // 通知重试进度
          console.log(`WebSocket reconnect attempt ${attempt}/${maxAttempts} for session:`, sessionId)
          set((state: any) => ({
            wsReconnectAttempt: { ...state.wsReconnectAttempt, [sessionId]: attempt },
            wsReconnectMaxAttempts: { ...state.wsReconnectMaxAttempts, [sessionId]: maxAttempts },
            wsStatus: { ...state.wsStatus, [sessionId]: 'reconnecting' },
            error: null,
          }))
        },
        onReconnectFailed: () => {
          // 达到最大重试次数后回调
          console.warn(`WebSocket max reconnect attempts reached for session:`, sessionId)
          set((state: any) => ({
            wsStatus: { ...state.wsStatus, [sessionId]: 'failed' },
            error: '连接失败，请检查网络后点击重试',
          }))
        },
      },
        polymarketSavedId?.trim() ? { polymarketSavedId: polymarketSavedId.trim() } : undefined,
      )

      ws.connect()
      set((state: any) => ({
        wsConnections: { ...state.wsConnections, [sessionId]: ws },
        wsStatus: { ...state.wsStatus, [sessionId]: 'connecting' },
        wsReconnectAttempt: { ...state.wsReconnectAttempt, [sessionId]: 0 },
        wsReconnectMaxAttempts: { ...state.wsReconnectMaxAttempts, [sessionId]: MAX_RECONNECT_ATTEMPTS },
      }))
    },

    // 手动触发 WebSocket 重连
    retryWebSocketConnection: (sessionId: string) => {
      const state = get()
      const ws = state.wsConnections[sessionId]
      if (ws) {
        console.log(`[store] Manual retry for session ${sessionId}`)
        ws.retry()
        // 重置状态
        set((state: any) => ({
          wsStatus: { ...state.wsStatus, [sessionId]: 'connecting' },
          wsReconnectAttempt: { ...state.wsReconnectAttempt, [sessionId]: 0 },
          error: null,
        }))
      } else {
        // 如果没有现有连接，创建新连接
        console.log(`[store] No existing connection for ${sessionId}, creating new one`)
        const meta = state.wsConnectionMeta?.[sessionId]
        get().connectWebSocket(sessionId, meta?.polymarketSavedId)
      }
    },

    // 断开 WebSocket
    disconnectWebSocket: (sessionId: string) => {
      const state = get()
      const ws = state.wsConnections[sessionId]
      if (ws) {
        ws.destroy()
        set((state: any) => {
          const newConnections = { ...state.wsConnections }
          delete newConnections[sessionId]
          const newStatus = { ...state.wsStatus }
          delete newStatus[sessionId]
          const newAttempts = { ...state.wsReconnectAttempt }
          delete newAttempts[sessionId]
          const newMaxAttempts = { ...state.wsReconnectMaxAttempts }
          delete newMaxAttempts[sessionId]
          const newMeta = { ...state.wsConnectionMeta }
          delete newMeta[sessionId]
          return {
            wsConnections: newConnections,
            wsStatus: newStatus,
            wsReconnectAttempt: newAttempts,
            wsReconnectMaxAttempts: newMaxAttempts,
            wsConnectionMeta: newMeta,
          }
        })
      }
    },

    // 发送消息（通过 WebSocket）
    sendMessageWS: (
      sessionId: string,
      content: string,
      attachments: string[] | Array<{ id: string; name?: string; type?: string }> = [],
    ) => {
      const ws = get().wsConnections[sessionId]
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const resourceRefs =
        attachments.length > 0
          ? attachments.map((item) =>
              typeof item === 'string' ? { id: item } : { id: item.id, name: item.name, type: item.type },
            )
          : undefined
      const attachmentIds = resourceRefs?.map((r) => r.id) ?? []
      console.log('[sendMessageWS] optimistic update', { tempId, contentLength: content.length })
      const meta = get().wsConnectionMeta?.[sessionId]
      const userMsg: TMessage = {
        id: tempId,
        project_id: '',
        session_id: sessionId,
        role: 'user',
        content,
        resource_refs: resourceRefs,
        attachments: { temp: true },
        created_at: new Date().toISOString(),
      }

      set((state: any) => ({
        messages: [...state.messages, userMsg],
      }))

      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('[sendMessageWS] sending input', { sessionId, contentLength: content.length, attachments: attachmentIds.length > 0 ? attachmentIds : 'none' })
        ws.sendInput(content, attachmentIds)
        return
      }

      // 未连接：先入队，再主动触发连接，用户无感
      const now = Date.now()
      const dedupeSignature = `${content}::${attachmentIds.join(',')}`
      set((state: any) => {
        const queue = (state.pendingOutgoingQueue?.[sessionId] || []) as PendingOutgoingMessage[]
        const hasRecentDuplicate = queue.some(
          (item) => item.content === content && item.attachments.join(',') === attachmentIds.join(',') && now - item.createdAt < 1200
        )
        if (hasRecentDuplicate) {
          return {
            error: '正在重连，消息已排队发送',
            wsStatus: { ...state.wsStatus, [sessionId]: state.wsStatus?.[sessionId] || 'reconnecting' },
          }
        }
        const nextItem: PendingOutgoingMessage = {
          id: `${tempId}-${dedupeSignature.length}`,
          content,
          attachments: attachmentIds,
          createdAt: now,
        }
        return {
          pendingOutgoingQueue: {
            ...state.pendingOutgoingQueue,
            [sessionId]: [...queue, nextItem],
          },
          error: '正在重连，消息已排队发送',
          wsStatus: { ...state.wsStatus, [sessionId]: state.wsStatus?.[sessionId] || 'reconnecting' },
        }
      })

      if (ws) {
        void ws.ensureConnected(8000).then((ok: boolean) => {
          if (ok) void get().flushPendingOutgoingQueue(sessionId)
        })
      } else {
        const m = get().wsConnectionMeta?.[sessionId]
        get().connectWebSocket(sessionId, m?.polymarketSavedId)
      }
    },

    flushPendingOutgoingQueue: async (sessionId: string) => {
      const state = get()
      const ws = state.wsConnections?.[sessionId]
      const queue = (state.pendingOutgoingQueue?.[sessionId] || []) as PendingOutgoingMessage[]
      if (!ws || queue.length === 0) return

      const connected = await ws.ensureConnected(8000)
      if (!connected || ws.readyState !== WebSocket.OPEN) {
        return
      }

      const pending = [...queue]
      pending.forEach((item) => {
        ws.sendInput(item.content, item.attachments)
      })

      set((s: any) => ({
        pendingOutgoingQueue: {
          ...s.pendingOutgoingQueue,
          [sessionId]: [],
        },
        error: s.error === '正在重连，消息已排队发送' ? null : s.error,
      }))
    },

    // 中止当前会话的消息流：先发 Stop（与上游协议一致），再延迟断开，避免 Stop 未送达
    abortActiveMessageStream: (sessionId?: string) => {
      if (sessionId) {
        const ws = get().wsConnections[sessionId]
        const readyState = ws?.readyState
        console.log(`[abortActiveMessageStream] sessionId=${sessionId}, readyState=${readyState} (0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED)`)
        if (ws && readyState === WebSocket.OPEN) {
          const sent = ws.sendStop()
          console.log(`[abortActiveMessageStream] Stop frame sent: ${sent}`)
          window.setTimeout(() => {
            if (get().wsConnections[sessionId] !== ws) return
            get().disconnectWebSocket(sessionId)
          }, STOP_THEN_DISCONNECT_MS)
        } else {
          console.warn(`[abortActiveMessageStream] WebSocket not open, disconnecting directly`)
          get().disconnectWebSocket(sessionId)
        }
        set((state: any) => ({
          streamingBySession: {
            ...state.streamingBySession,
            [sessionId]: false,
          },
        }))
      } else {
        const snap = { ...get().wsConnections } as Record<string, InstanceType<typeof SessionWebSocket>>
        console.log(`[abortActiveMessageStream] Stopping all sessions, count=${Object.keys(snap).length}`)
        Object.values(snap).forEach((w) => {
          const state = w?.readyState
          console.log(`[abortActiveMessageStream] Session readyState=${state}`)
          if (state === WebSocket.OPEN) {
            const sent = w.sendStop()
            console.log(`[abortActiveMessageStream] Stop frame sent: ${sent}`)
          }
        })
        window.setTimeout(() => {
          Object.keys(get().wsConnections).forEach(sid => get().disconnectWebSocket(sid))
        }, STOP_THEN_DISCONNECT_MS)
        set({ streamingBySession: {}, isStreaming: false })
      }
    },

    fetchMessagesBySession: async (
      sessionId: string,
      options?: {
        mode?: 'replaceLatest' | 'prependOlder';
        limit?: number;
        polymarketSavedId?: string;
        __recoveryScheduled?: boolean;
        __retryAfterError?: boolean;
        __historyFallbackTried?: boolean;
      }
    ) => {
      const mode = options?.mode || 'replaceLatest'
      const polySaved =
        (options?.polymarketSavedId && String(options.polymarketSavedId).trim()) ||
        get().wsConnectionMeta?.[sessionId]?.polymarketSavedId ||
        undefined
      /** 后端 ListBySessionID：skip=0 取最近一页，skip 递增取更早；每页默认 20 */
      const pageSize = options?.limit ?? 20
      const isActiveSession = () => get().activeMessageSessionId === sessionId
      const pagination = get().messagePagination[sessionId] || {
        nextSkip: 0,
        hasMore: true,
        loadingOlder: false,
        pageSize,
      }
      if (mode === 'prependOlder' && (pagination.loadingOlder || !pagination.hasMore)) {
        return
      }

      const belongsToThisSession = (m: TMessage) => {
        if (m.session_id === sessionId) return true
        if (m.session_id && m.session_id !== sessionId) return false
        return isActiveSession()
      }

      // 设置消息加载状态
      if (mode === 'replaceLatest') {
        set((state: any) => ({
          messagesLoadingBySession: {
            ...state.messagesLoadingBySession,
            [sessionId]: true,
          },
        }))
      }

      try {
        if (mode === 'replaceLatest') {
          set({ loading: true, error: null })

          const skip = 0
          let apiMessages: TMessage[] = []
          let polyHistoryError: string | null = null
          if (polySaved) {
            try {
              const historyResp = await fetchSavedPolymarketChatHistory(polySaved, {
                offset: 0,
                limit: pageSize,
              })
              const upstreamMessages = Array.isArray(historyResp?.messages) ? historyResp.messages : []
              if (upstreamMessages.length > 0) {
                apiMessages = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
              }
            } catch (histErr: any) {
              polyHistoryError = histErr?.message || '加载 Polymarket 本地历史失败'
              console.warn(`[fetchMessagesBySession] polymarket history:`, histErr)
            }
            if (apiMessages.length === 0 && !options?.__historyFallbackTried) {
              try {
                const historyResp = await sessionApi.getSessionHistoryDirect(sessionId, {
                  offset: 0,
                  limit: pageSize,
                })
                const upstreamMessages = Array.isArray(historyResp?.messages) ? historyResp.messages : []
                if (upstreamMessages.length > 0) {
                  apiMessages = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
                  polyHistoryError = null
                }
              } catch (w6Err: any) {
                if (!polyHistoryError) {
                  polyHistoryError = w6Err?.message || '无法从 AI 服务加载历史'
                }
                console.warn(`[fetchMessagesBySession] polymarket W6 history fallback:`, w6Err)
              }
            }
          } else {
            // 使用独立 session 接口（无需 projectId）
            try {
              apiMessages = (await sessionApi.getSessionMessagesDirect(sessionId, {
                skip,
                limit: pageSize,
              })) as TMessage[]
} catch (directErr: any) {
               // 独立会话接口已覆盖绝大多数情况，不再 fallback 到 project-based 接口
               throw directErr
            }
            if (
              apiMessages.length > 0 &&
              apiMessages.some((m) => !m.resource_refs?.length)
            ) {
              try {
                const historyResp = await sessionApi.getSessionHistoryDirect(sessionId, {
                  offset: 0,
                  limit: pageSize,
                })
                const upstreamMessages = Array.isArray(historyResp?.messages)
                  ? historyResp.messages
                  : []
                if (upstreamMessages.length > 0) {
                  const fromHistory = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
                  apiMessages = historySync.enrichMessagesWithResourceRefs(apiMessages, fromHistory)
                }
              } catch (historyErr) {
                console.warn(
                  `[fetchMessagesBySession] resource_refs enrich from history failed for ${sessionId}:`,
                  historyErr,
                )
              }
            }
          }
          if (!isActiveSession()) {
            if (!options?.__recoveryScheduled) {
              // 路由/状态切换的竞态窗口：短延迟复核后为当前会话再补拉一次
              window.setTimeout(() => {
                if (get().activeMessageSessionId !== sessionId) return
                void get().fetchMessagesBySession(sessionId, {
                  mode,
                  limit: pageSize,
                  polymarketSavedId: polySaved,
                  __recoveryScheduled: true,
                  __retryAfterError: options?.__retryAfterError,
                })
              }, 120)
            }
            return
          }

          if (!polySaved && apiMessages.length === 0 && !options?.__historyFallbackTried) {
            try {
              const historyResp = await sessionApi.getSessionHistoryDirect(sessionId, {
                offset: 0,
                limit: pageSize,
              })
              const upstreamMessages = Array.isArray(historyResp?.messages) ? historyResp.messages : []
              if (upstreamMessages.length > 0) {
                apiMessages = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
              }
            } catch (historyErr) {
              console.warn(`[fetchMessagesBySession] history fallback failed for ${sessionId}:`, historyErr)
            }
          }

          if (polySaved && apiMessages.length === 0 && polyHistoryError) {
            set({
              error: `${polyHistoryError}，请点击重新加载`,
              loading: false,
            })
          }

          const currentMemoryMessages = get().messages
          const tempMessages = currentMemoryMessages.filter(
            (m: TMessage) => m.id.startsWith('temp-') && belongsToThisSession(m)
          )
          const realMessages = currentMemoryMessages.filter(
            (m: TMessage) => !m.id.startsWith('temp-') && belongsToThisSession(m)
          )

          let merged: TMessage[] = [...apiMessages]
          if (realMessages.length > 0) {
            merged = historySync.mergeMessages(merged, realMessages)
          }
          if (tempMessages.length > 0) {
            merged = historySync.mergeMessages(merged, tempMessages)
          }
          merged = historySync.dedupeMessagesByCanonicalKey(merged)

          set({
            messages: merged,
            loading: false,
            error: merged.length > 0 ? null : get().error,
            messagePagination: {
              ...get().messagePagination,
              [sessionId]: {
                nextSkip: apiMessages.length,
                hasMore: apiMessages.length === pageSize,
                loadingOlder: false,
                pageSize,
              },
            },
          })
        } else {
          // prependOlder：上滑加载更早一页
          set((state: any) => ({
            error: null,
            messagePagination: {
              ...state.messagePagination,
              [sessionId]: { ...pagination, loadingOlder: true },
            },
          }))
          const skip = pagination.nextSkip
          let messages: TMessage[] = []
          if (polySaved) {
            try {
              const historyResp = await fetchSavedPolymarketChatHistory(polySaved, {
                offset: skip,
                limit: pagination.pageSize || pageSize,
              })
              const upstreamMessages = Array.isArray(historyResp?.messages) ? historyResp.messages : []
              messages = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
              if (messages.length === 0) {
                const historyResp = await sessionApi.getSessionHistoryDirect(sessionId, {
                  offset: skip,
                  limit: pagination.pageSize || pageSize,
                })
                const w6 = Array.isArray(historyResp?.messages) ? historyResp.messages : []
                messages = mapHistoryMessagesToLocal(sessionId, w6)
              }
            } catch (histErr) {
              console.warn(`[fetchMessagesBySession] polymarket older history:`, histErr)
              try {
                const historyResp = await sessionApi.getSessionHistoryDirect(sessionId, {
                  offset: skip,
                  limit: pagination.pageSize || pageSize,
                })
                const w6 = Array.isArray(historyResp?.messages) ? historyResp.messages : []
                messages = mapHistoryMessagesToLocal(sessionId, w6)
              } catch (w6Err) {
                console.warn(`[fetchMessagesBySession] polymarket older W6 fallback:`, w6Err)
              }
            }
          } else {
            // 使用独立 session 接口（无需 projectId）
            try {
              messages = (await sessionApi.getSessionMessagesDirect(sessionId, {
                skip,
                limit: pagination.pageSize || pageSize,
              })) as TMessage[]
            } catch (directErr: any) {
              const fallbackProjectId = get().activeProjectId || await get().ensureActiveProject()
              if (fallbackProjectId) {
                messages = (await sessionApi.getSessionMessages(fallbackProjectId, sessionId, {
                  skip,
                  limit: pagination.pageSize || pageSize,
                })) as TMessage[]
              } else {
                throw directErr
              }
            }
          }
          if (!isActiveSession()) {
            return
          }
          set((state: any) => {
            const existingIds = new Set(state.messages.map((m: TMessage) => m.id))
            const older = messages.filter((m) => !existingIds.has(m.id))
            let merged = [...older, ...state.messages] as TMessage[]
            merged = historySync.dedupeMessagesByCanonicalKey(merged)
            return {
              messages: merged,
              messagePagination: {
                ...state.messagePagination,
                [sessionId]: {
                  ...pagination,
                  nextSkip: pagination.nextSkip + messages.length,
                  hasMore: messages.length === (pagination.pageSize || pageSize),
                  loadingOlder: false,
                  pageSize: pagination.pageSize || pageSize,
                },
              },
            }
          })
        }
      } catch (error: any) {
        // 即使会话不再是激活状态，也要记录错误并清理加载状态
        console.error(`[fetchMessagesBySession] Failed for ${sessionId}:`, error)
        const stillActive = isActiveSession()
        if (mode === 'replaceLatest') {
          // 只在会话仍激活时更新错误状态（避免覆盖新会话的状态）
          if (stillActive) {
            if (!options?.__historyFallbackTried) {
              try {
                const historyResp = polySaved
                  ? await fetchSavedPolymarketChatHistory(polySaved, { offset: 0, limit: pageSize })
                  : await sessionApi.getSessionHistoryDirect(sessionId, {
                      offset: 0,
                      limit: pageSize,
                    })
                const upstreamMessages = Array.isArray(historyResp?.messages) ? historyResp.messages : []
                if (upstreamMessages.length > 0) {
                  const recovered = mapHistoryMessagesToLocal(sessionId, upstreamMessages)
                  set({
                    messages: recovered,
                    loading: false,
                    error: null,
                    messagePagination: {
                      ...get().messagePagination,
                      [sessionId]: {
                        nextSkip: recovered.length,
                        hasMore: recovered.length === pageSize,
                        loadingOlder: false,
                        pageSize,
                      },
                    },
                  })
                  return
                }
              } catch (historyErr) {
                console.warn(`[fetchMessagesBySession] history fallback after error failed for ${sessionId}:`, historyErr)
              }
            }
            set({
              error: error?.message || '加载消息失败，请稍后重试',
              loading: false,
            })
            const sessionMissing = isSessionNotFoundError(error)
            if (!options?.__retryAfterError && !sessionMissing) {
              window.setTimeout(() => {
                if (get().activeMessageSessionId !== sessionId) return
                void get().fetchMessagesBySession(sessionId, {
                  mode,
                  limit: pageSize,
                  polymarketSavedId: polySaved,
                  __recoveryScheduled: options?.__recoveryScheduled,
                  __retryAfterError: true,
                })
              }, 400)
            }
          }
        } else {
          set((state: any) => ({
            error: stillActive ? (error?.message || '加载消息失败') : state.error,
            messagePagination: {
              ...state.messagePagination,
              [sessionId]: {
                ...pagination,
                loadingOlder: false,
              },
            },
          }))
        }
      } finally {
        if (mode === 'replaceLatest') {
          set((state: any) => ({
            messagesLoadingBySession: {
              ...state.messagesLoadingBySession,
              [sessionId]: false,
            },
          }))
        }
      }
    },

    hydrateSessionMessagesFromCache: (sessionId: string) => {
      set((state: any) => ({
        // 保留 API 形状兼容旧调用；新策略不再从本地缓存恢复消息。
        messages: [],
        messagePagination: {
          ...state.messagePagination,
          [sessionId]: {
            nextSkip: 0,
            hasMore: true,
            loadingOlder: false,
            pageSize: state.messagePagination[sessionId]?.pageSize || 20,
          },
        },
      }))
    },

    setActiveMessageSession: (sessionId?: string) => {
      set({ activeMessageSessionId: sessionId })
    },

    clearSessionMessages: (sessionId?: string) => {
      if (!sessionId) {
        set({ messages: [] })
        return
      }
      set((state: any) => ({
        messages: [],
        messagePagination: {
          ...state.messagePagination,
          [sessionId]: {
            nextSkip: 0,
            hasMore: true,
            loadingOlder: false,
            pageSize: state.messagePagination[sessionId]?.pageSize || 20,
          },
        },
      }))
    },

    loadOlderMessages: async (sessionId: string) => {
      await get().fetchMessagesBySession(sessionId, { mode: 'prependOlder' })
    },

sendMessage: async (sessionId: string, content: string, skillId?: string) => {
       try {
         set({ loading: true, error: null })

         const userMsg = {
           id: 'temp-' + Date.now(),
           session_id: sessionId,
           role: 'user' as const,
           content,
           skill_id: skillId,
           created_at: new Date().toISOString(),
         }
         set((state: any) => ({ messages: [...state.messages, userMsg] }))

         // 非流式发送（备用方案）
         const { chatApi } = await import('@/osint/services/api')
         const response = await chatApi.send({
           message: content,
           projectId: '',
           sessionId,
           skillId,
         })

        set((state: any) => ({
          messages: [...state.messages, response],
          loading: false,
        }))
      } catch (error: any) {
        set({ error: error.message, loading: false })
      }
    },

    // 已废弃：使用 sendMessageWS 替代
    sendMessageStream: async () => {
      console.warn('sendMessageStream is deprecated, use sendMessageWS instead')
    },

    // 已废弃：W6 功能已移除
    sendW6PageFromOutlineStream: async () => {
      console.warn('sendW6PageFromOutlineStream is deprecated')
    },

    syncSessionState: async (
      sessionId: string,
      options?: { refreshMessages?: boolean; upstreamSessionId?: string; activateUpstream?: boolean; force?: boolean }
    ) => {
      const syncKey = sessionId
      const now = Date.now()
      const meta = (get().sessionSyncMeta as any)[syncKey]
      const force = Boolean(options?.force)
      if (meta?.inFlight) {
        return
      }
      if (!force && meta?.isTerminal) {
        return
      }
      if (!force && meta?.lastFailedAt && now - meta.lastFailedAt < 30_000) {
        return
      }
      set((state: any) => ({
        sessionSyncMeta: {
          ...state.sessionSyncMeta,
          [syncKey]: {
            inFlight: true,
            lastAttemptAt: now,
            lastFailedAt: force ? undefined : meta?.lastFailedAt,
            lastSuccessAt: meta?.lastSuccessAt,
            lastError: undefined,
            isTerminal: false,
          },
        },
      }))
      try {
        // 新架构下：直接刷新会话列表和资源列表
        await get().fetchSessions()
        await get().fetchResources(sessionId)
        if (options?.refreshMessages) {
          // 与后端单页上限一致，避免同步时只拉到 20 条覆盖界面
          const polyId = get().wsConnectionMeta?.[sessionId]?.polymarketSavedId
          await get().fetchMessagesBySession(sessionId, {
            limit: 200,
            ...(polyId ? { polymarketSavedId: polyId } : {}),
          })
        }
        set((state: any) => ({
          sessionSyncMeta: {
            ...state.sessionSyncMeta,
            [syncKey]: {
              inFlight: false,
              lastAttemptAt: now,
              lastSuccessAt: Date.now(),
              lastError: undefined,
              isTerminal: false,
            },
          },
        }))
      } catch (error: any) {
        console.warn('sync session state failed:', error?.message || error)
        set((state: any) => ({
          error: state.error,
          sessionSyncMeta: {
            ...state.sessionSyncMeta,
            [syncKey]: {
              inFlight: false,
              lastAttemptAt: now,
              lastFailedAt: Date.now(),
              lastSuccessAt: meta?.lastSuccessAt,
              lastError: error?.message || 'sync failed',
              isTerminal: false,
            },
          },
        }))
      }
    },

    getSessionSyncMeta: (sessionId: string) => {
      return (get().sessionSyncMeta as any)[sessionId]
    },

    getSessionSyncStatus: (sessionId: string) => {
      const meta = (get().sessionSyncMeta as any)[sessionId]
      if (!meta) return 'idle'
      if (meta.inFlight) return 'syncing'
      if (meta.lastFailedAt && Date.now() - meta.lastFailedAt < 30_000) return 'cooldown'
      if (meta.lastError) return 'error'
      return 'ready'
    },
  }
}
