import { ChevronDown } from 'lucide-react'
import { cn } from '@/osint/utils'
import { REPORT_STYLE_OPTIONS, type ReportStyle } from '../lib/reportStyle'

type ReportStylePickerProps = {
  value: ReportStyle
  onChange: (style: ReportStyle) => void
  disabled?: boolean
  className?: string
}

export function ReportStylePicker({ value, onChange, disabled, className }: ReportStylePickerProps) {
  const selected = REPORT_STYLE_OPTIONS.find((opt) => opt.id === value) ?? REPORT_STYLE_OPTIONS[0]

  return (
    <label
      className={cn(
        'inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400',
        disabled && 'opacity-50',
        className,
      )}
    >
      <span className="shrink-0 font-medium">报告版式</span>
      <span className="relative inline-flex">
        <select
          value={value}
          disabled={disabled}
          title={selected.hint}
          aria-label="报告版式"
          onChange={(e) => onChange(e.target.value as ReportStyle)}
          className={cn(
            'h-7 min-w-[7.5rem] appearance-none rounded-lg border border-slate-200 bg-white py-0 pl-2 pr-6 text-[11px] font-medium text-slate-700 outline-none transition-colors',
            'hover:border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/60',
            'disabled:cursor-not-allowed',
            'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-slate-500',
          )}
        >
          {REPORT_STYLE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} title={opt.hint}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          aria-hidden
        />
      </span>
    </label>
  )
}
