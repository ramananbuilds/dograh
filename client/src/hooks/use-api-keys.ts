import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { ApiKeyItem } from '@/types/api-key';

export const MOCK_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_prod_9921',
    name: 'Production Webhook Gateway',
    prefix: 'dg_live_89a3...',
    created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
    last_used_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    scopes: ['campaigns:write', 'calls:read', 'telephony:full'],
  },
  {
    id: 'key_dev_4412',
    name: 'Staging Integration CLI Key',
    prefix: 'dg_test_41f2...',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    last_used_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    scopes: ['agents:read', 'calls:simulate'],
  },
  {
    id: 'key_analytics_1190',
    name: 'Data Pipeline BI Exporter',
    prefix: 'dg_live_55c9...',
    created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
    last_used_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    scopes: ['reports:read', 'usage:read'],
  },
];

export function useApiKeys() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['apiKeys'],
    queryFn: async (): Promise<ApiKeyItem[]> => {
      try {
        const res = await fetch('/api/v1/api-keys', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_API_KEYS;
    },
  });
}
