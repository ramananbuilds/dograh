import { useState } from 'react';
import { useTools } from '@/hooks/use-tools';
import { Wrench, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ToolSelector() {
  const { tools } = useTools();
  const [activeTools, setActiveTools] = useState<Record<string, boolean>>({
    tool_cal_01: true,
    tool_transfer_03: true,
  });

  const toggleTool = (id: string) => {
    setActiveTools((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Wrench className="h-4 w-4 text-emerald-400" />
          Agent Tools & Actions
        </h3>
        <span className="text-[11px] font-mono text-zinc-400">
          {Object.values(activeTools).filter(Boolean).length} Active
        </span>
      </div>

      <div className="space-y-2.5">
        {tools.map((t) => {
          const isActive = !!activeTools[t.id];

          return (
            <div
              key={t.id}
              onClick={() => toggleTool(t.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isActive
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-zinc-800/70 bg-zinc-900/40 hover:border-zinc-700/70'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-white">{t.name}</span>
                  <Badge
                    variant="outline"
                    className="border-zinc-800 bg-zinc-900 text-zinc-400 text-[9px] uppercase font-mono px-1.5 py-0"
                  >
                    {t.tool_type.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-1">{t.description}</p>
              </div>

              <div
                className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-400 text-zinc-950'
                    : 'border-zinc-700 bg-zinc-800 text-transparent'
                }`}
              >
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
