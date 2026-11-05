import { Link } from 'react-router-dom';
import { WorkflowDefinition } from '@/types/agent';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowLeft, Mic } from 'lucide-react';

export function AgentHeader({ agent }: { agent: WorkflowDefinition }) {
  return (
    <div className="space-y-3 pb-5 border-b border-zinc-800/80">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <Link to="/agents" className="hover:text-white flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Agents
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-600" />
        <span className="text-zinc-200 font-medium truncate max-w-xs">{agent.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white">{agent.name}</h1>
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {agent.description || 'Configured with ElevenLabs natural dialogue pipeline.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs"
          >
            Save Draft
          </Button>
          <Button
            size="sm"
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold rounded-xl text-xs px-4 shadow-sm"
          >
            Publish Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
