import { authHeaders } from '@/lib/authApi'

const DASHBOARD_V1 = '/api/dashboard'

export interface DashboardItem {
  id: number
  userName: string
  userId: string
  pubDate: string
  link: string
  content: string
  type: string
  createdAt: string
}

export interface DashboardResponse {
  items: DashboardItem[]
  totalCount: number
  hasMore: boolean
}

export interface StreamGroup {
  id: number
  type: string
}

export async function fetchStreamGroups(): Promise<StreamGroup[]> {
  const response = await fetch(`${DASHBOARD_V1}/stream-groups`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const body = err as { error?: string; detail?: string }
    throw new Error(body.error || body.detail || `Failed to fetch stream groups (${response.status})`)
  }
  const data = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('Invalid stream groups response')
  }
  return data
}

export interface TopicItem {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateTopicRequest {
  name: string
  description: string
}

export interface ScoredContent {
  id: number
  title: string
  category: string
  score: number
  date: string
}

/** 从上游拉取最新一页并写入本地 DB，再刷新页面数据 */
export async function syncDashboardStream(): Promise<{ status: string; mode?: string }> {
  const response = await fetch(`${DASHBOARD_V1}/sync`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to sync dashboard stream')
  }
  return response.json()
}

export async function fetchDashboardItems(
  type: string,
  offset = 0,
  limit = 50,
): Promise<DashboardResponse> {
  const params = new URLSearchParams()
  params.set('type', type)
  params.set('offset', String(offset))
  params.set('limit', String(limit))
  const response = await fetch(`${DASHBOARD_V1}/items?${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch dashboard items')
  }
  return response.json()
}

export async function searchDashboardItems(
  keyword: string,
  type?: string,
  offset = 0,
  limit = 50,
): Promise<DashboardResponse> {
  const params = new URLSearchParams()
  params.set('q', keyword)
  if (type && type !== 'all') {
    params.set('type', type)
  }
  params.set('offset', String(offset))
  params.set('limit', String(limit))
  const response = await fetch(`${DASHBOARD_V1}/items/search?${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to search dashboard items')
  }
  return response.json()
}

export interface DashboardBackfillResult {
  stored: number
  nextSinceId: number
  upstreamHasMore: boolean
  totalCount: number
}

/** 从上游 API 拉取一页更早历史并写入本地 DB */
export async function backfillDashboardItems(
  type: string,
  beforeRemoteId?: number,
  limit = 50,
): Promise<DashboardBackfillResult> {
  const params = new URLSearchParams()
  params.set('type', type)
  params.set('limit', String(limit))
  if (beforeRemoteId != null && beforeRemoteId > 0) {
    params.set('beforeRemoteId', String(beforeRemoteId))
  }
  const response = await fetch(`${DASHBOARD_V1}/items/backfill?${params}`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to backfill dashboard items')
  }
  return response.json()
}

export async function fetchTopics(): Promise<TopicItem[]> {
  const response = await fetch(`${DASHBOARD_V1}/topics`, { headers: authHeaders() })
  if (!response.ok) {
    throw new Error('Failed to fetch topics')
  }
  return response.json()
}

export async function createTopic(data: CreateTopicRequest): Promise<TopicItem> {
  const response = await fetch(`${DASHBOARD_V1}/topics`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create topic')
  }
  return response.json()
}

export async function deleteTopic(id: number): Promise<void> {
  const response = await fetch(`${DASHBOARD_V1}/topics/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to delete topic')
  }
}

export async function fetchScoredContent(): Promise<ScoredContent[]> {
  const response = await fetch(`${DASHBOARD_V1}/scored-content`, { headers: authHeaders() })
  if (!response.ok) {
    throw new Error('Failed to fetch scored content')
  }
  return response.json()
}

export async function triggerAggregator(): Promise<{ status: string; message: string }> {
  const response = await fetch(`${DASHBOARD_V1}/aggregator/trigger`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to trigger aggregator')
  }
  return response.json()
}

export type WordCloudGroup = 'country' | 'person' | 'location' | 'military' | 'politics' | 'economy' | 'disaster' | 'general'

export interface WordCloudWord {
  text: string
  weight: number
  group: WordCloudGroup
}

export const GROUP_COLORS: Record<WordCloudGroup, string> = {
  country: '#ef4444',   // red-500
  person: '#a855f7',    // purple-500
  location: '#22c55e',  // green-500
  military: '#f97316',  // orange-500
  politics: '#06b6d4',  // cyan-500
  economy: '#eab308',   // yellow-500
  disaster: '#ec4899',  // pink-500
  general: '#60a5fa',   // blue-400
}

export const GROUP_LABELS: Record<WordCloudGroup, string> = {
  country: '国家',
  person: '人物',
  location: '地点',
  military: '军事',
  politics: '政治',
  economy: '经济',
  disaster: '灾害',
  general: '通用',
}

export const WORD_CLOUD_GROUPS: WordCloudGroup[] = [
  'country',
  'person',
  'location',
  'military',
  'politics',
  'economy',
  'disaster',
  'general',
]

export interface WordCloudResponse {
  words: WordCloudWord[]
  itemCount: number
  generatedAt: string
}

export interface DashboardArtifact {
  id: string
  project_id?: string
  session_id?: string | null
  type: string
  name: string
  content?: string | null
  url?: string | null
  size?: string | null
  created_at: string
}

export interface AggregatorStatus {
  lastRunAt?: string
  lastItemCount?: number
  lastError?: string
  lastSentMaxID?: number
}

export interface DashboardConfig {
  sessionId: string
}

export async function fetchDashboardConfig(): Promise<DashboardConfig> {
  const response = await fetch(`${DASHBOARD_V1}/config`, { headers: authHeaders() })
  if (!response.ok) {
    return { sessionId: '' }
  }
  return response.json()
}

export async function fetchWordCloud(refresh = false): Promise<WordCloudResponse> {
  const params = refresh ? '?refresh=1' : ''
  const response = await fetch(`${DASHBOARD_V1}/wordcloud${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch word cloud')
  }
  return response.json()
}

export async function fetchDashboardArtifacts(refresh = false): Promise<DashboardArtifact[]> {
  const params = refresh ? '?refresh=1' : ''
  const response = await fetch(`${DASHBOARD_V1}/artifacts${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch artifacts')
  }
  return response.json()
}

export async function syncDashboardArtifacts(): Promise<{
  status: string
  count: number
  artifacts: DashboardArtifact[]
}> {
  const response = await fetch(`${DASHBOARD_V1}/artifacts/sync`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to sync artifacts')
  }
  return response.json()
}

export async function fetchAggregatorStatus(): Promise<AggregatorStatus> {
  const response = await fetch(`${DASHBOARD_V1}/aggregator/status`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch aggregator status')
  }
  return response.json()
}
