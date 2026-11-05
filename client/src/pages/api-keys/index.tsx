import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApiKeys } from '@/hooks/use-api-keys';
import { formatDateTime } from '@/lib/format';
import {
  Key,
  Plus,
  Copy,
  Check,
  ShieldAlert,
  Terminal,
  Trash2,
} from 'lucide-react';
import type { ApiKeyItem } from '@/types/api-key';

export default function ApiKeysPage() {
  const { data: keys = [] } = useApiKeys();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: ApiKeyItem) => {
    navigator.clipboard.writeText(`${key.prefix}DEMO_TOKEN_Dograh_2026`);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Developer API Keys
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {keys.length} Active
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage authentication tokens for Dograh SDKs, WebRTC sessions, and automated campaign triggering.
          </p>
        </div>
        <Button
          onClick={() => alert('New API Key generated: dg_live_xyz982341902834 (Copy and save securely)')}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Create Secret Key
        </Button>
      </div>

      {/* Security Alert Banner */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-4 flex items-center gap-3">
        <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
        <p className="text-xs text-zinc-300">
          Your API keys carry full administrative permissions to dispatch calls and bill your INR credit balance.
          Never expose keys in client-side code or public GitHub repositories.
        </p>
      </div>

      {/* Keys Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
            <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">Key Name</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Secret Token</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Granted Scopes</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Created</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Last Active</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key: ApiKeyItem) => (
              <TableRow key={key.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Key className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="font-medium text-xs text-white">{key.name}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {key.id}</div>
                </TableCell>

                <TableCell className="py-3">
                  <code className="text-xs font-mono text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {key.prefix}
                  </code>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex flex-wrap gap-1">
                    {key.scopes.map((scope) => (
                      <Badge
                        key={scope}
                        variant="outline"
                        className="border-zinc-800 bg-zinc-900/60 text-zinc-400 text-[10px] font-mono"
                      >
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="py-3 text-xs font-mono text-zinc-400">
                  {formatDateTime(key.created_at)}
                </TableCell>

                <TableCell className="py-3 text-xs font-mono text-emerald-400">
                  {key.last_used_at ? formatDateTime(key.last_used_at) : 'Never'}
                </TableCell>

                <TableCell className="text-right py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(key)}
                    className="h-7 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-2.5 mr-1"
                  >
                    {copiedId === key.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                    <span className="ml-1 text-[11px]">{copiedId === key.id ? 'Copied' : 'Copy'}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => alert(`Revoked key ${key.id}`)}
                    className="h-7 w-7 p-0 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* SDK Quickstart */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Terminal className="h-4 w-4 text-cyan-400" />
          Python & TypeScript Quickstart
        </div>
        <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/70 text-xs font-mono text-zinc-300 overflow-x-auto">
{`from dograh import DograhClient

client = DograhClient(api_key="dg_live_89a3...")

# Trigger outbound call with ElevenLabs voice agent
call = client.calls.create(
    to="+919845012345",
    agent_id="agent_support_rachel",
    variables={"first_name": "Ramanan"}
)
print(f"Call initiated: {call.id}")`}
        </pre>
      </div>
    </div>
  );
}
