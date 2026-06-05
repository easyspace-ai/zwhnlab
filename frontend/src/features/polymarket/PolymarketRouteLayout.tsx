import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Loader2, Wifi, WifiOff, X } from 'lucide-react'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { PolymarketSidebarLeft } from '@/components/polymarket/PolymarketSidebarLeft'
import { ResolveMarketPopup } from '@/components/polymarket/ResolveMarketPopup'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useConfirm } from '@/components/ui/confirm-dialog'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/osint/stores/apiStore'
import {
  deleteSavedPolymarketEvent,
  fetchPolymarketPriceHistory,
  listSavedPolymarketEvents,
  resolvePolymarketInput,
  savePolymarketEvent,
  type ResolvePolymarketResponse,
  type SavedPolymarketEvent,
} from '@/lib/polymarketApi'
import { PolymarketPriceChart } from '@/features/polymarket/PolymarketPriceChart'
import { PolymarketRichText } from '@/features/polymarket/PolymarketRichText'
import { PolymarketOsintChatPanel } from '@/features/polymarket/PolymarketOsintChatPanel'
import { ensurePolymarketEventSession } from '@/features/polymarket/ensurePolymarketSession'
import { usePolymarketClobWs } from '@/features/polymarket/usePolymarketClobWs'
import { DialogProvider } from '@/osint/components/ui/Dialog'
import { ToastProvider } from '@/osint/components/ui/Feedback'

function formatVolume(volume: number | undefined | null): string {
  if (volume == null || !Number.isFinite(volume)) return '—'
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}

export function PolymarketRouteLayout() {
  const { leftCollapsed, rightCollapsed } = useWorkbenchChrome()
  const { confirm } = useConfirm()

  const [saved, setSaved] = useState<SavedPolymarketEvent[]>([])
  const [listLoading, setListLoading] = useState(true)
  const [searchDraft, setSearchDraft] = useState('')
  const [resolving, setResolving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [resolved, setResolved] = useState<ResolvePolymarketResponse | null>(null)
  const [saving, setSaving] = useState(false)

  const [selected, setSelected] = useState<SavedPolymarketEvent | null>(null)
  const normalizedSelected = selected ? {
    ...selected,
    volume: selected.volume ?? (selected as any).Volume ?? 0,
    yesPct: selected.yesPct ?? (selected as any).YesPct ?? 0,
    noPct: selected.noPct ?? (selected as any).NoPct ?? 0,
    conditionId: selected.conditionId ?? (selected as any).ConditionID ?? '',
    eventSlug: selected.eventSlug ?? (selected as any).EventSlug ?? '',
    clobTokenIds: selected.clobTokenIds ?? (selected as any).ClobTokenIDs ?? [],
    rules: selected.rules ?? (selected as any).RulesText ?? '',
    background: selected.background ?? (selected as any).BackgroundText ?? '',
    aiSessionId: selected.aiSessionId ?? (selected as any).AISessionID ?? '',
  } : null

  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes')
  const [timeframe, setTimeframe] = useState<'24H' | 'ALL'>('24H')
  const [change24h, setChange24h] = useState<number | null>(null)
  const [mainTab, setMainTab] = useState<'chart' | 'rules' | 'background'>('chart')
  const [darkMode, setDarkMode] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  const [creatingSession, setCreatingSession] = useState(false)

  // Client-side resolve popup state
  const [resolvePopupOpen, setResolvePopupOpen] = useState(false)
  const [resolveError, setResolveError] = useState<string | null>(null)
  const [resolvingClient, setResolvingClient] = useState(false)

  const handleResolveClick = useCallback(() => {
    setResolveError(null)
    setResolvePopupOpen(true)
  }, [])

  const bindSessionToEvent = useCallback((ev: SavedPolymarketEvent, sessionId: string) => {
    const updated: SavedPolymarketEvent = { ...ev, aiSessionId: sessionId }
    setSaved((prev) => prev.map((s) => (s.id === ev.id ? { ...s, aiSessionId: sessionId } : s)))
    setSelected(updated)
    return updated
  }, [])

  const handleSelect = useCallback(
    async (ev: SavedPolymarketEvent) => {
      setCreatingSession(true)
      useAppStore.setState({ error: null })
      try {
        const sessionId = await ensurePolymarketEventSession(ev)
        bindSessionToEvent(ev, sessionId)
      } catch (e) {
        console.error('Failed to ensure polymarket session:', e)
        const msg = e instanceof Error ? e.message : '创建 AI 会话失败'
        window.alert(`无法创建 AI 会话：${msg}\n请确认已登录后重试。`)
        setSelected(ev)
      } finally {
        setCreatingSession(false)
      }
    },
    [bindSessionToEvent],
  )

  const reloadSaved = useCallback(async () => {
    setListLoading(true)
    try {
      const rows = await listSavedPolymarketEvents()
      setSaved(rows)
    } catch (e) {
      console.error(e)
    } finally {
      setListLoading(false)
    }
  }, [])

  useEffect(() => {
    void reloadSaved()
  }, [reloadSaved])

  const handleResolved = useCallback(
    async (resolved: ResolvePolymarketResponse) => {
      setResolvingClient(true)
      setResolveError(null)
      try {
        const row = await savePolymarketEvent({
          eventSlug: resolved.eventSlug,
          eventId: resolved.eventId,
          conditionId: resolved.market.conditionId,
          marketSlug: resolved.market.marketSlug,
          title: resolved.title,
          imageUrl: resolved.imageUrl,
          clobTokenIds: resolved.market.clobTokenIds,
          yesPct: resolved.market.yesPct,
          noPct: resolved.market.noPct,
          volume: resolved.market.volume,
          rules: resolved.rules ?? '',
          background: resolved.background ?? '',
        })
        await reloadSaved()
        await handleSelect(row)
        setResolvePopupOpen(false)
      } catch (e: any) {
        setResolveError(e instanceof Error ? e.message : '保存失败')
      } finally {
        setResolvingClient(false)
      }
    },
    [reloadSaved, handleSelect],
  )

  useEffect(() => {
    setMainTab('chart')
  }, [selected?.conditionId])

  const activeTokenId = useMemo(() => {
    if (!selected?.clobTokenIds?.length) return null
    if (outcome === 'no' && normalizedSelected?.clobTokenIds.length > 1) return normalizedSelected.clobTokenIds[1]
    return normalizedSelected?.clobTokenIds[0] ?? null
  }, [selected, outcome])

  const { livePct, connected } = usePolymarketClobWs(selected ? activeTokenId : null)

  const displayPct = useMemo(() => {
    if (livePct != null && Number.isFinite(livePct)) return livePct
    if (!selected) return null
    return outcome === 'yes' ? normalizedSelected?.yesPct ?? 0 : normalizedSelected?.noPct ?? 0
  }, [livePct, selected, outcome])

  useEffect(() => {
    if (!selected) {
      setChange24h(null)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetchPolymarketPriceHistory(normalizedSelected?.conditionId ?? '', {
          outcome,
          timeframe: '24H',
        })
        const pts = res.points ?? []
        if (cancelled || pts.length < 2) {
          if (!cancelled) setChange24h(null)
          return
        }
        const a = pts[0].p * 100
        const b = pts[pts.length - 1].p * 100
        setChange24h(b - a)
      } catch {
        if (!cancelled) setChange24h(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [selected, outcome])

  const onSearchClick = useCallback(async () => {
    const q = searchDraft.trim()
    if (!q) return
    setResolving(true)
    setResolved(null)
    try {
      const r = await resolvePolymarketInput(q)
      setResolved(r)
      setModalOpen(true)
    } catch (e) {
      console.error(e)
      window.alert(e instanceof Error ? e.message : '解析失败')
    } finally {
      setResolving(false)
    }
  }, [searchDraft])

  const onConfirmSave = useCallback(async () => {
    if (!resolved) return
    setSaving(true)
    try {
      const m = resolved.market
      const row = await savePolymarketEvent({
        eventSlug: resolved.eventSlug,
        eventId: resolved.eventId,
        conditionId: m.conditionId,
        marketSlug: m.marketSlug,
        title: resolved.title,
        imageUrl: resolved.imageUrl,
        clobTokenIds: m.clobTokenIds,
        yesPct: m.yesPct,
        noPct: m.noPct,
        volume: m.volume,
        rules: resolved.rules ?? '',
        background: resolved.background ?? '',
      })
      await reloadSaved()
      setModalOpen(false)
      setResolved(null)
      setSearchDraft('')
      await handleSelect(row)
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '保存失败')
    } finally {
      setSaving(false)
    }
  }, [resolved, reloadSaved, handleSelect])

  const onRemove = useCallback(
    async (ev: SavedPolymarketEvent) => {
      const ok = await confirm({
        title: '移除保存的事件？',
        description: `将删除「${ev.title.slice(0, 80)}${ev.title.length > 80 ? '…' : ''}」`,
        confirmText: '移除',
        variant: 'destructive',
      })
      if (!ok) return
      try {
        await deleteSavedPolymarketEvent(ev.id)
        await reloadSaved()
        if (selected?.id === ev.id) setSelected(null)
      } catch (e) {
        window.alert(e instanceof Error ? e.message : '删除失败')
      }
    },
    [confirm, reloadSaved, selected],
  )

  const chartColors =
    outcome === 'yes'
      ? {
          line: '#2563eb',
          top: 'rgba(37, 99, 235, 0.22)',
          bottom: 'rgba(37, 99, 235, 0.02)',
        }
      : {
          line: '#ea580c',
          top: 'rgba(234, 88, 12, 0.22)',
          bottom: 'rgba(234, 88, 12, 0.02)',
        }

const leftPanel = (
     <PolymarketSidebarLeft
       searchDraft={searchDraft}
       onSearchDraftChange={setSearchDraft}
       onSearchClick={() => void onSearchClick()}
       onResolveClick={handleResolveClick}
       searching={resolving}
       saved={saved}
       selectedConditionId={selected?.conditionId ?? null}
       onSelect={handleSelect}
       onRemove={(ev) => void onRemove(ev)}
     />
   )

  const tabTriggerClass =
    'rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-[#5c6578] shadow-none ring-0 transition-all ' +
    'hover:text-slate-800 data-active:bg-white data-active:text-slate-900 data-active:shadow-sm ' +
    'dark:text-slate-400 dark:hover:text-slate-200 dark:data-active:bg-slate-700 dark:data-active:text-white dark:data-active:shadow-md'

  const mainPanel = (
    <div className="flex h-full min-w-0 flex-col overflow-hidden bg-[#f6f7f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {!selected ? (
        <>
          <div className="flex min-h-[52px] shrink-0 items-center border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">Polymarket</h1>
              <p className="text-[11px] text-slate-500">
                {listLoading ? '加载列表…' : `${saved.length} 个已保存`}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-slate-500">
            <p className="max-w-sm text-[13px] text-slate-600 dark:text-slate-400">
              在左侧搜索并保存事件后，点击列表项在此查看价格、规则与背景。
            </p>
          </div>
        </>
      ) : (
        <Tabs
          value={mainTab}
          onValueChange={(v) => setMainTab(v as 'chart' | 'rules' | 'background')}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex min-h-[52px] shrink-0 flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-3 py-2 sm:gap-3 sm:px-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="min-w-0 shrink-0 sm:max-w-[200px]">
              <h1 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">Polymarket</h1>
              <p className="text-[11px] text-slate-500">
                {listLoading ? '加载列表…' : `${saved.length} 个已保存`}
              </p>
            </div>
            <div className="flex min-w-0 flex-1 justify-center">
              <TabsList
                variant="default"
                className="flex h-auto w-fit max-w-full flex-wrap justify-center gap-0.5 rounded-xl border-0 bg-[#eef0f3] p-1 shadow-none dark:bg-slate-800/95"
              >
                <TabsTrigger value="chart" className={tabTriggerClass}>
                  价格走势
                </TabsTrigger>
                <TabsTrigger value="rules" className={tabTriggerClass}>
                  规则
                </TabsTrigger>
                <TabsTrigger value="background" className={tabTriggerClass}>
                  盘口背景
                </TabsTrigger>
              </TabsList>
            </div>
            {mainTab === 'chart' && (
              <div className="flex w-full shrink-0 items-center justify-end text-[11px] text-slate-500 sm:w-auto sm:justify-start"
              >
                {connected ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Wifi size={12} /> 实时
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-400">
                    <WifiOff size={12} /> 连接中…
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-0 p-4">
            <div className="shrink-0 space-y-3 rounded-t-xl border border-b-0 border-slate-200 bg-white px-4 pb-3 pt-3 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-50">
                {normalizedSelected?.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                <span>
                  当前{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {displayPct != null ? `${displayPct.toFixed(2)}%` : '—'}
                  </span>{' '}
                  {outcome === 'yes' ? 'Yes' : 'No'}
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span>Vol {formatVolume(normalizedSelected?.volume)}</span>
                {change24h != null && Number.isFinite(change24h) && mainTab === 'chart' && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span
                      className={
                        change24h >= 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }
                    >
                      24H {change24h >= 0 ? '+' : ''}
                      {change24h.toFixed(2)}%
                    </span>
                  </>
                )}
              </div>
              {mainTab === 'chart' && (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex rounded-lg bg-slate-100 p-0.5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    {(['yes', 'no'] as const).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setOutcome(k)}
                        className={cn(
                          'rounded-md px-3 py-1 text-[11px] font-semibold transition-colors',
                          outcome === k
                            ? k === 'yes'
                              ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                              : 'bg-white text-rose-700 shadow-sm dark:bg-slate-800 dark:text-rose-400'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200',
                        )}
                      >
                        {k === 'yes' ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                  <div className="flex rounded-lg bg-slate-100 p-0.5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    {(['24H', 'ALL'] as const).map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => setTimeframe(tf)}
                        className={cn(
                          'rounded-md px-3 py-1 text-[11px] font-semibold transition-colors',
                          timeframe === tf
                            ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200',
                        )}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <TabsContent
              value="chart"
              className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden border border-t-0 border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
            >
              <PolymarketPriceChart
                conditionId={normalizedSelected?.conditionId ?? ''}
                outcome={outcome}
                timeframe={timeframe}
                lineColor={chartColors.line}
                topColor={chartColors.top}
                bottomColor={chartColors.bottom}
                variant={darkMode ? 'dark' : 'light'}
                className="min-h-[280px] flex-1 border-0 dark:border dark:border-slate-800 dark:bg-slate-900"
              />
            </TabsContent>
            <TabsContent
              value="rules"
              className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden border border-t-0 border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <ScrollArea className="h-full max-h-[calc(100vh-220px)]">
                <PolymarketRichText text={normalizedSelected?.rules ?? ''} />
              </ScrollArea>
            </TabsContent>
            <TabsContent
              value="background"
              className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden border border-t-0 border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <ScrollArea className="h-full max-h-[calc(100vh-220px)]">
                <PolymarketRichText text={normalizedSelected?.background ?? ''} />
              </ScrollArea>
            </TabsContent>

            <div className="mt-3 flex shrink-0 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                onClick={() =>
                  window.open(`https://polymarket.com/event/${normalizedSelected?.eventSlug ?? ''}`, '_blank')
                }
              >
                在 Polymarket 打开
                <ExternalLink size={14} className="ml-2" />
              </Button>
            </div>
          </div>
        </Tabs>
      )}
    </div>
  )

  const rightPanel = (
    <div className="flex h-full min-h-0 flex-col border-l border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">AI 分析</h2>
        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">每个保存事件对应独立会话，切换左侧列表即切换对话</p>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <DialogProvider>
          <ToastProvider>
            {!selected ? (
              <div className="flex h-full items-center justify-center p-4 text-center text-[12px] text-slate-500">
                选择左侧已保存的事件
              </div>
            ) : creatingSession ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-[12px] text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <p>正在准备 AI 会话…</p>
              </div>
            ) : (
              <PolymarketOsintChatPanel
                key={`${normalizedSelected?.id ?? ''}-${normalizedSelected?.aiSessionId ?? ''}`}
                savedEventId={normalizedSelected?.id ?? ''}
                sessionId={(normalizedSelected?.aiSessionId ?? '').trim() || null}
                eventTitle={normalizedSelected?.title ?? null}
              />
            )}
          </ToastProvider>
        </DialogProvider>
      </div>
    </div>
  )

  return (
    <>
      <WorkbenchLayout
        className="min-h-0 flex-1 bg-gray-50 dark:bg-slate-950"
        innerClassName="min-h-0 flex-1 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950"
        leftPanelId="polymarket-left"
        mainPanelId="polymarket-main"
        rightPanelId="polymarket-right"
        leftMinPx={300}
        leftMaxPx={400}
        rightMinPx={260}
        rightMaxPx={380}
        leftSidebarVisible={!leftCollapsed}
        rightSidebarVisible={!rightCollapsed}
        left={leftPanel}
        main={mainPanel}
        right={rightPanel}
      />

{modalOpen && resolved && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center">
           <button
             type="button"
             className="absolute inset-0 bg-black/60"
             aria-label="关闭"
             onClick={() => {
               setModalOpen(false)
               setResolved(null)
             }}
           />
           <div className="relative z-[101] mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
             <button
               type="button"
               className="absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
               onClick={() => {
                 setModalOpen(false)
                 setResolved(null)
               }}
             >
               <X size={18} />
             </button>
             <div className="max-h-[80vh] overflow-y-auto p-6 pt-10">
               <div className="flex gap-4">
                 <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                   {resolved.imageUrl ? (
                     <img src={resolved.imageUrl} alt="" className="h-full w-full object-cover" />
                   ) : null}
                 </div>
                 <div className="min-w-0">
                   <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">{resolved.title}</h3>
                   <p className="mt-1 text-[11px] text-slate-500">slug: {resolved.eventSlug}</p>
                 </div>
               </div>
               <div className="mt-5 grid grid-cols-2 gap-3 text-[12px]">
                 <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                   <div className="text-slate-500">Yes</div>
                   <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                     {resolved.market.yesPct.toFixed(1)}%
                   </div>
                 </div>
                 <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                   <div className="text-slate-500">No</div>
                   <div className="text-lg font-bold text-rose-600 dark:text-rose-400">
                     {resolved.market.noPct.toFixed(1)}%
                   </div>
                 </div>
                 <div className="col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                   <div className="text-slate-500">成交量</div>
                   <div className="font-semibold text-slate-900 dark:text-slate-200">
                     {formatVolume(resolved.market.volume)}
                   </div>
                 </div>
               </div>
               <p className="mt-4 text-[11px] leading-relaxed text-slate-600 dark:text-slate-500">
                 {resolved.market.question}
               </p>
             </div>
             <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/95">
               <Button variant="outline" className="border-slate-200 dark:border-slate-700"
                 onClick={() => {
                   setModalOpen(false)
                   setResolved(null)
                 }}
               >
                 取消
               </Button>
               <Button disabled={saving} onClick={() => void onConfirmSave()}>
                 {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : '确定并保存'}
               </Button>
             </div>
           </div>
         </div>
       )}

       {/* 直接从 Gamma API 解析市场弹窗（不经过后端代理） */}
       <ResolveMarketPopup
         open={resolvePopupOpen}
         onOpenChange={(open) => {
           if (!open) setResolveError(null)
           setResolvePopupOpen(open)
         }}
         onResolved={handleResolved}
       >
         {resolveError && (
           <p className="text-[12px] text-rose-600">{resolveError}</p>
         )}
         {resolvingClient && (
           <p className="text-[12px] text-blue-600">正在保存…</p>
         )}
       </ResolveMarketPopup>
    </>
  )
}
