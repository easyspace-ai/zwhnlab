import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchWordCloud,
  fetchDashboardArtifacts,
  syncDashboardArtifacts,
  fetchDashboardConfig,
  type WordCloudWord,
  type DashboardArtifact,
} from '@/lib/dashboardApi'
import { WordCloudPanel } from './WordCloudPanel'
import { DashboardArtifactsPanel } from './DashboardArtifactsPanel'

const WORDCLOUD_REFRESH_MS = 30 * 60 * 1000

interface DashboardOverviewPanelProps {
  /** Bump to refetch artifacts after aggregator trigger */
  artifactRefreshKey?: number
  /** Search keyword passed from left panel search */
  searchKeyword?: string
}

export function DashboardOverviewPanel({ artifactRefreshKey = 0, searchKeyword }: DashboardOverviewPanelProps) {
  const [dashboardSessionId, setDashboardSessionId] = useState('')
  const [words, setWords] = useState<WordCloudWord[]>([])
  const [wordItemCount, setWordItemCount] = useState<number | undefined>()
  const [wordLoading, setWordLoading] = useState(true)
  const [wordRefreshing, setWordRefreshing] = useState(false)
  const [wordError, setWordError] = useState<string | null>(null)

  const [artifacts, setArtifacts] = useState<DashboardArtifact[]>([])
  const [artifactsLoading, setArtifactsLoading] = useState(true)
  const [artifactsRefreshing, setArtifactsRefreshing] = useState(false)
  const [artifactsError, setArtifactsError] = useState<string | null>(null)

  const loadWordCloud = useCallback(async (silent = false) => {
    if (!silent) setWordLoading(true)
    else setWordRefreshing(true)
    setWordError(null)
    try {
      const data = await fetchWordCloud(silent)
      setWords(data.words ?? [])
      setWordItemCount(data.itemCount)
    } catch (e) {
      setWordError(e instanceof Error ? e.message : '加载词云失败')
    } finally {
      setWordLoading(false)
      setWordRefreshing(false)
    }
  }, [])

  const loadArtifacts = useCallback(async (opts?: { silent?: boolean; refresh?: boolean }) => {
    const silent = opts?.silent ?? false
    const refresh = opts?.refresh ?? false
    if (!silent) setArtifactsLoading(true)
    else setArtifactsRefreshing(true)
    setArtifactsError(null)
    try {
      const list = await fetchDashboardArtifacts(refresh)
      setArtifacts(list ?? [])
    } catch (e) {
      setArtifactsError(e instanceof Error ? e.message : '加载产物失败')
    } finally {
      setArtifactsLoading(false)
      setArtifactsRefreshing(false)
    }
  }, [])

  const syncArtifactsFromRemote = useCallback(async () => {
    setArtifactsRefreshing(true)
    setArtifactsError(null)
    try {
      const result = await syncDashboardArtifacts()
      setArtifacts(result.artifacts ?? [])
    } catch (e) {
      setArtifactsError(e instanceof Error ? e.message : '同步产物失败')
    } finally {
      setArtifactsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void fetchDashboardConfig().then((cfg) => setDashboardSessionId(cfg.sessionId ?? ''))
  }, [])

  useEffect(() => {
    void loadWordCloud()
    const t = window.setInterval(() => void loadWordCloud(true), WORDCLOUD_REFRESH_MS)
    return () => window.clearInterval(t)
  }, [loadWordCloud])

  const prevSessionId = useRef<string | null>(null)
  useEffect(() => {
    if (prevSessionId.current !== dashboardSessionId) {
      prevSessionId.current = dashboardSessionId
      setArtifacts([])
    }
  }, [dashboardSessionId])

  useEffect(() => {
    if (!dashboardSessionId) return
    void loadArtifacts()
    const t = window.setTimeout(() => void syncArtifactsFromRemote(), 500)
    return () => window.clearTimeout(t)
  }, [dashboardSessionId, loadArtifacts, syncArtifactsFromRemote])

  const prevRefreshKey = useRef(artifactRefreshKey)
  useEffect(() => {
    if (artifactRefreshKey !== prevRefreshKey.current && dashboardSessionId) {
      prevRefreshKey.current = artifactRefreshKey
      const t = window.setTimeout(() => void syncArtifactsFromRemote(), 5000)
      return () => window.clearTimeout(t)
    }
  }, [artifactRefreshKey, syncArtifactsFromRemote, dashboardSessionId])

  const handleWordClick = useCallback((word: string) => {
    // Dispatch a custom event that DashboardRouteLayout listens to
    window.dispatchEvent(new CustomEvent('dashboard:wordcloud-click', { detail: word }))
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col divide-y divide-slate-200 dark:divide-slate-800">
      <div className="min-h-0 flex-[55]">
        <WordCloudPanel
          words={words}
          loading={wordLoading}
          error={wordError}
          itemCount={wordItemCount}
          onRefresh={() => void loadWordCloud(true)}
          refreshing={wordRefreshing}
          onWordClick={handleWordClick}
        />
      </div>
      <div className="min-h-0 flex-[45]">
        <DashboardArtifactsPanel
          artifacts={artifacts}
          loading={artifactsLoading}
          error={artifactsError}
          sessionConfigured={dashboardSessionId !== ''}
          sessionId={dashboardSessionId}
          onRefresh={() => void syncArtifactsFromRemote()}
          refreshing={artifactsRefreshing}
        />
      </div>
    </div>
  )
}
