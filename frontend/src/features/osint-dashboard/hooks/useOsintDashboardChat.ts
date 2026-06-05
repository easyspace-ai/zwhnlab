import { useState, useCallback, useRef, useEffect, type MutableRefObject } from 'react'
import type {
  DashboardChatMessage,
  DashboardSSEEvent,
  DashboardReportItem,
  W6MessageStatus,
  W6StreamEvent,
} from '../types'
import type { SubAgentStatus } from './useSubAgentStream'
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
  buildW6StartUserContent,
  formatW6UserBubble,
  isW6PrefixedMessage,
  stripW6Prefix,
} from '../lib/w6Message'
import {
  loadSessionSnapshot,
  saveSessionSnapshot,
  type PersistedDashboardSession,
} from '../lib/dashboardSessionCache'
import { isReportEditIntent } from '../lib/reportEditIntent'

let msgCounter = 0
function genId() {
  return `msg-${++msgCounter}-${Date.now()}`
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
      return {
        id: `srv-${index}-${row.timestamp ?? Date.now()}`,
        role,
        content: row.content,
        timestamp: row.timestamp ?? Date.now(),
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
): DashboardReportItem {
  const previewUrl = resolveReportPreviewUrl(resourceId)
  return {
    id: `${previewUrl}#${suffix}`,
    url: previewUrl,
    resourceId,
    title,
    timestamp: Date.now(),
    kind: 'html',
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
    const title = r.title || '报告'
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
    if (isW6SkillKey(saved.skillKey) && saved.sessionId) {
      setters.setW6StreamEnabled(true)
    }
  }
}

export function useOsintDashboardChat(userId: string | undefined) {
  const [messages, setMessages] = useState<DashboardChatMessage[]>([])
  const [reports, setReports] = useState<DashboardReportItem[]>([])
  const [activeReportId, setActiveReportId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('')
  const [currentForm, setCurrentForm] = useState<{
    schema: { fields: import('@/osint/types').FormField[] }
    message: string
  } | null>(null)
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
  const [activeW6MessageId, setActiveW6MessageId] = useState<string | null>(null)

  const persist = useCallback(() => {
    const uid = userId
    const sid = sessionIdRef.current
    if (!uid || !sid) return
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

  const addMessage = useCallback((msg: Omit<DashboardChatMessage, 'id' | 'timestamp'>) => {
    const full: DashboardChatMessage = { ...msg, id: genId(), timestamp: Date.now() }
    setMessages((prev) => [...prev, full])
    return full.id
  }, [])

  const beginW6Round = useCallback(() => {
    const prevId = activeW6MessageIdRef.current
    if (prevId) {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== prevId || m.w6Status !== 'running') return m
          return {
            ...m,
            w6Status: 'done' as const,
            w6LastLine: m.w6LastLine || '本轮调研已结束',
          }
        }),
      )
    }

    const id = addMessage({
      role: 'w6',
      content: '',
      w6Status: 'running',
      w6Progress: 0,
      w6LastLine: '正在启动 W6 子 Agent…',
      w6Events: [],
    })
    activeW6MessageIdRef.current = id
    setActiveW6MessageId(id)
    setW6StreamEnabled(true)
    setW6StreamRound((n) => n + 1)
    return id
  }, [addMessage])

  const syncActiveW6Message = useCallback(
    (payload: {
      progress: number
      lastLine: string
      events: W6StreamEvent[]
      status: SubAgentStatus
    }) => {
      const id = activeW6MessageIdRef.current
      if (!id) return

      let w6Status: W6MessageStatus = 'running'
      if (payload.status === 'error') {
        w6Status = 'error'
      } else if (payload.events.some((e) => e.type === 'stopped')) {
        w6Status = 'stopped'
      } else if (
        payload.events.some((e) => e.type === 'done') ||
        (payload.status === 'idle' && payload.events.length > 0)
      ) {
        w6Status = 'done'
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                w6Status,
                w6Progress: payload.progress,
                w6LastLine: payload.lastLine,
                w6Events: payload.events,
              }
            : m,
        ),
      )

      if (w6Status === 'done' || w6Status === 'error' || w6Status === 'stopped') {
        activeW6MessageIdRef.current = ''
        setActiveW6MessageId(null)
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
            setCurrentForm({ schema: event.schema, message: event.message || '请补充信息' })
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
                  event.title || '研究报告 (MD)',
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
            const report = buildHtmlReportItem(
              resourceId || raw,
              event.title || '未命名报告',
              String(Date.now()),
            )
            setReports((prev) => [...prev, report])
            setActiveReportId(report.id)

            const pending = pendingMarkdownRef.current
            if (pending?.markdown?.trim()) {
              const mdFromArtifact = buildMarkdownReportItem(
                '',
                event.title ? `${event.title} (MD)` : '研究报告 (MD)',
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
          if (event.questions?.length) {
            setFollowUpQuestions(event.questions)
            if (!w6Active) {
              const id = assistantIdRef.current
              setMessages((prev) => {
                const idx = prev.findIndex((m) => m.id === id)
                if (idx === -1) return prev
                const updated = [...prev]
                updated[idx] = { ...updated[idx], followUpQuestions: event.questions! }
                return updated
              })
            }
          }
          break
        case 'session':
          if (event.sessionId) {
            const sid = String(event.sessionId)
            sessionIdRef.current = sid
            setSessionId(sid)
            if (isW6SkillKey(skillKeyRef.current)) {
              setW6StreamEnabled(true)
            }
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
  }, [appendAssistantText])

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
      setCurrentForm(null)
      setFollowUpQuestions([])
      assistantTextRef.current = ''
      skillKeyRef.current = skillKey
      setSkillKey(skillKey)
      sessionIdRef.current = sid
      setSessionId(sid)
      if (!isW6SkillKey(skillKey)) {
        setW6StreamEnabled(false)
      }
      setIsStreaming(true)

      addMessage({
        role: 'user',
        content: buildW6StartUserContent(skillName, formData),
      })

      beginW6Round()
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
    [addMessage, appendAssistantText, beginW6Round, readSSEStream],
  )

  const respondToForm = useCallback(
    async (formData: Record<string, unknown>, renderedPrompt?: string) => {
      setCurrentForm(null)
      setIsStreaming(true)

      const summary = buildW6FormSummary(formData)
      addMessage({
        role: 'user',
        content: formatW6UserBubble(`补充信息${summary ? `\n${summary}` : ''}`),
      })
      beginW6Round()
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
    [addMessage, appendAssistantText, beginW6Round, readSSEStream],
  )

  const runW6MessageRound = useCallback(
    async (displayText: string, w6Payload: string) => {
      const sid = sessionIdRef.current
      if (!sid) {
        addMessage({ role: 'system', content: '⚠️ 请先完成一个研究任务，再开始追问' })
        return
      }

      setIsStreaming(true)

      addMessage({ role: 'user', content: displayText })
      beginW6Round()
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
    [addMessage, appendAssistantText, beginW6Round, readSSEStream],
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
      setCurrentPhase(isEdit ? '改版式中…' : '分析报告中…')

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
          updated[idx] = { ...updated[idx], content: reply }
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
      abortRef.current?.abort()
      setIsStreaming(false)
      setCurrentPhase('')
      setCurrentForm(null)

      const saved = userId ? loadSessionSnapshot(userId, targetSessionId) : null
      let server: SessionRestoreState | null = null
      try {
        server = await fetchSessionRestoreState(targetSessionId)
      } catch {
        /* offline */
      }

      const serverMessages = server ? mapServerMessages(server) : []
      const useServerMessages = serverMessages.length > 0
      const useLocalSnapshot = !useServerMessages && Boolean(saved)

      sessionIdRef.current = targetSessionId
      setSessionId(targetSessionId)

      const resolvedSkillKey =
        server?.skill_key?.trim() ||
        saved?.skillKey?.trim() ||
        null
      skillKeyRef.current = resolvedSkillKey
      setSkillKey(resolvedSkillKey)

      if (isW6SkillKey(resolvedSkillKey)) {
        setW6StreamEnabled(true)
        if (server?.w6_stream_active || saved || serverMessages.length > 0) {
          setW6StreamRound((n) => n + 1)
        }
      } else {
        setW6StreamEnabled(false)
      }

      if (useLocalSnapshot && saved) {
        applyPersisted(
          saved,
          {
            setMessages,
            setReports,
            setActiveReportId,
            setFollowUpQuestions,
            setSessionId,
            setW6StreamEnabled,
            setSkillKey,
          },
          { sessionIdRef, skillKeyRef },
        )
        const runningW6 = [...saved.messages]
          .reverse()
          .find((m) => m.role === 'w6' && m.w6Status === 'running')
        if (runningW6) {
          activeW6MessageIdRef.current = runningW6.id
          setActiveW6MessageId(runningW6.id)
        }
      } else if (useServerMessages) {
        setMessages(serverMessages)
        setFollowUpQuestions(server?.follow_ups ?? [])
      } else {
        const placeholder = server?.w6_stream_active
          ? '已重连进行中的会话，W6 子 Agent 状态见下方进度条。'
          : '已加载会话。可继续追问或选择技能开始新任务。'
        setMessages([
          {
            id: genId(),
            role: 'system',
            content: placeholder,
            timestamp: Date.now(),
          },
        ])
        setFollowUpQuestions(server?.follow_ups ?? [])
      }

      if (server?.w6_stream_active) {
        setMessages((prev) => {
          const lastW6 = [...prev].reverse().find((m) => m.role === 'w6')
          if (lastW6?.w6Status === 'running') {
            activeW6MessageIdRef.current = lastW6.id
            setActiveW6MessageId(lastW6.id)
            return prev
          }
          const w6Id = genId()
          activeW6MessageIdRef.current = w6Id
          setActiveW6MessageId(w6Id)
          return [
            ...prev,
            {
              id: w6Id,
              role: 'w6',
              content: '',
              timestamp: Date.now(),
              w6Status: 'running',
              w6Progress: 0,
              w6LastLine: 'W6 子 Agent 运行中…',
              w6Events: [],
            },
          ]
        })
      }

      const shouldLoadReports =
        !useLocalSnapshot || (saved?.reports?.length ?? 0) === 0
      if (shouldLoadReports) {
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
    },
    [userId],
  )

  const resetForNewSkill = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setReports([])
    setActiveReportId(null)
    setCurrentForm(null)
    setFollowUpQuestions([])
    setCurrentPhase('')
    assistantTextRef.current = ''
    assistantIdRef.current = ''
    activeW6MessageIdRef.current = ''
    setActiveW6MessageId(null)
    sessionIdRef.current = null
    skillKeyRef.current = null
    setSkillKey(null)
    setSessionId(null)
    setW6StreamEnabled(false)
    setW6StreamRound(0)
    setIsStreaming(false)
  }, [])

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
            ev.roundTitle ? `${ev.roundTitle} (MD)` : '研究报告 (MD)',
            `w6-md-${Date.now()}`,
            ev.markdown,
          ),
        )
      }

      const raw = ev.reportUrl || ev.previewFile
      if (raw) {
        appendReport(
          buildHtmlReportItem(
            extractArtifactResourceId(raw),
            ev.roundTitle || '报告',
            `w6-${Date.now()}`,
          ),
        )
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
            appendReport(buildMarkdownReportItem(resourceId, r.title || '研究报告 (MD)', `w6-fb-${r.id}`))
          } else {
            appendReport(buildHtmlReportItem(resourceId, r.title || '报告', `w6-fb-${r.id}`))
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
    setIsStreaming(false)
    setCurrentPhase('')
  }, [])

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

  return {
    messages,
    reports,
    activeReportId,
    isStreaming,
    currentPhase,
    currentForm,
    followUpQuestions,
    sessionId,
    w6StreamEnabled,
    w6StreamRound,
    skillKey,
    startChat,
    respondToForm,
    sendMessage,
    sendW6Message,
    abort,
    resetForNewSkill,
    closeReport,
    setActiveReportId,
    restoreSession,
    bindSession,
    addReportFromW6Done,
    skillKeyRef,
    activeW6MessageId,
    syncActiveW6Message,
    appendUserMessage,
  }
}
