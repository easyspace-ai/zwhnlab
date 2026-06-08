import type { FormField, IntelligenceSkill } from '@/osint/types'

export function parseSkillFormFields(skill: IntelligenceSkill | null): FormField[] {
  if (!skill) return []
  try {
    const schema = JSON.parse(skill.form_schema)
    return schema.fields || []
  } catch {
    return []
  }
}
