import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PhoneCall, PhoneForwarded, Voicemail, PhoneMissed, GitFork } from 'lucide-react';

interface VariantStat {
  agentName: string;
  voiceEngine: string;
  version: string;
  targetSplit: string;
  actualSplit: string;
  attempts: number;
  completed: number;
  answeredRate: string;
  avgLatency: string;
}

const SAMPLE_VARIANTS: VariantStat[] = [
  {
    agentName: 'Customer Support Specialist',
    voiceEngine: 'ElevenLabs Turbo v2.5 (Rachel)',
    version: 'v2.1',
    targetSplit: '70%',
    actualSplit: '69.4%',
    attempts: 584,
    completed: 552,
    answeredRate: '94.5%',
    avgLatency: '590ms',
  },
  {
    agentName: 'Customer Support (Challenger)',
    voiceEngine: 'Cartesia Sonic (British Executive)',
    version: 'v1.4',
    targetSplit: '30%',
    actualSplit: '30.6%',
    attempts: 258,
    completed: 242,
    answeredRate: '93.8%',
    avgLatency: '420ms',
  },
];

export function CampaignStats({ campaignId: _campaignId }: { campaignId: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Call Disposition & Split</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Disposition outcomes and multi-agent A/B performance</p>
        </div>
        <Badge variant="outline" className="border-zinc-800 bg-zinc-900/60 text-zinc-300 text-xs">
          A/B Active
        </Badge>
      </div>

      {/* Disposition Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/70">
          <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 mb-1">
            <PhoneCall className="h-3 w-3 text-emerald-400" />
            <span>Answered</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">728</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">86.5% rate</div>
        </div>

        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/70">
          <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 mb-1">
            <PhoneForwarded className="h-3 w-3 text-blue-400" />
            <span>Transferred</span>
          </div>
          <div className="text-xl font-bold text-blue-400">64</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">7.6% rate</div>
        </div>

        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/70">
          <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 mb-1">
            <Voicemail className="h-3 w-3 text-amber-400" />
            <span>Voicemail</span>
          </div>
          <div className="text-xl font-bold text-amber-400">32</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">3.8% rate</div>
        </div>

        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/70">
          <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400 mb-1">
            <PhoneMissed className="h-3 w-3 text-rose-400" />
            <span>Busy / Failed</span>
          </div>
          <div className="text-xl font-bold text-rose-400">18</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">2.1% rate</div>
        </div>
      </div>

      {/* Traffic Split A/B Comparison Table */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
          <GitFork className="h-3.5 w-3.5 text-zinc-400" />
          <span>A/B Traffic Allocation Matrix</span>
        </div>
        <div className="border border-zinc-800/70 rounded-xl overflow-hidden bg-zinc-900/30">
          <Table>
            <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
              <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-2.5">Agent Variant</TableHead>
                <TableHead className="text-zinc-400 text-xs py-2.5">Target</TableHead>
                <TableHead className="text-zinc-400 text-xs py-2.5">Actual</TableHead>
                <TableHead className="text-zinc-400 text-xs py-2.5">Attempts</TableHead>
                <TableHead className="text-zinc-400 text-xs py-2.5">TTFT Latency</TableHead>
                <TableHead className="text-zinc-400 text-xs py-2.5 text-right">Success</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_VARIANTS.map((v) => (
                <TableRow key={v.agentName} className="border-b border-zinc-800/40 hover:bg-zinc-800/30">
                  <TableCell className="py-2.5">
                    <div className="font-medium text-xs text-white">{v.agentName}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{v.voiceEngine} · {v.version}</div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-400 py-2.5">{v.targetSplit}</TableCell>
                  <TableCell className="text-xs font-mono font-semibold text-emerald-400 py-2.5">{v.actualSplit}</TableCell>
                  <TableCell className="text-xs font-mono text-zinc-300 py-2.5">{v.completed} / {v.attempts}</TableCell>
                  <TableCell className="text-xs font-mono text-cyan-400 py-2.5">{v.avgLatency}</TableCell>
                  <TableCell className="text-xs text-emerald-400 font-semibold text-right py-2.5">{v.answeredRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
