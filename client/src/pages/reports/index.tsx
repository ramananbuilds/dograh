import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Download,
  Phone,
  PhoneForwarded,
  Clock,
  Zap,
  Filter,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useReports } from '@/hooks/use-reports';
import { useAgents } from '@/hooks/use-agents';
import { formatDuration } from '@/lib/format';

const DISP_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function ReportsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: reports } = useReports();
  const { agents } = useAgents();

  const metrics = reports?.metrics || {
    total_runs: 184,
    xfer_count: 28,
    avg_duration_seconds: 135,
    avg_ttfb_ms: 460,
  };

  const dispositions = reports?.disposition_distribution || [];
  const durations = reports?.call_duration_distribution || [];

  const handleDownloadCSV = () => {
    // Generate CSV export
    const csvContent =
      'data:text/csv;charset=utf-8,Disposition,Count,Percentage\n' +
      dispositions.map((d) => `"${d.disposition}",${d.count},${d.percentage}%`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dograh-report-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Analytics & Daily Reports"
        description="Comprehensive call disposition analysis, duration buckets, and exportable reports."
      >
        <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadCSV}>
          <Download className="h-4 w-4" />
          Export CSV Report
        </Button>
      </PageHeader>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-card/60">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Filter By:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Date:</span>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-8 w-36 text-xs bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Agent:</span>
            <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
              <SelectTrigger className="h-8 w-52 text-xs bg-background">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents (Combined)</SelectItem>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Timezone:</span>
            <Badge variant="outline" className="h-8 px-2 font-normal text-xs bg-background">
              America/New_York (UTC-5)
            </Badge>
          </div>
        </div>
      </Card>

      {/* Metric Highlights */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Total Workflow Runs
            </CardTitle>
            <Phone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total_runs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total calls processed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Transfers (XFER)
            </CardTitle>
            <PhoneForwarded className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.xfer_count}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.xfer_count / (metrics.total_runs || 1)) * 100).toFixed(1)}% escalated to human
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Avg Call Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(metrics.avg_duration_seconds)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total length of speech turns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Average Pipeline Latency
            </CardTitle>
            <Zap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avg_ttfb_ms} ms</div>
            <p className="text-xs text-emerald-600 mt-1">STT + LLM + TTS pipeline response</p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Disposition Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Disposition Distribution</CardTitle>
            <CardDescription>Call outcomes classified by intent and agent resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dispositions} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis
                    dataKey="disposition"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded border bg-background p-2.5 shadow text-xs">
                            <div className="font-semibold">{d.disposition}</div>
                            <div>
                              {d.count} calls ({d.percentage}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {dispositions.map((_, index) => (
                      <Cell key={`disp-${index}`} fill={DISP_COLORS[index % DISP_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Call Duration Distribution Histogram */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Call Duration Buckets</CardTitle>
            <CardDescription>Frequency histogram of call conversation lengths</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={durations} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis dataKey="bucket" tick={{ fontSize: 11 }} height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded border bg-background p-2.5 shadow text-xs">
                            <div className="font-semibold">{d.bucket}</div>
                            <div>
                              {d.count} calls ({d.percentage}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disposition Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Disposition Summary Table</CardTitle>
          <CardDescription>Detailed tabular metrics for export and CRM reconciliation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disposition Name</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead className="text-right">Classification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispositions.map((d) => (
                <TableRow key={d.disposition}>
                  <TableCell className="font-medium text-xs">{d.disposition}</TableCell>
                  <TableCell className="font-mono text-xs">{d.count}</TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    {d.percentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="text-[11px] font-normal">
                      {d.disposition.includes('XFER') ? 'Escalation' : 'Resolution'}
                    </Badge>
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
