import { useState } from 'react'
import { Trash2, Edit3, CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import { cn, CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/utils'
import type { Todo, Status } from '@/types'

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (todo: Todo) => void
  onStatusChange: (id: number, status: Status) => void
  isDragging?: boolean
}

const STATUS_OPTIONS: Status[] = ['urgent', 'todo', 'delegated', 'waiting', 'done']

export function TodoCard({ todo, onToggle, onDelete, onEdit, onStatusChange, isDragging }: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const cat = CATEGORY_CONFIG[todo.category]
  const st = STATUS_CONFIG[todo.status]
  const isDone = todo.status === 'done'

  return (
    <div className={cn(
      'group relative rounded-xl border p-4 transition-all duration-200 cursor-grab active:cursor-grabbing',
      'bg-zinc-900 hover:bg-zinc-850',
      st.accent,
      isDragging && 'opacity-50 rotate-1 scale-105 shadow-2xl',
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-0.5 flex-shrink-0 text-zinc-500 hover:text-emerald-400 transition-colors"
          aria-label={isDone ? 'Marquer comme à faire' : 'Marquer comme terminé'}
        >
          {isDone
            ? <CheckCircle2 size={18} className="text-emerald-400" />
            : <Circle size={18} />
          }
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium leading-snug', isDone && 'line-through text-zinc-500')}>
            {todo.title}
          </p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', cat.color, cat.bg)}>
              {cat.label}
            </span>
            {todo.assignee && (
              <span className="text-xs text-zinc-400 font-mono">→ {todo.assignee}</span>
            )}
            {todo.completedAt && (
              <span className="text-xs text-zinc-500 font-mono">✓ {todo.completedAt}</span>
            )}
          </div>

          {todo.notes && (
            <p className="text-xs text-zinc-400 mt-2 italic">{todo.notes}</p>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Modifier"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => setShowMenu(m => !m)}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Changer le statut"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
            aria-label="Supprimer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl p-1 min-w-36 animate-slide-in">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => { onStatusChange(todo.id, s); setShowMenu(false) }}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-zinc-700 transition-colors flex items-center gap-2',
                todo.status === s && 'bg-zinc-700'
              )}
            >
              <span>{STATUS_CONFIG[s].emoji}</span>
              <span>{STATUS_CONFIG[s].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
