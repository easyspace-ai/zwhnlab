import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useOsintAuthStore, isTokenExpired } from '@/osint/auth'
import { ErrorBoundary } from '@/osint/components/ErrorBoundary'
import MainLayout from '@/osint/components/layout/MainLayout'
import IntelligenceHome from '@/osint/pages/IntelligenceHome'
import SkillManager from '@/osint/pages/SkillManager'
import Settings from '@/osint/pages/Settings'
import Login from '@/osint/pages/Auth/Login'
import Register from '@/osint/pages/Auth/Register'
import { ToastProvider } from '@/osint/components/ui/Feedback'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useOsintAuthStore((state) => state.token)
  const user = useOsintAuthStore((state) => state.user)
  const ready = useOsintAuthStore((state) => state.ready)
  const lastFailure = useOsintAuthStore((state) => state.lastFailure)
  const hasValidToken = Boolean(token && !isTokenExpired(token))

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        加载中…
      </div>
    )
  }

  if (!hasValidToken) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    if (lastFailure === 'network') {
      return (
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          网络异常，正在恢复会话…
        </div>
      )
    }
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 情报工作台 — 登录后首页 */}
            <Route path="/" element={
              <ProtectedRoute>
                <IntelligenceHome />
              </ProtectedRoute>
            } />
            <Route path="/sessions/:sessionId" element={
              <ProtectedRoute>
                <IntelligenceHome />
              </ProtectedRoute>
            } />

            {/* 技能管理 — 使用 MainLayout */}
            <Route path="/skills" element={
              <ProtectedRoute>
                <MainLayout><SkillManager /></MainLayout>
              </ProtectedRoute>
            } />

            {/* 设置 — 使用 MainLayout */}
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout><Settings /></MainLayout>
              </ProtectedRoute>
            } />

            {/* 其余全部重定向到工作台 */}
            <Route path="*" element={
              <ProtectedRoute>
                <IntelligenceHome />
              </ProtectedRoute>
            } />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ToastProvider>
  )
}

export default App
