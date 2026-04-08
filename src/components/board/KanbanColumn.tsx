import React from 'react';
import { TaskCard } from './TaskCard';
import type { TaskType } from './TaskCard';
import { MoreHorizontal, Plus } from 'lucide-react';

interface Props {
  title: string;
  tasks: TaskType[];
  accentColor?: string; // Tailwind class like "bg-indigo-500"
}

export function KanbanColumn({ title, tasks, accentColor = 'bg-zinc-500' }: Props) {
  return (
    <div className="flex flex-col w-80 shrink-0 h-full">
      
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1 group">
        <div className="flex items-center gap-2">
          {/* Status Dot */}
          <div className={`w-2 h-2 rounded-full ${accentColor} shadow-[0_0_8px_rgba(255,255,255,0.1)]`} />
          <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">{title}</h2>
          <span className="text-xs font-mono font-medium text-zinc-500 bg-white/5 px-1.5 rounded-md ml-1">{tasks.length}</span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-zinc-500 hover:text-zinc-200 p-1 hover:bg-white/5 rounded transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="text-zinc-500 hover:text-zinc-200 p-1 hover:bg-white/5 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task List Container */}
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-8">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {/* Invisible dropzone spacer at the bottom */}
        <div className="h-safe"></div>
      </div>
    </div>
  );
}
