import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Radio, Bell, Bot, Megaphone, Cpu, Wrench, FileText, Phone, ArrowRight, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { UserMenu } from './user-menu';
import { Badge } from '@/components/ui/badge';

interface SearchItem {
  title: string;
  category: string;
  href: string;
  icon: any;
  description?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: 'Overview Dashboard', category: 'Pages', href: '/dashboard', icon: Bot, description: 'Metrics, live pipeline latency, recent runs' },
  { title: 'Conversational Voice Agents', category: 'Agents', href: '/agents', icon: Bot, description: 'Manage and build voice AI agents' },
  { title: 'Create Voice Agent', category: 'Agents', href: '/agents/create', icon: Bot, description: 'Build a new agent workflow' },
  { title: 'Outbound Campaigns', category: 'Campaigns', href: '/campaigns', icon: Megaphone, description: 'Telephony dialing campaigns' },
  { title: 'Analytics & Logs', category: 'Analytics', href: '/reports', icon: FileText, description: 'Call duration, dispositions, latency logs' },
  { title: 'Usage & Billing (INR)', category: 'Billing', href: '/usage', icon: FileText, description: 'Credits, minute consumption, ledger' },
  { title: 'Voice Engines (TTS)', category: 'Models', href: '/connections', icon: Radio, description: 'ElevenLabs, Cartesia, Deepgram keys' },
  { title: 'Language Models', category: 'Models', href: '/models', icon: Cpu, description: 'GPT-4o, Claude 3.5 Sonnet, reasoning models' },
  { title: 'Tools & Functions', category: 'Tools', href: '/tools', icon: Wrench, description: 'HTTP APIs, cal.com, transfer agent webhooks' },
  { title: 'Knowledge Base (RAG)', category: 'Knowledge', href: '/knowledge-base', icon: FileText, description: 'Document sources, vectors, retrieval' },
  { title: 'Audio Library', category: 'Media', href: '/recordings', icon: Radio, description: 'Prerecorded clips, call recordings' },
  { title: 'SIP Telephony Trunks', category: 'Telephony', href: '/telephony', icon: Phone, description: 'Exotel, Twilio, Telnyx gateways' },
  { title: 'Developer API Keys', category: 'Settings', href: '/api-keys', icon: Wrench, description: 'Service keys, SDK authentication' },
];

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'WebRTC Gateway Online',
      message: 'Mumbai & Bangalore edge nodes running with ~110ms TTFB.',
      time: '5m ago',
      unread: true,
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
    },
    {
      id: 'notif_2',
      title: 'ElevenLabs Voice Engine',
      message: 'Voice quota healthy. Pre-recorded audio synthesis ready.',
      time: '24m ago',
      unread: true,
      icon: Info,
      iconColor: 'text-indigo-400',
    },
    {
      id: 'notif_3',
      title: 'Outbound Campaign Update',
      message: 'Completed batch with 98.4% delivery rate.',
      time: '1h ago',
      unread: false,
      icon: AlertCircle,
      iconColor: 'text-zinc-400',
    },
  ]);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Shortcut ⌘K / Ctrl+K focuses input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(href);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800/80 bg-[#0e0f12]/80 backdrop-blur-md px-6 sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-4">
        {/* Normal Inline Search Input with Google-style suggestions dropdown */}
        <div ref={searchContainerRef} className="relative w-80">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-colors">
            <Search className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => {
                if (query.trim()) setIsOpen(true);
              }}
              placeholder="Search agents, calls, models..."
              className="w-full bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <kbd className="ml-auto font-mono text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-700/60 shrink-0">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Inline Dropdown for Matching Results */}
          {isOpen && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#111215] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto p-1.5 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-500">
                  No results found for &ldquo;<span className="text-zinc-300">{query}</span>&rdquo;
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href + item.title}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelect(item.href);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/60 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-7 w-7 rounded-md bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 shrink-0">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                            <span className="truncate">{item.title}</span>
                            <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1 py-0.2 rounded shrink-0">
                              {item.category}
                            </span>
                          </div>
                          {item.description && (
                            <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-300 shrink-0 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })
              )}
            </div>
          )}
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

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            title="Notifications"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors relative cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#0e0f12]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#111215] border border-zinc-800 shadow-2xl p-3 z-50 overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.2 rounded-full font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border transition-colors flex items-start gap-2.5 ${
                        n.unread
                          ? 'bg-zinc-900/80 border-zinc-800/80'
                          : 'bg-transparent border-transparent opacity-75 hover:opacity-100 hover:bg-zinc-900/40'
                      }`}
                    >
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${n.iconColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-medium text-zinc-200 truncate">{n.title}</p>
                          <span className="text-[10px] text-zinc-500 shrink-0 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

        <UserMenu />
      </div>
    </header>
  );
}
