import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUp, FileUp, Loader2, MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { pptxgenjsApi } from '@/pptxgenjs/lib/pptxgenjsApi'
import { THEME_OPTIONS } from '@/pptxgenjs/lib/themePresets'
import { ohmypptApi } from '../lib/ohmypptApi'
import type { OhMyPptSessionSummary, OhMyPptStyle } from '../lib/ohmypptTypes'
import { PPT_ENGINE_OPTIONS, type PptEngine } from '../lib/pptEngine'
import { studioProjectPath } from '../lib/routes'
import {
  detectUploadedContent,
  readFileAsText,
  validateContentFile,
} from '../lib/contentUpload'
import { PageCountControl } from '../components/PageCountControl'
import {
  needsProductSchemaNormalization,
  normalizeProductSchema,
} from '../lib/normalizeProductSchema'
import {
  clampPageCount,
  OHMY_PAGE_MAX,
  OHMY_PAGE_MIN,
  PPT_PAGE_MAX,
  PPT_PAGE_MIN,
  productSchemaTitle,
  productSchemaToBrief,
  productSchemaToPipelineMarkdown,
  suggestSlideCountFromText,
  type ProductSchema,
} from '../lib/productSchema'

function formatDate(ts?: number) {
  if (!ts) return ''
  try {
    return new Date(ts * 1000).toLocaleDateString('zh-CN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function formatStyleLabel(session: OhMyPptSessionSummary): string | null {
  if (session.styleLabel) {
    return session.styleCategory
      ? `${session.styleLabel} · ${session.styleCategory}`
      : session.styleLabel
  }
  return session.styleId || null
}

type RecentItem =
  | { kind: 'ohmyppt'; session: OhMyPptSessionSummary }
  | {
      kind: 'pptxgenjs'
      id: string
      title: string
      updatedAt: number
    }

function RecentCard({
  item,
  onOpen,
  onRename,
  onDelete,
}: {
  item: RecentItem
  onOpen: () => void
  onRename?: () => void
  onDelete?: () => void
}) {
  if (item.kind === 'pptxgenjs') {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="aspect-[16/10] bg-gradient-to-br from-indigo-800 to-blue-700 p-4">
          <span className="text-lg font-medium text-white line-clamp-2">{item.title}</span>
          <span className="mt-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/90">
            PptxGenJS
          </span>
        </div>
        <div className="px-3 py-2.5">
          <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
          <p className="mt-0.5 text-xs text-gray-400">
            {formatDate(item.updatedAt) ? `编辑于 ${formatDate(item.updatedAt)}` : ''}
          </p>
        </div>
      </button>
    )
  }

  const session = item.session
  const [menuOpen, setMenuOpen] = useState(false)
  const styleLabel = formatStyleLabel(session)

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="aspect-[16/10] bg-gradient-to-br from-violet-800 to-fuchsia-700 p-4">
          <span className="text-lg font-medium text-white line-clamp-2">
            {session.title || '未命名'}
          </span>
          {styleLabel && (
            <span className="mt-2 inline-block max-w-full truncate rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white/90">
              {styleLabel}
            </span>
          )}
        </div>
        <div className="px-3 py-2.5">
          <p className="truncate text-sm font-medium text-gray-900">{session.title || session.id}</p>
          <p className="mt-0.5 text-xs text-gray-400">
            {session.pageCount ? `${session.pageCount} 页` : '0 页'}
            {formatDate(session.updatedAt) ? ` · ${formatDate(session.updatedAt)}` : ''}
          </p>
          {styleLabel && (
            <p className="mt-1 truncate text-[11px] text-violet-600/80">模板：{styleLabel}</p>
          )}
        </div>
      </button>

      <div className="absolute right-2 top-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen((open) => !open)
          }}
          className={cn(
            'rounded-lg bg-black/20 p-1.5 text-white/90 backdrop-blur transition hover:bg-black/30',
            menuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
          aria-label="更多操作"
        >
          <MoreVertical size={14} />
        </button>
        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-10 cursor-default"
              aria-label="关闭菜单"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                  onRename()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={12} /> 重命名
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                  onDelete()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
              >
                <Trash2 size={12} /> 删除
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function StudioHome() {
  const navigate = useNavigate()
  const location = useLocation()
  const fileRef = useRef<HTMLInputElement>(null)
  const [styles, setStyles] = useState<OhMyPptStyle[]>([])
  const [styleId, setStyleId] = useState('')
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [topic, setTopic] = useState('')
  const [mdPreview, setMdPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [pageCount, setPageCount] = useState(8)
  const [pageCountAuto, setPageCountAuto] = useState(true)
  const [productSchema, setProductSchema] = useState<ProductSchema | null>(null)
  const [normalizing, setNormalizing] = useState(false)
  const [normalizeWarnings, setNormalizeWarnings] = useState<string[]>([])
  const [showSchemaPreview, setShowSchemaPreview] = useState(false)
  const [generationMode, setGenerationMode] = useState<PptEngine>('pptxgenjs')
  const [theme, setTheme] = useState('midnight-exec')
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [renameTarget, setRenameTarget] = useState<OhMyPptSessionSummary | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [renameSaving, setRenameSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<OhMyPptSessionSummary | null>(null)
  const [deleteSaving, setDeleteSaving] = useState(false)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const [list, styleList, pptxProjects] = await Promise.all([
        ohmypptApi.listSessions(),
        ohmypptApi.listStyles(),
        pptxgenjsApi.listProjects().catch(() => []),
      ])
      setStyles(styleList)
      if (!styleId && styleList.length > 0) {
        setStyleId(styleList[0].id)
      }
      const merged: RecentItem[] = [
        ...list.map((session) => ({ kind: 'ohmyppt' as const, session })),
        ...pptxProjects.map((p) => ({
          kind: 'pptxgenjs' as const,
          id: p.id,
          title: p.name || p.id,
          updatedAt: Math.floor(new Date(p.updated_at).getTime() / 1000) || 0,
        })),
      ]
      merged.sort((a, b) => {
        const ta = a.kind === 'ohmyppt' ? a.session.updatedAt || 0 : a.updatedAt
        const tb = b.kind === 'ohmyppt' ? b.session.updatedAt || 0 : b.updatedAt
        return tb - ta
      })
      setRecentItems(merged)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }, [styleId])

  useEffect(() => {
    void load()
  }, [load, location.pathname])

  const applySuggestedPageCount = (text: string, schema: ProductSchema | null) => {
    if (!pageCountAuto) return
    const n = suggestSlideCountFromText(
      text,
      schema?.slides.length ?? schema?.total_pages,
    )
    setPageCount(
      generationMode === 'ohmyppt'
        ? clampPageCount(n, OHMY_PAGE_MIN, OHMY_PAGE_MAX)
        : n,
    )
  }

  const handleFile = async (file: File) => {
    const err = validateContentFile(file)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setNormalizeWarnings([])
    setShowSchemaPreview(false)
    setFileName(file.name)
    const text = await readFileAsText(file)
    const detected = detectUploadedContent(text, file.name)

    if (needsProductSchemaNormalization(file.name, text)) {
      setNormalizing(true)
      setProductSchema(null)
      setMdPreview('')
      try {
        const { schema, warnings, skipped } = await normalizeProductSchema(text)
        setProductSchema(schema)
        setNormalizeWarnings(warnings ?? [])
        setTopic(productSchemaTitle(schema).slice(0, 120))
        applySuggestedPageCount(text, schema)
        if (!skipped) setShowSchemaPreview(true)
      } catch (e: unknown) {
        setProductSchema(null)
        setError(e instanceof Error ? e.message : 'Schema 标准化失败')
      } finally {
        setNormalizing(false)
      }
      return
    }

    setProductSchema(detected.productSchema)
    if (detected.productSchema) {
      setMdPreview('')
      setTopic(productSchemaTitle(detected.productSchema).slice(0, 120))
      applySuggestedPageCount(text, detected.productSchema)
    } else {
      setMdPreview(text)
      const firstLine = text.split('\n').find((l) => l.trim())?.replace(/^#+\s*/, '') || ''
      if (firstLine) setTopic(firstLine.slice(0, 120))
      applySuggestedPageCount(text, null)
    }
  }

  const handleRun = async () => {
    if (normalizing) return
    const finalTopic = topic.trim() || fileName.replace(/\.(md|json)$/i, '')
    const content = productSchema || mdPreview.trim() || finalTopic
    if (!content || running) return
    setRunning(true)
    setError('')
    try {
      const schema = productSchema
      const targetPages =
        generationMode === 'ohmyppt'
          ? clampPageCount(pageCount, OHMY_PAGE_MIN, OHMY_PAGE_MAX)
          : clampPageCount(pageCount, PPT_PAGE_MIN, PPT_PAGE_MAX)

      if (generationMode === 'pptxgenjs') {
        const slideHint = `# ${finalTopic}\n\n请围绕「${finalTopic}」生成一份 ${targetPages} 页的可编辑演示大纲与内容。`
        const markdown = schema
          ? productSchemaToPipelineMarkdown(schema)
          : mdPreview.trim() || slideHint
        const res = await pptxgenjsApi.createProject({
          name: fileName.replace(/\.(md|json)$/i, '') || finalTopic || undefined,
          markdown,
          preferences: {
            theme,
            target_slide_count: String(targetPages),
            page_count_mode: pageCountAuto ? 'auto' : 'manual',
          },
          run_pipeline: false,
        })
        navigate(studioProjectPath(res.project.id, 'pptxgenjs'), { state: { autoRun: true } })
        return
      }
      const userMessage = schema
        ? productSchemaToBrief(schema, targetPages)
        : mdPreview.trim() || undefined
      const res = await ohmypptApi.createSession({
        topic: schema ? productSchemaTitle(schema) : finalTopic,
        style_id: styleId || undefined,
        page_count: targetPages,
        locale: 'zh',
        user_message: userMessage,
      })
      const sessionId = res.session.id
      if (!sessionId) throw new Error('创建会话失败')
      navigate(studioProjectPath(sessionId, 'ohmyppt'), { state: { autoRun: true } })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '创建失败')
      setRunning(false)
    }
  }

  const handleRenameConfirm = async () => {
    if (!renameTarget) return
    const title = renameValue.trim()
    if (!title) {
      setError('名称不能为空')
      return
    }
    setRenameSaving(true)
    setError('')
    try {
      await ohmypptApi.updateSessionTitle(renameTarget.id, title)
      setRenameTarget(null)
      setRenameValue('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '重命名失败')
    } finally {
      setRenameSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleteSaving(true)
    setError('')
    try {
      await ohmypptApi.deleteSession(deleteTarget.id)
      setDeleteTarget(null)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '删除失败')
    } finally {
      setDeleteSaving(false)
    }
  }

  return (
    <div className="min-h-0 h-full overflow-auto bg-[#faf8f6]">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-300 via-fuchsia-200 to-orange-200 px-4 pb-32 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">AI 幻灯片</h1>
          <p className="mt-2 text-sm text-gray-700/80">
            输入主题或上传 Markdown / 产品 schema（JSON），选择生成方式创建演示稿
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-3 py-2 shadow-lg shadow-violet-900/5 backdrop-blur">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              title="上传 .md 或 .json"
            >
              <Plus size={18} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".md,.json,text/markdown,application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void handleFile(f)
              }}
            />
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="输入演示主题…"
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              disabled={(!topic.trim() && !mdPreview.trim() && !productSchema) || running || normalizing}
              onClick={() => void handleRun()}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                (topic.trim() || mdPreview.trim() || productSchema) && !running && !normalizing
                  ? 'bg-gray-900 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-300',
              )}
            >
              {running ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 text-gray-700">
              生成方式
              <select
                value={generationMode}
                onChange={(e) => setGenerationMode(e.target.value as PptEngine)}
                className="max-w-[220px] rounded-md border border-white/50 bg-white/80 px-2 py-1"
              >
                {PPT_ENGINE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <PageCountControl
              value={pageCount}
              min={generationMode === 'ohmyppt' ? OHMY_PAGE_MIN : undefined}
              max={generationMode === 'ohmyppt' ? OHMY_PAGE_MAX : undefined}
              onChange={(n) => {
                setPageCountAuto(false)
                setPageCount(n)
              }}
              disabled={running || normalizing}
            />
            <label className="flex items-center gap-1 text-gray-600">
              <input
                type="checkbox"
                checked={pageCountAuto}
                disabled={running || normalizing}
                onChange={(e) => {
                  setPageCountAuto(e.target.checked)
                  if (e.target.checked) {
                    applySuggestedPageCount(mdPreview, productSchema)
                  }
                }}
                className="rounded border-gray-300"
              />
              按内容自动
            </label>
            {generationMode === 'ohmyppt' ? (
              <label className="flex items-center gap-1.5 text-gray-700">
                风格
                <select
                  value={styleId}
                  onChange={(e) => setStyleId(e.target.value)}
                  className="max-w-[200px] rounded-md border border-white/50 bg-white/80 px-2 py-1"
                >
                  {styles.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                      {s.category ? ` · ${s.category}` : ''}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="flex items-center gap-1.5 text-gray-700">
                主题
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="max-w-[200px] rounded-md border border-white/50 bg-white/80 px-2 py-1"
                >
                  {THEME_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {normalizing && (
            <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-violet-800">
              <Loader2 size={14} className="animate-spin" />
              AI 正在识别并转换为标准 schema…
            </p>
          )}
          {fileName && (
            <p className="mt-2 text-center text-xs text-gray-600">
              已选文件：{fileName}
              {productSchema ? ` · 标准 schema ${productSchema.slides.length} 页` : ''}
            </p>
          )}
          {normalizeWarnings.length > 0 && (
            <p className="mt-1 text-center text-xs text-amber-700">
              {normalizeWarnings.slice(0, 3).join(' · ')}
            </p>
          )}
          {productSchema && (
            <div className="mx-auto mt-2 max-w-xl text-center text-xs">
              <button
                type="button"
                className="text-violet-700 underline-offset-2 hover:underline"
                onClick={() => setShowSchemaPreview((v) => !v)}
              >
                {showSchemaPreview ? '隐藏' : '预览'}标准化 JSON
              </button>
              {showSchemaPreview && (
                <pre className="mt-2 max-h-48 overflow-auto rounded-lg border border-white/60 bg-white/90 p-2 text-left text-[10px] text-gray-700">
                  {JSON.stringify(productSchema, null, 2)}
                </pre>
              )}
            </div>
          )}
          {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
        </div>
      </div>

      <div className="relative -mt-20 mx-auto max-w-5xl rounded-t-3xl bg-[#faf8f6] px-4 pb-16 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">最近会话</h2>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
          >
            <FileUp size={14} /> 上传 MD / JSON
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-sm text-gray-400">
            <Loader2 className="mr-2 animate-spin" size={16} /> 加载中…
          </div>
        ) : recentItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
            暂无会话，输入主题开始创建
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentItems.map((item) =>
              item.kind === 'pptxgenjs' ? (
                <RecentCard
                  key={`pptx-${item.id}`}
                  item={item}
                  onOpen={() => navigate(studioProjectPath(item.id, 'pptxgenjs'))}
                />
              ) : (
                <RecentCard
                  key={`ohm-${item.session.id}`}
                  item={item}
                  onOpen={() => navigate(studioProjectPath(item.session.id, 'ohmyppt'))}
                  onRename={() => {
                    setRenameTarget(item.session)
                    setRenameValue(item.session.title || '')
                  }}
                  onDelete={() => setDeleteTarget(item.session)}
                />
              ),
            )}
          </div>
        )}
      </div>

      <Dialog open={!!renameTarget} onOpenChange={(open) => !open && setRenameTarget(null)}>
        <DialogContent onOpenChange={() => setRenameTarget(null)} className="max-w-md">
          <DialogHeader>
            <DialogTitle>重命名项目</DialogTitle>
          </DialogHeader>
          <input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            maxLength={120}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400"
            placeholder="输入项目名称"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              取消
            </Button>
            <Button disabled={renameSaving || !renameValue.trim()} onClick={() => void handleRenameConfirm()}>
              {renameSaving ? '保存中…' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除项目？</AlertDialogTitle>
            <AlertDialogDescription>
              将永久删除「{deleteTarget?.title || deleteTarget?.id}」及其所有页面文件，此操作不可恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => void handleDeleteConfirm()}
            >
              {deleteSaving ? '删除中…' : '删除'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
