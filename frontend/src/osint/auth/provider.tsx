import * as React from 'react'
import { useOsintAuthStore, type OsintAuthStore } from './store'
import type { CurrentUser } from './types'

export type OsintAuthContextValue = Pick<
  OsintAuthStore,
  'user' | 'ready' | 'login' | 'register' | 'logout' | 'refreshMe'
>

const OsintAuthContext = React.createContext<OsintAuthContextValue | null>(null)

export function OsintAuthProvider({ children }: { children: React.ReactNode }) {
  const user = useOsintAuthStore((s) => s.user)
  const ready = useOsintAuthStore((s) => s.ready)
  const login = useOsintAuthStore((s) => s.login)
  const register = useOsintAuthStore((s) => s.register)
  const logout = useOsintAuthStore((s) => s.logout)
  const refreshMe = useOsintAuthStore((s) => s.refreshMe)

  React.useEffect(() => {
    const { ready: isReady, hydrate } = useOsintAuthStore.getState()
    if (!isReady) void hydrate()
  }, [])

  React.useEffect(() => {
    const retry = () => {
      const { token, user, lastFailure, refreshMe, ready } = useOsintAuthStore.getState()
      if (!ready || !token) return
      if (user && lastFailure !== 'network') return
      void refreshMe()
    }
    const onOnline = () => retry()
    const onVisible = () => {
      if (document.visibilityState === 'visible') retry()
    }
    window.addEventListener('online', onOnline)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('online', onOnline)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  const value = React.useMemo<OsintAuthContextValue>(
    () => ({ user, ready, login, register, logout, refreshMe }),
    [user, ready, login, register, logout, refreshMe],
  )

  return <OsintAuthContext.Provider value={value}>{children}</OsintAuthContext.Provider>
}

export function useOsintAuth(): OsintAuthContextValue {
  const ctx = React.useContext(OsintAuthContext)
  if (!ctx) {
    throw new Error('useOsintAuth must be used within OsintAuthProvider')
  }
  return ctx
}

/** Safe hook when provider may be absent (standalone utilities). */
export function useOsintAuthOptional(): OsintAuthContextValue | null {
  return React.useContext(OsintAuthContext)
}

export function useOsintUser(): CurrentUser | null {
  return useOsintAuthStore((s) => s.user)
}
