import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  PptxPresentation,
  createWorkerController,
  type SlideController,
} from '@slideglance/viewer'
import PptxWorker from '@slideglance/viewer/dist/pptx-worker.js?worker'

interface SampleEntry {
  label: string
  url: string
}

/** 示例 deck 放在 public/slideglance/samples/，可选 */
const SAMPLES: SampleEntry[] = [
  { label: 'Pitch · 深色渐变', url: '/slideglance/samples/01-pitch.pptx' },
  { label: 'Editorial · A4', url: '/slideglance/samples/02-editorial.pptx' },
  { label: 'Tech spec', url: '/slideglance/samples/03-tech-spec.pptx' },
  { label: 'Workshop', url: '/slideglance/samples/04-workshop.pptx' },
]

export default function SlideglancePlayground() {
  const [controller, setController] = useState<SlideController | null>(null)
  const [deckName, setDeckName] = useState<string | null>(null)
  const [slideCount, setSlideCount] = useState(0)
  const [deckLoadSeq, setDeckLoadSeq] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeSampleUrl, setActiveSampleUrl] = useState<string | null>(null)
  const [workerStage, setWorkerStage] = useState<'idle' | 'starting' | 'ready'>('idle')
  const [info, setInfo] = useState('上传 .pptx 或选择示例，在浏览器本地解析（不上传服务器）')
  const fileInputRef = useRef<HTMLInputElement>(null)
  /** 主副本：每次 open 前再 clone，避免 Worker transfer 后 buffer detached */
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
    setInfo(`${label} · ${buf.byteLength.toLocaleString()} 字节`)
  }, [])

  useEffect(() => {
    if (!controller || deckLoadSeq === 0 || !bytesRef.current) return

    const seq = deckLoadSeq
    const bytes = new Uint8Array(bytesRef.current)
    let cancelled = false

    void (async () => {
      try {
        setInfo((prev) => prev.replace(/ · 渲染.*$/, '') + ' · 渲染中…')
        const meta = await controller.open(bytes, {})
        if (cancelled || seq !== loadSeqRef.current) return
        setSlideCount(meta.slideCount)
        setLoadError(null)
        setInfo(
          `${deckName ?? '演示文稿'} · ${bytes.byteLength.toLocaleString()} 字节 · ${meta.slideCount} 页`,
        )
      } catch (err) {
        if (cancelled || seq !== loadSeqRef.current) return
        const msg = err instanceof Error ? err.message : String(err)
        setLoadError(msg)
        setSlideCount(0)
        setInfo(`加载失败: ${msg}`)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [controller, deckLoadSeq, deckName])

  const loadSample = useCallback(
    async (entry: SampleEntry) => {
      setActiveSampleUrl(entry.url)
      setInfo(`加载 ${entry.label}…`)
      const t0 = performance.now()
      try {
        const res = await fetch(entry.url)
        if (!res.ok) {
          setInfo(`示例不可用 (${res.status})，请上传本地文件`)
          return
        }
        const buf = new Uint8Array(await res.arrayBuffer())
        queueDeck(entry.label, buf)
        const ms = Math.round(performance.now() - t0)
        setInfo(
          `${entry.label} · ${buf.byteLength.toLocaleString()} 字节 · ${ms} ms · 渲染中…`,
        )
      } catch (err) {
        setInfo(`加载失败: ${(err as Error).message ?? String(err)}`)
      }
    },
    [queueDeck],
  )

  const onFile = useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      const file = ev.target.files?.[0]
      if (!file) return
      setActiveSampleUrl(null)
      setInfo(`加载 ${file.name}…`)
      const t0 = performance.now()
      try {
        const buf = new Uint8Array(await file.arrayBuffer())
        queueDeck(file.name, buf)
        const ms = Math.round(performance.now() - t0)
        setInfo(
          `${file.name} · ${buf.byteLength.toLocaleString()} 字节 · ${ms} ms · 渲染中…`,
        )
      } catch (err) {
        setInfo(`加载失败: ${(err as Error).message ?? String(err)}`)
      }
      ev.target.value = ''
    },
    [queueDeck],
  )

  const samplesUi = useMemo(
    () =>
      SAMPLES.map((s) => (
        <button
          key={s.url}
          type="button"
          disabled={workerStage !== 'ready'}
          style={
            activeSampleUrl === s.url
              ? { ...buttonStyle, ...activeButtonStyle, ...(workerStage !== 'ready' ? disabledStyle : {}) }
              : { ...buttonStyle, ...(workerStage !== 'ready' ? disabledStyle : {}) }
          }
          onClick={() => void loadSample(s)}
        >
          {s.label}
        </button>
      )),
    [activeSampleUrl, loadSample, workerStage],
  )

  return (
    <div style={appStyle}>
      <header style={pickerStyle}>
        <h1 style={titleStyle}>PPTX 预览</h1>
        <span style={separatorStyle} />
        <label style={labelStyle}>
          上传
          <input
            ref={fileInputRef}
            type="file"
            disabled={workerStage !== 'ready'}
            accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            onChange={onFile}
            style={fileInputStyle}
          />
        </label>
        <span style={separatorStyle} />
        <span style={labelStyle}>示例</span>
        {samplesUi}
        <span style={separatorStyle} />
        <span style={infoStyle}>{info}</span>
      </header>
      {workerStage === 'starting' ? (
        <div style={bannerStyle} role="status">
          <span style={{ marginRight: 8 }} className="inline-block w-3 h-3 border-2 border-neutral-500 border-t-blue-400 rounded-full animate-spin" />
          正在启动 Worker 引擎…
        </div>
      ) : null}
      {loadError ? (
        <div style={errorBannerStyle} role="alert">
          {loadError}
        </div>
      ) : null}
      <PptxPresentation
        controller={controller}
        name={deckName}
        slideCount={slideCount}
        style={{ flex: 1, minHeight: 0 }}
      />
    </div>
  )
}

const appStyle: CSSProperties = {
  display: 'grid',
  gridTemplateRows: 'auto auto auto minmax(0, 1fr)',
  width: '100%',
  height: '100%',
  background: 'var(--pptx-shell-bg, #0e0e10)',
  color: 'var(--pptx-shell-fg, #ececec)',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  overflow: 'hidden',
}

const pickerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 16px',
  background: 'var(--pptx-shell-ribbon-bg, #1f1f23)',
  borderBottom: '1px solid var(--pptx-shell-border, #2a2a30)',
  flexWrap: 'wrap',
  flexShrink: 0,
}

const errorBannerStyle: CSSProperties = {
  padding: '8px 16px',
  fontSize: 12,
  color: '#f48771',
  background: 'rgba(244, 135, 113, 0.12)',
  borderBottom: '1px solid rgba(244, 135, 113, 0.35)',
  flexShrink: 0,
}

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.05em',
  color: 'var(--pptx-shell-fg, #ddd)',
}

const separatorStyle: CSSProperties = {
  width: 1,
  alignSelf: 'stretch',
  background: 'var(--pptx-shell-border, #2a2a30)',
}

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: 'var(--pptx-shell-status, #999)',
}

const buttonStyle: CSSProperties = {
  background: 'var(--pptx-shell-input-bg, #1a1a1f)',
  color: 'var(--pptx-shell-fg, #ececec)',
  border: '1px solid var(--pptx-shell-border, #2f2f36)',
  padding: '6px 10px',
  borderRadius: 4,
  font: 'inherit',
  fontSize: 12,
  cursor: 'pointer',
}

const activeButtonStyle: CSSProperties = {
  borderColor: 'var(--pptx-shell-accent, #6aa3ff)',
  background: 'var(--pptx-shell-accent-soft, #25304a)',
}

const fileInputStyle: CSSProperties = {
  color: 'var(--pptx-shell-fg, #ccc)',
  fontSize: 12,
  maxWidth: 220,
}

const infoStyle: CSSProperties = {
  fontSize: 11,
  color: 'var(--pptx-shell-status, #888)',
  flex: 1,
  minWidth: 120,
}

const bannerStyle: CSSProperties = {
  padding: '8px 16px',
  fontSize: 12,
  color: '#6aa3ff',
  background: 'rgba(106, 163, 255, 0.12)',
  borderBottom: '1px solid rgba(106, 163, 255, 0.35)',
  flexShrink: 0,
}

const disabledStyle: CSSProperties = {
  opacity: 0.45,
  cursor: 'not-allowed',
}
