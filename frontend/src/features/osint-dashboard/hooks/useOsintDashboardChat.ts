import { useState, useCallback, useRef, useEffect, type MutableRefObject } from 'react'
import type {
  DashboardChatMessage,
  DashboardSSEEvent,
  DashboardReportItem,
  FormSchema,
  GuidedTopicSnap,
  W6MessageStatus,
  W6StreamEvent,
} from '../types'
import type { SubAgentStatus } from './useSubAgentStream'
import type { FormField, IntelligenceSkill } from '@/osint/types'
import { isW6SkillKey } from '../types'
import {
  buildChatDiscussBody,
  buildChatMessageBody,
  buildChatRespondBody,
  buildChatStartBody,
  extractArtifactResourceId,
  EDIT_HTML_FETCH_TIMEOUT_MS,
  fetchDashboardJSON,
  fetchDashboardSSE,
  fetchSessionReports,
  fetchSessionRestoreState,
  resolveReportPreviewUrl,
  type ChatDiscussResponse,
  type SessionRestoreState,
} from '../lib/osintDashboardApi'
import {
  buildW6FormSummary,
  formatW6UserBubble,
  isSameW6UserContent,
  isW6PrefixedMessage,
  stripW6Prefix,
} from '../lib/w6Message'
import {
  loadSessionSnapshot,
  saveSessionSnapshot,
  type PersistedDashboardSession,
} from '../lib/dashboardSessionCache'
import {
  finalizeSessionMessages,
  mergeSessionMessages,
  mergeSessionMessagesRaw,
} from '../lib/sessionMessageMerge'
import {
  createW6IdleTracker,
  dedupeRunningW6Chips,
  findLastRunningW6Id,
  findLastW6Index,
  hasLiveW6Activity,
  isW6RoundCompleteOnServer,
  isW6RunningOnServer,
  mapServerStreamEvents,
  observeSubAgentStatus,
  sealAbandonedRunningW6,
  sealW6MessageStatuses,
  shouldTreatW6RoundEnded,
  syncW6MessagesWithServerState,
  touchW6StreamActivity,
  type W6IdleTracker,
} from '../lib/w6SessionState'
import { isReportEditIntent } from '../lib/reportEditIntent'
import { repairConversationOrder } from '../lib/conversationOrder'
import { resolveReportItemTitle } from '../lib/reportTitleDisplay'
import {
  deriveSessionTitleFromFormData,
  deriveW6SessionTitle,
  isAutoSessionTitle,
  truncateSessionTitle,
} from '../lib/sessionTitleSync'

let msgCounter = 0
function genId() {
  return `msg-${++msgCounter}-${Date.now()}`
}

function guidedTopicsFingerprint(topics: GuidedTopicSnap[]): string {
  return topics.map((t) => t.text).join('\0')
}

function mapServerMessages(
  server: SessionRestoreState,
): DashboardChatMessage[] {
  const rows = server.messages ?? []
  if (rows.length === 0) return []
  return rows
    .filter((row) => row.role === 'w6' || row.content?.trim())
    .map((row, index) => {
      const role = (
        row.role === 'user' ||
        row.role === 'assistant' ||
        row.role === 'system' ||
        row.role === 'w6'
          ? row.role
          : 'assistant'
      ) as DashboardChatMessage['role']
      const baseTs = Date.now() - rows.length * 1000
      return {
        id: `srv-${index}-${row.timestamp ?? baseTs + index}`,
        role,
        content: row.content,
        timestamp: row.timestamp && row.timestamp > 0 ? row.timestamp : baseTs + index,
        followUpQuestions: row.follow_up_questions ?? null,
        ...(role === 'w6'
          ? {
              w6Status: 'done' as const,
              w6LastLine: row.content || 'W6 调研已完成',
              w6Events: [],
            }
          : {}),
      }
    })
}

function isMarkdownReportType(type?: string): boolean {
  return type === 'document'
}

function buildHtmlReportItem(
  resourceId: string,
  title: string,
  suffix: string,
  markdown?: string,
): DashboardReportItem {
  const previewUrl = resolveReportPreviewUrl(resourceId)
  return {
    id: `${previewUrl}#${suffix}`,
    url: previewUrl,
    resourceId,
    title,
    timestamp: Date.now(),
    kind: 'html',
    markdown,
  }
}

function buildMarkdownReportItem(
  resourceId: string,
  title: string,
  suffix: string,
  markdown?: string,
): DashboardReportItem {
  const previewUrl = resourceId ? resolveReportPreviewUrl(resourceId) : ''
  return {
    id: markdown ? `md-inline#${suffix}` : `${previewUrl || resourceId}#md-${suffix}`,
    url: previewUrl,
    resourceId,
    title,
    timestamp: Date.now(),
    kind: 'markdown',
    markdown,
  }
}

async function loadReportsForSession(sessionId: string): Promise<{
  reports: DashboardReportItem[]
  activeReportId: string | null
}> {
  const serverReports = await fetchSessionReports(sessionId)
  if (serverReports.length === 0) {
    return { reports: [], activeReportId: null }
  }
  const loaded = serverReports.map((r, i) => {
    const resourceId = extractArtifactResourceId(r.url || r.id)
    const title = resolveReportItemTitle(undefined, r.title || '报告')
    if (isMarkdownReportType(r.type)) {
      return buildMarkdownReportItem(resourceId, title, `r${i}`)
    }
    return buildHtmlReportItem(resourceId || r.url || r.id, title, `r${i}`)
  })
  const htmlReports = loaded.filter((r) => r.kind === 'html')
  const active =
    htmlReports.length > 0 ? htmlReports[htmlReports.length - 1].id : loaded[loaded.length - 1].id
  return {
    reports: loaded,
    activeReportId: active,
  }
}

function applyPersisted(
  saved: PersistedDashboardSession,
  setters: {
    setMessages: (v: DashboardChatMessage[]) => void
    setReports: (v: DashboardReportItem[]) => void
    setActiveReportId: (v: string | null) => void
    setFollowUpQuestions: (v: string[]) => void
    setSessionId: (v: string | null) => void
    setW6StreamEnabled: (v: boolean) => void
    setSkillKey: (v: string | null) => void
  },
  refs: {
    sessionIdRef: MutableRefObject<string | null>
    skillKeyRef: MutableRefObject<string | null>
  },
  intelligenceSkills: IntelligenceSkill[],
) {
  setters.setMessages(saved.messages)
  setters.setReports(
    (saved.reports ?? []).map((r) => ({
      ...r,
      resourceId: r.resourceId || extractArtifactResourceId(r.url),
      kind: r.kind || 'html',
    })),
  )
  setters.setActiveReportId(saved.activeReportId)
  setters.setFollowUpQuestions(saved.followUpQuestions ?? [])
  if (saved.sessionId) {
    refs.sessionIdRef.current = saved.sessionId
    setters.setSessionId(saved.sessionId)
  }
  if (saved.skillKey) {
    refs.skillKeyRef.current = saved.skillKey
    setters.setSkillKey(saved.skillKey)
    if (isW6SkillKey(saved.skillKey, intelligenceSkills) && saved.sessionId) {
      setters.setW6StreamEnabled(true)
    }
  }
}

export type SessionTitleSyncOptions = {
  getSessionTitle?: (sessionId: string) => string | undefined
  syncSessionTitle?: (sessionId: string, title: string) => void | Promise<void>
}

export function useOsintDashboardChat(
  userId: string | undefined,
  intelligenceSkills: IntelligenceSkill[] = [],
  sessionTitleSync?: SessionTitleSyncOptions,
) {
  const [messages, setMessages] = useState<DashboardChatMessage[]>([])
  const [reports, setReports] = useState<DashboardReportItem[]>([])
  const [activeReportId, setActiveReportId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('')
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [w6StreamEnabled, setW6StreamEnabled] = useState(false)
  const [w6StreamRound, setW6StreamRound] = useState(0)
  const [skillKey, setSkillKey] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  const assistantTextRef = useRef('')
  const assistantIdRef = useRef('')
  const activeW6MessageIdRef = useRef('')
  const sessionIdRef = useRef<string | null>(null)
  const skillKeyRef = useRef<string | null>(null)
  const pendingMarkdownRef = useRef<{ markdown: string; title?: string } | null>(null)
  const discussPollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const restoreGenRef = useRef(0)
  const restoringSessionRef = useRef<string | null>(null)
  const w6IdleTrackerRef = useRef<W6IdleTracker>(createW6IdleTracker())
  const w6StreamAttachRef = useRef<string | null>(null)
  const messagesRef = useRef<DashboardChatMessage[]>([])
  const [activeW6MessageId, setActiveW6MessageId] = useState<string | null>(null)
  const sessionTitleSyncRef = useRef(sessionTitleSync)
  sessionTitleSyncRef.current = sessionTitleSync

  const observeServerW6Status = useCallback((server: SessionRestoreState | null) => {
    if (!server) return
    w6IdleTrackerRef.current = observeSubAgentStatus(
      w6IdleTrackerRef.current,
      server.sub_agent_status,
    )
  }, [])

  const attachW6StreamIfNeeded = useCallback((liveW6Id: string | null, needsStream: boolean) => {
    if (!needsStream || !liveW6Id) {
      w6StreamAttachRef.current = null
      setW6StreamEnabled(false)
      return
    }
    setW6StreamEnabled(true)
    if (w6StreamAttachRef.current !== liveW6Id) {
      w6StreamAttachRef.current = liveW6Id
      setW6StreamRound((n) => n + 1)
    }
  }, [])

  const sealActiveW6FromIdle = useCallback((events: W6StreamEvent[] = []) => {
    const id = activeW6MessageIdRef.current
    if (!id) return false
    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.id === id && m.role === 'w6' && m.w6Status === 'running'
          ? {
              ...m,
              w6Status: 'done' as W6MessageStatus,
              w6Events: events.length > 0 ? events : m.w6Events,
              w6LastLine: m.w6LastLine || '调研完成',
            }
          : m,
      )
      return sealW6MessageStatuses(updated, null)
    })
    activeW6MessageIdRef.current = ''
    setActiveW6MessageId(null)
    w6StreamAttachRef.current = null
    setW6StreamEnabled(false)
    return true
  }, [])

  const applySessionTitle = useCallback((targetSessionId: string, rawTitle: string) => {
    const title = truncateSessionTitle(rawTitle)
    if (!title) return
    const sync = sessionTitleSyncRef.current
    const current = sync?.getSessionTitle?.(targetSessionId)
    if (current != null && !isAutoSessionTitle(current)) return
    void sync?.syncSessionTitle?.(targetSessionId, title)
  }, [])

  const stopDiscussPoll = useCallback(() => {
    if (discussPollRef.current) {
      clearInterval(discussPollRef.current)
      discussPollRef.current = null
    }
  }, [])

  const startDiscussPoll = useCallback(
    (targetSessionId: string, saved: PersistedDashboardSession | null) => {
      stopDiscussPoll()
      discussPollRef.current = setInterval(() => {
        void (async () => {
          try {
            if (sessionIdRef.current !== targetSessionId) {
              stopDiscussPoll()
              return
            }
            const state = await fetchSessionRestoreState(targetSessionId)
            if (sessionIdRef.current !== targetSessionId) return
            if (!state?.discuss_active) {
              stopDiscussPoll()
              const serverMsgs = mapServerMessages(state ?? { messages: [] })
              const merged = mergeSessionMessages(serverMsgs, saved?.messages ?? [])
              setMessages(finalizeSessionMessages(merged))
              setFollowUpQuestions(state?.follow_ups ?? [])
              setIsStreaming(false)
              setCurrentPhase('')
              try {
                const { reports: loadedReports, activeReportId: loadedActiveId } =
                  await loadReportsForSession(targetSessionId)
                if (loadedReports.length > 0) {
                  setReports(loadedReports)
                  setActiveReportId(loadedActiveId)
                }
              } catch {
                /* offline */
              }
            }
          } catch {
            /* offline */
          }
        })()
      }, 2500)
    },
    [stopDiscussPoll],
  )

  const persist = useCallback(() => {
    const uid = userId
    const sid = sessionIdRef.current
    if (!uid || !sid) return
    if (restoringSessionRef.current) return
    if (messages.length === 0 && reports.length === 0) return
    saveSessionSnapshot(uid, sid, {
      messages,
      reports,
      activeReportId,
      followUpQuestions,
      skillKey: skillKeyRef.current,
    })
  }, [userId, messages, reports, activeReportId, followUpQuestions])

  useEffect(() => {
    persist()
  }, [persist])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const addMessage = useCallback((msg: Omit<DashboardChatMessage, 'id' | 'timestamp'>) => {
    const full: DashboardChatMessage = { ...msg, id: genId(), timestamp: Date.now() }
    setMessages((prev) => repairConversationOrder([...prev, full]))
    return full.id
  }, [])

  /** Append W6 running chip; optionally prepend a user bubble (skip when form chip already shows params). */
  const appendW6Round = useCallback((userContent?: string): string => {
    const now = Date.now()
    const trimmedUser = userContent?.trim() ?? ''
    const userMsg: DashboardChatMessage | null = trimmedUser
      ? {
          id: genId(),
          role: 'user',
          content: trimmedUser,
          timestamp: now,
        }
      : null
    const w6Msg: DashboardChatMessage = {
      id: genId(),
      role: 'w6',
      content: '',
      timestamp: userMsg ? now + 1 : now,
      w6Status: 'running',
      w6Progress: 0,
      w6LastLine: '正在启动 W6 子 Agent…',
      w6Events: [],
    }
    let resolvedW6Id = w6Msg.id

    setMessages((prev) => {
      for (let i = prev.length - 1; i >= 0; i--) {
        const m = prev[i]
        if (m.role !== 'w6' || m.w6Status !== 'running') continue
        if (!trimmedUser) break
        const anchor = prev[i - 1]
        if (
          anchor?.role === 'user' &&
          isSameW6UserContent(anchor.content, trimmedUser)
        ) {
          resolvedW6Id = m.id
          return prev
        }
        break
      }

      const clearedGuided = prev.filter(
        (m) => !(m.role === 'guided_topics' && m.guidedTopicsStatus !== 'used'),
      )
      const sealed = sealAbandonedRunningW6(clearedGuided, null)
      let anchorTs = now
      for (const m of sealed) {
        if (m.timestamp >= anchorTs) anchorTs = m.timestamp + 1
      }
      if (userMsg) {
        userMsg.timestamp = anchorTs
        w6Msg.timestamp = anchorTs + 1
      } else {
        for (let k = sealed.length - 1; k >= 0; k--) {
          const m = sealed[k]
          if (m.role === 'form' && m.formStatus === 'submitted') {
            w6Msg.timestamp = Math.max(anchorTs, m.timestamp + 1)
            break
          }
        }
        if (w6Msg.timestamp <= anchorTs) {
          w6Msg.timestamp = anchorTs
        }
      }
      resolvedW6Id = w6Msg.id
      const next = userMsg ? [...sealed, userMsg, w6Msg] : [...sealed, w6Msg]
      return repairConversationOrder(next)
    })

    activeW6MessageIdRef.current = resolvedW6Id
    setActiveW6MessageId(resolvedW6Id)
    if (resolvedW6Id === w6Msg.id) {
      w6IdleTrackerRef.current = observeSubAgentStatus(createW6IdleTracker(), 'running')
      w6StreamAttachRef.current = resolvedW6Id
      setW6StreamEnabled(true)
      setW6StreamRound((n) => n + 1)
    } else {
      setW6StreamEnabled(true)
    }
    return resolvedW6Id
  }, [])

  const appendUserThenW6Round = useCallback(
    (userContent: string) => appendW6Round(userContent),
    [appendW6Round],
  )

  const syncActiveW6Message = useCallback(
    (payload: {
      progress: number
      lastLine: string
      events: W6StreamEvent[]
      status: SubAgentStatus
    }) => {
      const id = activeW6MessageIdRef.current
      if (!id) return

      const hasLiveEvents = payload.events.some(
        (e) => e.type !== 'done' && e.type !== 'stopped' && e.type !== 'error',
      )
      if (payload.status === 'running' && hasLiveEvents) {
        w6IdleTrackerRef.current = touchW6StreamActivity(w6IdleTrackerRef.current)
      }

      let w6Status: W6MessageStatus = 'running'
      if (payload.status === 'error') {
        w6Status = 'error'
      } else if (payload.events.some((e) => e.type === 'stopped')) {
        w6Status = 'stopped'
      } else if (
        payload.events.some((e) => e.type === 'done') &&
        hasLiveW6Activity(payload.events)
      ) {
        w6Status = 'done'
      } else if (
        shouldTreatW6RoundEnded(
          w6IdleTrackerRef.current.lastSubAgentStatus,
          w6IdleTrackerRef.current.lastRunningAt,
          payload.events,
          Date.now(),
          payload.events,
        )
      ) {
        w6Status = 'done'
      }

      setMessages((prev) => {
        const updated = prev.map((m) =>
          m.id === id
            ? {
                ...m,
                w6Status,
                w6Progress: payload.progress,
                w6LastLine: payload.lastLine,
                w6Events: payload.events,
              }
            : m,
        )
        if (w6Status === 'done' || w6Status === 'error' || w6Status === 'stopped') {
          return sealW6MessageStatuses(updated, null)
        }
        return updated
      })

      if (w6Status === 'done' || w6Status === 'error' || w6Status === 'stopped') {
        activeW6MessageIdRef.current = ''
        setActiveW6MessageId(null)
        w6StreamAttachRef.current = null
        if (w6Status === 'done') {
          const sid = sessionIdRef.current
          if (sid) {
            void loadReportsForSession(sid).then(({ reports, activeReportId }) => {
              if (reports.length > 0) {
                setReports(reports)
                setActiveReportId(activeReportId)
              }
            })
          }
        }
      }
    },
    [],
  )

  const appendAssistantText = useCallback((delta: string) => {
    assistantTextRef.current += delta
    const id = assistantIdRef.current
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === id)
      if (idx === -1) return prev
      const updated = [...prev]
      updated[idx] = { ...updated[idx], content: assistantTextRef.current }
      return updated
    })
  }, [])

  const createSSEHandler = useCallback(() => {
    return (event: DashboardSSEEvent) => {
      const w6Active = Boolean(activeW6MessageIdRef.current)
      switch (event.type) {
        case 'text_delta':
          if (!w6Active) appendAssistantText(event.delta || '')
          break
        case 'phase':
          if (!w6Active) setCurrentPhase(event.message || event.phase || '')
          break
        case 'form_request':
          if (event.schema) {
            const prompt = event.message || '请补充信息'
            setMessages((prev) => {
              const hasPending = prev.some(
                (m) => m.role === 'form' && m.formStatus === 'pending' && !m.skillKey,
              )
              if (hasPending) return prev
              const full: DashboardChatMessage = {
                id: genId(),
                role: 'form',
                content: prompt,
                timestamp: Date.now(),
                formPrompt: prompt,
                formSchema: event.schema as FormSchema,
                formStatus: 'pending',
                stepMode: false,
              }
              return [...prev, full]
            })
          }
          break
        case 'report_md':
          if (event.markdown?.trim()) {
            pendingMarkdownRef.current = {
              markdown: event.markdown,
              title: event.title,
            }
            setReports((prev) => {
              if (
                prev.some(
                  (r) => r.kind === 'markdown' && r.markdown === event.markdown,
                )
              ) {
                return prev
              }
              return [
                ...prev,
                buildMarkdownReportItem(
                  '',
                  resolveReportItemTitle(event.markdown, event.title || event.roundTitle),
                  `sse-${Date.now()}`,
                  event.markdown,
                ),
              ]
            })
          }
          break
        case 'report_html':
          if (event.url || event.id) {
            const raw = event.url || event.id || ''
            const resourceId = extractArtifactResourceId(raw)
            const pending = pendingMarkdownRef.current
            const report = buildHtmlReportItem(
              resourceId || raw,
              resolveReportItemTitle(pending?.markdown, event.title || event.roundTitle || '未命名报告'),
              String(Date.now()),
              pending?.markdown,
            )
            setReports((prev) => [...prev, report])
            setActiveReportId(report.id)
            if (resourceId) {
              const w6Id = activeW6MessageIdRef.current
              setMessages((prev) => {
                let idx = w6Id ? prev.findIndex((m) => m.id === w6Id) : -1
                if (idx < 0) {
                  idx = prev.reduce((last, m, i) => (m.role === 'w6' ? i : last), -1)
                }
                if (idx < 0) return prev
                const updated = [...prev]
                updated[idx] = { ...updated[idx], previewResourceId: resourceId }
                return updated
              })
            }

            if (pending?.markdown?.trim()) {
              const mdFromArtifact = buildMarkdownReportItem(
                '',
                resolveReportItemTitle(pending.markdown, event.title || event.roundTitle),
                `paired-${Date.now()}`,
                pending.markdown,
              )
              setReports((prev) => {
                const alreadyHasMd = prev.some(
                  (r) =>
                    r.kind === 'markdown' &&
                    (r.markdown === pending.markdown || r.title === mdFromArtifact.title),
                )
                if (alreadyHasMd) return prev
                return [...prev, mdFromArtifact]
              })
              pendingMarkdownRef.current = null
            }
          }
          break
        case 'follow_up':
          if (event.questions?.length && w6Active) {
            setFollowUpQuestions(event.questions)
          }
          break
        case 'session':
          if (event.sessionId) {
            const sid = String(event.sessionId)
            sessionIdRef.current = sid
            setSessionId(sid)
            if (isW6SkillKey(skillKeyRef.current, intelligenceSkills)) {
              setW6StreamEnabled(true)
            }
          }
          break
        case 'session_title':
          if (event.title?.trim()) {
            const sid = String(event.sessionId || sessionIdRef.current || '').trim()
            if (sid) applySessionTitle(sid, event.title)
          }
          break
        case 'error':
          if (w6Active) {
            const w6Id = activeW6MessageIdRef.current
            setMessages((prev) =>
              prev.map((m) =>
                m.id === w6Id
                  ? {
                      ...m,
                      w6Status: 'error' as W6MessageStatus,
                      w6LastLine: event.message || 'W6 执行出错',
                    }
                  : m,
              ),
            )
            activeW6MessageIdRef.current = ''
            setActiveW6MessageId(null)
          } else {
            appendAssistantText(`\n\n⚠️ ${event.message}`)
          }
          break
      }
    }
  }, [appendAssistantText, applySessionTitle, intelligenceSkills])

  const readSSEStream = useCallback(
    async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
      const handleEvent = createSSEHandler()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const json = line.slice(6).trim()
          if (!json) continue
          try {
            handleEvent(JSON.parse(json) as DashboardSSEEvent)
          } catch {
            /* skip */
          }
        }
      }
    },
    [createSSEHandler],
  )

  const startChat = useCallback(
    async (
      skillKey: string,
      skillName: string,
      formData: Record<string, unknown>,
      activeSessionId: string,
      renderedPrompt?: string,
      reportStyle?: string,
    ) => {
      const sid = activeSessionId.trim()
      if (!sid) {
        throw new Error('session_id required before starting W6 chat')
      }
      if (!skillKey.trim()) {
        throw new Error('skill_key required before starting W6 chat')
      }

      setReports([])
      setActiveReportId(null)
      setFollowUpQuestions([])
      assistantTextRef.current = ''
      skillKeyRef.current = skillKey
      setSkillKey(skillKey)
      sessionIdRef.current = sid
      setSessionId(sid)
      applySessionTitle(
        sid,
        deriveSessionTitleFromFormData(formData, skillName) || skillName,
      )
      if (!isW6SkillKey(skillKey, intelligenceSkills)) {
        setW6StreamEnabled(false)
      }
      setIsStreaming(true)

      // Submitted skill form chip already records params; avoid a duplicate @w6 user bubble.
      appendW6Round()
      assistantIdRef.current = ''

      const abort = new AbortController()
      abortRef.current = abort

      try {
        const reader = await fetchDashboardSSE(
          '/osint-dashboard/chat/start',
          buildChatStartBody({
            sessionId: sid,
            skillKey,
            formData,
            renderedPrompt,
            reportStyle,
          }),
          abort.signal,
        )
        await readSSEStream(reader)
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return
        appendAssistantText(`\n\n❌ 错误: ${(err as Error).message}`)
      } finally {
        setIsStreaming(false)
        setCurrentPhase('')
        abortRef.current = null
      }
    },
    [appendAssistantText, appendW6Round, applySessionTitle, readSSEStream],
  )

  const markFormSubmitted = useCallback(
    (messageId: string, formData: Record<string, unknown>) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.role === 'form'
            ? { ...m, formStatus: 'submitted', formData }
            : m,
        ),
      )
    },
    [],
  )

  const cancelFormMessage = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.role === 'form' && m.formStatus === 'pending'
          ? { ...m, formStatus: 'cancelled' }
          : m,
      ),
    )
  }, [])

  const cancelOtherPendingForms = useCallback(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.role === 'form' && m.formStatus === 'pending'
          ? { ...m, formStatus: 'cancelled' }
          : m,
      ),
    )
  }, [])

  const addSkillFormMessage = useCallback(
    (
      skill: Pick<IntelligenceSkill, 'id' | 'key' | 'name'>,
      fields: FormField[],
    ): string => {
      cancelOtherPendingForms()
      return addMessage({
        role: 'form',
        content: `${skill.name} — 请填写参数`,
        skillKey: skill.key,
        skillName: skill.name,
        skillId: skill.id,
        formSchema: { fields },
        formStatus: 'pending',
        stepMode: true,
      })
    },
    [addMessage, cancelOtherPendingForms],
  )

  const respondToForm = useCallback(
    async (
      formData: Record<string, unknown>,
      renderedPrompt?: string,
      formMessageId?: string,
    ) => {
      if (formMessageId) {
        markFormSubmitted(formMessageId, formData)
      }
      setIsStreaming(true)

      const summary = buildW6FormSummary(formData)
      appendUserThenW6Round(
        formatW6UserBubble(`补充信息${summary ? `\n${summary}` : ''}`),
      )
      assistantIdRef.current = ''

      const abort = new AbortController()
      abortRef.current = abort

      try {
        const sid = sessionIdRef.current
        if (!sid) throw new Error('session_id required')
        const reader = await fetchDashboardSSE(
          '/osint-dashboard/chat/respond',
          buildChatRespondBody({ sessionId: sid, formData, renderedPrompt }),
          abort.signal,
        )
        await readSSEStream(reader)
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return
        appendAssistantText(`\n\n❌ ${(err as Error).message}`)
      } finally {
        setIsStreaming(false)
        setCurrentPhase('')
        abortRef.current = null
      }
    },
    [appendAssistantText, appendUserThenW6Round, markFormSubmitted, readSSEStream],
  )

  const runW6MessageRound = useCallback(
    async (displayText: string, w6Payload: string) => {
      const sid = sessionIdRef.current
      if (!sid) {
        addMessage({ role: 'system', content: '⚠️ 请先完成一个研究任务，再开始追问' })
        return
      }

      setIsStreaming(true)

      appendUserThenW6Round(displayText)
      applySessionTitle(sid, deriveW6SessionTitle(w6Payload))
      assistantIdRef.current = ''
      assistantTextRef.current = ''

      const abort = new AbortController()
      abortRef.current = abort

      try {
        const reader = await fetchDashboardSSE(
          '/osint-dashboard/chat/message',
          buildChatMessageBody({ sessionId: sid, message: w6Payload }),
          abort.signal,
        )
        await readSSEStream(reader)
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return
        appendAssistantText(`\n\n❌ ${(err as Error).message}`)
      } finally {
        setIsStreaming(false)
        setCurrentPhase('')
        abortRef.current = null
      }
    },
    [addMessage, appendAssistantText, appendUserThenW6Round, applySessionTitle, readSSEStream],
  )

  const runDiscussRound = useCallback(
    async (text: string, targetResourceId?: string) => {
      const sid = sessionIdRef.current
      if (!sid) {
        addMessage({ role: 'system', content: '⚠️ 请先完成一个研究任务，再开始追问' })
        return
      }

      const isEdit = Boolean(targetResourceId?.trim())
      setIsStreaming(true)
      setCurrentPhase(isEdit ? '改版式中…' : '正在分析报告…')

      addMessage({ role: 'user', content: text })
      const id = addMessage({ role: 'assistant', content: '' })
      assistantIdRef.current = id
      assistantTextRef.current = ''

      const abort = new AbortController()
      abortRef.current = abort
      let editTimeoutId: ReturnType<typeof setTimeout> | undefined
      if (isEdit) {
        editTimeoutId = setTimeout(() => abort.abort(), EDIT_HTML_FETCH_TIMEOUT_MS)
      }

      try {
        const data = await fetchDashboardJSON<ChatDiscussResponse>(
          '/osint-dashboard/chat/discuss',
          buildChatDiscussBody({
            sessionId: sid,
            message: text,
            targetResourceId: isEdit ? targetResourceId : undefined,
          }),
          abort.signal,
        )
        const reply = (data.reply ?? '').trim() || '（无回复）'
        assistantTextRef.current = reply
        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === id)
          if (idx === -1) return prev
          const updated = [...prev]
          updated[idx] = {
            ...updated[idx],
            content: reply,
            previewResourceId:
              data.edited && data.html_resource_id ? data.html_resource_id : undefined,
          }
          return updated
        })

        if (data.edited && data.html_resource_id) {
          const newPreview = resolveReportPreviewUrl(data.html_resource_id)
          const activeId = activeReportId
          setReports((prev) =>
            prev.map((r) => {
              if (activeId && r.id !== activeId) return r
              if (!activeId && prev.length > 0 && r.id !== prev[prev.length - 1].id) return r
              return {
                ...r,
                url: `${newPreview}${newPreview.includes('?') ? '&' : '?'}t=${Date.now()}`,
                resourceId: data.html_resource_id!,
                timestamp: Date.now(),
              }
            }),
          )
        }
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') {
          if (isEdit) {
            appendAssistantText(
              '\n\n❌ 报告改版式请求超时，请稍后重试或尝试更简短的修改指令。',
            )
          }
          return
        }
        appendAssistantText(`\n\n❌ ${(err as Error).message}`)
      } finally {
        if (editTimeoutId !== undefined) clearTimeout(editTimeoutId)
        setIsStreaming(false)
        setCurrentPhase('')
        abortRef.current = null
      }
    },
    [addMessage, appendAssistantText, activeReportId],
  )

  /** Follow-up chips and explicit W6 commands — shows `@w6 ` bubble then runs W6. */
  const sendW6Message = useCallback(
    async (question: string) => {
      if (!question.trim() || isStreaming) return
      const display = formatW6UserBubble(question.trim())
      await runW6MessageRound(display, question.trim())
    },
    [isStreaming, runW6MessageRound],
  )

  /** Bottom input: `@w6 …` → W6; active report tab → HTML edit; else discuss on markdown. */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return
      const trimmed = text.trim()
      if (isW6PrefixedMessage(trimmed)) {
        await runW6MessageRound(trimmed, stripW6Prefix(trimmed))
        return
      }
      const active = activeReportId
        ? reports.find((r) => r.id === activeReportId)
        : reports[reports.length - 1]
      const resourceId =
        active?.resourceId?.trim() || extractArtifactResourceId(active?.url || '')
      const targetResourceId =
        resourceId && isReportEditIntent(trimmed) ? resourceId : undefined
      await runDiscussRound(trimmed, targetResourceId)
    },
    [isStreaming, runW6MessageRound, runDiscussRound, activeReportId, reports],
  )

  const restoreSession = useCallback(
    async (targetSessionId: string) => {
      const restoreGen = ++restoreGenRef.current
      restoringSessionRef.current = targetSessionId

      abortRef.current?.abort()
      stopDiscussPoll()
      setIsStreaming(false)
      setCurrentPhase('')
      assistantTextRef.current = ''
      assistantIdRef.current = ''
      activeW6MessageIdRef.current = ''
      setActiveW6MessageId(null)
      w6IdleTrackerRef.current = createW6IdleTracker()
      w6StreamAttachRef.current = null
      setW6StreamEnabled(false)
      setW6StreamRound(0)
      setMessages([])
      setReports([])
      setActiveReportId(null)
      setFollowUpQuestions([])
      sessionIdRef.current = targetSessionId
      setSessionId(targetSessionId)

      const isCurrentRestore = () =>
        restoreGenRef.current === restoreGen && restoringSessionRef.current === targetSessionId

      const saved = userId ? loadSessionSnapshot(userId, targetSessionId) : null
      let server: SessionRestoreState | null = null
      try {
        server = await fetchSessionRestoreState(targetSessionId)
      } catch {
        /* offline */
      }

      if (!isCurrentRestore()) return

      const serverMessages = server ? mapServerMessages(server) : []
      const hasSavedMessages = Boolean(saved?.messages?.length)
      const useLocalSnapshot = hasSavedMessages && serverMessages.length === 0

      const resolvedSkillKey =
        server?.skill_key?.trim() ||
        saved?.skillKey?.trim() ||
        null
      skillKeyRef.current = resolvedSkillKey
      setSkillKey(resolvedSkillKey)

      observeServerW6Status(server)
      const lastRunningAt = w6IdleTrackerRef.current.lastRunningAt
      const serverRunning = isW6RunningOnServer(server, lastRunningAt)
      const streamEvents = mapServerStreamEvents(server?.stream_events)
      const roundComplete = isW6RoundCompleteOnServer(server, streamEvents)
      let restoredMessages: DashboardChatMessage[] = []

      if (hasSavedMessages && saved) {
        restoredMessages =
          serverMessages.length > 0
            ? mergeSessionMessagesRaw(serverMessages, saved.messages)
            : saved.messages
        setReports(
          (saved.reports ?? []).map((r) => ({
            ...r,
            resourceId: r.resourceId || extractArtifactResourceId(r.url),
            kind: r.kind || 'html',
          })),
        )
        setActiveReportId(saved.activeReportId)
        setFollowUpQuestions(server?.follow_ups?.length ? server.follow_ups : (saved.followUpQuestions ?? []))
      } else if (serverMessages.length > 0) {
        restoredMessages = serverMessages
        setFollowUpQuestions(server?.follow_ups ?? [])
      } else {
        const placeholder = serverRunning || !roundComplete
          ? '已重连进行中的会话，W6 子 Agent 状态见下方进度条。'
          : '已加载会话。可继续追问或选择技能开始新任务。'
        restoredMessages = [
          {
            id: genId(),
            role: 'system',
            content: placeholder,
            timestamp: Date.now(),
          },
        ]
        setFollowUpQuestions(server?.follow_ups ?? [])
      }

      const syncedMessages = syncW6MessagesWithServerState(
        restoredMessages,
        server,
        w6IdleTrackerRef.current,
      )
      const dedupedOnce = dedupeRunningW6Chips(syncedMessages)
      let liveW6Id = findLastRunningW6Id(dedupedOnce)
      const dedupedMessages = dedupeRunningW6Chips(dedupedOnce, liveW6Id)
      let finalized = finalizeSessionMessages(dedupedMessages, liveW6Id)

      if (!isCurrentRestore()) return

      if (serverRunning && !liveW6Id) {
        const lastW6Idx = findLastW6Index(finalized)
        const lastW6 = lastW6Idx >= 0 ? finalized[lastW6Idx] : null
        if (lastW6?.w6Status === 'running') {
          const revivedId = lastW6.id
          finalized = finalized.map((m, i) =>
            i === lastW6Idx
              ? {
                  ...m,
                  w6Status: 'running' as const,
                  w6Events:
                    streamEvents.length >= (m.w6Events?.length ?? 0)
                      ? streamEvents
                      : (m.w6Events ?? streamEvents),
                  w6LastLine: m.w6LastLine || 'W6 子 Agent 运行中…',
                }
              : m,
          )
          liveW6Id = revivedId
        } else {
          let ts = Date.now()
          for (const m of finalized) {
            if (m.timestamp >= ts) ts = m.timestamp + 1
          }
          const w6Id = genId()
          finalized = repairConversationOrder([
            ...finalized,
            {
              id: w6Id,
              role: 'w6',
              content: '',
              timestamp: ts,
              w6Status: 'running',
              w6Progress: 0,
              w6LastLine: 'W6 子 Agent 运行中…',
              w6Events: streamEvents,
            },
          ])
          liveW6Id = w6Id
        }
      }

      if (!isCurrentRestore()) return

      setMessages(finalized)
      activeW6MessageIdRef.current = liveW6Id ?? ''
      setActiveW6MessageId(liveW6Id)

      if (isW6SkillKey(resolvedSkillKey, intelligenceSkills)) {
        const needsW6Stream = Boolean(liveW6Id) && (serverRunning || !roundComplete)
        attachW6StreamIfNeeded(liveW6Id, needsW6Stream)
      } else {
        attachW6StreamIfNeeded(null, false)
      }

      if (!isCurrentRestore()) return

      if (server?.discuss_active) {
        const phase =
          server.discuss_mode === 'edit_html' ? '改版式中…' : '分析报告中…'
        setCurrentPhase(phase)
        setIsStreaming(true)
        startDiscussPoll(targetSessionId, saved)
      }

      const shouldLoadReports =
        !hasSavedMessages ||
        (saved?.reports?.length ?? 0) === 0 ||
        roundComplete
      if (shouldLoadReports) {
        try {
          const { reports: loadedReports, activeReportId: loadedActiveId } =
            await loadReportsForSession(targetSessionId)
          if (!isCurrentRestore()) return
          if (loadedReports.length > 0) {
            setReports(loadedReports)
            setActiveReportId(loadedActiveId)
          } else if (server?.last_html_resource_id?.trim()) {
            const report = buildHtmlReportItem(
              server.last_html_resource_id.trim(),
              '报告',
              `restore-${Date.now()}`,
            )
            setReports([report])
            setActiveReportId(report.id)
          }
        } catch {
          /* offline */
        }
      }

      if (isCurrentRestore()) {
        restoringSessionRef.current = null
      }
    },
    [
      userId,
      startDiscussPoll,
      stopDiscussPoll,
      intelligenceSkills,
      observeServerW6Status,
      attachW6StreamIfNeeded,
    ],
  )

  /** Reconcile local W6 UI with server after laptop sleep / tab resume. */
  const syncSessionFromServer = useCallback(async () => {
    const sid = sessionIdRef.current
    if (!sid || restoringSessionRef.current) return

    let server: SessionRestoreState | null = null
    try {
      server = await fetchSessionRestoreState(sid)
    } catch {
      return
    }
    if (!server || sessionIdRef.current !== sid || restoringSessionRef.current) return

    observeServerW6Status(server)
    const streamEvents = mapServerStreamEvents(server.stream_events)
    const roundComplete = isW6RoundCompleteOnServer(server, streamEvents)
    const w6Active = isW6RunningOnServer(server, w6IdleTrackerRef.current.lastRunningAt)
    let nextLiveId: string | null = null

    setMessages((prev) => {
      const synced = syncW6MessagesWithServerState(prev, server, w6IdleTrackerRef.current)
      const dedupedOnce = dedupeRunningW6Chips(synced, activeW6MessageIdRef.current || null)
      nextLiveId = findLastRunningW6Id(dedupedOnce)
      let deduped = dedupeRunningW6Chips(dedupedOnce, nextLiveId)
      const activeChipEvents = nextLiveId
        ? (deduped.find((m) => m.id === nextLiveId)?.w6Events ?? [])
        : []
      if (
        nextLiveId &&
        shouldTreatW6RoundEnded(
          server.sub_agent_status,
          w6IdleTrackerRef.current.lastRunningAt,
          streamEvents,
          Date.now(),
          activeChipEvents,
        )
      ) {
        deduped = deduped.map((m) =>
          m.id === nextLiveId && m.role === 'w6' && m.w6Status === 'running'
            ? {
                ...m,
                w6Status: 'done' as W6MessageStatus,
                w6Events:
                  streamEvents.length >= (m.w6Events?.length ?? 0)
                    ? streamEvents
                    : (m.w6Events ?? streamEvents),
                w6LastLine: m.w6LastLine || '调研完成',
              }
            : m,
        )
        nextLiveId = null
      }
      return finalizeSessionMessages(deduped, nextLiveId)
    })

    if (sessionIdRef.current !== sid) return

    activeW6MessageIdRef.current = nextLiveId ?? ''
    setActiveW6MessageId(nextLiveId)

    if (server.follow_ups?.length) {
      setFollowUpQuestions(server.follow_ups)
    }

    const needsReconnect = Boolean(nextLiveId) && (w6Active || !roundComplete)
    attachW6StreamIfNeeded(nextLiveId, needsReconnect)

    if (!roundComplete || sessionIdRef.current !== sid) return

    try {
      const { reports: loadedReports, activeReportId: loadedActiveId } =
        await loadReportsForSession(sid)
      if (sessionIdRef.current !== sid) return
      if (loadedReports.length > 0) {
        setReports(loadedReports)
        setActiveReportId(loadedActiveId)
      } else if (server.last_html_resource_id?.trim()) {
        const report = buildHtmlReportItem(
          server.last_html_resource_id.trim(),
          '报告',
          `sync-${Date.now()}`,
        )
        setReports([report])
        setActiveReportId(report.id)
      }
    } catch {
      /* offline */
    }
  }, [attachW6StreamIfNeeded, observeServerW6Status, sealActiveW6FromIdle])

  useEffect(() => {
    if (!activeW6MessageId || restoringSessionRef.current) return
    const tick = setInterval(() => {
      void (async () => {
        const sid = sessionIdRef.current
        if (!sid || restoringSessionRef.current) return
        try {
          const server = await fetchSessionRestoreState(sid)
          if (sessionIdRef.current !== sid) return
          observeServerW6Status(server)
          const events = mapServerStreamEvents(server?.stream_events)
          const activeId = activeW6MessageIdRef.current
          const chipEvents = activeId
            ? (messagesRef.current.find((m) => m.id === activeId)?.w6Events ?? [])
            : []
          if (
            shouldTreatW6RoundEnded(
              server?.sub_agent_status,
              w6IdleTrackerRef.current.lastRunningAt,
              events,
              Date.now(),
              chipEvents,
            )
          ) {
            sealActiveW6FromIdle(events)
          }
        } catch {
          /* offline */
        }
      })()
    }, 5000)
    return () => clearInterval(tick)
  }, [activeW6MessageId, observeServerW6Status, sealActiveW6FromIdle])

  const resetForNewSkill = useCallback(() => {
    abortRef.current?.abort()
    stopDiscussPoll()
    setMessages([])
    setReports([])
    setActiveReportId(null)
    setFollowUpQuestions([])
    setCurrentPhase('')
    assistantTextRef.current = ''
    assistantIdRef.current = ''
    activeW6MessageIdRef.current = ''
    setActiveW6MessageId(null)
    w6IdleTrackerRef.current = createW6IdleTracker()
    w6StreamAttachRef.current = null
    sessionIdRef.current = null
    skillKeyRef.current = null
    setSkillKey(null)
    setSessionId(null)
    setW6StreamEnabled(false)
    setW6StreamRound(0)
    setIsStreaming(false)
  }, [stopDiscussPoll])

  const bindSession = useCallback((sid: string) => {
    sessionIdRef.current = sid
    setSessionId(sid)
  }, [])

  const closeReport = useCallback((id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id))
    setActiveReportId((prev) => (prev === id ? null : prev))
  }, [])

  const appendReport = useCallback((report: DashboardReportItem) => {
    const resourceId = report.resourceId || extractArtifactResourceId(report.url)
    const normalized: DashboardReportItem = {
      ...report,
      resourceId,
      kind: report.kind || 'html',
    }
    setReports((prev) => {
      if (
        normalized.resourceId &&
        prev.some(
          (r) => r.resourceId === normalized.resourceId && r.kind === normalized.kind,
        )
      ) {
        return prev
      }
      if (
        normalized.kind === 'markdown' &&
        normalized.markdown?.trim() &&
        prev.some((r) => r.kind === 'markdown' && r.markdown === normalized.markdown)
      ) {
        return prev
      }
      return [...prev, normalized]
    })
    if (normalized.kind === 'html') {
      setActiveReportId(normalized.id)
    }
  }, [])

  /** Fallback when W6 sub-agent stream completes but chat SSE missed report_html. */
  const addReportFromW6Done = useCallback(
    async (ev: W6StreamEvent) => {
      if (ev.followUps?.length) {
        setFollowUpQuestions(ev.followUps)
      }

      if (ev.markdown?.trim()) {
        appendReport(
          buildMarkdownReportItem(
            '',
            resolveReportItemTitle(ev.markdown, ev.roundTitle),
            `w6-md-${Date.now()}`,
            ev.markdown,
          ),
        )
      }

      const raw = ev.reportUrl || ev.previewFile
      if (raw) {
        const resourceId = extractArtifactResourceId(raw)
        appendReport(
          buildHtmlReportItem(
            resourceId,
            resolveReportItemTitle(ev.markdown, ev.roundTitle || '报告'),
            `w6-${Date.now()}`,
            ev.markdown,
          ),
        )
        if (resourceId) {
          setMessages((prev) => {
            const idx = prev.reduce((last, m, i) => (m.role === 'w6' ? i : last), -1)
            if (idx < 0) return prev
            const updated = [...prev]
            updated[idx] = { ...updated[idx], previewResourceId: resourceId }
            return updated
          })
        }
        return
      }
      const sid = sessionIdRef.current
      if (!sid) return
      try {
        const serverReports = await fetchSessionReports(sid)
        if (serverReports.length === 0) return
        for (const r of serverReports) {
          const resourceId = extractArtifactResourceId(r.url || r.id)
          if (isMarkdownReportType(r.type)) {
            appendReport(
              buildMarkdownReportItem(
                resourceId,
                resolveReportItemTitle(undefined, r.title || '报告'),
                `w6-fb-${r.id}`,
              ),
            )
          } else {
            appendReport(
              buildHtmlReportItem(
                resourceId,
                resolveReportItemTitle(undefined, r.title || '报告'),
                `w6-fb-${r.id}`,
              ),
            )
          }
        }
      } catch {
        /* offline */
      }
    },
    [appendReport],
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
    stopDiscussPoll()
    setIsStreaming(false)
    setCurrentPhase('')
  }, [stopDiscussPoll])

  useEffect(() => () => stopDiscussPoll(), [stopDiscussPoll])

  const appendUserMessage = useCallback(
    (content: string, resourceRefs?: Array<{ id: string; name?: string; type?: string }>) => {
      const names = resourceRefs?.map((r) => r.name).filter(Boolean) ?? []
      const body =
        names.length > 0
          ? `${content.trim()}\n\n📎 ${names.join('、')}`.trim()
          : content.trim()
      addMessage({ role: 'user', content: body })
    },
    [addMessage],
  )

  const upsertGuidedTopicsMessage = useCallback((topics: GuidedTopicSnap[]) => {
    if (topics.length === 0) return
    const fp = guidedTopicsFingerprint(topics)
    setMessages((prev) => {
      const sameIdx = prev.findIndex(
        (m) =>
          m.role === 'guided_topics' &&
          guidedTopicsFingerprint(m.guidedTopics ?? []) === fp,
      )
      if (sameIdx >= 0) return prev

      let activeIdx = -1
      for (let i = prev.length - 1; i >= 0; i--) {
        if (prev[i].role === 'guided_topics' && prev[i].guidedTopicsStatus !== 'used') {
          activeIdx = i
          break
        }
      }
      if (activeIdx >= 0) {
        return prev.map((m, i) =>
          i === activeIdx
            ? { ...m, guidedTopics: topics, timestamp: Date.now() }
            : m,
        )
      }

      let insertAfter = prev.length
      for (let i = prev.length - 1; i >= 0; i--) {
        const m = prev[i]
        if (
          m.role === 'w6' &&
          (m.w6Status === 'done' || m.w6Status === 'stopped' || m.w6Status === 'error')
        ) {
          insertAfter = i + 1
          break
        }
      }
      const full: DashboardChatMessage = {
        id: genId(),
        role: 'guided_topics',
        content: '深度调研建议',
        timestamp: Date.now(),
        guidedTopics: topics,
        guidedTopicsStatus: 'active',
      }
      const next = [...prev]
      next.splice(insertAfter, 0, full)
      return next
    })
  }, [])

  const markGuidedTopicsUsed = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.role === 'guided_topics'
          ? { ...m, guidedTopicsStatus: 'used' }
          : m,
      ),
    )
  }, [])

  return {
    messages,
    reports,
    activeReportId,
    isStreaming,
    currentPhase,
    followUpQuestions,
    sessionId,
    w6StreamEnabled,
    w6StreamRound,
    skillKey,
    startChat,
    respondToForm,
    addSkillFormMessage,
    markFormSubmitted,
    cancelFormMessage,
    sendMessage,
    sendW6Message,
    abort,
    resetForNewSkill,
    closeReport,
    setActiveReportId,
    restoreSession,
    syncSessionFromServer,
    bindSession,
    addReportFromW6Done,
    skillKeyRef,
    activeW6MessageId,
    syncActiveW6Message,
    appendUserMessage,
    upsertGuidedTopicsMessage,
    markGuidedTopicsUsed,
  }
}
