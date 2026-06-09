import { useState, useEffect, useRef, useCallback } from 'react'
import { RefreshCw, ExternalLink, X, FileText, Download, FileCode, ChevronDown } from 'lucide-react'
import { cn } from '@/osint/utils'
import { MarkdownRenderer } from '@/osint/components/MarkdownRenderer'
import { useToast } from '@/osint/components/ui/Feedback'
import { getOsintAccessToken } from '@/osint/auth'
import {
  downloadMarkdown,
  exportMarkdownAsPdf,
  exportMarkdownAsWord,
} from '@/osint/lib/exportMarkdown'
import { resolveArtifactDownloadUrl, resolveReportPreviewUrl } from '../lib/osintDashboardApi'
import { formatReportSelectLabel } from '../lib/reportTitleDisplay'
import type { DashboardReportItem } from '../types'

type ReportCanvasPanelProps = {
  reports: DashboardReportItem[]
  activeReportId: string | null
  onActiveChange: (id: string) => void
  onReportClose: (id: string) => void
}

/** In-memory cache so timeline/SSE re-renders do not re-fetch the same artifact. */
const markdownPreviewCache = new Map<string, string>()

function useMarkdownContent(report: DashboardReportItem | undefined) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kind = report?.kind
  const resourceId = report?.resourceId?.trim() || ''
  const inlineMarkdown = report?.markdown?.trim() || ''
  const previewUrl = report?.url || ''

  useEffect(() => {
    if (kind !== 'markdown') {
      setContent('')
      setError(null)
      setLoading(false)
      return
    }

    if (inlineMarkdown) {
      setContent(inlineMarkdown)
      setError(null)
      setLoading(false)
      return
    }

    if (!resourceId) {
      setContent('')
      setError('暂无 Markdown 内容')
      setLoading(false)
      return
    }

    const cached = markdownPreviewCache.get(resourceId)
    if (cached !== undefined) {
      setContent(cached)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    const ac = new AbortController()
    setLoading(true)
    setError(null)

    const token = getOsintAccessToken()
    const headers: Record<string, string> = {
      Accept: 'text/markdown,text/plain,*/*',
    }
    if (token) headers.Authorization = `Bearer ${token}`

    const fetchUrl = previewUrl || resolveReportPreviewUrl(resourceId)
    const urlWithToken = token
      ? `${fetchUrl}${fetchUrl.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
      : fetchUrl

    void fetch(urlWithToken, { headers, signal: ac.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        if (cancelled) return
        markdownPreviewCache.set(resourceId, text)
        setContent(text)
      })
      .catch((err: unknown) => {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return
        setError(err instanceof Error ? err.message : '加载失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      ac.abort()
    }
  }, [kind, resourceId, inlineMarkdown, previewUrl])

  return { content, loading, error }
}

export function ReportCanvasPanel({
  reports,
  activeReportId,
  onActiveChange,
  onReportClose,
}: ReportCanvasPanelProps) {
  const { addToast } = useToast()
  const [refreshKey, setRefreshKey] = useState(0)
  const [exportBusy, setExportBusy] = useState<'word' | 'pdf' | null>(null)
  const prevReportsLen = useRef(reports.length)

  useEffect(() => {
    if (reports.length === 0) return
    if (activeReportId && reports.some((r) => r.id === activeReportId)) return
    const htmlReports = reports.filter((r) => r.kind === 'html')
    const fallback = htmlReports.length > 0 ? htmlReports[htmlReports.length - 1] : reports[reports.length - 1]
    onActiveChange(fallback.id)
  }, [reports, activeReportId, onActiveChange])

  useEffect(() => {
    if (activeReportId && reports.length > prevReportsLen.current) {
      const newest = reports[reports.length - 1]
      if (newest.kind === 'html') {
        onActiveChange(newest.id)
      }
    }
    prevReportsLen.current = reports.length
  }, [activeReportId, reports, onActiveChange])

  const activeReport = reports.find((r) => r.id === activeReportId)
  const { content: markdownContent, loading: markdownLoading, error: markdownError } =
    useMarkdownContent(activeReport)

  const canExportMarkdown =
    activeReport?.kind === 'markdown' &&
    !markdownLoading &&
    !markdownError &&
    Boolean(markdownContent.trim())

  const handleDownloadHtml = useCallback(() => {
    const resourceId = activeReport?.resourceId?.trim()
    if (!resourceId) {
      addToast('error', '无法下载该报告')
      return
    }
    window.open(resolveArtifactDownloadUrl(resourceId), '_blank')
    addToast('success', '下载已开始')
  }, [activeReport?.resourceId, addToast])

  const handleDownloadMarkdown = useCallback(() => {
    const content = markdownContent.trim()
    if (!content) {
      addToast('error', '暂无内容可下载')
      return
    }
    downloadMarkdown(content, activeReport?.title || '报告')
    addToast('success', 'Markdown 下载已开始')
  }, [markdownContent, activeReport?.title, addToast])

  const handleExportWord = useCallback(async () => {
    const content = markdownContent.trim()
    if (!content) {
      addToast('error', '暂无内容可导出')
      return
    }
    setExportBusy('word')
    try {
      await exportMarkdownAsWord(content, activeReport?.title || '报告')
      addToast('success', 'Word 导出已开始')
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Word 导出失败')
    } finally {
      setExportBusy(null)
    }
  }, [markdownContent, activeReport?.title, addToast])

  const handleExportPdf = useCallback(async () => {
    const content = markdownContent.trim()
    if (!content) {
      addToast('error', '暂无内容可导出')
      return
    }
    setExportBusy('pdf')
    try {
      await exportMarkdownAsPdf(content, activeReport?.title || '报告')
      addToast('success', 'PDF 导出已开始')
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'PDF 导出失败')
    } finally {
      setExportBusy(null)
    }
  }, [markdownContent, activeReport?.title, addToast])

  const handleReportClose = (id: string) => {
    const idx = reports.findIndex((r) => r.id === id)
    const remaining = reports.filter((r) => r.id !== id)
    if (activeReportId === id && remaining.length > 0) {
      const newIdx = Math.min(idx, remaining.length - 1)
      onActiveChange(remaining[newIdx].id)
    }
    onReportClose(id)
  }

  if (reports.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#f7f8fa] text-slate-500 dark:bg-slate-950">
        <FileText size={40} className="mb-3 opacity-30" />
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">报告预览</div>
        <div className="mt-1 max-w-xs text-center text-xs text-slate-400">
          完成 W6 研究任务后，HTML 与 Markdown 报告将在此实时预览
        </div>
      </div>
    )
  }

  const isMarkdown = activeReport?.kind === 'markdown'
  const isHtml = activeReport?.kind === 'html' || !activeReport?.kind

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-slate-900">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/90 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {activeReport ? (
            isMarkdown ? (
              <FileCode size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <FileText size={14} className="shrink-0 text-slate-500 dark:text-slate-400" />
            )
          ) : null}
          <div className="relative min-w-0 flex-1">
            <select
              value={activeReportId ?? ''}
              onChange={(e) => onActiveChange(e.target.value)}
              aria-label="选择报告"
              title={
                activeReport
                  ? formatReportSelectLabel(
                      activeReport,
                      reports.findIndex((r) => r.id === activeReport.id),
                      reports,
                    )
                  : undefined
              }
              className={cn(
                'h-8 w-full min-w-0 appearance-none truncate rounded-lg border border-slate-200 bg-white py-0 pl-2.5 pr-8 text-xs font-medium text-slate-800 outline-none transition-colors',
                'hover:border-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-300/50',
                'dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-blue-500',
              )}
            >
              {reports.map((report, idx) => (
                <option key={report.id} value={report.id} title={formatReportSelectLabel(report, idx, reports)}>
                  {formatReportSelectLabel(report, idx, reports)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden
            />
          </div>
          {reports.length > 1 ? (
            <span className="shrink-0 text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
              {reports.findIndex((r) => r.id === activeReportId) + 1}/{reports.length}
            </span>
          ) : null}
          {activeReport ? (
            <button
              type="button"
              onClick={() => handleReportClose(activeReport.id)}
              className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              title="关闭当前报告"
              aria-label="关闭当前报告"
            >
              <X size={13} />
            </button>
          ) : null}
        </div>
        {activeReport ? (
          <div className="flex shrink-0 items-center gap-1 border-l border-slate-200/90 pl-2 dark:border-slate-800">
            {isMarkdown && canExportMarkdown ? (
              <>
                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  disabled={exportBusy !== null}
                  className="rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  title="下载 Markdown"
                >
                  下载 MD
                </button>
                <button
                  type="button"
                  onClick={handleExportWord}
                  disabled={exportBusy !== null}
                  className="rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  title="导出 Word"
                >
                  {exportBusy === 'word' ? '导出中…' : '导出 Word'}
                </button>
                <button
                  type="button"
                  onClick={handleExportPdf}
                  disabled={exportBusy !== null}
                  className="rounded px-2 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  title="导出 PDF"
                >
                  {exportBusy === 'pdf' ? '导出中…' : '导出 PDF'}
                </button>
              </>
            ) : null}
            {isHtml ? (
              <>
                <button
                  type="button"
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800"
                  title="刷新"
                >
                  <RefreshCw size={13} />
                </button>
                <a
                  href={activeReport.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800"
                  title="新窗口打开"
                >
                  <ExternalLink size={13} />
                </a>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800"
                  title="下载 HTML"
                >
                  <Download size={13} />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
        {activeReport ? (
          isMarkdown ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {markdownLoading ? (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                  正在加载 Markdown…
                </div>
              ) : markdownError ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-slate-500">
                  <p>加载失败: {markdownError}</p>
                </div>
              ) : (
                <MarkdownRenderer content={markdownContent.trim() || '无内容'} />
              )}
            </div>
          ) : (
            <iframe
              key={`${activeReport.id}-${refreshKey}`}
              src={activeReport.url}
              className="min-h-0 w-full flex-1 border-0"
              title={activeReport.title}
              sandbox="allow-scripts allow-same-origin"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <div className="text-center text-sm">请从下拉菜单选择报告</div>
          </div>
        )}
      </div>
    </div>
  )
}
