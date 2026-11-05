import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
  selected_organization_id?: string;
}

interface AuthState {
  token: string | null;
  apiKey: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  setApiKey: (apiKey: string) => void;
  logout: () => void;
}

const getInitialUser = (): User => {
  try {
    const raw = localStorage.getItem('dograh_user');
    if (raw && raw !== 'undefined' && raw !== 'null') {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore parse error
  }
  return {
    id: 'usr_standalone_demo',
    email: 'operator@dograh.com',
    name: 'Console Operator',
    selected_organization_id: 'org_dograh_primary',
  };
};

const getInitialToken = (): string => {
  try {
    return localStorage.getItem('dograh_token') || 'demo-standalone-token';
  } catch {
    return 'demo-standalone-token';
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  apiKey: localStorage.getItem('dograh_api_key'),
  user: getInitialUser(),
  // Standalone mode: always authenticated so the user immediately sees the full dashboard
  isAuthenticated: true,
  setAuth: (token, user) => {
    try {
      localStorage.setItem('dograh_token', token);
      localStorage.setItem('dograh_user', JSON.stringify(user));
    } catch {
      // Ignore
    }
    set({ token, user, isAuthenticated: true });
  },
  setApiKey: (apiKey) => {
    try {
      localStorage.setItem('dograh_api_key', apiKey);
    } catch {
      // Ignore
    }
    set({ apiKey, isAuthenticated: true });
  },
  logout: () => {
    try {
      localStorage.removeItem('dograh_token');
      localStorage.removeItem('dograh_user');
      localStorage.removeItem('dograh_api_key');
    } catch {
      // Ignore
    }
    set({ token: null, apiKey: null, user: null, isAuthenticated: false });
  },
}));
