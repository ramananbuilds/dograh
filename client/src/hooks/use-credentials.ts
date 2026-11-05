import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useCredentials() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      const res = await fetch('/api/v1/credentials/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch credentials');
      return res.json();
    },
  });
}

