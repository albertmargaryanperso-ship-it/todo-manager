import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex bg-[#09090b] text-zinc-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-[#09090b] via-[#09090b] to-[#0f0f13] relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
