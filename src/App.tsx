import { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Search, LayoutGrid, List, BarChart3, X, RefreshCw } from 'lucide-react'
import { cn, CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/utils'
import { useTodos } from '@/hooks/useTodos'
import { CLAUDE_JSON_URL } from '@/lib/config'
import { KanbanBoard } from '@/components/KanbanBoard'
import { ListView } from '@/components/ListView'
import { StatsView } from '@/components/StatsView'
import { TodoModal } from '@/components/TodoModal'
import type { Todo, Status, Category, View } from '@/types'
import type { Filters } from '@/hooks/useTodos'

const CATEGORIES: (Category | 'all')[] = ['all', 'pro', 'finance', 'admin']
const STATUSES: (Status | 'all')[] = ['all', 'urgent', 'todo', 'delegated', 'waiting', 'done']

export default function App() {
  const { todos, add, update, remove, setStatus, toggleDone, mergeFromClaude, stats, filtered } = useTodos()
  const [view, setView] = useState<View>('kanban')
  const [modal, setModal] = useState<{ open: boolean; todo?: Todo; defaultStatus?: Status }>({ open: false })
  const [filters, setFilters] = useState<Filters>({ search: '', category: 'all', status: 'all' })
  const [showFilters, setShowFilters] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'new' | 'error'>('idle')
  const [newCount, setNewCount] = useState(0)

  // Load from Claude JSON on mount + manual refresh
  const syncFromClaude = useCallback(async (isManual = false) => {
    setSyncStatus('syncing')
    try {
      const res = await fetch(CLAUDE_JSON_URL)
      if (!res.ok) throw new Error('fetch failed')
      const data = (await res.json()) as Todo[]
      const before = todos.length
      mergeFromClaude(data)
      // Count new items added
      const localIds = new Set(todos.map(t => t.id))
      const added = data.filter(t => !localIds.has(t.id)).length
      if (added > 0) {
        setNewCount(added)
        setSyncStatus('new')
        setTimeout(() => setSyncStatus('idle'), 4000)
      } else {
        setSyncStatus('idle')
      }
      void before
    } catch {
      setSyncStatus(isManual ? 'error' : 'idle')
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }, [todos, mergeFromClaude])

  useEffect(() => { void syncFromClaude() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'n') { e.preventDefault(); setModal({ open: true }) }
      if (e.key === '/') { e.preventDefault(); setShowFilters(true) }
      if (e.key === 'r') { e.preventDefault(); void syncFromClaude() }
      if (e.key === '1') setView('kanban')
      if (e.key === '2') setView('list')
      if (e.key === '3') setView('stats')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [syncFromClaude])

  const handleEdit = useCallback((todo: Todo) => setModal({ open: true, todo }), [])
  const handleAddInColumn = useCallback((status: Status) => setModal({ open: true, defaultStatus: status }), [])

  const handleSave = (data: Omit<Todo, 'id' | 'createdAt'>) => {
    if (modal.todo) update(modal.todo.id, data)
    else add(modal.defaultStatus ? { ...data, status: modal.defaultStatus } : data)
  }

  const filteredByStatus = useMemo(() => {
    const list = filtered(filters)
    const map: Record<Status, Todo[]> = { urgent: [], todo: [], delegated: [], waiting: [], done: [] }
    list.forEach(t => map[t.status].push(t))
    return map
  }, [filtered, filters])

  const hasFilters = filters.search || filters.category !== 'all' || filters.status !== 'all'

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col">

      {/* Sync banner */}
      {syncStatus === 'new' && (
        <div className="bg-violet-600/20 border-b border-violet-500/30 px-6 py-2 text-sm text-violet-300 flex items-center gap-2 animate-slide-in">
          <span>✨</span>
          <span>{newCount} nouvelle{newCount > 1 ? 's' : ''} tâche{newCount > 1 ? 's' : ''} ajoutée{newCount > 1 ? 's' : ''} par Claude</span>
        </div>
      )}
      {syncStatus === 'error' && (
        <div className="bg-zinc-800/50 border-b border-zinc-700 px-6 py-2 text-xs text-zinc-500 flex items-center gap-2">
          <span>⚠️</span> Sync JSON indisponible — données locales utilisées
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-base font-semibold tracking-tight">✅ Todo Manager</h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                {stats.done}/{stats.total} terminées · {stats.completionRate}%
                {stats.urgent > 0 && <span className="text-rose-400 ml-2">· {stats.urgent} urgent{stats.urgent > 1 ? 'es' : ''}</span>}
              </p>
            </div>
            <div className="hidden sm:block w-32 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-violet-500 transition-all duration-700" style={{ width: `${stats.completionRate}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sync button */}
            <button onClick={() => void syncFromClaude(true)} title="Sync depuis Claude (R)"
              className={cn('p-2 rounded-xl border transition-all', syncStatus === 'syncing' ? 'border-violet-500/50 text-violet-400 animate-spin' : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300')}>
              <RefreshCw size={15} />
            </button>

            {/* View switcher */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              {([['kanban', LayoutGrid], ['list', List], ['stats', BarChart3]] as const).map(([v, Icon]) => (
                <button key={v} onClick={() => setView(v as View)}
                  className={cn('p-2 rounded-lg transition-all', view === v ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300')}>
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <button onClick={() => setShowFilters(f => !f)}
              className={cn('p-2 rounded-xl border transition-all', hasFilters ? 'border-violet-500 bg-violet-500/10 text-violet-400' : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300')}>
              <Search size={16} />
            </button>

            <button onClick={() => setModal({ open: true })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">Nouvelle tâche</span>
              <kbd className="hidden sm:inline text-xs opacity-60 bg-violet-700 px-1.5 py-0.5 rounded font-mono">N</kbd>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="max-w-screen-2xl mx-auto mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-3 animate-slide-in">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input autoFocus value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                placeholder="Rechercher… (/)"
                className="w-full pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" />
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setFilters(f => ({ ...f, category: c }))}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                    filters.category === c
                      ? c === 'all' ? 'border-violet-500 bg-violet-500/10 text-violet-400' : cn(CATEGORY_CONFIG[c as Category].color, CATEGORY_CONFIG[c as Category].bg)
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-600')}>
                  {c === 'all' ? 'Tout' : CATEGORY_CONFIG[c as Category].label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {STATUSES.map(s => (
                <button key={s} onClick={() => setFilters(f => ({ ...f, status: s }))}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                    filters.status === s
                      ? s === 'all' ? 'border-violet-500 bg-violet-500/10 text-violet-400' : STATUS_CONFIG[s as Status].accent
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-600')}>
                  {s === 'all' ? 'Tous' : `${STATUS_CONFIG[s as Status].emoji} ${STATUS_CONFIG[s as Status].label}`}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button onClick={() => setFilters({ search: '', category: 'all', status: 'all' })}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700 transition-all">
                <X size={12} /> Réinitialiser
              </button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 py-6 overflow-auto">
        {view === 'kanban' && <KanbanBoard byStatus={filteredByStatus} onToggle={toggleDone} onDelete={remove} onEdit={handleEdit} onStatusChange={setStatus} onAddInColumn={handleAddInColumn} />}
        {view === 'list'   && <ListView   byStatus={filteredByStatus} onToggle={toggleDone} onDelete={remove} onEdit={handleEdit} onStatusChange={setStatus} />}
        {view === 'stats'  && <StatsView  stats={stats} todos={todos} />}
      </main>

      <footer className="hidden lg:flex items-center gap-4 px-6 py-2 border-t border-zinc-900 text-xs text-zinc-600 font-mono">
        <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">N</kbd> nouvelle</span>
        <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">R</kbd> sync Claude</span>
        <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">/</kbd> rechercher</span>
        <span><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">1</kbd> kanban <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">2</kbd> liste <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded">3</kbd> stats</span>
      </footer>

      {modal.open && <TodoModal todo={modal.todo} onSave={handleSave} onClose={() => setModal({ open: false })} />}
    </div>
  )
}
