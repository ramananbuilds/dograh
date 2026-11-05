import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

export interface DailyReportData {
  date: string;
  metrics: {
    total_runs: number;
    completed_runs: number;
    failed_runs: number;
    xfer_count: number;
    total_duration_seconds: number;
    avg_duration_seconds: number;
    avg_ttfb_ms: number;
    total_cost: number;
  };
  hourly_volume: Array<{
    time: string;
    calls: number;
    concurrent_peak: number;
  }>;
  disposition_distribution: Array<{
    disposition: string;
    count: number;
    percentage: number;
  }>;
  call_duration_distribution: Array<{
    bucket: string;
    range_start: number;
    range_end: number | null;
    count: number;
    percentage: number;
  }>;
  latency_distribution: Array<{
    stage: string;
    latency_ms: number;
  }>;
}

const MOCK_REPORT: DailyReportData = {
  date: new Date().toISOString().split('T')[0],
  metrics: {
    total_runs: 184,
    completed_runs: 162,
    failed_runs: 6,
    xfer_count: 16,
    total_duration_seconds: 24890,
    avg_duration_seconds: 135,
    avg_ttfb_ms: 460,
    total_cost: 32.48,
  },
  hourly_volume: [
    { time: '08:00', calls: 8, concurrent_peak: 2 },
    { time: '09:00', calls: 19, concurrent_peak: 4 },
    { time: '10:00', calls: 32, concurrent_peak: 7 },
    { time: '11:00', calls: 41, concurrent_peak: 8 },
    { time: '12:00', calls: 28, concurrent_peak: 5 },
    { time: '13:00', calls: 22, concurrent_peak: 4 },
    { time: '14:00', calls: 38, concurrent_peak: 7 },
    { time: '15:00', calls: 45, concurrent_peak: 9 },
    { time: '16:00', calls: 34, concurrent_peak: 6 },
    { time: '17:00', calls: 20, concurrent_peak: 4 },
    { time: '18:00', calls: 12, concurrent_peak: 3 },
  ],
  disposition_distribution: [
    { disposition: 'Completed Inquiry', count: 98, percentage: 53.3 },
    { disposition: 'Transferred (XFER)', count: 28, percentage: 15.2 },
    { disposition: 'Left Voicemail', count: 32, percentage: 17.4 },
    { disposition: 'Customer Dropped', count: 18, percentage: 9.8 },
    { disposition: 'Telephony Busy', count: 8, percentage: 4.3 },
  ],
  call_duration_distribution: [
    { bucket: '0-10s', range_start: 0, range_end: 10, count: 14, percentage: 7.6 },
    { bucket: '10-30s', range_start: 10, range_end: 30, count: 28, percentage: 15.2 },
    { bucket: '30-60s', range_start: 30, range_end: 60, count: 42, percentage: 22.8 },
    { bucket: '1-3m', range_start: 60, range_end: 180, count: 68, percentage: 37.0 },
    { bucket: '3-5m', range_start: 180, range_end: 300, count: 24, percentage: 13.0 },
    { bucket: '>5m', range_start: 300, range_end: null, count: 8, percentage: 4.4 },
  ],
  latency_distribution: [
    { stage: 'Deepgram STT', latency_ms: 120 },
    { stage: 'LLM TTFB (GPT-4o)', latency_ms: 220 },
    { stage: 'ElevenLabs TTS Chunk', latency_ms: 120 },
  ],
};

export function useReports(dateRange?: { from?: string; to?: string }) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['reports', dateRange],
    queryFn: async (): Promise<DailyReportData> => {
      try {
        const res = await fetch('/api/v1/reports/daily', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const apiData = await res.json();
          return {
            ...MOCK_REPORT,
            ...apiData,
          };
        }
      } catch {
        // Backend offline
      }
      return MOCK_REPORT;
    },
  });
}
