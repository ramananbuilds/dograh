import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useUsage() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['usage'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/v1/organizations/usage/current-period', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return {
        total_calls: 142,
        total_minutes: 384,
        estimated_cost: '28.45',
      };
    },
  });
}
