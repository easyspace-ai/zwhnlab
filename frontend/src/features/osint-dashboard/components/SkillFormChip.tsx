import type { ReactNode } from 'react'
import type { FormMessageStatus } from '../types'

type SkillFormChipProps = {
  title: string
  status: FormMessageStatus
  submittedSummary?: string
  children?: ReactNode
}

const STATUS_LABEL: Record<FormMessageStatus, string> = {
  pending: '参数配置 · 待填写',
  submitted: '参数配置 · 已提交',
  cancelled: '参数配置 · 已取消',
}

export function SkillFormChip({
  title,
  status,
  submittedSummary,
  children,
}: SkillFormChipProps) {
  const borderTone =
    status === 'pending'
      ? 'border-amber-300/70 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-950/25'
      : status === 'submitted'
        ? 'border-emerald-300/60 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20'
        : 'border-slate-300/50 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/30'

  const dotTone =
    status === 'pending'
      ? 'bg-amber-500'
      : status === 'submitted'
        ? 'bg-emerald-500'
        : 'bg-slate-400'

  return (
    <div className={`max-w-[92%] rounded-lg border ${borderTone}`}>
      <div className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`h-2 w-2 shrink-0 rounded-full ${dotTone}`} />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {STATUS_LABEL[status]}
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400">{title}</span>
        </div>

        {status === 'submitted' && submittedSummary ? (
          <pre className="whitespace-pre-wrap rounded-md border border-slate-200/80 bg-white/70 px-2 py-1.5 font-sans text-[11px] leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            {submittedSummary}
          </pre>
        ) : null}

        {status === 'pending' && children ? <div>{children}</div> : null}
      </div>
    </div>
  )
}
