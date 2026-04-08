import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus } from 'lucide-react'
import { cn, STATUS_CONFIG } from '@/lib/utils'
import { TodoCard } from './TodoCard'
import type { Todo, Status } from '@/types'

const COLUMNS: Status[] = ['urgent', 'todo', 'delegated', 'waiting', 'done']

function SortableTodoCard(props: { todo: Todo; onToggle: (id: number) => void; onDelete: (id: number) => void; onEdit: (t: Todo) => void; onStatusChange: (id: number, s: Status) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.todo.id })
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners}>
      <TodoCard {...props} isDragging={isDragging} />
    </div>
  )
}

interface Props {
  byStatus: Record<Status, Todo[]>
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (todo: Todo) => void
  onStatusChange: (id: number, status: Status) => void
  onAddInColumn: (status: Status) => void
}

export function KanbanBoard({ byStatus, onToggle, onDelete, onEdit, onStatusChange, onAddInColumn }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const activeTodo = activeId ? Object.values(byStatus).flat().find(t => t.id === activeId) : null

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as number)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over || active.id === over.id) return
    const overStatus = (Object.keys(byStatus) as Status[]).find(s => byStatus[s].some(t => t.id === over.id))
    if (overStatus) onStatusChange(active.id as number, overStatus)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 h-full">
        {COLUMNS.map(status => {
          const todos = byStatus[status]
          const cfg = STATUS_CONFIG[status]
          return (
            <div key={status} className="flex flex-col gap-3 min-h-64">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span>{cfg.emoji}</span>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{cfg.label}</span>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">{todos.length}</span>
                </div>
                <button onClick={() => onAddInColumn(status)} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors" aria-label="Ajouter">
                  <Plus size={14} />
                </button>
              </div>

              <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div className={cn('flex-1 rounded-xl p-2 space-y-2 min-h-24 transition-all', cfg.accent, 'border border-dashed border-zinc-800')}>
                  {todos.map(todo => (
                    <SortableTodoCard key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} onStatusChange={onStatusChange} />
                  ))}
                  {todos.length === 0 && (
                    <div className="flex items-center justify-center h-16 text-xs text-zinc-600">
                      Glisser ici
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          )
        })}
      </div>

      <DragOverlay>
        {activeTodo && (
          <div className="rotate-2 scale-105 shadow-2xl">
            <TodoCard todo={activeTodo} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} onStatusChange={() => {}} isDragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
