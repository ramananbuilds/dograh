import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { Input } from '@/components/ui/input';
import { Bot, Plus, Volume2, Cpu, Mic, Search, Radio } from 'lucide-react';
import { useAgents } from '@/hooks/use-agents';

export default function AgentsPage() {
  const { agents, isLoading } = useAgents();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all');

  const filteredAgents = agents.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.description && a.description.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'all') return matchesSearch;
    return matchesSearch && a.status === filter;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Voice Agents
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
              {agents.length} Deployed
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Build, test, and deploy interactive voice agents with ElevenLabs TTS and low-latency LLM reasoning.
          </p>
        </div>
        <Link to="/agents/create">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2">
            <Plus className="h-4 w-4" />
            Create Voice Agent
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search agents by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs bg-[#111215] border-zinc-800 rounded-xl text-zinc-200 placeholder:text-zinc-500"
          />
        </div>

        <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Agents
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'active' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filter === 'draft' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      {filteredAgents.length === 0 && !isLoading ? (
        <EmptyState
          icon={Bot}
          title="No voice agents found"
          description="Create your first voice agent with an ElevenLabs voice and system instructions."
          actionLabel="Create Voice Agent"
          onAction={() => {}}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl flex flex-col justify-between group glow-card"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* ElevenLabs-style Sound Avatar */}
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {agent.name}
                      </CardTitle>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        ID: {agent.id}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={agent.status} />
                </div>
                <CardDescription className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                  {agent.description || 'Voice agent configured with natural dialogue management.'}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-3 space-y-2">
                {/* Tech Profile Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal border-zinc-800 bg-zinc-900/80 text-zinc-300 gap-1 rounded-md py-0.5"
                  >
                    <Volume2 className="h-2.5 w-2.5 text-indigo-400" />
                    ElevenLabs Turbo
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal border-zinc-800 bg-zinc-900/80 text-zinc-300 gap-1 rounded-md py-0.5"
                  >
                    <Cpu className="h-2.5 w-2.5 text-purple-400" />
                    GPT-4o Mini
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal border-zinc-800 bg-zinc-900/80 text-zinc-300 gap-1 rounded-md py-0.5"
                  >
                    <Radio className="h-2.5 w-2.5 text-emerald-400" />
                    WebRTC + SIP
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span>Updated recently</span>
                <Link to={`/agents/${agent.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200 rounded-lg"
                  >
                    Configure
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
