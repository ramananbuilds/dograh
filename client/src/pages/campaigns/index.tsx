import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  PhoneCall,
  Activity,
  Search,
  ArrowUpRight,
  IndianRupee,
  Users,
} from 'lucide-react';
import { useCampaigns } from '@/hooks/use-campaigns';
import { formatCurrency, formatNumber } from '@/lib/format';

export default function CampaignsPage() {
  const { campaigns, isLoading, startCampaign, pauseCampaign } = useCampaigns();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'running' | 'paused' | 'completed'>('all');

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && c.status === statusFilter;
  });

  const totalLeads = campaigns.reduce((acc, c) => acc + (c.total_leads || 0), 0);
  const totalCompleted = campaigns.reduce((acc, c) => acc + (c.completed_calls || 0), 0);
  const activeCount = campaigns.filter((c) => c.status === 'running').length;
  // Estimated cost in INR (average ₹4.20 per completed call)
  const totalSpendInr = totalCompleted * 4.2;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Outbound Campaigns
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {campaigns.length} Total
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Dispatch high-concurrency automated outbound calls with conversational voice AI and smart redialing.
          </p>
        </div>
        <Link to="/campaigns/new">
          <Button className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Active Campaigns</span>
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            {activeCount}
            <span className="text-[11px] font-normal text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
              Live
            </span>
          </div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Total Leads Loaded</span>
            <Users className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl font-bold text-white">{formatNumber(totalLeads)}</div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Completed Calls</span>
            <PhoneCall className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {formatNumber(totalCompleted)}
            <span className="text-xs text-zinc-500 font-normal ml-1.5">
              ({totalLeads ? Math.round((totalCompleted / totalLeads) * 100) : 0}%)
            </span>
          </div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Campaign Spend</span>
            <IndianRupee className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl font-bold text-white">{formatCurrency(totalSpendInr)}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search campaigns..."
            className="pl-8 bg-[#111215] border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl h-8 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 bg-[#111215] border border-zinc-800/80 rounded-xl p-0.5 w-full sm:w-auto">
          {(['all', 'running', 'paused', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Cards Grid */}
      {filteredCampaigns.length === 0 && !isLoading ? (
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-12 text-center">
          <Megaphone className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white">No campaigns found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Upload a CSV contact list and assign an ElevenLabs conversational agent to get started.
          </p>
          <Link to="/campaigns/new">
            <Button className="mt-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl px-4 py-2">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Launch First Campaign
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCampaigns.map((camp) => {
            const percent = camp.total_leads
              ? Math.round(((camp.completed_calls || 0) / camp.total_leads) * 100)
              : 0;
            const spend = (camp.completed_calls || 0) * 4.2;

            return (
              <div
                key={camp.id}
                className="group rounded-2xl border border-zinc-800/80 bg-[#111215] hover:border-zinc-700/80 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            camp.status === 'running'
                              ? 'bg-emerald-400 animate-pulse'
                              : camp.status === 'paused'
                              ? 'bg-amber-400'
                              : 'bg-zinc-600'
                          }`}
                        />
                        <Link
                          to={`/campaigns/${camp.id}`}
                          className="font-semibold text-sm text-white hover:underline flex items-center gap-1 group-hover:text-zinc-100"
                        >
                          {camp.name}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                        </Link>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">
                        ID: {camp.id} · Workflow: {camp.workflow_id}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[11px] capitalize font-medium ${
                        camp.status === 'running'
                          ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/30'
                          : camp.status === 'paused'
                          ? 'border-amber-800/60 text-amber-400 bg-amber-950/30'
                          : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                      }`}
                    >
                      {camp.status}
                    </Badge>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">
                        Progress: <strong className="text-white">{camp.completed_calls || 0}</strong> /{' '}
                        {camp.total_leads || 0} calls
                      </span>
                      <span className="font-mono text-zinc-300 font-semibold">{percent}%</span>
                    </div>
                    <Progress value={percent} className="h-1.5 bg-zinc-800/80" />
                  </div>

                  {/* Metrics Badges */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-800/60 pt-3">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Spend (INR)</div>
                      <div className="text-xs font-semibold text-zinc-200 mt-0.5">{formatCurrency(spend)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Pacing Limit</div>
                      <div className="text-xs font-semibold text-zinc-200 mt-0.5">8 calls/sec</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Est. Completion</div>
                      <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                        {camp.status === 'completed' ? 'Done' : '~42 mins'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                  <div className="flex items-center gap-1.5">
                    {camp.status === 'running' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => pauseCampaign(camp.id)}
                        className="h-7 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 gap-1 rounded-lg px-2.5"
                      >
                        <Pause className="h-3 w-3" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startCampaign(camp.id)}
                        className="h-7 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 gap-1 rounded-lg px-2.5"
                      >
                        <Play className="h-3 w-3" />
                        Resume
                      </Button>
                    )}
                  </div>
                  <Link to={`/campaigns/${camp.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg px-3"
                    >
                      Campaign Console →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
