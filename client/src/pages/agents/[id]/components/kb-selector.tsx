import { useState } from 'react';
import { useKnowledgeBase } from '@/hooks/use-knowledge-base';
import { BookOpen, Check, FileText } from 'lucide-react';

export function KbSelector() {
  const { data: docs = [] } = useKnowledgeBase();
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({
    kb_doc_01: true,
    kb_doc_02: true,
  });

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#111215] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          Grounding Knowledge Bases
        </h3>
        <span className="text-[11px] font-mono text-zinc-400">
          {Object.values(selectedDocs).filter(Boolean).length} Attached
        </span>
      </div>

      <div className="space-y-2.5">
        {docs.map((doc) => {
          const isSelected = !!selectedDocs[doc.id];

          return (
            <div
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                isSelected
                  ? 'border-cyan-800/60 bg-cyan-950/20'
                  : 'border-zinc-800/70 bg-zinc-900/40 hover:border-zinc-700/70'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs font-semibold text-white truncate max-w-xs">{doc.name}</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {doc.total_chunks} chunks · {doc.file_type.toUpperCase()}
                </div>
              </div>

              <div
                className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-cyan-500 border-cyan-400 text-zinc-950'
                    : 'border-zinc-700 bg-zinc-800 text-transparent'
                }`}
              >
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
