import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { TelephonyConfiguration } from '@/types/telephony';

export const MOCK_TELEPHONY: TelephonyConfiguration[] = [
  {
    id: 'tc_exotel_mumbai_01',
    name: 'India Primary SIP Trunk (Exotel Mumbai)',
    provider: 'exotel',
    phone_numbers: ['+91 22 6982 4400', '+91 22 6982 4401'],
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: 'tc_twilio_bangalore_02',
    name: 'Twilio Cloud Gateway (Bangalore DC)',
    provider: 'twilio',
    phone_numbers: ['+91 80 4719 3300', '+91 80 4719 3301', '+91 80 4719 3302'],
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: 'tc_telnyx_global_03',
    name: 'Telnyx Global Outbound SIP',
    provider: 'telnyx',
    phone_numbers: ['+1 415 800 2911', '+44 20 7946 0192'],
    created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
];

export function useTelephony() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['telephony'],
    queryFn: async (): Promise<TelephonyConfiguration[]> => {
      try {
        const res = await fetch('/api/v1/telephony-configs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_TELEPHONY;
    },
  });
}
