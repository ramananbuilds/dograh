import { useState } from 'react';
import { useRecordings } from '@/hooks/use-recordings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatDuration, formatDateTime } from '@/lib/format';
import {
  Play,
  Pause,
  Download,
  Search,
  Mic,
  PhoneIncoming,
  PhoneOutgoing,
  Activity,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import type { CallRecording } from '@/types/recording';

export default function RecordingsPage() {
  const { data: recordings = [], isLoading } = useRecordings();
  const [search, setSearch] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [activeTrack, setActiveTrack] = useState<CallRecording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x'>('1x');

  const filteredRecordings = recordings.filter((r) => {
    const matchesSearch =
      r.caller_number.includes(search) ||
      r.agent_name.toLowerCase().includes(search.toLowerCase()) ||
      r.transcript_preview.toLowerCase().includes(search.toLowerCase());
    if (sentimentFilter === 'all') return matchesSearch;
    return matchesSearch && r.sentiment === sentimentFilter;
  });

  const handleTogglePlay = (rec: CallRecording) => {
    if (activeTrack?.id === rec.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(rec);
      setIsPlaying(true);
    }
  };

  const totalMinutes = Math.round(
    recordings.reduce((acc, r) => acc + r.duration_seconds, 0) / 60
  );
  const totalCostInr = recordings.reduce((acc, r) => acc + r.cost_inr, 0);

  return (
    <div className="space-y-6 pb-28 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Voice Recordings & Call History
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {recordings.length} Calls
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Listen to synthesized audio recordings, analyze conversational sentiments, and audit ElevenLabs latency.
          </p>
        </div>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Audio Tracks</span>
            <Mic className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <div className="text-xl font-bold text-white">{recordings.length}</div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Total Duration</span>
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalMinutes} mins</div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Total Spend</span>
            <span className="text-zinc-500 font-mono text-xs">INR</span>
          </div>
          <div className="text-xl font-bold text-white">{formatCurrency(totalCostInr)}</div>
        </div>

        <div className="bg-[#111215] border border-zinc-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
            <span>Avg Pipeline Latency</span>
            <span className="text-cyan-400 font-mono text-[11px]">TTS TTFB</span>
          </div>
          <div className="text-xl font-bold text-cyan-400 font-mono">590ms</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search by phone, voice, or transcript..."
            className="pl-8 bg-[#111215] border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl h-8 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 bg-[#111215] border border-zinc-800/80 rounded-xl p-0.5 w-full sm:w-auto">
          {(['all', 'positive', 'neutral', 'negative'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSentimentFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${
                sentimentFilter === tab
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Recordings Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
            <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3 w-12 text-center">Audio</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Caller & Direction</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Voice Agent Persona</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Transcript Highlight</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Duration</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Sentiment</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Cost (INR)</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecordings.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500 text-xs">
                  No voice recordings found matching filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredRecordings.map((rec) => {
                const isSelected = activeTrack?.id === rec.id;
                const isPlayingThis = isSelected && isPlaying;

                return (
                  <TableRow
                    key={rec.id}
                    className={`border-b border-zinc-800/40 transition-colors ${
                      isSelected ? 'bg-zinc-800/40' : 'hover:bg-zinc-800/20'
                    }`}
                  >
                    <TableCell className="text-center py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleTogglePlay(rec)}
                        className={`h-8 w-8 p-0 rounded-full transition-transform active:scale-95 ${
                          isPlayingThis
                            ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                            : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                        }`}
                      >
                        {isPlayingThis ? (
                          <Pause className="h-3.5 w-3.5 fill-current" />
                        ) : (
                          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="font-mono text-xs text-white font-medium flex items-center gap-1.5">
                        {rec.direction === 'inbound' ? (
                          <PhoneIncoming className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <PhoneOutgoing className="h-3 w-3 text-cyan-400" />
                        )}
                        {rec.caller_number}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {formatDateTime(rec.created_at)}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="text-xs text-zinc-200 font-medium">{rec.agent_name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                        Latency: {rec.latency_ms}ms TTFT
                      </div>
                    </TableCell>

                    <TableCell className="py-3 max-w-xs">
                      <p className="text-xs text-zinc-400 truncate" title={rec.transcript_preview}>
                        {rec.transcript_preview}
                      </p>
                    </TableCell>

                    <TableCell className="text-xs font-mono text-zinc-300 py-3">
                      {formatDuration(rec.duration_seconds)}
                    </TableCell>

                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] capitalize font-medium flex items-center gap-1 w-fit ${
                          rec.sentiment === 'positive'
                            ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/30'
                            : rec.sentiment === 'neutral'
                            ? 'border-zinc-700 text-zinc-300 bg-zinc-800/40'
                            : 'border-rose-800/60 text-rose-400 bg-rose-950/30'
                        }`}
                      >
                        {rec.sentiment === 'positive' && <Smile className="h-3 w-3" />}
                        {rec.sentiment === 'neutral' && <Meh className="h-3 w-3" />}
                        {rec.sentiment === 'negative' && <Frown className="h-3 w-3" />}
                        {rec.sentiment}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-xs font-mono font-medium text-zinc-200 py-3">
                      {formatCurrency(rec.cost_inr)}
                    </TableCell>

                    <TableCell className="text-right py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => alert(`Downloading high-fidelity MP3 recording for ${rec.id}`)}
                        className="h-7 w-7 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
                        title="Download MP3"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Persistent ElevenLabs Bottom Audio Dock */}
      {activeTrack && (
        <div className="fixed bottom-4 left-64 right-4 z-40 bg-[#111215]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slideUp">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-10 w-10 p-0 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 shrink-0 shadow-md"
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
            </Button>
            <div>
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                {activeTrack.caller_number}
                <span className="text-[11px] font-normal text-zinc-400">· {activeTrack.agent_name}</span>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Duration: {formatDuration(activeTrack.duration_seconds)} · Rate: {formatCurrency(activeTrack.cost_inr)}
              </div>
            </div>
          </div>

          {/* Interactive Waveform Bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center gap-1 px-4">
            {[25, 45, 80, 100, 65, 30, 85, 95, 40, 70, 90, 50, 75, 30, 90, 100, 60, 40, 85, 95, 70, 40, 60, 90].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all ${
                  isPlaying ? 'bg-white animate-pulse' : 'bg-zinc-600'
                }`}
                style={{
                  height: `${h * 0.28}px`,
                  animationDelay: `${i * 45}ms`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              {(['1x', '1.25x', '1.5x'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    playbackSpeed === spd ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setActiveTrack(null)}
              className="text-xs text-zinc-400 hover:text-white h-8 px-2.5"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
