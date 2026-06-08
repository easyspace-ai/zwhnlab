import { SubAgentChip } from '@/features/osint-dashboard/components/subagent/SubAgentChip'
import { SkillFormChip } from '@/features/osint-dashboard/components/SkillFormChip'
import { UserAnchorBubble } from './UserAnchorBubble'
import { GuidedTopicsChip } from '@/features/osint-dashboard/components/GuidedTopicsChip'
import type { RoundView } from '../../engine/types'

function mapChipStatus(status: string | undefined, sealed: boolean): 'idle' | 'running' | 'done' | 'error' {
  if (status === 'error') return 'error'
  if (sealed || status === 'done' || status === 'stopped') return 'done'
  if (status === 'running') return 'running'
  return 'idle'
}

export function RoundBlock({
  round,
  isActive,
  onStop,
  onSelectTopic,
}: {
  round: RoundView
  isActive: boolean
  onStop?: () => void
  onSelectTopic?: (text: string) => void
}) {
  const w6 = round.w6
  const chipStatus = mapChipStatus(w6?.status, round.sealed)

  return (
    <div className="space-y-3">
      {round.anchorKind === 'form' ? (
        <SkillFormChip
          title={round.topic || '技能任务'}
          status="submitted"
          submittedSummary={round.anchorText}
        />
      ) : round.anchorText ? (
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-3 py-2 text-xs text-white dark:bg-slate-100 dark:text-slate-900">
            <UserAnchorBubble content={round.anchorText} />
          </div>
        </div>
      ) : null}

      {w6 ? (
        <SubAgentChip
          status={chipStatus}
          connection={isActive && chipStatus === 'running' ? 'open' : 'closed'}
          progress={w6.progress}
          lastLine={w6.lastLine}
          events={w6.logs.map((l, i) => ({
            type: (l.logType === 'token' ? 'token' : 'log') as 'log' | 'token',
            message: l.body,
            token: l.logType === 'token' ? l.body : undefined,
            progress: l.progress,
            timestamp: i,
          }))}
          onClick={() => {}}
          onStop={chipStatus === 'running' ? onStop : undefined}
        />
      ) : null}

      {round.assistantText ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          {round.assistantText}
        </div>
      ) : null}

      {round.sealed && round.guidedTopics?.length ? (
        <GuidedTopicsChip
          topics={round.guidedTopics.map((text) => ({ text, mode: 'w6' as const }))}
          status="active"
          onSelect={(t) => onSelectTopic?.(t.text)}
        />
      ) : null}
    </div>
  )
}
