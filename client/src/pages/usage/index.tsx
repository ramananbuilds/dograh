import { useState } from 'react';
import {
  CreditCard,
  Clock,
  Activity,
  IndianRupee,
  Download,
  Plus,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useUsage } from '@/hooks/use-usage';
import { formatCurrency } from '@/lib/format';

interface DailyUsageRow {
  date: string;
  calls: number;
  minutes: number;
  sttCost: number;
  llmCost: number;
  ttsCost: number;
  telephonyCost: number;
  totalCost: number;
}

const MOCK_DAILY_USAGE: DailyUsageRow[] = [
  { date: '2026-11-05', calls: 184, minutes: 412, sttCost: 153.55, llmCost: 514.60, ttsCost: 1228.40, telephonyCost: 799.29, totalCost: 2695.84 },
  { date: '2026-11-04', calls: 162, minutes: 364, sttCost: 136.12, llmCost: 448.20, ttsCost: 1087.30, telephonyCost: 707.16, totalCost: 2378.78 },
  { date: '2026-11-03', calls: 145, minutes: 326, sttCost: 122.01, llmCost: 398.40, ttsCost: 971.10, telephonyCost: 633.29, totalCost: 2124.80 },
  { date: '2026-11-02', calls: 98, minutes: 218, sttCost: 81.34, llmCost: 265.60, ttsCost: 647.40, telephonyCost: 423.30, totalCost: 1417.64 },
  { date: '2026-11-01', calls: 86, minutes: 194, sttCost: 72.21, llmCost: 232.40, ttsCost: 572.70, telephonyCost: 376.82, totalCost: 1254.13 },
];

export default function UsagePage() {
  const { data: usage } = useUsage();
  const [balance] = useState(8450.0);
  const creditLimit = 15000.0;
  const balancePercent = Math.round((balance / creditLimit) * 100);

  const totalMin = usage?.total_minutes || 1514;
  const totalCalls = usage?.total_calls || 675;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Usage & Billing (INR)"
        description="Monitor voice minute consumption, pipeline unit costs (LLM/STT/TTS in INR), and prepaid credit balances."
      >
        <Button className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-2 rounded-xl text-xs px-4 py-2">
          <Plus className="h-4 w-4" />
          Add INR Credits
        </Button>
      </PageHeader>

      {/* Credit Balance & Top Overview */}
      <div className="grid gap-3.5 md:grid-cols-4">
        {/* Available Balance in INR */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Available Credits (INR)
            </CardTitle>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              {formatCurrency(balance)}
            </div>
            <Progress value={balancePercent} className="h-1.5 bg-zinc-800" />
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>Auto-refill at ₹2,000.00</span>
              <span className="font-mono">{balancePercent}% remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Voice Talk Time */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Voice Talk Time
            </CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">{totalMin} mins</div>
            <p className="text-xs text-zinc-400 mt-1">Across all active voice agents</p>
          </CardContent>
        </Card>

        {/* Total Calls */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Call Volume
            </CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-white">{totalCalls.toLocaleString()}</div>
            <p className="text-xs text-zinc-400 mt-1">Inbound & outbound sessions</p>
          </CardContent>
        </Card>

        {/* Blended Cost Per Minute in INR */}
        <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Blended Unit Rate (INR)
            </CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
              <IndianRupee className="h-3.5 w-3.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-400">₹3.48 / min</div>
            <p className="text-xs text-zinc-400 mt-1">Includes Deepgram, GPT-4o & ElevenLabs</p>
          </CardContent>
        </Card>
      </div>

      {/* Component Cost Distribution */}
      <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-white">Cost Breakdown by Pipeline Component</CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Real-time attribution across Voice Synthesis (TTS), LLM inference tokens, transcription (STT), and telephony carrier minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Voice Synthesis (ElevenLabs)
              </span>
              <div className="text-xl font-bold font-mono text-indigo-400 mt-1">45.5%</div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">~₹1.58 / min</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Telephony Minutes (Carrier)
              </span>
              <div className="text-xl font-bold font-mono text-blue-400 mt-1">29.6%</div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">~₹1.03 / min</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                LLM Tokens (GPT-4o Mini)
              </span>
              <div className="text-xl font-bold font-mono text-purple-400 mt-1">19.2%</div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">~₹0.67 / min</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Transcription (Deepgram)
              </span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">5.7%</div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">~₹0.20 / min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Usage Table */}
      <Card className="bg-[#111215] border-zinc-800/80 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-semibold text-white">Daily Consumption Ledger (INR)</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Itemized ledger for GST accounting and company reconciliation
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-zinc-400 hover:text-white">
            <Download className="h-3.5 w-3.5" />
            Download GST Invoices
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Date</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Calls</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Minutes</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">STT (Deepgram)</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">LLM (OpenAI)</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">TTS (ElevenLabs)</TableHead>
                <TableHead className="text-zinc-400 text-[11px] font-semibold uppercase">Telephony</TableHead>
                <TableHead className="text-right text-zinc-400 text-[11px] font-semibold uppercase">Total (INR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DAILY_USAGE.map((row) => (
                <TableRow key={row.date} className="border-zinc-800 hover:bg-white/[0.02]">
                  <TableCell className="font-mono text-xs font-semibold text-zinc-200">{row.date}</TableCell>
                  <TableCell className="font-mono text-xs text-zinc-300">{row.calls}</TableCell>
                  <TableCell className="font-mono text-xs font-medium text-white">{row.minutes}m</TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400">
                    {formatCurrency(row.sttCost)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400">
                    {formatCurrency(row.llmCost)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400">
                    {formatCurrency(row.ttsCost)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400">
                    {formatCurrency(row.telephonyCost)}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-emerald-400 text-right">
                    {formatCurrency(row.totalCost)}
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
