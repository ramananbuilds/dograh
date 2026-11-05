import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { OrganizationContext, OrganizationPreferences } from '@/types/organization';

export function useOrganization() {
  const token = useAuthStore((s) => s.token);
  const contextQuery = useQuery({
    queryKey: ['orgContext'],
    queryFn: async (): Promise<OrganizationContext> => {
      const res = await fetch('/api/v1/context', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch org context');
      return res.json();
    },
  });

  const preferencesQuery = useQuery({
    queryKey: ['orgPreferences'],
    queryFn: async (): Promise<OrganizationPreferences> => {
      const res = await fetch('/api/v1/preferences', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch org preferences');
      return res.json();
    },
  });

  return {
    context: contextQuery.data,
    preferences: preferencesQuery.data,
    isLoading: contextQuery.isLoading || preferencesQuery.isLoading,
  };
}
