import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
  /** Approx. characters before collapse */
  collapseAt?: number
}

export function PolymarketRichText({ text, className, collapseAt = 520 }: Props) {
  const trimmed = useMemo(() => (text ?? '').trim(), [text])
  const [open, setOpen] = useState(false)
  const needCollapse = trimmed.length > collapseAt
  const shown = !needCollapse || open ? trimmed : `${trimmed.slice(0, collapseAt)}…`

  if (!trimmed) {
    return <p className={cn('text-[13px] text-slate-400 dark:text-slate-500', className)}>暂无内容</p>
  }

  return (
    <div className={cn('text-[13px] leading-relaxed text-slate-700 dark:text-slate-300', className)}>
      <p className="whitespace-pre-wrap">{shown}</p>
      {needCollapse && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-[13px] font-medium text-blue-600 hover:underline"
        >
          {open ? '收起' : '展开'}
        </button>
      )}
    </div>
  )
}
