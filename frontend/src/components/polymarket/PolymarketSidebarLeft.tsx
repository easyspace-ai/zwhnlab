import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { SavedPolymarketEvent } from '@/lib/polymarketApi'
import { cn } from '@/lib/utils'

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}

function formatTime(ts: number): string {
  if (!ts) return '--:--:--'
  return new Date(ts * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export type PolymarketSidebarLeftProps = {
  searchDraft: string
  onSearchDraftChange: (v: string) => void
  onSearchClick: () => void
  onResolveClick: () => void
  searching: boolean
  saved: SavedPolymarketEvent[]
  selectedConditionId: string | null
  onSelect: (e: SavedPolymarketEvent) => void
  onRemove: (e: SavedPolymarketEvent) => void
}

export function PolymarketSidebarLeft({
  searchDraft,
  onSearchDraftChange,
  onSearchClick,
  onResolveClick,
  searching,
  saved,
  selectedConditionId,
  onSelect,
  onRemove,
}: PolymarketSidebarLeftProps) {
  const lastUpdated = saved.reduce((m, e) => Math.max(m, e.updatedAt || 0), 0)

  return (
    <div className="flex h-full min-h-0 flex-col border-r border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="shrink-0 border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="mb-3">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Polymarket</h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            已保存事件
          </p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchDraft}
            onChange={(e) => onSearchDraftChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
            placeholder="粘贴 polymarket.com 链接或事件 slug…"
            className="h-10 border-slate-200 bg-slate-50 pl-9 text-[13px] text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
<Button
           type="button"
           className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600"
           disabled={searching || !searchDraft.trim()}
           onClick={onSearchClick}
         >
           {searching ? '解析中…' : '搜索'}
         </Button>
         <Button
           type="button"
           variant="outline"
           className="mt-1 w-full"
           onClick={onResolveClick}
         >
           解析市场（粘贴链接）
         </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-2 p-3 pb-2">
          {saved.length === 0 && (
            <p className="px-1 py-8 text-center text-[12px] text-slate-500">
              尚无保存的事件。输入链接或 slug 后点搜索，在弹窗中确认保存。
            </p>
          )}
{saved.map((ev, index) => {
             const conditionId = ev.conditionId ?? (ev as any).ConditionID ?? ''
             const active = conditionId === selectedConditionId
             const key = conditionId || ev.id || String(index)
             const yes = ev.yesPct ?? (ev as any).YesPct ?? 0
             const volume = ev.volume ?? (ev as any).Volume ?? 0
             const imageUrl = ev.imageUrl ?? (ev as any).ImageURL ?? ''
             const badgeClass =
               yes >= 55
                 ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:ring-emerald-800/60'
                 : yes <= 35
                   ? 'bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:ring-rose-800/60'
                   : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/90 dark:text-slate-200 dark:ring-slate-600/50'
             return (
               <div
                 key={key}
                 className={cn(
                  'group relative flex gap-3 rounded-xl border p-3 transition-colors',
                  active
                    ? 'border-blue-300 bg-blue-50/80 shadow-sm dark:border-blue-800 dark:bg-blue-950/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700',
                )}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 gap-3 text-left"
                  onClick={() => onSelect(ev)}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                    {imageUrl ? (
                      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-slate-900 dark:text-slate-50">
                      {ev.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', badgeClass)}>
                        Yes {yes.toFixed(1)}%
                      </span>
                      <span>{formatVolume(volume)} vol</span>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  title="移除"
                  className="self-start rounded-lg p-1.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-rose-600 group-hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(ev)
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="shrink-0 space-y-1 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-center text-[11px] text-slate-500">更新于 {formatTime(lastUpdated)}</p>
        <p className="text-center text-[10px] text-slate-400">数据来源：Polymarket Gamma / CLOB</p>
      </div>
    </div>
  )
}
