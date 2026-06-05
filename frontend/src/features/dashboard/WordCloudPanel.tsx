import { useState } from 'react'
import { Loader2, RefreshCw, LayoutGrid, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GROUP_COLORS, GROUP_LABELS, WORD_CLOUD_GROUPS, type WordCloudWord } from '@/lib/dashboardApi'
import { WordCloudFlat } from './WordCloudFlat'
import { WordCloudGlobeView } from './WordCloudGlobe'

export type WordCloudStyle = 'flat' | 'globe'

interface WordCloudPanelProps {
  words: WordCloudWord[]
  loading: boolean
  error: string | null
  itemCount?: number
  onRefresh: () => void
  refreshing?: boolean
  onWordClick?: (word: string) => void
}

export function WordCloudPanel({
  words,
  loading,
  error,
  itemCount,
  onRefresh,
  refreshing,
  onWordClick,
}: WordCloudPanelProps) {
  const [style, setStyle] = useState<WordCloudStyle>('flat')

  const toolbar = (
    <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
      {itemCount != null && (
        <span className="text-[10px] text-slate-500">近24h · {itemCount} 条</span>
      )}
      <div className="flex rounded-md border border-slate-700 bg-slate-900/80 p-0.5">
        <button
          type="button"
          title="平面词云"
          onClick={() => setStyle('flat')}
          className={cn(
            'flex h-6 items-center gap-1 rounded px-2 text-[10px]',
            style === 'flat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200',
          )}
        >
          <LayoutGrid className="h-3 w-3" />
          平面
        </button>
        <button
          type="button"
          title="球面词云"
          onClick={() => setStyle('globe')}
          className={cn(
            'flex h-6 items-center gap-1 rounded px-2 text-[10px]',
            style === 'globe' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200',
          )}
        >
          <Globe2 className="h-3 w-3" />
          球体
        </button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={refreshing || loading}
        className="h-7 w-7 p-0 text-slate-400 hover:text-slate-200"
        title="刷新词云"
      >
        {refreshing || loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  )

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#0b0e14]">
      {toolbar}
      <div className="flex-1 min-h-0 pt-1">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center px-4 text-center text-[12px] text-red-400">
            {error}
          </div>
        ) : words.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[12px] text-slate-500">
            近 24 小时暂无足够文本生成词云
          </div>
        ) : style === 'flat' ? (
          <WordCloudFlat words={words} onWordClick={onWordClick} />
        ) : (
          <WordCloudGlobeView words={words} onWordClick={onWordClick} />
        )}
      </div>
      <div className="shrink-0 border-t border-slate-800 px-3 py-1.5">
        <div className="mb-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
          {WORD_CLOUD_GROUPS.map((group) => (
            <span key={group} className="inline-flex items-center gap-1 text-[9px] text-slate-500">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: GROUP_COLORS[group] }}
              />
              {GROUP_LABELS[group]}
            </span>
          ))}
        </div>
        <p className="text-center text-[10px] text-slate-600">
          {style === 'flat' ? '拖拽平移 · 滚轮缩放 · 双击复位 · 点击词条搜索' : '拖拽旋转 · 滚轮缩放 · 点击词条搜索'}
        </p>
      </div>
    </div>
  )
}
