/** 与 backend BuiltinSkillKeys / data/skills/defaults 一致 */
export const BUILTIN_INTELLIGENCE_SKILL_KEYS = new Set([
  'fact_check',
  'info_research',
  'data_collection',
  'follow_up',
  'daily_brief',
])

export function isBuiltinIntelligenceSkill(key: string): boolean {
  return BUILTIN_INTELLIGENCE_SKILL_KEYS.has(key.trim())
}
