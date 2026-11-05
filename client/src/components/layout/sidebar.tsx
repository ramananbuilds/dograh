import { Link } from 'react-router-dom';
import { useSidebarStore } from '@/stores/sidebar-store';
import { SidebarNav } from './sidebar-nav';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export function Sidebar() {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  return (
    <aside
      className={`border-r border-zinc-800/80 bg-[#0e0f12] text-zinc-200 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <Link
          to="/dashboard"
          className="flex h-16 items-center px-4 border-b border-zinc-800/60 gap-3 group"
        >
          {/* ElevenLabs-style sound wave mark */}
          <div className="flex items-center gap-1 h-7 px-2 bg-white/[0.08] border border-white/[0.1] rounded-lg group-hover:border-white/20 transition-colors">
            <span className="w-1 h-3 bg-white rounded-full animate-pulse [animation-duration:1s]" />
            <span className="w-1 h-5 bg-white rounded-full animate-pulse [animation-duration:0.7s]" />
            <span className="w-1 h-3.5 bg-white rounded-full animate-pulse [animation-duration:1.2s]" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                Dograh Voice
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-normal">
                  v1.51
                </span>
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">Conversational Voice AI</span>
            </div>
          )}
        </Link>

        {/* Navigation Groups */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-170px)]">
          <SidebarNav />
        </div>
      </div>

      {/* Bottom Credit Balance (INR) Card */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="text-zinc-400 font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              INR Balance
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-medium">
              Live
            </span>
          </div>
          <div className="text-lg font-bold font-mono tracking-tight text-white mt-1">
            ₹8,450.00
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">~2,010 voice minutes available</p>
          <Link
            to="/usage"
            className="mt-2.5 flex items-center justify-between w-full px-2.5 py-1.5 text-[11px] font-medium rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.05] transition-colors"
          >
            <span>Add Credits</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-400" />
          </Link>
        </div>
      )}
    </aside>
  );
}
