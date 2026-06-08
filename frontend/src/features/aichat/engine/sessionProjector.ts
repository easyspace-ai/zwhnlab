import type {
  ProjectedTimeline,
  RoundView,
  SessionEvent,
  W6PanelView,
  W6Status,
} from './types'

function emptyW6(): W6PanelView {
  return { status: 'running', logs: [], progress: 0, lastLine: '正在启动 W6 子 Agent…' }
}

function ensureRound(map: Map<string, RoundView>, roundId: string): RoundView {
  let r = map.get(roundId)
  if (!r) {
    r = {
      id: roundId,
      kind: 'w6_manual',
      topic: '',
      anchorText: '',
      anchorKind: 'user',
      sealed: false,
    }
    map.set(roundId, r)
  }
  return r
}

export function projectTimeline(
  events: SessionEvent[],
  activeRoundId: string | null = null,
  nextSeq = 1,
): ProjectedTimeline {
  const roundOrder: string[] = []
  const rounds = new Map<string, RoundView>()
  let sessionTitle = ''
  const reports: ProjectedTimeline['reports'] = []

  for (const ev of events) {
    const rid = ev.round_id?.trim()
    switch (ev.type) {
      case 'session_title':
        if (ev.title?.trim()) sessionTitle = ev.title.trim()
        break
      case 'round_started': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (!roundOrder.includes(rid)) roundOrder.push(rid)
        r.kind = (ev.kind as RoundView['kind']) || r.kind
        r.topic = ev.topic?.trim() || ev.body?.trim() || r.topic
        r.anchorText = ev.body?.trim() || r.anchorText
        r.anchorKind = r.kind === 'w6_form' ? 'form' : r.kind === 'discuss' ? 'discuss' : 'user'
        r.sealed = false
        break
      }
      case 'form_submitted': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (!roundOrder.includes(rid)) roundOrder.push(rid)
        r.anchorText = ev.body?.trim() || r.anchorText
        r.anchorKind = 'form'
        break
      }
      case 'w6_status': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (!r.w6) r.w6 = emptyW6()
        r.w6.status = (ev.status as W6Status) || r.w6.status
        break
      }
      case 'w6_log': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (!r.w6) r.w6 = emptyW6()
        const body = ev.body?.trim() || ''
        if (body) {
          r.w6.logs.push({
            logType: ev.log_type || 'log',
            body,
            progress: ev.progress,
          })
          r.w6.lastLine = body.slice(0, 120)
        }
        if (ev.progress != null) r.w6.progress = ev.progress
        break
      }
      case 'assistant_delta': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        r.assistantText = (r.assistantText || '') + (ev.delta || '')
        break
      }
      case 'report_ready': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        r.reportHtmlId = ev.html_id || r.reportHtmlId
        r.reportTitle = ev.title || r.reportTitle
        const title = ev.title || '报告'
        if (ev.html_id) {
          reports.push({
            id: ev.html_id,
            resourceId: ev.html_id,
            title,
            kind: 'html',
            roundId: rid,
          })
        }
        if (ev.md_id && ev.md_id !== ev.html_id) {
          reports.push({
            id: ev.md_id,
            resourceId: ev.md_id,
            title: `${title} (MD)`,
            kind: 'markdown',
            roundId: rid,
          })
        }
        break
      }
      case 'follow_ups': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (ev.questions?.length) r.guidedTopics = ev.questions
        break
      }
      case 'round_sealed': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        r.sealed = true
        if (r.w6 && r.w6.status === 'running') {
          r.w6.status = 'done'
        }
        break
      }
      default:
        break
    }
  }

  const projectedRounds = roundOrder.map((id) => rounds.get(id)!).filter(Boolean)

  return {
    rounds: projectedRounds,
    activeRoundId,
    sessionTitle,
    reports,
    nextSeq,
  }
}

/** At most one running W6 across all rounds (INV-1 projection check). */
export function countRunningW6(timeline: ProjectedTimeline): number {
  return timeline.rounds.filter((r) => r.w6?.status === 'running' && !r.sealed).length
}
