import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

const PptxgenjsHome = React.lazy(() => import('@/pptxgenjs/pages/PptxgenjsHome'))
const PptxgenjsEditor = React.lazy(() => import('@/pptxgenjs/pages/PptxgenjsEditor'))

export function PptxgenjsRouteShell() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-full min-h-0 items-center justify-center bg-[#faf8f6] text-sm text-slate-500">
          加载 PptxGenJS…
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="p/:projectId" element={<PptxgenjsEditor />} />
          <Route path="*" element={<PptxgenjsHome />} />
        </Routes>
      </div>
    </React.Suspense>
  )
}
