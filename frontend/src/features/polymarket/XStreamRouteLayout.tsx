import { useCallback, useEffect, useRef, useState } from 'react'
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  fetchLatestId,
  fetchXStreamItems,
  fetchXStreamSince,
  triggerInitFetch,
  triggerXStreamFetch,
  type XStreamItem,
} from '@/lib/xstreamApi'
import { DialogProvider } from '@/osint/components/ui/Dialog'
import { ToastProvider } from '@/osint/components/ui/Feedback'
import { PolymarketOsintChatPanel } from '@/features/polymarket/PolymarketOsintChatPanel'
import { cn } from '@/lib/utils'

const INIT_SINCE_ID = 289000
const AUTO_REFRESH_INTERVAL = 10 * 60 * 1000 // 10 分钟
const BATCH_LIMIT = 50

function formatDateFull(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  } catch {
    return dateStr
  }
}

export function XStreamRouteLayout() {
  const { leftCollapsed, rightCollapsed } = useWorkbenchChrome()

  const [items, setItems] = useState<XStreamItem[]>([])
  const [types, setTypes] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [selectedItem, setSelectedItem] = useState<XStreamItem | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [fetching, setFetching] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const [initStatus, setInitStatus] = useState<'pending' | 'checking' | 'initialized' | 'failed'>('pending')

  const sinceIdRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 检查数据库是否需要初始化：如果最新 ID < 289000，则需要从 289000 开始拉取
  const checkAndInitialize = useCallback(async () => {
    setInitStatus('checking')
    try {
      const latestId = await fetchLatestId()
      if (latestId < INIT_SINCE_ID) {
        // 需要初始化
        setInitializing(true)
        setInitStatus('pending')
        await triggerInitFetch()
        setInitStatus('initialized')
        setInitializing(false)
      } else {
        setInitStatus('initialized')
      }
    } catch (e) {
      console.error('初始化检查失败:', e)
      setInitStatus('failed')
      setInitializing(false)
    }
  }, [])

  // 初始化完成后首次加载数据
  const loadInitialData = useCallback(async () => {
    if (initStatus !== 'initialized') return
    setLoading(true)
    offsetRef.current = 0
    try {
      const resp = await fetchXStreamItems(0, BATCH_LIMIT, filterType)
      setItems(resp.items)
      setTypes(resp.types)
      setHasMore(resp.hasMore)
      offsetRef.current = resp.items.length
      if (resp.items.length > 0) {
        const maxId = Math.max(...resp.items.map((i) => i.id))
        sinceIdRef.current = maxId
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [initStatus, filterType])

  // 加载更多历史数据
  const loadMore = useCallback(async () => {
    if (loadingMore || loading || !hasMore) return
    setLoadingMore(true)
    try {
      const resp = await fetchXStreamItems(offsetRef.current, BATCH_LIMIT, filterType)
      if (resp.items.length > 0) {
        setItems((prev) => [...prev, ...resp.items])
        offsetRef.current += resp.items.length
        const maxId = Math.max(...resp.items.map((i) => i.id))
        if (maxId > sinceIdRef.current) {
          sinceIdRef.current = maxId
        }
      }
      setHasMore(resp.hasMore)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, loading, hasMore, filterType])

  // 无限滚动监听
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return
    const viewport = scrollArea.querySelector('[data-slot="scroll-area-viewport"]') as HTMLDivElement | null
    if (!viewport) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport
      const threshold = 80
      if (scrollHeight - scrollTop - clientHeight < threshold && hasMore && !loadingMore && !loading) {
        void loadMore()
      }
    }

    viewport.addEventListener('scroll', handleScroll)
    return () => viewport.removeEventListener('scroll', handleScroll)
  }, [hasMore, loadingMore, loading, loadMore])

  // 10 分钟定时增量拉取新数据
  useEffect(() => {
    if (initStatus !== 'initialized') return
    timerRef.current = setInterval(() => {
      if (sinceIdRef.current > 0 && document.visibilityState === 'visible') {
        void (async () => {
          try {
            const resp = await fetchXStreamSince(sinceIdRef.current, BATCH_LIMIT, filterType)
            if (resp.items.length > 0) {
              setItems((prev) => [...resp.items, ...prev])
              setTypes(resp.types)
              const maxId = Math.max(...resp.items.map((i) => i.id))
              sinceIdRef.current = maxId
            }
          } catch (e) {
            console.error(e)
          }
        })()
      }
    }, AUTO_REFRESH_INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [initStatus, filterType])

  // 初始化流程
  useEffect(() => {
    void checkAndInitialize()
  }, [checkAndInitialize])

  useEffect(() => {
    if (initStatus === 'initialized' && !initializing) {
      void loadInitialData()
    }
  }, [initStatus, initializing, loadInitialData])

  const handleManualRefresh = async () => {
    setFetching(true)
    try {
      await triggerXStreamFetch()
      // 刷新后重新加载最新数据
      offsetRef.current = 0
      const resp = await fetchXStreamItems(0, BATCH_LIMIT, filterType)
      setItems(resp.items)
      setTypes(resp.types)
      setHasMore(resp.hasMore)
      offsetRef.current = resp.items.length
      if (resp.items.length > 0) {
        const maxId = Math.max(...resp.items.map((i) => i.id))
        sinceIdRef.current = maxId
      }
    } catch (e) {
      console.error(e)
    } finally {
      setFetching(false)
    }
  }

  const leftPanel = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950">
      <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">X 信息流</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={fetching || initializing || initStatus !== 'initialized'}
            className="h-7 text-[11px]"
          >
            {fetching ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            <span className="ml-1">刷新</span>
          </Button>
        </div>
        {initStatus !== 'initialized' && (
          <div className="mt-2 text-[11px] text-slate-500">
            {initializing
              ? '初始化中，正在从起始游标拉取全部历史数据…'
              : initStatus === 'checking'
                ? '正在检查数据状态…'
                : initStatus === 'failed'
                  ? '初始化检查失败，请稍后重试'
                  : '等待初始化…'}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            onClick={() => setFilterType('all')}
            className={cn(
              'rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
              filterType === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-700 dark:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400',
            )}
          >
            全部 ({(Object.values(types) as number[]).reduce((a, b) => a + b, 0)})
          </button>
          {(Object.entries(types) as [string, number][]).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                'rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
                filterType === type
                  ? 'bg-slate-900 text-white dark:bg-slate-700 dark:text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400',
              )}
            >
              {type} ({count})
            </button>
          ))}
        </div>
      </div>
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        {initializing || initStatus !== 'initialized' ? (
          <div className="flex h-32 flex-col items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            <p className="text-[11px] text-slate-400">
              {initializing ? '初始化拉取中…' : initStatus === 'checking' ? '正在检查…' : '等待初始化…'}
            </p>
          </div>
        ) : loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-[12px] text-slate-500">暂无数据</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  'w-full p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900',
                  selectedItem?.id === item.id && 'bg-slate-100 dark:bg-slate-800',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-900 dark:text-slate-200">
                    {item.userName}
                  </span>
                  <span className="text-[10px] text-slate-400">{formatDateFull(item.pubDate)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] text-slate-600 dark:text-slate-400">
                  {item.content}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {item.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        {loadingMore && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          </div>
        )}
      </ScrollArea>
    </div>
  )

  const mainPanel = (
    <div className="flex h-full min-w-0 flex-col overflow-hidden bg-[#f6f7f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-[52px] shrink-0 items-center border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">X 信息流</h1>
          <p className="text-[11px] text-slate-500">
            {loading && !initializing ? '加载中...' : initStatus !== 'initialized'
              ? '初始化中…'
              : `${items.length} 条数据`}
          </p>
        </div>
      </div>
      {!selectedItem ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-slate-500">
          <p className="max-w-sm text-[13px] text-slate-600 dark:text-slate-400">
            在左侧选择一条信息流查看详情
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-0 p-4 overflow-auto">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-200">
                  {selectedItem.userName}
                </span>
                <span className="ml-2 text-[11px] text-slate-400">@{selectedItem.userId}</span>
              </div>
              <span className="text-[10px] text-slate-400">{formatDateFull(selectedItem.pubDate)}</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
              {selectedItem.content}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {selectedItem.type}
              </span>
              <a
                href={selectedItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
              >
                查看原文
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-2 text-[13px] font-semibold text-slate-900 dark:text-slate-200">AI 分析</h3>
            <div className="min-h-[200px] flex items-center justify-center text-[12px] text-slate-400">
              选择左侧信息流后可与 AI 对话分析
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const rightPanel = (
    <div className="flex h-full min-h-0 flex-col border-l border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">占位符</h2>
        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-400">右侧边栏占位</p>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 text-center text-[12px] text-slate-500">
        暂未开放
      </div>
    </div>
  )

  return (
    <WorkbenchLayout
      className="min-h-0 flex-1 bg-gray-50 dark:bg-slate-950"
      innerClassName="min-h-0 flex-1 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950"
      leftPanelId="xstream-left"
      mainPanelId="xstream-main"
      rightPanelId="xstream-right"
      leftMinPx={280}
      leftMaxPx={400}
      rightMinPx={260}
      rightMaxPx={380}
      leftSidebarVisible={!leftCollapsed}
      rightSidebarVisible={!rightCollapsed}
      left={leftPanel}
      main={mainPanel}
      right={rightPanel}
    />
  )
}