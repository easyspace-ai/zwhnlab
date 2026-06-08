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
import { DashboardGenerativeForm } from '@/features/osint-dashboard/components/GenerativeForm'
import { ReportCanvasPanel } from '@/features/osint-dashboard/components/ReportCanvasPanel'
import { loadReportStyle, saveReportStyle, type ReportStyle } from '@/features/osint-dashboard/lib/reportStyle'
import { formatReportSelectLabel } from '@/features/osint-dashboard/lib/reportTitleDisplay'
import type { DashboardReportItem } from '@/features/osint-dashboard/types'
import { aichatPath } from '../routes'
import { useAiChatSession } from '../hooks/useAiChatSession'
import { SessionSidebar } from '../components/SessionSidebar'
import { RoundBlock } from '../components/Timeline/RoundBlock'
import { AiChatComposer } from '../components/composer/AiChatComposer'
import { startRound, stopRound, fetchReports } from '../api/aichatApi'
import { parseSkillFormFields } from '../lib/parseSkillForm'
import { eventReportsToItems, mergeReportItems, reportRowsToItems } from '../lib/reportItems'
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
  const [pendingSkill, setPendingSkill] = useState<IntelligenceSkill | null>(null)
  const [pendingFields, setPendingFields] = useState<ReturnType<typeof parseSkillFormFields>>([])
  const [skillGroups, setSkillGroups] = useState<SkillGroupLite[]>([])
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [apiReports, setApiReports] = useState<DashboardReportItem[]>([])
  const [activeReportId, setActiveReportId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const { projected, loading, error } = useAiChatSession(urlSessionId)
  const activeTask = useMemo(() => resolveActiveTask(projected), [projected])
  const isStreaming = activeTask.kind === 'w6' || busy
  const reports = useMemo(
    () => mergeReportItems(apiReports, eventReportsToItems(projected.reports)),
    [apiReports, projected.reports],
  )

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

  const headerTitle = projected.sessionTitle || activeSession?.title || '新研究'
  const rightSidebarVisible = reports.length > 0

  const handleNewSession = useCallback(async () => {
    const sess = await createSession('新研究')
    navigate(aichatPath(`/sessions/${sess.id}`))
  }, [createSession, navigate])

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
    if (activeTask.kind === 'w6' && urlSessionId && activeTask.roundId) {
      void stopRound(urlSessionId, activeTask.roundId)
      return
    }
    abortRef.current?.abort()
    abortRef.current = null
    setBusy(false)
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
      if (busy) {
        addToast('info', '当前正在生成中，请稍后再试')
        return
      }
      void sendW6Manual(text)
    },
    [busy, sendW6Manual, addToast],
  )

  const handleSend = useCallback(
    async (text: string) => {
      if (!urlSessionId) return
      if (/^@w6\b/i.test(text)) {
        await sendW6Manual(text)
        return
      }
      const ac = beginChatRequest()
      try {
        if (reports.length > 0) {
          await startRound(urlSessionId, { kind: 'discuss', message: text }, ac.signal)
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
    [urlSessionId, sendW6Manual, reports.length, beginChatRequest, endChatRequest],
  )

  const handleSkillClick = useCallback(
    (skill: IntelligenceSkill) => {
      if (busy) {
        addToast('info', '当前正在生成中，请稍后再试')
        return
      }
      const fields = parseSkillFormFields(skill)
      if (fields.length === 0) {
        addToast('error', '该技能未配置表单字段')
        return
      }
      setPendingSkill(skill)
      setPendingFields(fields)
    },
    [busy, addToast],
  )

  const handleFormSubmit = useCallback(
    async (formData: Record<string, unknown>) => {
      if (!urlSessionId || !pendingSkill) return
      setBusy(true)
      const skill = pendingSkill
      setPendingSkill(null)
      setPendingFields([])
      try {
        const renderedPrompt = await executeIntelligenceSkill(skill.id, formData)
        await startRound(urlSessionId, {
          kind: 'w6_form',
          skill_key: skill.key,
          form_data: formData,
          rendered_prompt: renderedPrompt,
          report_style: reportStyle,
        })
      } finally {
        setBusy(false)
      }
    },
    [urlSessionId, pendingSkill, executeIntelligenceSkill, reportStyle],
  )

  const activeReport = reports.find((r) => r.id === activeReportId) ?? reports[reports.length - 1]
  const panelStorageKey = userId ? `aichat-panels:${userId}` : undefined

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
          void prompt('重命名会话', '').then((title) => {
            if (title?.trim()) void updateSession(id, title.trim())
          })
        }}
        onDelete={(id) => {
          void confirm('删除此会话？').then((ok) => {
            if (!ok) return
            void deleteSession(id)
            if (id === urlSessionId) navigate(aichatPath('/'))
          })
        }}
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
        {projected.rounds.map((round) => (
          <RoundBlock
            key={round.id}
            round={round}
            isActive={round.id === projected.activeRoundId}
            onStop={urlSessionId ? () => void stopRound(urlSessionId, round.id) : undefined}
            onSelectTopic={handleGuidedTopic}
          />
        ))}
        {pendingSkill && pendingFields.length > 0 ? (
          <DashboardGenerativeForm
            fields={pendingFields}
            onSubmit={(formData) => void handleFormSubmit(formData)}
            disabled={busy}
          />
        ) : null}
      </div>
      <div className="shrink-0 border-t border-zinc-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#212121]">
        <div className="mx-auto max-w-3xl space-y-2">
          <IntelligenceSkillToolbar
            skillGroups={skillGroups}
            activeGroupId={activeGroupId}
            onActiveGroupChange={setActiveGroupId}
            intelligenceSkills={intelligenceSkills}
            onSkillClick={handleSkillClick}
            disabled={isStreaming}
          />
          <AiChatComposer
            disabled={!urlSessionId}
            isStreaming={isStreaming}
            onStop={handleStop}
            onSend={(t) => void handleSend(t)}
            placeholder={
              reports.length > 0
                ? '针对当前报告改版式或追问内容；@w6 开头为深度调研'
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
