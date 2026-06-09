import { useState } from 'react'
import { SkillFormChip } from '@/features/osint-dashboard/components/SkillFormChip'
import { UserAnchorBubble } from './UserAnchorBubble'
import { GuidedTopicsChip } from '@/features/osint-dashboard/components/GuidedTopicsChip'
import { SubAgentDrawer } from '@/features/osint-dashboard/components/subagent/SubAgentDrawer'
import type { SubAgentConnection } from '@/features/osint-dashboard/hooks/useSubAgentStream'
import type { W6StreamEvent } from '@/features/osint-dashboard/types'
import { AssistantBubble } from './AssistantBubble'
import { ProcessingBubble } from './ProcessingBubble'
import { W6RoundChip } from './W6RoundChip'
import { resolveRoundProcessingLabel } from '../../lib/roundProcessing'
import type { RoundView, W6PanelView } from '../../engine/types'

function w6LogsToStreamEvents(logs: W6PanelView['logs']): W6StreamEvent[] {
  return logs.map((l, i) => ({
    type: (l.logType === 'token' ? 'token' : 'log') as 'log' | 'token',
    message: l.body,
    token: l.logType === 'token' ? l.body : undefined,
    progress: l.progress,
    timestamp: i,
  }))
}

function mapChipStatus(
  status: string | undefined,
  sealed: boolean,
): 'idle' | 'running' | 'done' | 'error' {
  if (status === 'error') return 'error'
  if (status === 'stopped' || sealed) return 'done'
  if (status === 'running') return 'running'
  if (status === 'idle') return 'idle'
  if (status === 'done') return 'done'
  return 'idle'
}

export function RoundBlock({
  round,
  isActive,
  onStop,
  onSelectTopic,
  chipsDisabled = false,
}: {
  round: RoundView
  isActive: boolean
  onStop?: () => void
  onSelectTopic?: (text: string) => void
  chipsDisabled?: boolean
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const w6 = round.w6
  const chipStatus = mapChipStatus(w6?.status, round.sealed)
  const finalizing = chipStatus === 'idle' && !round.sealed && Boolean(w6)
  const w6Events = w6 ? w6LogsToStreamEvents(w6.logs) : []
  const drawerStatus = finalizing ? 'running' : chipStatus === 'idle' ? 'idle' : chipStatus
  const drawerConnection: SubAgentConnection =
    isActive && (chipStatus === 'running' || finalizing) ? 'open' : 'closed'
  const processingLabel = resolveRoundProcessingLabel(round)

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
        <>
          <W6RoundChip
            status={chipStatus}
            finalizing={finalizing}
            connection={isActive && chipStatus === 'running' ? 'open' : 'closed'}
            progress={w6.progress}
            lastLine={w6.lastLine}
            events={w6Events}
            onClick={() => setDrawerOpen(true)}
            onStop={chipStatus === 'running' ? onStop : undefined}
          />
          <SubAgentDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            events={w6Events}
            status={drawerStatus}
            connection={drawerConnection}
          />
        </>
      ) : null}

      {round.assistantText ? (
        <AssistantBubble content={round.assistantText} />
      ) : processingLabel ? (
        <ProcessingBubble label={processingLabel} />
      ) : null}

      {round.sealed && round.guidedTopics?.length ? (
        <GuidedTopicsChip
          topics={round.guidedTopics.map((text) => ({ text, mode: 'w6' as const }))}
          status="active"
          onSelect={(t) => onSelectTopic?.(t.text)}
          disabled={chipsDisabled}
        />
      ) : null}
    </div>
  )
}
