import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useVoices(provider?: string) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['voices', provider],
    queryFn: async () => {
      const url = provider
        ? `/api/v1/configurations/voices/${provider}`
        : '/api/v1/configurations/defaults';
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch voices');
      return res.json();
    },
    enabled: Boolean(provider),
  });
}
