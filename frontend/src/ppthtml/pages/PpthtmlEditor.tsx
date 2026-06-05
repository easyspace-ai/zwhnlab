import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileCode, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ppthtmlHomePath } from '../lib/routes'
import { ppthtmlApi, type PipelineEvent } from '../lib/ppthtmlApi'
import { ppthtmlDownloadEditablePptx, ppthtmlDownloadPptx } from '../lib/exportApi'
import { downloadHTML } from '@/studio/lib/downloadHtml'
import { PipelineProgressPanel, STAGE_LABEL } from '@/studio/components/PipelineProgressPanel'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

function handlePipelineEvent(
  ev: PipelineEvent,
  setStage: (s: string) => void,
  setStageMsg: (s: string) => void,
  setPartialByStage: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setError: (s: string) => void,
) {
  if (ev.stage && ev.stage !== 'done') setStage(ev.stage)
  if (ev.message) setStageMsg(ev.message)
  if (ev.status === 'retry' && ev.stage) {
    setPartialByStage((prev) => ({ ...prev, [ev.stage]: '' }))
  }
  if (ev.status === 'progress' && ev.chunk && ev.stage) {
    setPartialByStage((prev) => ({
      ...prev,
      [ev.stage]: (prev[ev.stage] || '') + ev.chunk,
    }))
  }
  if (ev.stage === 'error') {
    setError(ev.message || '生成失败')
  }
}

export default function PpthtmlEditor() {
  const { projectId } = useParams<{ projectId: string }>()
  const location = useLocation()
  const [projectName, setProjectName] = useState('')
  const [htmlContent, setHtmlContent] = useState('')
  const [stage, setStage] = useState('')
  const [stageMsg, setStageMsg] = useState('')
  const [partialByStage, setPartialByStage] = useState<Record<string, string>>({})
  const [progressExpanded, setProgressExpanded] = useState(true)
  const [pipelineRunning, setPipelineRunning] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exportingEditable, setExportingEditable] = useState(false)
  const autoRunDone = useRef(false)

  const hasPreview = Boolean(htmlContent)
  const busy = pipelineRunning || sending

  const load = useCallback(async () => {
    if (!projectId) return
    const [proj, res] = await Promise.all([
      ppthtmlApi.getProject(projectId),
      ppthtmlApi.listResources(projectId),
    ])
    setProjectName(proj.name)
    setHtmlContent(res.find((r) => r.type === 'html_deck')?.content || '')
  }, [projectId])

  const onPipelineEvent = useCallback((ev: PipelineEvent) => {
    handlePipelineEvent(ev, setStage, setStageMsg, setPartialByStage, setError)
  }, [])

  const runPipeline = useCallback(async () => {
    if (!projectId || pipelineRunning) return
    setPipelineRunning(true)
    setError('')
    setPartialByStage({})
    setStageMsg('')
    setStage('outline')
    try {
      await ppthtmlApi.runPipeline(projectId, onPipelineEvent)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '生成失败')
    } finally {
      setPipelineRunning(false)
    }
  }, [projectId, pipelineRunning, load, onPipelineEvent])

  useEffect(() => {
    void load().catch((e) => setError(e instanceof Error ? e.message : '加载失败'))
  }, [load])

  useEffect(() => {
    const autoRun = (location.state as { autoRun?: boolean } | null)?.autoRun
    if (autoRun && !autoRunDone.current && projectId) {
      autoRunDone.current = true
      void runPipeline()
    }
  }, [location.state, projectId, runPipeline])

  const handleExportHtml = () => {
    if (!htmlContent) return
    downloadHTML(htmlContent, `${projectName || 'deck'}.html`)
  }

  const handleExportPpt = async () => {
    if (!htmlContent.trim()) return
    setExporting(true)
    setError('')
    try {
      await ppthtmlDownloadPptx(htmlContent, `${projectName || 'deck'}.pptx`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'PPT 导出失败')
    } finally {
      setExporting(false)
    }
  }

  const handleExportEditablePpt = async () => {
    if (!htmlContent.trim()) return
    setExportingEditable(true)
    setError('')
    try {
      await ppthtmlDownloadEditablePptx(htmlContent, `${projectName || 'deck'}.pptx`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '可编辑 PPT 导出失败')
    } finally {
      setExportingEditable(false)
    }
  }

  const handleSend = async () => {
    if (!projectId || !input.trim() || sending) return
    const text = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setSending(true)
    setPipelineRunning(true)
    setError('')
    setPartialByStage({})
    setStageMsg('')
    setStage('outline')
    try {
      await ppthtmlApi.regenerate(projectId, text, onPipelineEvent)
      setMessages((m) => [...m, { role: 'assistant', content: '已根据你的说明更新 HTML 演示稿。' }])
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '更新失败'
      setMessages((m) => [...m, { role: 'assistant', content: msg }])
      setError(msg)
    } finally {
      setSending(false)
      setPipelineRunning(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-gray-50">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <Link to={ppthtmlHomePath()} className="text-gray-500 hover:text-gray-800">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-sm font-medium text-gray-900">{projectName || '加载中…'}</span>
        </div>
        <div className="flex items-center gap-2">
          {hasPreview && (
            <>
              <button
                type="button"
                onClick={handleExportHtml}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50"
              >
                <FileCode size={14} /> HTML
              </button>
              <button
                type="button"
                disabled={exporting || exportingEditable}
                onClick={() => void handleExportPpt()}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
              >
                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                PPT（图片）
              </button>
              <button
                type="button"
                disabled={exporting || exportingEditable}
                onClick={() => void handleExportEditablePpt()}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
              >
                {exportingEditable ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Download size={14} />
                )}
                PPT（可编辑）
              </button>
            </>
          )}
          {!hasPreview && !busy && (
            <button
              type="button"
              onClick={() => void runPipeline()}
              className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white hover:bg-gray-700"
            >
              生成
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[38%] min-w-[280px] max-w-[480px] flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {busy && (
              <PipelineProgressPanel
                stage={stage}
                stageMsg={stageMsg}
                partialByStage={partialByStage}
                expanded={progressExpanded}
                onToggleExpanded={() => setProgressExpanded((v) => !v)}
                compact
              />
            )}
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
            )}
            {messages.length === 0 && !busy && (
              <p className="text-xs text-gray-400">
                生成后可在此微调版式、语气或增删页面（基于 Guizang HTML 模板）
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm',
                  m.role === 'user' ? 'ml-8 bg-gray-100 text-gray-900' : 'mr-8 bg-gray-50 text-gray-700',
                )}
              >
                {m.content}
              </div>
            ))}
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
                placeholder="调整版式或内容…"
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
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
          </div>
        </aside>

        <main className="relative min-w-0 flex-1 bg-gray-100">
          {busy && !hasPreview && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-100/90 p-8">
              <Loader2 className="animate-spin text-gray-400" size={32} />
              <div className="w-full max-w-lg">
                <PipelineProgressPanel
                  stage={stage}
                  stageMsg={stageMsg}
                  partialByStage={partialByStage}
                  expanded={progressExpanded}
                  onToggleExpanded={() => setProgressExpanded((v) => !v)}
                />
              </div>
              {!partialByStage[stage] && (
                <p className="text-sm text-gray-500">{STAGE_LABEL[stage] || 'Guizang 生成中…'}</p>
              )}
            </div>
          )}
          {htmlContent ? (
            <iframe
              title="Guizang HTML preview"
              srcDoc={htmlContent}
              className="h-full w-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : !busy ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              HTML 预览将在此显示
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
