import React from 'react';
import { Home, CheckSquare, Clock, Settings, Folder, Hash } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', active: false },
  { icon: CheckSquare, label: 'My Tasks', active: true },
  { icon: Clock, label: 'Recent', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const projects = [
  { label: 'Frontend Roadmap', color: 'bg-indigo-500' },
  { label: 'Q3 Marketing', color: 'bg-emerald-500' },
  { label: 'Design System', color: 'bg-rose-500' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0e0e11] border-r border-white/5 flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
            <CheckSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight">Antigravity</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 ml-1 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">Pro</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar py-6">
        <div className="px-3 space-y-0.5">
          {navItems.map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${item.active 
                  ? 'bg-zinc-800/50 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 px-6">
          <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3">Projects</h3>
          <div className="space-y-1 -mx-3">
            {projects.map((p, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all group"
              >
                <div className={`w-2 h-2 rounded-full ${p.color} opacity-70 group-hover:opacity-100 shadow-[0_0_6px_rgba(255,255,255,0.1)]`} />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
