import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Loader2, RefreshCw, ExternalLink, Zap, Search, X, Link2 } from 'lucide-react'
import { WorkbenchLayout } from '@/components/layout/WorkbenchLayout'
import { useWorkbenchChrome } from '@/components/layout/WorkbenchChromeContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  fetchDashboardItems,
  backfillDashboardItems,
  searchDashboardItems,
  fetchStreamGroups,
  syncDashboardStream,
  triggerAggregator,
  type DashboardItem,
} from '@/lib/dashboardApi'
import { cn } from '@/lib/utils'
import { isAdmin } from '@/lib/authApi'
import { useOsintUser } from '@/osint/auth'
import { DashboardOverviewPanel } from './DashboardOverviewPanel'

const BATCH_LIMIT = 50
const STREAM_SYNC_INTERVAL_MS = 10 * 60 * 1000

type LinkFilter = {
  keyword: string
  sourceType: string
  sourceItemId: number
}

function extractLinkKeyword(item: DashboardItem): string {
  const hashtag = item.content.match(/#([\w\u4e00-\u9fff]+)/)
  if (hashtag?.[1] && hashtag[1].length >= 2) return hashtag[1]
  if (item.userName.trim()) return item.userName.trim()
  return item.userId.trim()
}

function highlightKeyword(text: string, keyword: string): ReactNode {
  const q = keyword.trim()
  if (!q) return text
  const lower = text.toLowerCase()
  const ql = q.toLowerCase()
  const parts: ReactNode[] = []
  let start = 0
  let pos = lower.indexOf(ql, start)
  let key = 0
  while (pos !== -1) {
    if (pos > start) parts.push(text.slice(start, pos))
    parts.push(
      <mark
        key={key++}
        className="rounded bg-amber-200/80 px-0.5 text-slate-900 dark:bg-amber-500/40 dark:text-slate-100"
      >
        {text.slice(pos, pos + q.length)}
      </mark>,
    )
    start = pos + q.length
    pos = lower.indexOf(ql, start)
  }
  if (start < text.length) parts.push(text.slice(start))
  return parts.length > 0 ? parts : text
}

function formatDateShort(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

function StreamColumn({
  type,
  items,
  totalCount,
  loading,
  loadingMore,
  localHasMore,
  showBackfillButton,
  onLoadMoreLocal,
  onBackfill,
  onRefresh,
  showRefresh = true,
  fetching,
  highlightKeyword: highlight,
  filterMode,
  selectedItemId,
  linkSourceType,
  onItemClick,
}: {
  type: string
  items: DashboardItem[]
  totalCount: number
  loading: boolean
  loadingMore: boolean
  localHasMore: boolean
  showBackfillButton: boolean
  onLoadMoreLocal: () => void
  onBackfill: () => void
  onRefresh: () => void
  showRefresh?: boolean
  fetching: boolean
  highlightKeyword?: string
  filterMode?: 'search' | 'link' | false
  selectedItemId?: number | null
  linkSourceType?: string | null
  onItemClick?: (item: DashboardItem) => void
}) {
  const scrollRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = scrollRootRef.current
    if (!root) return
    const viewport = root.querySelector('[data-slot="scroll-area-viewport"]') as HTMLDivElement | null
    if (!viewport) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport
      const threshold = 80
      if (
        scrollHeight - scrollTop - clientHeight < threshold &&
        localHasMore &&
        !loadingMore &&
        !loading
      ) {
        onLoadMoreLocal()
      }
    }

    viewport.addEventListener('scroll', handleScroll)
    return () => viewport.removeEventListener('scroll', handleScroll)
  }, [localHasMore, loadingMore, loading, onLoadMoreLocal])

  return (
    <div className="flex h-full min-w-[160px] flex-col bg-white dark:bg-slate-950">
      <div className="shrink-0 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="truncate text-[13px] font-semibold text-slate-900 dark:text-slate-50">{type}</h2>
          {showRefresh ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={fetching || !!filterMode}
              className="h-6 w-6 shrink-0 p-0"
            >
              {fetching ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            </Button>
          ) : null}
        </div>
        <p className="mt-0.5 text-[10px] text-slate-400">
          {filterMode ? `匹配 ${items.length} 条` : `${totalCount} 条数据`}
          {filterMode === 'link' && linkSourceType === type && (
            <span className="ml-1 text-blue-500">· 联动源</span>
          )}
        </p>
      </div>
      <div ref={scrollRootRef} className="flex min-h-0 flex-1 flex-col">
        <ScrollArea className="h-full flex-1">
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            </div>
          ) : items.length === 0 ? (
            <div className="p-4 text-center text-[12px] text-slate-500">
              {filterMode ? '本列无匹配结果' : '暂无数据'}
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item) => {
                const isSelected = selectedItemId === item.id
                const isClickable = !!onItemClick
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onItemClick?.(item)}
                    disabled={!isClickable}
                    className={cn(
                      'w-full p-3 text-left transition-colors',
                      isClickable && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900',
                      isSelected && 'bg-blue-50 ring-1 ring-inset ring-blue-200 dark:bg-blue-950/40 dark:ring-blue-800',
                      !isClickable && 'cursor-default',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-900 dark:text-slate-200">
                        {item.userName}
                      </span>
                      <span className="text-[10px] text-slate-400">{formatDateShort(item.pubDate)}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-600 dark:text-slate-400">
                      {highlight ? highlightKeyword(item.content, highlight) : item.content}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {item.type}
                      </span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-0.5 text-[10px] text-blue-500 hover:text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                          源文
                        </a>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
          {loadingMore && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            </div>
          )}
          {showBackfillButton && !loading && !loadingMore && (
            <div className="p-3 text-center">
              <Button variant="outline" size="sm" onClick={onBackfill} className="text-[11px]">
                加载更多
              </Button>
              <p className="mt-1 text-[9px] text-slate-400">本地数据已读完，点击从监测流拉取更早历史</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export function DashboardRouteLayout() {
  const { leftCollapsed } = useWorkbenchChrome()
  const user = useOsintUser()
  const showAdminActions = isAdmin(user)

  const [streamTypes, setStreamTypes] = useState<string[]>([])
  const [streamTypesLoading, setStreamTypesLoading] = useState(true)
  const [streamTypesError, setStreamTypesError] = useState<string | null>(null)

  const [streamItems, setStreamItems] = useState<Record<string, DashboardItem[]>>({})
  const [streamTotalCounts, setStreamTotalCounts] = useState<Record<string, number>>({})
  const [streamLoading, setStreamLoading] = useState<Record<string, boolean>>({})
  const [streamLoadingMore, setStreamLoadingMore] = useState<Record<string, boolean>>({})
  const [streamHasMore, setStreamHasMore] = useState<Record<string, boolean>>({})
  const [streamUpstreamHasMore, setStreamUpstreamHasMore] = useState<Record<string, boolean>>({})
  const [streamFetching, setStreamFetching] = useState<Record<string, boolean>>({})
  const offsetRefs = useRef<Record<string, number>>({})
  const streamItemsRef = useRef(streamItems)
  streamItemsRef.current = streamItems

  const mergeItems = (existing: DashboardItem[], incoming: DashboardItem[]) => {
    if (incoming.length === 0) return existing
    const seen = new Set(existing.map((i) => i.id))
    const merged = [...existing]
    for (const item of incoming) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        merged.push(item)
      }
    }
    return merged
  }

  const minRemoteId = (items: DashboardItem[]) => {
    if (items.length === 0) return undefined
    return Math.min(...items.map((i) => i.id))
  }

  const [aggregatorTriggering, setAggregatorTriggering] = useState(false)
  const [aggregatorMessage, setAggregatorMessage] = useState('')
  const [artifactRefreshKey, setArtifactRefreshKey] = useState(0)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [searchResults, setSearchResults] = useState<DashboardItem[]>([])
  const [searchTotal, setSearchTotal] = useState(0)
  const [searchLoading, setSearchLoading] = useState(false)

  const [linkFilter, setLinkFilter] = useState<LinkFilter | null>(null)
  const [linkResults, setLinkResults] = useState<DashboardItem[]>([])
  const [linkTotal, setLinkTotal] = useState(0)
  const [linkLoading, setLinkLoading] = useState(false)

  const filterMode: 'search' | 'link' | false = linkFilter
    ? 'link'
    : searchActive
      ? 'search'
      : false

  const loadStreamGroups = useCallback(async () => {
    setStreamTypesLoading(true)
    setStreamTypesError(null)
    try {
      const groups = await fetchStreamGroups()
      const types = groups.map((g) => g.type).filter(Boolean)
      setStreamTypes(types)
      if (types.length === 0) {
        setStreamTypesError('上游未返回任何监测流分类')
      }
    } catch (e) {
      console.error('Failed to load stream groups:', e)
      setStreamTypes([])
      setStreamTypesError(e instanceof Error ? e.message : '加载监测流分类失败')
    } finally {
      setStreamTypesLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadStreamGroups()
  }, [loadStreamGroups])

  const loadStreamData = useCallback(async (type: string, append = false) => {
    const setLoading = append ? setStreamLoadingMore : setStreamLoading
    setLoading((prev) => ({ ...prev, [type]: true }))
    if (!append) {
      offsetRefs.current[type] = 0
    }
    const offset = append ? (offsetRefs.current[type] ?? 0) : 0
    try {
      const resp = await fetchDashboardItems(type, offset, BATCH_LIMIT)
      setStreamItems((prev) => ({
        ...prev,
        [type]: append ? mergeItems(prev[type] || [], resp.items) : resp.items,
      }))
      setStreamTotalCounts((prev) => ({ ...prev, [type]: resp.totalCount }))
      setStreamHasMore((prev) => ({ ...prev, [type]: resp.hasMore }))
      offsetRefs.current[type] = offset + resp.items.length
    } catch (e) {
      console.error(`Failed to load ${type}:`, e)
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }))
    }
  }, [])

  useEffect(() => {
    if (streamTypes.length === 0) return
    streamTypes.forEach((type) => {
      void loadStreamData(type)
    })
  }, [streamTypes, loadStreamData])

  const handleLoadMoreLocal = useCallback(
    (type: string) => {
      if (filterMode) return
      if (!(streamHasMore[type] ?? false)) return
      void loadStreamData(type, true)
    },
    [loadStreamData, streamHasMore, filterMode],
  )

  const handleBackfill = useCallback(async (type: string) => {
    setStreamLoadingMore((prev) => ({ ...prev, [type]: true }))
    try {
      const beforeId = minRemoteId(streamItemsRef.current[type] || [])
      const backfill = await backfillDashboardItems(type, beforeId, BATCH_LIMIT)
      setStreamUpstreamHasMore((prev) => ({ ...prev, [type]: backfill.upstreamHasMore }))
      setStreamTotalCounts((prev) => ({ ...prev, [type]: backfill.totalCount }))

      const offset = offsetRefs.current[type] ?? 0
      const resp = await fetchDashboardItems(type, offset, BATCH_LIMIT)
      setStreamItems((prev) => ({
        ...prev,
        [type]: mergeItems(prev[type] || [], resp.items),
      }))
      setStreamHasMore((prev) => ({ ...prev, [type]: resp.hasMore }))
      offsetRefs.current[type] = offset + resp.items.length
    } catch (e) {
      console.error(`Failed to backfill ${type}:`, e)
    } finally {
      setStreamLoadingMore((prev) => ({ ...prev, [type]: false }))
    }
  }, [])

  const syncAndReload = useCallback(
    async (types: string[]) => {
      const markFetching = (on: boolean) => {
        setStreamFetching((prev) => {
          const next = { ...prev }
          for (const type of types) next[type] = on
          return next
        })
      }
      markFetching(true)
      try {
        await syncDashboardStream()
        await Promise.all(types.map((type) => loadStreamData(type)))
      } catch (e) {
        console.error('Failed to sync dashboard stream:', e)
      } finally {
        markFetching(false)
      }
    },
    [loadStreamData],
  )

  const handleRefresh = useCallback(
    (type: string) => {
      void syncAndReload([type])
    },
    [syncAndReload],
  )

  useEffect(() => {
    if (!showAdminActions || streamTypes.length === 0 || filterMode) return
    const t = window.setInterval(() => {
      void syncAndReload(streamTypes)
    }, STREAM_SYNC_INTERVAL_MS)
    return () => window.clearInterval(t)
  }, [showAdminActions, streamTypes, filterMode, syncAndReload])

  const handleTriggerAggregator = async () => {
    setAggregatorTriggering(true)
    setAggregatorMessage('')
    try {
      const result = await triggerAggregator()
      setAggregatorMessage(result.message || '聚合任务已触发')
      setArtifactRefreshKey((k) => k + 1)
      setTimeout(() => setAggregatorMessage(''), 3000)
    } catch (e) {
      setAggregatorMessage(e instanceof Error ? e.message : '触发失败')
      setTimeout(() => setAggregatorMessage(''), 5000)
    } finally {
      setAggregatorTriggering(false)
    }
  }

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSearchActive(false)
      setSearchResults([])
      setSearchQuery('')
      return
    }
    setLinkFilter(null)
    setLinkResults([])
    setSearchLoading(true)
    setSearchActive(true)
    try {
      const resp = await searchDashboardItems(q.trim(), 'all', 0, 200)
      setSearchResults(resp.items)
      setSearchTotal(resp.totalCount)
    } catch (e) {
      console.error('Search failed:', e)
    } finally {
      setSearchLoading(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchActive(false)
    setSearchResults([])
  }, [])

  const runLinkFilter = useCallback(async (filter: LinkFilter) => {
    setSearchActive(false)
    setSearchResults([])
    setSearchQuery('')
    setLinkFilter(filter)
    setLinkLoading(true)
    try {
      const resp = await searchDashboardItems(filter.keyword, 'all', 0, 200)
      setLinkResults(resp.items)
      setLinkTotal(resp.totalCount)
    } catch (e) {
      console.error('Link filter failed:', e)
      setLinkResults([])
      setLinkTotal(0)
    } finally {
      setLinkLoading(false)
    }
  }, [])

  const clearLinkFilter = useCallback(() => {
    setLinkFilter(null)
    setLinkResults([])
    setLinkTotal(0)
  }, [])

  const handleItemClick = useCallback(
    (item: DashboardItem) => {
      if (filterMode === 'link' && linkFilter?.sourceItemId === item.id) {
        clearLinkFilter()
        return
      }
      const keyword = extractLinkKeyword(item)
      if (!keyword) return
      void runLinkFilter({
        keyword,
        sourceType: item.type,
        sourceItemId: item.id,
      })
    },
    [filterMode, linkFilter, clearLinkFilter, runLinkFilter],
  )

  useEffect(() => {
    const handler = (e: Event) => {
      const word = (e as CustomEvent<string>).detail
      if (word) {
        setSearchQuery(word)
        void runSearch(word)
      }
    }
    window.addEventListener('dashboard:wordcloud-click', handler)
    return () => window.removeEventListener('dashboard:wordcloud-click', handler)
  }, [runSearch])

  const activeFilterResults = linkFilter ? linkResults : searchResults
  const activeFilterTotal = linkFilter ? linkTotal : searchTotal
  const activeFilterLoading = linkFilter ? linkLoading : searchLoading
  const activeHighlight = linkFilter?.keyword ?? (searchActive ? searchQuery : undefined)

  const filterItemsByType = useMemo(() => {
    const grouped: Record<string, DashboardItem[]> = {}
    for (const type of streamTypes) {
      grouped[type] = []
    }
    for (const item of activeFilterResults) {
      if (grouped[item.type]) {
        grouped[item.type].push(item)
      } else {
        grouped[item.type] = [item]
      }
    }
    return grouped
  }, [activeFilterResults, streamTypes])

  const leftPanel = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950">
      <div className="shrink-0 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              if (!e.target.value.trim()) clearSearch()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void runSearch(searchQuery)
            }}
            placeholder="搜索关键词..."
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-8 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {filterMode === 'search' && (
        <div className="shrink-0 border-b border-amber-200/80 bg-amber-50 px-3 py-1.5 text-[10px] text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          {activeFilterLoading ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" />
              正在搜索「{searchQuery}」…
            </span>
          ) : activeFilterResults.length === 0 ? (
            <span>未找到与「{searchQuery}」相关的内容</span>
          ) : (
            <span>
              已按「{searchQuery}」过滤信息流，共 {activeFilterTotal} 条（当前展示 {activeFilterResults.length} 条）
            </span>
          )}
        </div>
      )}

      {filterMode === 'link' && linkFilter && (
        <div className="shrink-0 border-b border-blue-200/80 bg-blue-50 px-3 py-1.5 text-[10px] text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
          <div className="flex items-center justify-between gap-2">
            {activeFilterLoading ? (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                正在联动检索「{linkFilter.keyword}」…
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Link2 className="h-3 w-3" />
                已按「{linkFilter.keyword}」跨分类联动，共 {activeFilterTotal} 条（展示 {activeFilterResults.length} 条）
              </span>
            )}
            <button
              type="button"
              onClick={clearLinkFilter}
              className="shrink-0 text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              清除联动
            </button>
          </div>
        </div>
      )}

      <div className="shrink-0 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">信息流</h2>
            <p className="mt-0.5 text-[10px] text-slate-400">
              {streamTypesLoading
                ? '正在加载分类…'
                : streamTypes.length > 0
                  ? `${streamTypes.length} 个分类 · 点击条目可跨栏联动`
                  : '暂无可用分类'}
            </p>
          </div>
          {showAdminActions ? (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTriggerAggregator}
                disabled={aggregatorTriggering}
                className="h-6 px-2 text-[11px]"
                title="手动测试：将信息流最新 10 条推送到 AI 会话"
              >
                {aggregatorTriggering ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Zap className="h-3 w-3" />
                )}
                <span className="ml-1">聚合推送</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void loadStreamGroups()}
                disabled={streamTypesLoading}
                className="h-6 w-6 p-0"
                title="刷新分类"
              >
                {streamTypesLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void syncAndReload(streamTypes)}
                disabled={streamTypes.some((type) => streamFetching[type] ?? false) || !!filterMode}
                className="h-6 w-6 p-0"
                title="刷新全部数据"
              >
                {streamTypes.some((type) => streamFetching[type] ?? false) ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
              </Button>
            </div>
          ) : null}
        </div>
        {aggregatorMessage && (
          <p className="mt-1 text-[10px] text-green-600 dark:text-green-400">{aggregatorMessage}</p>
        )}
      </div>

      <div className="flex min-h-0 flex-1 divide-x divide-slate-200 overflow-x-auto dark:divide-slate-800">
        {streamTypesLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : streamTypes.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-[12px] text-slate-500">
            <p>未获取到监测流分类，请检查接口配置</p>
            {streamTypesError && (
              <p className="max-w-md text-[11px] text-amber-600 dark:text-amber-400">{streamTypesError}</p>
            )}
          </div>
        ) : (
          streamTypes.map((type) => (
            <div key={type} className="flex min-w-0 flex-1">
              <StreamColumn
                type={type}
                items={filterMode ? filterItemsByType[type] || [] : streamItems[type] || []}
                totalCount={streamTotalCounts[type] ?? 0}
                loading={filterMode ? activeFilterLoading : (streamLoading[type] ?? false)}
                loadingMore={filterMode ? false : (streamLoadingMore[type] ?? false)}
                localHasMore={filterMode ? false : (streamHasMore[type] ?? false)}
                showBackfillButton={
                  !filterMode &&
                  !(streamHasMore[type] ?? false) &&
                  streamUpstreamHasMore[type] !== false
                }
                onLoadMoreLocal={() => handleLoadMoreLocal(type)}
                onBackfill={() => void handleBackfill(type)}
                onRefresh={() => handleRefresh(type)}
                showRefresh={showAdminActions}
                fetching={streamFetching[type] ?? false}
                highlightKeyword={activeHighlight}
                filterMode={filterMode}
                selectedItemId={linkFilter?.sourceItemId ?? null}
                linkSourceType={linkFilter?.sourceType ?? null}
                onItemClick={filterMode === 'search' ? undefined : handleItemClick}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )

  const mainPanel = (
    <div className="flex h-full min-w-0 flex-col bg-[#f6f7f9] dark:bg-slate-950">
      <DashboardOverviewPanel artifactRefreshKey={artifactRefreshKey} />
    </div>
  )

  return (
    <WorkbenchLayout
      className="min-h-0 flex-1 bg-gray-50 dark:bg-slate-950"
      innerClassName="min-h-0 flex-1 border border-slate-200/90 bg-[#f7f8fa] dark:border-slate-800 dark:bg-slate-950"
      leftPanelId="dashboard-left"
      mainPanelId="dashboard-main"
      rightPanelId="dashboard-right"
      leftMinPx={streamTypes.length > 0 ? Math.min(1200, 160 * streamTypes.length + 80) : 700}
      leftMaxPx={1600}
      leftSidebarVisible={!leftCollapsed}
      rightSidebarVisible={false}
      left={leftPanel}
      main={mainPanel}
      right={null}
    />
  )
}
