import type { FormField } from '@/osint/types'
import type { IntelligenceSkill } from '@/osint/types'

export interface FormSchema {
  fields: FormField[]
}

export type W6MessageStatus = 'running' | 'done' | 'error' | 'stopped'

export type FormMessageStatus = 'pending' | 'submitted' | 'cancelled'

export type GuidedTopicMode = 'w6' | 'discuss'

export type GuidedTopicsStatus = 'active' | 'used'

export type GuidedTopicSnap = {
  text: string
  mode: GuidedTopicMode
}

export interface DashboardChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'phase' | 'w6' | 'form' | 'guided_topics'
  content: string
  timestamp: number
  formSchema?: FormSchema | null
  /** Skill parameter form (role === 'form'). */
  formStatus?: FormMessageStatus
  skillKey?: string
  skillName?: string
  skillId?: string
  formPrompt?: string
  formData?: Record<string, unknown>
  /** One field per step for skill forms; false for AI follow-up forms. */
  stepMode?: boolean
  htmlUrl?: string | null
  /** Set only when this bubble's turn produced a new HTML report artifact. */
  previewResourceId?: string | null
  followUpQuestions?: string[] | null
  /** W6 sub-agent round (role === 'w6' only). */
  w6Status?: W6MessageStatus
  w6Progress?: number
  w6LastLine?: string
  w6Events?: W6StreamEvent[]
  /** Suggested follow-up topics (role === 'guided_topics'). */
  guidedTopics?: GuidedTopicSnap[]
  guidedTopicsStatus?: GuidedTopicsStatus
}

export interface DashboardSSEEvent {
  type:
    | 'text_delta'
    | 'phase'
    | 'form_request'
    | 'report_md'
    | 'report_html'
    | 'follow_up'
    | 'error'
    | 'done'
    | 'stream_end'
    | 'session'
    | 'session_title'
  delta?: string
  phase?: string
  message?: string
  schema?: FormSchema
  markdown?: string
  id?: string
  url?: string
  title?: string
  questions?: string[]
  sessionId?: string
  roundTitle?: string
}

export type DashboardReportKind = 'html' | 'markdown'

export interface DashboardReportItem {
  id: string
  url: string
  /** Artifact resource id for preview/edit API. */
  resourceId: string
  title: string
  timestamp: number
  /** Preview mode: HTML iframe or rendered Markdown. */
  kind: DashboardReportKind
  /** Inline markdown from SSE / W6 stream (optional). */
  markdown?: string
}

export interface W6StreamEvent {
  type: 'log' | 'tool' | 'token' | 'status' | 'phase' | 'done' | 'error' | 'stopped'
  message?: string
  token?: string
  progress?: number
  markdown?: string
  reportHtml?: string
  previewFile?: string
  reportUrl?: string
  roundTitle?: string
  followUps?: string[]
  timestamp?: number
}

/** Legacy fallback keys when API has not loaded uses_w6 yet. */
const LEGACY_W6_SKILL_KEYS = new Set(['fact_check', 'info_research', 'data_collection'])

export function isW6SkillKey(
  key: string | null | undefined,
  skills?: IntelligenceSkill[],
): boolean {
  if (!key) return false
  const skill = skills?.find((s) => s.key === key)
  if (skill?.uses_w6 != null) return skill.uses_w6
  return LEGACY_W6_SKILL_KEYS.has(key)
}
