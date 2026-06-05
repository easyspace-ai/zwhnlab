import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STAGE_LABEL: Record<string, string> = {
  ingest: '解析文档',
  comprehend: '理解内容',
  outline: '组织大纲',
  design: '排版设计',
  generate: '生成演示',
  done: '完成',
  error: '出错',
}

interface PipelineProgressPanelProps {
  stage: string
  stageMsg: string
  partialByStage: Record<string, string>
  expanded: boolean
  onToggleExpanded: () => void
  compact?: boolean
}

function previewTail(text: string, max = 2400): string {
  if (text.length <= max) return text
  return `…${text.slice(-max)}`
}

export function PipelineProgressPanel({
  stage,
  stageMsg,
  partialByStage,
  expanded,
  onToggleExpanded,
  compact = false,
}: PipelineProgressPanelProps) {
  const partial = partialByStage[stage] || ''
  const charCount = partial.length
  const label = STAGE_LABEL[stage] || stage

  return (
    <div
      className={cn(
        'rounded-lg border border-blue-100 bg-blue-50/80 text-blue-900',
        compact ? 'px-3 py-2 text-xs' : 'px-3 py-2.5 text-sm',
      )}
    >
      <div className="flex items-start gap-2">
        <Loader2 className="mt-0.5 shrink-0 animate-spin" size={compact ? 12 : 14} />
        <div className="min-w-0 flex-1">
          <p className="font-medium">{label}</p>
          {(stageMsg || charCount > 0) && (
            <p className="mt-0.5 text-blue-700/80">
              {stageMsg}
              {charCount > 0 && (
                <span className="ml-1 tabular-nums text-blue-600/70">
                  · {charCount.toLocaleString()} 字
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {partial && (
        <div className="mt-2">
          <button
            type="button"
            onClick={onToggleExpanded}
            className="flex items-center gap-1 text-[11px] text-blue-700/90 hover:text-blue-900"
          >
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            {expanded ? '收起实时输出' : '展开实时输出'}
          </button>
          {expanded && (
            <pre className="mt-1.5 max-h-48 overflow-auto rounded-md border border-blue-100 bg-white/70 p-2 font-mono text-[10px] leading-relaxed text-gray-700 whitespace-pre-wrap break-all">
              {previewTail(partial)}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

export { STAGE_LABEL }
