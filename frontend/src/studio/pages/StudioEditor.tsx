import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileCode, Loader2, MessageSquare, Presentation, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { studioHomePath } from '../lib/routes'
import { ohmypptApi } from '../lib/ohmypptApi'
import {
  buildPptxPreviewCacheKey,
  getCachedPptxPreview,
  setCachedPptxPreview,
} from '../lib/pptxPreviewCache'
import type { GenerateChunkEvent, OhMyPptMessage, OhMyPptPage } from '../lib/ohmypptTypes'
import { SimplifiedDeckPreview } from '@/slideglance/components/SimplifiedDeckPreview'
import { SlideglanceErrorBoundary } from '@/slideglance/components/SlideglanceErrorBoundary'

type ChatMsg =
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string }
  | {
      role: 'stage'
      stage: string
      label: string
      content: string
      expanded: boolean
      done: boolean
    }

function resolvePageId(page: OhMyPptPage): string {
  return page.pageId || page.id || `page-${page.pageNumber}`
}

function formatStageLabel(stage: string): string {
  const map: Record<string, string> = {
    planning: '规划大纲',
    outline: '组织大纲',
    design: '设计样式',
    generate: '生成页面',
    rendering: '渲染页面',
    preflight: '准备生成',
    run_completed: '完成',
    run_error: '出错',
  }
  return map[stage] || stage
}

function dbMessagesToChat(messages: OhMyPptMessage[], topic?: string): ChatMsg[] {
  const out: ChatMsg[] = []
  for (const m of messages) {
    if (m.role === 'user' && m.content.trim()) {
      out.push({ role: 'user', content: m.content })
    } else if (m.role === 'assistant' && m.content.trim()) {
      out.push({ role: 'assistant', content: m.content })
    } else if (m.role === 'system' && m.type === 'stream_chunk' && m.content.trim()) {
      out.push({
        role: 'stage',
        stage: `history-${m.id || out.length}`,
        label: '生成进度',
        content: m.content,
        expanded: false,
        done: true,
      })
    }
  }
  if (out.length === 0 && topic?.trim()) {
    return [{ role: 'user', content: topic.trim() }]
  }
  return out
}

async function streamWithSubscribeFallback(
  sessionId: string,
  onChunk: (ev: GenerateChunkEvent) => void,
  opts?: { user_message?: string },
): Promise<void> {
  try {
    await ohmypptApi.streamGenerate(sessionId, onChunk, opts)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : ''
    if (msg.includes('正在生成中')) {
      await ohmypptApi.streamSubscribe(sessionId, onChunk)
      return
    }
    throw e
  }
}

export default function StudioEditor() {
  const { projectId: sessionId } = useParams<{ projectId: string }>()
  const location = useLocation()
  const autoRunDone = useRef(false)

  const [title, setTitle] = useState('')
  const [sessionUpdatedAt, setSessionUpdatedAt] = useState(0)
  const [topic, setTopic] = useState('')
  const [pages, setPages] = useState<OhMyPptPage[]>([])
  const [stage, setStage] = useState('')
  const [stageMsg, setStageMsg] = useState('')
  const [logLines, setLogLines] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [exportingZip, setExportingZip] = useState(false)
  const [exportingPptx, setExportingPptx] = useState(false)
  const [currentPageIdx, setCurrentPageIdx] = useState(0)
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewLoading, setPreviewLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [previewTab, setPreviewTab] = useState<'pptx'>('pptx')
  const [pptxBytes, setPptxBytes] = useState<Uint8Array | null>(null)
  const [pptxBuilding, setPptxBuilding] = useState(false)
  const stageMsgRef = useRef<ChatMsg | null>(null)
  const subscribeStarted = useRef(false)

  const completedPages = useMemo(
    () => pages.filter((p) => p.status === 'completed' || p.status === 'generated').length,
    [pages],
  )
  const totalPages = pages.length

  const pptxPreviewCacheKey = useMemo(() => {
    if (!sessionId || pages.length === 0) return ''
    return buildPptxPreviewCacheKey(sessionId, pages, sessionUpdatedAt, { image_only: false })
  }, [sessionId, pages, sessionUpdatedAt])

  const load = useCallback(async () => {
    if (!sessionId) return null
    const detail = await ohmypptApi.getSession(sessionId)
    const session = detail.session
    setTitle(String(session.title || sessionId))
    setSessionUpdatedAt(Number(session.updatedAt ?? session.updated_at ?? 0))
    setPages(detail.pages || [])
    const sessionTopic = session.topic && typeof session.topic === 'string' ? session.topic : ''
    if (sessionTopic) setTopic(sessionTopic)
    let storedMessages = detail.messages
    if (!storedMessages?.length) {
      storedMessages = await ohmypptApi.getMessages(sessionId)
    }
    setMessages(dbMessagesToChat(storedMessages || [], sessionTopic))
    return detail
  }, [sessionId])

  const appendLog = useCallback((line: string) => {
    setLogLines((prev) => [...prev.slice(-40), line])
  }, [])

  const addStageMsg = useCallback((s: string, label: string, content: string) => {
    const msg: ChatMsg = {
      role: 'stage',
      stage: s,
      label: formatStageLabel(label || s),
      content,
      expanded: true,
      done: false,
    }
    stageMsgRef.current = msg
    setMessages((prev) => {
      const next = prev.filter((m) => !(m.role === 'stage' && m.stage === s))
      return [...next, msg]
    })
  }, [])

  const updateStageMsg = useCallback((s: string, content: string, done?: boolean) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.role === 'stage' && m.stage === s
          ? { ...m, content: m.content + content, done: done ?? m.done }
          : m,
      ),
    )
  }, [])

  const collapseAllStages = useCallback(() => {
    setMessages((prev) =>
      prev.map((m) => (m.role === 'stage' ? { ...m, expanded: false, done: true } : m)),
    )
  }, [])

  const onChunk = useCallback(
    (ev: GenerateChunkEvent) => {
      if (ev.type === 'stage_started' || ev.type === 'stage_progress') {
        setStage(ev.payload.stage)
        if (ev.payload.label) setStageMsg(ev.payload.label)
        appendLog(ev.payload.label || ev.payload.stage)
      }
      if (ev.type === 'llm_status' && ev.payload.detail) {
        appendLog(ev.payload.detail)
      }
      if (ev.type === 'assistant_message') {
        appendLog(ev.payload.content.slice(0, 200))
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: ev.payload.content },
        ])
      }
      if (ev.type === 'page_generated' || ev.type === 'page_updated') {
        const p = ev.payload
        setPages((prev) => {
          const pageId = p.pageId || p.id || `page-${p.pageNumber}`
          const next = [...prev]
          const idx = next.findIndex(
            (x) => resolvePageId(x) === pageId || x.pageNumber === p.pageNumber,
          )
          const row: OhMyPptPage = {
            pageNumber: p.pageNumber,
            title: p.title,
            pageId,
            id: pageId,
            status: 'completed',
            htmlPath: p.htmlPath,
          }
          if (idx >= 0) next[idx] = { ...next[idx], ...row }
          else next.push(row)
          next.sort((a, b) => a.pageNumber - b.pageNumber)
          return next
        })
        appendLog(`第 ${p.pageNumber} 页：${p.title}`)
        updateStageMsg(ev.payload.stage, `\n第 ${p.pageNumber} 页：${p.title}`)
      }
      if (ev.type === 'page_started') {
        appendLog(`生成第 ${ev.payload.pageNumber} 页…`)
        addStageMsg(ev.payload.stage, formatStageLabel(ev.payload.stage), `生成第 ${ev.payload.pageNumber} 页…`)
      }
      if (ev.type === 'page_failed') {
        appendLog(`第 ${ev.payload.pageNumber} 页失败：${ev.payload.error || ''}`)
        updateStageMsg(ev.payload.stage, `\n第 ${ev.payload.pageNumber} 页失败`)
      }
      if (ev.type === 'run_completed') {
        setStage('run_completed')
        setStageMsg('生成完成')
        appendLog('全部完成')
        collapseAllStages()
      }
      if (ev.type === 'run_error') {
        setStage('run_error')
        setError(ev.payload.message)
        appendLog(ev.payload.message)
        collapseAllStages()
      }
    },
    [appendLog, addStageMsg, updateStageMsg, collapseAllStages],
  )

  const runGenerate = useCallback(async () => {
    if (!sessionId || generating) return
    setGenerating(true)
    setError('')
    setLogLines([])
    setStage('planning')
    setStageMsg('准备生成…')
    try {
      await streamWithSubscribeFallback(sessionId, onChunk)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '生成失败')
    } finally {
      setGenerating(false)
    }
  }, [sessionId, generating, onChunk, load])

  useEffect(() => {
    subscribeStarted.current = false
    let cancelled = false

    void (async () => {
      try {
        const detail = await load()
        if (cancelled || !detail?.activeRun || detail.activeRun.status !== 'running') return
        if (subscribeStarted.current || autoRunDone.current) return
        subscribeStarted.current = true
        setGenerating(true)
        setStage('planning')
        setStageMsg('正在生成…')
        try {
          await ohmypptApi.streamSubscribe(sessionId!, onChunk)
          if (!cancelled) await load()
        } catch (e: unknown) {
          if (!cancelled) setError(e instanceof Error ? e.message : '订阅生成进度失败')
        } finally {
          if (!cancelled) setGenerating(false)
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : '加载失败')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [sessionId, load, onChunk])

  useEffect(() => {
    const autoRun = (location.state as { autoRun?: boolean } | null)?.autoRun
    if (autoRun && !autoRunDone.current && sessionId) {
      autoRunDone.current = true
      void runGenerate()
    }
  }, [location.state, sessionId, runGenerate])

  const currentPage = pages[currentPageIdx]
  const currentPageId = currentPage ? resolvePageId(currentPage) : ''

  useEffect(() => {
    if (!sessionId || !currentPageId) {
      setPreviewHtml('')
      return
    }
    let cancelled = false
    setPreviewLoading(true)
    void ohmypptApi
      .getPageHtml(sessionId, currentPageId)
      .then((html) => {
        if (!cancelled) setPreviewHtml(html)
      })
      .catch(() => {
        if (!cancelled) setPreviewHtml('')
      })
      .finally(() => {
        if (!cancelled) setPreviewLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [sessionId, currentPageId])

  useEffect(() => {
    if (previewTab !== 'pptx' || !sessionId || pages.length === 0 || !pptxPreviewCacheKey) return

    const cachedBlob = getCachedPptxPreview(pptxPreviewCacheKey)
    if (cachedBlob) {
      let cancelled = false
      void cachedBlob.arrayBuffer().then((buf) => {
        if (!cancelled) setPptxBytes(new Uint8Array(buf))
      })
      return () => {
        cancelled = true
      }
    }

    let cancelled = false
    setPptxBuilding(true)
    ohmypptApi
      .fetchPptxBlob(sessionId, { image_only: false })
      .then((blob) => {
        setCachedPptxPreview(pptxPreviewCacheKey, blob)
        return blob.arrayBuffer()
      })
      .then((buf) => {
        if (!cancelled) setPptxBytes(new Uint8Array(buf))
      })
      .catch(() => {
        if (!cancelled) setPptxBytes(null)
      })
      .finally(() => {
        if (!cancelled) setPptxBuilding(false)
      })
    return () => {
      cancelled = true
    }
  }, [previewTab, sessionId, pages.length, pptxPreviewCacheKey])

  const handleExportZip = async () => {
    if (!sessionId) return
    setExportingZip(true)
    try {
      await ohmypptApi.exportZip(sessionId, `${title || 'deck'}.zip`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '导出失败')
    } finally {
      setExportingZip(false)
    }
  }

  const handleExportPptx = async () => {
    if (!sessionId) return
    setExportingPptx(true)
    try {
      await ohmypptApi.exportPptx(sessionId, `${title || 'deck'}.pptx`, { image_only: false })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '导出失败')
    } finally {
      setExportingPptx(false)
    }
  }

  const handleSend = async () => {
    if (!sessionId || !input.trim() || generating) return
    const text = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setGenerating(true)
    setError('')
    setStage('planning')
    setStageMsg('根据你的说明调整中…')
    try {
      await streamWithSubscribeFallback(sessionId, onChunk, { user_message: text })
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '更新失败'
      setMessages((m) => [...m, { role: 'assistant', content: msg }])
      setError(msg)
    } finally {
      setGenerating(false)
    }
  }

  const hasPreview = pages.length > 0 && previewHtml
  const busy = generating

  return (
    <div className="flex h-full min-h-0 flex-col bg-gray-50">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <Link to={studioHomePath()} className="text-gray-500 hover:text-gray-800">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-sm font-medium text-gray-900">{title || '加载中…'}</span>
          {pages.length > 0 && (
            <span className="hidden text-xs text-gray-400 sm:inline">
              {pages.length} 页
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {pages.length > 0 && (
            <>
              <button
                type="button"
                disabled={exportingZip || exportingPptx}
                onClick={() => void handleExportZip()}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
              >
                {exportingZip ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                导出 ZIP
              </button>
              <button
                type="button"
                disabled={exportingZip || exportingPptx}
                onClick={() => void handleExportPptx()}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
              >
                {exportingPptx ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                导出 PPT
              </button>
            </>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => void runGenerate()}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
          >
            {pages.length > 0 ? '重新生成' : '生成'}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left: AI Chat */}
        <aside className="flex w-[38%] min-w-[280px] max-w-[480px] flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !busy && (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <MessageSquare size={32} className="text-gray-200" />
                <p className="text-xs text-gray-400">
                  输入主题后，AI 将为你生成幻灯片。<br />
                  生成后也可在此调整结构、语气或增删页面。
                </p>
              </div>
            )}
            {messages.map((m, i) => {
              if (m.role === 'user') {
                return (
                  <div key={i} className="ml-8 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-900">
                    {m.content}
                  </div>
                )
              }
              if (m.role === 'assistant') {
                return (
                  <div key={i} className="mr-8 rounded-xl bg-violet-50 px-3 py-2 text-sm text-gray-700">
                    {m.content}
                  </div>
                )
              }
              // stage message
              return (
                <div key={i} className="rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2 text-xs text-blue-900">
                  <button
                    type="button"
                    onClick={() =>
                      setMessages((prev) =>
                        prev.map((x, idx) =>
                          idx === i && x.role === 'stage' ? { ...x, expanded: !x.expanded } : x,
                        ),
                      )
                    }
                    className="flex w-full items-center gap-1 text-left"
                  >
                    {m.expanded ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    <span className="font-medium">{m.label}</span>
                    {m.done && <span className="ml-1 text-blue-600/60">· 完成</span>}
                    {busy && !m.done && i === messages.length - 1 && (
                      <Loader2 size={10} className="ml-1 animate-spin text-blue-600" />
                    )}
                  </button>
                  {m.expanded && m.content && (
                    <pre className="mt-1.5 max-h-40 overflow-auto rounded-md border border-blue-100 bg-white/70 p-2 font-mono text-[10px] leading-relaxed text-gray-700 whitespace-pre-wrap break-all">
                      {m.content}
                    </pre>
                  )}
                </div>
              )
            })}
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
            )}
          </div>
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="调整结构或内容…"
                rows={2}
                className="flex-1 resize-none bg-transparent text-sm outline-none"
                disabled={busy}
              />
              <button
                type="button"
                disabled={!input.trim() || busy}
                onClick={() => void handleSend()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white disabled:bg-gray-200"
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
          </div>
        </aside>

        {/* Right: Preview with tabs */}
        <main className="relative flex min-w-0 flex-1 flex-col bg-gray-100">
          {/* Tab bar */}
          <div className="flex shrink-0 border-b border-gray-200 bg-white">
           
            <button
              type="button"
              onClick={() => setPreviewTab('pptx')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition',
                previewTab === 'pptx'
                  ? 'border-b-2 border-violet-500 text-violet-700'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <Presentation size={14} />
              PPTX 预览
            </button>
          </div>

          {/* Tab content */}
          <div className="relative flex min-h-0 flex-1">
            {busy && !hasPreview && previewTab === 'html' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-100/90 p-8">
                <Loader2 className="animate-spin text-gray-400" size={32} />
                <p className="text-sm text-gray-500">
                  {stageMsg || '正在生成…'} {completedPages > 0 && `(${completedPages}/${totalPages || '?'})`}
                </p>
              </div>
            )}

            {previewTab === 'html' && (
              <>
                {previewLoading && (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    <Loader2 className="mr-2 animate-spin" size={16} /> 加载预览…
                  </div>
                )}
                {!previewLoading && previewHtml ? (
                  <iframe
                    title="slide-preview"
                    srcDoc={previewHtml}
                    className="h-full w-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : !busy && !previewLoading ? (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    HTML 预览将在此显示
                  </div>
                ) : null}
              </>
            )}

            {previewTab === 'pptx' && (
              <>
                {pptxBuilding && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 text-sm text-gray-500">
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    正在生成 PPTX 预览…
                  </div>
                )}
                <SlideglanceErrorBoundary
                  fallback={
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-sm text-gray-500">
                      <p>PPTX 预览暂不可用，请切换回 HTML 预览</p>
                    </div>
                  }
                >
                  <SimplifiedDeckPreview
                    pptxBytes={pptxBytes}
                    deckLabel={title || null}
                    className="flex-1"
                    hideToolbarSettings
                  />
                </SlideglanceErrorBoundary>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
