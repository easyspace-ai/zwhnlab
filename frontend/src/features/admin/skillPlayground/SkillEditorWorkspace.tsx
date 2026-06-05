import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Braces,
  Eye,
  FileText,
  Loader2,
  Play,
  Plus,
  Save,
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/toast'
import type { SkillGroupItem } from '@/lib/adminApi'
import { intelligenceSkillApi } from '@/osint/services/api'
import type { FormField, IntelligenceSkill } from '@/osint/types'
import { renderPrompt } from '@/osint/lib/renderPrompt'
import {
  SkillFormFields,
  buildInitialFormData,
} from '@/osint/components/intelligence/SkillFormFields'
import { MonacoPromptEditor } from './MonacoPromptEditor'
import { AUTHORING_REFERENCE_SAMPLE } from './authoringReference'
import { SkillIconPicker } from './SkillIconPicker'
import { SkillAssistantPanel } from './SkillAssistantPanel'
import { formatFormSchemaPatch, type SkillDraftPatch } from '@/lib/skillPatch'

export type SkillEditorPayload = {
  key: string
  name: string
  description?: string
  icon?: string
  form_schema: string
  prompt_template: string
  is_enabled: boolean
  sort_order: number
}

type SkillDraft = {
  id?: string
  key: string
  name: string
  description: string
  icon: string
  formSchemaText: string
  promptTemplate: string
  isEnabled: boolean
  sortOrder: number
}

type SkillEditorWorkspaceProps = {
  open: boolean
  onClose: () => void
  groups: SkillGroupItem[]
  allSkills: IntelligenceSkill[]
  initialGroupId: string
  initialSkillId?: string | null
  mode: 'create' | 'edit'
  onSaved: () => Promise<void>
  onCreate: (payload: SkillEditorPayload, groupId: string) => Promise<IntelligenceSkill | void>
  onUpdate: (id: string, payload: SkillEditorPayload, groupId: string) => Promise<void>
}

const DEFAULT_FORM_SCHEMA = JSON.stringify(
  {
    fields: [
      { name: 'target', label: '目标', type: 'textarea', placeholder: '请输入目标...', required: true },
    ],
  },
  null,
  2
)

const DEFAULT_PROMPT = `请基于以下信息进行分析：\n\n## 目标\n{{target}}\n\n请给出详细的分析报告。`

function getSkillsInGroup(group: SkillGroupItem, allSkills: IntelligenceSkill[]): IntelligenceSkill[] {
  const map = new Map(allSkills.map((s) => [s.key, s]))
  return group.skill_ids.map((key) => map.get(key)).filter(Boolean) as IntelligenceSkill[]
}

function skillToDraft(skill: IntelligenceSkill): SkillDraft {
  let formSchemaText = DEFAULT_FORM_SCHEMA
  try {
    formSchemaText =
      typeof skill.form_schema === 'string'
        ? JSON.stringify(JSON.parse(skill.form_schema), null, 2)
        : JSON.stringify(skill.form_schema, null, 2)
  } catch {
    formSchemaText = typeof skill.form_schema === 'string' ? skill.form_schema : DEFAULT_FORM_SCHEMA
  }
  return {
    id: skill.id,
    key: skill.key || '',
    name: skill.name || '',
    description: skill.description || '',
    icon: skill.icon || '',
    formSchemaText,
    promptTemplate: skill.prompt_template || DEFAULT_PROMPT,
    isEnabled: skill.is_enabled ?? true,
    sortOrder: skill.sort_order || 0,
  }
}

function emptyDraft(): SkillDraft {
  return {
    key: '',
    name: '',
    description: '',
    icon: '',
    formSchemaText: DEFAULT_FORM_SCHEMA,
    promptTemplate: DEFAULT_PROMPT,
    isEnabled: true,
    sortOrder: 0,
  }
}

function sampleDraft(): SkillDraft {
  return {
    key: AUTHORING_REFERENCE_SAMPLE.key,
    name: AUTHORING_REFERENCE_SAMPLE.name,
    description: AUTHORING_REFERENCE_SAMPLE.description,
    icon: AUTHORING_REFERENCE_SAMPLE.icon,
    formSchemaText: AUTHORING_REFERENCE_SAMPLE.form_schema,
    promptTemplate: AUTHORING_REFERENCE_SAMPLE.prompt_template,
    isEnabled: true,
    sortOrder: 0,
  }
}

function parseFormFields(formSchemaText: string): { fields: FormField[]; error?: string } {
  try {
    const parsed = JSON.parse(formSchemaText)
    const fields = (parsed.fields || []) as FormField[]
    if (!Array.isArray(fields)) return { fields: [], error: 'form_schema 必须包含 fields 数组' }
    return { fields }
  } catch {
    return { fields: [], error: 'form_schema JSON 无效' }
  }
}

function draftsEqual(a: SkillDraft, b: SkillDraft): boolean {
  return (
    a.key === b.key &&
    a.name === b.name &&
    a.description === b.description &&
    a.icon === b.icon &&
    a.formSchemaText === b.formSchemaText &&
    a.promptTemplate === b.promptTemplate &&
    a.isEnabled === b.isEnabled &&
    a.sortOrder === b.sortOrder
  )
}

function mergeFormDataForFields(
  fields: FormField[],
  prev: Record<string, unknown>
): Record<string, unknown> {
  const next = buildInitialFormData(fields)
  for (const field of fields) {
    if (field.name in prev) {
      next[field.name] = prev[field.name]
    }
  }
  return next
}

export function SkillEditorWorkspace({
  open,
  onClose,
  groups,
  allSkills,
  initialGroupId,
  initialSkillId,
  mode,
  onSaved,
  onCreate,
  onUpdate,
}: SkillEditorWorkspaceProps) {
  const { toast } = useToast()
  const [activeGroupId, setActiveGroupId] = useState(initialGroupId)
  const [activeTab, setActiveTab] = useState<'preview' | 'schema' | 'template'>('template')
  const [showFormPreview, setShowFormPreview] = useState(true)
  const [showAiAssistant, setShowAiAssistant] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState<'preview' | 'assistant'>('preview')
  const [saving, setSaving] = useState(false)
  const [running, setRunning] = useState(false)
  const [loadingSkill, setLoadingSkill] = useState(false)

  const [draft, setDraft] = useState<SkillDraft>(emptyDraft())
  const savedSnapshot = useRef<SkillDraft>(emptyDraft())
  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>(undefined)

  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [runResult, setRunResult] = useState<string | null>(null)

  const activeGroup = groups.find((g) => g.id === activeGroupId)
  const groupSkills = activeGroup ? getSkillsInGroup(activeGroup, allSkills) : []
  const isDirty = !draftsEqual(draft, savedSnapshot.current)
  const isCreate = !draft.id
  const showRightPanel = showFormPreview || showAiAssistant

  const assistantContext = useMemo(
    () => ({
      key: draft.key,
      name: draft.name,
      description: draft.description,
      form_schema: draft.formSchemaText,
      prompt_template: draft.promptTemplate,
      active_tab: activeTab,
    }),
    [activeTab, draft.description, draft.formSchemaText, draft.key, draft.name, draft.promptTemplate]
  )

  const assistantSkillContext = useMemo(
    () => ({
      id: draft.id,
      key: draft.key,
      name: draft.name,
      isNew: !draft.id,
    }),
    [draft.id, draft.key, draft.name]
  )

  const { fields, error: schemaError } = useMemo(
    () => parseFormFields(draft.formSchemaText),
    [draft.formSchemaText]
  )

  const resetFormDataFromFields = useCallback((nextFields: FormField[], reset = false) => {
    setFormData((prev) => (reset ? buildInitialFormData(nextFields) : mergeFormDataForFields(nextFields, prev)))
  }, [])

  const applyDraft = useCallback(
    (next: SkillDraft, skillId?: string, resetForm = true) => {
      setDraft(next)
      savedSnapshot.current = { ...next }
      setSelectedSkillId(skillId)
      setRunResult(null)
      const { fields: f } = parseFormFields(next.formSchemaText)
      if (f.length > 0) resetFormDataFromFields(f, resetForm)
    },
    [resetFormDataFromFields]
  )

  const loadDraftFromSkill = useCallback(
    async (skillId: string) => {
      setLoadingSkill(true)
      try {
        const skill = await intelligenceSkillApi.get(skillId)
        applyDraft(skillToDraft(skill), skillId, true)
      } catch (e: unknown) {
        toast({
          type: 'error',
          title: '加载技能失败',
          description: e instanceof Error ? e.message : String(e),
        })
      } finally {
        setLoadingSkill(false)
      }
    },
    [applyDraft, toast]
  )

  const initOnOpen = useCallback(() => {
    setActiveGroupId(initialGroupId)
    if (mode === 'create' && !initialSkillId) {
      applyDraft(emptyDraft(), undefined, true)
    } else if (initialSkillId) {
      void loadDraftFromSkill(initialSkillId)
    } else {
      const group = groups.find((g) => g.id === initialGroupId)
      const skills = group ? getSkillsInGroup(group, allSkills) : []
      if (skills[0]) {
        void loadDraftFromSkill(skills[0].id)
      } else {
        applyDraft(emptyDraft(), undefined, true)
      }
    }
    setActiveTab('template')
    setRunResult(null)
  }, [allSkills, applyDraft, groups, initialGroupId, initialSkillId, loadDraftFromSkill, mode])

  useEffect(() => {
    if (open) initOnOpen()
  }, [open, initOnOpen])

  const patchDraft = (patch: Partial<SkillDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }))
    setRunResult(null)
  }

  const applySkillPatch = useCallback(
    (patch: SkillDraftPatch) => {
      const updates: Partial<SkillDraft> = {}
      if (patch.key !== undefined) updates.key = patch.key
      if (patch.name !== undefined) updates.name = patch.name
      if (patch.description !== undefined) updates.description = patch.description
      if (patch.icon !== undefined) updates.icon = patch.icon
      if (patch.prompt_template !== undefined) updates.promptTemplate = patch.prompt_template

      const formSchemaText = formatFormSchemaPatch(patch.form_schema)
      if (formSchemaText !== undefined) {
        updates.formSchemaText = formSchemaText
      }

      patchDraft(updates)

      if (formSchemaText !== undefined) {
        const { fields: f } = parseFormFields(formSchemaText)
        if (f.length > 0) resetFormDataFromFields(f, false)
      }

      if (
        patch.active_tab === 'schema' ||
        patch.active_tab === 'template' ||
        patch.active_tab === 'preview'
      ) {
        setActiveTab(patch.active_tab)
      }

      toast({ type: 'success', title: '已应用到编辑器' })
    },
    [resetFormDataFromFields, toast]
  )

  const trySwitchSkill = async (skillId: string) => {
    if (skillId === selectedSkillId) return
    if (isDirty) {
      const ok = window.confirm('当前技能有未保存的修改，切换将丢失这些更改。继续？')
      if (!ok) return
    }
    await loadDraftFromSkill(skillId)
  }

  const handleGroupChange = (groupId: string) => {
    if (groupId === activeGroupId) return
    if (isDirty) {
      const ok = window.confirm('当前技能有未保存的修改，切换分组将丢失这些更改。继续？')
      if (!ok) return
    }
    setActiveGroupId(groupId)
    const group = groups.find((g) => g.id === groupId)
    const skills = group ? getSkillsInGroup(group, allSkills) : []
    if (skills[0]) {
      void loadDraftFromSkill(skills[0].id)
    } else {
      applyDraft(emptyDraft(), undefined, true)
    }
  }

  const handleNewSkill = () => {
    if (isDirty) {
      const ok = window.confirm('当前技能有未保存的修改，新建将丢失这些更改。继续？')
      if (!ok) return
    }
    applyDraft(emptyDraft(), undefined, true)
    setActiveTab('schema')
  }

  const handleLoadSample = () => {
    if (isDirty) {
      const ok = window.confirm('加载样例将覆盖当前编辑内容。继续？')
      if (!ok) return
    }
    applyDraft(sampleDraft(), undefined, true)
    setActiveTab('template')
  }

  const validateDraft = (): string | null => {
    if (!draft.key.trim()) return '请填写 Key'
    if (!draft.name.trim()) return '请填写名称'
    if (schemaError) return schemaError
    if (!draft.promptTemplate.trim()) return '请填写提示词模板'
    try {
      JSON.parse(draft.formSchemaText)
    } catch {
      return 'form_schema JSON 无效'
    }
    return null
  }

  const buildPayload = (): SkillEditorPayload => ({
    key: draft.key.trim(),
    name: draft.name.trim(),
    description: draft.description.trim() || undefined,
    icon: draft.icon.trim() || undefined,
    form_schema: JSON.stringify(JSON.parse(draft.formSchemaText)),
    prompt_template: draft.promptTemplate.trim(),
    is_enabled: draft.isEnabled,
    sort_order: draft.sortOrder,
  })

  const handleSave = async () => {
    const err = validateDraft()
    if (err) {
      toast({ type: 'error', title: err })
      return
    }
    if (!activeGroupId) {
      toast({ type: 'error', title: '请选择技能分组' })
      return
    }
    setSaving(true)
    try {
      const payload = buildPayload()
      if (draft.id) {
        await onUpdate(draft.id, payload, activeGroupId)
        savedSnapshot.current = { ...draft }
        toast({ type: 'success', title: '技能已保存' })
      } else {
        const created = await onCreate(payload, activeGroupId)
        if (created?.id) {
          const next = { ...draft, id: created.id }
          setDraft(next)
          savedSnapshot.current = { ...next }
          setSelectedSkillId(created.id)
        } else {
          savedSnapshot.current = { ...draft }
        }
        toast({ type: 'success', title: '技能已创建' })
      }
      await onSaved()
    } catch (e: unknown) {
      toast({
        type: 'error',
        title: '保存失败',
        description: e instanceof Error ? e.message : String(e),
      })
    } finally {
      setSaving(false)
    }
  }

  const handleRun = async () => {
    const err = validateDraft()
    if (err) {
      toast({ type: 'error', title: err })
      return
    }
    setRunning(true)
    try {
      const rendered = renderPrompt(draft.promptTemplate, formData)
      setRunResult(rendered)
      setActiveTab('preview')
      toast({ type: 'success', title: '渲染完成' })
    } catch (e: unknown) {
      toast({
        type: 'error',
        title: '渲染失败',
        description: e instanceof Error ? e.message : String(e),
      })
    } finally {
      setRunning(false)
    }
  }

  const handleClose = () => {
    if (isDirty) {
      const ok = window.confirm('有未保存的修改，确定关闭？')
      if (!ok) return
    }
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        void handleSave()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        void handleRun()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        onOpenChange={handleClose}
        className="max-w-[min(1280px,96vw)] w-full h-[min(820px,92vh)] p-0 flex flex-col overflow-hidden bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
      >
        {/* Toolbar */}
        <header className="flex items-center gap-2 h-12 pl-4 pr-14 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0 min-w-0">
          <div className="flex items-center gap-1 text-xs text-gray-500 min-w-0 shrink">
            <span className="truncate">{activeGroup?.name || '技能分组'}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-gray-900 dark:text-white truncate font-medium">
              {draft.name || '未命名技能'}
            </span>
            {isDirty && <span className="text-amber-500 ml-1 shrink-0">●</span>}
          </div>
          <div className="flex-1 min-w-2" />
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <input
              className="w-28 text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950"
              placeholder="key"
              value={draft.key}
              disabled={!!draft.id}
              onChange={(e) => patchDraft({ key: e.target.value })}
            />
            <input
              className="w-32 text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950"
              placeholder="名称"
              value={draft.name}
              onChange={(e) => patchDraft({ name: e.target.value })}
            />
            <SkillIconPicker value={draft.icon} onChange={(icon) => patchDraft({ icon })} />
            <label className="flex items-center gap-1 text-xs cursor-pointer text-gray-600 shrink-0">
              <input
                type="checkbox"
                checked={draft.isEnabled}
                onChange={(e) => patchDraft({ isEnabled: e.target.checked })}
                className="rounded"
              />
              启用
            </label>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-1">
            <Button variant="outline" size="sm" onClick={handleLoadSample} className="h-8 text-xs shrink-0">
              样例
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="h-8 text-xs shrink-0"
            >
              {running ? <Loader2 size={13} className="animate-spin mr-1" /> : <Play size={13} className="mr-1" />}
              运行
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="h-8 text-xs shrink-0">
              {saving ? <Loader2 size={13} className="animate-spin mr-1" /> : <Save size={13} className="mr-1" />}
              保存
            </Button>
            <Button
              variant={showAiAssistant ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setShowAiAssistant((v) => {
                  const next = !v
                  if (next) setRightPanelTab('assistant')
                  return next
                })
              }}
              className="h-8 text-xs shrink-0"
            >
              <Sparkles size={13} className="mr-1" />
              AI 助手
            </Button>
            <button
              type="button"
              onClick={() => {
                setShowFormPreview((v) => {
                  const next = !v
                  if (next) setRightPanelTab('preview')
                  return next
                })
              }}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 shrink-0 ml-2 mr-1"
              title={showFormPreview ? '隐藏表单预览' : '显示表单预览'}
            >
              {showFormPreview ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            </button>
          </div>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* Left: group + skills */}
          <aside className="w-52 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
            <div className="p-2 border-b border-gray-200 dark:border-gray-800">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">技能分组</label>
              <select
                value={activeGroupId}
                onChange={(e) => handleGroupChange(e.target.value)}
                className="mt-1 w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-3 py-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase flex items-center justify-between">
              <span>技能</span>
              <button
                type="button"
                onClick={handleNewSkill}
                className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                title="新建技能"
              >
                <Plus size={12} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-1">
              {!selectedSkillId && isCreate && (
                <div className="mx-2 mb-1 px-2 py-1.5 rounded text-xs bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 truncate">
                  {draft.name || '新建技能'}
                </div>
              )}
              {groupSkills.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => void trySwitchSkill(s.id)}
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-xs truncate flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900',
                    selectedSkillId === s.id && 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                  )}
                >
                  <FileText size={12} className="shrink-0 opacity-60" />
                  <span className="truncate">{s.name}</span>
                </button>
              ))}
              {groupSkills.length === 0 && (
                <p className="px-3 py-2 text-[10px] text-gray-400">该分组暂无技能</p>
              )}
            </div>
          </aside>

          {/* Center: tabs + editor / preview */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-gray-900/40">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as 'preview' | 'schema' | 'template')}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="flex items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2">
                <TabsList className="h-9 bg-transparent p-0 gap-0">
                  <TabsTrigger
                    value="preview"
                    className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 text-xs px-4 gap-1.5"
                  >
                    <Eye size={13} />
                    预览
                  </TabsTrigger>
                  <TabsTrigger
                    value="schema"
                    className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 text-xs px-4 gap-1.5"
                  >
                    <Braces size={13} />
                    form_schema.json
                  </TabsTrigger>
                  <TabsTrigger
                    value="template"
                    className="h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 text-xs px-4 gap-1.5"
                  >
                    <FileText size={13} />
                    prompt_template
                  </TabsTrigger>
                </TabsList>
                {schemaError && activeTab === 'schema' && (
                  <span className="ml-3 text-[10px] text-red-500">{schemaError}</span>
                )}
                {loadingSkill && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-gray-400 pr-2">
                    <Loader2 size={11} className="animate-spin" />
                    加载中
                  </span>
                )}
                {runResult && activeTab === 'preview' && (
                  <span className="ml-auto text-[10px] text-gray-400 pr-2">Handlebars 本地渲染</span>
                )}
              </div>

              <TabsContent value="preview" className="flex-1 m-0 min-h-0 overflow-hidden p-3">
                <div className="h-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
                    渲染结果
                  </div>
                  <div className="flex-1 overflow-auto">
                    {runResult ? (
                      <table className="w-full text-xs">
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="w-24 shrink-0 px-3 py-2 font-medium text-gray-500 align-top bg-gray-50 dark:bg-gray-900">
                              Prompt
                            </td>
                            <td className="px-3 py-2">
                              <pre className="whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200 leading-relaxed">
                                {runResult}
                              </pre>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium text-gray-500 align-top bg-gray-50 dark:bg-gray-900">
                              表单数据
                            </td>
                            <td className="px-3 py-2">
                              <pre className="whitespace-pre-wrap font-mono text-gray-600 dark:text-gray-400">
                                {JSON.stringify(formData, null, 2)}
                              </pre>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-gray-400">
                        点击「运行」查看渲染后的 Prompt
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schema" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden relative">
                <div className="absolute inset-0 border-t border-gray-200 dark:border-gray-800">
                  <MonacoPromptEditor
                    language="json"
                    value={draft.formSchemaText}
                    onChange={(v) => {
                      patchDraft({ formSchemaText: v })
                      const { fields: f, error } = parseFormFields(v)
                      if (!error && f.length > 0) {
                        setFormData((prev) => mergeFormDataForFields(f, prev))
                      }
                    }}
                    height="100%"
                    theme="custom-light"
                  />
                </div>
              </TabsContent>
              <TabsContent value="template" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden relative">
                <div className="absolute inset-0 border-t border-gray-200 dark:border-gray-800">
                  <MonacoPromptEditor
                    language="plaintext"
                    value={draft.promptTemplate}
                    onChange={(v) => patchDraft({ promptTemplate: v })}
                    formFields={fields}
                    height="100%"
                    theme="custom-light"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: form preview + AI assistant */}
          {showRightPanel && (
            <aside className="w-80 shrink-0 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
              {showFormPreview && showAiAssistant ? (
                <Tabs
                  value={rightPanelTab}
                  onValueChange={(v) => setRightPanelTab(v as 'preview' | 'assistant')}
                  className="flex flex-col flex-1 min-h-0"
                >
                  <TabsList className="w-full h-9 rounded-none border-b border-gray-200 dark:border-gray-800 bg-transparent p-0">
                    <TabsTrigger value="preview" className="flex-1 h-9 rounded-none text-xs">
                      表单预览
                    </TabsTrigger>
                    <TabsTrigger value="assistant" className="flex-1 h-9 rounded-none text-xs gap-1">
                      <Sparkles size={12} />
                      AI 助手
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="flex-1 m-0 min-h-0 flex flex-col data-[state=inactive]:hidden">
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      <input
                        className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950"
                        placeholder="描述"
                        value={draft.description}
                        onChange={(e) => patchDraft({ description: e.target.value })}
                      />
                      <SkillFormFields
                        fields={fields}
                        formData={formData}
                        onChange={(name, value) => {
                          setFormData((prev) => ({ ...prev, [name]: value }))
                          setRunResult(null)
                        }}
                        compact
                      />
                    </div>
                    <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-800 text-[10px] text-gray-400 leading-relaxed">
                      Handlebars：{'{{field}}'} · {'{{#if field}}'} · {'{{#if (eq field "value")}}'}
                    </div>
                  </TabsContent>
                  <TabsContent value="assistant" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden">
                    <SkillAssistantPanel
                      context={assistantContext}
                      skillContext={assistantSkillContext}
                      onApplyPatch={applySkillPatch}
                      className="h-full"
                    />
                  </TabsContent>
                </Tabs>
              ) : showAiAssistant ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 text-[10px] font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1">
                    <Sparkles size={12} />
                    AI 助手
                  </div>
                  <SkillAssistantPanel
                    context={assistantContext}
                    skillContext={assistantSkillContext}
                    onApplyPatch={applySkillPatch}
                    className="flex-1 min-h-0"
                  />
                </>
              ) : (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    表单预览
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    <input
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-950"
                      placeholder="描述"
                      value={draft.description}
                      onChange={(e) => patchDraft({ description: e.target.value })}
                    />
                    <SkillFormFields
                      fields={fields}
                      formData={formData}
                      onChange={(name, value) => {
                        setFormData((prev) => ({ ...prev, [name]: value }))
                        setRunResult(null)
                      }}
                      compact
                    />
                  </div>
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-800 text-[10px] text-gray-400 leading-relaxed">
                    Handlebars：{'{{field}}'} · {'{{#if field}}'} · {'{{#if (eq field "value")}}'}
                  </div>
                </>
              )}
            </aside>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
