export interface WorkflowRun {
  id: string;
  workflow_id: string;
  call_type?: string;
  duration?: number;
  status: 'completed' | 'failed' | 'in_progress';
  transcript_url?: string;
  recording_url?: string;
  cost_info?: Record<string, any>;
  usage_info?: Record<string, any>;
  created_at: string;
  logs?: any[];
  annotations?: Record<string, any>;
}

