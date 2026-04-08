import React from 'react';
import { AlertCircle, ArrowUpCircle, ArrowDownCircle, CheckSquare, MessageSquare } from 'lucide-react';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskType {
  id: string; // e.g., 'FRONT-123'
  title: string;
  priority: TaskPriority;
  status: 'todo' | 'in-progress' | 'done';
  assigneeAvatar?: string;
  commentsCount?: number;
  subtasks?: { completed: number; total: number };
}

interface Props {
  task: TaskType;
}

const priorityConfig = {
  low: { icon: ArrowDownCircle, color: 'text-blue-400' },
  medium: {icon: ArrowUpCircle, color: 'text-orange-400' },
  high: { icon: ArrowUpCircle, color: 'text-rose-400' },
  urgent: { icon: AlertCircle, color: 'text-rose-500' }
};

export function TaskCard({ task }: Props) {
  const PriorityIcon = priorityConfig[task.priority].icon;
  const priorityColor = priorityConfig[task.priority].color;

  return (
    <div className="group relative bg-[#18181b] border border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:bg-[#1f1f22] hover:border-white/10 transition-all duration-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing">
      
      {/* Decorative top border glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header: ID + Avatar */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] text-zinc-500 font-medium tracking-wider">{task.id}</span>
        {task.assigneeAvatar ? (
          <img src={task.assigneeAvatar} alt="Assignee" className="w-5 h-5 rounded-full border border-white/10" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
            <span className="text-[9px] text-zinc-400 font-semibold">?</span>
          </div>
        )}
      </div>

      {/* Title */}
      <p className="text-sm text-zinc-200 leading-snug font-medium group-hover:text-zinc-100 transition-colors">
        {task.title}
      </p>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          <PriorityIcon className={`w-3.5 h-3.5 ${priorityColor}`} />
          {task.commentsCount !== undefined && task.commentsCount > 0 && (
            <div className="flex items-center gap-1 text-zinc-500 text-xs">
              <MessageSquare className="w-3 h-3" />
              <span>{task.commentsCount}</span>
            </div>
          )}
        </div>
        
        {task.subtasks && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{task.subtasks.completed}/{task.subtasks.total}</span>
          </div>
        )}
      </div>
    </div>
  );
}
