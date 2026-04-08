import React from 'react';
import { KanbanColumn } from './KanbanColumn';
import { mockData } from '../../data/mock';

export function KanbanBoard() {
  return (
    <div className="h-full flex px-8 py-6 gap-6 overflow-x-auto hide-scrollbar">
      <KanbanColumn 
        title="To Do" 
        tasks={mockData.filter(t => t.status === 'todo')} 
        accentColor="bg-zinc-500" 
      />
      <KanbanColumn 
        title="In Progress" 
        tasks={mockData.filter(t => t.status === 'in-progress')} 
        accentColor="bg-amber-500" 
      />
      <KanbanColumn 
        title="Done" 
        tasks={mockData.filter(t => t.status === 'done')} 
        accentColor="bg-emerald-500" 
      />
    </div>
  );
}
