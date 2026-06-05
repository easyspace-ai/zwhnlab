import { useCallback, useEffect, useMemo, useState, type RefObject } from 'react'
import AgentCollaboration from './components/AgentCollaboration'
import ReportViewer, { pickFirstSectionWithContent } from './components/ReportViewer'
import { sanitizeReportMarkdown } from './reportText'
import KlinePanel, { isKlineIndexSymbol } from './components/KlinePanel'
import DecisionCard from './components/DecisionCard'
import RiskRadar from './components/RiskRadar'
import KeyMetrics from './components/KeyMetrics'
import { normalizeCnSymbol } from '@/lib/symbols'
import { useAnalysisStore } from './analysisStore'

function mapDecision(decision?: string): 'buy' | 'sell' | 'hold' | 'add' | 'reduce' | 'watch' | undefined {
  if (!decision) return undefined
  const d = decision.toUpperCase()
  if (d.includes('SELL') || d.includes('卖出')) return 'sell'
  if (d.includes('REDUCE') || d.includes('减持')) return 'reduce'
  if (d.includes('WATCH') || d.includes('观望')) return 'watch'
  if (d.includes('HOLD') || d.includes('持有')) return 'hold'
  if (d.includes('ADD') || d.includes('增持')) return 'add'
  if (d.includes('BUY') || d.includes('买入')) return 'buy'
  return undefined
}

function extractConfidence(text?: string): number | undefined {
  if (!text) return undefined
  const m = text.match(/置信度[:：]\s*(\d+)%/i) ?? text.match(/confidence[:：]\s*(\d+)%/i)
  if (m) {
    const v = parseInt(m[1], 10)
    return v >= 0 && v <= 100 ? v : undefined
  }
  return undefined
}

function extractPrice(text: string | undefined, type: 'target' | 'stop'): number | undefined {
  if (!text) return undefined
  const patterns =
    type === 'target'
      ? [/目标价[:：]\s*[¥$]?\s*([\d.]+)/, /目标价格[:：]\s*[¥$]?\s*([\d.]+)/, /target[:：]\s*[¥$]?\s*([\d.]+)/i]
      : [/止损价[:：]\s*[¥$]?\s*([\d.]+)/, /止损价格[:：]\s*[¥$]?\s*([\d.]+)/, /stop[-\s_]?loss[:：]\s*[¥$]?\s*([\d.]+)/i]
  for (const p of patterns) {
    const m = text.match(p)
    if (m) return parseFloat(m[1])
  }
  return undefined
}

const DEFAULT_KLINE_INDEX = '000001.SH'

export type TradingAgentsAnalysisCenterProps = {
  selectedSymbol: string
  reportAnchorRef: RefObject<HTMLDivElement | null>
  activeSection: string | undefined
  onSelectSection: (section?: string) => void
  /** K 线切换标的时同步工作台左侧/URL */
  onWorkbenchSymbolChange?: (symbol: string) => void
}

/**
 * 工作台中间栏：K 线、协同智能体、决策/风险/指标、报告（TradingAgents-AShare 布局）。
 */
export function TradingAgentsAnalysisCenter({
  selectedSymbol,
  reportAnchorRef,
  activeSection,
  onSelectSection,
  onWorkbenchSymbolChange,
}: TradingAgentsAnalysisCenterProps) {
  const [activeSymbol, setActiveSymbol] = useState(
    () => selectedSymbol || useAnalysisStore.getState().currentSymbol || '000001.SH',
  )
  const {
    report,
    streamingSections,
    currentSymbol,
    setCurrentSymbol,
    jobConfidence,
    jobTargetPrice,
    jobStopLoss,
    riskItems,
    keyMetrics,
  } = useAnalysisStore()

  /** 与 TradingAgents-AShare 一致：自选股票以标签形式出现在指数左侧，可点击切换 K 线与下方工作台标的 */
  const [stockTabSymbols, setStockTabSymbols] = useState<string[]>([])
  const stockTabs = useMemo(() => stockTabSymbols.map((s) => ({ symbol: s })), [stockTabSymbols])

  const ensureStockTab = useCallback((raw: string) => {
    const n = normalizeCnSymbol(raw) || raw.trim().toUpperCase()
    if (!n || isKlineIndexSymbol(n)) return
    setStockTabSymbols((prev) => {
      if (prev.some((x) => x.toUpperCase() === n.toUpperCase())) return prev
      return [...prev, n]
    })
  }, [])

  useEffect(() => {
    const s = normalizeCnSymbol(selectedSymbol) || selectedSymbol
    if (s && !isKlineIndexSymbol(s)) ensureStockTab(s)
  }, [selectedSymbol, ensureStockTab])

  useEffect(() => {
    if (currentSymbol && !isKlineIndexSymbol(currentSymbol)) ensureStockTab(currentSymbol)
  }, [currentSymbol, ensureStockTab])

  const handleSelectStockTab = useCallback(
    (sym: string) => {
      const n = normalizeCnSymbol(sym) || sym.trim().toUpperCase()
      setActiveSymbol(n)
      onWorkbenchSymbolChange?.(n)
      setCurrentSymbol(n)
    },
    [onWorkbenchSymbolChange, setCurrentSymbol],
  )

  const handleCloseStockTab = useCallback(
    (sym: string) => {
      const n = normalizeCnSymbol(sym) || sym.trim().toUpperCase()
      const activeNorm = (normalizeCnSymbol(activeSymbol) || activeSymbol).toUpperCase()
      const closingActive = activeNorm === n.toUpperCase()

      setStockTabSymbols((prev) => {
        const next = prev.filter((x) => x.toUpperCase() !== n.toUpperCase())
        if (closingActive) {
          const fallback = next[next.length - 1] ?? DEFAULT_KLINE_INDEX
          queueMicrotask(() => {
            setActiveSymbol(fallback)
            onWorkbenchSymbolChange?.(fallback)
            setCurrentSymbol(fallback)
          })
        }
        return next
      })
    },
    [activeSymbol, onWorkbenchSymbolChange, setCurrentSymbol],
  )

  const sectionHighlight = useMemo(() => {
    const getContent = (key: string) => {
      const stream = streamingSections[key]
      const stored = report?.[key as keyof typeof report] as string | undefined
      return sanitizeReportMarkdown(stream?.displayed || stored || '')
    }
    return pickFirstSectionWithContent(getContent)
  }, [report, streamingSections])

  const collaborationSelected = activeSection ?? sectionHighlight

  useEffect(() => {
    setActiveSymbol(selectedSymbol)
  }, [selectedSymbol])

  useEffect(() => {
    if (currentSymbol) setActiveSymbol(currentSymbol)
  }, [currentSymbol])

  useEffect(() => {
    setCurrentSymbol(selectedSymbol)
  }, [selectedSymbol, setCurrentSymbol])

  const finalDecision = report?.final_trade_decision
  const confidence = jobConfidence ?? extractConfidence(finalDecision)
  const targetPrice = jobTargetPrice ?? extractPrice(finalDecision, 'target')
  const stopLoss = jobStopLoss ?? extractPrice(finalDecision, 'stop')

  const handleShowReport = (section?: string) => {
    onSelectSection(section)
    requestAnimationFrame(() => {
      reportAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="min-h-0 min-w-0 space-y-4">
      <div className="h-[360px] min-h-[280px]">
        <KlinePanel
          symbol={activeSymbol}
          stockTabs={stockTabs}
          onSelectStockTab={handleSelectStockTab}
          onCloseStockTab={handleCloseStockTab}
          onSymbolChange={(symbol) => {
            const n = normalizeCnSymbol(symbol) || symbol.trim().toUpperCase()
            setActiveSymbol(n)
            onWorkbenchSymbolChange?.(n)
            if (!isKlineIndexSymbol(n)) ensureStockTab(n)
          }}
        />
      </div>

      <AgentCollaboration onSelectSection={handleShowReport} selectedSection={collaborationSelected} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DecisionCard
          symbol={activeSymbol}
          report={report || undefined}
          decision={mapDecision(report?.decision)}
          direction={report?.direction}
          confidence={confidence}
          targetPrice={targetPrice}
          stopLoss={stopLoss}
          reasoning={finalDecision?.slice(0, 300)}
        />
        <RiskRadar items={riskItems} />
        <KeyMetrics items={keyMetrics} />
      </div>

      <div ref={reportAnchorRef}>
        <ReportViewer activeSection={activeSection} />
      </div>
    </div>
  )
}
