import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Megaphone,
  BarChart3,
  CreditCard,
  Radio,
  Cpu,
  Wrench,
  BookOpen,
  Mic,
  Key,
  Phone,
  Settings,
} from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { cn } from '@/lib/utils';

interface NavGroup {
  section?: string;
  items: {
    label: string;
    icon: any;
    href: string;
    badge?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    section: 'Workspace',
    items: [
      { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
      { label: 'Conversational Agents', icon: Bot, href: '/agents', badge: 'Active' },
      { label: 'Outbound Campaigns', icon: Megaphone, href: '/campaigns' },
      { label: 'Analytics & Logs', icon: BarChart3, href: '/reports' },
    ],
  },
  {
    section: 'Voice & AI Engines',
    items: [
      { label: 'Voice Engines (TTS)', icon: Radio, href: '/connections' },
      { label: 'Language Models', icon: Cpu, href: '/models' },
      { label: 'Knowledge Base (RAG)', icon: BookOpen, href: '/knowledge-base' },
      { label: 'Audio Prompt Library', icon: Mic, href: '/recordings' },
    ],
  },
  {
    section: 'Platform & Billing',
    items: [
      { label: 'Telephony Trunks', icon: Phone, href: '/telephony' },
      { label: 'Tools & Webhooks', icon: Wrench, href: '/tools' },
      { label: 'Developer API Keys', icon: Key, href: '/api-keys' },
      { label: 'Usage & Invoices', icon: CreditCard, href: '/usage' },
      { label: 'Organization Settings', icon: Settings, href: '/settings' },
    ],
  },
];

export function SidebarNav() {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  return (
    <div className="flex flex-col gap-5 px-3">
      {navGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-1">
          {group.section && !isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
              {group.section}
            </div>
          )}
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
