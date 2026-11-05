import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AgentSettingsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Top Header */}
      <div className="space-y-1.5 border-b border-zinc-800/80 pb-6">
        <Link to={`/agents/${id}`} className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Agent Studio
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Agent Settings & Safety Controls
        </h1>
        <p className="text-xs text-zinc-400">
          Configure maximum duration cutoffs, silence detection thresholds, and privacy policies.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Turn Execution & Silence Guardrails</h2>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-300">Max Call Duration (Seconds)</Label>
            <Input
              type="number"
              defaultValue={900}
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 rounded-xl h-9"
            />
            <p className="text-[11px] text-zinc-500">
              Calls exceeding this threshold will automatically announce a polite goodbye and hang up.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-300">Silence Timeout Before Prompting (Seconds)</Label>
            <Input
              type="number"
              defaultValue={6}
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 rounded-xl h-9"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-rose-900/30 bg-rose-950/10 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Danger Zone
          </h2>
          <p className="text-xs text-zinc-400">
            Archiving this agent will immediately disconnect any active SIP routing or live campaigns.
          </p>
          <Button
            variant="destructive"
            onClick={() => alert(`Agent ${id} archived.`)}
            className="bg-rose-600 hover:bg-rose-700 text-xs font-semibold h-8 rounded-xl px-4 mt-2"
          >
            Archive Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
