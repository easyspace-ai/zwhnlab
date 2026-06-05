import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { W6StreamEvent } from '../../types'
import type { SubAgentConnection } from '../../hooks/useSubAgentStream'

const STATUS_LABEL: Record<string, string> = {
  idle: '待命',
  running: '运行中',
  done: '已完成',
  error: '出错',
}

const CONN_LABEL: Record<SubAgentConnection, string> = {
  idle: '未连接',
  connecting: '连接中…',
  open: '已连接',
  closed: '已结束',
  error: '连接异常',
}

const TYPE_LABEL: Record<string, string> = {
  log: '日志',
  tool: '工具',
  token: '输出',
  status: '状态',
  done: '完成',
  error: '错误',
}

type SubAgentDrawerProps = {
  open: boolean
  onClose: () => void
  events: W6StreamEvent[]
  status: string
  connection: SubAgentConnection
}

function eventBody(ev: W6StreamEvent): string {
  if (ev.message) return ev.message
  if (ev.token) return ev.token
  if (ev.type === 'done') return '调研完成'
  if (ev.type === 'error') return '执行失败'
  return ''
}

export function SubAgentDrawer({
  open,
  onClose,
  events,
  status,
  connection,
}: SubAgentDrawerProps) {
  const tailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      tailRef.current?.scrollTo({ top: tailRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [events, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="subagent-title"
      >
        <header className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h2 id="subagent-title" className="flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            子 Agent · W6
          </h2>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
              status === 'running'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : status === 'error'
                  ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                  : status === 'done'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {STATUS_LABEL[status] ?? status}
          </span>
          <span className="text-[10px] text-slate-500">{CONN_LABEL[connection]}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            aria-label="关闭"
          >
            <X size={18} />
          </button>
        </header>

        <div ref={tailRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs">
          {events.length === 0 ? (
            <p className="italic text-slate-500">等待 W6 输出…</p>
          ) : (
            events.map((ev, i) => (
              <div
                key={`${ev.timestamp ?? i}-${i}`}
                className="flex gap-2 border-b border-slate-100 py-2 last:border-0 dark:border-slate-800"
              >
                <span className="w-10 shrink-0 text-[10px] font-bold uppercase text-blue-600/90 dark:text-blue-400/90">
                  {TYPE_LABEL[ev.type] ?? ev.type}
                </span>
                <span className="flex-1 break-words text-slate-700 dark:text-slate-300">{eventBody(ev)}</span>
                {ev.progress != null && ev.progress > 0 ? (
                  <span className="shrink-0 text-slate-500">{ev.progress}%</span>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
