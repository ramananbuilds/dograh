import { Menu, Search, Radio, Bell } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { UserMenu } from './user-menu';
import { Badge } from '@/components/ui/badge';

export function Topbar() {
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800/80 bg-[#0e0f12]/80 backdrop-blur-md px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Global Search Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 w-64 hover:border-zinc-700 transition-colors cursor-pointer">
          <Search className="h-3.5 w-3.5" />
          <span>Search agents, calls, models...</span>
          <kbd className="ml-auto font-mono text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live Engine Indicator */}
        <Badge
          variant="outline"
          className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-normal py-1"
        >
          <Radio className="h-3 w-3 animate-pulse" />
          <span>WebRTC & SIP Gateway Active</span>
        </Badge>

        <button className="p-2 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
        </button>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

        <UserMenu />
      </div>
    </header>
  );
}
