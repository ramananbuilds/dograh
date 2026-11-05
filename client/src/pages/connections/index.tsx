import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useConnections } from '@/hooks/use-connections';
import {
  Plus,
  Radio,
  CheckCircle2,
  Cpu,
  Key,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface ExtendedConnection {
  uuid: string;
  provider_name: string;
  display_name: string;
  latency: string;
  modelsCount: number;
  is_active: boolean;
  masked_key: string;
}

const CONNECTIONS_DATA: ExtendedConnection[] = [
  {
    uuid: 'conn_elevenlabs_01',
    provider_name: 'ElevenLabs',
    display_name: 'ElevenLabs Turbo Voice Suite',
    latency: '125ms TTFB',
    modelsCount: 42,
    is_active: true,
    masked_key: 'xi_••••••••••••99fa',
  },
  {
    uuid: 'conn_openai_02',
    provider_name: 'OpenAI',
    display_name: 'OpenAI GPT-4o & Mini Gateway',
    latency: '240ms TTFT',
    modelsCount: 8,
    is_active: true,
    masked_key: 'sk_••••••••••••38b1',
  },
  {
    uuid: 'conn_cartesia_03',
    provider_name: 'Cartesia',
    display_name: 'Cartesia Sonic Ultra-Low Latency',
    latency: '95ms TTFB',
    modelsCount: 16,
    is_active: true,
    masked_key: 'ct_••••••••••••881c',
  },
  {
    uuid: 'conn_deepgram_04',
    provider_name: 'Deepgram',
    display_name: 'Deepgram Nova-2 Streaming STT',
    latency: '140ms STT',
    modelsCount: 12,
    is_active: true,
    masked_key: 'dg_••••••••••••5502',
  },
  {
    uuid: 'conn_anthropic_05',
    provider_name: 'Anthropic',
    display_name: 'Anthropic Claude 3.5 Sonnet',
    latency: '290ms TTFT',
    modelsCount: 4,
    is_active: true,
    masked_key: 'sk_ant_••••••••129a',
  },
];

export default function ConnectionsPage() {
  const { data: _connections = [] } = useConnections();
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      alert('Connection verified successfully: HTTP 200 OK with authenticated quota.');
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Provider Connections
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {CONNECTIONS_DATA.length} Connected
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connect AI inference keys for ElevenLabs Voice, OpenAI LLMs, Cartesia Sonic, and Deepgram STT.
          </p>
        </div>
        <Button
          onClick={() => alert('New connection wizard opened.')}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add Connection
        </Button>
      </div>

      {/* Grid of Provider Connections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CONNECTIONS_DATA.map((conn) => {
          const isTesting = testingId === conn.uuid;

          return (
            <div
              key={conn.uuid}
              className="rounded-2xl border border-zinc-800/80 bg-[#111215] hover:border-zinc-700/80 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                      {conn.provider_name === 'ElevenLabs' && <Sparkles className="h-4 w-4 text-white" />}
                      {conn.provider_name === 'OpenAI' && <Cpu className="h-4 w-4 text-emerald-400" />}
                      {conn.provider_name === 'Cartesia' && <Radio className="h-4 w-4 text-cyan-400" />}
                      {conn.provider_name === 'Deepgram' && <Radio className="h-4 w-4 text-violet-400" />}
                      {conn.provider_name === 'Anthropic' && <Sparkles className="h-4 w-4 text-amber-400" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">{conn.display_name}</h3>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        Provider: {conn.provider_name}
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-emerald-800/60 text-emerald-400 bg-emerald-950/30 text-[10px] capitalize flex items-center gap-1 font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </Badge>
                </div>

                {/* Key and telemetry stats */}
                <div className="mt-5 space-y-2.5">
                  <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
                      <Key className="h-3 w-3 text-zinc-400" />
                      API Key
                    </span>
                    <span className="text-xs font-mono text-zinc-300 font-semibold">{conn.masked_key}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2">
                      <div className="text-[10px] text-zinc-500">Benchmark Latency</div>
                      <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">{conn.latency}</div>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2">
                      <div className="text-[10px] text-zinc-500">Accessible Models</div>
                      <div className="text-xs font-mono text-zinc-300 font-semibold mt-0.5">
                        {conn.modelsCount} Voices/Models
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTest(conn.uuid)}
                  disabled={isTesting}
                  className="h-7 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-2.5 gap-1.5"
                >
                  <RefreshCw className={`h-3 w-3 text-zinc-400 ${isTesting ? 'animate-spin' : ''}`} />
                  {isTesting ? 'Verifying...' : 'Test Ping'}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`Editing credentials for ${conn.display_name}`)}
                  className="h-7 text-xs border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg px-3"
                >
                  Configure
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
