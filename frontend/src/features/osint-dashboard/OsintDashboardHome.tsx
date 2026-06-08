import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Plus,
  MessageSquare,
  ShieldCheck,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react'
import type { Attachment } from '@/osint/components/ai-elements'
import { chatUploadGroup, chatUploadLog } from '@/osint/lib/chatUploadLog'
import { seedCachedPreviewFromFile, previewCacheAliases } from '@/osint/lib/chatPreviewCache'
import { DashboardChatComposer } from './components/DashboardChatComposer'
import { cn } from '@/osint/utils'
import { useOsintAuth } from '@/osint/auth'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useOptionalWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { useAppStore } from '@/osint/stores/apiStore'
import { useToast } from '@/osint/components/ui/Feedback'
import { useDialog } from '@/osint/components/ui/Dialog'
import { IntelligenceSkillToolbar } from '@/osint/components/intelligence/IntelligenceSkillToolbar'
import { intelligenceSkillApi } from '@/osint/services/api'
import type { IntelligenceSkill, FormField } from '@/osint/types'
import type { SkillGroupLite } from '@/osint/lib/intelligenceSkillToolbar'
import { useOsintDashboardChat } from './hooks/useOsintDashboardChat'
import {
  deriveSessionTitleFromFormData,
  deriveW6SessionTitle,
  isAutoSessionTitle,
} from './lib/sessionTitleSync'
import { useSubAgentStream } from './hooks/useSubAgentStream'
import { ReportCanvasPanel } from './components/ReportCanvasPanel'
import { DashboardGenerativeForm } from './components/GenerativeForm'
import { GuidedTopicsChip } from './components/GuidedTopicsChip'
import { resolveGuidedTopics } from './lib/guidedTopics'
import { isW6RoundReadyForGuidedTopics } from './lib/w6SessionState'
import type { GuidedTopicSnap } from './types'
import { UserMessageBubble } from './components/UserMessageBubble'
import { SubAgentChip } from './components/subagent/SubAgentChip'
import { SubAgentDrawer } from './components/subagent/SubAgentDrawer'
import { isW6SkillKey, type DashboardChatMessage } from './types'
import { buildW6FormSummary } from './lib/w6Message'
import { SkillFormChip } from './components/SkillFormChip'
import { mapW6ChipStatus } from './lib/w6MessageView'
import type { SubAgentConnection } from './hooks/useSubAgentStream'
import { ReportStylePicker } from './components/ReportStylePicker'
import { loadReportStyle, saveReportStyle, type ReportStyle } from './lib/reportStyle'
import { fetchSessionRestoreState } from './lib/osintDashboardApi'
import { loadSessionSnapshot } from './lib/dashboardSessionCache'

const DASHBOARD_ROUTE_BASE = '/osint-dashboard'

function dashRel(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${DASHBOARD_ROUTE_BASE}${p}`
}

function SessionItem({
  session,
  isActive,
  onClick,
  onRename,
  onDelete,
}: {
  session: { id: string; title: string; created_at: string }
  isActive: boolean
  onClick: () => void
  onRename: () => void
  onDelete: () => void
}) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer select-none items-center gap-2 rounded-lg border-l-2 border-transparent px-2.5 py-2 transition-all duration-150',
        isActive
          ? 'border-blue-600 bg-blue-50/90 text-slate-900 dark:border-blue-500 dark:bg-blue-950/35 dark:text-slate-100'
          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100',
      )}
    >
      <MessageSquare
        size={13}
        className={cn('shrink-0', isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400')}
      />
      <span className="flex-1 truncate text-[13px] leading-tight">{session.title}</span>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className={cn(
            'rounded-md p-1 transition-opacity',
            isActive ? 'text-gray-400 hover:bg-white' : 'text-gray-300 hover:bg-white/60',
            showMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
        >
          <MoreVertical size={11} />
        </button>
        {showMenu ? (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onRename()
                  setShowMenu(false)
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={11} /> 重命名
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                  setShowMenu(false)
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger-600 hover:bg-danger-50"
              >
                <Trash2 size={11} /> 删除
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

function formatMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>')
}

function parseSkillFormFields(skill: IntelligenceSkill | null): FormField[] {
  if (!skill) return []
  try {
    const schema = JSON.parse(skill.form_schema)
    return schema.fields || []
  } catch {
    return []
  }
}

export default function OsintDashboardHome() {
  const navigate = useNavigate()
  const { sessionId: urlSessionId } = useParams()
  const { user } = useOsintAuth()
  const userId = user?.id

  const {
    sessions,
    intelligenceSkills,
    isStreaming: wsStreaming,
    fetchSessions,
    createSession,
    updateSession,
    deleteSession,
    fetchIntelligenceSkills,
    executeIntelligenceSkill,
    sendMessageWS,
    connectWebSocket,
    disconnectWebSocket,
    fetchResources,
    uploadResource,
  } = useAppStore()

  const { addToast } = useToast()
  const { confirm, prompt } = useDialog()
  const shellChrome = useOptionalWorkbenchChrome()
  const leftCollapsed = shellChrome?.leftCollapsed ?? false
  const rightCollapsed = shellChrome?.rightCollapsed ?? false
  const setRightCollapsed = shellChrome?.setRightCollapsed

  const syncSessionTitle = useCallback(
    async (sessionId: string, title: string) => {
      const session = useAppStore.getState().sessions.find((s) => s.id === sessionId)
      if (!session || !isAutoSessionTitle(session.title)) return
      const next = title.trim()
      if (!next || next === session.title) return
      await updateSession(sessionId, next)
    },
    [updateSession],
  )

  const getSessionTitle = useCallback(
    (sessionId: string) => useAppStore.getState().sessions.find((s) => s.id === sessionId)?.title,
    [],
  )

  const chat = useOsintDashboardChat(userId, intelligenceSkills, {
    getSessionTitle,
    syncSessionTitle,
  })
  const w6Stream = useSubAgentStream(
    chat.sessionId,
    chat.w6StreamEnabled && Boolean(chat.activeW6MessageId),
    chat.w6StreamRound,
  )

  const [skillGroups, setSkillGroups] = useState<SkillGroupLite[]>([])
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [inputText, setInputText] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerW6MessageId, setDrawerW6MessageId] = useState<string | null>(null)
  const [stoppingW6, setStoppingW6] = useState(false)
  const [reportStyle, setReportStyle] = useState<ReportStyle>(() => loadReportStyle(userId))
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const w6DoneHandledRef = useRef(0)
  const sessionBootstrapRef = useRef(false)
  const bootstrapPromiseRef = useRef<Promise<void> | null>(null)
  const urlSessionIdRef = useRef(urlSessionId)

  useEffect(() => {
    w6DoneHandledRef.current = 0
  }, [chat.w6StreamRound])
  const [sessionsReady, setSessionsReady] = useState(false)

  useEffect(() => {
    urlSessionIdRef.current = urlSessionId
  }, [urlSessionId])

  useEffect(() => {
    setReportStyle(loadReportStyle(userId))
  }, [userId])

  const isBusy = chat.isStreaming || wsStreaming

  useEffect(() => {
    void fetchIntelligenceSkills()
    void intelligenceSkillApi.listGroups().then(setSkillGroups).catch(() => {})
  }, [fetchIntelligenceSkills])

  useEffect(() => {
    sessionBootstrapRef.current = false
    setSessionsReady(false)
  }, [userId])

  useEffect(() => {
    if (skillGroups.length === 0) {
      setActiveGroupId(null)
      return
    }
    setActiveGroupId((prev) => {
      if (prev && skillGroups.some((g) => g.id === prev)) return prev
      return skillGroups[0].id
    })
  }, [skillGroups])

  /** Ensure URL always binds to a real session; new users get one created automatically. */
  useEffect(() => {
    if (!userId || sessionBootstrapRef.current) return

    let cancelled = false
    sessionBootstrapRef.current = true

    const bootstrap = async () => {
      try {
        await fetchSessions()
        if (cancelled) return

        const list = useAppStore.getState().sessions
        const targetId = urlSessionIdRef.current?.trim() || ''

        if (targetId && list.some((s) => s.id === targetId)) {
          return
        }

        if (targetId) {
          const server = await fetchSessionRestoreState(targetId).catch(() => null)
          if (server?.session_id) {
            const cached = loadSessionSnapshot(userId, targetId)
            const title = cached?.title?.trim() || '新研究'
            useAppStore.setState((state) => {
              if (state.sessions.some((s) => s.id === targetId)) return state
              return {
                sessions: [
                  { id: targetId, title, created_at: new Date().toISOString() },
                  ...state.sessions,
                ],
              }
            })
            return
          }
        }

        if (list.length > 0) {
          const pick = list[0]
          if (!targetId || targetId !== pick.id) {
            navigate(dashRel(`/sessions/${pick.id}`), { replace: true })
          }
          return
        }

        const newSess = await createSession('新研究')
        if (cancelled) return
        navigate(dashRel(`/sessions/${newSess.id}`), { replace: true })
      } catch {
        sessionBootstrapRef.current = false
      } finally {
        if (!cancelled) setSessionsReady(true)
      }
    }

    bootstrapPromiseRef.current = bootstrap()
    void bootstrapPromiseRef.current
    return () => {
      cancelled = true
    }
  }, [userId, urlSessionId, fetchSessions, createSession, navigate])

  useEffect(() => {
    if (!urlSessionId) return
    void chat.restoreSession(urlSessionId)
    connectWebSocket(urlSessionId)
    void fetchResources(urlSessionId)
    return () => {
      disconnectWebSocket(urlSessionId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chat helpers intentionally omitted
  }, [urlSessionId, connectWebSocket, disconnectWebSocket, fetchResources])

  // After sleep / tab switch: pull server W6 status so completed rounds are not stuck on "运行中".
  useEffect(() => {
    if (!urlSessionId) return
    const onResume = () => {
      if (document.visibilityState !== 'visible') return
      void chat.syncSessionFromServer()
    }
    document.addEventListener('visibilitychange', onResume)
    window.addEventListener('focus', onResume)
    return () => {
      document.removeEventListener('visibilitychange', onResume)
      window.removeEventListener('focus', onResume)
    }
  }, [urlSessionId, chat.syncSessionFromServer])

  // Smart preview: auto-open right panel when session has HTML reports
  useEffect(() => {
    if (chat.reports.length > 0) {
      setRightCollapsed?.(false)
    }
  }, [urlSessionId, chat.reports.length, setRightCollapsed])

  const rightSidebarVisible = chat.reports.length > 0 && !rightCollapsed
  const panelStorageKey = userId ? `osint-dashboard-panels:${userId}` : undefined

  // W6 /w6/stream can receive `done` while chat SSE drops report_html under heavy token load.
  useEffect(() => {
    const doneCount = w6Stream.events.filter((e) => e.type === 'done').length
    if (doneCount <= w6DoneHandledRef.current) return
    w6DoneHandledRef.current = doneCount
    const lastDone = [...w6Stream.events].reverse().find((e) => e.type === 'done')
    if (lastDone) {
      void chat.addReportFromW6Done(lastDone)
    }
  }, [w6Stream.events, chat.addReportFromW6Done])

  const activeReport = useMemo(
    () => chat.reports.find((r) => r.id === chat.activeReportId) ?? chat.reports[chat.reports.length - 1],
    [chat.reports, chat.activeReportId],
  )

  const activeSession = useMemo(
    () => (urlSessionId ? sessions.find((s) => s.id === urlSessionId) : undefined),
    [sessions, urlSessionId],
  )

  const handleReportStyleChange = (style: ReportStyle) => {
    setReportStyle(style)
    saveReportStyle(userId, style)
  }

  const handleOpenReportPreview = useCallback(
    (resourceId?: string | null) => {
      if (chat.reports.length === 0) return
      setRightCollapsed?.(false)
      const htmlReports = chat.reports.filter((r) => r.kind === 'html' || !r.kind)
      const rid = resourceId?.trim()
      const target = rid
        ? htmlReports.find((r) => r.resourceId === rid) ??
          chat.reports.find((r) => r.resourceId === rid)
        : undefined
      const resolved =
        target ??
        htmlReports.find((r) => r.id === chat.activeReportId) ??
        htmlReports[htmlReports.length - 1] ??
        chat.reports[chat.reports.length - 1]
      if (resolved) {
        chat.setActiveReportId(resolved.id)
      }
    },
    [chat.reports, chat.activeReportId, chat.setActiveReportId, setRightCollapsed],
  )

  const w6DoneFollowUps = useMemo(() => {
    if (chat.activeW6MessageId) return []
    for (let i = chat.messages.length - 1; i >= 0; i--) {
      const m = chat.messages[i]
      if (m.role !== 'w6' || m.w6Status !== 'done') continue
      const doneEv = [...(m.w6Events ?? [])].reverse().find((e) => e.type === 'done')
      return doneEv?.followUps ?? []
    }
    return []
  }, [chat.messages, chat.activeW6MessageId])

  const guidedTopics = useMemo(
    () =>
      resolveGuidedTopics({
        followUpQuestions: chat.followUpQuestions,
        messages: chat.messages,
        w6FollowUps: w6DoneFollowUps,
        skillKey: chat.skillKey,
        reportTitle: activeReport?.title,
      }),
    [chat.followUpQuestions, chat.messages, chat.skillKey, w6DoneFollowUps, activeReport?.title],
  )

  const hasActiveForm = chat.messages.some(
    (m) => m.role === 'form' && m.formStatus === 'pending',
  )

  const w6RoundReadyForGuidedTopics = useMemo(
    () => isW6RoundReadyForGuidedTopics(chat.messages),
    [chat.messages],
  )

  useEffect(() => {
    if (
      !w6RoundReadyForGuidedTopics ||
      chat.activeW6MessageId ||
      chat.reports.length === 0 ||
      chat.isStreaming ||
      hasActiveForm
    ) {
      return
    }
    if (guidedTopics.length === 0) return
    chat.upsertGuidedTopicsMessage(guidedTopics)
  }, [
    w6RoundReadyForGuidedTopics,
    chat.activeW6MessageId,
    chat.reports.length,
    chat.isStreaming,
    chat.upsertGuidedTopicsMessage,
    guidedTopics,
    hasActiveForm,
  ])

  const drawerW6View = useMemo(() => {
    if (!drawerW6MessageId) return null
    const msg = chat.messages.find((m) => m.id === drawerW6MessageId)
    if (!msg || msg.role !== 'w6') return null
    const isLive = drawerW6MessageId === chat.activeW6MessageId
    const events = isLive ? w6Stream.events : (msg.w6Events ?? [])
    return {
      events,
      status: mapW6ChipStatus(msg.w6Status, w6Stream.status, isLive, events),
      connection: isLive ? w6Stream.connection : ('closed' as SubAgentConnection),
    }
  }, [
    drawerW6MessageId,
    chat.messages,
    chat.activeW6MessageId,
    w6Stream.events,
    w6Stream.status,
    w6Stream.connection,
  ])

  useEffect(() => {
    if (!chat.activeW6MessageId) return
    chat.syncActiveW6Message({
      progress: w6Stream.progress,
      lastLine: w6Stream.lastLine,
      events: w6Stream.events,
      status: w6Stream.status,
    })
  }, [
    chat.activeW6MessageId,
    chat.syncActiveW6Message,
    w6Stream.progress,
    w6Stream.lastLine,
    w6Stream.events,
    w6Stream.status,
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [
    chat.messages,
    hasActiveForm,
    chat.currentPhase,
    chat.activeW6MessageId,
    w6Stream.status,
    w6Stream.lastLine,
    w6Stream.events.length,
  ])

  const handleNewSession = async () => {
    chat.resetForNewSkill()
    const newSess = await createSession('新研究')
    navigate(dashRel(`/sessions/${newSess.id}`))
  }

  const handleRenameSession = async (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return
    const newTitle = await prompt({
      title: '重命名会话',
      message: '请输入新的会话名称',
      defaultValue: session.title,
      placeholder: '会话名称',
    })
    if (newTitle && newTitle !== session.title) {
      await updateSession(sessionId, newTitle)
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    const confirmed = await confirm({
      title: '删除会话',
      message: '确定要删除此会话吗？此操作不可恢复。',
      variant: 'danger',
      confirmText: '删除',
      cancelText: '取消',
    })
    if (!confirmed) return
    await deleteSession(sessionId)
    if (urlSessionId === sessionId) {
      const remaining = useAppStore.getState().sessions
      if (remaining.length > 0) {
        navigate(dashRel(`/sessions/${remaining[0].id}`))
      } else {
        const newSess = await createSession('新研究')
        navigate(dashRel(`/sessions/${newSess.id}`), { replace: true })
      }
    }
  }

  const ensureActiveSession = async (titleHint?: string): Promise<string> => {
    if (bootstrapPromiseRef.current) {
      await bootstrapPromiseRef.current.catch(() => undefined)
    }
    const activeId = urlSessionIdRef.current?.trim()
    if (activeId) {
      chat.bindSession(activeId)
      return activeId
    }
    const existing = useAppStore.getState().sessions[0]
    if (existing) {
      chat.bindSession(existing.id)
      connectWebSocket(existing.id)
      navigate(dashRel(`/sessions/${existing.id}`), { replace: true })
      return existing.id
    }
    const title = titleHint?.trim().slice(0, 30) || '新研究'
    const newSess = await createSession(title)
    chat.bindSession(newSess.id)
    connectWebSocket(newSess.id)
    navigate(dashRel(`/sessions/${newSess.id}`), { replace: true })
    return newSess.id
  }

  const handleSkillClick = (skill: IntelligenceSkill) => {
    if (isBusy) {
      addToast('info', '当前正在生成中，请稍后再试')
      return
    }
    const fields = parseSkillFormFields(skill)
    if (fields.length === 0) {
      addToast('error', '该技能未配置表单字段')
      return
    }
    chat.addSkillFormMessage(skill, fields)
  }

  const handleW6FormSubmit = async (
    msg: DashboardChatMessage,
    formData: Record<string, unknown>,
  ) => {
    if (!msg.skillKey || !msg.skillName) return
    try {
      const skill = intelligenceSkills.find((s) => s.id === msg.skillId || s.key === msg.skillKey)
      if (!skill) throw new Error('技能不存在')
      chat.markFormSubmitted(msg.id, formData)
      const renderedPrompt = await executeIntelligenceSkill(skill.id, formData)
      const sid = await ensureActiveSession(
        deriveSessionTitleFromFormData(formData, skill.name) || skill.name,
      )
      saveReportStyle(userId, reportStyle)
      await chat.startChat(
        skill.key,
        skill.name,
        formData,
        sid,
        renderedPrompt,
        reportStyle,
      )
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : '启动研究失败')
    }
  }

  const handleFollowUpFormSubmit = async (
    msg: DashboardChatMessage,
    formData: Record<string, unknown>,
  ) => {
    try {
      const skillKey = chat.skillKeyRef.current
      const skill = skillKey
        ? intelligenceSkills.find((item) => item.key === skillKey)
        : undefined
      const renderedPrompt = skill
        ? await executeIntelligenceSkill(skill.id, formData)
        : undefined
      await chat.respondToForm(formData, renderedPrompt, msg.id)
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : '提交补充信息失败')
    }
  }

  const handleNonW6SkillSubmit = async (
    msg: DashboardChatMessage,
    formData: Record<string, unknown>,
  ) => {
    if (!msg.skillId || !msg.skillName) return
    try {
      const skill = intelligenceSkills.find((s) => s.id === msg.skillId)
      if (!skill) throw new Error('技能不存在')
      chat.markFormSubmitted(msg.id, formData)
      const renderedMessage = await executeIntelligenceSkill(skill.id, formData)
      const sessionId = await ensureActiveSession(skill.name)
      sendMessageWS(sessionId, renderedMessage, [])
      addToast('success', `${skill.name} 已提交`)
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : '提交失败')
    }
  }

  const handleFormMessageSubmit = (
    msg: DashboardChatMessage,
    formData: Record<string, unknown>,
  ) => {
    if (msg.formStatus !== 'pending') return
    if (msg.skillKey) {
      if (isW6SkillKey(msg.skillKey, intelligenceSkills)) {
        void handleW6FormSubmit(msg, formData)
      } else {
        void handleNonW6SkillSubmit(msg, formData)
      }
      return
    }
    void handleFollowUpFormSubmit(msg, formData)
  }

  const handleSend = async (attachments: Attachment[] = []) => {
    const text = inputText.trim()
    if ((!text && attachments.length === 0) || chat.isStreaming) return

    const localAttachments = attachments.filter((a) => a.type === 'local' && a.file)

    if (localAttachments.length > 0) {
      try {
        const sid = await ensureActiveSession(
          deriveW6SessionTitle(text) || text || '附件消息',
        )
        const uploadedRefs = await chatUploadGroup(
          `upload ${localAttachments.length} local file(s)`,
          { sessionId: sid, files: localAttachments.map((a) => a.name) },
          async () => {
            const refs: Array<{ id: string; name?: string; type?: string }> = []
            for (const att of localAttachments) {
              const file = att.file!
              chatUploadLog('upload_start', 'dashboard uploading before send', {
                fileName: file.name,
                sessionId: sid,
              })
              const resource = await uploadResource(sid, file)
              await seedCachedPreviewFromFile(
                resource.id,
                file,
                previewCacheAliases(resource.id, resource.url).filter((id) => id !== resource.id),
              )
              refs.push({
                id: resource.id,
                name: resource.name || att.name,
                type: resource.type || 'file',
              })
            }
            return refs
          },
        )
        const message = text || '请分析附件内容'
        setInputText('')
        chat.appendUserMessage(message, uploadedRefs)
        sendMessageWS(sid, message, uploadedRefs)
        void fetchResources(sid)
        return
      } catch (err: unknown) {
        addToast('error', err instanceof Error ? err.message : '文件上传失败')
        return
      }
    }

    setInputText('')
    void chat.sendMessage(text)
  }

  const handleStopW6 = async () => {
    if (stoppingW6 || w6Stream.status !== 'running') return
    setStoppingW6(true)
    try {
      chat.abort()
      await w6Stream.stop()
      addToast('info', '已停止 W6 调研')
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : '停止 W6 失败')
    } finally {
      setStoppingW6(false)
    }
  }

  const handleGuidedTopic = (messageId: string, topic: GuidedTopicSnap) => {
    if (chat.isStreaming) return
    chat.markGuidedTopicsUsed(messageId)
    setInputText('')
    // Guided chips are always W6 deep-research follow-ups.
    void chat.sendW6Message(topic.text)
  }

  const leftPanel = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-200/90 px-3 py-3 dark:border-slate-800">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100">
          <ShieldCheck size={14} className="text-white dark:text-slate-900" />
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">情报研究</span>
      </div>
      <div className="px-3 pb-2 pt-2">
        <button
          type="button"
          onClick={() => void handleNewSession()}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <Plus size={14} />
          新会话
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2">
        {!sessionsReady ? (
          <div className="px-3 py-6 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">加载会话…</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-3 py-6 text-center">
            <MessageSquare size={20} className="mx-auto mb-1.5 text-slate-300 dark:text-slate-600" />
            <p className="text-xs text-slate-500 dark:text-slate-400">暂无会话</p>
          </div>
        ) : (
          sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              isActive={urlSessionId === session.id}
              onClick={() => navigate(dashRel(`/sessions/${session.id}`))}
              onRename={() => void handleRenameSession(session.id)}
              onDelete={() => void handleDeleteSession(session.id)}
            />
          ))
        )}
      </div>
    </div>
  )

  const mainPanel = (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[#f7f8fa] dark:bg-slate-950">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/70 px-3 py-2 dark:border-slate-800">
        <span className="min-w-0 truncate text-xs font-medium text-slate-600 dark:text-slate-400">
          {activeSession?.title ?? '情报研究'}
        </span>
        <ReportStylePicker
          value={reportStyle}
          onChange={handleReportStyleChange}
          disabled={chat.isStreaming}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              {chat.messages.map((msg) => {
                if (msg.role === 'user') {
                  return (
                    <div key={msg.id} className="mb-3 flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-3 py-2 text-xs text-white dark:bg-slate-100 dark:text-slate-900">
                        <UserMessageBubble content={msg.content} />
                      </div>
                    </div>
                  )
                }
                if (msg.role === 'assistant') {
                  if (!msg.content.trim()) return null
                  return (
                    <div key={msg.id} className="mb-3">
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        <div
                          className="prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                        />
                        {msg.previewResourceId ? (
                          <button
                            type="button"
                            onClick={() => handleOpenReportPreview(msg.previewResourceId)}
                            className="mt-2 text-xs text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            预览
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )
                }
                if (msg.role === 'form') {
                  const status = msg.formStatus ?? 'pending'
                  const title = msg.skillName || msg.formPrompt || msg.content
                  const submittedSummary = msg.formData
                    ? buildW6FormSummary(msg.formData)
                    : undefined
                  return (
                    <div key={msg.id} className="mb-3">
                      <SkillFormChip
                        title={title}
                        status={status}
                        submittedSummary={submittedSummary}
                      >
                        {status === 'pending' && msg.formSchema?.fields?.length ? (
                          <DashboardGenerativeForm
                            fields={msg.formSchema.fields}
                            onSubmit={(data) => handleFormMessageSubmit(msg, data)}
                            disabled={chat.isStreaming}
                            stepMode={msg.stepMode !== false}
                          />
                        ) : null}
                      </SkillFormChip>
                      {status === 'pending' ? (
                        <button
                          type="button"
                          className="mt-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                          onClick={() => chat.cancelFormMessage(msg.id)}
                        >
                          取消
                        </button>
                      ) : null}
                    </div>
                  )
                }
                if (msg.role === 'guided_topics') {
                  const topics = msg.guidedTopics ?? []
                  if (topics.length === 0) return null
                  const status = msg.guidedTopicsStatus ?? 'active'
                  return (
                    <div key={msg.id} className="mb-3">
                      <GuidedTopicsChip
                        topics={topics}
                        status={status}
                        onSelect={(topic) => handleGuidedTopic(msg.id, topic)}
                        disabled={chat.isStreaming}
                      />
                    </div>
                  )
                }
                if (msg.role === 'w6') {
                  const isLive = msg.id === chat.activeW6MessageId
                  const events = isLive ? w6Stream.events : (msg.w6Events ?? [])
                  const chipStatus = mapW6ChipStatus(msg.w6Status, w6Stream.status, isLive, events)
                  return (
                    <div key={msg.id} className="mb-3">
                      <SubAgentChip
                        status={chipStatus}
                        progress={isLive ? w6Stream.progress : (msg.w6Progress ?? 0)}
                        lastLine={
                          isLive
                            ? w6Stream.lastLine || msg.w6LastLine || ''
                            : (msg.w6LastLine ?? '')
                        }
                        connection={isLive ? w6Stream.connection : undefined}
                        events={events}
                        onClick={() => {
                          setDrawerW6MessageId(msg.id)
                          setDrawerOpen(true)
                        }}
                        onStop={
                          isLive && chipStatus === 'running'
                            ? () => void handleStopW6()
                            : undefined
                        }
                        stopping={stoppingW6}
                      />
                    </div>
                  )
                }
                if (msg.role === 'system') {
                  return (
                    <div key={msg.id} className="mb-2 text-center text-xs text-slate-500">
                      {msg.content}
                    </div>
                  )
                }
                return null
              })}

              {chat.currentPhase && !chat.activeW6MessageId ? (
                <div className="mb-2 text-xs italic text-slate-500">{chat.currentPhase}</div>
              ) : null}

        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 border-t border-zinc-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#212121]">
        <div className="mx-auto max-w-3xl space-y-2">
          <IntelligenceSkillToolbar
            skillGroups={skillGroups}
            activeGroupId={activeGroupId}
            onActiveGroupChange={setActiveGroupId}
            intelligenceSkills={intelligenceSkills}
            onSkillClick={handleSkillClick}
            disabled={isBusy}
          />

          <DashboardChatComposer
            value={inputText}
            onChange={setInputText}
            onSend={(attachments) => void handleSend(attachments)}
            placeholder={
              chat.reports.length > 0
                ? '针对当前报告改版式或追问内容；@w6 开头为深度调研'
                : '输入追问；@w6 开头为深度调研'
            }
            disabled={chat.isStreaming}
            isStreaming={chat.isStreaming}
            onStop={() => chat.abort()}
          />
        </div>
      </div>
    </div>
  )

  const rightPanel = (
    <ReportCanvasPanel
      reports={chat.reports}
      activeReportId={chat.activeReportId}
      onActiveChange={chat.setActiveReportId}
      onReportClose={chat.closeReport}
    />
  )

  return (
    <>
      <WorkbenchLayout
        className="h-full min-h-0 w-full bg-[#f3f5f7] dark:bg-slate-950"
        innerClassName="h-full min-h-0 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950"
        leftPanelId="osint-dashboard-left"
        mainPanelId="osint-dashboard-main"
        rightPanelId="osint-dashboard-right"
        left={leftPanel}
        main={mainPanel}
        right={rightPanel}
        leftMinPx={200}
        leftMaxPx={400}
        leftDefaultPx={240}
        rightMinPx={320}
        rightMaxPx={1200}
        rightDefaultPct={50}
        leftSidebarVisible={!leftCollapsed}
        rightSidebarVisible={rightSidebarVisible}
        storageKey={panelStorageKey}
        resizeHandleWithGrip
      />

      <SubAgentDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
          setDrawerW6MessageId(null)
        }}
        events={drawerW6View?.events ?? []}
        status={drawerW6View?.status ?? 'idle'}
        connection={drawerW6View?.connection ?? 'idle'}
      />
    </>
  )
}
