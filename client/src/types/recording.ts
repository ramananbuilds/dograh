export interface CallRecording {
  id: string;
  call_id: string;
  agent_name: string;
  caller_number: string;
  direction: 'inbound' | 'outbound';
  duration_seconds: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  outcome: 'completed' | 'transferred' | 'voicemail' | 'busy' | 'failed';
  cost_inr: number;
  latency_ms: number;
  audio_url: string;
  transcript_preview: string;
  created_at: string;
}

