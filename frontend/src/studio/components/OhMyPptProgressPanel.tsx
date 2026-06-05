import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const OHMYPPT_STAGE_LABEL: Record<string, string> = {
  planning: '规划大纲',
  design_contract: '设计契约',
  scaffolding: '搭建骨架',
  page_generation: '逐页生成',
  finalization: '收尾校验',
  run_completed: '完成',
  run_error: '出错',
}

interface OhMyPptProgressPanelProps {
  stage: string
  stageMsg: string
  logLines: string[]
  expanded: boolean
  onToggleExpanded: () => void
  completedPages: number
  totalPages: number
  compact?: boolean
}

export function OhMyPptProgressPanel({
  stage,
  stageMsg,
  logLines,
  expanded,
  onToggleExpanded,
  completedPages,
  totalPages,
  compact = false,
}: OhMyPptProgressPanelProps) {
  const label = OHMYPPT_STAGE_LABEL[stage] || stage
  const recentLog = logLines.slice(-8).join('\n')

  return (
    <div
      className={cn(
        'rounded-lg border border-violet-100 bg-violet-50/80 text-violet-900',
        compact ? 'px-3 py-2 text-xs' : 'px-3 py-2.5 text-sm',
      )}
    >
      <div className="flex items-start gap-2">
        <Loader2 className="mt-0.5 shrink-0 animate-spin" size={compact ? 12 : 14} />
        <div className="min-w-0 flex-1">
          <p className="font-medium">{label}</p>
          {(stageMsg || totalPages > 0) && (
            <p className="mt-0.5 text-violet-700/80">
              {stageMsg}
              {totalPages > 0 && (
                <span className="ml-1 tabular-nums text-violet-600/70">
                  · {completedPages}/{totalPages} 页
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {recentLog && (
        <div className="mt-2">
          <button
            type="button"
            onClick={onToggleExpanded}
            className="flex items-center gap-1 text-[11px] text-violet-700/90 hover:text-violet-900"
          >
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            {expanded ? '收起日志' : '展开日志'}
          </button>
          {expanded && (
            <pre className="mt-1.5 max-h-48 overflow-auto rounded-md border border-violet-100 bg-white/70 p-2 font-mono text-[10px] leading-relaxed text-gray-700 whitespace-pre-wrap break-all">
              {recentLog}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
