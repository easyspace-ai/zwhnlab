import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

/** 预加载 Promise（只触发一次） */
let preloadPromise: Promise<void> | null = null

/**
 * 预加载 SlideGlance 页面及其 WASM 运行时。
 * 建议在侧边栏 hover 到导航项时调用，提前拉取 5MB WASM 和组件代码，
 * 避免用户点击进入页面后还要等待几秒钟。
 */
export function preloadSlideglance(): Promise<void> {
  if (!preloadPromise) {
    preloadPromise = import('@slideglance/core').then(() => {}).catch(() => {})
  }
  return preloadPromise
}

const slideglancePlaygroundPromise = import('@/slideglance/pages/SlideglancePlayground')
const SlideglancePlayground = React.lazy(() => slideglancePlaygroundPromise)

export function SlideglanceRouteShell() {
  const [loadStage, setLoadStage] = React.useState<'code' | 'wasm' | 'ready'>('code')

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      // 等待组件代码
      await slideglancePlaygroundPromise
      if (cancelled) return
      setLoadStage('wasm')

      // 等待 WASM 初始化
      try {
        await import('@slideglance/core')
      } catch {
        // WASM 初始化失败会在实际使用时再次尝试
      }
      if (!cancelled) setLoadStage('ready')
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const stageText: Record<typeof loadStage, string> = {
    code: '加载组件代码…',
    wasm: '初始化 WASM 引擎（约 5 MB，首次较慢）…',
    ready: '准备就绪…',
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex h-full min-h-0 items-center justify-center bg-[#0e0e10] text-sm text-neutral-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 border-2 border-neutral-600 border-t-blue-500 rounded-full animate-spin" />
            <span>{stageText[loadStage]}</span>
          </div>
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="*" element={<SlideglancePlayground />} />
        </Routes>
      </div>
    </React.Suspense>
  )
}
