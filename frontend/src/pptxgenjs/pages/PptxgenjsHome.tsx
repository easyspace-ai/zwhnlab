import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUp, FileUp, Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pptxgenjsApi, type PptxgenjsProject } from '../lib/pptxgenjsApi'
import { pptxgenjsProjectPath } from '../lib/routes'
import { readFileAsText, validateMdFile } from '@/studio/lib/mdUpload'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('zh-CN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

import { THEME_OPTIONS } from '../lib/themePresets'

export default function PptxgenjsHome() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [projects, setProjects] = useState<PptxgenjsProject[]>([])
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [topic, setTopic] = useState('')
  const [mdPreview, setMdPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [theme, setTheme] = useState('midnight-exec')

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true)
      const list = await pptxgenjsApi.listProjects()
      setProjects(list)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProjects()
  }, [loadProjects])

  const handleFile = async (file: File) => {
    const err = validateMdFile(file)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setFileName(file.name)
    const text = await readFileAsText(file)
    setMdPreview(text)
  }

  const content = mdPreview.trim() || topic.trim()

  const handleRun = async () => {
    if (!content || running) return
    setRunning(true)
    setError('')
    try {
      const markdown =
        mdPreview.trim() ||
        `# ${topic.trim()}\n\n请围绕「${topic.trim()}」生成一份 10–15 页的可编辑演示大纲与内容。`
      const name = fileName.replace(/\.md$/i, '') || topic.trim() || undefined
      const res = await pptxgenjsApi.createProject({
        name,
        markdown,
        preferences: { theme },
        run_pipeline: false,
      })
      navigate(pptxgenjsProjectPath(res.project.id), { state: { autoRun: true } })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '创建失败')
      setRunning(false)
    }
  }

  return (
    <div className="min-h-0 h-full overflow-auto bg-[#faf8f6]">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-600 px-4 pb-32 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">PptxGenJS PPT</h1>
          <p className="mt-2 text-sm text-white/85">
            AI 生成 Slide Schema · 浏览器端 PptxGenJS 导出可编辑 PowerPoint
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              title="上传 .md"
            >
              <Plus size={18} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".md,text/markdown"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void handleFile(f)
              }}
            />
            <input
              value={fileName ? '' : topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={fileName || '输入主题，或上传 Markdown…'}
              disabled={Boolean(fileName)}
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:text-gray-500"
            />
            {fileName && (
              <span className="min-w-0 flex-1 truncate text-left text-sm text-gray-800">{fileName}</span>
            )}
            <button
              type="button"
              disabled={!content || running}
              onClick={() => void handleRun()}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                content && !running
                  ? 'bg-gray-900 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-300',
              )}
            >
              {running ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 text-white/90">
              主题
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="rounded-md border border-white/30 bg-white/90 px-2 py-1 text-gray-800"
              >
                {THEME_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && <p className="mt-3 text-center text-sm text-red-200">{error}</p>}
        </div>
      </div>

      <div className="relative -mt-20 mx-auto max-w-5xl rounded-t-3xl bg-[#faf8f6] px-4 pb-16 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">我的 PptxGenJS 项目</h2>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
          >
            <FileUp size={14} /> 上传 MD
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-sm text-gray-400">
            <Loader2 className="mr-2 animate-spin" size={16} /> 加载中…
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
            暂无项目，输入主题或上传 Markdown 开始创建
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(pptxgenjsProjectPath(p.id))}
                className="group overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-indigo-800 to-blue-700 p-4">
                  <span className="text-lg font-medium text-white line-clamp-2">{p.name}</span>
                  <span className="mt-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/90">
                    PptxGenJS
                  </span>
                </div>
                <div className="px-3 py-2.5">
                  <p className="truncate text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-400">Edited {formatDate(p.updated_at)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
