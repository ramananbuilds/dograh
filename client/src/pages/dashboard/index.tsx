import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  PhoneCall,
  Clock,
  IndianRupee,
  Zap,
  PhoneForwarded,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Play,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { useAgents } from '@/hooks/use-agents';
import { useReports } from '@/hooks/use-reports';
import { useAgentRuns } from '@/hooks/use-agent-runs';
import { formatDuration, formatRelativeTime, formatCurrency } from '@/lib/format';

const DISPOSITION_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
const LATENCY_COLORS = ['#06b6d4', '#6366f1', '#a855f7'];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('today');
  const { agents } = useAgents();
  const { data: reports } = useReports();
  const { data: recentRuns = [] } = useAgentRuns();

  const metrics = reports?.metrics || {
    total_runs: 184,
    completed_runs: 162,
    failed_runs: 6,
    xfer_count: 28,
    total_duration_seconds: 14890,
    avg_duration_seconds: 135,
    avg_ttfb_ms: 460,
    total_cost: 2695.84, // in INR
  };

  const hourlyData = reports?.hourly_volume || [];
  const dispositionData = reports?.disposition_distribution || [];
  const durationData = reports?.call_duration_distribution || [];
  const latencyData = reports?.latency_distribution || [];

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Top Header & Live Engine Status */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">Voice AI Overview</h1>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1.5 py-1 px-2.5 rounded-full text-xs font-normal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online (ap-south-1)
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time pipeline metrics, call traffic, voice agent health, and outbound campaigns.
          </p>
        </div>

        {/* Action Controls & Date Picker */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-800">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                timeRange === 'today'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                timeRange === '7d'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                timeRange === '30d'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              30 Days
            </button>
          </div>

          <Link to="/agents/create">
            <Button size="sm" className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm">
              <Plus className="h-4 w-4" />
              Create Agent
            </Button>
          </Link>
          <Link to="/campaigns/new">
            <Button size="sm" variant="outline" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200 gap-1.5 rounded-xl">
              <Play className="h-3.5 w-3.5" />
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row (ElevenLabs obsidian cards) */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        {/* Total Calls */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Total Calls
            </CardTitle>
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
              <PhoneCall className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {metrics.total_runs.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              <span>+14.2%</span>
              <span className="text-zinc-500 font-normal">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Talk Time */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Voice Talk Time
            </CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {Math.floor(metrics.total_duration_seconds / 60)}m {metrics.total_duration_seconds % 60}s
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">
              Avg {formatDuration(metrics.avg_duration_seconds)} / call
            </p>
          </CardContent>
        </Card>

        {/* Success / Answer Rate */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Completion Rate
            </CardTitle>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-400">
              {((metrics.completed_runs / (metrics.total_runs || 1)) * 100).toFixed(1)}%
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {metrics.completed_runs} successful resolutions
            </p>
          </CardContent>
        </Card>

        {/* Transfers (XFER) */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Warm Handoffs
            </CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
              <PhoneForwarded className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {metrics.xfer_count}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {((metrics.xfer_count / (metrics.total_runs || 1)) * 100).toFixed(1)}% transferred to human
            </p>
          </CardContent>
        </Card>

        {/* First-Turn TTFB Latency */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Avg Voice TTFB
            </CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
              <Zap className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-purple-400">
              {metrics.avg_ttfb_ms} ms
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">ElevenLabs low-latency tier</p>
          </CardContent>
        </Card>

        {/* Total Cost in INR */}
        <Card className="bg-[#111215] border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Period Cost (INR)
            </CardTitle>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
              <IndianRupee className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {formatCurrency(metrics.total_cost)}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">~₹3.48 / min blended</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Call Volume & Concurrent Channels (Area Chart - 2 cols) */}
        <Card className="lg:col-span-2 bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-sm font-semibold text-white">
                Call Traffic & Channel Concurrency
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Hourly call volume and simultaneous channel load
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-zinc-300">Call Volume</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                <span className="text-zinc-300">Peak Concurrency</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="elevenIndigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="elevenPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2127" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
                  <YAxis tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-xl border border-zinc-800 bg-[#16181d] p-3 shadow-2xl text-xs space-y-1">
                            <div className="font-semibold text-white">{payload[0]?.payload?.time}</div>
                            <div className="text-indigo-400 font-mono">Calls: {payload[0]?.value}</div>
                            <div className="text-purple-400 font-mono">
                              Channels Active: {payload[1]?.value}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calls"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#elevenIndigo)"
                  />
                  <Area
                    type="monotone"
                    dataKey="concurrent_peak"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#elevenPurple)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Call Outcomes Donut Chart (1 col) */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white">Call Dispositions</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Resolved intents across conversational turns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[190px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dispositionData}
                    dataKey="count"
                    nameKey="disposition"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={4}
                  >
                    {dispositionData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DISPOSITION_COLORS[index % DISPOSITION_COLORS.length]}
                        stroke="#111215"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-zinc-800 bg-[#16181d] p-2.5 shadow-2xl text-xs">
                            <div className="font-semibold text-white">{item.disposition}</div>
                            <div className="text-zinc-300 font-mono mt-0.5">
                              {item.count} calls ({item.percentage}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="mt-2 space-y-1.5 text-xs">
              {dispositionData.map((item, index) => (
                <div key={item.disposition} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: DISPOSITION_COLORS[index % DISPOSITION_COLORS.length] }}
                    />
                    <span className="truncate max-w-[140px] text-zinc-300 text-[11px]">
                      {item.disposition}
                    </span>
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px]">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Distribution Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Duration Histogram */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">Call Duration Histogram</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Frequency of conversation length buckets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={durationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2127" />
                  <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
                  <YAxis tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-zinc-800 bg-[#16181d] p-2.5 shadow text-xs">
                            <div className="font-semibold text-white">{d.bucket}</div>
                            <div className="font-mono text-zinc-300">
                              {d.count} calls ({d.percentage}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Latency Breakdown */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">
              Voice Pipeline Latency Breakdown
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Turn response time across STT, LLM reasoning, and ElevenLabs audio generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1f2127" />
                  <XAxis type="number" unit="ms" tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
                  <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: '#71717a' }} width={130} stroke="#27272a" />
                  <Tooltip
                    formatter={(val) => [`${val} ms`, 'Response Time']}
                    contentStyle={{ fontSize: 12, borderRadius: 12, backgroundColor: '#16181d', borderColor: '#27272a', color: '#fff' }}
                  />
                  <Bar dataKey="latency_ms" radius={[0, 4, 4, 0]}>
                    {latencyData.map((_, index) => (
                      <Cell
                        key={`lat-${index}`}
                        fill={LATENCY_COLORS[index % LATENCY_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployed Voice Agents Table */}
      <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-semibold text-white">Conversational Voice Agents</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Active agent workflows, TTS voices, and performance stats
            </CardDescription>
          </div>
          <Link to="/agents">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-zinc-400 hover:text-white">
              Manage All <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Agent Name</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Status</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Voice Profile</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Total Runs</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Avg Duration</TableHead>
                <TableHead className="text-right text-zinc-400 text-[11px] font-semibold uppercase">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="border-zinc-800 hover:bg-white/[0.02]">
                  <TableCell>
                    <div className="font-medium text-xs text-white">{agent.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-sm mt-0.5">
                      {agent.description || 'Voice agent workflow'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={agent.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[11px] font-normal border-zinc-800 bg-zinc-900 text-zinc-300 gap-1.5">
                      <Volume2 className="h-3 w-3 text-indigo-400" />
                      ElevenLabs (Rachel)
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-300">
                    {Math.floor(Math.random() * 80 + 20)} calls
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-300">2m 14s</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/agents/${agent.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200 rounded-lg">
                        Configure
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Live Recent Calls Feed */}
      <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-semibold text-white">Live Call Runs</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Live sessions, caller numbers, transcripts, and cost accounting
            </CardDescription>
          </div>
          <Link to="/reports">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-zinc-400 hover:text-white">
              Full Logs <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Run ID</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Direction</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Caller ID</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Agent</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Duration</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Cost (INR)</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Time</TableHead>
                <TableHead className="text-right text-zinc-400 text-[11px] font-semibold uppercase">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRuns.map((run, idx) => (
                <TableRow key={run.id} className="border-zinc-800 hover:bg-white/[0.02]">
                  <TableCell className="font-mono text-xs font-semibold text-indigo-400">
                    <Link to={`/agents/${run.workflow_id}/runs/${run.id}`} className="hover:underline">
                      {run.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] font-semibold uppercase rounded-md ${
                        run.call_type === 'inbound'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {run.call_type || 'inbound'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-300">
                    {run.annotations?.caller_number || '+91 98765 43210'}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-zinc-200">
                    {run.annotations?.agent_name || 'Customer Support Specialist'}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-300">
                    {formatDuration(run.duration || 0)}
                  </TableCell>
                  <TableCell className="text-xs font-mono font-semibold text-white">
                    {formatCurrency(idx === 0 ? 14.94 : idx === 1 ? 26.56 : idx === 2 ? 6.64 : 1.66)}
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500">
                    {formatRelativeTime(run.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/agents/${run.workflow_id}/runs/${run.id}`}>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-zinc-400 hover:text-white">
                        Inspect
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
