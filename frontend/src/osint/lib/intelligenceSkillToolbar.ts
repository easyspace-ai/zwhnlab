import { BUILTIN_INTELLIGENCE_SKILL_KEYS } from '@/osint/constants/builtinIntelligenceSkills'
import type { IntelligenceSkill } from '@/osint/types'

/** Default folder / skill group id under data/skills/defaults/ */
export const INTELLIGENCE_ANALYST_GROUP_ID = 'intelligence_analyst'

export type SkillGroupLite = {
  id: string
  name: string
  skill_ids: string[]
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
    .filter((s) => BUILTIN_INTELLIGENCE_SKILL_KEYS.has(s.key))
    .sort((a, b) => a.sort_order - b.sort_order)
}

export function resolveIntelligenceAnalystGroup(
  groups: SkillGroupLite[],
): SkillGroupLite | null {
  const fromApi = groups.find((g) => g.id === INTELLIGENCE_ANALYST_GROUP_ID)
  if (fromApi) return fromApi

  if (groups.some((g) => g.name === '情报分析')) {
    return groups.find((g) => g.name === '情报分析') ?? null
  }

  return {
    id: INTELLIGENCE_ANALYST_GROUP_ID,
    name: '情报分析',
    skill_ids: [...BUILTIN_INTELLIGENCE_SKILL_KEYS],
  }
}
