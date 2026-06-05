import { authHeaders } from '@/lib/authApi'

const XSTREAM_V1 = '/api/xstream'

export interface XStreamItem {
  id: number
  userName: string
  userId: string
  pubDate: string
  link: string
  content: string
  type: string
  createdAt: string
}

export interface XStreamResponse {
  items: XStreamItem[]
  types: Record<string, number>
  hasMore: boolean
}

/** 向后端触发历史回填（上游 sinceId=0 最新，再按 nextSinceId 向更早历史翻页） */
export async function triggerInitFetch(): Promise<void> {
  const response = await fetch(`${XSTREAM_V1}/init`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to trigger init fetch')
  }
}

/** 获取数据库中最新的 ID */
export async function fetchLatestId(): Promise<number> {
  const response = await fetch(`${XSTREAM_V1}/latest-id`, { headers: authHeaders() })
  if (!response.ok) {
    throw new Error('Failed to fetch latest id')
  }
  const data = await response.json()
  return data.latestId ?? 0
}

/** 分页拉取：按 offset/limit 获取数据（用于初始加载和加载历史） */
export async function fetchXStreamItems(offset = 0, limit = 50, type = 'all'): Promise<XStreamResponse> {
  const params = new URLSearchParams()
  params.set('offset', String(offset))
  params.set('limit', String(limit))
  if (type && type !== 'all') {
    params.set('type', type)
  }
  const response = await fetch(`${XSTREAM_V1}/items?${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch xstream items')
  }
  return response.json()
}

/** 从本地 DB 增量读取：remote_id > sinceId（与上游 API 游标语义不同） */
export async function fetchXStreamSince(sinceId: number, limit = 50, type = 'all'): Promise<XStreamResponse> {
  const params = new URLSearchParams()
  params.set('sinceId', String(sinceId))
  params.set('limit', String(limit))
  if (type && type !== 'all') {
    params.set('type', type)
  }
  const response = await fetch(`${XSTREAM_V1}/since?${params}`, { headers: authHeaders() })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to fetch xstream since')
  }
  return response.json()
}

/** 手动触发一次增量拉取 */
export async function triggerXStreamFetch(): Promise<void> {
  const response = await fetch(`${XSTREAM_V1}/trigger`, { headers: authHeaders() })
  if (!response.ok) {
    throw new Error('Failed to trigger fetch')
  }
}