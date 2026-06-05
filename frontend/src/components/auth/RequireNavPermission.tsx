import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { canAccessNavItem } from '@/lib/navPermissions'
import { resolveDefaultHomeForUser } from '@/lib/defaultRoutes'
import { useToast } from '@/components/ui/toast'

type Props = {
  permission: string
  children: React.ReactNode
}

/** Blocks direct URL access when the user lacks the matching menu permission. */
export function RequireNavPermission({ permission, children }: Props) {
  const { user, ready } = useAuth()
  const location = useLocation()
  const { toast } = useToast()
  const notifiedRef = React.useRef(false)

  const allowed = canAccessNavItem(permission, user)

  React.useEffect(() => {
    if (!ready || !user || allowed || notifiedRef.current) return
    notifiedRef.current = true
    toast({
      type: 'warning',
      title: '无权访问该页面',
      description: '已跳转到默认首页',
    })
  }, [ready, user, allowed, toast])

  if (!ready) {
    return (
      <div className="flex h-full min-h-[200px] flex-1 items-center justify-center bg-slate-50 text-slate-500 text-sm dark:bg-slate-950">
        加载中…
      </div>
    )
  }

  if (!allowed) {
    return (
      <Navigate
        to={resolveDefaultHomeForUser(user)}
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <>{children}</>
}
