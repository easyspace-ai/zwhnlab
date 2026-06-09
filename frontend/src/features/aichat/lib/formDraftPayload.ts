import type { SessionEvent } from '../engine/types'

export type FormDraftPayload = {
  draft_id?: string
  skill_id?: string
  skill_key?: string
  skill_name?: string
  form_schema?: string
  round_id?: string
}

export function draftIdFromEvent(ev: SessionEvent): string {
  const fromTop = ev.draft_id?.trim()
  if (fromTop) return fromTop
  const payload = ev.payload as FormDraftPayload | undefined
  return payload?.draft_id?.trim() || ''
}

export function parseFormDraftPayload(ev: SessionEvent): FormDraftPayload {
  const payload = (ev.payload as FormDraftPayload | undefined) ?? {}
  return {
    draft_id: draftIdFromEvent(ev) || payload.draft_id,
    skill_id: payload.skill_id,
    skill_key: payload.skill_key,
    skill_name: payload.skill_name || ev.topic || ev.body,
    form_schema: payload.form_schema,
    round_id: payload.round_id || ev.round_id,
  }
}
