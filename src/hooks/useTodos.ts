import { useReducer, useCallback, useMemo } from 'react'
import type { Todo, Status, Category } from '@/types'
import { INITIAL_TODOS } from '@/lib/initialTodos'

const STORAGE_KEY = 'albert-todos-v1'

function loadFromStorage(): Todo[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : null
  } catch {
    return null
  }
}

function save(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

type Action =
  | { type: 'ADD'; todo: Omit<Todo, 'id' | 'createdAt'> }
  | { type: 'UPDATE'; id: number; patch: Partial<Todo> }
  | { type: 'DELETE'; id: number }
  | { type: 'SET_STATUS'; id: number; status: Status }
  | { type: 'TOGGLE_DONE'; id: number }
  | { type: 'MERGE_FROM_CLAUDE'; todos: Todo[] }

function reducer(todos: Todo[], action: Action): Todo[] {
  let next: Todo[]
  const now = new Date().toISOString().slice(0, 10)

  switch (action.type) {
    case 'ADD':
      next = [...todos, { ...action.todo, id: Date.now(), createdAt: now }]
      break
    case 'UPDATE':
      next = todos.map(t => t.id === action.id ? { ...t, ...action.patch } : t)
      break
    case 'DELETE':
      next = todos.filter(t => t.id !== action.id)
      break
    case 'SET_STATUS':
      next = todos.map(t => t.id === action.id ? {
        ...t, status: action.status,
        completedAt: action.status === 'done' ? now : undefined,
      } : t)
      break
    case 'TOGGLE_DONE':
      next = todos.map(t => {
        if (t.id !== action.id) return t
        const isDone = t.status === 'done'
        return { ...t, status: isDone ? ('todo' as Status) : ('done' as Status), completedAt: isDone ? undefined : now }
      })
      break
    case 'MERGE_FROM_CLAUDE': {
      // Add todos from Claude JSON that don't exist locally (new tasks added by Claude)
      const localIds = new Set(todos.map(t => t.id))
      const newFromClaude = action.todos.filter(t => !localIds.has(t.id))
      if (newFromClaude.length === 0) return todos
      next = [...todos, ...newFromClaude]
      break
    }
    default:
      return todos
  }

  save(next)
  return next
}

export interface Filters {
  search: string
  category: Category | 'all'
  status: Status | 'all'
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, undefined, () => loadFromStorage() ?? INITIAL_TODOS)

  const add = useCallback((todo: Omit<Todo, 'id' | 'createdAt'>) => dispatch({ type: 'ADD', todo }), [])
  const update = useCallback((id: number, patch: Partial<Todo>) => dispatch({ type: 'UPDATE', id, patch }), [])
  const remove = useCallback((id: number) => dispatch({ type: 'DELETE', id }), [])
  const setStatus = useCallback((id: number, status: Status) => dispatch({ type: 'SET_STATUS', id, status }), [])
  const toggleDone = useCallback((id: number) => dispatch({ type: 'TOGGLE_DONE', id }), [])
  const mergeFromClaude = useCallback((incoming: Todo[]) => dispatch({ type: 'MERGE_FROM_CLAUDE', todos: incoming }), [])

  const stats = useMemo(() => {
    const total = todos.length
    const done = todos.filter(t => t.status === 'done').length
    const urgent = todos.filter(t => t.status === 'urgent').length
    const byCategory = {
      pro:     todos.filter(t => t.category === 'pro').length,
      finance: todos.filter(t => t.category === 'finance').length,
      admin:   todos.filter(t => t.category === 'admin').length,
    }
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0
    return { total, done, urgent, byCategory, completionRate }
  }, [todos])

  const filtered = useCallback((filters: Filters) =>
    todos.filter(t => {
      if (filters.category !== 'all' && t.category !== filters.category) return false
      if (filters.status !== 'all' && t.status !== filters.status) return false
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    }), [todos])

  return { todos, add, update, remove, setStatus, toggleDone, mergeFromClaude, stats, filtered }
}
