import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { ProviderConnection } from '@/types/connection';

const MOCK_CONNECTIONS: ProviderConnection[] = [
  {
    uuid: 'conn_elevenlabs_01',
    provider_name: 'elevenlabs',
    display_name: 'ElevenLabs Voice Engine',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    uuid: 'conn_openai_02',
    provider_name: 'openai',
    display_name: 'OpenAI GPT-4o Key',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    uuid: 'conn_cartesia_03',
    provider_name: 'cartesia',
    display_name: 'Cartesia Ultra-Low Latency TTS',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export function useConnections() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['connections'],
    queryFn: async (): Promise<ProviderConnection[]> => {
      try {
        const res = await fetch('/api/v1/model-connections/connections', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_CONNECTIONS;
    },
  });
}
