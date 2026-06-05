import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Loader2, RefreshCw, ShieldCheck } from 'lucide-react'
import { useOsintAuth } from '@/osint/auth'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/osint/stores/apiStore'
import { useToast } from '@/osint/components/ui/Feedback'
import AIChatBoxNew, { type ChatMessage, type Attachment } from '@/osint/components/AIChatBoxNew'
import { SkillFormModal } from '@/osint/components/intelligence/SkillFormModal'
import {
  orderSkillsForGroup,
  resolveIntelligenceAnalystGroup,
  type SkillGroupLite,
} from '@/osint/lib/intelligenceSkillToolbar'
import { intelligenceSkillApi } from '@/osint/services/api'
import type { IntelligenceSkill } from '@/osint/types'
import type { MessageStatus } from '@/osint/components/ai-elements'

const skillIconMap: Record<string, ReactNode> = {
  ShieldCheck: <ShieldCheck size={12} />,
}

type Props = {
  /** Saved Polymarket row id — enables /api/polymarket/... chat history + W6 fallback. */
  savedEventId: string | null
  sessionId: string | null
  /** 当前事件标题，用于注入技能目标字段 */
  eventTitle?: string | null
}

export function PolymarketOsintChatPanel({ savedEventId, sessionId, eventTitle }: Props) {
  const { addToast } = useToast()

  const {
    messages,
    intelligenceSkills,
    messagePagination,
    isStreaming,
    messagesLoadingBySession,
    wsStatus,
    wsReconnectAttempt,
    wsReconnectMaxAttempts,
    error,
    fetchMessagesBySession,
    setActiveMessageSession,
    clearSessionMessages,
    loadOlderMessages,
    sendMessageWS,
    connectWebSocket,
    disconnectWebSocket,
    retryWebSocketConnection,
    abortActiveMessageStream,
    fetchIntelligenceSkills,
    executeIntelligenceSkill,
  } = useAppStore()

  const { user, ready } = useOsintAuth()
  const [activeSkill, setActiveSkill] = useState<IntelligenceSkill | null>(null)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [skillInitialValues, setSkillInitialValues] = useState<Record<string, any> | undefined>(undefined)
  const [historyPhase, setHistoryPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [analystGroup, setAnalystGroup] = useState<SkillGroupLite | null>(null)

  const initRunIdRef = useRef(0)
  const prevSessionIdRef = useRef<string | undefined>(undefined)

  const reloadHistory = useCallback(async () => {
    if (!sessionId) return
    setHistoryPhase('loading')
    try {
      await fetchMessagesBySession(sessionId, {
        mode: 'replaceLatest',
        ...(savedEventId ? { polymarketSavedId: savedEventId } : {}),
      })
      setHistoryPhase('done')
    } catch (err) {
      setHistoryPhase('error')
      throw err
    }
  }, [sessionId, savedEventId, fetchMessagesBySession])

  const syncReady = ready && !!user
  const syncErr = !ready ? null : user ? null : '请先登录以使用 AI 对话'
  useEffect(() => {
    if (!syncReady) return
    void fetchIntelligenceSkills()
    void intelligenceSkillApi
      .listGroups()
      .then((groups) => setAnalystGroup(resolveIntelligenceAnalystGroup(groups)))
      .catch(() =>
        setAnalystGroup(resolveIntelligenceAnalystGroup([])),
      )
  }, [syncReady, fetchIntelligenceSkills])

  useEffect(() => {
    if (sessionId) {
      useAppStore.setState({ error: null })
    }
  }, [sessionId])

  useEffect(() => {
    const runId = ++initRunIdRef.current
    let cancelled = false

    setActiveMessageSession(sessionId ?? undefined)
    if (sessionId) {
      const sessionChanged = prevSessionIdRef.current !== sessionId
      prevSessionIdRef.current = sessionId

      if (sessionChanged) {
        clearSessionMessages(sessionId)
        setHistoryPhase('loading')
      }

      void (async () => {
        try {
          await fetchMessagesBySession(sessionId, {
            mode: 'replaceLatest',
            ...(savedEventId ? { polymarketSavedId: savedEventId } : {}),
          })
          if (!cancelled && initRunIdRef.current === runId) {
            setHistoryPhase(useAppStore.getState().error ? 'error' : 'done')
          }
        } catch (err) {
          console.error('[PolymarketOsintChat]', err)
          if (!cancelled && initRunIdRef.current === runId) {
            setHistoryPhase('error')
          }
        }
        if (cancelled || initRunIdRef.current !== runId) return
        connectWebSocket(sessionId, savedEventId || undefined)
      })()
    } else {
      clearSessionMessages()
      prevSessionIdRef.current = undefined
      setHistoryPhase('idle')
    }

    return () => {
      cancelled = true
      if (sessionId) disconnectWebSocket(sessionId)
    }
  }, [
    syncReady,
    savedEventId,
    sessionId,
    fetchMessagesBySession,
    connectWebSocket,
    disconnectWebSocket,
    setActiveMessageSession,
    clearSessionMessages,
  ])

  useEffect(() => {
    return () => {
      abortActiveMessageStream()
    }
  }, [abortActiveMessageStream])

  const handleSendMessage = async (
    message: string,
    _mode: string,
    _skillId: string | null,
    attachments: Attachment[],
    _model?: string,
  ) => {
    if (!sessionId) return
    sendMessageWS(sessionId, message, attachments.map((a) => a.id))
  }

  const handleSkillClick = useCallback(
    (skill: IntelligenceSkill) => {
      if (isStreaming) {
        addToast('info', '当前正在生成中，请稍后再试')
        return
      }
      if (eventTitle) {
        setSkillInitialValues({ target: eventTitle })
      } else {
        setSkillInitialValues(undefined)
      }
      setActiveSkill(skill)
      setShowSkillModal(true)
    },
    [isStreaming, addToast, eventTitle],
  )

  const handleSkillSubmit = async (formData: Record<string, unknown>) => {
    if (!activeSkill) return
    try {
      const renderedMessage = await executeIntelligenceSkill(activeSkill.id, formData)
      if (sessionId) {
        sendMessageWS(sessionId, renderedMessage, [])
      }
      addToast('success', `${activeSkill.name} 已提交`)
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : '提交失败')
    }
  }

  const toolbarSkills = useMemo(
    () => orderSkillsForGroup(intelligenceSkills, analystGroup),
    [intelligenceSkills, analystGroup],
  )

  const skillToolbar = useMemo(
    () => (
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {toolbarSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => handleSkillClick(skill)}
              disabled={isStreaming}
              className={cn(
                'flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1 text-[11px] font-medium transition-all',
                isStreaming
                  ? 'cursor-not-allowed border-slate-100 text-slate-300 opacity-40 dark:border-slate-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800',
              )}
            >
              <span className="text-slate-400 dark:text-slate-500">
                {skillIconMap[skill.icon || ''] || <ShieldCheck size={12} />}
              </span>
              {skill.name}
            </button>
          ))}
      </div>
    ),
    [toolbarSkills, isStreaming, handleSkillClick],
  )

  const chatMessages: ChatMessage[] = messages.map((m) => ({
    messageKind: (() => {
      const kind = (m.attachments as { upstream_kind?: string })?.upstream_kind
      const isProcess = Boolean((m.attachments as { is_process?: boolean })?.is_process)
      if (kind === 'system') return 'system' as const
      if (isProcess || kind === 'reasoning' || kind === 'internal_thought' || kind === 'subliminal_thought') {
        return 'reasoning' as const
      }
      return 'normal' as const
    })(),
    id: m.id,
    role: (m.role === 'system' ? 'assistant' : m.role) as 'user' | 'assistant',
    content: m.content,
    upstreamKind:
      typeof (m.attachments as { upstream_kind?: string })?.upstream_kind === 'string'
        ? String((m.attachments as { upstream_kind?: string }).upstream_kind)
        : undefined,
    thinkingTime: undefined,
    status:
      m.role === 'assistant'
        ? (() => {
            const s = m.status?.toLowerCase() || ''
            if (s.includes('think') || s.includes('reason')) return 'thinking' as MessageStatus
            if (s.includes('tool')) return 'tool-calling' as MessageStatus
            return 'streaming' as MessageStatus
          })()
        : undefined,
    resourceRefs: m.resource_refs,
  }))

  const currentSessionPagination = sessionId ? messagePagination[sessionId] : undefined
  const isLoadingMessages = Boolean(sessionId && messagesLoadingBySession?.[sessionId])
  const currentWsStatus = sessionId ? wsStatus?.[sessionId] : undefined
  const currentWsAttempt = sessionId ? wsReconnectAttempt?.[sessionId] : undefined
  const currentWsMax = sessionId ? wsReconnectMaxAttempts?.[sessionId] : undefined

  const showHistoryLoading =
    historyPhase === 'loading' || isLoadingMessages || (historyPhase === 'idle' && Boolean(sessionId))
  const showEmptyRetry =
    Boolean(sessionId) &&
    !showHistoryLoading &&
    chatMessages.length === 0 &&
    (historyPhase === 'error' || Boolean(error) || currentWsStatus === 'failed')

  const handleRetryAll = useCallback(async () => {
    if (!sessionId) return
    setHistoryPhase('loading')
    try {
      await reloadHistory()
      connectWebSocket(sessionId, savedEventId || undefined)
      addToast('success', '已重新加载')
    } catch {
      addToast('error', '加载失败，请检查网络或稍后重试')
    }
  }, [sessionId, savedEventId, reloadHistory, connectWebSocket, addToast])

  if (syncErr) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-[12px] text-rose-600 dark:text-rose-400">
        {syncErr}
      </div>
    )
  }
  if (!syncReady) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-[12px] text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <p>准备 AI 环境…</p>
      </div>
    )
  }
  if (!sessionId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-[12px] text-slate-500 dark:text-slate-400">
        <p>该事件尚未绑定 AI 会话。</p>
        <p className="text-[11px]">
          请从左侧移除后重新搜索并保存本事件（保存时已登录），系统将自动创建会话。
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-slate-950">
      {showHistoryLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-[1px] dark:bg-slate-950/85">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <p className="text-[12px] text-slate-600 dark:text-slate-400">正在加载会话历史…</p>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-visible">
        <AIChatBoxNew
          messages={chatMessages}
          studioActions={[]}
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          isLoadingMessages={isLoadingMessages}
          hasMoreOlder={Boolean(currentSessionPagination?.hasMore)}
          loadingOlder={Boolean(currentSessionPagination?.loadingOlder)}
          onLoadOlder={async () => {
            if (!sessionId) return
            await loadOlderMessages(sessionId)
          }}
          wsConnectionStatus={currentWsStatus}
          wsReconnectAttempt={currentWsAttempt}
          wsReconnectMaxAttempts={currentWsMax}
          onRetryConnection={sessionId ? () => retryWebSocketConnection(sessionId) : undefined}
          error={error}
          onRetryLoadMessages={
            sessionId
              ? () =>
                  fetchMessagesBySession(sessionId, {
                    mode: 'replaceLatest',
                    ...(savedEventId ? { polymarketSavedId: savedEventId } : {}),
                  })
              : undefined
          }
          onCopy={(content) => navigator.clipboard.writeText(content).then(() => addToast('success', '已复制'))}
          onRegenerate={() => addToast('info', '重新生成…')}
          autoFocus={false}
          toolbar={skillToolbar}
          sessionId={sessionId}
        />
      </div>

      {showEmptyRetry && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6">
          <div className="pointer-events-auto flex max-w-sm flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white/95 px-4 py-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/95">
            <p className="text-[12px] text-slate-600 dark:text-slate-400">
              {error || '未能加载聊天记录，可能未连上 AI 服务或会话尚未同步'}
            </p>
            <button
              type="button"
              onClick={() => void handleRetryAll()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              重新加载历史
            </button>
          </div>
        </div>
      )}

      <SkillFormModal
        skill={activeSkill}
        isOpen={showSkillModal}
        onClose={() => {
          setShowSkillModal(false)
          setActiveSkill(null)
        }}
        onSubmit={handleSkillSubmit}
        initialValues={skillInitialValues}
      />
    </div>
  )
}
