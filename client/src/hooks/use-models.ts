import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { ModelConfiguration } from '@/types/model';

const MOCK_MODELS: ModelConfiguration[] = [
  {
    uuid: 'model_fast_reasoning',
    name: 'Fast Reasoning (GPT-4o Mini)',
    provider: 'openai',
    model_id: 'gpt-4o-mini',
    is_default: true,
    temperature: 0.7,
  },
  {
    uuid: 'model_deep_conversational',
    name: 'Deep Conversational (Claude 3.5 Sonnet)',
    provider: 'anthropic',
    model_id: 'claude-3-5-sonnet',
    is_default: false,
    temperature: 0.5,
  },
  {
    uuid: 'model_realtime_flash',
    name: 'Realtime Voice (Gemini 2.0 Flash)',
    provider: 'google',
    model_id: 'gemini-2.0-flash',
    is_default: false,
    temperature: 0.6,
  },
];

export function useModels() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['models'],
    queryFn: async (): Promise<ModelConfiguration[]> => {
      try {
        const res = await fetch('/api/v1/model-connections/configurations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_MODELS;
    },
  });
}
