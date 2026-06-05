import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkillIcon } from './SkillIcon'
import { SKILL_ICON_OPTIONS } from './skillIconOptions'

type SkillIconPickerProps = {
  value: string
  onChange: (icon: string) => void
  className?: string
}

export function SkillIconPicker({ value, onChange, className }: SkillIconPickerProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SKILL_ICON_OPTIONS
    return SKILL_ICON_OPTIONS.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.name.toLowerCase().includes(q)
    )
  }, [query])

  const selectedLabel =
    SKILL_ICON_OPTIONS.find((o) => o.name === value)?.label || (value ? value : '无图标')

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 min-w-[7rem] shrink-0"
      >
        <SkillIcon name={value} size={14} />
        <span className="truncate flex-1 text-left">{selectedLabel}</span>
        <ChevronDown size={12} className="shrink-0 opacity-50" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-lg">
          <div className="p-2 border-b border-gray-100 dark:border-gray-800">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索图标…"
              className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1.5 bg-white dark:bg-gray-950"
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-2 grid grid-cols-4 gap-1">
            {filtered.map((opt) => (
              <button
                key={opt.name || '__none'}
                type="button"
                title={opt.name || '无图标'}
                onClick={() => {
                  onChange(opt.name)
                  setOpen(false)
                  setQuery('')
                }}
                className={cn(
                  'flex flex-col items-center gap-0.5 p-1.5 rounded-md text-[9px] hover:bg-gray-100 dark:hover:bg-gray-800',
                  value === opt.name && 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                )}
              >
                <SkillIcon name={opt.name} size={16} />
                <span className="truncate w-full text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
