import React from 'react';
import { Search, Bell, Plus, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-transparent backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
        <span className="hover:text-zinc-300 cursor-pointer transition-colors">Workspace</span>
        <span>/</span>
        <span className="text-zinc-200">Frontend Roadmap</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks... (Cmd+K)" 
            className="bg-zinc-900 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all w-64"
          />
        </div>
        
        <button className="text-zinc-400 hover:text-zinc-200 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
        </button>

        <button className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-full p-1.5 transition-colors shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:shadow-[0_0_16px_rgba(99,102,241,0.6)]">
          <Plus className="w-4 h-4" />
        </button>
        
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 cursor-pointer hover:border-white/20 transition-colors">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
