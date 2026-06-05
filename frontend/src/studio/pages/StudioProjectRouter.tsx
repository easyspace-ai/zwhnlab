import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { pptxgenjsApi } from '@/pptxgenjs/lib/pptxgenjsApi'
import { isPptEngine, type PptEngine } from '../lib/pptEngine'
import StudioEditor from './StudioEditor'
import PptxgenjsEditor from '@/pptxgenjs/pages/PptxgenjsEditor'
import { studioHomePath } from '../lib/routes'

export default function StudioProjectRouter() {
  const { projectId } = useParams<{ projectId: string }>()
  const [searchParams] = useSearchParams()
  const engineParam = searchParams.get('engine')
  const [engine, setEngine] = useState<PptEngine | null>(
    isPptEngine(engineParam) ? engineParam : null,
  )
  const [resolving, setResolving] = useState(!isPptEngine(engineParam))

  useEffect(() => {
    if (isPptEngine(engineParam)) {
      setEngine(engineParam)
      setResolving(false)
      return
    }
    if (!projectId) {
      setResolving(false)
      return
    }
    let cancelled = false
    void (async () => {
      try {
        await pptxgenjsApi.getProject(projectId)
        if (!cancelled) setEngine('pptxgenjs')
      } catch {
        if (!cancelled) setEngine('ohmyppt')
      } finally {
        if (!cancelled) setResolving(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [projectId, engineParam])

  if (resolving) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-gray-50 text-sm text-gray-500">
        <Loader2 className="mr-2 animate-spin" size={18} />
        加载项目…
      </div>
    )
  }

  if (engine === 'pptxgenjs' && projectId) {
    return (
      <PptxgenjsEditor
        homePath={studioHomePath()}
        useSlideGlancePreview
      />
    )
  }

  return <StudioEditor />
}
