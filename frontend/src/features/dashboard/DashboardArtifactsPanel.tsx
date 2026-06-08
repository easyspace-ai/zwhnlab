import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { Download, FileText, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getOsintAccessToken } from '@/osint/auth'
import { API_ENDPOINTS } from '@/osint/config/api'
import ArtifactPreviewPanel from '@/osint/components/ArtifactPreviewPanel'
import { ToastProvider } from '@/osint/components/ui/Feedback'
import type { DashboardArtifact } from '@/lib/dashboardApi'
import { cn } from '@/lib/utils'

function formatTime(iso: string): string {
  try {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    return d.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

interface DashboardArtifactsPanelProps {
  artifacts: DashboardArtifact[]
  loading: boolean
  error: string | null
  sessionConfigured: boolean
  sessionId: string
  onRefresh: () => void
  refreshing?: boolean
}

export function DashboardArtifactsPanel({
  artifacts,
  loading,
  error,
  sessionConfigured,
  sessionId,
  onRefresh,
  refreshing,
}: DashboardArtifactsPanelProps) {
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [previewExpanded, setPreviewExpanded] = useState(false)

  const viewing = artifacts.find((a) => a.id === previewId)

  const openPreview = useCallback((item: DashboardArtifact) => {
    setPreviewId(item.id)
    setPreviewExpanded(false)
  }, [])

  const closePreview = useCallback(() => {
    setPreviewId(null)
    setPreviewExpanded(false)
  }, [])

  const handleDownload = useCallback((id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const token = getOsintAccessToken()
    const url = new URL(API_ENDPOINTS.projectArtifactDownload(id), window.location.origin)
    if (token) url.searchParams.set('token', token)
    const a = document.createElement('a')
    a.href = url.toString()
    a.download = name || 'download'
    a.rel = 'noopener'
    a.click()
  }, [])

  const previewPortal =
    viewing &&
    typeof document !== 'undefined' &&
    createPortal(
      <ToastProvider>
        <ArtifactPreviewPanel
          viewingResource={{
            id: viewing.id,
            name: viewing.name,
            type: viewing.type,
            content: viewing.content ?? undefined,
            url: viewing.url ?? undefined,
          }}
          sessionId={sessionId || 'dashboard'}
          isPreviewExpanded={previewExpanded}
          onClose={closePreview}
          onToggleExpand={() => setPreviewExpanded((v) => !v)}
          isPopupMode
        />
      </ToastProvider>,
      document.body,
    )

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white dark:bg-slate-950">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-3 py-2 dark:border-slate-800">
        <div>
          <h3 className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">聚合产物</h3>
          <p className="text-[10px] text-slate-400">
            会话 {sessionId || '—'} · 修改 DASHBOARD_SESSION_ID 后需重启服务并点刷新
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing || loading || !sessionConfigured}
          className="h-7 w-7 p-0"
          title="从 W6 拉取最新产物"
        >
          {refreshing || loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {!sessionConfigured ? (
          <div className="p-4 text-center text-[12px] text-slate-500">
            未配置聚合会话（DASHBOARD_SESSION_ID）
          </div>
        ) : loading && artifacts.length === 0 ? (
          <div className="flex h-24 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-[12px] text-red-500">{error}</div>
        ) : artifacts.length === 0 ? (
          <div className="p-4 text-center text-[12px] text-slate-500">
            聚合推送完成后，AI 生成的报告/文件将显示在此；可点击右上角刷新拉取远程历史
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {artifacts.map((item) => (
              <li
                key={item.id}
                role="button"
                tabIndex={0}
                className={cn(
                  'flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900',
                  previewId === item.id && 'bg-slate-50 dark:bg-slate-900',
                )}
                onClick={() => openPreview(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openPreview(item)
                  }
                }}
              >
                <FileText className="h-4 w-4 shrink-0 text-blue-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-slate-800 dark:text-slate-200">
                    {item.name || item.id}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {item.type} · {formatTime(item.created_at)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 shrink-0 p-0"
                  title="下载"
                  onClick={(e) => handleDownload(item.id, item.name, e)}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>

      {previewPortal}
    </div>
  )
}
