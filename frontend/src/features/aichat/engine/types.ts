export type RoundKind = 'deepseek' | 'w6_form' | 'w6_manual' | 'discuss'

export type W6Status = 'running' | 'idle' | 'done' | 'error' | 'stopped'

export type SessionEventType =
  | 'round_started'
  | 'form_presented'
  | 'form_cancelled'
  | 'form_draft_submitted'
  | 'form_submitted'
  | 'w6_status'
  | 'w6_log'
  | 'assistant_delta'
  | 'report_ready'
  | 'follow_ups'
  | 'session_title'
  | 'round_sealed'

export interface SessionEvent {
  seq: number
  type: SessionEventType
  round_id?: string
  at: number
  kind?: RoundKind
  topic?: string
  title?: string
  status?: W6Status | string
  log_type?: string
  body?: string
  progress?: number
  delta?: string
  html_id?: string
  md_id?: string
  questions?: string[]
  reason?: string
  draft_id?: string
  payload?: unknown
}

export type FormDraftStatus = 'pending' | 'cancelled' | 'submitted'

export interface FormDraftView {
  id: string
  skillId: string
  skillKey: string
  skillName: string
  formSchema: string
  status: FormDraftStatus
  submittedRoundId?: string
}

export type TimelineEntry =
  | { entryKind: 'round'; round: RoundView }
  | { entryKind: 'form_draft'; draft: FormDraftView }

export interface W6PanelView {
  status: W6Status
  logs: Array<{ logType: string; body: string; progress?: number }>
  progress: number
  lastLine: string
}

export interface RoundView {
  id: string
  kind: RoundKind
  topic: string
  anchorText: string
  anchorKind: 'form' | 'user' | 'discuss'
  sealed: boolean
  w6?: W6PanelView
  guidedTopics?: string[]
  assistantText?: string
  reportHtmlId?: string
  reportTitle?: string
}

export interface ReportView {
  id: string
  resourceId: string
  title: string
  kind: 'html' | 'markdown'
  roundId?: string
}

export interface ProjectedTimeline {
  entries: TimelineEntry[]
  rounds: RoundView[]
  activeRoundId: string | null
  sessionTitle: string
  reports: ReportView[]
  nextSeq: number
}
