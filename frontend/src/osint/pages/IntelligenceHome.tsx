import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, MessageSquare, ShieldCheck, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/osint/utils'
import { useOptionalWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { useAppStore } from '@/osint/stores/apiStore'
import { useToast } from '@/osint/components/ui/Feedback'
import { useDialog } from '@/osint/components/ui/Dialog'
import AIChatBoxNew, { type ChatMessage, type Attachment } from '@/osint/components/AIChatBoxNew'
import { SkillFormModal } from '@/osint/components/intelligence/SkillFormModal'
import { IntelligenceSkillToolbar } from '@/osint/components/intelligence/IntelligenceSkillToolbar'
import { intelligenceSkillApi } from '@/osint/services/api'
import type { IntelligenceSkill } from '@/osint/types'
import type { MessageStatus } from '@/osint/components/ai-elements'
import { chatUploadGroup, chatUploadLog } from '@/osint/lib/chatUploadLog'
import { previewCacheAliases, seedCachedPreviewFromFile } from '@/osint/lib/chatPreviewCache'

/** 嵌入 polyai 时为 `/ai-session`；独立运行时不设置 */
const OSINT_ROUTE_BASE = String((import.meta as any).env?.VITE_OSINT_ROUTE_BASE ?? '').replace(/\/$/, '')
function intelRel(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  if (!OSINT_ROUTE_BASE) return p
  return `${OSINT_ROUTE_BASE}${p}`
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
        'group flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-150 select-none border-l-2 border-transparent',
        isActive
          ? 'bg-blue-50/90 text-slate-900 border-blue-600 dark:bg-blue-950/35 dark:text-slate-100 dark:border-blue-500'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
      )}
    >
      <MessageSquare size={13} className={cn('shrink-0', isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400')} />
      <span className="text-[13px] truncate flex-1 leading-tight">{session.title}</span>
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu) }}
          className={cn(
            'p-1 rounded-md transition-opacity',
            isActive ? 'hover:bg-white text-gray-400' : 'hover:bg-white/60 text-gray-300',
            showMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        >
          <MoreVertical size={11} />
        </button>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-gray-100 shadow-xl z-20 min-w-[120px] py-1">
              <button
                onClick={(e) => { e.stopPropagation(); onRename(); setShowMenu(false) }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={11} /> 重命名
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); setShowMenu(false) }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-danger-600 hover:bg-danger-50"
              >
                <Trash2 size={11} /> 删除
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function IntelligenceHome() {
  const navigate = useNavigate()
  const { sessionId: urlSessionId } = useParams()

  const {
    sessions,
    messages,
    intelligenceSkills,
    messagePagination,
    isStreaming,
    messagesLoadingBySession,
    wsStatus,
    wsReconnectAttempt,
    wsReconnectMaxAttempts,
    error,
    fetchSessions,
    fetchMessagesBySession,
    setActiveMessageSession,
    clearSessionMessages,
    loadOlderMessages,
    createSession,
    updateSession,
    deleteSession,
    sendMessageWS,
    uploadResource,
    connectWebSocket,
    disconnectWebSocket,
    retryWebSocketConnection,
    abortActiveMessageStream,
    fetchResources,
    fetchIntelligenceSkills,
    executeIntelligenceSkill,
  } = useAppStore()

  const { addToast } = useToast()
  const { confirm, prompt } = useDialog()

  const shellChrome = useOptionalWorkbenchChrome()
  const leftHidden = Boolean(shellChrome?.leftCollapsed)
  const [activeSkill, setActiveSkill] = useState<IntelligenceSkill | null>(null)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [skillGroups, setSkillGroups] = useState<Array<{ id: string; name: string; skill_ids: string[] }>>([])
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)

  const initRunIdRef = useRef(0)
  const prevSessionIdRef = useRef<string | undefined>(undefined)
  const historyRecoveryAtRef = useRef<Record<string, number>>({})
  const wsRecoveryAtRef = useRef<Record<string, number>>({})

  useEffect(() => {
    void fetchSessions()
    void fetchIntelligenceSkills()
    void intelligenceSkillApi.listGroups().then(setSkillGroups).catch(() => {})
  }, [fetchSessions, fetchIntelligenceSkills])

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

  // 无 session 路由时：列表就绪后重定向到第一个会话
  useEffect(() => {
    if (urlSessionId) return
    let cancelled = false
    const run = async () => {
      await fetchSessions()
      if (cancelled) return
      const sessList = useAppStore.getState().sessions
      if (sessList.length > 0) {
        navigate(intelRel(`/sessions/${sessList[0].id}`), { replace: true })
      }
    }
    void run()
    return () => { cancelled = true }
  }, [urlSessionId, navigate, fetchSessions])

  useEffect(() => {
    const runId = ++initRunIdRef.current
    let cancelled = false

    setActiveMessageSession(urlSessionId)
    if (urlSessionId) {
      const sessionChanged = prevSessionIdRef.current !== urlSessionId
      prevSessionIdRef.current = urlSessionId

      if (sessionChanged) {
        clearSessionMessages(urlSessionId)
      }

      void (async () => {
        try {
          await fetchSessions()
        } catch (e) {}
        if (cancelled || initRunIdRef.current !== runId) return

        try {
          await fetchMessagesBySession(urlSessionId, { mode: 'replaceLatest' })
        } catch (err) {
          console.error('[IntelligenceHome] Failed to fetch messages:', err)
        }
        if (cancelled || initRunIdRef.current !== runId) return

        void fetchResources(urlSessionId)

        connectWebSocket(urlSessionId)
      })()
    } else {
      clearSessionMessages()
      prevSessionIdRef.current = undefined
    }

    return () => {
      cancelled = true
      if (urlSessionId) disconnectWebSocket(urlSessionId)
    }
  }, [urlSessionId, fetchSessions, fetchMessagesBySession, fetchResources, connectWebSocket, disconnectWebSocket, setActiveMessageSession, clearSessionMessages])

  useEffect(() => {
    if (!urlSessionId) return
    if (wsStatus?.[urlSessionId] === 'connected' || wsStatus?.[urlSessionId] === 'connecting' || wsStatus?.[urlSessionId] === 'reconnecting') return
    const now = Date.now()
    const lastAt = wsRecoveryAtRef.current[urlSessionId] || 0
    if (now - lastAt < 3000) return
    wsRecoveryAtRef.current[urlSessionId] = now
    retryWebSocketConnection(urlSessionId)
  }, [urlSessionId, wsStatus, retryWebSocketConnection])

  useEffect(() => {
    if (!urlSessionId) return
    if (messagesLoadingBySession?.[urlSessionId]) return
    if (messages.length > 0) return
    const now = Date.now()
    const lastAt = historyRecoveryAtRef.current[urlSessionId] || 0
    if (now - lastAt < 3000) return
    historyRecoveryAtRef.current[urlSessionId] = now
    void fetchMessagesBySession(urlSessionId, { mode: 'replaceLatest' })
  }, [urlSessionId, messagesLoadingBySession, messages.length, wsStatus, fetchMessagesBySession])

  useEffect(() => {
    return () => { abortActiveMessageStream() }
  }, [abortActiveMessageStream])

  const handleNewSession = async () => {
    const newSess = await createSession('新对话')
    navigate(intelRel(`/sessions/${newSess.id}`))
  }

  const handleRenameSession = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId)
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
      message: '确定要删除此会话吗？所有消息将一并删除，此操作不可恢复。',
      variant: 'danger',
      confirmText: '删除',
      cancelText: '取消',
    })
    if (confirmed) {
      await deleteSession(sessionId)
      if (urlSessionId === sessionId) {
        const remaining = useAppStore.getState().sessions
        if (remaining.length > 0) {
          navigate(intelRel(`/sessions/${remaining[0].id}`))
        } else {
          navigate(intelRel('/'))
        }
      }
    }
  }

  const ensureActiveSession = async (titleHint?: string): Promise<string> => {
    if (urlSessionId) return urlSessionId
    const title = (titleHint?.trim().slice(0, 30) || '新对话')
    const newSess = await createSession(title)
    setActiveMessageSession(newSess.id)
    connectWebSocket(newSess.id)
    navigate(intelRel(`/sessions/${newSess.id}`), { replace: true })
    return newSess.id
  }

  const handleSendMessage = async (message: string, _mode: string, _skillId: string | null, attachments: Attachment[], _model?: string) => {
    const sessionId = await ensureActiveSession(message)
    const localAttachments = attachments.filter((a) => a.type === 'local' && a.file)
    const libraryRefs = attachments
      .filter((a) => a.type !== 'local')
      .map((a) => ({ id: a.id, name: a.name, type: a.type }))

    let uploadedRefs: Array<{ id: string; name?: string; type?: string }> = []
    if (localAttachments.length > 0) {
      try {
        uploadedRefs = await chatUploadGroup(
          `upload ${localAttachments.length} local file(s)`,
          { sessionId, files: localAttachments.map((a) => a.name) },
          async () => {
            const refs: Array<{ id: string; name?: string; type?: string }> = []
            for (const att of localAttachments) {
              const file = att.file!
              chatUploadLog('upload_start', 'uploading local file before send', {
                tempId: att.id,
                fileName: file.name,
                destination: 'POST /api/sessions/:id/upload → AI SDK cloud + DB resource row',
              })
              const resource = await uploadResource(sessionId, file)
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
              chatUploadLog('upload_success', 'mapped temp attachment to server resource id', {
                tempId: att.id,
                resourceId: resource.id,
                url: resource.url,
              })
            }
            return refs
          },
        )
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : '文件上传失败'
        chatUploadLog('upload_failure', msg, { sessionId }, 'error')
        addToast('error', msg)
        return
      }
    }

    const resourceRefs = [...libraryRefs, ...uploadedRefs]
    chatUploadLog('send_message', 'sending via WebSocket with resource_refs', {
      sessionId,
      resourceRefs,
      localUploaded: uploadedRefs.length,
      libraryAttached: libraryRefs.length,
    })
    sendMessageWS(sessionId, message, resourceRefs)
  }

  const handleSkillClick = (skill: IntelligenceSkill) => {
    if (isStreaming) {
      addToast('info', '当前正在生成中，请稍后再试')
      return
    }
    setActiveSkill(skill)
    setShowSkillModal(true)
  }

  const handleSkillSubmit = async (formData: Record<string, any>) => {
    if (!activeSkill) return
    try {
      const renderedMessage = await executeIntelligenceSkill(activeSkill.id, formData)
      const sessionId = await ensureActiveSession(activeSkill.name)
      sendMessageWS(sessionId, renderedMessage, [])
      addToast('success', `${activeSkill.name} 已提交`)
    } catch (err: any) {
      addToast('error', err?.message || '提交失败')
    }
  }

  const skillToolbar = (
    <IntelligenceSkillToolbar
      skillGroups={skillGroups}
      activeGroupId={activeGroupId}
      onActiveGroupChange={setActiveGroupId}
      intelligenceSkills={intelligenceSkills}
      onSkillClick={handleSkillClick}
      disabled={isStreaming}
    />
  )

  // 消息转换
  const chatMessages: ChatMessage[] = messages.map(m => ({
    messageKind: (() => {
      const kind = (m.attachments as any)?.upstream_kind
      const isProcess = Boolean((m.attachments as any)?.is_process)
      if (kind === 'system') return 'system' as const
      if (isProcess || kind === 'reasoning' || kind === 'internal_thought' || kind === 'subliminal_thought') {
        return 'reasoning' as const
      }
      return 'normal' as const
    })(),
    id: m.id,
    role: (m.role === 'system' ? 'assistant' : m.role) as 'user' | 'assistant',
    content: m.content,
    upstreamKind: typeof (m.attachments as any)?.upstream_kind === 'string'
      ? String((m.attachments as any).upstream_kind)
      : undefined,
    thinkingTime: undefined,
    status: m.role === 'assistant' ? (() => {
      const s = m.status?.toLowerCase() || ''
      if (s.includes('think') || s.includes('reason')) return 'thinking' as MessageStatus
      if (s.includes('tool')) return 'tool-calling' as MessageStatus
      return 'streaming' as MessageStatus
    })() : undefined,
    resourceRefs: m.resource_refs,
  }))

  const currentSessionPagination = urlSessionId ? messagePagination[urlSessionId] : undefined
  const isLoadingMessages = Boolean(urlSessionId && messagesLoadingBySession?.[urlSessionId])
  const currentWsStatus = urlSessionId ? wsStatus?.[urlSessionId] : undefined
  const currentWsAttempt = urlSessionId ? wsReconnectAttempt?.[urlSessionId] : undefined
  const currentWsMax = urlSessionId ? wsReconnectMaxAttempts?.[urlSessionId] : undefined

  return (
    <div className="flex h-full min-h-0 w-full bg-[#f3f5f7] dark:bg-slate-950">
      {/* 左侧会话栏：展开/收起仅由主壳顶栏 PanelLeft 控制（WorkbenchChrome） */}
      <aside
        className={cn(
          'flex flex-col shrink-0 overflow-hidden border-r border-slate-200/90 bg-white transition-[width] duration-200 ease-out dark:border-slate-800 dark:bg-slate-900',
          leftHidden ? 'w-0 border-r-0' : 'w-[240px]'
        )}
        aria-hidden={leftHidden}
      >
        <div className="flex min-h-0 min-w-[240px] flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-slate-200/90 px-3 py-3 dark:border-slate-800">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100">
              <ShieldCheck size={14} className="text-white dark:text-slate-900" />
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">情报工作台</span>
          </div>

          <div className="px-3 pb-2 pt-2">
            <button
              type="button"
              onClick={handleNewSession}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <Plus size={14} />
              新会话
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2">
            {sessions.length === 0 ? (
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
                  onClick={() => navigate(intelRel(`/sessions/${session.id}`))}
                  onRename={() => handleRenameSession(session.id)}
                  onDelete={() => handleDeleteSession(session.id)}
                />
              ))
            )}
          </div>
        </div>
      </aside>

      {/* 主聊天区 */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-1 flex-col min-h-0 overflow-visible">
          <AIChatBoxNew
            messages={chatMessages}
            studioActions={[]}
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
            isLoadingMessages={isLoadingMessages}
            hasMoreOlder={Boolean(currentSessionPagination?.hasMore)}
            loadingOlder={Boolean(currentSessionPagination?.loadingOlder)}
            onLoadOlder={async () => {
              if (!urlSessionId) return
              await loadOlderMessages(urlSessionId)
            }}
            wsConnectionStatus={currentWsStatus}
            wsReconnectAttempt={currentWsAttempt}
            wsReconnectMaxAttempts={currentWsMax}
            onRetryConnection={urlSessionId ? () => retryWebSocketConnection(urlSessionId) : undefined}
            error={error}
            onRetryLoadMessages={urlSessionId ? () => fetchMessagesBySession(urlSessionId, { mode: 'replaceLatest' }) : undefined}
            onCopy={(content) => navigator.clipboard.writeText(content).then(() => addToast('success', '已复制'))}
            onRegenerate={() => addToast('info', '重新生成...')}
            autoFocus={true}
            toolbar={skillToolbar}
            sessionId={urlSessionId || undefined}
          />
        </div>
      </div>

      {/* Skill 表单弹窗 */}
      <SkillFormModal
        skill={activeSkill}
        isOpen={showSkillModal}
        onClose={() => { setShowSkillModal(false); setActiveSkill(null) }}
        onSubmit={handleSkillSubmit}
      />
    </div>
  )
}
