import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';

const AuthContext = createContext<null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    // Check if token exists or expired on mount
  }, [isAuthenticated, logout]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

