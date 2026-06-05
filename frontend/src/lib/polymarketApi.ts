/** Legacy proxy to local market service (top / search). */
const MARKET_PROXY = '/api/markets'

import { authHeaders } from '@/lib/authApi'

/** Main Go backend — resolve / save / history (see backend cmd/server). */
const POLY_V1 = '/api/polymarket'

/** Direct Gamma API base — used for client-side resolve only. */
const GAMMA_API = 'https://gamma-api.polymarket.com'

// ─── Client-side Gamma types (mirrors backend polymarket/client.go) ──────────

export interface GammaMarket {
  id: string
  question: string
  slug: string
  conditionId: string
  description: string
  outcomePrices: string
  outcomes: string
  volumeNum: number
  volume24hr: number
  clobTokenIds: string
  active: boolean
  closed: boolean
}

export interface GammaEventMeta {
  context_description?: string
  contextDescription?: string
}

export interface GammaEvent {
  id: string
  slug: string
  title: string
  description: string
  image: string
  icon: string
  volume: number
  volume24hr: number
  markets: GammaMarket[]
  eventMetadata?: GammaEventMeta
}

// ─── Client-side URL parser (mirrors backend ParsePolymarketInput) ───────────

export function parsePolymarketUrl(raw: string): string {
  const s = raw.trim()
  if (s === '') return ''
  if (s.includes('polymarket.com')) {
    const i = s.indexOf('/event/')
    if (i >= 0) {
      const rest = s.slice(i + '/event/'.length)
      const end = rest.search(/[/?#]/)
      if (end >= 0) return rest.slice(0, end).trim()
      return rest.trim()
    }
  }
  if (s.startsWith('http://') || s.startsWith('https://')) return ''
  return s
}

// ─── Client-side Gamma API fetchers ─────────────────────────────────────────

export async function fetchGammaEventBySlug(slug: string): Promise<GammaEvent> {
  const u = `${GAMMA_API}/events?slug=${encodeURIComponent(slug)}`
  const res = await fetch(u, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`gamma events: status ${res.status}`)
  const arr: GammaEvent[] = await res.json()
  if (!arr.length) throw new Error('event not found')
  return arr[0]
}

export function pickPrimaryMarket(ev: GammaEvent): GammaMarket | null {
  let best: GammaMarket | null = null
  let bestVol = 0
  for (const m of ev.markets) {
    if (m.closed || !m.active) continue
    const v = m.volumeNum || m.volume24hr
    if (!best || v > bestVol) {
      best = m
      bestVol = v
    }
  }
  if (best) return best
  return ev.markets[0] ?? null
}

export function parseClobTokenIds(jsonStr: string): string[] {
  const s = jsonStr.trim()
  if (!s) return []
  try {
    return JSON.parse(s) as string[]
  } catch {
    return []
  }
}

export function parseGammaOutcomePrices(jsonStr: string): { yes: number; no: number } {
  const s = jsonStr.trim()
  if (!s) return { yes: 0, no: 0 }
  try {
    const prices: string[] = JSON.parse(s)
    if (Array.isArray(prices) && typeof prices[0] === 'string') {
      // String array: e.g. ["0.52", "0.48"]
      const y = parseFloat(prices[0]) * 100
      const n = prices.length >= 2 ? parseFloat(prices[1]) * 100 : (1 - parseFloat(prices[0])) * 100
      return { yes: y, no: n }
    }
    // Number array: e.g. [0.52, 0.48]
    const nums = prices as unknown as number[]
    if (nums.length >= 1) {
      const y = nums[0] * 100
      const n = nums.length >= 2 ? nums[1] * 100 : (1 - nums[0]) * 100
      return { yes: y, no: n }
    }
  } catch {
    // fall through
  }
  return { yes: 0, no: 0 }
}

export function rulesAndBackground(ev: GammaEvent, m: GammaMarket | null): { rules: string; background: string } {
  let rules = m ? m.description.trim() : ''
  if (!rules) rules = ev.description.trim()
  if (!rules && ev.markets.length) {
    // longest market description
    let best = ''
    for (const mr of ev.markets) {
      const d = mr.description.trim()
      if (d.length > best.length) best = d
    }
    rules = best
  }
  let background = ''
  if (ev.eventMetadata) {
    background = ev.eventMetadata.context_description?.trim() ?? ev.eventMetadata.contextDescription?.trim() ?? ''
  }
  if (!background) {
    const ed = ev.description.trim()
    if (ed && ed !== rules) background = ed
  }
  return { rules, background }
}

// ─── Client-side resolve: fetch from Gamma API directly, with proxy fallback ──

export async function resolveMarketFromUrl(
  input: string,
  options?: { useProxy?: boolean },
): Promise<ResolvePolymarketResponse> {
  const slug = parsePolymarketUrl(input)
  if (!slug) throw new Error('无法解析 Polymarket 链接或 slug')

  // If proxy mode requested, use backend directly
  if (options?.useProxy) {
    const response = await fetch(`${POLY_V1}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: input }),
    })
    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error((err as { error?: string }).error || 'Resolve failed')
    }
    return response.json()
  }

  // Try direct Gamma API first (no proxy)
  const ev = await fetchGammaEventBySlug(slug)
  const m = pickPrimaryMarket(ev)
  if (!m) throw new Error('该事件没有可用市场')

  const clobTokenIds = parseClobTokenIds(m.clobTokenIds)
  if (!clobTokenIds.length) throw new Error('缺少 CLOB Token ID')

  const { yes: yesPct, no: noPct } = parseGammaOutcomePrices(m.outcomePrices)
  const vol = m.volumeNum || ev.volume
  const img = ev.image || ev.icon
  const { rules, background } = rulesAndBackground(ev, m)

  return {
    input,
    eventSlug: ev.slug,
    eventId: ev.id,
    title: ev.title,
    imageUrl: img,
    eventVolume: ev.volume,
    rules,
    background,
    market: {
      conditionId: m.conditionId,
      marketSlug: m.slug,
      question: m.question,
      clobTokenIds,
      yesPct,
      noPct,
      volume: vol,
    },
  }
}

/** Client-side resolve that bypasses the backend proxy. */
export async function resolvePolymarketInputClient(q: string): Promise<ResolvePolymarketResponse> {
  return resolveMarketFromUrl(q)
}

export interface SearchMarket {
  slug: string
  title: string
  url: string
  volume: number
  liquidity: number
  yesPrice: number
  endDate: string
  commentCount: number
  marketCount: number
}

export interface SearchResult {
  markets: SearchMarket[]
  query: string
}

export interface ScoredMarket {
  id: string
  question: string
  description: string
  category: string
  endDate: string
  status: string
  yesPrice: number
  noPrice: number
  volume24h: number
  volumeTotal: number
  liquidityUsd: number
  daysToClose: number
  distanceFrom50: number
  score: number
}

export interface TopMarketsResponse {
  markets: ScoredMarket[]
  totalFetched: number
  totalScored: number
}

export async function searchMarkets(query: string, limit = 10): Promise<SearchResult> {
  const response = await fetch(
    `${MARKET_PROXY}/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  )
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error((errorData as { error?: string }).error || 'Search failed')
  }
  return response.json()
}

export async function getTopMarkets(): Promise<TopMarketsResponse> {
  const response = await fetch(`${MARKET_PROXY}/top`)
  if (!response.ok) {
    throw new Error('Failed to fetch top markets')
  }
  return response.json()
}

// —— Polymarket saved + resolve (main backend) ——

export interface ResolvedMarketDTO {
  conditionId: string
  marketSlug: string
  question: string
  clobTokenIds: string[]
  yesPct: number
  noPct: number
  volume: number
}

export interface ResolvePolymarketResponse {
  input: string
  eventSlug: string
  eventId: string
  title: string
  imageUrl: string
  eventVolume: number
  /** 结算规则（Gamma 市场/事件 description） */
  rules: string
  /** 盘口背景（Gamma eventMetadata.context_description） */
  background: string
  market: ResolvedMarketDTO
}

// Client-side resolve: bypasses backend proxy entirely.
export async function resolvePolymarketInput(q: string): Promise<ResolvePolymarketResponse> {
  return resolveMarketFromUrl(q)
}

export interface SavedPolymarketEvent {
  id: string
  eventSlug: string
  eventId: string
  conditionId: string
  marketSlug: string
  title: string
  imageUrl: string
  clobTokenIds: string[]
  yesPct: number
  noPct: number
  volume: number
  rules: string
  background: string
  createdAt: number
  updatedAt: number
  /** 遗留字段，可为空；以 aiSessionId 为准 */
  aiProjectId?: string
  /** Intelligence 会话 id，绑定本事件 AI 对话 */
  aiSessionId?: string
}

export async function listSavedPolymarketEvents(): Promise<SavedPolymarketEvent[]> {
   const response = await fetch(`${POLY_V1}/saved`, { headers: authHeaders() })
   if (!response.ok) {
     const err = await response.json().catch(() => ({}))
     throw new Error((err as { error?: string }).error || 'List failed')
   }
   const data = await response.json()
   const raw = (data as { events: unknown[] }).events ?? []
   return raw.map((r: any) => ({
     id: r.id ?? r.ID ?? '',
     eventSlug: r.eventSlug ?? r.EventSlug ?? '',
     eventId: r.eventId ?? r.EventID ?? '',
     conditionId: r.conditionId ?? r.ConditionID ?? '',
     marketSlug: r.marketSlug ?? r.MarketSlug ?? '',
     title: r.title ?? r.Title ?? r.question ?? r.Question ?? '',
     imageUrl: r.imageUrl ?? r.ImageURL ?? '',
     clobTokenIds: r.clobTokenIds ?? r.ClobTokenIDs ?? [],
     yesPct: r.yesPct ?? r.YesPct ?? 0,
     noPct: r.noPct ?? r.NoPct ?? 0,
     volume: r.volume ?? r.Volume ?? 0,
     rules: r.rules ?? r.RulesText ?? '',
     background: r.background ?? r.BackgroundText ?? '',
     createdAt: r.createdAt ?? r.CreatedAt ?? 0,
     updatedAt: r.updatedAt ?? r.UpdatedAt ?? 0,
     aiProjectId: r.aiProjectId ?? r.AIProjectId,
     aiSessionId: r.aiSessionId ?? r.AISessionID,
   }))
 }

export async function savePolymarketEvent(payload: {
  eventSlug: string
  eventId: string
  conditionId: string
  marketSlug: string
  title: string
  imageUrl: string
  clobTokenIds: string[]
  yesPct: number
  noPct: number
  volume: number
  rules: string
  background: string
}): Promise<SavedPolymarketEvent> {
  const response = await fetch(`${POLY_V1}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Save failed')
  }
  const raw = await response.json()
  return {
    id: raw.id ?? raw.ID ?? '',
    eventSlug: raw.eventSlug ?? raw.EventSlug ?? '',
    eventId: raw.eventId ?? raw.EventID ?? '',
    conditionId: raw.conditionId ?? raw.ConditionID ?? '',
    marketSlug: raw.marketSlug ?? raw.MarketSlug ?? '',
    title: raw.title ?? raw.Title ?? '',
    imageUrl: raw.imageUrl ?? raw.ImageURL ?? '',
    clobTokenIds: raw.clobTokenIds ?? raw.ClobTokenIDs ?? [],
    yesPct: raw.yesPct ?? raw.YesPct ?? 0,
    noPct: raw.noPct ?? raw.NoPct ?? 0,
    volume: raw.volume ?? raw.Volume ?? 0,
    rules: raw.rules ?? raw.RulesText ?? '',
    background: raw.background ?? raw.BackgroundText ?? '',
    createdAt: raw.createdAt ?? raw.CreatedAt ?? 0,
    updatedAt: raw.updatedAt ?? raw.UpdatedAt ?? 0,
    aiProjectId: raw.aiProjectId ?? raw.AIProjectID,
    aiSessionId: raw.aiSessionId ?? raw.AISessionID,
  }
}

export async function deleteSavedPolymarketEvent(id: string): Promise<void> {
   const response = await fetch(`${POLY_V1}/saved/${encodeURIComponent(id)}`, {
     method: 'DELETE',
     headers: authHeaders(),
   })
  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Delete failed')
  }
}

export interface PriceHistoryPoint {
  t: number
  p: number
}

export interface PriceHistoryResponse {
  conditionId: string
  tokenId: string
  outcome: string
  timeframe: string
  points: PriceHistoryPoint[]
  source?: string  // 'plugin' | 'backend'
}

/** Upstream chat timeline for a saved Polymarket row (same shape as osint /history). */
export async function fetchSavedPolymarketChatHistory(
  savedEventId: string,
  params?: { offset?: number; limit?: number },
): Promise<{ messages: unknown[] }> {
  const usp = new URLSearchParams()
  if (typeof params?.offset === 'number') usp.set('offset', String(params.offset))
  if (typeof params?.limit === 'number') usp.set('limit', String(params.limit))
  usp.set('t', String(Date.now()))
  const response = await fetch(`${POLY_V1}/saved/${encodeURIComponent(savedEventId)}/chat/history?${usp}`, {
    headers: { ...authHeaders() },
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { detail?: string; error?: string }).detail || (err as { error?: string }).error || 'Chat history failed')
  }
  return response.json()
}

let _pluginChecked = false
let _pluginAvailable = false

// 生成唯一请求 ID
let _requestId = 0
function genRequestId(): string {
  return `poly_bridge_${++_requestId}_${Date.now()}`
}

// 通过 content script 与插件通信
function sendToPlugin(message: any): Promise<any> {
  return new Promise((resolve) => {
    const requestId = genRequestId()

    // 监听响应
    const listener = (event: MessageEvent) => {
      if (event.data?.type === 'POLYMARKET_BRIDGE_RESPONSE' && event.data.requestId === requestId) {
        window.removeEventListener('message', listener)
        resolve(event.data.payload)
      }
    }
    window.addEventListener('message', listener)

    // 发送请求
    window.postMessage({
      type: 'POLYMARKET_BRIDGE_REQUEST',
      payload: message,
      requestId
    }, '*')

    // 3 秒超时
    setTimeout(() => {
      window.removeEventListener('message', listener)
      resolve(null)
    }, 3000)
  })
}

async function checkPluginAvailable(): Promise<boolean> {
  if (_pluginChecked) return _pluginAvailable

  console.log('[PluginCheck] Starting check...')

  // 检查是否有 content script 注入
  const hasBridge = typeof window !== 'undefined' &&
    !!(window as any).chrome?.runtime &&
    !!(window as any).chrome?.runtime?.id

  if (!hasBridge) {
    // 尝试通过 postMessage 检测
    console.log('[PluginCheck] Trying postMessage detection...')
    const response = await sendToPlugin({ type: 'CHECK_PLUGIN' })
    _pluginAvailable = response !== null && (response as any)?.success === true
  } else {
    console.log('[PluginCheck] Chrome runtime detected')
    _pluginAvailable = true
  }

  _pluginChecked = true
  console.log('[PluginCheck] Final result:', _pluginAvailable)
  return _pluginAvailable
}

// 兼容旧代码
function isPluginAvailable(): boolean {
  return false // 同步检测不可靠，使用异步 checkPluginAvailable
}

export async function fetchPolymarketPriceHistory(
  conditionId: string,
  opts: { outcome: 'yes' | 'no'; timeframe: string },
): Promise<PriceHistoryResponse & { source?: string }> {
  const pluginAvail = await checkPluginAvailable()
  console.log('[PriceHistory] Plugin available:', pluginAvail)

  // 优先尝试插件
  if (pluginAvail) {
    try {
      console.log('[PriceHistory] Trying plugin...')
      const result = await fetchPriceHistoryViaPlugin(conditionId, opts.outcome, opts.timeframe)
      if (result.points?.length > 0) {
        console.log('[PriceHistory] ✅ Got data from PLUGIN:', result.points.length, 'points')
        return { ...result, source: 'plugin' }
      }
      console.warn('[PriceHistory] Plugin returned empty data, falling back to backend')
    } catch (e) {
      console.warn('[PriceHistory] Plugin failed, falling back to backend:', e)
    }
  } else {
    console.log('[PriceHistory] Plugin not available, using backend')
  }

  // 回退到后端
  const q = new URLSearchParams({
    outcome: opts.outcome,
    timeframe: opts.timeframe,
  })
  console.log('[PriceHistory] Fetching from backend:', `${POLY_V1}/markets/.../price-history?${q}`)
  const response = await fetch(
    `${POLY_V1}/markets/${encodeURIComponent(conditionId)}/price-history?${q}`,
  )
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'History failed')
  }
  const data = await response.json()
  console.log('[PriceHistory] ✅ Got data from BACKEND:', data.points?.length, 'points')
  return { ...data, source: 'backend' }
}

// ─── 浏览器插件集成 ─────────────────────────────────────────────────────────

export interface PluginSavePayload {
  eventSlug: string
  eventId: string
  conditionId: string
  marketSlug: string
  title: string
  imageUrl: string
  clobTokenIds: string[]
  yesPct: number
  noPct: number
  volume: number
  rules: string
  background: string
}

export async function fetchEventViaPlugin(input: string): Promise<ResolvePolymarketResponse> {
  const avail = await checkPluginAvailable()
  if (!avail) {
    throw new Error('浏览器插件未安装')
  }
  const response = await sendToPlugin({
    type: 'FETCH_EVENT',
    input,
  })
  if (!response?.success) {
    throw new Error(response?.error || '插件获取失败')
  }
  return response.data
}

export async function fetchSaveDataViaPlugin(input: string): Promise<PluginSavePayload> {
  const avail = await checkPluginAvailable()
  if (!avail) {
    throw new Error('浏览器插件未安装')
  }
  const response = await sendToPlugin({
    type: 'FETCH_SAVE_DATA',
    input,
  })
  if (!response?.success) {
    throw new Error(response?.error || '插件获取失败')
  }
  return response.data
}

export async function fetchPriceHistoryViaPlugin(
  conditionId: string,
  outcome: 'yes' | 'no',
  timeframe: string,
): Promise<PriceHistoryResponse> {
  const avail = await checkPluginAvailable()
  if (!avail) {
    throw new Error('浏览器插件未安装')
  }
  const response = await sendToPlugin({
    type: 'FETCH_PRICE_HISTORY',
    conditionId,
    outcome,
    timeframe,
  })
  if (!response?.success) {
    throw new Error(response?.error || '插件获取失败')
  }
  return response.data
}

export async function resolveAndSaveViaPlugin(input: string): Promise<SavedPolymarketEvent> {
  const saveData = await fetchSaveDataViaPlugin(input)
  return savePolymarketEvent(saveData)
}
