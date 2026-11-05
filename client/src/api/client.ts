import type { CreateClientConfig } from '@hey-api/client-fetch';
import { useAuthStore } from '@/stores/auth-store';

export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
};

export const createClientConfig: CreateClientConfig = (config) => {
  return {
    ...config,
    baseUrl: getApiBaseUrl(),
    headers: {
      ...config?.headers,
      ...(useAuthStore.getState().token
        ? { Authorization: `Bearer ${useAuthStore.getState().token}` }
        : {}),
      ...(useAuthStore.getState().apiKey
        ? { 'X-API-Key': useAuthStore.getState().apiKey! }
        : {}),
    },
  };
};
