import { parseFormDraftPayload, draftIdFromEvent } from '../lib/formDraftPayload'
import { resolveRoundGuidedTopics } from '../lib/guidedTopics'
import type {
  FormDraftView,
  ProjectedTimeline,
  ReportView,
  RoundView,
  SessionEvent,
  TimelineEntry,
  W6PanelView,
  W6Status,
} from './types'

function upsertRoundReport(
  reports: ReportView[],
  roundId: string,
  kind: ReportView['kind'],
  item: Omit<ReportView, 'roundId' | 'kind'>,
) {
  for (let i = reports.length - 1; i >= 0; i--) {
    if (reports[i].roundId === roundId && reports[i].kind === kind) {
      reports.splice(i, 1)
    }
  }
  reports.push({ ...item, roundId, kind })
}

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
  events: SessionEvent[] | null | undefined,
  activeRoundId: string | null = null,
  nextSeq = 1,
): ProjectedTimeline {
  const roundOrder: string[] = []
  const rounds = new Map<string, RoundView>()
  const drafts = new Map<string, FormDraftView>()
  const entryOrder: TimelineEntry[] = []
  let sessionTitle = ''
  const reports: ProjectedTimeline['reports'] = []

  const pushRoundEntry = (roundId: string) => {
    const round = rounds.get(roundId)
    if (!round) return
    const idx = entryOrder.findIndex((e) => e.entryKind === 'round' && e.round.id === roundId)
    if (idx >= 0) {
      entryOrder[idx] = { entryKind: 'round', round }
    } else {
      entryOrder.push({ entryKind: 'round', round })
    }
  }

  const pushDraftEntry = (draft: FormDraftView) => {
    if (draft.status !== 'pending') return
    const idx = entryOrder.findIndex((e) => e.entryKind === 'form_draft' && e.draft.id === draft.id)
    if (idx >= 0) {
      entryOrder[idx] = { entryKind: 'form_draft', draft }
    } else {
      entryOrder.push({ entryKind: 'form_draft', draft })
    }
  }

  const removeDraftEntry = (draftId: string) => {
    const idx = entryOrder.findIndex((e) => e.entryKind === 'form_draft' && e.draft.id === draftId)
    if (idx >= 0) entryOrder.splice(idx, 1)
  }

  for (const ev of events ?? []) {
    const rid = ev.round_id?.trim()
    switch (ev.type) {
      case 'form_presented': {
        const payload = parseFormDraftPayload(ev)
        const id = draftIdFromEvent(ev)
        if (!id) break
        const draft: FormDraftView = {
          id,
          skillId: payload.skill_id?.trim() || '',
          skillKey: payload.skill_key?.trim() || '',
          skillName: payload.skill_name?.trim() || '技能任务',
          formSchema: payload.form_schema || '',
          status: 'pending',
        }
        drafts.set(id, draft)
        pushDraftEntry(draft)
        break
      }
      case 'form_cancelled': {
        const id = draftIdFromEvent(ev)
        if (!id) break
        const draft = drafts.get(id)
        if (draft) {
          draft.status = 'cancelled'
          removeDraftEntry(id)
        }
        break
      }
      case 'form_draft_submitted': {
        const id = draftIdFromEvent(ev)
        if (!id) break
        const draft = drafts.get(id)
        if (draft) {
          draft.status = 'submitted'
          draft.submittedRoundId = rid || parseFormDraftPayload(ev).round_id
          removeDraftEntry(id)
        }
        break
      }
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
        pushRoundEntry(rid)
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
        const htmlId = ev.html_id?.trim()
        const mdId = ev.md_id?.trim()
        if (htmlId) {
          upsertRoundReport(reports, rid, 'html', {
            id: htmlId,
            resourceId: htmlId,
            title,
          })
        }
        if (mdId && mdId !== htmlId) {
          upsertRoundReport(reports, rid, 'markdown', {
            id: mdId,
            resourceId: mdId,
            title: `${title} (MD)`,
          })
        }
        break
      }
      case 'follow_ups': {
        if (!rid) break
        const r = ensureRound(rounds, rid)
        if (ev.questions?.length) {
          r.guidedTopics = resolveRoundGuidedTopics({
            questions: ev.questions,
            reportTitle: r.reportTitle,
          })
        }
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
    entries: entryOrder,
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
