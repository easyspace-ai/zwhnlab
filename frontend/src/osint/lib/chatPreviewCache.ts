import { chatPreviewLog } from '@/osint/lib/chatPreviewLog'
import { API_CONFIG, API_ENDPOINTS } from '@/osint/config/api'
import { getOsintAccessToken } from '@/osint/auth'

const DB_NAME = 'osint-chat-preview'
const STORE_NAME = 'blobs'
const DB_VERSION = 1

export interface CachedPreviewEntry {
  id: string
  blob: Blob
  mimeType: string
  name: string
  cachedAt: number
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error ?? new Error('failed to open preview cache'))
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
  })
}

function sdkFileIdFromUrl(url?: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (trimmed.startsWith('sdk-file:')) return trimmed.slice('sdk-file:'.length)
  if (trimmed.startsWith('source:')) return trimmed.slice('source:'.length)
  return null
}

/** Cache aliases so preview works whether message refs use DB id or sdk file id. */
export function previewCacheAliases(resourceId: string, url?: string | null): string[] {
  const ids = new Set<string>()
  if (resourceId) ids.add(resourceId)
  const fileId = sdkFileIdFromUrl(url)
  if (fileId) ids.add(fileId)
  return [...ids]
}

/** Reject legacy rows that stored object URLs instead of Blob bodies. */
function isStoredPreviewBlob(value: unknown): value is Blob {
  if (!(value instanceof Blob)) return false
  return value.size > 0
}

/** Read a byte to ensure IndexedDB did not return a hollow / revoked blob handle. */
export async function validatePreviewBlob(blob: Blob): Promise<boolean> {
  if (!isStoredPreviewBlob(blob)) return false
  try {
    if (blob.size > 0) {
      await blob.slice(0, 1).arrayBuffer()
    }
    return true
  } catch {
    return false
  }
}

export async function deleteCachedPreview(resourceId: string): Promise<void> {
  try {
    const db = await openDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.delete(resourceId)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error ?? new Error('cache delete failed'))
      tx.oncomplete = () => db.close()
    })
    chatPreviewLog('cache_miss', 'removed invalid preview cache entry', { resourceId }, 'warn')
  } catch (err) {
    chatPreviewLog('cache_miss', 'failed to delete preview cache entry', { resourceId, err: String(err) }, 'warn')
  }
}

export async function deleteCachedPreviewMany(ids: string[]): Promise<void> {
  await Promise.all(ids.map((id) => deleteCachedPreview(id)))
}

export async function getCachedPreview(resourceId: string): Promise<CachedPreviewEntry | null> {
  try {
    const db = await openDb()
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.get(resourceId)
      req.onsuccess = () => {
        const row = req.result as CachedPreviewEntry | undefined
        if (!row || !isStoredPreviewBlob(row.blob)) {
          resolve(null)
          return
        }
        resolve(row)
      }
      req.onerror = () => reject(req.error ?? new Error('cache read failed'))
      tx.oncomplete = () => db.close()
    })
  } catch (err) {
    chatPreviewLog('cache_miss', 'indexedDB read failed', { resourceId, err: String(err) }, 'warn')
    return null
  }
}

export async function getCachedPreviewAny(
  ids: string[],
  filename = '',
): Promise<CachedPreviewEntry | null> {
  for (const id of ids) {
    const hit = await getCachedPreview(id)
    if (!hit) continue
    const valid = await validatePreviewBlob(hit.blob)
    const label = filename || hit.name || ''
    const matches = valid && (!label || (await blobMatchesFilename(label, hit.blob)))
    if (!valid || !matches) {
      await deleteCachedPreview(id)
      continue
    }
    const displayBlob = withDisplayMime(hit.blob, hit.name, hit.mimeType)
    chatPreviewLog('cache_hit', 'preview blob loaded from local cache', {
      resourceId: id,
      mimeType: displayBlob.type || hit.mimeType,
      size: displayBlob.size,
    })
    return { ...hit, blob: displayBlob, mimeType: displayBlob.type || hit.mimeType }
  }
  chatPreviewLog('cache_miss', 'no cached preview blob', { resourceIds: ids })
  return null
}

export async function setCachedPreview(
  resourceId: string,
  blob: Blob,
  mimeType: string,
  name: string,
): Promise<void> {
  try {
    const db = await openDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const entry: CachedPreviewEntry = {
        id: resourceId,
        blob,
        mimeType: mimeType || blob.type || 'application/octet-stream',
        name,
        cachedAt: Date.now(),
      }
      const req = store.put(entry)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error ?? new Error('cache write failed'))
      tx.oncomplete = () => db.close()
    })
    chatPreviewLog('cache_store', 'stored preview blob in local cache', {
      resourceId,
      mimeType,
      size: blob.size,
    })
  } catch (err) {
    chatPreviewLog('cache_store', 'failed to persist preview blob', { resourceId, err: String(err) }, 'warn')
  }
}

export async function seedCachedPreviewFromFile(
  resourceId: string,
  file: File,
  aliases: string[] = [],
): Promise<void> {
  const ids = new Set([resourceId, ...aliases.filter(Boolean)])
  await Promise.all(
    [...ids].map((id) =>
      setCachedPreview(id, file, file.type || 'application/octet-stream', file.name),
    ),
  )
}

function getAuthToken(): string | null {
  return getOsintAccessToken()
}

function buildArtifactFetchUrl(resourceId: string, kind: 'preview' | 'download'): string {
  const baseUrl = API_CONFIG.baseUrl || ''
  const endpoint =
    kind === 'preview'
      ? API_ENDPOINTS.projectArtifactPreview(resourceId)
      : API_ENDPOINTS.projectArtifactDownload(resourceId)
  let url = `${baseUrl}${endpoint}`
  const token = getAuthToken()
  if (token) {
    url += `${url.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
  }
  return url
}

const DEFAULT_MAX_ATTEMPTS = 3
const RETRYABLE_HTTP = new Set([404, 502, 503])
const TERMINAL_HTTP = new Set([401, 403, 429])
/** Per-request ceiling; matches {@link API_CONFIG.timeout}. */
const PREVIEW_FETCH_TIMEOUT_MS = API_CONFIG.timeout || 30_000
const PROBE_FETCH_TIMEOUT_MS = 15_000

function linkAbortSignals(signals: AbortSignal[]): AbortSignal {
  const combined = new AbortController()
  const onAbort = () => combined.abort()
  for (const s of signals) {
    if (s.aborted) {
      combined.abort()
      return combined.signal
    }
    s.addEventListener('abort', onAbort, { once: true })
  }
  return combined.signal
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  meta: { resourceId: string; kind: string },
): Promise<Response> {
  const timeoutController = new AbortController()
  const timer = window.setTimeout(() => timeoutController.abort(), timeoutMs)
  const userSignal = init.signal
  const signal = linkAbortSignals(
    [timeoutController.signal, userSignal].filter((s): s is AbortSignal => Boolean(s)),
  )
  try {
    return await fetch(url, { ...init, signal })
  } catch (err) {
    if (userSignal?.aborted) {
      throw err
    }
    if (timeoutController.signal.aborted) {
      chatPreviewLog(
        'load_timeout',
        `artifact fetch exceeded ${timeoutMs}ms`,
        { ...meta, timeoutMs },
        'warn',
      )
      throw new Error(
        `加载超时（${Math.round(timeoutMs / 1000)} 秒），请使用下载或稍后重试`,
      )
    }
    throw err
  } finally {
    window.clearTimeout(timer)
  }
}

/** Avoid hammering the API after a terminal failure for this resource in the tab session. */
const sessionFailedResourceIds = new Set<string>()

const inFlightPreviewLoads = new Map<
  string,
  Promise<{ blob: Blob; mimeType: string; objectUrl: string }>
>()

export function isPreviewLoadFailed(resourceId: string): boolean {
  return sessionFailedResourceIds.has(resourceId)
}

export function clearPreviewLoadFailure(resourceId: string): void {
  sessionFailedResourceIds.delete(resourceId)
}

function inFlightKey(resourceId: string, kind: 'preview' | 'download', skipCache: boolean): string {
  return `${resourceId}:${kind}:${skipCache ? 'nocache' : 'cache'}`
}

function markPreviewLoadFailed(resourceId: string, status?: number): void {
  sessionFailedResourceIds.add(resourceId)
  if (status != null) {
    chatPreviewLog('load_error', 'marked resource as failed for session (no further retries)', {
      resourceId,
      status,
    })
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }
    const timer = window.setTimeout(resolve, ms)
    const onAbort = () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

async function fetchPreviewBlobOnce(
  resourceId: string,
  kind: 'preview' | 'download',
  headers: Record<string, string>,
  signal?: AbortSignal,
  timeoutMs = PREVIEW_FETCH_TIMEOUT_MS,
): Promise<Response> {
  const url = buildArtifactFetchUrl(resourceId, kind)
  return fetchWithTimeout(url, { headers, signal }, timeoutMs, { resourceId, kind })
}

function leadingJsonObject(bytes: Uint8Array): boolean {
  let i = 0
  while (i < bytes.length && (bytes[i] === 0x20 || bytes[i] === 0x09 || bytes[i] === 0x0a || bytes[i] === 0x0d)) {
    i++
  }
  return i < bytes.length && bytes[i] === 0x7b
}

function fileExt(filename: string): string {
  const match = filename.match(/\.([a-zA-Z0-9]+)$/)
  return match ? match[1].toLowerCase() : ''
}

function mimeFromFilename(filename: string): string | undefined {
  const ext = fileExt(filename)
  const map: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    mp4: 'video/mp4',
    webm: 'video/webm',
    pdf: 'application/pdf',
  }
  return map[ext]
}

function isJpegMagic(head: Uint8Array): boolean {
  return head.length >= 3 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff
}

function isPngMagic(head: Uint8Array): boolean {
  return (
    head.length >= 8 &&
    head[0] === 0x89 &&
    head[1] === 0x50 &&
    head[2] === 0x4e &&
    head[3] === 0x47
  )
}

function isGifMagic(head: Uint8Array): boolean {
  return head.length >= 6 && (String.fromCharCode(...head.slice(0, 6)) === 'GIF87a' ||
    String.fromCharCode(...head.slice(0, 6)) === 'GIF89a')
}

function isWebpMagic(head: Uint8Array): boolean {
  return (
    head.length >= 12 &&
    String.fromCharCode(...head.slice(0, 4)) === 'RIFF' &&
    String.fromCharCode(...head.slice(8, 12)) === 'WEBP'
  )
}

function isPdfMagic(head: Uint8Array): boolean {
  return (
    head.length >= 5 &&
    head[0] === 0x25 &&
    head[1] === 0x50 &&
    head[2] === 0x44 &&
    head[3] === 0x46 &&
    head[4] === 0x2d
  )
}

/** Reject cached JSON error payloads and obvious non-media bytes for known extensions. */
async function blobMatchesFilename(filename: string, blob: Blob): Promise<boolean> {
  if (blob.size === 0) return false
  const head = new Uint8Array(await blob.slice(0, Math.min(blob.size, 32)).arrayBuffer())
  if (leadingJsonObject(head)) return false

  const ext = fileExt(filename)
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
    return isJpegMagic(head) || isPngMagic(head) || isGifMagic(head) || isWebpMagic(head)
  }
  if (ext === 'pdf') {
    return isPdfMagic(head)
  }
  return true
}

function withDisplayMime(blob: Blob, filename: string, headerMime?: string): Blob {
  const preferred =
    mimeFromFilename(filename) ||
    (headerMime && !headerMime.includes('json') ? headerMime.split(';')[0]?.trim() : undefined)
  if (!preferred) return blob
  const current = (blob.type || '').split(';')[0]?.trim().toLowerCase()
  if (!current || current === 'application/octet-stream' || current.includes('json')) {
    return new Blob([blob], { type: preferred })
  }
  return blob
}

async function responseLooksLikeJsonError(res: Response, blob: Blob): Promise<boolean> {
  const ct = (res.headers.get('content-type') || blob.type || '').toLowerCase()
  if (ct.includes('application/json') || ct.includes('text/json')) return true
  if (blob.size === 0 || blob.size > 8192) return false
  try {
    const head = new Uint8Array(await blob.slice(0, Math.min(blob.size, 256)).arrayBuffer())
    if (!leadingJsonObject(head)) return false
    const text = new TextDecoder().decode(await blob.slice(0, blob.size).arrayBuffer())
    const j = JSON.parse(text) as Record<string, unknown>
    return (
      j.preview_supported === false ||
      typeof j.error === 'string' ||
      typeof j.detail === 'string' ||
      typeof j.message === 'string'
    )
  } catch {
    return false
  }
}

async function probeDownloadAvailable(
  resourceId: string,
  headers: Record<string, string>,
  signal?: AbortSignal,
): Promise<boolean> {
  try {
    const res = await fetchPreviewBlobOnce(
      resourceId,
      'download',
      headers,
      signal,
      PROBE_FETCH_TIMEOUT_MS,
    )
    if (!res.ok) return false
    const blob = await res.blob()
    if (blob.size === 0) return false
    return !(await responseLooksLikeJsonError(res, blob))
  } catch {
    return false
  }
}

async function consumeArtifactResponse(
  res: Response,
  resourceId: string,
  name: string,
  cacheIds: string[],
): Promise<{ blob: Blob; mimeType: string; objectUrl: string }> {
  const raw = await res.blob()
  if (raw.size === 0) {
    throw new Error('empty response')
  }
  if (await responseLooksLikeJsonError(res, raw)) {
    throw new Error('preview endpoint returned JSON instead of file bytes')
  }
  const headerMime = res.headers.get('content-type')?.split(';')[0]?.trim()
  const blob = withDisplayMime(raw, name, headerMime)
  if (!(await blobMatchesFilename(name, blob))) {
    throw new Error('response is not valid media for this file type')
  }
  const mimeType = blob.type || headerMime || 'application/octet-stream'
  await Promise.all(cacheIds.map((id) => setCachedPreview(id, blob, mimeType, name)))
  const objectUrl = URL.createObjectURL(blob)
  clearPreviewLoadFailure(resourceId)
  chatPreviewLog('load_done', 'server blob loaded and cached', {
    resourceId,
    mimeType,
    size: blob.size,
  })
  return { blob, mimeType, objectUrl }
}

export async function loadPreviewBlob(options: {
  resourceId: string
  name: string
  cacheIds?: string[]
  kind?: 'preview' | 'download'
  accept?: string
  maxAttempts?: number
  signal?: AbortSignal
  /** Bypass IndexedDB (e.g. after <img> onError from stale cache). */
  skipCache?: boolean
}): Promise<{ blob: Blob; mimeType: string; objectUrl: string }> {
  const {
    resourceId,
    name,
    cacheIds = [resourceId],
    kind = 'download',
    accept = '*/*',
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
    signal,
    skipCache = false,
  } = options

  if (isPreviewLoadFailed(resourceId)) {
    throw new Error('预览加载失败，请关闭后重试')
  }

  const flightKey = inFlightKey(resourceId, kind, skipCache)
  const existing = inFlightPreviewLoads.get(flightKey)
  if (existing) {
    return existing
  }

  const work = (async (): Promise<{ blob: Blob; mimeType: string; objectUrl: string }> => {
    const clearInFlight = () => {
      if (inFlightPreviewLoads.get(flightKey) === work) {
        inFlightPreviewLoads.delete(flightKey)
      }
    }
    if (!skipCache) {
      const cached = await getCachedPreviewAny(cacheIds, name)
      if (cached) {
        const objectUrl = URL.createObjectURL(cached.blob)
        chatPreviewLog('load_done', 'preview served from cache (fresh object URL)', {
          resourceId,
          mimeType: cached.mimeType,
          size: cached.blob.size,
        })
        return { blob: cached.blob, mimeType: cached.mimeType, objectUrl }
      }
    }

    const token = getAuthToken()
    const headers: Record<string, string> = { Accept: accept }
    if (token) headers.Authorization = `Bearer ${token}`

    let attempt = 0
    const baseDelay = 1000
    let lastError: Error | null = null
    let triedDownloadFallback = false

    while (attempt < maxAttempts) {
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError')
      }

      const fetchKind = kind === 'preview' && triedDownloadFallback ? 'download' : kind

      chatPreviewLog('load_server', 'fetching artifact from backend', {
        resourceId,
        attempt: attempt + 1,
        kind: fetchKind,
      })

      try {
        const res = await fetchPreviewBlobOnce(resourceId, fetchKind, headers, signal)
        if (!res.ok) {
          const t = await res.text().catch(() => '')
          const err = new Error(`HTTP ${res.status}${t ? `: ${t.slice(0, 200)}` : ''}`)

          if (fetchKind === 'preview' && !triedDownloadFallback) {
            const downloadOk = await probeDownloadAvailable(resourceId, headers, signal)
            if (downloadOk) {
              chatPreviewLog(
                'fallback_download',
                'preview request failed but download endpoint has bytes; retrying via download',
                { resourceId, previewStatus: res.status },
                'warn',
              )
              triedDownloadFallback = true
              continue
            }
          }

          if (TERMINAL_HTTP.has(res.status)) {
            markPreviewLoadFailed(resourceId, res.status)
            throw err
          }

          if (RETRYABLE_HTTP.has(res.status) && attempt < maxAttempts - 1) {
            attempt++
            await sleep(baseDelay * Math.pow(2, attempt - 1), signal)
            continue
          }

          throw err
        }

        try {
          return await consumeArtifactResponse(res, resourceId, name, cacheIds)
        } catch (parseErr: unknown) {
          const parseError = parseErr instanceof Error ? parseErr : new Error(String(parseErr))
          if (fetchKind === 'preview' && !triedDownloadFallback) {
            const downloadOk = await probeDownloadAvailable(resourceId, headers, signal)
            if (downloadOk) {
              chatPreviewLog(
                'fallback_download',
                'preview returned non-file payload but download endpoint has bytes; retrying via download',
                { resourceId, previewError: parseError.message },
                'warn',
              )
              triedDownloadFallback = true
              continue
            }
            chatPreviewLog(
              'load_error',
              'preview failed and download probe also unavailable',
              { resourceId, previewError: parseError.message },
              'error',
            )
          }
          throw parseError
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          throw err
        }
        lastError = err instanceof Error ? err : new Error(String(err))
        const statusMatch = lastError.message.match(/^HTTP (\d+)/)
        const status = statusMatch ? Number(statusMatch[1]) : undefined
        if (status != null && TERMINAL_HTTP.has(status)) {
          break
        }
        if (attempt < maxAttempts - 1) {
          attempt++
          await sleep(baseDelay * Math.pow(2, attempt - 1), signal)
          continue
        }
      }
    }

    const msg = lastError?.message || '加载失败'
    markPreviewLoadFailed(resourceId)
    chatPreviewLog('load_error', msg, { resourceId }, 'error')
    clearInFlight()
    throw lastError ?? new Error(msg)
  })()

  inFlightPreviewLoads.set(flightKey, work)
  try {
    return await work
  } catch (err) {
    if (inFlightPreviewLoads.get(flightKey) === work) {
      inFlightPreviewLoads.delete(flightKey)
    }
    throw err
  } finally {
    if (inFlightPreviewLoads.get(flightKey) === work) {
      inFlightPreviewLoads.delete(flightKey)
    }
  }
}

/** Drop stale cache entries and load fresh bytes from the server (download/preview). */
export async function invalidateCachedPreviewAndLoadFromServer(
  options: {
    resourceId: string
    name: string
    cacheIds?: string[]
    kind?: 'preview' | 'download'
    accept?: string
    maxAttempts?: number
    signal?: AbortSignal
  },
): Promise<{ blob: Blob; mimeType: string; objectUrl: string }> {
  const cacheIds = options.cacheIds ?? [options.resourceId]
  chatPreviewLog('cache_invalid_refetch', 'stale cache invalidated, refetching from server', {
    resourceId: options.resourceId,
    cacheIds,
    kind: options.kind ?? 'download',
  })
  await deleteCachedPreviewMany(cacheIds)
  clearPreviewLoadFailure(options.resourceId)
  return loadPreviewBlob({ ...options, cacheIds, skipCache: true })
}
