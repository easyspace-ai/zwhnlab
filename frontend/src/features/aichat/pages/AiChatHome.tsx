import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useOsintAuth } from '@/osint/auth'
import { useAppStore } from '@/osint/stores/apiStore'
import { useDialog } from '@/osint/components/ui/Dialog'
import { useToast } from '@/osint/components/ui/Feedback'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useOptionalWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { IntelligenceSkillToolbar } from '@/osint/components/intelligence/IntelligenceSkillToolbar'
import { intelligenceSkillApi } from '@/osint/services/api'
import type { IntelligenceSkill } from '@/osint/types'
import type { SkillGroupLite } from '@/osint/lib/intelligenceSkillToolbar'
import { ReportCanvasPanel } from '@/features/osint-dashboard/components/ReportCanvasPanel'
import type { DashboardReportItem } from '@/features/osint-dashboard/types'
import { loadReportStyle, saveReportStyle, type ReportStyle } from '@/features/osint-dashboard/lib/reportStyle'
import { formatReportSelectLabel } from '@/features/osint-dashboard/lib/reportTitleDisplay'
import { resolveFollowUpRoute } from '../lib/reportEditIntent'
import {
  clearDismissedReportId,
  isReportContextEnabled,
  loadDismissedReportId,
  saveDismissedReportId,
} from '../lib/reportContextPreference'
import { ReportContextStrip } from '../components/composer/ReportContextStrip'
import {
  isAutoSessionTitle,
  resolveSessionTitleFromProjected,
} from '@/features/osint-dashboard/lib/sessionTitleSync'
import { aichatPath } from '../routes'
import { useAiChatSession } from '../hooks/useAiChatSession'
import { useAiChatStore } from '../store/useAiChatStore'
import { SessionSidebar } from '../components/SessionSidebar'
import { RoundBlock } from '../components/Timeline/RoundBlock'
import { FormDraftBlock } from '../components/Timeline/FormDraftBlock'
import { AiChatComposer } from '../components/composer/AiChatComposer'
import { startRound, stopRound, fetchReports, presentFormDraft, cancelFormDraft } from '../api/aichatApi'
import { parseSkillFormFields } from '../lib/parseSkillForm'
import {
  eventReportsToItems,
  reportRowsToItems,
  resolveActivePreviewTargets,
  type SessionReportItem,
} from '../lib/reportItems'
import { resolveActiveTask } from '../lib/activeTask'

export default function AiChatHome() {
  const navigate = useNavigate()
  const { sessionId: urlSessionId } = useParams()
  const { user } = useOsintAuth()
  const userId = user?.id
  const {
    sessions,
    fetchSessions,
    createSession,
    updateSession,
    deleteSession,
    fetchIntelligenceSkills,
    intelligenceSkills,
    executeIntelligenceSkill,
  } = useAppStore()
  const { prompt, confirm } = useDialog()
  const { addToast } = useToast()
  const shellChrome = useOptionalWorkbenchChrome()
  const leftCollapsed = shellChrome?.leftCollapsed ?? false
  const setRightCollapsed = shellChrome?.setRightCollapsed

  const [sessionsReady, setSessionsReady] = useState(false)
  const [reportStyle, setReportStyle] = useState<ReportStyle>(() => loadReportStyle(userId))
  const [skillGroups, setSkillGroups] = useState<SkillGroupLite[]>([])
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [apiReports, setApiReports] = useState<DashboardReportItem[]>([])
  const [activeReportId, setActiveReportId] = useState<string | null>(null)
  const [dismissedReportId, setDismissedReportId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const timelineEndRef = useRef<HTMLDivElement>(null)

  const { projected, loading, error, loadedSessionId } = useAiChatSession(urlSessionId)
  const hasMore = useAiChatStore((s) => s.hasMore)
  const loadingEarlier = useAiChatStore((s) => s.loadingEarlier)
  const loadEarlierTimeline = useAiChatStore((s) => s.loadEarlierTimeline)
  const loadTimeline = useAiChatStore((s) => s.loadTimeline)
  const timelineReady = Boolean(urlSessionId && loadedSessionId === urlSessionId && !loading)
  const activeTask = useMemo(() => resolveActiveTask(projected), [projected])
  const isStreaming = activeTask.kind != null
  const inputLocked = busy || isStreaming
  const reports = useMemo((): SessionReportItem[] => {
    const eventItems = eventReportsToItems(projected.reports)
    if (eventItems.length > 0) return eventItems
    return apiReports.map((r, idx) => ({ ...r, timestamp: idx * 1000 }))
  }, [apiReports, projected.reports])

  useEffect(() => {
    void fetchIntelligenceSkills()
    void intelligenceSkillApi.listGroups().then(setSkillGroups).catch(() => {})
    void fetchSessions().finally(() => setSessionsReady(true))
  }, [fetchIntelligenceSkills, fetchSessions])

  useEffect(() => {
    setReportStyle(loadReportStyle(userId))
  }, [userId])

  useEffect(() => {
    if (!urlSessionId) {
      setApiReports([])
      return
    }
    void fetchReports(urlSessionId).then((rows) => {
      setApiReports(reportRowsToItems(rows))
    })
  }, [urlSessionId])

  useEffect(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setBusy(false)
    setDismissedReportId(loadDismissedReportId(urlSessionId))
  }, [urlSessionId])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      abortRef.current = null
    }
  }, [])

  const resolvedSessionTitle = useMemo(
    () =>
      resolveSessionTitleFromProjected({
        sessionTitle: projected.sessionTitle,
        rounds: projected.rounds,
      }),
    [projected.sessionTitle, projected.rounds],
  )

  useEffect(() => {
    if (!timelineReady || !urlSessionId) return
    const sess = sessions.find((s) => s.id === urlSessionId)
    if (
      sess &&
      isAutoSessionTitle(sess.title) &&
      resolvedSessionTitle.trim() &&
      !isAutoSessionTitle(resolvedSessionTitle) &&
      resolvedSessionTitle !== sess.title
    ) {
      void updateSession(urlSessionId, resolvedSessionTitle.trim())
    }
  }, [timelineReady, urlSessionId, resolvedSessionTitle, sessions, updateSession])

  useEffect(() => {
    if (reports.length === 0) return
    setActiveReportId((cur) => {
      if (cur && reports.some((r) => r.id === cur)) return cur
      return reports[reports.length - 1].id
    })
    setRightCollapsed?.(false)
  }, [reports, setRightCollapsed])

  const activeSession = useMemo(
    () => (urlSessionId ? sessions.find((s) => s.id === urlSessionId) : undefined),
    [sessions, urlSessionId],
  )

  const headerTitle = useMemo(() => {
    if (!timelineReady) return activeSession?.title || '新会话'
    if (!isAutoSessionTitle(resolvedSessionTitle)) return resolvedSessionTitle
    const latestRound = projected.rounds[projected.rounds.length - 1]
    const activeRound = projected.activeRoundId
      ? projected.rounds.find((r) => r.id === projected.activeRoundId)
      : latestRound
    const roundTopic = activeRound?.topic?.trim()
    if (roundTopic && !isAutoSessionTitle(roundTopic)) return roundTopic
    return activeSession?.title || resolvedSessionTitle || '新会话'
  }, [
    timelineReady,
    resolvedSessionTitle,
    projected.rounds,
    projected.activeRoundId,
    activeSession?.title,
  ])
  const rightSidebarVisible = reports.length > 0

  const handleNewSession = useCallback(async () => {
    useAiChatStore.getState().reset()
    const sess = await createSession('新会话')
    navigate(aichatPath(`/sessions/${sess.id}`))
  }, [createSession, navigate])

  const handleDeleteSession = useCallback(
    async (sessionId: string) => {
      const sess = sessions.find((s) => s.id === sessionId)
      const title = sess?.title?.trim() || '未命名会话'
      const ok = await confirm({
        title: '删除会话',
        message: `确定删除会话「${title}」？删除后无法恢复。`,
        variant: 'danger',
        confirmText: '删除',
        cancelText: '取消',
      })
      if (!ok) return
      await deleteSession(sessionId)
      if (sessionId !== urlSessionId) return
      useAiChatStore.getState().reset()
      const remaining = useAppStore.getState().sessions
      if (remaining.length > 0) {
        navigate(aichatPath(`/sessions/${remaining[0].id}`))
        return
      }
      const newSess = await createSession('新会话')
      navigate(aichatPath(`/sessions/${newSess.id}`), { replace: true })
    },
    [sessions, confirm, deleteSession, urlSessionId, navigate, createSession],
  )

  useEffect(() => {
    if (sessionsReady && !urlSessionId && sessions.length > 0) {
      navigate(aichatPath(`/sessions/${sessions[0].id}`), { replace: true })
    } else if (sessionsReady && !urlSessionId && sessions.length === 0) {
      void handleNewSession()
    }
  }, [sessionsReady, urlSessionId, sessions, navigate, handleNewSession])

  const beginChatRequest = useCallback(() => {
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    setBusy(true)
    return ac
  }, [])

  const endChatRequest = useCallback(() => {
    abortRef.current = null
    setBusy(false)
  }, [])

  const handleStop = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setBusy(false)
    if (urlSessionId && activeTask.roundId) {
      void stopRound(urlSessionId, activeTask.roundId)
    }
  }, [activeTask, urlSessionId])

  const sendW6Manual = useCallback(
    async (text: string) => {
      if (!urlSessionId) return
      const ac = beginChatRequest()
      try {
        const stripped = text.replace(/^@w6\s*/i, '').trim()
        await startRound(
          urlSessionId,
          { kind: 'w6_manual', message: stripped || text },
          ac.signal,
        )
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
        throw e
      } finally {
        endChatRequest()
      }
    },
    [urlSessionId, beginChatRequest, endChatRequest],
  )

  /** 推荐追问芯片：始终走 W6 深度调研（与旧版 sendW6Message 一致）。 */
  const handleGuidedTopic = useCallback(
    (text: string) => {
      if (busy || isStreaming) {
        addToast('info', '当前正在生成中，请稍后再试')
        return
      }
      void sendW6Manual(text)
    },
    [busy, isStreaming, sendW6Manual, addToast],
  )

  const handleSend = useCallback(
    async (text: string) => {
      if (!urlSessionId || isStreaming) return
      if (/^@w6\b/i.test(text)) {
        await sendW6Manual(text)
        return
      }
      const ac = beginChatRequest()
      try {
        const active =
          reports.length > 0
            ? (reports.find((r) => r.id === activeReportId) ?? reports[reports.length - 1])
            : undefined
        const targets = resolveActivePreviewTargets(active, reports)
        const contextEnabled = isReportContextEnabled(
          urlSessionId,
          active?.id,
          dismissedReportId,
        )
        const route = resolveFollowUpRoute(text, contextEnabled, targets)
        if (route.kind === 'discuss' && route.mode === 'edit_html') {
          await startRound(
            urlSessionId,
            {
              kind: 'discuss',
              message: text,
              mode: 'edit_html',
              target_resource_id: route.target_resource_id,
            },
            ac.signal,
          )
        } else if (route.kind === 'discuss') {
          await startRound(
            urlSessionId,
            {
              kind: 'discuss',
              message: text,
              ...(route.target_resource_id
                ? { target_resource_id: route.target_resource_id }
                : {}),
            },
            ac.signal,
          )
        } else {
          await startRound(urlSessionId, { kind: 'deepseek', message: text }, ac.signal)
        }
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
        throw e
      } finally {
        endChatRequest()
      }
    },
    [
      urlSessionId,
      isStreaming,
      sendW6Manual,
      reports,
      activeReportId,
      dismissedReportId,
      beginChatRequest,
      endChatRequest,
    ],
  )

  const handleSkillClick = useCallback(
    async (skill: IntelligenceSkill) => {
      if (!urlSessionId) return
      if (busy || isStreaming) {
        addToast('info', '当前正在生成中，请稍后再试')
        return
      }
      const fields = parseSkillFormFields(skill)
      if (fields.length === 0) {
        addToast('error', '该技能未配置表单字段')
        return
      }
      setBusy(true)
      try {
        await presentFormDraft(urlSessionId, {
          skill_id: skill.id,
          skill_key: skill.key,
          skill_name: skill.name,
          form_schema: skill.form_schema,
        })
        await loadTimeline(urlSessionId, { silent: true })
        requestAnimationFrame(() => {
          timelineEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        })
      } catch (e) {
        addToast('error', e instanceof Error ? e.message : '无法打开技能表单')
      } finally {
        setBusy(false)
      }
    },
    [urlSessionId, busy, isStreaming, addToast, loadTimeline],
  )

  const handleFormDraftSubmit = useCallback(
    async (draftId: string, skillId: string, skillKey: string, formData: Record<string, unknown>) => {
      if (!urlSessionId) return
      setBusy(true)
      try {
        const renderedPrompt = await executeIntelligenceSkill(skillId, formData)
        await startRound(urlSessionId, {
          kind: 'w6_form',
          skill_key: skillKey,
          form_data: formData,
          rendered_prompt: renderedPrompt,
          report_style: reportStyle,
          draft_id: draftId,
        })
      } finally {
        setBusy(false)
      }
    },
    [urlSessionId, executeIntelligenceSkill, reportStyle],
  )

  const handleFormDraftCancel = useCallback(
    async (draftId: string) => {
      if (!urlSessionId) return
      try {
        await cancelFormDraft(urlSessionId, draftId)
        await loadTimeline(urlSessionId, { silent: true })
      } catch (e) {
        addToast('error', e instanceof Error ? e.message : '取消失败')
      }
    },
    [urlSessionId, addToast, loadTimeline],
  )

  const activeReport = reports.find((r) => r.id === activeReportId) ?? reports[reports.length - 1]
  const reportContextEnabled = isReportContextEnabled(
    urlSessionId,
    activeReport?.id,
    dismissedReportId,
  )
  const activeReportLabel = activeReport
    ? formatReportSelectLabel(
        activeReport,
        reports.findIndex((r) => r.id === activeReport.id),
        reports,
      )
    : ''
  const panelStorageKey = userId ? `aichat-panels:${userId}` : undefined

  const handleDismissReportContext = useCallback(() => {
    if (!urlSessionId || !activeReport?.id) return
    setDismissedReportId(activeReport.id)
    saveDismissedReportId(urlSessionId, activeReport.id)
  }, [urlSessionId, activeReport?.id])

  const handleEnableReportContext = useCallback(() => {
    if (!urlSessionId) return
    setDismissedReportId(null)
    clearDismissedReportId(urlSessionId)
  }, [urlSessionId])

  const leftPanel = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-slate-200 p-3 dark:border-slate-800">
        <button
          type="button"
          onClick={() => void handleNewSession()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900"
        >
          <Plus size={16} /> 新会话
        </button>
      </div>
      <SessionSidebar
        sessions={sessions}
        activeId={urlSessionId}
        onSelect={(id) => navigate(aichatPath(`/sessions/${id}`))}
        onRename={(id) => {
          const sess = sessions.find((s) => s.id === id)
          void prompt({
            title: '重命名会话',
            message: '请输入新的会话名称',
            defaultValue: sess?.title ?? '',
            placeholder: '会话名称',
          }).then((title) => {
            if (title?.trim()) void updateSession(id, title.trim())
          })
        }}
        onDelete={(id) => void handleDeleteSession(id)}
      />
    </div>
  )

  const mainPanel = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-800">
        {headerTitle}
      </div>
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4">
        {loading ? <p className="text-sm text-slate-500">加载时间线…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {hasMore && urlSessionId ? (
          <div className="flex justify-center pb-2">
            <button
              type="button"
              disabled={loadingEarlier}
              onClick={() => void loadEarlierTimeline(urlSessionId)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {loadingEarlier ? '加载中…' : '加载更早的对话'}
            </button>
          </div>
        ) : null}
        {projected.entries.map((entry) =>
          entry.entryKind === 'form_draft' ? (
            <FormDraftBlock
              key={entry.draft.id}
              draft={entry.draft}
              disabled={busy || isStreaming}
              onSubmit={(formData) =>
                void handleFormDraftSubmit(
                  entry.draft.id,
                  entry.draft.skillId,
                  entry.draft.skillKey,
                  formData,
                )
              }
              onCancel={() => void handleFormDraftCancel(entry.draft.id)}
            />
          ) : (
            <RoundBlock
              key={entry.round.id}
              round={entry.round}
              isActive={entry.round.id === projected.activeRoundId}
              onStop={urlSessionId ? () => void stopRound(urlSessionId, entry.round.id) : undefined}
              onSelectTopic={handleGuidedTopic}
              chipsDisabled={inputLocked}
            />
          ),
        )}
        <div ref={timelineEndRef} />
      </div>
      <div className="shrink-0 border-t border-zinc-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#212121]">
        <div className="mx-auto max-w-3xl space-y-2">
          <IntelligenceSkillToolbar
            skillGroups={skillGroups}
            activeGroupId={activeGroupId}
            onActiveGroupChange={setActiveGroupId}
            intelligenceSkills={intelligenceSkills}
            onSkillClick={handleSkillClick}
            disabled={inputLocked}
          />
          {reports.length > 0 && activeReport ? (
            <ReportContextStrip
              title={activeReportLabel}
              previewKind={activeReport.kind === 'markdown' ? 'markdown' : 'html'}
              enabled={reportContextEnabled}
              disabled={inputLocked}
              onDismiss={handleDismissReportContext}
              onEnable={handleEnableReportContext}
            />
          ) : null}
          <AiChatComposer
            disabled={!urlSessionId}
            busy={busy}
            isStreaming={isStreaming}
            onStop={handleStop}
            onSend={(t) => void handleSend(t)}
            placeholder={
              reports.length > 0
                ? reportContextEnabled
                  ? '针对上方预览内容追问；改版式请说明具体调整；@w6 为深度调研'
                  : '纯对话模式；@w6 开头为深度调研'
                : '输入追问；@w6 开头为深度调研'
            }
          />
        </div>
      </div>
    </div>
  )

  const reportItems = reports.map((r, idx) => ({
    ...r,
    title: formatReportSelectLabel(r, idx, reports),
  }))

  const rightPanel = (
    <ReportCanvasPanel
      reports={reportItems}
      activeReportId={activeReport?.id ?? null}
      onActiveChange={setActiveReportId}
      onReportClose={(id) => {
        setApiReports((prev) => prev.filter((r) => r.id !== id))
        if (activeReportId === id) setActiveReportId(null)
      }}
    />
  )

  return (
    <WorkbenchLayout
      className="h-full min-h-0 w-full bg-[#f3f5f7] dark:bg-slate-950"
      innerClassName="h-full min-h-0 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950"
      leftPanelId="aichat-left"
      mainPanelId="aichat-main"
      rightPanelId="aichat-right"
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
  )
}
