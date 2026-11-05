import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { WorkflowDefinition } from '@/types/agent';

const MOCK_AGENTS: WorkflowDefinition[] = [
  {
    id: 'wf_support_01',
    name: 'Customer Support Specialist',
    description: 'Handles tier-1 inquiries, refunds, and ticket escalation with empathetic voice pacing.',
    status: 'active',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'wf_intake_02',
    name: 'Real Estate Lead Qualifier',
    description: 'Inbound screener for property buyers and scheduled tour booking.',
    status: 'active',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'wf_outbound_03',
    name: 'Outbound Appointment Confirmation',
    description: 'Automated outbound confirmation calls with interactive rescheduling.',
    status: 'draft',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useAgents() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  const agentsQuery = useQuery({
    queryKey: ['agents'],
    queryFn: async (): Promise<WorkflowDefinition[]> => {
      try {
        const res = await fetch('/api/v1/workflow/fetch', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_AGENTS;
    },
  });

  const createAgentMutation = useMutation({
    mutationFn: async (data: Partial<WorkflowDefinition>) => {
      try {
        const res = await fetch('/api/v1/workflow/create/definition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const newMock: WorkflowDefinition = {
        id: `wf_${Date.now()}`,
        name: data.name || 'New Voice Agent',
        description: data.description || '',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      MOCK_AGENTS.unshift(newMock);
      return newMock;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  return {
    agents: agentsQuery.data ?? MOCK_AGENTS,
    isLoading: agentsQuery.isLoading,
    error: agentsQuery.error,
    createAgent: createAgentMutation.mutateAsync,
  };
}

export function useAgent(id: string) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['agent', id],
    queryFn: async (): Promise<WorkflowDefinition> => {
      try {
        const res = await fetch(`/api/v1/workflow/fetch/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const found = MOCK_AGENTS.find((a) => a.id === id);
      return found || {
        id,
        name: 'Voice Agent',
        description: 'Conversational agent configuration',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    },
    enabled: Boolean(id),
  });
}
