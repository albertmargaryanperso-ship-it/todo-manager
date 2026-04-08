import { CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/utils'
import type { Todo, Status, Category } from '@/types'

interface Stats {
  total: number
  done: number
  urgent: number
  byCategory: Record<Category, number>
  completionRate: number
  
}

interface Props {
  stats: Stats
  todos: Todo[]
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 40, c = 2 * Math.PI * r
  return (
    <svg width={100} height={100} className="-rotate-90">
      <circle cx={50} cy={50} r={r} fill="none" stroke="#27272a" strokeWidth={10} />
      <circle cx={50} cy={50} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
        strokeLinecap="round" className="transition-all duration-700" />
    </svg>
  )
}

const STATUS_LIST: Status[] = ['urgent', 'todo', 'delegated', 'waiting', 'done']

export function StatsView({ stats, todos }: Props) {
  const recent = [...todos].filter(t => t.status === 'done' && t.completedAt).sort((a, b) => (b.completedAt ?? '') > (a.completedAt ?? '') ? 1 : -1).slice(0, 5)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Completion ring */}
      <div className="lg:col-span-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <Ring pct={stats.completionRate} color="#8b5cf6" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-mono text-violet-400">{stats.completionRate}%</span>
            <span className="text-xs text-zinc-500 mt-0.5">complété</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-zinc-400">{stats.done} terminées sur {stats.total} tâches</p>
          {stats.urgent > 0 && (
            <p className="text-sm text-rose-400 font-medium mt-1">⚡ {stats.urgent} urgent{stats.urgent > 1 ? 'es' : ''}</p>
          )}
        </div>
      </div>

      {/* Par catégorie */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Par catégorie</h3>
        {(Object.keys(stats.byCategory) as Category[]).map(cat => {
          const cfg = CATEGORY_CONFIG[cat]
          const pct = stats.total > 0 ? Math.round((stats.byCategory[cat] / stats.total) * 100) : 0
          return (
            <div key={cat} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</span>
                <span className="text-sm font-mono text-zinc-400">{stats.byCategory[cat]}</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 bg-current" style={{ width: `${pct}%`, color: cfg.color.replace('text-', '') === 'blue-400' ? '#60a5fa' : cfg.color.replace('text-', '') === 'emerald-400' ? '#34d399' : '#fbbf24' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Par statut */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-3">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Par statut</h3>
        {STATUS_LIST.map(status => {
          const count = todos.filter(t => t.status === status).length
          const cfg = STATUS_CONFIG[status]
          return (
            <div key={status} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
              <span className="flex items-center gap-2 text-sm text-zinc-300">
                <span>{cfg.emoji}</span>
                {cfg.label}
              </span>
              <span className="text-sm font-mono font-semibold text-zinc-300">{count}</span>
            </div>
          )
        })}
      </div>

      {/* Dernières complétées */}
      {recent.length > 0 && (
        <div className="lg:col-span-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Récemment terminées</h3>
          <div className="space-y-2">
            {recent.map(t => (
              <div key={t.id} className="flex items-center gap-3 py-2 border-b border-zinc-800 last:border-0">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-sm text-zinc-400 flex-1 line-through">{t.title}</span>
                <span className="text-xs font-mono text-zinc-500">{t.completedAt}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_CONFIG[t.category].color} ${CATEGORY_CONFIG[t.category].bg}`}>
                  {CATEGORY_CONFIG[t.category].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
