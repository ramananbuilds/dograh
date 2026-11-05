import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { WorkflowRun } from '@/types/run';

const MOCK_RUNS: WorkflowRun[] = [
  {
    id: 'run_9f41a82c',
    workflow_id: 'wf_support_01',
    call_type: 'inbound',
    duration: 142,
    status: 'completed',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    cost_info: { total_cost: 0.18, prompt_tokens: 420, completion_tokens: 310 },
    annotations: {
      disposition: 'Completed Inquiry',
      caller_number: '+1 (415) 890-2134',
      agent_name: 'Customer Support Specialist',
    },
    transcript_url: 'https://cdn.dograh.com/transcripts/run_9f41a82c.json',
    recording_url: 'https://cdn.dograh.com/recordings/sample_audio.mp3',
  },
  {
    id: 'run_3c71e091',
    workflow_id: 'wf_intake_02',
    call_type: 'inbound',
    duration: 218,
    status: 'completed',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    cost_info: { total_cost: 0.32, prompt_tokens: 880, completion_tokens: 540 },
    annotations: {
      disposition: 'Transferred (XFER)',
      caller_number: '+1 (212) 555-8910',
      agent_name: 'Real Estate Lead Qualifier',
    },
    transcript_url: 'https://cdn.dograh.com/transcripts/run_3c71e091.json',
  },
  {
    id: 'run_b88a9120',
    workflow_id: 'wf_outbound_03',
    call_type: 'outbound',
    duration: 48,
    status: 'completed',
    created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    cost_info: { total_cost: 0.08, prompt_tokens: 180, completion_tokens: 95 },
    annotations: {
      disposition: 'Left Voicemail',
      caller_number: '+1 (310) 555-1200',
      agent_name: 'Outbound Appointment Confirmation',
    },
  },
  {
    id: 'run_e52109ab',
    workflow_id: 'wf_support_01',
    call_type: 'inbound',
    duration: 18,
    status: 'failed',
    created_at: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    cost_info: { total_cost: 0.02 },
    annotations: {
      disposition: 'Customer Dropped',
      caller_number: '+1 (650) 555-4321',
      agent_name: 'Customer Support Specialist',
    },
  },
];

export function useAgentRuns(agentId?: string) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['agentRuns', agentId],
    queryFn: async (): Promise<WorkflowRun[]> => {
      try {
        const url = agentId
          ? `/api/v1/workflow/${agentId}/runs`
          : '/api/v1/workflow/runs';
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      if (agentId) {
        return MOCK_RUNS.filter((r) => r.workflow_id === agentId);
      }
      return MOCK_RUNS;
    },
  });
}

export function useAgentRun(agentId: string, runId: string) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['agentRun', agentId, runId],
    queryFn: async (): Promise<WorkflowRun> => {
      try {
        const res = await fetch(`/api/v1/workflow/${agentId}/runs/${runId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const found = MOCK_RUNS.find((r) => r.id === runId);
      return (
        found || {
          id: runId,
          workflow_id: agentId,
          call_type: 'inbound',
          duration: 95,
          status: 'completed',
          created_at: new Date().toISOString(),
          annotations: { disposition: 'Completed' },
        }
      );
    },
    enabled: Boolean(agentId && runId),
  });
}
