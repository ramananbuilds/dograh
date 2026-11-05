import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgents } from '@/hooks/use-agents';
import { ArrowLeft, UploadCloud, FileSpreadsheet, Sparkles, Sliders, ShieldAlert } from 'lucide-react';

export default function NewCampaignPage() {
  const [name, setName] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('wf_support_01');
  const [pacingLimit, setPacingLimit] = useState(10);
  const [enableABSplit, setEnableABSplit] = useState(false);
  const [splitRatio, setSplitRatio] = useState(30);
  const { agents } = useAgents();
  const navigate = useNavigate();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/campaigns');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Top Breadcrumb Header */}
      <div className="space-y-1.5 border-b border-zinc-800/80 pb-6">
        <Link to="/campaigns" className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Campaigns
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          New Outbound Campaign
        </h1>
        <p className="text-xs text-zinc-400">
          Upload an audience list, configure concurrency pacing, and assign ElevenLabs voice workflows.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Campaign Info Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            General Information
          </h2>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-zinc-300">Campaign Name</Label>
            <Input
              id="name"
              placeholder="e.g., Q4 Customer Reactivation & Offer Rollout"
              required
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl focus-visible:ring-zinc-700 h-9"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-zinc-300">Primary Voice Agent</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 rounded-xl h-9">
                <SelectValue placeholder="Choose a voice agent" />
              </SelectTrigger>
              <SelectContent className="bg-[#111215] border-zinc-800 text-zinc-200">
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id} className="text-xs focus:bg-zinc-800 focus:text-white">
                    {a.name} ({a.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-zinc-500">
              Agent will execute conversational dialog with low-latency ElevenLabs speech synthesis.
            </p>
          </div>
        </div>

        {/* Audience CSV Upload */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-cyan-400" />
              Audience Contacts (CSV)
            </h2>
            <span className="text-[11px] text-zinc-400 font-mono">Max 100,000 rows</span>
          </div>

          <div className="border border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl p-8 text-center bg-zinc-900/30 transition-colors cursor-pointer">
            <UploadCloud className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-white">Click or drag CSV file here</div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Required column: <code className="text-zinc-400 font-mono">phone_number</code> (E.164 e.g. +91 98450 12345).
              Optional: <code className="text-zinc-400 font-mono">first_name</code>, <code className="text-zinc-400 font-mono">custom_fields</code>
            </p>
            <Input id="csv" type="file" accept=".csv" className="hidden" />
          </div>

          <div className="text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              All numbers will be automatically filtered against the National Do Not Call (DNC/NDNC) registry for India.
            </span>
          </div>
        </div>

        {/* Pacing & Traffic Split */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sliders className="h-4 w-4 text-violet-400" />
            Pacing & A/B Traffic Split
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300">Dispatch Concurrency Limit:</span>
              <span className="font-mono text-emerald-400 font-semibold">{pacingLimit} calls/sec</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={pacingLimit}
              onChange={(e) => setPacingLimit(Number(e.target.value))}
              className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">
              Estimated bandwidth consumption: {pacingLimit * 64} kbps G.711 voice RTP stream.
            </p>
          </div>

          <div className="border-t border-zinc-800/60 pt-4 space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableABSplit}
                onChange={(e) => setEnableABSplit(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 accent-white h-4 w-4"
              />
              <span className="text-xs text-white font-medium">
                Enable Multi-Agent A/B Traffic Split
              </span>
            </label>

            {enableABSplit && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Challenger Agent Traffic Share:</span>
                  <span className="font-mono text-cyan-400 font-semibold">{splitRatio}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={splitRatio}
                  onChange={(e) => setSplitRatio(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>Primary Agent: {100 - splitRatio}%</span>
                  <span>Challenger Agent: {splitRatio}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-5">
          <div className="text-xs text-zinc-400">
            Est. Rate: <strong className="text-white">₹1.80/min</strong> (Includes ElevenLabs TTS + STT + SIP Outbound)
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/campaigns')}
              className="border-zinc-800 bg-[#111215] text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-9 rounded-xl px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs h-9 rounded-xl px-5 shadow-sm"
            >
              Create & Launch Campaign
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
