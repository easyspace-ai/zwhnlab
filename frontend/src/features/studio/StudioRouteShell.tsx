import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

const StudioHome = React.lazy(() => import('@/studio/pages/StudioHome'))
const StudioProjectRouter = React.lazy(() => import('@/studio/pages/StudioProjectRouter'))

export function StudioRouteShell() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-full min-h-0 items-center justify-center bg-[#faf8f6] text-sm text-slate-500">
          加载 PPT Studio…
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="p/:projectId" element={<StudioProjectRouter />} />
          <Route path="*" element={<StudioHome />} />
        </Routes>
      </div>
    </React.Suspense>
  )
}
