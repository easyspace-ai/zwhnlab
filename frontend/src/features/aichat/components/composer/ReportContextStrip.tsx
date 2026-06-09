import { FileText, LayoutTemplate, Link2, X } from 'lucide-react'
import { cn } from '@/osint/utils'

export type ReportContextStripProps = {
  title: string
  previewKind: 'html' | 'markdown'
  enabled: boolean
  disabled?: boolean
  onDismiss: () => void
  onEnable: () => void
}

export function ReportContextStrip({
  title,
  previewKind,
  enabled,
  disabled,
  onDismiss,
  onEnable,
}: ReportContextStripProps) {
  const kindLabel = previewKind === 'markdown' ? 'Markdown' : 'HTML 预览'
  const KindIcon = previewKind === 'markdown' ? FileText : LayoutTemplate

  if (!enabled) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900/50">
        <span className="text-slate-500 dark:text-slate-400">纯对话模式，不附带报告上下文</span>
        <button
          type="button"
          disabled={disabled}
          onClick={onEnable}
          className={cn(
            'inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 font-medium text-slate-700',
            'hover:bg-white disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800',
          )}
        >
          <Link2 size={12} />
          绑定「{title}」
        </button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-lg border border-sky-200/80 bg-sky-50/60 px-3 py-2',
        'dark:border-sky-500/25 dark:bg-sky-950/30',
      )}
    >
      <KindIcon size={14} className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-sky-900 dark:text-sky-100">基于当前预览追问</p>
        <p className="truncate text-xs text-sky-800/80 dark:text-sky-200/80">
          {title}
          <span className="text-sky-600/70 dark:text-sky-400/70"> · {kindLabel}</span>
        </p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onDismiss}
        aria-label="关闭报告上下文"
        className={cn(
          'shrink-0 rounded p-1 text-sky-700/70 hover:bg-sky-100/80 hover:text-sky-900',
          'disabled:opacity-40 dark:text-sky-300/70 dark:hover:bg-sky-900/50 dark:hover:text-sky-100',
        )}
      >
        <X size={14} />
      </button>
    </div>
  )
}
