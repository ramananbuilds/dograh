import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { KnowledgeDoc } from '@/types/knowledge-base';

export const MOCK_KB_DOCS: KnowledgeDoc[] = [
  {
    id: 'kb_doc_01',
    name: 'Standard_Refund_and_Cancellation_Policy_v4.pdf',
    file_type: 'pdf',
    size_kb: 1420,
    total_chunks: 38,
    status: 'indexed',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'kb_doc_02',
    name: 'Customer_Support_FAQ_and_Troubleshooting.docx',
    file_type: 'docx',
    size_kb: 890,
    total_chunks: 52,
    status: 'indexed',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: 'kb_doc_03',
    name: 'Enterprise_Tier_SLA_India_Pricing_INR.pdf',
    file_type: 'pdf',
    size_kb: 512,
    total_chunks: 24,
    status: 'indexed',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'kb_doc_04',
    name: 'https://docs.company.in/api/v2/webhooks',
    file_type: 'url',
    size_kb: 340,
    total_chunks: 19,
    status: 'indexed',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

export function useKnowledgeBase() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['knowledgeBase'],
    queryFn: async (): Promise<KnowledgeDoc[]> => {
      try {
        const res = await fetch('/api/v1/knowledge-base/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_KB_DOCS;
    },
  });
}
