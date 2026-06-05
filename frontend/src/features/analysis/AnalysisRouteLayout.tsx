import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, BookmarkCheck, ChevronRight, History, Loader2, MessageSquare, Sparkles } from 'lucide-react'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  getTradingReport,
  getTradingReports,
  searchTradingStocks,
  type TradingApiReportDetail,
  type TradingApiReportSummary,
} from '@/lib/tradingApi'
import { extractCnSymbol, normalizeCnSymbol } from '@/lib/symbols'
import {
  listFollowedStocks,
  migrateLocalPickerWatchlistOnce,
} from '@/lib/watchlistApi'
import { useAnalysisStore } from '@/features/analysis/tradingAgents/analysisStore'
import type { AnalysisReport, KeyMetric, RiskItem } from '@/features/analysis/tradingAgents/types'
import type { ChatCopilotPanelHandle } from '@/features/analysis/tradingAgents/components/ChatCopilotPanel'
import { TradingAgentsAnalysisCenter } from '@/features/analysis/tradingAgents/TradingAgentsAnalysisCenter'
import { TradingAgentsChatSidebar } from '@/features/analysis/tradingAgents/TradingAgentsChatSidebar'

type SymbolSuggestion = { symbol: string; name: string }

function marketTagForSymbol(symbol: string): string {
  const s = symbol.toUpperCase()
  if (s.endsWith('.HK')) return '港股'
  if (s.endsWith('.SH') || s.endsWith('.SZ') || s.endsWith('.BJ')) return 'A股'
  if (/\.(US|O|N)$/i.test(s) || /^[A-Z]{1,5}$/.test(s)) return '美股'
  return '标的'
}

function matchHint(query: string, item: SymbolSuggestion): string {
  const q = query.trim().toUpperCase()
  if (!q) return ''
  const code = item.symbol.split('.')[0]?.toUpperCase() ?? ''
  if (code.startsWith(q) || item.symbol.toUpperCase().startsWith(q)) return '前缀'
  if (item.name.includes(query.trim())) return '名称'
  return ''
}

function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '--'
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

/** 与 ReportViewer / AgentCollaboration 使用的章节键一致；合并详情时避免顶层 null/"" 盖掉 result_data 里的正文 */
const REPORT_SECTION_KEYS = [
  'market_report',
  'sentiment_report',
  'news_report',
  'fundamentals_report',
  'macro_report',
  'smart_money_report',
  'game_theory_report',
  'investment_plan',
  'trader_investment_plan',
  'final_trade_decision',
] as const

function isEmptyReportField(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  return false
}

function mergeTradingReportDetailToResult(detail: TradingApiReportDetail): Record<string, unknown> {
  const rawNested =
    detail.result_data && typeof detail.result_data === 'object' && !Array.isArray(detail.result_data)
      ? ({ ...detail.result_data } as Record<string, unknown>)
      : {}
  /** 少数存储形态里 section 嵌在 result_data.result_data */
  const innerBlob = rawNested.result_data
  const innerExtra =
    innerBlob && typeof innerBlob === 'object' && !Array.isArray(innerBlob)
      ? (innerBlob as Record<string, unknown>)
      : {}
  const nested = { ...innerExtra, ...rawNested }
  const detailRecord = { ...(detail as unknown as Record<string, unknown>) }
  const merged: Record<string, unknown> = { ...nested, ...detailRecord }
  for (const key of REPORT_SECTION_KEYS) {
    if (!isEmptyReportField(merged[key])) continue
    const fromNested = nested[key]
    if (typeof fromNested === 'string' && fromNested.trim()) merged[key] = fromNested
  }
  return merged
}

function reportHistoryStatusTone(status?: string | null) {
  const s = (status || '').toLowerCase()
  if (s === 'completed' || s === 'success') {
    return 'border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-500/20 dark:text-emerald-300 dark:bg-emerald-500/10'
  }
  if (s === 'failed' || s === 'error') {
    return 'border-rose-200 text-rose-700 bg-rose-50 dark:border-rose-500/20 dark:text-rose-300 dark:bg-rose-500/10'
  }
  if (s === 'running' || s === 'pending') {
    return 'border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-500/20 dark:text-amber-300 dark:bg-amber-500/10'
  }
  return 'border-slate-200 text-slate-600 bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:bg-slate-800/60'
}

function mapRiskItems(raw: Array<Record<string, unknown>> | null | undefined): RiskItem[] {
  if (!raw?.length) return []
  return raw
    .map((r) => {
      const level = String(r.level ?? 'medium')
      const lv = level === 'high' || level === 'low' ? level : 'medium'
      return {
        name: String(r.name ?? '').trim(),
        level: lv as RiskItem['level'],
        description: r.description != null ? String(r.description) : undefined,
      }
    })
    .filter((x) => x.name)
}

function mapKeyMetrics(raw: Array<Record<string, unknown>> | null | undefined): KeyMetric[] {
  if (!raw?.length) return []
  return raw
    .map((r) => {
      const st = String(r.status ?? 'neutral')
      const status = st === 'good' || st === 'bad' ? st : 'neutral'
      return {
        name: String(r.name ?? '').trim(),
        value: String(r.value ?? ''),
        status: status as KeyMetric['status'],
      }
    })
    .filter((x) => x.name)
}

function hydrateTradingAnalysisFromHistory(detail: TradingApiReportDetail, merged: Record<string, unknown>) {
  const sym = normalizeCnSymbol(detail.symbol)
  const { result_data: _ignoredBlob, ...reportForUi } = merged
  /** 单次合并写入，避免 prepareForNewJob 先清空 report 再写入时中间栏误判为「无任务」 */
  useAnalysisStore.setState({
    currentJobId: null,
    isAnalyzing: false,
    isConnected: false,
    jobStatus: null,
    currentHorizon: null,
    streamingSections: {},
    milestones: [],
    currentSymbol: sym,
    report: reportForUi as unknown as AnalysisReport,
    riskItems: mapRiskItems(detail.risk_items ?? (merged.risk_items as Array<Record<string, unknown>> | undefined)),
    keyMetrics: mapKeyMetrics(detail.key_metrics ?? (merged.key_metrics as Array<Record<string, unknown>> | undefined)),
    jobConfidence: detail.confidence ?? (typeof merged.confidence === 'number' ? merged.confidence : null),
    jobTargetPrice: detail.target_price ?? (typeof merged.target_price === 'number' ? merged.target_price : null),
    jobStopLoss: detail.stop_loss_price ?? (typeof merged.stop_loss_price === 'number' ? merged.stop_loss_price : null),
  })
  useAnalysisStore.getState().addChatMessage({
    id: `history-opened-${detail.id}-${Date.now()}`,
    role: 'assistant',
    content: `已打开历史分析（只读）${detail.symbol} · ${detail.trade_date}\n\n方向：${detail.direction || '未知'}\n决策：${detail.decision || '未知'}\n置信度：${detail.confidence ?? '--'}%`,
    timestamp: new Date().toISOString(),
  })
}

export function AnalysisRouteLayout() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { rightCollapsed } = useWorkbenchChrome()
  const querySymbol = normalizeCnSymbol(searchParams.get('symbol') || '')
  const [selectedSymbol, setSelectedSymbol] = useState(querySymbol || '600519.SH')
  const [rightSidebarTab, setRightSidebarTab] = useState<'chat' | 'watchlist' | 'history'>('chat')
  const [activeSection, setActiveSectionState] = useState<string | undefined>()
  const reportAnchorRef = useRef<HTMLDivElement | null>(null)
  const copilotRef = useRef<ChatCopilotPanelHandle>(null)
  /** 自选股/历史 tab 下聊天面板未挂载，ref 为空；切到「聊天」后再提交。 */
  const pendingShellPromptRef = useRef<string | null>(null)

  const [historyReports, setHistoryReports] = useState<TradingApiReportSummary[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyLoadedRemote, setHistoryLoadedRemote] = useState(false)
  const [openingHistoryReportId, setOpeningHistoryReportId] = useState<string | null>(null)
  const [historyError, setHistoryError] = useState<string | null>(null)

  const isAnalyzing = useAnalysisStore((s) => s.isAnalyzing)

  const setActiveSection = useCallback((section?: string) => {
    setActiveSectionState(section)
    requestAnimationFrame(() => {
      reportAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  useEffect(() => {
    if (querySymbol) {
      setSelectedSymbol(querySymbol)
    }
  }, [querySymbol])

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('symbol', selectedSymbol)
        return next
      },
      { replace: true },
    )
  }, [selectedSymbol, setSearchParams])

  useEffect(() => {
    if (rightSidebarTab !== 'history') return
    if (historyLoadedRemote) return
    let cancelled = false
    const loadHistory = async () => {
      setHistoryLoading(true)
      setHistoryError(null)
      try {
        const response = await getTradingReports(undefined, 0, 20)
        if (cancelled) return
        setHistoryReports(response.reports)
        setHistoryLoadedRemote(true)
      } catch (error) {
        if (cancelled) return
        setHistoryError(error instanceof Error ? error.message : '加载分析历史失败')
      } finally {
        setHistoryLoading(false)
      }
    }
    void loadHistory()
    return () => {
      cancelled = true
    }
  }, [historyLoadedRemote, rightSidebarTab])

  const refreshReportHistory = useCallback(async () => {
    setHistoryLoading(true)
    setHistoryError(null)
    try {
      const response = await getTradingReports(undefined, 0, 20)
      setHistoryReports(response.reports)
      setHistoryLoadedRemote(true)
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : '加载分析历史失败')
    } finally {
      setHistoryLoading(false)
    }
  }, [])

  const runAnalysisFromShell = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim()
      if (!trimmed) return
      const sym = extractCnSymbol(trimmed) || normalizeCnSymbol(selectedSymbol)
      setSelectedSymbol(sym)
      useAnalysisStore.getState().setCurrentSymbol(sym)
      if (rightSidebarTab === 'chat') {
        if (copilotRef.current) {
          copilotRef.current.submitPrompt(trimmed)
        } else {
          pendingShellPromptRef.current = trimmed
          queueMicrotask(() => {
            const p = pendingShellPromptRef.current
            if (!p) return
            pendingShellPromptRef.current = null
            copilotRef.current?.submitPrompt(p)
          })
        }
        return
      }
      pendingShellPromptRef.current = trimmed
      setRightSidebarTab('chat')
    },
    [selectedSymbol, rightSidebarTab],
  )

  useLayoutEffect(() => {
    if (rightSidebarTab !== 'chat') return
    const pending = pendingShellPromptRef.current
    if (!pending) return
    pendingShellPromptRef.current = null
    copilotRef.current?.submitPrompt(pending)
  }, [rightSidebarTab])

  const openHistoryReport = async (reportId: string) => {
    setOpeningHistoryReportId(reportId)
    setHistoryError(null)
    try {
      const detail = await getTradingReport(reportId)
      const merged = mergeTradingReportDetailToResult(detail)
      setSelectedSymbol(normalizeCnSymbol(detail.symbol))
      hydrateTradingAnalysisFromHistory(detail, merged)
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : '打开历史报告失败')
    } finally {
      setOpeningHistoryReportId(null)
    }
  }

  return (
    <WorkbenchLayout
      className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.08),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#f8fafc_32%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.10),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#020617_32%,_#0f172a_100%)]"
      mainPanelId="analysis-main"
      rightPanelId="analysis-right"
      leftSidebarVisible={false}
      rightMinPx={360}
      rightMaxPx={580}
      rightSidebarVisible={!rightCollapsed}
      main={
        <div className="h-full min-h-0 overflow-y-auto p-4">
          <TradingAgentsAnalysisCenter
            selectedSymbol={selectedSymbol}
            reportAnchorRef={reportAnchorRef}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            onWorkbenchSymbolChange={(sym) => setSelectedSymbol(sym)}
          />
        </div>
      }
      right={
        <AnalysisRightDock
          tab={rightSidebarTab}
          onTabChange={setRightSidebarTab}
          copilotRef={copilotRef}
          onSymbolDetected={(symbol) => setSelectedSymbol(normalizeCnSymbol(symbol))}
          onShowReport={(section) => setActiveSection(section)}
          selectedSymbol={selectedSymbol}
          onAnalyze={runAnalysisFromShell}
          onSelectSymbol={(symbol) => setSelectedSymbol(symbol)}
          analysisRunning={isAnalyzing}
          reportHistory={historyReports}
          reportHistoryLoading={historyLoading}
          reportHistoryError={historyError}
          onRefreshHistory={refreshReportHistory}
          openingHistoryReportId={openingHistoryReportId}
          onOpenHistoryReport={openHistoryReport}
        />
      }
    />
  )
}

type AnalysisRightDockProps = {
  tab: 'chat' | 'watchlist' | 'history'
  onTabChange: (tab: 'chat' | 'watchlist' | 'history') => void
  copilotRef: RefObject<ChatCopilotPanelHandle | null>
  onSymbolDetected: (symbol: string) => void
  onShowReport?: (section?: string) => void
  selectedSymbol: string
  onAnalyze: (prompt: string) => void
  onSelectSymbol: (symbol: string) => void
  analysisRunning: boolean
  reportHistory: TradingApiReportSummary[]
  reportHistoryLoading: boolean
  reportHistoryError: string | null
  onRefreshHistory: () => void | Promise<void>
  openingHistoryReportId: string | null
  onOpenHistoryReport: (id: string) => void | Promise<void>
}

function AnalysisRightDock({
  tab,
  onTabChange,
  copilotRef,
  onSymbolDetected,
  onShowReport,
  selectedSymbol,
  onAnalyze,
  onSelectSymbol,
  analysisRunning,
  reportHistory,
  reportHistoryLoading,
  reportHistoryError,
  onRefreshHistory,
  openingHistoryReportId,
  onOpenHistoryReport,
}: AnalysisRightDockProps) {
  const tabs = [
    { id: 'chat' as const, label: '聊天', Icon: MessageSquare },
    { id: 'watchlist' as const, label: '自选股', Icon: BookmarkCheck },
    { id: 'history' as const, label: '历史', Icon: History },
  ]

  return (
    <aside className="flex h-full min-h-0 flex-col bg-[#fbfcfd] dark:bg-slate-950">
      <div className="shrink-0 border-b border-slate-200 px-2 pb-2 pt-3 dark:border-slate-800">
        <div className="flex gap-0.5 rounded-xl bg-slate-200/50 p-1 dark:bg-slate-800/60">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all sm:text-[13px]',
                tab === id
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {tab === 'chat' ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col px-2 pb-2 pt-1">
            <TradingAgentsChatSidebar
              ref={copilotRef}
              onSymbolDetected={onSymbolDetected}
              onShowReport={onShowReport}
            />
          </div>
        ) : null}

        {tab === 'watchlist' ? (
          <AnalysisWatchlistPanel
            selectedSymbol={selectedSymbol}
            onAnalyze={onAnalyze}
            onSelectSymbol={onSelectSymbol}
            analysisRunning={analysisRunning}
          />
        ) : null}

        {tab === 'history' ? (
          <AnalysisHistoryPanel
            reportHistory={reportHistory}
            reportHistoryLoading={reportHistoryLoading}
            reportHistoryError={reportHistoryError}
            onRefreshHistory={onRefreshHistory}
            openingHistoryReportId={openingHistoryReportId}
            onOpenHistoryReport={onOpenHistoryReport}
          />
        ) : null}
      </div>
    </aside>
  )
}

function AnalysisWatchlistPanel({
  selectedSymbol,
  onAnalyze,
  onSelectSymbol,
  analysisRunning,
}: {
  selectedSymbol: string
  onAnalyze: (prompt: string) => void
  onSelectSymbol: (symbol: string) => void
  analysisRunning: boolean
}) {
  const [manualSymbol, setManualSymbol] = useState(selectedSymbol)
  const [symbolPickerOpen, setSymbolPickerOpen] = useState(false)
  const [watchlistItems, setWatchlistItems] = useState<{ symbol: string; name: string; note: string }[]>([])
  const [symbolSuggestions, setSymbolSuggestions] = useState<SymbolSuggestion[]>([])
  const [symbolSuggestLoading, setSymbolSuggestLoading] = useState(false)
  const [symbolHighlight, setSymbolHighlight] = useState(0)
  const symbolSuggestDebounceRef = useRef<number | null>(null)
  const symbolBlurCloseRef = useRef<number | null>(null)

  useEffect(() => setManualSymbol(selectedSymbol), [selectedSymbol])

  const refreshWatchlist = useCallback(() => {
    void listFollowedStocks()
      .then((rows) => {
        setWatchlistItems(
          rows.map((r) => ({
            symbol: normalizeCnSymbol(r.stockCode) || r.stockCode.trim().toUpperCase(),
            name: r.stockName || r.stockCode,
            note: (r.note && r.note.trim()) || '',
          })),
        )
      })
      .catch(() => setWatchlistItems([]))
  }, [])

  useEffect(() => {
    void migrateLocalPickerWatchlistOnce()
    refreshWatchlist()
  }, [refreshWatchlist])

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'visible') refreshWatchlist()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [refreshWatchlist])

  useEffect(() => {
    if (symbolSuggestDebounceRef.current) window.clearTimeout(symbolSuggestDebounceRef.current)
    const q = manualSymbol.trim()
    if (!q) {
      setSymbolSuggestLoading(false)
      setSymbolSuggestions(watchlistItems.map((w) => ({ symbol: w.symbol, name: w.name })))
      return undefined
    }

    setSymbolSuggestLoading(true)

    symbolSuggestDebounceRef.current = window.setTimeout(async () => {
      try {
        const kw = q.replace(/\.[A-Z]+$/, '')
        const response = await searchTradingStocks(kw)
        setSymbolSuggestions(response.results.slice(0, 12))
      } catch {
        setSymbolSuggestions([])
      } finally {
        setSymbolSuggestLoading(false)
      }
    }, 260)

    return () => {
      if (symbolSuggestDebounceRef.current) window.clearTimeout(symbolSuggestDebounceRef.current)
    }
  }, [manualSymbol, watchlistItems])

  useEffect(() => {
    setSymbolHighlight((h) => {
      const max = Math.max(0, symbolSuggestions.length - 1)
      return Math.min(h, max)
    })
  }, [symbolSuggestions])

  useEffect(
    () => () => {
      if (symbolSuggestDebounceRef.current) window.clearTimeout(symbolSuggestDebounceRef.current)
      if (symbolBlurCloseRef.current) window.clearTimeout(symbolBlurCloseRef.current)
    },
    [],
  )

  const applySymbolSuggestion = (item: SymbolSuggestion) => {
    const sym = normalizeCnSymbol(item.symbol) || item.symbol.trim().toUpperCase()
    onSelectSymbol(sym)
    setManualSymbol(sym)
    setSymbolPickerOpen(false)
  }

  const handleAnalyze = () => {
    const raw = (manualSymbol || selectedSymbol).trim()
    const sym = normalizeCnSymbol(raw) || raw
    onSelectSymbol(sym)
    setManualSymbol(sym)
    onAnalyze(`分析 ${sym} 今日走势`)
  }

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-5 p-4">
            <section className="relative space-y-2">
              <div className="relative">
                <Input
                  value={manualSymbol}
                  autoComplete="off"
                  onChange={(e) => {
                    setManualSymbol(e.target.value.toUpperCase())
                    setSymbolPickerOpen(true)
                  }}
                  onFocus={() => {
                    if (symbolBlurCloseRef.current) window.clearTimeout(symbolBlurCloseRef.current)
                    setSymbolPickerOpen(true)
                  }}
                  onBlur={() => {
                    symbolBlurCloseRef.current = window.setTimeout(() => setSymbolPickerOpen(false), 160)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSymbolPickerOpen(false)
                      return
                    }
                    if (e.key === 'ArrowDown') {
                      if (!symbolPickerOpen) setSymbolPickerOpen(true)
                      e.preventDefault()
                      setSymbolHighlight((i) => Math.min(i + 1, Math.max(0, symbolSuggestions.length - 1)))
                      return
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setSymbolHighlight((i) => Math.max(i - 1, 0))
                      return
                    }
                    if (e.key === 'Enter') {
                      if (symbolPickerOpen && symbolSuggestions[symbolHighlight]) {
                        e.preventDefault()
                        applySymbolSuggestion(symbolSuggestions[symbolHighlight])
                        return
                      }
                      handleAnalyze()
                    }
                  }}
                  className={cn(
                    'h-11 rounded-xl border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
                    symbolPickerOpen && 'ring-2 ring-cyan-500/35 dark:ring-cyan-400/30',
                  )}
                  placeholder="600519.SH"
                />
                {symbolPickerOpen &&
                (symbolSuggestLoading ||
                  symbolSuggestions.length > 0 ||
                  manualSymbol.trim().length > 0) ? (
                  <div
                    className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-cyan-500/35 bg-white shadow-lg dark:border-cyan-500/25 dark:bg-slate-950 dark:shadow-cyan-950/20"
                    role="listbox"
                  >
                    {symbolSuggestLoading ? (
                      <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                        正在匹配标的…
                      </div>
                    ) : null}
                    {!symbolSuggestLoading && !symbolSuggestions.length && manualSymbol.trim() ? (
                      <div className="px-3 py-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        股票库中暂无匹配项。可换个关键词，或手动输入港股/美股代码。
                      </div>
                    ) : null}
                    {symbolSuggestions.map((item, idx) => {
                      const hint = matchHint(manualSymbol, item)
                      return (
                        <button
                          key={`${item.symbol}-${idx}`}
                          type="button"
                          role="option"
                          aria-selected={idx === symbolHighlight}
                          onMouseDown={(ev) => ev.preventDefault()}
                          onMouseEnter={() => setSymbolHighlight(idx)}
                          onClick={() => applySymbolSuggestion(item)}
                          className={cn(
                            'flex w-full items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-left transition-colors last:border-b-0 dark:border-slate-800/80',
                            idx === symbolHighlight
                              ? 'bg-slate-100 dark:bg-slate-800/90'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-900/80',
                          )}
                        >
                          <span className="shrink-0 rounded-md bg-rose-600 px-1.5 py-px text-[10px] font-medium text-white dark:bg-rose-500">
                            {marketTagForSymbol(item.symbol)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-semibold text-slate-900 dark:text-slate-100">{item.name}</div>
                            <div className="mt-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">{item.symbol}</div>
                          </div>
                          {hint ? (
                            <span className="shrink-0 text-[11px] font-medium text-violet-600 dark:text-violet-400">{hint}</span>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
             </section>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analysisRunning}
              className={cn(
                'flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold shadow-md transition-colors',
                analysisRunning
                  ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white',
              )}
            >
              {analysisRunning ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {analysisRunning ? '分析中...' : '开始分析'}
            </button>

            <Separator className="bg-slate-200/80 dark:bg-slate-800" />

            <div>
              <div className="mb-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  自选列表
                </div>
                <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">点击即可发起分析</div>
              </div>
              <div className="space-y-3">
                {watchlistItems.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-200 px-4 py-8 text-center text-[12px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    暂无自选。可在鲲鹏战法或专家分析中添加；数据在 AI_DATA_DIR/stock.db（与后端 .env 一致）。
                  </div>
                ) : (
                  watchlistItems.map((item) => {
                    const active = item.symbol === selectedSymbol
                    const showCodeSub = item.name.trim() !== item.symbol.trim()
                    return (
                      <button
                        key={item.symbol}
                        type="button"
                        onClick={() => {
                          onSelectSymbol(item.symbol)
                          setManualSymbol(item.symbol)
                          onAnalyze(`分析 ${item.symbol} 今日走势`)
                        }}
                        className={cn(
                          'w-full rounded-[20px] border px-4 py-3.5 text-left transition-all',
                          active
                            ? 'border-blue-400 bg-blue-50/75 shadow-[0_4px_12px_rgba(59,130,246,0.10)] dark:bg-blue-500/10'
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">{item.name}</div>
                            {showCodeSub ? (
                              <div className="mt-1 font-mono text-[12px] text-slate-500 dark:text-slate-400">{item.symbol}</div>
                            ) : null}
                            {item.note ? (
                              <div className="mt-1 text-[11.5px] text-slate-400 dark:text-slate-500">{item.note}</div>
                            ) : null}
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-medium text-blue-600 dark:text-blue-300">
                            分析 <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          </div>
    </ScrollArea>
  )
}

function AnalysisHistoryPanel({
  reportHistory,
  reportHistoryLoading,
  reportHistoryError,
  onRefreshHistory,
  openingHistoryReportId,
  onOpenHistoryReport,
}: {
  reportHistory: TradingApiReportSummary[]
  reportHistoryLoading: boolean
  reportHistoryError: string | null
  onRefreshHistory: () => void | Promise<void>
  openingHistoryReportId: string | null
  onOpenHistoryReport: (id: string) => void | Promise<void>
}) {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            历史记录
          </div>
          <button
            type="button"
            onClick={() => void onRefreshHistory()}
            disabled={openingHistoryReportId != null}
            className="text-[11px] text-slate-500 hover:text-slate-700 disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200"
          >
            刷新
          </button>
        </div>

        {reportHistoryError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
            {reportHistoryError}
          </div>
        ) : null}

        {reportHistoryLoading ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            正在加载历史...
          </div>
        ) : null}

        {!reportHistoryLoading && reportHistory.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            暂无分析历史。完成一次分析后，将显示服务端保存的报告。
          </div>
        ) : null}

        <div className="space-y-2">
          {reportHistory.map((report) => {
            const rowOpening = openingHistoryReportId === report.id
            return (
              <button
                key={report.id}
                type="button"
                disabled={openingHistoryReportId != null}
                onClick={() => void onOpenHistoryReport(report.id)}
                className={cn(
                  'w-full rounded-xl border border-slate-200 bg-white p-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700',
                  openingHistoryReportId != null && !rowOpening && 'opacity-50',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{report.symbol}</div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {(report.trade_date || '').slice(0, 10)} · {report.decision || '未知决策'} · {report.direction || '未知方向'}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {report.target_price != null ? `目标价 ${formatNumber(report.target_price)} · ` : ''}
                      {report.stop_loss_price != null ? `止损 ${formatNumber(report.stop_loss_price)} · ` : ''}
                      {report.confidence != null ? `置信度 ${formatNumber(report.confidence, 0)}%` : '暂无置信度'}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]',
                        reportHistoryStatusTone(report.status),
                      )}
                    >
                      {report.status || '完成'}
                    </span>
                    {rowOpening ? (
                      <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </ScrollArea>
  )
}
