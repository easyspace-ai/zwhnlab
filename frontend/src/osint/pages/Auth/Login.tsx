import { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useOsintAuthStore } from '@/osint/auth'
import { Eye, EyeOff, ArrowRight, Github, Mail } from 'lucide-react'
import { cn } from '@/osint/utils'
import { LogoMark } from '@/components/Logo'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const login = useOsintAuthStore((s) => s.login)

  useEffect(() => {
    const qs = new URLSearchParams(location.search)
    const reason = qs.get('reason')
    if (reason === 'expired') {
      setError('登录已过期，请重新登录')
    }
  }, [location.search])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setIsLoading(true)
      await login(username, password)
      const qs = new URLSearchParams(location.search)
      const redirect = qs.get('redirect')
      navigate(redirect && redirect.startsWith('/') ? redirect : '/')
    } catch (err: any) {
      setError(err.message || '登录失败，请检查用户名和密码')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧装饰区 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        {/* 装饰元素 */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <LogoMark size="xl" className="rounded-2xl shadow-lg ring-1 ring-white/25 mb-8" />
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            智能情报<br />
            <span className="text-primary-200">分析工作台</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            基于 AI 的开源情报分析系统，助力事实核查、调研报告、资料收集与每日情报简报的高效生成。
          </p>

          {/* 功能点 */}
          <div className="mt-12 space-y-4">
            {[
              '多源事实核查与虚假信息甄别',
              '主题深度调研与关联分析',
              '结构化资料收集与情报简报',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 右侧登录表单 */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-gray-25">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <LogoMark className="rounded-xl shadow-lg shadow-primary-500/25" />
            <span className="text-xl font-bold text-gray-900">OSINT 工作台</span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h2>
            <p className="text-gray-500">登录你的账户开始使用</p>
          </div>
          
          {/* 社交登录 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
              <Github size={18} />
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
              <Mail size={18} />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-25 text-gray-400">或使用邮箱登录</span>
            </div>
          </div>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 bg-danger-50 border border-danger-100 rounded-xl text-sm text-danger-600">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
              <input
                type="text"
                required
                className="input-base"
                placeholder="输入你的用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-base pr-10"
                  placeholder="输入你的密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium transition-all duration-200",
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  登录
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          
        </div>
      </div>
    </div>
  )
}
