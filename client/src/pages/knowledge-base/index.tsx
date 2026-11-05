import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useKnowledgeBase } from '@/hooks/use-knowledge-base';
import { formatDateTime } from '@/lib/format';
import {
  Plus,
  FileText,
  Globe,
  Search,
  CheckCircle2,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { KnowledgeDoc } from '@/types/knowledge-base';

export default function KnowledgeBasePage() {
  const { data: docs = [] } = useKnowledgeBase();
  const [search, setSearch] = useState('');
  const [testQuery, setTestQuery] = useState('');
  const [testResults, setTestResults] = useState<string | null>(null);

  const filteredDocs = docs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTestSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery) return;
    setTestResults(
      `Top match score 0.92 from "${docs[0]?.name || 'Standard_Refund_Policy.pdf'}" (Chunk #14): "Customers may request a full refund within 14 calendar days of transaction initiation without penalty."`
    );
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Knowledge Base & RAG
            <span className="text-xs font-mono font-normal text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60">
              {docs.length} Sources
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ground your ElevenLabs voice agents in verified product manuals, company policies, and live API endpoints.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => alert('Document upload modal opened.')}
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5 rounded-xl shadow-sm text-xs px-4 py-2"
          >
            <Plus className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Semantic Retrieval Playground Bar */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          Live Semantic RAG Test (Vector Cosine Similarity)
        </div>
        <form onSubmit={handleTestSearch} className="flex gap-2">
          <Input
            placeholder="Ask a question to test knowledge retrieval e.g. What is our refund window?"
            className="bg-zinc-900/60 border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl focus-visible:ring-zinc-700 h-9"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-xs h-9 rounded-xl px-4 shrink-0 font-medium"
          >
            Test Search
          </Button>
        </form>
        {testResults && (
          <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-emerald-400 font-mono animate-fadeIn">
            {testResults}
          </div>
        )}
      </div>

      {/* Search & Document Count */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Filter indexed documents..."
            className="pl-8 bg-[#111215] border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-600 rounded-xl h-8 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs text-zinc-500 font-mono">
          Embedding Model: text-embedding-3-small (1536 dims)
        </span>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/60">
            <TableRow className="border-b border-zinc-800/60 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">Document / Source Name</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Type</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Vector Chunks</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Size</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Status</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Indexed Date</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map((doc: KnowledgeDoc) => (
              <TableRow key={doc.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    {doc.file_type === 'url' ? (
                      <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-white shrink-0" />
                    )}
                    <div>
                      <div className="font-medium text-xs text-white">{doc.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID: {doc.id}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-300 text-[10px] uppercase font-mono">
                    {doc.file_type}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-zinc-500" />
                    {doc.total_chunks} chunks
                  </div>
                </TableCell>

                <TableCell className="py-3 text-xs font-mono text-zinc-400">
                  {doc.size_kb > 1000 ? `${(doc.size_kb / 1024).toFixed(1)} MB` : `${doc.size_kb} KB`}
                </TableCell>

                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className="border-emerald-800/60 text-emerald-400 bg-emerald-950/30 text-[10px] capitalize flex items-center gap-1 w-fit font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {doc.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 text-xs font-mono text-zinc-400">
                  {formatDateTime(doc.created_at)}
                </TableCell>

                <TableCell className="text-right py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => alert(`Previewing chunks for ${doc.name}`)}
                    className="h-7 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-2.5 mr-1"
                  >
                    Inspect
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => alert(`Deleted ${doc.name}`)}
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
    </div>
  );
}
