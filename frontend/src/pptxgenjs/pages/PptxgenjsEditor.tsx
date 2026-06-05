import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileJson, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pptxgenjsHomePath } from '../lib/routes'
import { pptxgenjsApi, type PipelineEvent } from '../lib/pptxgenjsApi'
import { buildPptxBlob, downloadPptxFromSchema, type SlideSchema } from '../lib/renderPptx'
import { SimplifiedDeckPreview } from '@/slideglance/components/SimplifiedDeckPreview'
import type { RawSlide } from '../lib/layoutPresets'
import { resolveTheme } from '../lib/themePresets'
import { PipelineProgressPanel } from '@/studio/components/PipelineProgressPanel'

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

export interface PptxgenjsEditorProps {
  /** 返回链接；默认独立 /pptxgenjs 首页 */
  homePath?: string
  /** 统一 /ppt 工作台：右侧用 SlideGlance 预览 PPTX，而非 Schema JSON */
  useSlideGlancePreview?: boolean
}

export default function PptxgenjsEditor({
  homePath = pptxgenjsHomePath(),
  useSlideGlancePreview = false,
}: PptxgenjsEditorProps = {}) {
  const { projectId } = useParams<{ projectId: string }>()
  const location = useLocation()
  const [projectName, setProjectName] = useState('')
  const [schemaJson, setSchemaJson] = useState('')
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
  const [previewBytes, setPreviewBytes] = useState<Uint8Array | null>(null)
  const [previewBuilding, setPreviewBuilding] = useState(false)
  const autoRunDone = useRef(false)

  const hasSchema = Boolean(schemaJson.trim())
  const busy = pipelineRunning || sending

  const schemaSummary = useMemo(() => {
    if (!schemaJson.trim()) return null
    try {
      const s = JSON.parse(schemaJson) as SlideSchema
      const presets = (s.slides || []).map((sl) => {
        const raw = sl as unknown as RawSlide
        return raw.layout_preset || raw.type || 'elements'
      })
      return {
        title: s.meta?.title || projectName,
        slides: s.slides?.length ?? 0,
        theme: s.meta?.theme?.preset || '—',
        presets: [...new Set(presets)].slice(0, 6).join(', '),
      }
    } catch {
      return null
    }
  }, [schemaJson, projectName])

  const slideThumbnails = useMemo(() => {
    if (!schemaJson.trim()) return []
    try {
      const s = JSON.parse(schemaJson) as SlideSchema
      const theme = resolveTheme(s.meta?.theme?.preset, s.meta?.theme)
      return (s.slides || []).slice(0, 12).map((sl, i) => {
        const raw = sl as unknown as RawSlide
        const preset = raw.layout_preset || 'custom'
        let title = preset
        if (raw.slots?.title && typeof raw.slots.title === 'string') title = raw.slots.title
        else if (raw.slots?.headline && typeof raw.slots.headline === 'string') title = raw.slots.headline
        return { i: i + 1, preset, title: String(title).slice(0, 28) }
      })
    } catch {
      return []
    }
  }, [schemaJson])

  const load = useCallback(async () => {
    if (!projectId) return
    const [proj, res, chat] = await Promise.all([
      pptxgenjsApi.getProject(projectId),
      pptxgenjsApi.listResources(projectId),
      pptxgenjsApi.getChat(projectId),
    ])
    setProjectName(proj.name)
    setSchemaJson(res.find((r) => r.type === 'slide_schema')?.content || '')
    setMessages(chat)
  }, [projectId])

  const persistChat = useCallback(
    async (next: ChatMsg[]) => {
      if (!projectId) return
      try {
        await pptxgenjsApi.saveChat(projectId, next)
      } catch {
        /* non-blocking */
      }
    },
    [projectId],
  )

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
      await pptxgenjsApi.runPipeline(projectId, onPipelineEvent)
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

  const handleExportPptx = async () => {
    if (!schemaJson.trim()) return
    setExporting(true)
    setError('')
    try {
      await downloadPptxFromSchema(schemaJson, `${projectName || 'deck'}.pptx`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'PPTX 导出失败')
    } finally {
      setExporting(false)
    }
  }

  const handleDownloadSchema = () => {
    if (!schemaJson.trim()) return
    const blob = new Blob([schemaJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName || 'deck'}-schema.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSend = async () => {
    if (!projectId || !input.trim() || sending) return
    const text = input.trim()
    setInput('')
    const withUser: ChatMsg[] = [...messages, { role: 'user', content: text }]
    setMessages(withUser)
    void persistChat(withUser)
    setSending(true)
    setPipelineRunning(true)
    setError('')
    setPartialByStage({})
    setStageMsg('')
    setStage('outline')
    try {
      await pptxgenjsApi.regenerate(projectId, text, onPipelineEvent)
      const withAssistant: ChatMsg[] = [
        ...withUser,
        { role: 'assistant', content: '已根据你的说明更新 Slide Schema。' },
      ]
      setMessages(withAssistant)
      void persistChat(withAssistant)
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '更新失败'
      const withError: ChatMsg[] = [...withUser, { role: 'assistant', content: msg }]
      setMessages(withError)
      void persistChat(withError)
      setError(msg)
    } finally {
      setSending(false)
      setPipelineRunning(false)
    }
  }

  const formattedSchema = useMemo(() => {
    if (!schemaJson.trim()) return ''
    try {
      return JSON.stringify(JSON.parse(schemaJson), null, 2)
    } catch {
      return schemaJson
    }
  }, [schemaJson])

  useEffect(() => {
    if (!useSlideGlancePreview || !schemaJson.trim()) {
      setPreviewBytes(null)
      return
    }
    let cancelled = false
    setPreviewBuilding(true)
    void buildPptxBlob(schemaJson)
      .then((blob) => blob.arrayBuffer())
      .then((buf) => {
        if (!cancelled) setPreviewBytes(new Uint8Array(buf))
      })
      .catch(() => {
        if (!cancelled) setPreviewBytes(null)
      })
      .finally(() => {
        if (!cancelled) setPreviewBuilding(false)
      })
    return () => {
      cancelled = true
    }
  }, [schemaJson, useSlideGlancePreview])

  return (
    <div className="flex h-full min-h-0 flex-col bg-gray-50">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <Link to={homePath} className="text-gray-500 hover:text-gray-800">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-sm font-medium text-gray-900">{projectName || '加载中…'}</span>
          {schemaSummary && (
            <span className="hidden text-xs text-gray-400 sm:inline">
              {schemaSummary.slides} 页 · {schemaSummary.theme} · {schemaSummary.presets}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasSchema && (
            <>
              <button
                type="button"
                onClick={handleDownloadSchema}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50"
              >
                <FileJson size={14} /> Schema
              </button>
              <button
                type="button"
                disabled={exporting}
                onClick={() => void handleExportPptx()}
                className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs text-white hover:bg-indigo-500 disabled:opacity-40"
              >
                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                下载 PPTX
              </button>
            </>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => void runPipeline()}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40"
          >
            {hasSchema ? '重新生成' : '生成'}
          </button>
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
                生成后可在此调整结构、语气或增删页面（输出 Slide Schema，由 PptxGenJS 渲染为可编辑 PPT）
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
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col bg-slate-900">
          {busy && !hasSchema && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-900/95 p-8">
              <Loader2 className="animate-spin text-indigo-300" size={32} />
              <div className="w-full max-w-lg">
                <PipelineProgressPanel
                  stage={stage}
                  stageMsg={stageMsg}
                  partialByStage={partialByStage}
                  expanded={progressExpanded}
                  onToggleExpanded={() => setProgressExpanded((v) => !v)}
                />
              </div>
              <p className="text-sm text-slate-400">正在生成 PptxGenJS Slide Schema…</p>
            </div>
          )}
          {useSlideGlancePreview ? (
            <>
              {schemaSummary && hasSchema && (
                <div className="shrink-0 border-b border-slate-700 bg-slate-800/80 px-4 py-2 text-xs text-slate-300">
                  <span className="font-medium text-white">{schemaSummary.title}</span>
                  <span className="mx-2 text-slate-600">·</span>
                  {schemaSummary.slides} 页
                  <span className="mx-2 text-slate-600">·</span>
                  {schemaSummary.theme}
                </div>
              )}
              {previewBuilding && hasSchema && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 text-sm text-slate-400">
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  正在渲染 PPTX 预览…
                </div>
              )}
              <SimplifiedDeckPreview
                pptxBytes={previewBytes}
                deckLabel={projectName || schemaSummary?.title || null}
                className="flex-1"
                hideToolbarSettings
              />
            </>
          ) : formattedSchema ? (
            <div className="flex h-full flex-col">
              {schemaSummary && (
                <div className="shrink-0 border-b border-slate-700 bg-slate-800/80 px-4 py-2 text-xs text-slate-300">
                  <span className="font-medium text-white">{schemaSummary.title}</span>
                  <span className="mx-2 text-slate-600">·</span>
                  {schemaSummary.slides} slides
                  <span className="mx-2 text-slate-600">·</span>
                  theme: {schemaSummary.theme}
                </div>
              )}
              {slideThumbnails.length > 0 && (
                <div className="shrink-0 flex gap-2 overflow-x-auto border-b border-slate-700 bg-slate-800/50 px-3 py-2">
                  {slideThumbnails.map((t) => (
                    <div
                      key={t.i}
                      className="min-w-[120px] rounded-lg border border-slate-600 bg-slate-700/80 px-2 py-1.5"
                    >
                      <p className="text-[10px] text-indigo-300">{t.preset}</p>
                      <p className="truncate text-xs text-slate-200">{t.title}</p>
                    </div>
                  ))}
                </div>
              )}
              <pre className="flex-1 overflow-auto p-4 text-[11px] leading-relaxed text-slate-300 font-mono">
                {formattedSchema}
              </pre>
            </div>
          ) : !busy ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Slide Schema 将在此显示
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
