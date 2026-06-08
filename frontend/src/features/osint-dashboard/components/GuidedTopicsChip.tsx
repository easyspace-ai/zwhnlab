import type { GuidedTopicsStatus, GuidedTopicSnap } from '../types'
import { GuidedTopicChips } from './GuidedTopicChips'

type GuidedTopicsChipProps = {
  topics: GuidedTopicSnap[]
  status: GuidedTopicsStatus
  onSelect: (topic: GuidedTopicSnap) => void
  disabled?: boolean
}

const STATUS_LABEL: Record<GuidedTopicsStatus, string> = {
  active: '深度调研 · 推荐追问',
  used: '深度调研 · 已选用',
}

export function GuidedTopicsChip({
  topics,
  status,
  onSelect,
  disabled = false,
}: GuidedTopicsChipProps) {
  const borderTone =
    status === 'active'
      ? 'border-violet-300/70 bg-violet-50/80 dark:border-violet-800 dark:bg-violet-950/25'
      : 'border-slate-300/50 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/30'

  const dotTone = status === 'active' ? 'bg-violet-500' : 'bg-slate-400'

  return (
    <div className={`max-w-[92%] rounded-lg border ${borderTone}`}>
      <div className="flex flex-col gap-2 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${dotTone}`} />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {STATUS_LABEL[status]}
          </span>
        </div>
        <GuidedTopicChips
          topics={topics}
          onSelect={onSelect}
          disabled={disabled || status === 'used'}
        />
      </div>
    </div>
  )
}
