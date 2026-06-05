import { X, Loader2 } from 'lucide-react'
import { useState, useCallback, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2 } from 'lucide-react'

interface ResolveMarketPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResolved?: (market: any) => void
  children?: ReactNode
  trigger?: ReactNode
}

export function ResolveMarketPopup({
  open,
  onOpenChange,
  onResolved,
  children,
  trigger,
}: ResolveMarketPopupProps) {
  const [url, setUrl] = useState('')
  const [resolving, setResolving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [fetchMethod, setFetchMethod] = useState<'direct' | 'proxy' | 'plugin' | null>(null)
  const [forcePlugin, setForcePlugin] = useState(false)

  const handleResolve = useCallback(async () => {
    const trimmed = url.trim()
    if (!trimmed) return
    setResolving(true)
    setError(null)
    setResult(null)
    setFetchMethod(null)

    // 强制使用插件模式
    if (forcePlugin) {
      try {
        const { fetchEventViaPlugin } = await import('@/lib/polymarketApi')
        const resolved = await fetchEventViaPlugin(trimmed)
        setResult(resolved)
        setFetchMethod('plugin')
        onResolved?.(resolved)
      } catch (pluginErr: any) {
        setError(pluginErr instanceof Error ? pluginErr.message : '插件获取失败')
      } finally {
        setResolving(false)
      }
      return
    }

    // Try 1: Direct client-side Gamma API
    try {
      const { resolveMarketFromUrl } = await import('@/lib/polymarketApi')
      const resolved = await resolveMarketFromUrl(trimmed, { useProxy: false })
      setResult(resolved)
      setFetchMethod('direct')
      onResolved?.(resolved)
      setResolving(false)
      return
    } catch (e: any) {
      console.warn('[Resolve] Direct failed:', e.message)
    }

    // Try 2: Backend proxy
    try {
      const { resolveMarketFromUrl } = await import('@/lib/polymarketApi')
      const resolved = await resolveMarketFromUrl(trimmed, { useProxy: true })
      setResult(resolved)
      setFetchMethod('proxy')
      onResolved?.(resolved)
      setResolving(false)
      return
    } catch (proxyErr: any) {
      console.warn('[Resolve] Proxy failed:', proxyErr.message)
    }

    // Try 3: Browser plugin
    try {
      const { fetchEventViaPlugin } = await import('@/lib/polymarketApi')
      const resolved = await fetchEventViaPlugin(trimmed)
      setResult(resolved)
      setFetchMethod('plugin')
      onResolved?.(resolved)
      setResolving(false)
      return
    } catch (pluginErr: any) {
      console.warn('[Resolve] Plugin failed:', pluginErr.message)
    }

    // All failed
    setError('解析失败，请检查链接或 slug')
    setResolving(false)
  }, [url, onResolved])

  const handleClose = useCallback(() => {
    setUrl('')
    setError(null)
    setResult(null)
    onOpenChange(false)
  }, [onOpenChange])

  const handleSave = useCallback(async () => {
    if (!result) return
    const m = result.market
    try {
      const { savePolymarketEvent } = await import('@/lib/polymarketApi')
      const row = await savePolymarketEvent({
        eventSlug: result.eventSlug,
        eventId: result.eventId,
        conditionId: m.conditionId,
        marketSlug: m.marketSlug,
        title: result.title,
        imageUrl: result.imageUrl,
        clobTokenIds: m.clobTokenIds,
        yesPct: m.yesPct,
        noPct: m.noPct,
        volume: m.volume,
        rules: result.rules ?? '',
        background: result.background ?? '',
      })
      handleClose()
      return row
    } catch (e: any) {
      setError(e instanceof Error ? e.message : '保存失败')
    }
  }, [result, handleClose])

  return (
    <>
      {trigger && (
        <span onClick={() => onOpenChange(true)} className="cursor-pointer">
          {trigger}
        </span>
      )}

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950"
              role="dialog"
              aria-modal="true"
              aria-label="Resolve Polymarket Market"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  解析 Polymarket 市场
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="关闭"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-5">
                {/* URL Input */}
                {!result && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                        placeholder="粘贴 polymarket.com/event/... 链接或事件 slug"
                        disabled={resolving}
                        className="flex-1"
                      />
                      <div className="flex gap-2 items-center">
                        <Button
                          onClick={handleResolve}
                          disabled={resolving || !url.trim()}
                          className="shrink-0"
                        >
                          {resolving ? (
                            <>
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                              {forcePlugin ? '插件解析中…' : '解析中…'}
                            </>
                          ) : (
                            '解析'
                          )}
                        </Button>
                        {fetchMethod && (
                          <span className="flex items-center gap-1 text-[11px] text-blue-600">
                            <CheckCircle2 size={12} />
                            {fetchMethod === 'direct' && '直连'}
                            {fetchMethod === 'proxy' && '后端代理'}
                            {fetchMethod === 'plugin' && '浏览器插件'}
                          </span>
                        )}
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-[12px] text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forcePlugin}
                        onChange={(e) => setForcePlugin(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span>强制使用浏览器插件</span>
                    </label>
                    <p className="text-[11px] text-slate-400">
                      支持格式：polymarket.com 事件链接、事件 slug（如 "will-bitcoin-hit-100k"）
                    </p>
                    {error && (
                      <p className="text-[12px] text-rose-600">{error}</p>
                    )}
                  </div>
                )}

                {/* Resolved Result */}
                {result && (
                  <div className="space-y-4">
                    {/* Header with image */}
                    <div className="flex gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                        {result.imageUrl ? (
                          <img
                            src={result.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[14px] font-semibold leading-snug text-slate-900 dark:text-slate-50">
                          {result.title}
                        </h4>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Slug: {result.eventSlug}
                        </p>
                      </div>
                    </div>

                    {/* Market stats */}
                    <div className="grid grid-cols-2 gap-2 text-[12px]">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="text-slate-500">Yes</div>
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {result.market.yesPct.toFixed(1)}%
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="text-slate-500">No</div>
                        <div className="text-lg font-bold text-rose-600 dark:text-rose-400">
                          {result.market.noPct.toFixed(1)}%
                        </div>
                      </div>
                      <div className="col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="text-slate-500">成交量</div>
                        <div className="font-semibold text-slate-900 dark:text-slate-200">
                          {formatVolume(result.market.volume)}
                        </div>
                      </div>
                    </div>

                    {/* Question / rules */}
                    {result.rules && (
                      <p className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-500">
                        {result.rules}
                      </p>
                    )}

                    {children}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50/95 px-5 py-3 dark:border-slate-800 dark:bg-slate-950/95">
                <Button
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700"
                  onClick={handleClose}
                >
                  关闭
                </Button>
                {result && (
                  <Button onClick={handleSave}>
                    保存到后端
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function formatVolume(volume: number | undefined | null): string {
  if (volume == null || !Number.isFinite(volume)) return '—'
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}