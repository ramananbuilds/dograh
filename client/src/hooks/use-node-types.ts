import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useNodeTypes() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['nodeTypes'],
    queryFn: async () => {
      const res = await fetch('/api/v1/node-types', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch node types');
      return res.json();
    },
  });
}
