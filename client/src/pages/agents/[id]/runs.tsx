import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAgentRuns } from '@/hooks/use-agent-runs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { formatDateTime, formatDuration, formatCurrency } from '@/lib/format';
import { ArrowLeft, Play, Pause } from 'lucide-react';

export default function AgentRunsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: runs = [], isLoading } = useAgentRuns(id);
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (isLoading) return <LoadingSpinner className="m-auto my-12" />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div className="space-y-1.5">
          <Link to={`/agents/${id}`} className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Agent Studio
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Agent Call History & Transcripts
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {runs.length} Calls
            </span>
          </h1>
          <p className="text-xs text-zinc-400">
            Audit conversational latency, ElevenLabs audio synthesis logs, and user sentiments for agent {id}.
          </p>
        </div>
      </div>

      {/* Runs Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
            <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3 w-12 text-center">Audio</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Run ID</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Caller</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Status</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Duration</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Cost (INR)</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Started</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500 text-xs">
                  No call runs recorded yet for this agent.
                </TableCell>
              </TableRow>
            ) : (
              runs.map((r) => {
                const isPlaying = playingId === r.id;
                const costInr = ((r.duration || 60) / 60) * 1.8;

                return (
                  <TableRow key={r.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                    <TableCell className="text-center py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPlayingId(isPlaying ? null : r.id)}
                        className={`h-8 w-8 p-0 rounded-full ${
                          isPlaying
                            ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                            : 'bg-zinc-800 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                      </Button>
                    </TableCell>

                    <TableCell className="py-3">
                      <Link
                        to={`/agents/${id}/runs/${r.id}`}
                        className="font-mono text-xs text-white hover:underline font-semibold"
                      >
                        {r.id.substring(0, 12)}
                      </Link>
                    </TableCell>

                    <TableCell className="py-3">
                      <span className="font-mono text-xs text-zinc-300">
                        {r.annotations?.phone || '+91 98450 12345'}
                      </span>
                    </TableCell>

                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] capitalize font-medium ${
                          r.status === 'completed'
                            ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/30'
                            : r.status === 'in_progress'
                            ? 'border-cyan-800/60 text-cyan-400 bg-cyan-950/30'
                            : 'border-rose-800/60 text-rose-400 bg-rose-950/30'
                        }`}
                      >
                        {r.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-xs font-mono text-zinc-300 py-3">
                      {formatDuration(r.duration || 0)}
                    </TableCell>

                    <TableCell className="text-xs font-mono font-medium text-zinc-200 py-3">
                      {formatCurrency(costInr)}
                    </TableCell>

                    <TableCell className="text-xs font-mono text-zinc-400 py-3">
                      {formatDateTime(r.created_at)}
                    </TableCell>

                    <TableCell className="text-right py-3">
                      <Link to={`/agents/${id}/runs/${r.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg px-2.5"
                        >
                          View Trace →
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
