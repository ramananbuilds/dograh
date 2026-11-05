import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Check, Code, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function AgentEmbedPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const snippet = `<script\n  src="https://cdn.dograh.ai/v1/widget.js"\n  data-agent-id="${id}"\n  data-theme="obsidian"\n  data-currency="INR"\n  defer\n></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Top Header */}
      <div className="space-y-1.5 border-b border-zinc-800/80 pb-6">
        <Link to={`/agents/${id}`} className="hover:text-zinc-200 text-xs text-zinc-400 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Agent Studio
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Embed & WebRTC Widget
        </h1>
        <p className="text-xs text-zinc-400">
          Deploy an interactive voice conversation widget on your website with zero configuration.
        </p>
      </div>

      {/* Snippet Card */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Code className="h-4 w-4 text-cyan-400" />
            HTML Embed Code
          </div>
          <Button
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white rounded-xl gap-1.5"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Snippet'}
          </Button>
        </div>

        <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/70 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
          {snippet}
        </pre>

        <div className="text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            Microphone permissions are requested dynamically over secure HTTPS WebRTC transport with Opus audio encoding.
          </span>
        </div>
      </div>
    </div>
  );
}
