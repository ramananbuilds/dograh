import { useState } from 'react';
import { useCampaignRuns } from '@/hooks/use-campaign-runs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDuration, formatDateTime } from '@/lib/format';
import { Play, Pause, PhoneCall, Radio } from 'lucide-react';

export function CampaignRuns({ campaignId }: { campaignId: string }) {
  const { data: runs = [] } = useCampaignRuns(campaignId);
  const [playingRunId, setPlayingRunId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingRunId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Call Execution Stream</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Live audio recordings and disposition logs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">Showing {runs.length} latest calls</span>
        </div>
      </div>

      <div className="border border-zinc-800/70 rounded-xl overflow-hidden bg-zinc-900/20">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
            <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-2.5 w-10">Audio</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5">Lead / Phone</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5">Agent Variant</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5">Disposition</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5">Duration</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5">Cost (INR)</TableHead>
              <TableHead className="text-zinc-400 text-xs py-2.5 text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runs.map((r) => {
              const isPlaying = playingRunId === r.id;
              const phone = r.annotations?.phone || '+91 98450 12345';
              const disposition = r.annotations?.disposition || (r.status === 'completed' ? 'answered' : 'failed');
              const agent = r.annotations?.agent_version || 'ElevenLabs Turbo v2.5';
              const costInr = r.cost_info?.total_inr ?? ((r.duration || 60) / 60) * 1.8;

              return (
                <TableRow key={r.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/30">
                  <TableCell className="py-2.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => togglePlay(r.id)}
                      className={`h-7 w-7 p-0 rounded-full ${
                        isPlaying
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      }`}
                    >
                      {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
                    </Button>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="font-mono text-xs text-white font-medium flex items-center gap-1.5">
                      <PhoneCall className="h-3 w-3 text-zinc-400" />
                      {phone}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {r.id.substring(0, 14)}</div>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                      <Radio className="h-3 w-3 text-cyan-400" />
                      {agent}
                    </div>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize font-medium ${
                        disposition === 'answered'
                          ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/30'
                          : disposition === 'transferred'
                          ? 'border-blue-800/60 text-blue-400 bg-blue-950/30'
                          : disposition === 'voicemail'
                          ? 'border-amber-800/60 text-amber-400 bg-amber-950/30'
                          : 'border-rose-800/60 text-rose-400 bg-rose-950/30'
                      }`}
                    >
                      {disposition}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs font-mono text-zinc-300 py-2.5">
                    {r.duration ? formatDuration(r.duration) : '0s'}
                  </TableCell>

                  <TableCell className="text-xs font-mono font-medium text-zinc-200 py-2.5">
                    {formatCurrency(costInr)}
                  </TableCell>

                  <TableCell className="text-xs font-mono text-zinc-400 py-2.5 text-right">
                    {formatDateTime(r.created_at)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {playingRunId && (
        <div className="mt-3 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs text-white">
              Playing call audio <strong className="font-mono text-zinc-300">#{playingRunId}</strong>
            </div>
          </div>
          {/* Waveform graphic */}
          <div className="flex items-center gap-1">
            {[40, 75, 95, 60, 30, 80, 100, 50, 85, 45, 90, 65, 35, 70, 95, 40].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-400 rounded-full animate-pulse"
                style={{ height: `${h * 0.2}px`, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPlayingRunId(null)}
            className="text-xs text-zinc-400 hover:text-white h-7 px-2"
          >
            Stop
          </Button>
        </div>
      )}
    </div>
  );
}
