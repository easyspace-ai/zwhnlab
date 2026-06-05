import { useEffect, useRef, useState } from 'react'
import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts'
import { Loader2 } from 'lucide-react'
import { fetchPolymarketPriceHistory, type PriceHistoryPoint } from '@/lib/polymarketApi'
import { cn } from '@/lib/utils'

type Props = {
  conditionId: string
  outcome: 'yes' | 'no'
  timeframe: string
  lineColor: string
  topColor: string
  bottomColor: string
  /** 与工作台浅色主题一致 */
  variant?: 'light' | 'dark'
  className?: string
}

export function PolymarketPriceChart({
  conditionId,
  outcome,
  timeframe,
  lineColor,
  topColor,
  bottomColor,
  variant = 'light',
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [points, setPoints] = useState<PriceHistoryPoint[]>([])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const isLight = variant === 'light'
    const chart = createChart(el, {
      width: el.clientWidth,
      height: el.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: isLight ? '#ffffff' : '#0a0f1a' },
        textColor: isLight ? '#64748b' : '#94a3b8',
        fontSize: 11,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(51, 65, 85, 0.35)' },
        horzLines: { color: isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(51, 65, 85, 0.35)' },
      },
      rightPriceScale: {
        borderColor: isLight ? 'rgba(148, 163, 184, 0.45)' : 'rgba(71, 85, 105, 0.5)',
        scaleMargins: { top: 0.1, bottom: 0.08 },
      },
      timeScale: {
        borderColor: isLight ? 'rgba(148, 163, 184, 0.45)' : 'rgba(71, 85, 105, 0.5)',
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: isLight ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.25)' },
        horzLine: { color: isLight ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.25)' },
      },
    })
    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor,
      bottomColor,
      lineWidth: 2,
    })
    chartRef.current = chart
    seriesRef.current = series

    const ro = new ResizeObserver(() => {
      if (!wrapRef.current || !chartRef.current) return
      const { clientWidth, clientHeight } = wrapRef.current
      chartRef.current.applyOptions({
        width: clientWidth,
        height: Math.max(clientHeight, 220),
      })
    })
    ro.observe(el)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [lineColor, topColor, bottomColor, variant])

  useEffect(() => {
    const series = seriesRef.current
    if (!series || !conditionId) return

    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        console.log('[PriceChart] Fetching price history for:', conditionId, outcome, timeframe)
        const res = await fetchPolymarketPriceHistory(conditionId, { outcome, timeframe })
        if (cancelled) return
        console.log('[PriceChart] Got', res.points?.length, 'points from:', res.source || 'backend')
        setPoints(res.points ?? [])
        const data = (res.points ?? []).map((pt) => ({
          time: pt.t as UTCTimestamp,
          value: pt.p * 100,
        }))
        series.setData(data)
        chartRef.current?.timeScale().fitContent()
      } catch (e) {
        if (!cancelled) {
          console.error('[PriceChart] Error:', e)
          setError(e instanceof Error ? e.message : '加载失败')
          series.setData([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [conditionId, outcome, timeframe])

  return (
    <div
      className={cn(
        'relative flex min-h-[280px] flex-1 flex-col rounded-xl border',
        variant === 'light'
          ? 'border-slate-200 bg-white'
          : 'border-slate-800 bg-[#0a0f1a]',
        className,
      )}
    >
      <div ref={wrapRef} className="min-h-[260px] flex-1 w-full" />
      {loading && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center',
            variant === 'light' ? 'bg-white/70' : 'bg-[#0a0f1a]/60',
          )}
        >
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      )}
      {error && !loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-xs text-rose-400/90 px-4">
          {error}
        </div>
      )}
      {!loading && !error && points.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
          暂无历史价格
        </div>
      )}
    </div>
  )
}
