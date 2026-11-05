import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAgents } from '@/hooks/use-agents';
import {
  ArrowLeft,
  Sparkles,
  Bot,
  Play,
  Cpu,
} from 'lucide-react';

const PRESET_VOICES = [
  {
    id: 'eleven_rachel',
    name: 'Rachel',
    gender: 'Female',
    accent: 'American',
    style: 'Calm & Professional',
    model: 'ElevenLabs Turbo v2.5',
    latency: '120ms',
  },
  {
    id: 'eleven_adam',
    name: 'Adam',
    gender: 'Male',
    accent: 'American',
    style: 'Deep & Authoritative',
    model: 'ElevenLabs Turbo v2.5',
    latency: '125ms',
  },
  {
    id: 'eleven_drew',
    name: 'Drew',
    gender: 'Male',
    accent: 'British',
    style: 'Warm & Conversational',
    model: 'ElevenLabs Multilingual v2',
    latency: '140ms',
  },
  {
    id: 'eleven_sarah',
    name: 'Sarah',
    gender: 'Female',
    accent: 'Indian / Global',
    style: 'Friendly & Cheerful',
    model: 'ElevenLabs Turbo v2.5',
    latency: '115ms',
  },
];

export default function CreateAgentPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [firstMessage, setFirstMessage] = useState(
    'Hello! Thank you for calling Dograh Support. How can I help you today?'
  );
  const [selectedVoice, setSelectedVoice] = useState('eleven_rachel');
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);

  const { createAgent } = useAgents();
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent = await createAgent({ name, description });
    navigate(newAgent?.id ? `/agents/${newAgent.id}` : '/agents');
  };

  const handlePreview = (voiceId: string) => {
    setPreviewingVoice(voiceId);
    setTimeout(() => setPreviewingVoice(null), 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Top Header */}
      <div className="space-y-1.5 border-b border-zinc-800/80 pb-6">
        <Link to="/agents" className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Agent Library
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Create Voice Agent
        </h1>
        <p className="text-xs text-zinc-400">
          Configure persona, select an ElevenLabs synthetic voice, and author the opening conversation turn.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Basic Agent Metadata */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Bot className="h-4 w-4 text-emerald-400" />
            Agent Identity & Purpose
          </h2>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-zinc-300">Agent Name</Label>
            <Input
              id="name"
              placeholder="e.g., Inbound Support & Booking Specialist"
              required
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl focus-visible:ring-zinc-700 h-9"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc" className="text-xs text-zinc-300">Role Summary / Prompt Mission</Label>
            <Textarea
              id="desc"
              rows={3}
              placeholder="You are an empathetic, concise support rep for Dograh. You assist users with billing inquiries, account updates, and scheduling callbacks..."
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl focus-visible:ring-zinc-700 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstMsg" className="text-xs text-zinc-300">First Utterance (Spoken upon call pickup)</Label>
            <Input
              id="firstMsg"
              required
              className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl focus-visible:ring-zinc-700 h-9 font-mono"
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
            />
          </div>
        </div>

        {/* ElevenLabs Voice Selector Grid */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              ElevenLabs Voice Engine
            </h2>
            <span className="text-[11px] text-zinc-400 font-mono">192kbps MP3 Streaming</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_VOICES.map((voice) => {
              const isSelected = selectedVoice === voice.id;
              const isPlaying = previewingVoice === voice.id;

              return (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-white bg-zinc-800/60 shadow-sm'
                      : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                        {voice.name}
                        <span className="text-[10px] text-zinc-400 font-normal">({voice.accent})</span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">{voice.style}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-1">
                        {voice.model} · {voice.latency}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(voice.id);
                      }}
                      className={`h-7 w-7 p-0 rounded-full ${
                        isPlaying
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                          : 'bg-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reasoning LLM */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            Reasoning Brain (LLM)
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'gpt-4o-mini', name: 'GPT-4o Mini', latency: '180ms TTFT', provider: 'OpenAI' },
              { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', latency: '290ms TTFT', provider: 'Anthropic' },
              { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', latency: '145ms TTFT', provider: 'Google' },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`rounded-xl border p-3 cursor-pointer text-center transition-all ${
                  selectedModel === m.id
                    ? 'border-white bg-zinc-800/60'
                    : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80'
                }`}
              >
                <div className="font-semibold text-xs text-white">{m.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{m.latency}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{m.provider}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Submission Actions */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/agents')}
            className="border-zinc-800 bg-[#111215] text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-9 rounded-xl px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs h-9 rounded-xl px-5 shadow-sm"
          >
            Create & Enter Studio →
          </Button>
        </div>
      </form>
    </div>
  );
}
