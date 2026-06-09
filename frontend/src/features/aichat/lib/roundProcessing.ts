import { isReportEditIntent } from './reportEditIntent'
import type { RoundView } from '../engine/types'

/** Unsealed deepseek/discuss round with no assistant text yet (pre-first-token). */
export function isAssistantRoundAwaitingText(round: RoundView): boolean {
  if (round.sealed) return false
  if (round.w6) return false
  if (round.kind !== 'deepseek' && round.kind !== 'discuss') return false
  return !round.assistantText?.trim()
}

/** Phase copy aligned with osint-dashboard discuss / edit_html UX. */
export function resolveRoundProcessingLabel(round: RoundView): string | null {
  if (!isAssistantRoundAwaitingText(round)) return null

  if (round.kind === 'deepseek') return '思考中…'

  if (round.kind === 'discuss') {
    return isReportEditIntent(round.anchorText) ? '改版式中…' : '分析报告中…'
  }

  return null
}
