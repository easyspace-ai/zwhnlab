import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { cn } from '@/osint/utils'
import type { IntelligenceSkill, FormField } from '@/osint/types'

interface SkillFormModalProps {
  skill: IntelligenceSkill | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: Record<string, any>) => Promise<void>
  /** 外部注入的初始值（如 Polymarket 事件标题），会覆盖 schema 默认值 */
  initialValues?: Record<string, any>
}

function getFieldInitialValue(field: FormField): string | number | boolean | string[] {
  if (field.default !== undefined) {
    return field.default
  }
  if (field.type === 'multi_select') {
    return []
  }
  if (field.type === 'checkbox') {
    return false
  }
  if (field.type === 'number') {
    return ''
  }
  return ''
}

export function SkillFormModal({ skill, isOpen, onClose, onSubmit, initialValues }: SkillFormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isOpen || !skill) return
    // Parse form schema and initialize default values
    try {
      const schema = JSON.parse(skill.form_schema)
      const initial: Record<string, any> = {}
      for (const field of schema.fields || []) {
        initial[field.name] = getFieldInitialValue(field)
      }
      // 合并外部注入的初始值（如事件标题）
      const merged = { ...initial, ...(initialValues || {}) }
      setFormData(merged)
      setErrors({})
    } catch {
      setFormData({ ...(initialValues || {}) })
    }
  }, [isOpen, skill, initialValues])

  if (!isOpen || !skill) return null

  let fields: FormField[] = []
  try {
    const schema = JSON.parse(skill.form_schema)
    fields = schema.fields || []
  } catch {
    fields = []
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    for (const field of fields) {
      if (field.required) {
        const val = formData[field.name]
        if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.name] = `${field.label} 不能为空`
        }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  const updateField = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => { const e = { ...prev }; delete e[name]; return e })
    }
  }

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.name]

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={formData[field.name] || ''}
            onChange={e => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={cn(
              'w-full px-3 py-2.5 border rounded-lg text-sm resize-none outline-none transition-all',
              hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
            )}
          />
        )

      case 'select':
        return (
          <select
            value={formData[field.name] || ''}
            onChange={e => updateField(field.name, e.target.value)}
            className={cn(
              'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all bg-white',
              hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
            )}
          >
            <option value="">请选择</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )

      case 'multi_select':
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map(opt => {
              const selected = (formData[field.name] || []).includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    const current = formData[field.name] || []
                    const updated = selected
                      ? current.filter((v: string) => v !== opt.value)
                      : [...current, opt.value]
                    updateField(field.name, updated)
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                    selected
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={field.name}
              checked={!!formData[field.name]}
              onChange={e => updateField(field.name, e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor={field.name} className="text-sm text-gray-600">是</label>
          </div>
        )

      case 'number':
        return (
          <input
            type="number"
            value={formData[field.name] || ''}
            onChange={e => updateField(field.name, e.target.value === '' ? '' : Number(e.target.value))}
            placeholder={field.placeholder}
            className={cn(
              'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all',
              hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
            )}
          />
        )

      case 'date':
        return (
          <input
            type="date"
            value={formData[field.name] || ''}
            onChange={e => updateField(field.name, e.target.value)}
            className={cn(
              'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all',
              hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
            )}
          />
        )

      default: // text
        return (
          <input
            type="text"
            value={formData[field.name] || ''}
            onChange={e => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={cn(
              'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all',
              hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
            )}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{skill.name}</h3>
            {skill.description && (
              <p className="text-xs text-gray-400 mt-0.5">{skill.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              {renderField(field)}
              {field.description && (
                <p className="text-xs text-gray-400 mt-1">{field.description}</p>
              )}
              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 gap-3 mt-auto">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:opacity-100 transition-colors shadow-sm flex items-center gap-1.5"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            {submitting ? '提交中...' : '确认提交'}
          </button>
        </div>
      </div>
    </div>
  )
}
