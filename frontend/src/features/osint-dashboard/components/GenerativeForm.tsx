import { useEffect, useState } from 'react'
import { Send, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react'
import type { FormField } from '@/osint/types'
import { SkillFormFields, buildInitialFormData } from '@/osint/components/intelligence/SkillFormFields'

type GenerativeFormProps = {
  fields: FormField[]
  onSubmit: (data: Record<string, unknown>) => void
  disabled?: boolean
  /** One field per step (W6 skill forms). False shows all fields at once (AI follow-up forms). */
  stepMode?: boolean
}

function fieldHasValue(field: FormField, value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  return true
}

function finalizeFormData(
  fields: FormField[],
  values: Record<string, unknown>,
): Record<string, unknown> {
  const data = { ...values }
  for (const field of fields) {
    if (!fieldHasValue(field, data[field.name]) && field.default !== undefined) {
      data[field.name] = field.default
    }
  }
  return data
}

function validateAllFields(fields: FormField[], formData: Record<string, unknown>): boolean {
  for (const field of fields) {
    if (!field.required) continue
    if (!fieldHasValue(field, formData[field.name] ?? field.default)) return false
  }
  return true
}

export function DashboardGenerativeForm({
  fields,
  onSubmit,
  disabled = false,
  stepMode = true,
}: GenerativeFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => buildInitialFormData(fields))
  const [step, setStep] = useState(0)
  const fieldsKey = fields.map((f) => f.name).join('\0')

  useEffect(() => {
    setFormData(buildInitialFormData(fields))
    setStep(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when field set identity changes
  }, [fieldsKey])

  if (fields.length === 0) {
    return <p className="text-xs text-slate-500">form_schema 无有效 fields</p>
  }

  const handleSubmitAll = () => {
    onSubmit(finalizeFormData(fields, formData))
  }

  if (!stepMode) {
    return (
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <SkillFormFields
          fields={fields}
          formData={formData}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          compact
        />
        <button
          type="button"
          onClick={handleSubmitAll}
          disabled={disabled || !validateAllFields(fields, formData)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <Send size={14} />
          提交
        </button>
      </div>
    )
  }

  const currentField = fields[step]
  const isLastStep = step >= fields.length - 1
  const currentValue = formData[currentField.name]
  const canProceed =
    !currentField.required || fieldHasValue(currentField, currentValue ?? currentField.default)

  const handleNext = () => {
    if (isLastStep) {
      handleSubmitAll()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleSkip = () => {
    if (isLastStep) {
      handleSubmitAll()
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-1.5">
        {fields.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step
                ? 'bg-blue-600 dark:bg-blue-500'
                : i === step
                  ? 'bg-blue-400 dark:bg-blue-400/70'
                  : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
          {step + 1}/{fields.length}
        </span>
      </div>

      <SkillFormFields
        fields={[currentField]}
        formData={formData}
        onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
        compact
      />

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={disabled || step === 0}
          className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 transition-colors hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft size={14} />
          上一步
        </button>

        <div className="flex-1" />

        {!currentField.required ? (
          <button
            type="button"
            onClick={handleSkip}
            disabled={disabled}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <SkipForward size={14} />
            跳过
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleNext}
          disabled={disabled || !canProceed}
          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {isLastStep ? (
            <>
              <Send size={14} />
              开始执行
            </>
          ) : (
            <>
              下一步
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
