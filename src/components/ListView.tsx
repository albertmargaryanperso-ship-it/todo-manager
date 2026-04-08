import { STATUS_CONFIG } from '@/lib/utils'
import { TodoCard } from './TodoCard'
import type { Todo, Status } from '@/types'

const ORDER: Status[] = ['urgent', 'todo', 'delegated', 'waiting', 'done']

interface Props {
  byStatus: Record<Status, Todo[]>
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (todo: Todo) => void
  onStatusChange: (id: number, status: Status) => void
}

export function ListView({ byStatus, onToggle, onDelete, onEdit, onStatusChange }: Props) {
  return (
    <div className="space-y-8">
      {ORDER.map(status => {
        const todos = byStatus[status]
        if (todos.length === 0) return null
        const cfg = STATUS_CONFIG[status]
        return (
          <section key={status}>
            <div className="flex items-center gap-2 mb-3">
              <span>{cfg.emoji}</span>
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">{cfg.label}</h3>
              <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{todos.length}</span>
            </div>
            <div className="space-y-2">
              {todos.map(todo => (
                <TodoCard key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} onStatusChange={onStatusChange} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
