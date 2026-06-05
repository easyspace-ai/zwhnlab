import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { X, Maximize2, Minimize2, Download, FileX, Move, Maximize } from 'lucide-react'
import { cn } from '@/osint/utils'
import { MarkdownRenderer } from '@/osint/components/MarkdownRenderer'
import { useToast } from '@/osint/components/ui/Feedback'
import { API_ENDPOINTS, API_CONFIG } from '@/osint/config/api'
import { getOsintAccessToken } from '@/osint/auth'
import { chatPreviewLog, isLocalPreviewId } from '@/osint/lib/chatPreviewLog'
import {
  loadPreviewBlob,
  previewCacheAliases,
  getCachedPreviewAny,
  setCachedPreview,
  isPreviewLoadFailed,
  clearPreviewLoadFailure,
  invalidateCachedPreviewAndLoadFromServer,
} from '@/osint/lib/chatPreviewCache'
import { exportMarkdownAsPdf, exportMarkdownAsWord } from '@/osint/lib/exportMarkdown'
function useDragging() {
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragInfoRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0, startY: 0, initialX: 0, initialY: 0
  })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input, iframe')) return
    setIsDragging(true)
    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: offset.x,
      initialY: offset.y,
    }
    e.preventDefault()
  }, [offset.x, offset.y])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: dragInfoRef.current.initialX + (e.clientX - dragInfoRef.current.startX),
        y: dragInfoRef.current.initialY + (e.clientY - dragInfoRef.current.startY),
      })
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return { isDragging, offset, handleMouseDown }
}

// ===== 文件类型检测 =====

type PreviewType = 'html' | 'markdown' | 'image' | 'audio' | 'video' | 'ppt' | 'pdf' | 'unsupported'

interface FileTypeInfo {
  type: PreviewType
  ext: string
  mimeType?: string
}

const getFileExtension = (filename?: string): string => {
  if (!filename) return ''
  const match = filename.match(/\.([a-zA-Z0-9]+)$/)
  return match ? match[1].toLowerCase() : ''
}

const detectPreviewType = (filename?: string, resourceType?: string): FileTypeInfo => {
  if (resourceType === 'pdf') {
    return { type: 'pdf', ext: getFileExtension(filename) || 'pdf', mimeType: 'application/pdf' }
  }
  const ext = getFileExtension(filename)

  if (['html', 'htm'].includes(ext)) {
    return { type: 'html', ext, mimeType: 'text/html' }
  }
  if (ext === 'md' || ext === 'txt') {
    return { type: 'markdown', ext, mimeType: ext === 'txt' ? 'text/plain' : 'text/markdown' }
  }
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(ext)) {
    const mimeMap: Record<string, string> = {
      png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
      gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp',
      bmp: 'image/bmp', ico: 'image/x-icon'
    }
    return { type: 'image', ext, mimeType: mimeMap[ext] || 'image/*' }
  }
  if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(ext)) {
    const mimeMap: Record<string, string> = {
      mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg',
      m4a: 'audio/mp4', aac: 'audio/aac', flac: 'audio/flac'
    }
    return { type: 'audio', ext, mimeType: mimeMap[ext] || 'audio/*' }
  }
  if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) {
    const mimeMap: Record<string, string> = {
      mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
      avi: 'video/x-msvideo', mkv: 'video/x-matroska'
    }
    return { type: 'video', ext, mimeType: mimeMap[ext] || 'video/*' }
  }
  if (['pdf'].includes(ext)) {
    return { type: 'pdf', ext, mimeType: 'application/pdf' }
  }
  if (['ppt', 'pptx'].includes(ext)) {
    return { type: 'ppt', ext, mimeType: ext === 'ppt' ? 'application/vnd.ms-powerpoint' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
  }
  return { type: 'unsupported', ext }
}

const buildArtifactUrl = (resourceId: string, type: 'preview' | 'download'): string => {
  const baseUrl = API_CONFIG.baseUrl || ''
  const endpoint = type === 'preview'
    ? API_ENDPOINTS.projectArtifactPreview(resourceId)
    : API_ENDPOINTS.projectArtifactDownload(resourceId)
  return `${baseUrl}${endpoint}`
}

const getAuthToken = (): string | null => getOsintAccessToken()

const isPdfMagic = (bytes: Uint8Array): boolean =>
  bytes.length >= 5 &&
  bytes[0] === 0x25 &&
  bytes[1] === 0x50 &&
  bytes[2] === 0x44 &&
  bytes[3] === 0x46 &&
  bytes[4] === 0x2d

const leadingJsonObject = (bytes: Uint8Array): boolean => {
  let i = 0
  while (i < bytes.length && (bytes[i] === 0x20 || bytes[i] === 0x09 || bytes[i] === 0x0a || bytes[i] === 0x0d)) {
    i++
  }
  return bytes[i] === 0x7b
}

// ===== 组件 =====

export interface ViewingResource {
  id: string
  name: string
  type?: string
  content?: string
  url?: string | null
  /** 浏览器内暂存的本地附件（发送前预览） */
  localFile?: File
}

interface ArtifactPreviewPanelProps {
  viewingResource: ViewingResource
  sessionId: string
  isPreviewExpanded: boolean
  onClose: () => void
  onToggleExpand: () => void
  isPopupMode?: boolean
}

export default function ArtifactPreviewPanel({
  viewingResource,
  sessionId,
  isPreviewExpanded,
  onClose,
  onToggleExpand,
  isPopupMode = false,
}: ArtifactPreviewPanelProps) {
  const { addToast } = useToast()
  const isLocalPreview = useMemo(
    () => Boolean(viewingResource.localFile) || isLocalPreviewId(viewingResource.id),
    [viewingResource.id, viewingResource.localFile],
  )

  const fileType = useMemo(() => {
    const info = detectPreviewType(viewingResource.name, viewingResource.type)
    chatPreviewLog('detect_type', 'resolved preview renderer', {
      id: viewingResource.id,
      name: viewingResource.name,
      type: info.type,
      ext: info.ext,
      isLocal: isLocalPreview,
    })
    return info
  }, [viewingResource.name, viewingResource.type, viewingResource.id, isLocalPreview])

  const { isDragging, offset, handleMouseDown } = useDragging()

  const [markdownContent, setMarkdownContent] = useState('')
  const [markdownLoading, setMarkdownLoading] = useState(false)
  const [markdownError, setMarkdownError] = useState<string | null>(null)
  const [exportBusy, setExportBusy] = useState<'word' | 'pdf' | null>(null)

  /** 使用 blob: + 内置 PDF 查看器，避免 pdf.js worker 跨域 / Range 导致解析失败 */
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const pdfObjectUrlRef = useRef<string | null>(null)

  const revokePdfObjectUrl = useCallback(() => {
    if (pdfObjectUrlRef.current) {
      URL.revokeObjectURL(pdfObjectUrlRef.current)
      pdfObjectUrlRef.current = null
    }
    setPdfBlobUrl(null)
  }, [])

  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null)
  const localBlobUrlRef = useRef<string | null>(null)

  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null)
  const [mediaLoading, setMediaLoading] = useState(false)
  const [mediaImageReady, setMediaImageReady] = useState(false)
  const [mediaError, setMediaError] = useState<string | null>(null)
  const mediaObjectUrlRef = useRef<string | null>(null)
  const mediaResolvedRef = useRef<{ id: string; status: 'ok' | 'error' } | null>(null)
  /** One automatic server refetch per resource after stale cache render failure. */
  const mediaDisplayRetryRef = useRef<string | null>(null)
  const mediaLoadTokenRef = useRef(0)
  const IMAGE_DECODE_TIMEOUT_MS = 15_000

  const revokeMediaObjectUrl = useCallback(() => {
    if (mediaObjectUrlRef.current) {
      URL.revokeObjectURL(mediaObjectUrlRef.current)
      mediaObjectUrlRef.current = null
    }
    setMediaBlobUrl(null)
  }, [])

  const revokeLocalBlobUrl = useCallback(() => {
    if (localBlobUrlRef.current) {
      URL.revokeObjectURL(localBlobUrlRef.current)
      localBlobUrlRef.current = null
    }
    setLocalBlobUrl(null)
  }, [])

  const needsBlobPreview =
    fileType.type === 'image' || fileType.type === 'audio' || fileType.type === 'video'

  const previewUrl = useMemo(() => {
    if (isLocalPreview) return localBlobUrl || ''
    if (mediaBlobUrl) return mediaBlobUrl
    // Blob types must not fall back to /preview URL (avoids 404 + retry loops while cache loads)
    if (needsBlobPreview) return ''
    const token = getAuthToken()
    const baseUrl = buildArtifactUrl(viewingResource.id, 'preview')
    return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl
  }, [viewingResource.id, isLocalPreview, localBlobUrl, mediaBlobUrl, needsBlobPreview])

  const downloadUrl = useMemo(() => {
    if (isLocalPreview) return localBlobUrl || ''
    const token = getAuthToken()
    const baseUrl = buildArtifactUrl(viewingResource.id, 'download')
    return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl
  }, [viewingResource.id, isLocalPreview, localBlobUrl])

  useEffect(() => {
    chatPreviewLog('open', 'preview panel mounted', {
      id: viewingResource.id,
      name: viewingResource.name,
      isLocal: isLocalPreview,
      hasInlineContent: Boolean(viewingResource.content?.trim()),
      hasLocalFile: Boolean(viewingResource.localFile),
    })
  }, [viewingResource.id, viewingResource.name, viewingResource.content, viewingResource.localFile, isLocalPreview])

  useEffect(() => {
    const file = viewingResource.localFile
    if (!file) {
      revokeLocalBlobUrl()
      return
    }
    revokeLocalBlobUrl()
    const objectUrl = URL.createObjectURL(file)
    localBlobUrlRef.current = objectUrl
    setLocalBlobUrl(objectUrl)
    setMediaImageReady(false)
    chatPreviewLog('load_local', 'created blob URL for local attachment', {
      name: file.name,
      size: file.size,
      mimeType: file.type || '(unknown)',
    })
    return () => revokeLocalBlobUrl()
  }, [viewingResource.localFile, revokeLocalBlobUrl])

  const handleMediaDisplayError = useCallback(async () => {
    const resourceId = viewingResource.id
    const resourceName = viewingResource.name
    const resourceUrl = viewingResource.url

    if (mediaResolvedRef.current?.id === resourceId && mediaResolvedRef.current.status === 'error') {
      return
    }

    const ids = previewCacheAliases(resourceId, resourceUrl)

    if (mediaDisplayRetryRef.current !== resourceId) {
      mediaDisplayRetryRef.current = resourceId
      revokeMediaObjectUrl()
      setMediaError(null)
      setMediaLoading(true)
      chatPreviewLog('load_error', 'blob URL failed to render (stale cache or revoked)', {
        resourceId,
      }, 'warn')
      try {
        const { objectUrl } = await invalidateCachedPreviewAndLoadFromServer({
          resourceId,
          name: resourceName,
          cacheIds: ids,
          kind: 'download',
          accept:
            fileType.type === 'image'
              ? 'image/*,application/octet-stream,*/*'
              : fileType.type === 'audio'
                ? 'audio/*,application/octet-stream,*/*'
                : 'video/*,application/octet-stream,*/*',
        })
        if (mediaObjectUrlRef.current) {
          URL.revokeObjectURL(mediaObjectUrlRef.current)
        }
        mediaObjectUrlRef.current = objectUrl
        setMediaBlobUrl(objectUrl)
        setMediaImageReady(false)
        mediaResolvedRef.current = { id: resourceId, status: 'ok' }
        mediaDisplayRetryRef.current = null
        setMediaLoading(false)
        return
      } catch (err: unknown) {
        chatPreviewLog(
          'load_error',
          err instanceof Error ? err.message : 'display retry failed',
          { resourceId },
          'error',
        )
      } finally {
        setMediaLoading(false)
      }
    }

    mediaResolvedRef.current = { id: resourceId, status: 'error' }
    revokeMediaObjectUrl()
    setMediaError('预览无法显示，请下载或关闭后重试')
    chatPreviewLog('load_error', 'blob URL failed to render after download retry', {
      resourceId,
    }, 'error')
  }, [
    viewingResource.id,
    viewingResource.url,
    viewingResource.name,
    fileType.type,
    revokeMediaObjectUrl,
  ])

  // Cache-first blob load for image / audio / video (server resources)
  useEffect(() => {
    if (!needsBlobPreview || isLocalPreview) {
      mediaResolvedRef.current = null
      mediaDisplayRetryRef.current = null
      revokeMediaObjectUrl()
      setMediaLoading(false)
      setMediaError(null)
      return
    }

    const resourceId = viewingResource.id
    const resourceName = viewingResource.name
    const resourceUrl = viewingResource.url
    const mediaKind = fileType.type

    if (
      mediaResolvedRef.current?.id === resourceId &&
      mediaResolvedRef.current.status === 'error'
    ) {
      setMediaError('预览无法显示，请下载或关闭后重试')
      setMediaLoading(false)
      return
    }

    let cancelled = false
    const ac = new AbortController()
    const loadToken = ++mediaLoadTokenRef.current

    if (isPreviewLoadFailed(resourceId)) {
      revokeMediaObjectUrl()
      setMediaError('预览加载失败，请关闭后重试')
      setMediaLoading(false)
      mediaResolvedRef.current = { id: resourceId, status: 'error' }
      return () => {
        cancelled = true
        ac.abort()
      }
    }

    clearPreviewLoadFailure(resourceId)
    mediaDisplayRetryRef.current = null
    setMediaError(null)
    setMediaImageReady(false)
    setMediaLoading(true)

    const ids = previewCacheAliases(resourceId, resourceUrl)

    void loadPreviewBlob({
      resourceId,
      name: resourceName,
      cacheIds: ids,
      kind: 'download',
      signal: ac.signal,
      maxAttempts: 3,
      accept:
        mediaKind === 'image'
          ? 'image/*,application/octet-stream,*/*'
          : mediaKind === 'audio'
            ? 'audio/*,application/octet-stream,*/*'
            : 'video/*,application/octet-stream,*/*',
    })
      .then(({ objectUrl }) => {
        if (cancelled) {
          URL.revokeObjectURL(objectUrl)
          return
        }
        const prev = mediaObjectUrlRef.current
        mediaObjectUrlRef.current = objectUrl
        setMediaBlobUrl(objectUrl)
        setMediaImageReady(false)
        if (prev && prev !== objectUrl) {
          URL.revokeObjectURL(prev)
        }
        mediaResolvedRef.current = { id: resourceId, status: 'ok' }
      })
      .catch((err: unknown) => {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return
        mediaResolvedRef.current = { id: resourceId, status: 'error' }
        setMediaError(err instanceof Error ? err.message : '加载失败')
      })
      .finally(() => {
        if (mediaLoadTokenRef.current !== loadToken) return
        setMediaLoading(false)
        if (mediaKind !== 'image') {
          setMediaImageReady(true)
        }
      })

    return () => {
      cancelled = true
      ac.abort()
    }
  }, [needsBlobPreview, fileType.type, isLocalPreview, viewingResource.id, viewingResource.url, viewingResource.name, revokeMediaObjectUrl])

  // If blob URL is set but <img> never fires onLoad (broken bytes / revoked URL), stop spinning.
  useEffect(() => {
    if (fileType.type !== 'image' || isLocalPreview || !mediaBlobUrl || mediaImageReady || mediaError) {
      return
    }
    const resourceId = viewingResource.id
    const timer = window.setTimeout(() => {
      if (mediaImageReady) return
      chatPreviewLog('load_timeout', 'image decode timed out after blob URL set', {
        resourceId,
        timeoutMs: IMAGE_DECODE_TIMEOUT_MS,
      }, 'warn')
      setMediaError('图片加载超时，请下载后查看')
      setMediaImageReady(true)
    }, IMAGE_DECODE_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [
    fileType.type,
    isLocalPreview,
    mediaBlobUrl,
    mediaImageReady,
    mediaError,
    viewingResource.id,
  ])

  useEffect(() => {
    return () => {
      revokeMediaObjectUrl()
    }
  }, [revokeMediaObjectUrl])

  const handleDownload = useCallback(() => {
    if (isLocalPreview && viewingResource.localFile) {
      const url = localBlobUrl || URL.createObjectURL(viewingResource.localFile)
      const a = document.createElement('a')
      a.href = url
      a.download = viewingResource.name
      a.click()
      if (!localBlobUrl) URL.revokeObjectURL(url)
      addToast('success', '下载已开始')
      return
    }
    if (!downloadUrl) {
      addToast('error', '无法下载该文件')
      return
    }
    window.open(downloadUrl, '_blank')
    addToast('success', '下载已开始')
  }, [downloadUrl, addToast, isLocalPreview, viewingResource.localFile, viewingResource.name, localBlobUrl])

  const canExportMarkdown =
    fileType.type === 'markdown' &&
    !markdownLoading &&
    !markdownError &&
    Boolean(markdownContent.trim())

  const handleExportWord = useCallback(async () => {
    const content = markdownContent.trim()
    if (!content) {
      addToast('error', '暂无内容可导出')
      return
    }
    setExportBusy('word')
    try {
      await exportMarkdownAsWord(content, viewingResource.name)
      addToast('success', 'Word 导出已开始')
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Word 导出失败')
    } finally {
      setExportBusy(null)
    }
  }, [markdownContent, viewingResource.name, addToast])

  const handleExportPdf = useCallback(async () => {
    const content = markdownContent.trim()
    if (!content) {
      addToast('error', '暂无内容可导出')
      return
    }
    setExportBusy('pdf')
    try {
      await exportMarkdownAsPdf(content, viewingResource.name)
      addToast('success', 'PDF 导出已开始')
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'PDF 导出失败')
    } finally {
      setExportBusy(null)
    }
  }, [markdownContent, viewingResource.name, addToast])

  useEffect(() => {
    if (fileType.type !== 'pdf' || isLocalPreview) {
      revokePdfObjectUrl()
      setPdfLoading(false)
      setPdfError(isLocalPreview && fileType.type === 'pdf' ? '请发送后再预览 PDF，或先下载查看' : null)
      return
    }

    const resourceId = viewingResource.id
    let cancelled = false
    const ac = new AbortController()
    let retryTimer: ReturnType<typeof setTimeout> | null = null

    if (isPreviewLoadFailed(resourceId)) {
      revokePdfObjectUrl()
      setPdfError('预览加载失败，请关闭后重试')
      setPdfLoading(false)
      return () => {
        cancelled = true
        ac.abort()
      }
    }

    let attempt = 0
    const maxAttempts = 3
    const baseDelay = 1000

    const tryLoad = async () => {
      if (cancelled || ac.signal.aborted) return
      revokePdfObjectUrl()
      setPdfError(null)
      setPdfLoading(true)

      const path = API_ENDPOINTS.projectArtifactPreview(resourceId)
      const base = API_CONFIG.baseUrl || ''
      let url = `${base}${path}`
      const token = getAuthToken()
      const headers: Record<string, string> = {
        Accept: 'application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`
        url += `${url.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
      }

      try {
        const res = await fetch(url, { headers, signal: ac.signal })
        if (!res.ok) {
          if ([401, 403, 429].includes(res.status)) {
            const t = await res.text().catch(() => '')
            throw new Error(
              res.status === 401
                ? '未授权，请重新登录'
                : res.status === 429
                  ? '请求过于频繁，请稍后再试'
                  : `请求失败 ${res.status}${t ? `：${t.slice(0, 200)}` : ''}`,
            )
          }
          if (res.status === 404 && attempt < maxAttempts - 1) {
            attempt++
            const delay = baseDelay * Math.pow(2, attempt - 1)
            if (!cancelled) {
              retryTimer = window.setTimeout(tryLoad, delay)
            }
            return
          }
          const t = await res.text().catch(() => '')
          throw new Error(`请求失败 ${res.status}${t ? `：${t.slice(0, 200)}` : ''}`)
        }
        const buf = await res.arrayBuffer()
        const u8 = new Uint8Array(buf)
        if (!isPdfMagic(u8)) {
          if (leadingJsonObject(u8)) {
            try {
              const j = JSON.parse(new TextDecoder().decode(u8)) as Record<string, unknown>
              const msg = [j.message, j.detail, j.error].find((x) => typeof x === 'string') as string | undefined
              throw new Error(msg || '服务器返回了非 PDF 数据（请重启后端以启用 PDF 预览接口）')
            } catch (e) {
              if (e instanceof Error && (e.message.includes('服务器') || e.message.includes('后端'))) throw e
              throw new Error('返回内容不是有效的 PDF')
            }
          }
          throw new Error('返回内容不是有效的 PDF')
        }
        if (cancelled) return
        const blob = new Blob([u8], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)
        if (cancelled) {
          URL.revokeObjectURL(objectUrl)
          return
        }
        pdfObjectUrlRef.current = objectUrl
        setPdfBlobUrl(objectUrl)
      } catch (err: unknown) {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return
        setPdfError(err instanceof Error ? err.message : '加载失败')
      } finally {
        if (!cancelled) setPdfLoading(false)
      }
    }

    tryLoad()
    return () => {
      cancelled = true
      ac.abort()
      if (retryTimer) clearTimeout(retryTimer)
      revokePdfObjectUrl()
    }
  }, [fileType.type, viewingResource.id, isLocalPreview])

  // Load markdown / plain text（本地 FileReader 或远端 artifact preview）
  useEffect(() => {
    if (fileType.type !== 'markdown') {
      setMarkdownContent('')
      setMarkdownError(null)
      return
    }
    if (viewingResource.content?.trim()) {
      setMarkdownContent(viewingResource.content)
      chatPreviewLog('load_done', 'using inline content', {
        chars: viewingResource.content.length,
      })
      return
    }

    const localFile = viewingResource.localFile
    if (isLocalPreview) {
      if (!localFile) {
        setMarkdownContent('')
        setMarkdownError('本地文件不可用')
        chatPreviewLog('load_error', 'local preview missing File object', {}, 'error')
        return
      }
      let cancelled = false
      setMarkdownLoading(true)
      setMarkdownError(null)
      chatPreviewLog('load_local', 'reading local file as text', { name: localFile.name })
      void localFile
        .text()
        .then((text) => {
          if (cancelled) return
          setMarkdownContent(text)
          chatPreviewLog('load_done', 'local text loaded', { chars: text.length })
        })
        .catch((err: unknown) => {
          if (cancelled) return
          const msg = err instanceof Error ? err.message : '读取本地文件失败'
          setMarkdownError(msg)
          chatPreviewLog('load_error', msg, {}, 'error')
        })
        .finally(() => {
          if (!cancelled) setMarkdownLoading(false)
        })
      return () => {
        cancelled = true
      }
    }

    const resourceId = viewingResource.id
    const resourceName = viewingResource.name
    const resourceUrl = viewingResource.url

    if (isPreviewLoadFailed(resourceId)) {
      setMarkdownContent('')
      setMarkdownError('预览加载失败，请关闭后重试')
      setMarkdownLoading(false)
      return
    }

    let cancelled = false
    const ac = new AbortController()
    let attempt = 0
    const maxAttempts = 3
    const baseDelay = 1000
    let retryTimer: ReturnType<typeof setTimeout> | null = null
    const ids = previewCacheAliases(resourceId, resourceUrl)

    const tryLoad = async () => {
      if (cancelled || ac.signal.aborted) return
      setMarkdownLoading(true)
      setMarkdownError(null)

      const cached = await getCachedPreviewAny(ids, resourceName)
      if (cached && !cancelled) {
        try {
          const text = await cached.blob.text()
          setMarkdownContent(text)
          chatPreviewLog('load_done', 'markdown loaded from cache', { chars: text.length })
          setMarkdownLoading(false)
          return
        } catch {
          // fall through to server fetch
        }
      }

      const token = getAuthToken()
      const headers: Record<string, string> = {
        Accept: 'text/markdown,text/plain,*/*',
      }
      if (token) headers.Authorization = `Bearer ${token}`

      const fetchUrl = buildArtifactUrl(resourceId, 'preview')
      const urlWithToken = token
        ? `${fetchUrl}?token=${encodeURIComponent(token)}`
        : fetchUrl

      chatPreviewLog('load_server', 'fetching artifact preview', {
        resourceId,
        attempt: attempt + 1,
      })

      try {
        const res = await fetch(urlWithToken, { headers, signal: ac.signal })
        if (!res.ok) {
          if ([401, 403, 429].includes(res.status)) {
            throw new Error(
              res.status === 429 ? '请求过于频繁，请稍后再试' : `HTTP ${res.status}`,
            )
          }
          if (res.status === 404 && attempt < maxAttempts - 1) {
            attempt++
            const delay = baseDelay * Math.pow(2, attempt - 1)
            if (!cancelled) {
              retryTimer = window.setTimeout(tryLoad, delay)
            }
            return
          }
          throw new Error(`HTTP ${res.status}`)
        }
        const text = await res.text()
        if (!cancelled) {
          setMarkdownContent(text)
          chatPreviewLog('load_done', 'server text loaded', { chars: text.length })
          const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
          await Promise.all(ids.map((id) => setCachedPreview(id, blob, 'text/plain', resourceName)))
        }
      } catch (err: unknown) {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return
        const msg = err instanceof Error ? err.message : '加载失败'
        setMarkdownError(msg)
        chatPreviewLog('load_error', msg, { resourceId }, 'error')
      } finally {
        if (!cancelled) setMarkdownLoading(false)
      }
    }

    tryLoad()
    return () => {
      cancelled = true
      ac.abort()
      if (retryTimer) clearTimeout(retryTimer)
    }
  }, [
    fileType.type,
    viewingResource.content,
    viewingResource.localFile,
    viewingResource.id,
    viewingResource.url,
    viewingResource.name,
    isLocalPreview,
  ])

  const renderPreview = () => {
    switch (fileType.type) {
      case 'html':
        return (
          <iframe
            title={viewingResource.name}
            className="w-full h-full min-h-0 border-0 bg-white"
            src={previewUrl}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )

      case 'markdown':
        if (markdownLoading) {
          return (
            <div className="min-h-0 flex items-center justify-center bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                <span>正在加载 Markdown...</span>
              </div>
            </div>
          )
        }
        if (markdownError) {
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-3 bg-white p-4">
              <p className="text-sm text-gray-500">加载失败: {markdownError}</p>
              <button
                onClick={handleDownload}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
              >
                下载文件
              </button>
            </div>
          )
        }
        return (
          <div className="min-h-0 overflow-y-auto p-4 bg-white">
            <MarkdownRenderer
              content={
                markdownContent.trim()
                  ? markdownContent
                  : '无内容'
              }
            />
          </div>
        )

      case 'image': {
        const imageBusy =
          mediaLoading || Boolean(previewUrl && !mediaImageReady && !mediaError)
        if (mediaError && !previewUrl) {
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-3 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">加载失败: {mediaError}</p>
              <button
                onClick={handleDownload}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
              >
                下载文件
              </button>
            </div>
          )
        }
        if (!previewUrl) {
          if (imageBusy) {
            return (
              <div className="min-h-0 flex items-center justify-center bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                  <span>正在加载图片...</span>
                </div>
              </div>
            )
          }
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-3 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                {mediaError || '无法生成预览'}
              </p>
              <button
                onClick={handleDownload}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
              >
                下载文件
              </button>
            </div>
          )
        }
        return (
          <div className="relative min-h-0 flex items-center justify-center bg-gray-50 p-4 overflow-auto">
            {imageBusy && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/80">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                  <span>正在加载图片...</span>
                </div>
              </div>
            )}
            {mediaError && (
              <div className="absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-md bg-white/95 px-3 py-1.5 text-xs text-gray-600 shadow">
                {mediaError}
              </div>
            )}
            <img
              src={previewUrl}
              alt={viewingResource.name}
              className={cn(
                'max-w-full max-h-full object-contain shadow-lg rounded-lg transition-opacity',
                mediaImageReady ? 'opacity-100' : 'opacity-0',
              )}
              ref={(el) => {
                if (el?.complete && el.naturalWidth > 0) {
                  setMediaImageReady(true)
                  setMediaError(null)
                }
              }}
              onLoad={() => {
                setMediaImageReady(true)
                setMediaError(null)
              }}
              onError={() => {
                void handleMediaDisplayError()
              }}
            />
          </div>
        )
      }

      case 'audio':
        if (mediaLoading) {
          return (
            <div className="min-h-0 flex items-center justify-center bg-white p-4 text-sm text-gray-500">
              正在加载音频...
            </div>
          )
        }
        if (mediaError || !previewUrl) {
          if (!mediaError && !previewUrl) {
            return (
              <div className="min-h-0 flex items-center justify-center bg-white p-4 text-sm text-gray-500">
                正在加载音频...
              </div>
            )
          }
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-3 bg-white p-4">
              <p className="text-sm text-gray-500">{mediaError || '无法生成预览'}</p>
              <button
                onClick={handleDownload}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
              >
                下载文件
              </button>
            </div>
          )
        }
        return (
          <div className="min-h-0 flex flex-col items-center justify-center gap-4 bg-white p-4">
            <div className="p-4 bg-indigo-50 rounded-full">
              <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <audio
              controls
              src={previewUrl}
              className="w-full max-w-md"
              onError={() => {
                void handleMediaDisplayError()
              }}
            />
            <p className="text-xs text-gray-400">{viewingResource.name}</p>
          </div>
        )

      case 'video':
        if (mediaLoading) {
          return (
            <div className="min-h-0 flex items-center justify-center bg-black p-4 text-sm text-gray-400">
              正在加载视频...
            </div>
          )
        }
        if (mediaError || !previewUrl) {
          if (!mediaError && !previewUrl) {
            return (
              <div className="min-h-0 flex items-center justify-center bg-black p-4 text-sm text-gray-400">
                正在加载视频...
              </div>
            )
          }
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-3 bg-black p-4">
              <p className="text-sm text-gray-300">{mediaError || '无法生成预览'}</p>
              <button
                onClick={handleDownload}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-600 text-gray-200 hover:border-gray-400"
              >
                下载文件
              </button>
            </div>
          )
        }
        return (
          <div className="min-h-0 flex items-center justify-center bg-black p-4">
            <video
              controls
              src={previewUrl}
              className="max-w-full max-h-full rounded-lg"
              onError={() => {
                void handleMediaDisplayError()
              }}
            />
          </div>
        )

      case 'pdf':
        if (pdfLoading) {
          return (
            <div className="min-h-0 flex items-center justify-center bg-white">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                <span>正在加载 PDF…</span>
              </div>
            </div>
          )
        }
        if (pdfError) {
          return (
            <div className="min-h-0 flex flex-col items-center justify-center gap-4 bg-white p-4">
              <div className="p-6 bg-red-50 rounded-2xl">
                <FileX className="w-16 h-16 text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">{viewingResource.name}</p>
                <p className="text-sm text-gray-500 mt-2">PDF 加载失败</p>
                {pdfError && <p className="text-xs text-gray-400 mt-1 max-w-md break-words">{pdfError}</p>}
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <Download size={16} />
                下载文件
              </button>
            </div>
          )
        }
        if (!pdfBlobUrl) {
          return (
            <div className="min-h-0 flex items-center justify-center text-sm text-gray-400 bg-white">
              无法生成预览
            </div>
          )
        }
        return (
          <iframe
            title={viewingResource.name}
            src={pdfBlobUrl}
            className="w-full h-full min-h-0 border-0 bg-gray-100"
          />
        )

      case 'ppt':
        return (
          <div className="min-h-0 flex flex-col items-center justify-center gap-4 bg-white p-4">
            <div className="p-6 bg-amber-50 rounded-2xl">
              <svg className="w-16 h-16 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">{viewingResource.name}</p>
              <p className="text-sm text-gray-500 mt-2">该文件类型不支持预览，请下载后查看</p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Download size={16} />
              下载文件
            </button>
          </div>
        )

      case 'unsupported':
      default:
        return (
          <div className="min-h-0 flex flex-col items-center justify-center gap-4 bg-white p-4">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <FileX className="w-16 h-16 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">{viewingResource.name}</p>
              <p className="text-sm text-gray-500 mt-2">该文件类型暂不支持预览</p>
              {fileType.ext && (
                <p className="text-xs text-gray-400 mt-1">扩展名: .{fileType.ext}</p>
              )}
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Download size={16} />
              下载文件
            </button>
          </div>
        )
    }
  }

const showNewTabButton = fileType.type === 'html'

  // 弹窗模式尺寸（适中）
  const POPUP_WIDTH = 720
  const POPUP_HEIGHT = 540

  return (
    <>
      {/* 弹窗模式/全屏模式背景蒙板 */}
      {(isPreviewExpanded || isPopupMode) && (
        <div className="fixed inset-0 bg-black/30 z-[80]" onClick={onClose} />
      )}
      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col',
          isPreviewExpanded
            ? 'fixed inset-0 z-[90]'
            : isPopupMode
              ? 'fixed z-[90] rounded-2xl shadow-2xl border border-gray-200 bg-white'
              : 'absolute inset-0 z-30'
        )}
        style={isPopupMode && !isPreviewExpanded ? {
          width: POPUP_WIDTH,
          height: POPUP_HEIGHT,
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        } : undefined}
      >
        {/* 标题栏 */}
        <div
          className={cn(
            'flex items-center justify-between border-b border-gray-100 px-3 py-2',
            isPopupMode && !isPreviewExpanded && 'cursor-move select-none'
          )}
          onMouseDown={isPopupMode && !isPreviewExpanded ? handleMouseDown : undefined}
        >
          <div className="flex items-center gap-2">
            {isPopupMode && !isPreviewExpanded && (
              <Move size={14} className="text-gray-400" />
            )}
            <span className="text-sm font-semibold text-gray-800 truncate">{viewingResource.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {isPopupMode && (
              <button
                onClick={onToggleExpand}
                className="text-xs p-1.5 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300"
                title={isPreviewExpanded ? '退出全屏' : '全屏查看'}
              >
                {isPreviewExpanded ? <Minimize2 size={14} /> : <Maximize size={14} />}
              </button>
            )}
            {showNewTabButton && (
              <button
                onClick={() => window.open(previewUrl, '_blank', 'noopener,noreferrer')}
                className="text-xs px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300"
                title="在新标签页预览"
              >
                新标签预览
              </button>
            )}
            {canExportMarkdown && (
              <>
                <button
                  onClick={handleExportWord}
                  disabled={exportBusy !== null}
                  className="text-xs px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  title="导出 Word"
                >
                  {exportBusy === 'word' ? '导出中…' : '导出 Word'}
                </button>
                <button
                  onClick={handleExportPdf}
                  disabled={exportBusy !== null}
                  className="text-xs px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  title="导出 PDF"
                >
                  {exportBusy === 'pdf' ? '导出中…' : '导出 PDF'}
                </button>
              </>
            )}
            <button
              onClick={handleDownload}
              className="text-xs px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300"
              title="下载文件"
            >
              下载
            </button>
            {!isPopupMode && (
              <button
                onClick={onToggleExpand}
                className="text-xs p-1.5 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300"
                title={isPreviewExpanded ? '缩回' : '放大预览'}
              >
                {isPreviewExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs p-1.5 rounded-md border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300"
              title="关闭预览"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 预览内容区 */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {renderPreview()}
        </div>
      </div>
    </>
  )
}
