import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import type { CallRecording } from '@/types/recording';

export const MOCK_RECORDINGS: CallRecording[] = [
  {
    id: 'rec_9012a',
    call_id: 'call_live_7718',
    agent_name: 'Customer Support Specialist (Rachel)',
    caller_number: '+91 98450 12345',
    direction: 'inbound',
    duration_seconds: 184,
    sentiment: 'positive',
    outcome: 'completed',
    cost_inr: 5.52,
    latency_ms: 610,
    audio_url: 'https://cdn.dograh.ai/demo/rec_sample1.mp3',
    transcript_preview: 'Caller asked for billing statement breakdown. Agent resolved query and offered SMS receipt.',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'rec_9012b',
    call_id: 'call_live_7719',
    agent_name: 'Inbound Sales Qualifier (Adam)',
    caller_number: '+91 97112 88492',
    direction: 'outbound',
    duration_seconds: 96,
    sentiment: 'positive',
    outcome: 'transferred',
    cost_inr: 2.88,
    latency_ms: 580,
    audio_url: 'https://cdn.dograh.ai/demo/rec_sample2.mp3',
    transcript_preview: 'Customer verified interest in Enterprise tier with 50 concurrency lines. Transferred to account manager.',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'rec_9012c',
    call_id: 'call_live_7720',
    agent_name: 'Healthcare Appointment Booking (Drew)',
    caller_number: '+91 99001 44551',
    direction: 'inbound',
    duration_seconds: 142,
    sentiment: 'neutral',
    outcome: 'completed',
    cost_inr: 4.26,
    latency_ms: 645,
    audio_url: 'https://cdn.dograh.ai/demo/rec_sample3.mp3',
    transcript_preview: 'Patient scheduled Dr. Verma appointment for Friday 4:30 PM. Appointment ID #AP-8821 generated.',
    created_at: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
  },
  {
    id: 'rec_9012d',
    call_id: 'call_live_7721',
    agent_name: 'Collections & Payment Followup (Sarah)',
    caller_number: '+91 98200 66712',
    direction: 'outbound',
    duration_seconds: 34,
    sentiment: 'neutral',
    outcome: 'voicemail',
    cost_inr: 1.02,
    latency_ms: 520,
    audio_url: 'https://cdn.dograh.ai/demo/rec_sample4.mp3',
    transcript_preview: 'Voicemail detected after 4 rings. Agent left polite callback prompt with reference token.',
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'rec_9012e',
    call_id: 'call_live_7722',
    agent_name: 'Customer Support Specialist (Rachel)',
    caller_number: '+91 91234 56789',
    direction: 'inbound',
    duration_seconds: 228,
    sentiment: 'positive',
    outcome: 'completed',
    cost_inr: 6.84,
    latency_ms: 595,
    audio_url: 'https://cdn.dograh.ai/demo/rec_sample5.mp3',
    transcript_preview: 'Customer changed flight booking successfully via integrated airline ticketing tool.',
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
];

export function useRecordings() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['recordings'],
    queryFn: async (): Promise<CallRecording[]> => {
      try {
        const res = await fetch('/api/v1/workflow/recordings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {
        // Backend offline
      }
      return MOCK_RECORDINGS;
    },
  });
}
