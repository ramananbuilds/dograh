import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { Campaign } from '@/types/campaign';

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_reactivation_01',
    name: 'Q4 Customer Reactivation (North India)',
    status: 'running',
    workflow_id: 'wf_support_01',
    total_leads: 1250,
    completed_calls: 842,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'camp_survey_02',
    name: 'Post-Purchase NPS & Feedback (Bangalore)',
    status: 'paused',
    workflow_id: 'wf_outbound_03',
    total_leads: 500,
    completed_calls: 310,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'camp_emi_reminder_03',
    name: 'Monthly EMI Payment Friendly Reminders',
    status: 'running',
    workflow_id: 'wf_support_01',
    total_leads: 3200,
    completed_calls: 2840,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'camp_webinar_vip_04',
    name: 'Enterprise AI Summit VIP Invitations',
    status: 'completed',
    workflow_id: 'wf_sales_02',
    total_leads: 450,
    completed_calls: 450,
    created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export function useCampaigns() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  const campaignsQuery = useQuery({
    queryKey: ['campaigns'],
    queryFn: async (): Promise<Campaign[]> => {
      try {
        const res = await fetch('/api/v1/campaign/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_CAMPAIGNS;
    },
  });

  const startCampaign = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/v1/campaign/${id}/start`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const c = MOCK_CAMPAIGNS.find((item) => item.id === id);
      if (c) c.status = 'running';
      return c;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const pauseCampaign = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/v1/campaign/${id}/pause`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const c = MOCK_CAMPAIGNS.find((item) => item.id === id);
      if (c) c.status = 'paused';
      return c;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  return {
    campaigns: campaignsQuery.data ?? MOCK_CAMPAIGNS,
    isLoading: campaignsQuery.isLoading,
    startCampaign: startCampaign.mutateAsync,
    pauseCampaign: pauseCampaign.mutateAsync,
  };
}

export function useCampaign(id: string) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: async (): Promise<Campaign> => {
      try {
        const res = await fetch(`/api/v1/campaign/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const found = MOCK_CAMPAIGNS.find((c) => c.id === id);
      if (found) return found;
      return {
        id,
        name: 'Q4 Customer Reactivation (North India)',
        status: 'running',
        workflow_id: 'wf_support_01',
        total_leads: 1250,
        completed_calls: 842,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        updated_at: new Date().toISOString(),
      };
    },
    enabled: Boolean(id),
  });
}
