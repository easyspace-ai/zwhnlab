import { cn } from '@/osint/utils'
import type { FormField } from '@/osint/types'

export function getFieldInitialValue(field: FormField): string | number | boolean | string[] {
  if (field.default !== undefined) {
    return field.default as string | number | boolean | string[]
  }
  if (field.type === 'multi_select') return []
  if (field.type === 'checkbox') return false
  if (field.type === 'number') return ''
  return ''
}

export function buildInitialFormData(fields: FormField[]): Record<string, unknown> {
  const initial: Record<string, unknown> = {}
  for (const field of fields) {
    initial[field.name] = getFieldInitialValue(field)
  }
  return initial
}

type SkillFormFieldsProps = {
  fields: FormField[]
  formData: Record<string, unknown>
  onChange: (name: string, value: unknown) => void
  errors?: Record<string, string>
  compact?: boolean
}

export function SkillFormFields({
  fields,
  formData,
  onChange,
  errors = {},
  compact = false,
}: SkillFormFieldsProps) {
  const renderField = (field: FormField) => {
    const hasError = !!errors[field.name]
    const inputClass = cn(
      'w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all bg-white dark:bg-gray-950',
      compact ? 'py-1.5 text-xs' : 'py-2.5',
      hasError
        ? 'border-red-300 focus:border-red-400'
        : 'border-gray-200 dark:border-gray-700 focus:border-blue-400'
    )

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={(formData[field.name] as string) || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={compact ? 2 : 4}
            className={cn(inputClass, 'resize-none')}
          />
        )
      case 'select': {
        const selectValue =
          (formData[field.name] as string) ||
          (field.default !== undefined ? String(field.default) : '')
        return (
          <select
            value={selectValue}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputClass}
          >
            {field.default === undefined && <option value="">请选择</option>}
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )
      }
      case 'multi_select':
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((opt) => {
              const selected = ((formData[field.name] as string[]) || []).includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    const current = (formData[field.name] as string[]) || []
                    const updated = selected
                      ? current.filter((v) => v !== opt.value)
                      : [...current, opt.value]
                    onChange(field.name, updated)
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-all',
                    selected
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-600 border-gray-200'
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!formData[field.name]}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className="w-4 h-4"
          />
        )
      case 'number':
        return (
          <input
            type="number"
            value={formData[field.name] === '' ? '' : String(formData[field.name] ?? '')}
            onChange={(e) =>
              onChange(field.name, e.target.value === '' ? '' : Number(e.target.value))
            }
            placeholder={field.placeholder}
            className={inputClass}
          />
        )
      case 'date':
        return (
          <input
            type="date"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputClass}
          />
        )
      default:
        return (
          <input
            type="text"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        )
    }
  }

  if (fields.length === 0) {
    return <p className="text-xs text-gray-400">form_schema 无有效 fields</p>
  }

  return (
    <div className={cn('space-y-3', compact && 'space-y-2')}>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {renderField(field)}
          {field.description && (
            <p className="text-[10px] text-gray-400 mt-0.5">{field.description}</p>
          )}
          {errors[field.name] && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </div>
  )
}
