import { X } from 'lucide-react'
import { DashboardGenerativeForm } from '@/features/osint-dashboard/components/GenerativeForm'
import { SkillFormChip } from '@/features/osint-dashboard/components/SkillFormChip'
import type { FormField } from '@/osint/types'
import type { FormDraftView } from '../../engine/types'

function parseFields(formSchema: string): FormField[] {
  try {
    const schema = JSON.parse(formSchema)
    return schema.fields || []
  } catch {
    return []
  }
}

export function FormDraftBlock({
  draft,
  disabled,
  onSubmit,
  onCancel,
}: {
  draft: FormDraftView
  disabled?: boolean
  onSubmit: (formData: Record<string, unknown>) => void
  onCancel: () => void
}) {
  const fields = parseFields(draft.formSchema)
  if (fields.length === 0) {
    return (
      <p className="text-xs text-slate-500">技能表单配置无效，请关闭后重试。</p>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={onCancel}
        aria-label="取消技能表单"
        className="absolute right-2 top-2 z-10 rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <X size={14} />
      </button>
      <SkillFormChip title={draft.skillName || '技能任务'} status="pending">
        <DashboardGenerativeForm
          fields={fields}
          onSubmit={onSubmit}
          disabled={disabled}
        />
      </SkillFormChip>
    </div>
  )
}
