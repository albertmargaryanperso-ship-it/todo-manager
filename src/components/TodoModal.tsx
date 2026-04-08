import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn, CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/utils'
import type { Todo, Category, Status } from '@/types'

interface Props {
  todo?: Todo
  onSave: (data: Omit<Todo, 'id' | 'createdAt'>) => void
  onClose: () => void
}

const CATEGORIES: Category[] = ['pro', 'finance', 'admin']
const STATUSES: Status[] = ['urgent', 'todo', 'delegated', 'waiting', 'done']

export function TodoModal({ todo, onSave, onClose }: Props) {
  const [title, setTitle] = useState(todo?.title ?? '')
  const [category, setCategory] = useState<Category>(todo?.category ?? 'pro')
  const [status, setStatus] = useState<Status>(todo?.status ?? 'todo')
  const [notes, setNotes] = useState(todo?.notes ?? '')
  const [assignee, setAssignee] = useState(todo?.assignee ?? '')
  const [dueDate, setDueDate] = useState(todo?.dueDate ?? '')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), category, status, notes: notes.trim() || undefined, assignee: assignee.trim() || undefined, dueDate: dueDate || undefined })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-base font-semibold">{todo ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Tâche *</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Description de la tâche…"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Catégorie</label>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map(c => (
                  <button type="button" key={c} onClick={() => setCategory(c)}
                    className={cn('px-3 py-2 rounded-lg text-sm font-medium text-left border transition-all', category === c ? cn(CATEGORY_CONFIG[c].color, CATEGORY_CONFIG[c].bg) : 'border-zinc-700 text-zinc-400 hover:border-zinc-600')}>
                    {CATEGORY_CONFIG[c].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Statut</label>
              <div className="flex flex-col gap-1.5">
                {STATUSES.map(s => (
                  <button type="button" key={s} onClick={() => setStatus(s)}
                    className={cn('px-3 py-2 rounded-lg text-sm font-medium text-left border transition-all flex items-center gap-2', status === s ? STATUS_CONFIG[s].accent : 'border-zinc-700 text-zinc-400 hover:border-zinc-600')}>
                    <span>{STATUS_CONFIG[s].emoji}</span>
                    <span>{STATUS_CONFIG[s].label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(status === 'delegated') && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Assigné à</label>
              <input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Nom…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Date limite</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Contexte, liens, détails…"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all resize-none" />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold transition-colors">
              {todo ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
