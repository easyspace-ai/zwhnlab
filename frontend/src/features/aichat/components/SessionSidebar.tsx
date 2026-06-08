import { MessageSquare, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/osint/utils'

export function SessionSidebar({
  sessions,
  activeId,
  onSelect,
  onRename,
  onDelete,
}: {
  sessions: Array<{ id: string; title: string; created_at: string }>
  activeId?: string
  onSelect: (id: string) => void
  onRename: (id: string) => void
  onDelete: (id: string) => void
}) {
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  return (
    <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2">
      {sorted.length === 0 ? (
        <div className="px-3 py-6 text-center text-xs text-slate-500">暂无会话</div>
      ) : (
        sorted.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            isActive={activeId === session.id}
            onClick={() => onSelect(session.id)}
            onRename={() => onRename(session.id)}
            onDelete={() => onDelete(session.id)}
          />
        ))
      )}
    </div>
  )
}

function SessionRow({
  session,
  isActive,
  onClick,
  onRename,
  onDelete,
}: {
  session: { id: string; title: string }
  isActive: boolean
  onClick: () => void
  onRename: () => void
  onDelete: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer items-center gap-2 rounded-lg border-l-2 border-transparent px-2.5 py-2',
        isActive
          ? 'border-blue-600 bg-blue-50/90 dark:border-blue-500 dark:bg-blue-950/35'
          : 'text-slate-600 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-800/60',
      )}
    >
      <MessageSquare size={13} className="shrink-0" />
      <span className="flex-1 truncate text-[13px]">{session.title}</span>
      <div className="relative opacity-0 group-hover:opacity-100">
        <button type="button" className="p-1" onClick={(e) => { e.stopPropagation(); onRename() }}>
          <Pencil size={12} />
        </button>
        <button type="button" className="p-1" onClick={(e) => { e.stopPropagation(); onDelete() }}>
          <Trash2 size={12} />
        </button>
        <MoreVertical size={12} className="hidden" />
      </div>
    </div>
  )
}
