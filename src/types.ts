export type Category = 'pro' | 'finance' | 'admin'
export type Status = 'urgent' | 'todo' | 'delegated' | 'waiting' | 'done'

export interface Todo {
  id: number
  title: string
  category: Category
  status: Status
  completedAt?: string
  createdAt: string
  dueDate?: string
  notes?: string
  assignee?: string
}

export interface Column {
  id: Status
  label: string
  emoji: string
  color: string
  accent: string
}

export type View = 'kanban' | 'list' | 'stats'
