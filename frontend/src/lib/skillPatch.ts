export type SkillDraftPatch = {
  key?: string
  name?: string
  description?: string
  icon?: string
  form_schema?: string | Record<string, unknown>
  prompt_template?: string
  active_tab?: 'schema' | 'template' | 'preview'
}

const PATCH_FIELDS = [
  'key',
  'name',
  'description',
  'icon',
  'form_schema',
  'prompt_template',
  'active_tab',
] as const

const PATCH_BLOCK_RE = /```(?:skill-patch|json)\s*\n([\s\S]*?)\n```/g

function hasKnownPatchField(parsed: Record<string, unknown>): boolean {
  return PATCH_FIELDS.some((field) => field in parsed)
}

export function parseSkillPatch(content: string): SkillDraftPatch | null {
  let match: RegExpExecArray | null
  let lastValid: SkillDraftPatch | null = null

  PATCH_BLOCK_RE.lastIndex = 0
  while ((match = PATCH_BLOCK_RE.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(match[1]) as Record<string, unknown>
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) continue
      if (!hasKnownPatchField(parsed)) continue
      lastValid = parsed as SkillDraftPatch
    } catch {
      continue
    }
  }

  return lastValid
}

export function formatFormSchemaPatch(
  formSchema: SkillDraftPatch['form_schema']
): string | undefined {
  if (formSchema === undefined) return undefined
  if (typeof formSchema === 'string') return formSchema
  return JSON.stringify(formSchema, null, 2)
}
