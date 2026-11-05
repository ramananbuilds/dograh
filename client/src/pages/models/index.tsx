import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useModels } from '@/hooks/use-models';
import {
  Cpu,
  Plus,
  Sliders,
} from 'lucide-react';
import { formatCurrency } from '@/lib/format';

interface ExtendedModel {
  uuid: string;
  name: string;
  provider: string;
  model_id: string;
  is_default: boolean;
  temperature: number;
  inputCostInr: number; // per 1M tokens
  outputCostInr: number;
  contextWindow: string;
  latencyBenchmark: string;
}

const EXTENDED_MODELS: ExtendedModel[] = [
  {
    uuid: 'model_fast_reasoning',
    name: 'Fast Reasoning (GPT-4o Mini)',
    provider: 'OpenAI',
    model_id: 'gpt-4o-mini',
    is_default: true,
    temperature: 0.7,
    inputCostInr: 12.5,
    outputCostInr: 50.0,
    contextWindow: '128k tokens',
    latencyBenchmark: '180ms TTFT',
  },
  {
    uuid: 'model_deep_conversational',
    name: 'Deep Conversational (Claude 3.5 Sonnet)',
    provider: 'Anthropic',
    model_id: 'claude-3-5-sonnet',
    is_default: false,
    temperature: 0.5,
    inputCostInr: 250.0,
    outputCostInr: 1250.0,
    contextWindow: '200k tokens',
    latencyBenchmark: '290ms TTFT',
  },
  {
    uuid: 'model_realtime_flash',
    name: 'Realtime Voice (Gemini 2.0 Flash)',
    provider: 'Google',
    model_id: 'gemini-2.0-flash',
    is_default: false,
    temperature: 0.6,
    inputCostInr: 8.5,
    outputCostInr: 34.0,
    contextWindow: '1000k tokens',
    latencyBenchmark: '145ms TTFT',
  },
];

export default function ModelsPage() {
  const { data: _models = [] } = useModels();

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Model Configurations
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {EXTENDED_MODELS.length} Active
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Tune LLM reasoning parameters, temperature, token limits, and pricing rates for voice agents.
          </p>
        </div>
        <Button
          onClick={() => alert('New model configuration wizard opened.')}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Model Config
        </Button>
      </div>

      {/* Model Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {EXTENDED_MODELS.map((m) => (
          <div
            key={m.uuid}
            className="rounded-2xl border border-zinc-800/80 bg-[#111215] hover:border-zinc-700/80 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">{m.name}</h3>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {m.provider} · <code className="text-zinc-300">{m.model_id}</code>
                    </div>
                  </div>
                </div>

                {m.is_default && (
                  <Badge
                    variant="outline"
                    className="border-emerald-800/60 text-emerald-400 bg-emerald-950/30 text-[10px] font-medium"
                  >
                    Default
                  </Badge>
                )}
              </div>

              {/* Parameter Settings */}
              <div className="mt-5 space-y-3">
                <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Sliders className="h-3 w-3 text-zinc-400" />
                      Temperature
                    </span>
                    <span className="font-mono text-white font-semibold">{m.temperature}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${m.temperature * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-500">Latency TTFT</div>
                    <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                      {m.latencyBenchmark}
                    </div>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5">
                    <div className="text-[10px] text-zinc-500">Context Window</div>
                    <div className="text-xs font-mono text-zinc-300 font-semibold mt-0.5">
                      {m.contextWindow}
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Token Rate (INR)</span>
                  <span className="font-mono text-zinc-200 font-medium text-[11px]">
                    {formatCurrency(m.inputCostInr)} / {formatCurrency(m.outputCostInr)} per 1M
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3">
              <span className="text-[11px] text-zinc-500 font-mono">UUID: {m.uuid.substring(0, 12)}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => alert(`Configuring ${m.name}`)}
                className="h-7 text-xs border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg px-3"
              >
                Edit Parameters
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
