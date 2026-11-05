import { Link } from 'react-router-dom';
import { useSidebarStore } from '@/stores/sidebar-store';
import { SidebarNav } from './sidebar-nav';
import { Sparkles, ArrowUpRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={`h-screen sticky top-0 shrink-0 border-r border-zinc-800/80 bg-[#0e0f12] text-zinc-200 transition-all duration-300 flex flex-col justify-between overflow-hidden z-30 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header with Integrated Collapse/Expand Toggle */}
        <div
          className={`flex h-16 items-center border-b border-zinc-800/60 shrink-0 px-3.5 ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!isCollapsed ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2.5 group overflow-hidden"
              >
                {/* ElevenLabs-style sound wave mark */}
                <div className="flex items-center gap-1 h-7 px-2 bg-white/[0.08] border border-white/[0.1] rounded-lg group-hover:border-white/20 transition-colors shrink-0">
                  <span className="w-1 h-3 bg-white rounded-full animate-pulse [animation-duration:1s]" />
                  <span className="w-1 h-5 bg-white rounded-full animate-pulse [animation-duration:0.7s]" />
                  <span className="w-1 h-3.5 bg-white rounded-full animate-pulse [animation-duration:1.2s]" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                    Dograh Voice
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-normal">
                      v1.51
                    </span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium truncate">
                    Conversational Voice AI
                  </span>
                </div>
              </Link>

              <button
                onClick={toggle}
                title="Collapse sidebar"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={toggle}
              title="Expand sidebar"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <PanelLeftOpen className="h-4 w-4 text-white" />
            </button>
          )}
        </div>

        {/* Navigation Groups - Independently scrollable within Sidebar */}
        <div className="py-4 overflow-y-auto flex-1 min-h-0">
          <SidebarNav />
        </div>
      </div>

      {/* Bottom Credit Balance (INR) Card */}
      {!isCollapsed ? (
        <div className="p-3 m-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shrink-0">
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
      ) : (
        <div className="p-2 m-2 flex justify-center shrink-0">
          <Link
            to="/usage"
            title="INR Balance: ₹8,450.00"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 hover:border-zinc-700"
          >
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      )}
    </aside>
  );
}
