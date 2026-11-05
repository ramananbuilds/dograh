import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAgentRun } from '@/hooks/use-agent-runs';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDuration, formatDateTime } from '@/lib/format';
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Sparkles,
  Bot,
  User,
} from 'lucide-react';

const MOCK_TRANSCRIPT_DIALOG = [
  {
    role: 'agent',
    speaker: 'Rachel (ElevenLabs Turbo v2.5)',
    text: 'Hello! Thank you for contacting Dograh Support. How can I assist you with your voice AI deployment today?',
    latency: '110ms',
    time: '0:02',
  },
  {
    role: 'user',
    speaker: 'Caller (+91 98450 12345)',
    text: 'Hi there, I wanted to check what the latency is when running ElevenLabs voices over India SIP trunks.',
    latency: 'STT 140ms',
    time: '0:06',
  },
  {
    role: 'agent',
    speaker: 'Rachel (ElevenLabs Turbo v2.5)',
    text: 'Great question! With our Mumbai and Bangalore edge gateways, average end-to-end turnaround latency is between 580 to 650 milliseconds, ensuring completely natural, interruption-ready conversation.',
    latency: '590ms TTFT',
    time: '0:14',
  },
  {
    role: 'user',
    speaker: 'Caller (+91 98450 12345)',
    text: 'That sounds really fast. And what is the billing rate in Indian Rupees?',
    latency: 'STT 135ms',
    time: '0:22',
  },
  {
    role: 'agent',
    speaker: 'Rachel (ElevenLabs Turbo v2.5)',
    text: 'The standard rate is ₹1.80 per minute of connected call time, which includes ElevenLabs voice synthesis, speech-to-text, and outbound telephony. Would you like me to send you an activation email?',
    latency: '610ms TTFT',
    time: '0:31',
  },
];

export default function AgentRunDetailPage() {
  const { id, runId } = useParams<{ id: string; runId: string }>();
  const { data: run, isLoading } = useAgentRun(id!, runId!);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) return <LoadingSpinner className="m-auto my-12" />;

  const duration = run?.duration || 184;
  const costInr = (duration / 60) * 1.8;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div className="space-y-1.5">
          <Link
            to={`/agents/${id}/runs`}
            className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Call History
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Call Session Trace:
              <span className="font-mono text-zinc-300 font-normal">{runId}</span>
            </h1>
            <Badge
              variant="outline"
              className="border-emerald-800/60 text-emerald-400 bg-emerald-950/30 text-xs font-medium"
            >
              Completed
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Recorded via SIP Mumbai Gateway on {run ? formatDateTime(run.created_at) : 'Today'}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`Downloading full call audio recording for ${runId}`)}
          className="border-zinc-800 bg-[#111215] text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-8 rounded-xl gap-1.5"
        >
          <Download className="h-3.5 w-3.5 text-zinc-400" />
          Download Audio (WAV)
        </Button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Full Transcript */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Synchronized Turn-by-Turn Transcript
              </h2>
              <span className="text-xs text-zinc-400 font-mono">5 Dialogue Turns</span>
            </div>

            <div className="space-y-4 pt-2">
              {MOCK_TRANSCRIPT_DIALOG.map((turn, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs ${
                    turn.role === 'agent' ? 'items-start' : 'items-start flex-row-reverse'
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 border ${
                      turn.role === 'agent'
                        ? 'bg-zinc-900 border-zinc-800 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {turn.role === 'agent' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>

                  <div
                    className={`max-w-lg rounded-2xl p-4 space-y-1.5 ${
                      turn.role === 'agent'
                        ? 'bg-zinc-900/70 border border-zinc-800/80 text-zinc-200'
                        : 'bg-zinc-800/60 border border-zinc-700/60 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
                      <span className="font-semibold text-zinc-300">{turn.speaker}</span>
                      <span>{turn.time}</span>
                    </div>
                    <p className="leading-relaxed text-xs">{turn.text}</p>
                    <div className="text-[10px] font-mono text-cyan-400 text-right">
                      {turn.latency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Audio & Telemetry */}
        <div className="space-y-4">
          {/* Audio Player Card */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Play className="h-4 w-4 text-cyan-400" />
              Call Audio Recording
            </h3>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center space-y-3">
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-12 w-12 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 shadow-md p-0"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </Button>

              <div className="text-center">
                <div className="text-xs font-semibold text-white">Full Stereo Master</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  184s · ElevenLabs Turbo v2.5 / G.711u
                </div>
              </div>

              {/* Waveform graphic */}
              <div className="flex items-center gap-1 w-full justify-center pt-2">
                {[30, 60, 95, 45, 80, 100, 65, 30, 85, 40, 75, 90, 50, 70, 95, 60, 40, 85].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isPlaying ? 'bg-white animate-pulse' : 'bg-zinc-700'
                    }`}
                    style={{ height: `${h * 0.28}px`, animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Session Telemetry */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Execution Metrics</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Total Duration</span>
                <span className="font-mono text-white font-semibold">{formatDuration(duration)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Total Billed Cost</span>
                <span className="font-mono text-emerald-400 font-semibold">{formatCurrency(costInr)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Average Turnaround (TTFT)</span>
                <span className="font-mono text-cyan-400 font-semibold">590ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Voice Synthesis Engine</span>
                <span className="font-mono text-zinc-300">ElevenLabs Turbo v2.5</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Reasoning LLM</span>
                <span className="font-mono text-zinc-300">gpt-4o-mini (1,240 tokens)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-400">Telephony Gateway</span>
                <span className="font-mono text-zinc-300">Exotel SIP (Mumbai)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
