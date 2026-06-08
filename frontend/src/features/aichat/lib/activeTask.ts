import { countRunningW6 } from '../engine/sessionProjector'
import type { ProjectedTimeline } from '../engine/types'

export type ActiveTaskKind = 'w6' | 'deepseek' | 'discuss' | null

export function resolveActiveTask(projected: ProjectedTimeline): {
  kind: ActiveTaskKind
  roundId: string | null
} {
  const roundId = projected.activeRoundId
  if (!roundId) return { kind: null, roundId: null }

  const round = projected.rounds.find((r) => r.id === roundId)
  if (!round || round.sealed) return { kind: null, roundId: null }

  if (round.w6?.status === 'running' || countRunningW6(projected) > 0) {
    const w6Round = projected.rounds.find((r) => r.w6?.status === 'running' && !r.sealed)
    return { kind: 'w6', roundId: w6Round?.id ?? roundId }
  }

  if (round.kind === 'discuss') return { kind: 'discuss', roundId }
  if (round.kind === 'deepseek') return { kind: 'deepseek', roundId }

  return { kind: null, roundId: null }
}
