import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Category, Status } from '@/types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const CATEGORY_CONFIG: Record<Category, { label: string; color: string; bg: string }> = {
  pro:     { label: 'Pro',     color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  finance: { label: 'Finance', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  admin:   { label: 'Admin',   color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
}

export const STATUS_CONFIG: Record<Status, { label: string; emoji: string; accent: string; ring: string }> = {
  urgent:    { label: 'Urgent',     emoji: '🔴', accent: 'border-rose-500/30 bg-rose-500/5',    ring: 'ring-rose-500/40' },
  todo:      { label: 'À faire',    emoji: '🟡', accent: 'border-amber-500/30 bg-amber-500/5',  ring: 'ring-amber-500/40' },
  delegated: { label: 'Délégué',   emoji: '👤', accent: 'border-blue-500/30 bg-blue-500/5',    ring: 'ring-blue-500/40' },
  waiting:   { label: 'En attente', emoji: '⏳', accent: 'border-zinc-600/50 bg-zinc-800/50',   ring: 'ring-zinc-500/40' },
  done:      { label: 'Terminé',    emoji: '✅', accent: 'border-emerald-500/30 bg-emerald-500/5', ring: 'ring-emerald-500/40' },
}
