import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useServiceKeys() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['serviceKeys'],
    queryFn: async () => {
      const res = await fetch('/api/v1/user/service-keys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch service keys');
      return res.json();
    },
  });
}
