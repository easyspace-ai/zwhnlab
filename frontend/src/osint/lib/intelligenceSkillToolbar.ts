import type { IntelligenceSkill } from '@/osint/types'

export type SkillGroupLite = {
  id: string
  name: string
  skill_ids: string[]
  /** Managed skill groups run skills through @w6 on form submit. */
  uses_w6?: boolean
}

/** Skills for toolbar pills: group order, enabled only. */
export function orderSkillsForGroup(
  skills: IntelligenceSkill[],
  group: SkillGroupLite | null,
): IntelligenceSkill[] {
  const enabledSkills = skills.filter((s) => s.is_enabled)
  const skillMap = new Map(enabledSkills.map((s) => [s.key, s]))

  if (group) {
    const ordered: IntelligenceSkill[] = []
    for (const key of group.skill_ids) {
      const skill = skillMap.get(key)
      if (skill) ordered.push(skill)
    }
    return ordered
  }

  return enabledSkills
    .filter((s) => s.uses_w6)
    .sort((a, b) => a.sort_order - b.sort_order)
}

/** Prefer the first skill group from API (all managed groups use @w6). */
export function resolveBuiltinSkillGroup(groups: SkillGroupLite[]): SkillGroupLite | null {
  return groups[0] ?? null
}

/** @deprecated Use resolveBuiltinSkillGroup */
export function resolveIntelligenceAnalystGroup(groups: SkillGroupLite[]): SkillGroupLite | null {
  return resolveBuiltinSkillGroup(groups)
}
