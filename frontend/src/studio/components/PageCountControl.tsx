import { cn } from '@/lib/utils'
import { clampPageCount, PPT_PAGE_PRESETS } from '../lib/productSchema'

type PageCountControlProps = {
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  presets?: readonly number[]
  className?: string
  disabled?: boolean
}

export function PageCountControl({
  value,
  onChange,
  min = 4,
  max = 50,
  presets = PPT_PAGE_PRESETS,
  className,
  disabled,
}: PageCountControlProps) {
  const clamped = clampPageCount(value, min, max)
  const presetOptions = presets.filter((n) => n >= min && n <= max)
  const selectValue = presetOptions.some((n) => n === clamped) ? String(clamped) : 'custom'

  return (
    <label className={cn('flex flex-wrap items-center gap-1.5 text-gray-700', className)}>
      <span>页数</span>
      <select
        value={selectValue}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value
          if (v !== 'custom') onChange(Number(v))
        }}
        className="rounded-md border border-white/50 bg-white/80 px-2 py-1"
        aria-label="页数预设"
      >
        {presetOptions.map((n) => (
          <option key={n} value={n}>
            {n} 页
          </option>
        ))}
        <option value="custom">自定义</option>
      </select>
      <input
        type="number"
        min={min}
        max={max}
        value={clamped}
        disabled={disabled}
        onChange={(e) => onChange(clampPageCount(Number(e.target.value), min, max))}
        className="w-16 rounded-md border border-white/50 bg-white/80 px-2 py-1 text-center tabular-nums"
        aria-label="自定义页数"
      />
    </label>
  )
}
