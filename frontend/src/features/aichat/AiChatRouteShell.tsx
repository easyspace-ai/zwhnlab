import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useOsintAuth } from '@/osint/auth'
import { DialogProvider } from '@/osint/components/ui/Dialog'
import { ToastProvider } from '@/osint/components/ui/Feedback'

const AiChatHome = React.lazy(() => import('./pages/AiChatHome'))

export function AiChatRouteShell() {
  const { user, ready } = useOsintAuth()

  if (!ready) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center text-sm text-slate-500">
        加载中…
      </div>
    )
  }
  if (!user) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center text-sm text-red-600">
        未登录或会话已失效，请返回重新登录。
      </div>
    )
  }

  return (
    <DialogProvider>
      <ToastProvider>
        <React.Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-slate-500">加载 AI 研究…</div>}>
          <div className="flex h-full min-h-0 flex-1 flex-col">
            <Routes>
              <Route path="sessions/:sessionId" element={<AiChatHome />} />
              <Route path="*" element={<AiChatHome />} />
            </Routes>
          </div>
        </React.Suspense>
      </ToastProvider>
    </DialogProvider>
  )
}
