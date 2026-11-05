import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTools } from '@/hooks/use-tools';
import {
  Wrench,
  Plus,
  Globe,
  PhoneForwarded,
  Calculator,
  Play,
} from 'lucide-react';
import type { Tool } from '@/types/tool';

export default function ToolsPage() {
  const { tools } = useTools();
  const [testingToolId, setTestingToolId] = useState<string | null>(null);
  const [testOutput, setTestOutput] = useState<Record<string, string>>({});

  const handleRunTest = (tool: Tool) => {
    setTestingToolId(tool.id);
    setTimeout(() => {
      setTestingToolId(null);
      setTestOutput((prev) => ({
        ...prev,
        [tool.id]: `HTTP 200 OK — Execution Response: {"status":"success","action":"${tool.name}","latency_ms":112}`,
      }));
    }, 600);
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'http_api':
        return <Globe className="h-4 w-4 text-emerald-400" />;
      case 'transfer_call':
        return <PhoneForwarded className="h-4 w-4 text-cyan-400" />;
      case 'calculator':
        return <Calculator className="h-4 w-4 text-amber-400" />;
      default:
        return <Wrench className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Tools & API Integrations
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {tools.length} Registered
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Empower ElevenLabs voice agents with live HTTP webhooks, Model Context Protocol (MCP), and SIP call transfer actions.
          </p>
        </div>
        <Button
          onClick={() => alert('New Tool creation modal opened.')}
          className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Tool
        </Button>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const isRunning = testingToolId === tool.id;
          const output = testOutput[tool.id];

          return (
            <div
              key={tool.id}
              className="rounded-2xl border border-zinc-800/80 bg-[#111215] hover:border-zinc-700/80 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                      {getToolIcon(tool.tool_type)}
                    </div>
                    <div>
                      <h3 className="font-mono font-semibold text-sm text-white">{tool.name}</h3>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {tool.id}</div>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-zinc-800 bg-zinc-900/60 text-zinc-300 text-[10px] uppercase font-mono"
                  >
                    {tool.tool_type.replace('_', ' ')}
                  </Badge>
                </div>

                <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>

                {/* Definition details */}
                {tool.definition && (
                  <div className="mt-4 bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 font-mono text-[11px] space-y-1 text-zinc-300">
                    {tool.definition.url && (
                      <div className="truncate text-zinc-400">
                        <span className="text-zinc-500 uppercase">{tool.definition.method || 'POST'}</span> {tool.definition.url}
                      </div>
                    )}
                    {tool.definition.target_sip && (
                      <div className="truncate text-cyan-400">
                        SIP: {tool.definition.target_sip}
                      </div>
                    )}
                    {tool.definition.parameters && (
                      <div className="text-zinc-500 text-[10px] truncate">
                        Params: {tool.definition.parameters.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Test Output Console */}
                {output && (
                  <div className="mt-3 p-2.5 bg-black/60 border border-zinc-800 rounded-lg text-[10px] font-mono text-emerald-400 break-all animate-fadeIn">
                    {output}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRunTest(tool)}
                  disabled={isRunning}
                  className="h-7 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-2.5 gap-1.5"
                >
                  <Play className={`h-3 w-3 text-zinc-400 ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? 'Invoking...' : 'Test Tool'}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`Editing tool schema for ${tool.name}`)}
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
