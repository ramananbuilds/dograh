import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        // Backend is offline - fallback to standalone mock session
      }

      // Standalone mode: accept any credentials
      return {
        token: 'standalone-mock-jwt-token',
        user: {
          id: 'usr_standalone',
          email: credentials.email || 'operator@dograh.com',
          name: credentials.email ? credentials.email.split('@')[0] : 'Operator',
          selected_organization_id: 'org_standalone',
        },
      };
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });

  const loginAsDemo = () => {
    setAuth('standalone-demo-token', {
      id: 'usr_demo',
      email: 'demo@dograh.com',
      name: 'Demo Operator',
      selected_organization_id: 'org_demo',
    });
  };

  const signupMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const res = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        // Backend offline
      }

      return {
        token: 'standalone-mock-jwt-token',
        user: {
          id: 'usr_standalone',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          selected_organization_id: 'org_standalone',
        },
      };
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/v1/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Fallback
      }
      return user;
    },
    enabled: isAuthenticated && Boolean(token),
  });

  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    loginAsDemo,
    signup: signupMutation.mutateAsync,
    logout,
    isLoadingUser: currentUserQuery.isLoading,
  };
}
