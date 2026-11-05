import { Progress } from '@/components/ui/progress';
import { Campaign } from '@/types/campaign';
import { formatCurrency, formatNumber } from '@/lib/format';
import { Clock, PhoneOutgoing, Zap, IndianRupee } from 'lucide-react';

export function CampaignProgress({ campaign }: { campaign: Campaign }) {
  const total = campaign.total_leads || 1250;
  const completed = campaign.completed_calls || 842;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const pending = Math.max(0, total - completed);
  const estimatedCostInr = completed * 4.2;

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Execution Telemetry</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Live pacing, throughput, and lead queue status</p>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          5 Active Lines
        </span>
      </div>

      {/* Progress Bar & High-Level Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">
            Total Dispatched: <strong className="text-white">{formatNumber(completed)}</strong> /{' '}
            {formatNumber(total)}
          </span>
          <span className="font-mono text-zinc-300 font-bold">{percent}%</span>
        </div>
        <Progress value={percent} className="h-2 bg-zinc-800/80" />
      </div>

      {/* Grid Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <PhoneOutgoing className="h-3 w-3 text-emerald-400" />
            <span>Completed</span>
          </div>
          <div className="text-lg font-bold text-white mt-1">{formatNumber(completed)}</div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <Clock className="h-3 w-3 text-amber-400" />
            <span>Queued / Pending</span>
          </div>
          <div className="text-lg font-bold text-white mt-1">{formatNumber(pending)}</div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <Zap className="h-3 w-3 text-cyan-400" />
            <span>Pacing Rate</span>
          </div>
          <div className="text-lg font-bold text-white mt-1">8 calls/s</div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <IndianRupee className="h-3 w-3 text-zinc-300" />
            <span>Cost (INR)</span>
          </div>
          <div className="text-lg font-bold text-white mt-1">{formatCurrency(estimatedCostInr)}</div>
        </div>
      </div>

      {/* Campaign Window Information */}
      <div className="text-xs text-zinc-400 bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3 flex items-center justify-between">
        <span>Calling Window: <strong>10:00 AM – 07:00 PM IST</strong></span>
        <span>Retry Strategy: <strong>Max 2 retries (45m backoff)</strong></span>
      </div>
    </div>
  );
}
