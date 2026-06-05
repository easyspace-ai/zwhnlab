import { useMemo, useState, useEffect } from 'react'
import { Plus, X, Search, ShieldCheck, SearchIcon, Database, Newspaper, Pencil, Trash2, GripVertical, RotateCcw } from 'lucide-react'
import { cn } from '@/osint/utils'
import { useAppStore } from '@/osint/stores/apiStore'
import { useDialog } from '@/osint/components/ui/Dialog'
import type { IntelligenceSkill, FormField } from '@/osint/types'
import { isBuiltinIntelligenceSkill } from '@/osint/constants/builtinIntelligenceSkills'

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck size={16} />,
  Search: <SearchIcon size={16} />,
  Database: <Database size={16} />,
  Newspaper: <Newspaper size={16} />,
}

const defaultFormSchema = JSON.stringify({
  fields: [
    { name: 'target', label: '目标', type: 'textarea', placeholder: '请输入目标...', required: true }
  ]
}, null, 2)

const defaultPromptTemplate = `请基于以下信息进行分析：

## 目标
{{target}}

请给出详细的分析报告。`

function SkillModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  initialData?: IntelligenceSkill
  onSubmit: (data: { key: string; name: string; description?: string; icon?: string; form_schema: string; prompt_template: string; is_enabled: boolean; sort_order: number }) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [formSchema, setFormSchema] = useState(defaultFormSchema)
  const [promptTemplate, setPromptTemplate] = useState(defaultPromptTemplate)
  const [isEnabled, setIsEnabled] = useState(true)
  const [sortOrder, setSortOrder] = useState(0)
  const [schemaError, setSchemaError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    setKey(initialData?.key || '')
    setName(initialData?.name || '')
    setDescription(initialData?.description || '')
    setIcon(initialData?.icon || '')
    try {
      const schema = initialData?.form_schema ? JSON.stringify(JSON.parse(initialData.form_schema), null, 2) : defaultFormSchema
      setFormSchema(schema)
    } catch {
      setFormSchema(initialData?.form_schema || defaultFormSchema)
    }
    setPromptTemplate(initialData?.prompt_template || defaultPromptTemplate)
    setIsEnabled(initialData?.is_enabled ?? true)
    setSortOrder(initialData?.sort_order || 0)
    setSchemaError('')
  }, [isOpen, initialData])

  const validateSchema = (s: string): boolean => {
    try {
      const parsed = JSON.parse(s)
      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        setSchemaError('form_schema 必须包含 fields 数组')
        return false
      }
      for (const f of parsed.fields) {
        if (!f.name || !f.label || !f.type) {
          setSchemaError('每个字段必须包含 name, label, type')
          return false
        }
      }
      setSchemaError('')
      return true
    } catch (e) {
      setSchemaError('无效的 JSON 格式')
      return false
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'create' ? '新增情报技能' : '编辑情报技能'}
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">唯一标识 Key <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={key}
                onChange={e => setKey(e.target.value)}
                disabled={mode === 'edit'}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                placeholder="例如：fact_check"
              />
              <p className="text-xs text-gray-400 mt-1">创建后不可修改</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">显示名称 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                placeholder="例如：事实核查"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图标标识</label>
              <select
                value={icon}
                onChange={e => setIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              >
                <option value="">无图标</option>
                <option value="ShieldCheck">ShieldCheck（核查）</option>
                <option value="Search">Search（搜索）</option>
                <option value="Database">Database（数据库）</option>
                <option value="Newspaper">Newspaper（报纸）</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
              <input
                type="number"
                value={sortOrder}
                onChange={e => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              placeholder="技能的简要描述..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">表单 Schema (JSON) <span className="text-red-500">*</span></label>
            <textarea
              value={formSchema}
              onChange={e => { setFormSchema(e.target.value); validateSchema(e.target.value) }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[160px] resize-none font-mono text-xs"
              placeholder='{"fields":[{"name":"target","label":"目标","type":"textarea","required":true}]}'
            />
            {schemaError && <p className="text-xs text-red-500 mt-1">{schemaError}</p>}
            <p className="text-xs text-gray-400 mt-1">
              支持字段类型：text, textarea, select, multi_select, number, date, checkbox
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">提示词模板 <span className="text-red-500">*</span></label>
            <textarea
              value={promptTemplate}
              onChange={e => setPromptTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[160px] resize-none font-mono text-xs"
              placeholder='Handlebars：{{variable}}、{{#if field}}、{{#if (eq field "value")}}'
            />
            <p className="text-xs text-gray-400 mt-1">
              模板使用{' '}
              <a
                href="https://handlebarsjs.com/zh/guide/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Handlebars
              </a>
              ，在浏览器端渲染。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isEnabled"
              checked={isEnabled}
              onChange={e => setIsEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="isEnabled" className="text-sm text-gray-700">启用此技能</label>
          </div>
        </div>

        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 gap-3 mt-auto">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button
            onClick={async () => {
              if (!key.trim() || !name.trim() || !validateSchema(formSchema) || !promptTemplate.trim()) return
              setSaving(true)
              try {
                await onSubmit({
                  key: key.trim(),
                  name: name.trim(),
                  description: description.trim() || undefined,
                  icon: icon.trim() || undefined,
                  form_schema: JSON.stringify(JSON.parse(formSchema)),
                  prompt_template: promptTemplate.trim(),
                  is_enabled: isEnabled,
                  sort_order: sortOrder,
                })
                onClose()
              } finally {
                setSaving(false)
              }
            }}
            disabled={saving || !key.trim() || !name.trim() || !!schemaError || !promptTemplate.trim()}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:opacity-100 transition-colors shadow-sm"
          >
            {saving ? '保存中...' : mode === 'create' ? '确认创建' : '保存修改'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SkillManager() {
  const {
    intelligenceSkills,
    intelligenceSkillsLoading,
    fetchIntelligenceSkills,
    createIntelligenceSkill,
    updateIntelligenceSkill,
    deleteIntelligenceSkill,
    restoreIntelligenceSkillToDefault,
  } = useAppStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [editingSkill, setEditingSkill] = useState<IntelligenceSkill | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [restoringId, setRestoringId] = useState<string | null>(null)
  const { confirm } = useDialog()

  useEffect(() => {
    fetchIntelligenceSkills()
  }, [fetchIntelligenceSkills])

  const filteredSkills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return intelligenceSkills
    return intelligenceSkills.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      item.key.toLowerCase().includes(q)
    )
  }, [intelligenceSkills, searchQuery])

  const handleDelete = async (skill: IntelligenceSkill) => {
    const confirmed = await confirm({
      title: '删除技能',
      message: `确定要删除 "${skill.name}" 吗？此操作不可恢复。`,
      variant: 'danger',
      confirmText: '删除',
      cancelText: '取消',
    })
    if (confirmed) {
      await deleteIntelligenceSkill(skill.id)
      await fetchIntelligenceSkills()
    }
  }

  const handleRestoreDefault = async (skill: IntelligenceSkill) => {
    const confirmed = await confirm({
      title: '恢复默认',
      message: `将「${skill.name}」的表单与提示词恢复为系统内置版本，你当前的自定义修改会丢失。确定继续？`,
      variant: 'warning',
      confirmText: '恢复默认',
      cancelText: '取消',
    })
    if (!confirmed) return
    setRestoringId(skill.id)
    try {
      await restoreIntelligenceSkillToDefault(skill.id)
      if (editingSkill?.id === skill.id) {
        setEditingSkill(null)
      }
    } finally {
      setRestoringId(null)
    }
  }

  const getFieldCount = (schema: string) => {
    try {
      const parsed = JSON.parse(schema)
      return parsed.fields?.length || 0
    } catch {
      return 0
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">情报技能管理</h1>
          <p className="text-xs text-gray-400 mt-0.5">配置情报分析的表单模板和提示词模板</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={15} />
          <span>新建技能</span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex items-center justify-between py-4 gap-3">
          <div className="text-sm text-gray-500">
            共 <span className="font-semibold text-gray-900">{intelligenceSkills.length}</span> 个技能
          </div>
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索名称/Key/描述"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>

        {intelligenceSkillsLoading ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">加载中...</p>
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="space-y-2">
            {filteredSkills.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200',
                  item.is_enabled
                    ? 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                    : 'border-gray-100 bg-gray-50/50 opacity-60'
                )}
              >
                <div className="text-gray-400">
                  <GripVertical size={14} />
                </div>
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  item.is_enabled ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-400'
                )}>
                  {iconMap[item.icon || ''] || <span className="text-xs font-bold">{item.name.charAt(0)}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] rounded-full">
                      {item.key}
                    </span>
                    {isBuiltinIntelligenceSkill(item.key) && (
                      <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[11px] rounded-full">
                        内置
                      </span>
                    )}
                    {!item.is_enabled && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[11px] rounded-full">
                        已禁用
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{item.description || '无描述'}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-gray-400">
                      {getFieldCount(item.form_schema)} 个表单字段
                    </span>
                    <span className="text-[11px] text-gray-400">
                      提示词 {item.prompt_template.length} 字符
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isBuiltinIntelligenceSkill(item.key) && (
                    <button
                      type="button"
                      onClick={() => handleRestoreDefault(item)}
                      disabled={restoringId === item.id}
                      title="恢复为 data/skills/defaults 中的系统定义"
                      className="px-3 py-1.5 text-xs text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50"
                    >
                      <RotateCcw size={12} className={cn('inline mr-1', restoringId === item.id && 'animate-spin')} />
                      {restoringId === item.id ? '恢复中...' : '恢复默认'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditingSkill(item)}
                    className="px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Pencil size={12} className="inline mr-1" />
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1.5 text-xs text-danger-600 border border-danger-200 rounded-lg hover:bg-danger-50 transition-colors"
                  >
                    <Trash2 size={12} className="inline mr-1" />
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
              <Database size={20} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">
              {searchQuery ? '没有找到匹配的技能' : '暂无情报技能'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                创建第一个技能
              </button>
            )}
          </div>
        )}
      </div>

      <SkillModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        mode="create"
        onSubmit={async (payload) => {
          await createIntelligenceSkill(payload)
          await fetchIntelligenceSkills()
        }}
      />
      <SkillModal
        isOpen={!!editingSkill}
        onClose={() => setEditingSkill(null)}
        mode="edit"
        initialData={editingSkill || undefined}
        onSubmit={async (payload) => {
          if (!editingSkill?.id) return
          await updateIntelligenceSkill(editingSkill.id, payload)
          await fetchIntelligenceSkills()
          setEditingSkill(null)
        }}
      />
    </div>
  )
}
