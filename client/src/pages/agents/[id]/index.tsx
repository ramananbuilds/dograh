import { useParams, Link } from 'react-router-dom';
import { useAgent } from '@/hooks/use-agents';
import { AgentHeader } from './components/agent-header';
import { PromptEditor } from './components/prompt-editor';
import { VoicePicker } from './components/voice-picker';
import { ModelPicker } from './components/model-picker';
import { ToolSelector } from './components/tool-selector';
import { TestCall } from './components/test-call';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Bot, Clock, Code2, Settings2 } from 'lucide-react';

export default function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: agent, isLoading } = useAgent(id!);

  if (isLoading) return <LoadingSpinner className="m-auto my-16" />;
  if (!agent) return <div className="text-zinc-400 p-8">Voice agent not found.</div>;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <AgentHeader agent={agent} />

      {/* ElevenLabs-style Segment Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 text-xs overflow-x-auto">
        <Link
          to={`/agents/${id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] text-white font-medium border border-white/[0.1] shadow-sm"
        >
          <Bot className="h-3.5 w-3.5 text-indigo-400" />
          <span>Prompt & Persona</span>
        </Link>
        <Link
          to={`/agents/${id}/runs`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Call History</span>
        </Link>
        <Link
          to={`/agents/${id}/embed`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Embed Widget</span>
        </Link>
        <Link
          to={`/agents/${id}/settings`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <Settings2 className="h-3.5 w-3.5" />
          <span>Settings</span>
        </Link>
      </div>

      {/* Main 2-Column Studio Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PromptEditor />
          <ToolSelector />
        </div>
        <div className="space-y-6">
          <TestCall agentId={id!} />
          <VoicePicker />
          <ModelPicker />
        </div>
      </div>
    </div>
  );
}
