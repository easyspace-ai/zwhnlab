import { useCallback, useEffect, useRef, useState } from 'react'
import WordCloud from 'wordcloud'
import { GROUP_COLORS, type WordCloudWord } from '@/lib/dashboardApi'

interface WordCloudFlatProps {
  words: WordCloudWord[]
  onWordClick?: (word: string) => void
}

const MIN_SCALE = 0.45
const MAX_SCALE = 3.5

export function WordCloudFlat({ words, onWordClick }: WordCloudFlatProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [dragging, setDragging] = useState(false)
  const viewRef = useRef({ pan: { x: 0, y: 0 }, scale: 1 })
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; originX: number; originY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  })
  const clickStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const clickHandlerRef = useRef(onWordClick)
  clickHandlerRef.current = onWordClick

  const renderCloud = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || words.length === 0) return

    const dpr = window.devicePixelRatio || 1
    const w = container.clientWidth
    const h = container.clientHeight
    if (w <= 0 || h <= 0) return

    const cw = Math.floor(w * dpr)
    const ch = Math.floor(h * dpr)
    canvas.width = cw
    canvas.height = ch
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const maxW = Math.max(...words.map((x) => x.weight))
    const minW = Math.min(...words.map((x) => x.weight))
    const list: [string, number][] = words.map((item) => {
      const t = maxW > minW ? (item.weight - minW) / (maxW - minW) : 1
      return [item.text, 12 + t * 42]
    })

    // Build a lookup map from text -> group color
    const colorMap = new Map<string, string>()
    words.forEach((w) => {
      colorMap.set(w.text, GROUP_COLORS[w.group] || GROUP_COLORS.general)
    })

    WordCloud(canvas, {
      list,
      gridSize: Math.max(4, Math.round(6 * dpr)),
      weightFactor: 1,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeight: '600',
      color: (word) => {
        return colorMap.get(word as string) || GROUP_COLORS.general
      },
      rotateRatio: 0.55,
      rotationSteps: 3,
      backgroundColor: '#0b0e14',
      shrinkToFit: true,
      drawOutOfBound: false,
      minSize: 10,
      origin: [cw / 2, ch / 2],
      shape: 'circle',
      ellipticity: 0.72,
      click: (item) => {
        if (item && item[0] && clickHandlerRef.current) {
          clickHandlerRef.current(item[0])
        }
      },
    })
  }, [words])

  useEffect(() => {
    renderCloud()
    return () => {
      WordCloud.stop()
    }
  }, [renderCloud])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(() => {
      WordCloud.stop()
      renderCloud()
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [renderCloud])

  useEffect(() => {
    viewRef.current = { pan: { x: 0, y: 0 }, scale: 1 }
    setPan({ x: 0, y: 0 })
    setScale(1)
  }, [words])

  useEffect(() => {
    viewRef.current = { pan, scale }
  }, [pan, scale])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = container.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const { pan: p, scale: s } = viewRef.current
      const factor = Math.exp(-e.deltaY * 0.002)
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor))
      const wx = (mx - p.x) / s
      const wy = (my - p.y) / s
      const nextPan = {
        x: mx - wx * nextScale,
        y: my - wy * nextScale,
      }
      viewRef.current = { pan: nextPan, scale: nextScale }
      setPan(nextPan)
      setScale(nextScale)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    const { pan: p } = viewRef.current
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: p.x,
      originY: p.y,
    }
    clickStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      clickStartRef.current = null
    }
    const nextPan = {
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    }
    viewRef.current = { ...viewRef.current, pan: nextPan }
    setPan(nextPan)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false
    setDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)

    const clickInfo = clickStartRef.current
    if (clickInfo && onWordClick) {
      const dx = e.clientX - clickInfo.x
      const dy = e.clientY - clickInfo.y
      const dt = Date.now() - clickInfo.time
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5 && dt < 300) {
        // Detect which word was clicked via canvas
        const canvas = canvasRef.current
        if (canvas) {
          const rect = canvas.getBoundingClientRect()
          const x = (e.clientX - rect.left) * (canvas.width / rect.width)
          const y = (e.clientY - rect.top) * (canvas.height / rect.height)
          const ctx = canvas.getContext('2d')
          if (ctx) {
            // Check pixel alpha to determine if a word was clicked
            const pixel = ctx.getImageData(x, y, 1, 1).data
            if (pixel[3] > 0) {
              // Find nearest word center; for now use word-cloud built-in click
            }
          }
        }
      }
    }
    clickStartRef.current = null
  }

  const resetView = () => {
    viewRef.current = { pan: { x: 0, y: 0 }, scale: 1 }
    setPan({ x: 0, y: 0 })
    setScale(1)
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full touch-none select-none overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={resetView}
      title="拖拽平移 · 滚轮缩放 · 双击复位"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  )
}
