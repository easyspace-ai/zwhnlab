import * as React from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { fetchAdminSettings, updateAdminSettings } from '@/lib/adminApi'

export function SystemSettingsPanel() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [registrationEnabled, setRegistrationEnabled] = React.useState(false)

  React.useEffect(() => {
    void (async () => {
      try {
        const cfg = await fetchAdminSettings()
        setRegistrationEnabled(cfg.registration_enabled)
      } catch (e) {
        toast({
          type: 'error',
          title: '加载设置失败',
          description: e instanceof Error ? e.message : undefined,
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [toast])

  const handleSave = async () => {
    setSaving(true)
    try {
      const cfg = await updateAdminSettings({ registration_enabled: registrationEnabled })
      setRegistrationEnabled(cfg.registration_enabled)
      toast({ type: 'success', title: '设置已保存' })
    } catch (e) {
      toast({
        type: 'error',
        title: '保存失败',
        description: e instanceof Error ? e.message : undefined,
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-500">加载中…</div>
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">系统设置</h1>
      <p className="text-sm text-gray-500 mb-6">控制全局行为，修改后立即生效（无需重启服务）。</p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
            checked={registrationEnabled}
            onChange={(e) => setRegistrationEnabled(e.target.checked)}
          />
          <span>
            <span className="block text-sm font-medium text-gray-900 dark:text-white">允许用户自助注册</span>
            <span className="block text-xs text-gray-500 mt-0.5">
              关闭后，登录页不再提供注册入口，仅管理员可在「用户管理」中创建账号。
            </span>
          </span>
        </label>
        <Button onClick={() => void handleSave()} disabled={saving}>
          {saving ? '保存中…' : '保存设置'}
        </Button>
      </div>
    </div>
  )
}
