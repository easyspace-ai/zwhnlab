import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

const PpthtmlHome = React.lazy(() => import('@/ppthtml/pages/PpthtmlHome'))
const PpthtmlEditor = React.lazy(() => import('@/ppthtml/pages/PpthtmlEditor'))

export function PpthtmlRouteShell() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-full min-h-0 items-center justify-center bg-[#faf8f6] text-sm text-slate-500">
          加载 HTML PPT…
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="p/:projectId" element={<PpthtmlEditor />} />
          <Route path="*" element={<PpthtmlHome />} />
        </Routes>
      </div>
    </React.Suspense>
  )
}
