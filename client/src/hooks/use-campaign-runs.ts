import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { WorkflowRun } from '@/types/run';

export const MOCK_CAMPAIGN_RUNS: WorkflowRun[] = [
  {
    id: 'run_camp_88201',
    workflow_id: 'wf_support_01',
    call_type: 'outbound_telephony',
    duration: 182,
    status: 'completed',
    cost_info: { total_inr: 5.46 },
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    annotations: {
      phone: '+91 98450 12345',
      disposition: 'answered',
      agent_version: 'Rachel Turbo v2.5',
    },
  },
  {
    id: 'run_camp_88202',
    workflow_id: 'wf_support_01',
    call_type: 'outbound_telephony',
    duration: 94,
    status: 'completed',
    cost_info: { total_inr: 2.82 },
    created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    annotations: {
      phone: '+91 97112 88492',
      disposition: 'transferred',
      agent_version: 'Rachel Turbo v2.5',
    },
  },
  {
    id: 'run_camp_88203',
    workflow_id: 'wf_support_01',
    call_type: 'outbound_telephony',
    duration: 25,
    status: 'completed',
    cost_info: { total_inr: 0.75 },
    created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    annotations: {
      phone: '+91 98200 66712',
      disposition: 'voicemail',
      agent_version: 'Cartesia Sonic v1.4',
    },
  },
  {
    id: 'run_camp_88204',
    workflow_id: 'wf_support_01',
    call_type: 'outbound_telephony',
    duration: 0,
    status: 'failed',
    cost_info: { total_inr: 0.0 },
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    annotations: {
      phone: '+91 99001 44551',
      disposition: 'busy',
      agent_version: 'Rachel Turbo v2.5',
    },
  },
  {
    id: 'run_camp_88205',
    workflow_id: 'wf_support_01',
    call_type: 'outbound_telephony',
    duration: 215,
    status: 'completed',
    cost_info: { total_inr: 6.45 },
    created_at: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    annotations: {
      phone: '+91 91234 56789',
      disposition: 'answered',
      agent_version: 'Rachel Turbo v2.5',
    },
  },
];

export function useCampaignRuns(campaignId: string) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['campaignRuns', campaignId],
    queryFn: async (): Promise<WorkflowRun[]> => {
      try {
        const res = await fetch(`/api/v1/campaign/${campaignId}/runs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_CAMPAIGN_RUNS;
    },
    enabled: Boolean(campaignId),
  });
}
