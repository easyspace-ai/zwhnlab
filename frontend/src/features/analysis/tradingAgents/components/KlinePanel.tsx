import { useEffect, useMemo, useRef, useState } from 'react'
import {
    BusinessDay,
    CandlestickData,
    CandlestickSeries,
    ColorType,
    IChartApi,
    ISeriesApi,
    MouseEventParams,
    createChart,
} from 'lightweight-charts'
import { Activity, CandlestickChart, X } from 'lucide-react'
import { getTradingKline } from '@/lib/tradingApi'
import type { KlineCandle } from '../types'
import { useAnalysisStore } from '../analysisStore'

function toDateText(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

function toBusinessDay(value: string): BusinessDay | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!m) return null
    const year = Number(m[1])
    const month = Number(m[2])
    const day = Number(m[3])
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null
    return { year, month, day }
}

/** 兼容 ISO 等格式，与 TradingAgents 原版 slice(0,10) 行为对齐并更稳 */
function normalizeCandleDate(raw: string | undefined | null): string {
    if (raw == null || raw === '') return ''
    const s = String(raw).trim()
    const ymd = s.slice(0, 10)
    if (/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return ymd
    const t = Date.parse(s)
    if (!Number.isNaN(t)) {
        const d = new Date(t)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
    }
    return ''
}

function businessDaySortKey(t: BusinessDay): string {
    return `${t.year}-${String(t.month).padStart(2, '0')}-${String(t.day).padStart(2, '0')}`
}

function candlesToChartData(rows: KlineCandle[]): CandlestickData[] {
    const points = rows.flatMap((c) => {
        const day = normalizeCandleDate(c.date)
        const time = toBusinessDay(day)
        const open = Number(c.open)
        const high = Number(c.high)
        const low = Number(c.low)
        const close = Number(c.close)
        if (!time) return []
        if (![open, high, low, close].every(Number.isFinite)) return []
        return [{ time, open, high, low, close }]
    })
    points.sort((a, b) => {
        const ta = a.time as BusinessDay
        const tb = b.time as BusinessDay
        if (typeof ta !== 'object' || typeof tb !== 'object') return 0
        return businessDaySortKey(ta).localeCompare(businessDaySortKey(tb))
    })
    return points
}

const SYMBOL_NAME_MAP: Record<string, string> = {
    '000001.SH': '上证指数',
    '399001.SZ': '深证成指',
    '399006.SZ': '创业板指',
    '000300.SH': '沪深300',
    '000905.SH': '中证500',
    '000852.SH': '中证1000',
    '300750.SZ': '宁德时代',
    '600406.SH': '国电南瑞',
    '510300.SH': '沪深300ETF',
}

function getDisplayName(symbol: string): string {
    const s = symbol.toUpperCase()
    return SYMBOL_NAME_MAP[s] ? `${SYMBOL_NAME_MAP[s]}（${s}）` : s
}

function formatNumber(value?: number | null, digits = 2): string {
    if (value == null || !Number.isFinite(value)) return '--'
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value)
}

function formatVolume(value?: number | null): string {
    if (value == null || !Number.isFinite(value)) return '--'
    if (Math.abs(value) >= 1e8) return `${formatNumber(value / 1e8, 2)}亿`
    if (Math.abs(value) >= 1e4) return `${formatNumber(value / 1e4, 2)}万`
    return formatNumber(value, 0)
}

const INDEX_PRESETS = [
    { symbol: '000001.SH', label: '上证指数' },
    { symbol: '399001.SZ', label: '深证成指' },
    { symbol: '399006.SZ', label: '创业板指' },
    { symbol: '000688.SH', label: '科创50' },
    { symbol: '899050.BJ', label: '北证50' },
] as const

/** 指数代码集合：与 K 线快捷指数一致，用于区分「股票标签」与指数切换。 */
export const KLINE_INDEX_SYMBOL_SET = new Set<string>(INDEX_PRESETS.map((p) => p.symbol))

export function isKlineIndexSymbol(sym: string): boolean {
    return KLINE_INDEX_SYMBOL_SET.has(sym.trim().toUpperCase())
}

function stockTabLabel(symbol: string): string {
    const name = getDisplayName(symbol)
    // 有中文名时只显示「名称（代码）」里的名称部分，避免标签过长
    const m = /^(.+)（[.\w]+）$/.exec(name)
    return m ? `${m[1]}` : name
}

export type KlineStockTab = { symbol: string }

interface KlinePanelProps {
    symbol: string
    onSymbolChange?: (symbol: string) => void
    /** 已打开的股票标签（不含指数）；点击切换图表标的，行为对齐浏览器多标签 */
    stockTabs?: KlineStockTab[]
    onSelectStockTab?: (symbol: string) => void
    onCloseStockTab?: (symbol: string) => void
}

/**
 * K 线：createChart / 系列样式与 test/TradingAgents-AShare/frontend/src/components/KlinePanel.tsx 保持一致
 * （library 默认十字线等；仅自定义主题色与网格以适应深浅色）。
 */
export default function KlinePanel({
    symbol,
    onSymbolChange,
    stockTabs = [],
    onSelectStockTab,
    onCloseStockTab,
}: KlinePanelProps) {
    const currentAnalysisSymbol = useAnalysisStore((state) => state.currentSymbol)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const chartRef = useRef<IChartApi | null>(null)
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
    const [candles, setCandles] = useState<KlineCandle[]>([])
    const [activeCandle, setActiveCandle] = useState<KlineCandle | null>(null)
    const candlesRef = useRef<KlineCandle[]>([])

    const range = useMemo(() => {
        const end = new Date()
        const start = new Date(end.getTime() - 180 * 24 * 60 * 60 * 1000)
        return {
            start: toDateText(start),
            end: toDateText(end),
        }
    }, [])

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const dark = document.documentElement.classList.contains('dark')
            setIsDark(dark)
        })
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const textColor = isDark ? '#94a3b8' : '#475569'
        const gridColor = isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(203, 213, 225, 0.6)'
        const bgColor = isDark ? 'transparent' : 'transparent'

        const cw = Math.max(1, containerRef.current.clientWidth)
        const ch = Math.max(1, containerRef.current.clientHeight)
        const chart = createChart(containerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: bgColor },
                textColor: textColor,
                attributionLogo: false,
            },
            localization: {
                locale: 'zh-CN',
                dateFormat: 'yyyy-MM-dd',
            },
            width: cw,
            height: ch,
            grid: {
                vertLines: { color: gridColor },
                horzLines: { color: gridColor },
            },
            rightPriceScale: {
                borderColor: isDark ? '#334155' : '#cbd5e1',
            },
            timeScale: {
                borderColor: isDark ? '#334155' : '#cbd5e1',
                timeVisible: true,
                rightOffset: 6,
                tickMarkFormatter: (time: BusinessDay | string) => {
                    if (typeof time !== 'object') return String(time)
                    const y = String(time.year)
                    const m = String(time.month).padStart(2, '0')
                    const d = String(time.day).padStart(2, '0')
                    return `${y}/${m}/${d}`
                },
            },
            crosshair: {
                vertLine: { color: isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)' },
                horzLine: { color: isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)' },
            },
        })

        const series = chart.addSeries(CandlestickSeries, {
            upColor: '#ef4444',
            downColor: '#22c55e',
            wickUpColor: '#ef4444',
            wickDownColor: '#22c55e',
            borderVisible: false,
        })

        chartRef.current = chart
        seriesRef.current = series
        if (candlesRef.current.length) {
            const existingData = candlesToChartData(candlesRef.current)
            if (existingData.length) {
                series.setData(existingData)
                requestAnimationFrame(() => {
                    chart.timeScale().fitContent()
                })
            }
        }

        const handleCrosshairMove = (param: MouseEventParams) => {
            if (!param.time || !seriesRef.current) {
                setActiveCandle(candlesRef.current.length ? candlesRef.current[candlesRef.current.length - 1] : null)
                return
            }
            const pointData = param.seriesData.get(seriesRef.current) as CandlestickData | undefined
            if (!pointData) return
            const time =
                typeof pointData.time === 'object'
                    ? `${pointData.time.year}-${String(pointData.time.month).padStart(2, '0')}-${String(pointData.time.day).padStart(2, '0')}`
                    : String(pointData.time)
            const matched = candlesRef.current.find((c) => normalizeCandleDate(c.date) === time)
            if (matched) setActiveCandle(matched)
        }
        chart.subscribeCrosshairMove(handleCrosshairMove)

        const onResize = () => {
            if (!containerRef.current || !chartRef.current) return
            const w = Math.max(1, containerRef.current.clientWidth)
            const h = Math.max(1, containerRef.current.clientHeight)
            chartRef.current.applyOptions({ width: w, height: h })
            requestAnimationFrame(() => {
                chartRef.current?.timeScale().fitContent()
            })
        }

        window.addEventListener('resize', onResize)
        const resizeObserver =
            typeof ResizeObserver !== 'undefined' && containerRef.current
                ? new ResizeObserver(() => onResize())
                : null
        resizeObserver?.observe(containerRef.current)
        requestAnimationFrame(() => onResize())
        return () => {
            resizeObserver?.disconnect()
            window.removeEventListener('resize', onResize)
            chart.unsubscribeCrosshairMove(handleCrosshairMove)
            chartRef.current?.remove()
            chartRef.current = null
            seriesRef.current = null
        }
    }, [isDark])

    useEffect(() => {
        let cancelled = false

        const pushData = (rows: KlineCandle[]) => {
            if (!seriesRef.current) return false
            const data = candlesToChartData(rows)
            seriesRef.current.setData(data)
            requestAnimationFrame(() => {
                chartRef.current?.timeScale().fitContent()
            })
            return data.length > 0
        }

        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const resp = await getTradingKline(symbol, range.start, range.end)
                if (cancelled) return

                setCandles(resp.candles)
                candlesRef.current = resp.candles
                setActiveCandle(resp.candles.length ? resp.candles[resp.candles.length - 1] : null)

                if (!pushData(resp.candles)) {
                    requestAnimationFrame(() => {
                        if (!cancelled && !pushData(resp.candles)) {
                            requestAnimationFrame(() => {
                                if (!cancelled) pushData(resp.candles)
                            })
                        }
                    })
                }

                if (!candlesToChartData(resp.candles).length) {
                    setError('暂无可用K线数据')
                }
            } catch (e) {
                if (cancelled) return
                setError(e instanceof Error ? e.message : '加载K线失败')
                setCandles([])
                candlesRef.current = []
                setActiveCandle(null)
                seriesRef.current?.setData([])
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        void load()
        return () => {
            cancelled = true
        }
    }, [range.end, range.start, symbol])

    const panelCandle = activeCandle ?? (candles.length ? candles[candles.length - 1] : null)
    const panelChange = panelCandle?.change ?? (panelCandle ? panelCandle.close - panelCandle.open : null)
    const panelChangePercent =
        panelCandle?.change_percent ??
        (panelCandle && panelCandle.open !== 0 ? (panelChange! / panelCandle.open) * 100 : null)
    const isUp = (panelChange ?? 0) >= 0
    const compactChangePercent =
        panelChangePercent == null ? '--' : `${panelChangePercent >= 0 ? '+' : ''}${formatNumber(panelChangePercent)}%`
    const showQuickJump =
        !!currentAnalysisSymbol &&
        currentAnalysisSymbol.toUpperCase() !== symbol.toUpperCase() &&
        !stockTabs.some((t) => t.symbol.toUpperCase() === currentAnalysisSymbol.toUpperCase())
    const currentSymbolLabel = currentAnalysisSymbol
        ? getDisplayName(currentAnalysisSymbol).replace(/（.*?）/, '')
        : '当前标的'

    return (
        <section className="card h-full flex flex-col overflow-hidden">
            <div className="mb-3 flex shrink-0 flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <CandlestickChart className="h-5 w-5 shrink-0 text-cyan-500" />
                    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
                        <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {getDisplayName(symbol)} K线
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                            <span className="text-slate-500 dark:text-slate-400">{panelCandle?.date || '--'}</span>
                            <span className={`font-medium ${isUp ? 'text-red-500' : 'text-emerald-500'}`}>
                                收盘 {formatNumber(panelCandle?.close)}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">开盘 {formatNumber(panelCandle?.open)}</span>
                            <span className={`font-medium ${isUp ? 'text-red-500' : 'text-emerald-500'}`}>{compactChangePercent}</span>
                            <span className="text-slate-500 dark:text-slate-400">
                                高/低 {formatNumber(panelCandle?.high)} / {formatNumber(panelCandle?.low)}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">量 {formatVolume(panelCandle?.volume)}</span>
                            <span className="text-slate-500 dark:text-slate-400">
                                换手 {panelCandle?.turnover_rate == null ? '--' : `${formatNumber(panelCandle.turnover_rate)}%`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <div className="flex min-w-0 flex-wrap items-center justify-end gap-1.5">
                        {stockTabs.map((tab) => {
                            const active = tab.symbol.toUpperCase() === symbol.toUpperCase()
                            return (
                                <div
                                    key={tab.symbol}
                                    className={`flex max-w-36 items-center rounded border text-xs transition-colors sm:max-w-44 ${
                                        active
                                            ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-500/15 dark:text-blue-300'
                                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-slate-500'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        title={tab.symbol}
                                        onClick={() => onSelectStockTab?.(tab.symbol)}
                                        className="truncate px-2 py-1 text-left font-medium"
                                    >
                                        {stockTabLabel(tab.symbol)}
                                    </button>
                                    {onCloseStockTab ? (
                                        <button
                                            type="button"
                                            title="关闭标签"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onCloseStockTab(tab.symbol)
                                            }}
                                            className="shrink-0 rounded-r border-l border-slate-200 px-1 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                        >
                                            <X className="h-3 w-3" strokeWidth={2.5} />
                                        </button>
                                    ) : null}
                                </div>
                            )
                        })}
                        {showQuickJump ? (
                            <button
                                type="button"
                                title="切换到当前分析标的"
                                onClick={() => onSymbolChange?.(currentAnalysisSymbol)}
                                className="rounded border border-emerald-500 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-600 transition-colors hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            >
                                {currentSymbolLabel}
                            </button>
                        ) : null}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 border-t border-slate-100 pt-2 sm:border-l sm:border-t-0 sm:pl-2 sm:pt-0 dark:border-slate-700">
                        {INDEX_PRESETS.map((item) => (
                            <button
                                key={item.symbol}
                                type="button"
                                onClick={() => onSymbolChange?.(item.symbol)}
                                className={`rounded border px-2 py-1 text-xs transition-colors ${
                                    item.symbol === symbol
                                        ? 'border-blue-500 bg-blue-50 text-blue-500 dark:bg-blue-500/10'
                                        : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                <div ref={containerRef} className="absolute inset-0" />
                {loading ? (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800/90 dark:text-slate-400">
                        <Activity className="h-3 w-3 animate-pulse" />
                        加载中
                    </div>
                ) : null}
                {error ? (
                    <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-xs text-orange-500 dark:bg-slate-800/90">
                        {error}
                    </div>
                ) : null}
            </div>
        </section>
    )
}
