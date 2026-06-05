import { Crown, Shield, Sun, Moon, Bell, Globe, Database, LogOut, ChevronRight, Sparkles, AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/osint/utils'
import { useOsintAuthStore } from '@/osint/auth'
import { useAppStore } from '@/osint/stores/apiStore'
import { Modal } from '@/osint/components/ui/Dialog'


type SettingSection = 'plan' | 'preferences' | 'notifications' | 'data' | 'prompts'

function DeleteAccountButton() {
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const logout = useOsintAuthStore((s) => s.logout)
  const token = useOsintAuthStore((s) => s.token)

  const handleDelete = async () => {
    if (confirmText !== '删除') return
    setDeleting(true)
    try {
      const API_URL = ((import.meta as any).env?.VITE_API_URL || '')
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        logout()
      }
    } catch (e) {
      console.error(e)
    }
    setDeleting(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm"
      >
        删除
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="">
        <div className="p-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">删除账号</h3>
              <p className="text-sm text-gray-500">此操作不可撤销</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            删除后将永久清除所有数据，包括笔记、积分记录等。
          </p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              请输入 "删除" 确认
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="删除"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleDelete}
              disabled={confirmText !== '删除' || deleting}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {deleting ? '删除中...' : '确认删除'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

function PromptTemplatesSection() {
  const {
    promptTemplates,
    fetchPromptTemplates,
    updatePromptTemplate,
  } = useAppStore()

  const actionDefs = [
    { action_type: 'ppt', name: 'PPT' },
    { action_type: 'dynamic_web', name: '动态网页' },
    { action_type: 'quiz', name: '测验' },
    { action_type: 'mind_map', name: '思维导图' },
    { action_type: 'image', name: '图片' },
  ] as const

  useEffect(() => {
    fetchPromptTemplates()
  }, [fetchPromptTemplates])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Studio 提示词模板</h2>

      <div className="space-y-3">
        {actionDefs.map((def) => {
          const item = promptTemplates.find((it) => it.action_type === def.action_type)
          if (!item) return null
          return (
          <PromptTemplateItem
            key={def.action_type}
            actionType={def.action_type}
            name={def.name}
            prompt={item.prompt}
            onSave={async (payload) => updatePromptTemplate(item.id, payload)}
          />
        )})}
        {promptTemplates.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-500">
            暂无提示词模板，请刷新后重试。
          </div>
        )}
      </div>
    </div>
  )
}

function PromptTemplateItem({
  actionType,
  name,
  prompt,
  onSave,
}: {
  actionType: string
  name: string
  prompt: string
  onSave: (payload: { prompt: string }) => Promise<any>
}) {
  const [editing, setEditing] = useState(false)
  const [draftPrompt, setDraftPrompt] = useState(prompt)

  useEffect(() => {
    setDraftPrompt(prompt)
  }, [prompt])

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <span className="text-xs text-gray-600">{actionType}</span>
      </div>
      <textarea
        value={draftPrompt}
        onChange={(e) => setDraftPrompt(e.target.value)}
        className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={async () => {
            setEditing(true)
            try {
              await onSave({ prompt: draftPrompt.trim() })
            } finally {
              setEditing(false)
            }
          }}
          disabled={editing || !draftPrompt.trim()}
          className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {editing ? '保存中...' : '保存'}
        </button>
      </div>
    </div>
  )
}

export default function Settings() {
  // const { theme, toggleTheme } = useAppStore()
  const [activeSection, setActiveSection] = useState<SettingSection>('plan')
  const [notifications, setNotifications] = useState({
    email: false,
    push: false,
    weekly: false,
  })

  const sections = [
    { id: 'plan' as const, icon: Crown, label: '套餐管理' },
    { id: 'prompts' as const, icon: Sparkles, label: '提示词模板' },
    { id: 'preferences' as const, icon: Shield, label: '偏好设置' },
    { id: 'notifications' as const, icon: Bell, label: '通知设置' },
    { id: 'data' as const, icon: Database, label: '数据管理' },
  ]
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧导航 */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-6 px-4">设置</h1>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors",
                activeSection === section.id
                  ? "bg-gray-100 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-8 w-56 px-4">
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
            <LogOut size={18} />
            <span>退出登录</span>
          </button>
        </div>
      </div>
      
      {/* 右侧内容 */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl">
          {/* 套餐管理 */}
          {activeSection === 'plan' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">套餐管理</h2>
              
              {/* 当前套餐 */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">当前套餐</div>
                    <div className="text-xl font-semibold">免费版</div>
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800">
                    升级套餐
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-semibold">100</div>
                    <div className="text-sm text-gray-500">剩余积分</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">3</div>
                    <div className="text-sm text-gray-500">笔记数</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">5</div>
                    <div className="text-sm text-gray-500">已安装技能</div>
                  </div>
                </div>
              </div>
              
              {/* 套餐对比 */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="font-medium mb-4">套餐对比</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-4">
                    <div className="font-medium">免费版</div>
                    <div className="text-2xl font-semibold my-2">¥0</div>
                    <div className="text-xs text-gray-500">永久免费</div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>✓ 100 积分/月</li>
                      <li>✓ 5 个笔记</li>
                      <li>✓ 基础技能</li>
                    </ul>
                  </div>
                  <div className="border-2 border-gray-900 p-4 relative">
                    <div className="absolute -top-3 left-4 px-2 bg-gray-900 text-white text-xs">
                      推荐
                    </div>
                    <div className="font-medium">专业版</div>
                    <div className="text-2xl font-semibold my-2">¥49</div>
                    <div className="text-xs text-gray-500">每月</div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>✓ 1000 积分/月</li>
                      <li>✓ 无限笔记</li>
                      <li>✓ 所有技能</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="font-medium">团队版</div>
                    <div className="text-2xl font-semibold my-2">¥199</div>
                    <div className="text-xs text-gray-500">每月</div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li>✓ 无限积分</li>
                      <li>✓ 团队协作</li>
                      <li>✓ 优先支持</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 偏好设置 */}
          {activeSection === 'prompts' && (
            <PromptTemplatesSection />
          )}

          {/* 偏好设置 */}
          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">偏好设置</h2>
              
              <div className="bg-white border border-gray-200 divide-y divide-gray-200">
                {/* 主题 */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {1 === 1 ? <Sun size={20} /> : <Moon size={20} />}
                    <div>
                      <p className="font-medium">主题模式</p>
                      <p className="text-sm text-gray-500">选择浅色或深色主题</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className={cn(
                      "relative w-14 h-8 transition-colors rounded-full",
                      false ? 'bg-gray-900' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full transition-transform",
                        false ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                {/* 语言 */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Globe size={20} />
                    <div>
                      <p className="font-medium">语言</p>
                      <p className="text-sm text-gray-500">界面显示语言</p>
                    </div>
                  </div>
                  <select className="px-4 py-2 border border-gray-300 bg-white">
                    <option>简体中文</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* 通知设置 */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">通知设置</h2>
              
              <div className="bg-white border border-gray-200 divide-y divide-gray-200">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">邮件通知</p>
                    <p className="text-sm text-gray-500">接收重要更新邮件</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                    className={cn(
                      "relative w-14 h-8 transition-colors rounded-full",
                      notifications.email ? 'bg-gray-900' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full transition-transform",
                        notifications.email ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">推送通知</p>
                    <p className="text-sm text-gray-500">浏览器推送通知</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                    className={cn(
                      "relative w-14 h-8 transition-colors rounded-full",
                      notifications.push ? 'bg-gray-900' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full transition-transform",
                        notifications.push ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">每周摘要</p>
                    <p className="text-sm text-gray-500">每周笔记活动摘要</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, weekly: !notifications.weekly })}
                    className={cn(
                      "relative w-14 h-8 transition-colors rounded-full",
                      notifications.weekly ? 'bg-gray-900' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full transition-transform",
                        notifications.weekly ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* 数据管理 */}
          {activeSection === 'data' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">数据管理</h2>
              
              <div className="bg-white border border-gray-200 divide-y divide-gray-200">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">导出数据</p>
                    <p className="text-sm text-gray-500">导出所有笔记数据</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    导出
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">存储空间</p>
                    <p className="text-sm text-gray-500">已使用 128 MB / 1 GB</p>
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-gray-900" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-red-600">删除账号</p>
                    <p className="text-sm text-gray-500">永久删除账号和所有数据</p>
                  </div>
                  <DeleteAccountButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
