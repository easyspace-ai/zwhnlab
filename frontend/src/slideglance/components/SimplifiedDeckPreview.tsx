import { useCallback, useEffect, useRef, useState } from 'react'
import { PptxPresentation, createWorkerController, type SlideController } from '@slideglance/viewer'
import PptxWorker from '@slideglance/viewer/dist/pptx-worker.js?worker'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface SimplifiedDeckPreviewProps {
  /** PPTX file bytes; pass null to clear preview */
  pptxBytes: Uint8Array | null
  deckLabel?: string | null
  className?: string
  /** Hide the settings (gear) button in the toolbar. */
  hideToolbarSettings?: boolean
}

/**
 * Minimal SlideGlance preview: worker init + open(bytes) + PptxPresentation.
 * Reused from SlideglancePlayground for unified /ppt pptxgenjs editor.
 */
export function SimplifiedDeckPreview({ pptxBytes, deckLabel, className, hideToolbarSettings }: SimplifiedDeckPreviewProps) {
  const [controller, setController] = useState<SlideController | null>(null)
  const [deckName, setDeckName] = useState<string | null>(null)
  const [slideCount, setSlideCount] = useState(0)
  const [deckLoadSeq, setDeckLoadSeq] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [workerStage, setWorkerStage] = useState<'idle' | 'starting' | 'ready'>('idle')
  const bytesRef = useRef<Uint8Array | null>(null)
  const loadSeqRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    let ctrl: SlideController | null = null
    setWorkerStage('starting')
    void (async () => {
      try {
        const c = await createWorkerController(new PptxWorker())
        if (cancelled) {
          c.close()
          return
        }
        ctrl = c
        setController(c)
        setWorkerStage('ready')
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err)
          setLoadError(`预览 Worker 启动失败: ${msg}`)
          setWorkerStage('idle')
        }
      }
    })()
    return () => {
      cancelled = true
      ctrl?.close()
      setController(null)
    }
  }, [])

  const queueDeck = useCallback((label: string, buf: Uint8Array) => {
    bytesRef.current = new Uint8Array(buf)
    loadSeqRef.current += 1
    setDeckLoadSeq(loadSeqRef.current)
    setDeckName(label)
    setSlideCount(0)
    setLoadError(null)
  }, [])

  useEffect(() => {
    if (!pptxBytes?.byteLength) {
      bytesRef.current = null
      setDeckLoadSeq(0)
      setDeckName(null)
      setSlideCount(0)
      return
    }
    queueDeck(deckLabel || '演示文稿', pptxBytes)
  }, [pptxBytes, deckLabel, queueDeck])

  useEffect(() => {
    if (!controller || deckLoadSeq === 0 || !bytesRef.current) return

    const seq = deckLoadSeq
    const bytes = new Uint8Array(bytesRef.current)
    let cancelled = false

    void (async () => {
      try {
        const meta = await controller.open(bytes, {})
        if (cancelled || seq !== loadSeqRef.current) return
        setSlideCount(meta.slideCount)
        setLoadError(null)
      } catch (err) {
        if (cancelled || seq !== loadSeqRef.current) return
        const msg = err instanceof Error ? err.message : String(err)
        setLoadError(msg)
        setSlideCount(0)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [controller, deckLoadSeq])

  return (
    <div
      className={cn('flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0e0e10] text-[#ececec]', className)}
    >
      {workerStage === 'starting' && (
        <div className="flex shrink-0 items-center gap-2 border-b border-[#2a2a30] px-4 py-2 text-xs text-[#6aa3ff]">
          <Loader2 size={14} className="animate-spin" />
          正在启动预览引擎…
        </div>
      )}
      {loadError && (
        <div className="shrink-0 border-b border-red-900/40 bg-red-950/40 px-4 py-2 text-xs text-red-300">
          {loadError}
        </div>
      )}
      {pptxBytes?.byteLength && slideCount > 0 ? (
        <PptxPresentation
          key={`${deckLoadSeq}-${slideCount}`}
          controller={controller}
          name={deckName}
          slideCount={slideCount}
          className="min-h-0 flex-1"
          style={{ flex: 1, minHeight: 0 }}
          hideToolbarSettings={hideToolbarSettings}
        />
      ) : workerStage === 'ready' && !loadError ? (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
          {pptxBytes?.byteLength ? '正在解析 PPTX…' : deckLabel ? '正在生成 PPTX 预览…' : '生成 Slide Schema 后将在此显示 PPTX 预览'}
        </div>
      ) : null}
    </div>
  )
}
