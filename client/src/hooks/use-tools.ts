import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { Tool } from '@/types/tool';

export const MOCK_TOOLS: Tool[] = [
  {
    id: 'tool_cal_01',
    name: 'book_calendar_appointment',
    description: 'Reserves an appointment slot in Google Calendar or Cal.com with attendee email and time.',
    tool_type: 'http_api',
    definition: {
      url: 'https://api.company.com/v1/appointments/book',
      method: 'POST',
      parameters: ['slot_time', 'attendee_name', 'phone_number'],
    },
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: 'tool_track_02',
    name: 'check_shipment_status',
    description: 'Queries tracking status, current location, and estimated delivery date from Delhivery/Bluedart API.',
    tool_type: 'http_api',
    definition: {
      url: 'https://api.logistics.in/v2/track',
      method: 'GET',
      parameters: ['tracking_id'],
    },
    created_at: new Date(Date.now() - 86400000 * 35).toISOString(),
  },
  {
    id: 'tool_transfer_03',
    name: 'transfer_call_to_human',
    description: 'Bridges call to human agent queue via SIP transfer when customer sentiment is frustrated or requests representative.',
    tool_type: 'transfer_call',
    definition: {
      target_sip: 'sip:tier2-support@telephony.dograh.ai',
      warm_transfer: true,
    },
    created_at: new Date(Date.now() - 86400000 * 50).toISOString(),
  },
  {
    id: 'tool_emi_04',
    name: 'calculate_loan_emi',
    description: 'Computes monthly EMI and interest schedule for instant quote in INR using principal, tenure, and rate.',
    tool_type: 'calculator',
    definition: {
      currency: 'INR',
      round_off: true,
    },
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: 'tool_sms_05',
    name: 'send_sms_confirmation',
    description: 'Dispatches instant confirmation SMS with reference ID and tracking link to customer phone.',
    tool_type: 'http_api',
    definition: {
      provider: 'gupshup',
      sender_id: 'DOGRAH',
    },
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

export function useTools() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  const toolsQuery = useQuery({
    queryKey: ['tools'],
    queryFn: async (): Promise<Tool[]> => {
      try {
        const res = await fetch('/api/v1/tool/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_TOOLS;
    },
  });

  const createTool = useMutation({
    mutationFn: async (toolData: Partial<Tool>) => {
      try {
        const res = await fetch('/api/v1/tool/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(toolData),
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      const newTool: Tool = {
        id: `tool_${Date.now()}`,
        name: toolData.name || 'custom_tool',
        description: toolData.description || '',
        tool_type: toolData.tool_type || 'http_api',
        created_at: new Date().toISOString(),
      };
      MOCK_TOOLS.unshift(newTool);
      return newTool;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });

  return {
    tools: toolsQuery.data ?? MOCK_TOOLS,
    isLoading: toolsQuery.isLoading,
    createTool: createTool.mutateAsync,
  };
}
