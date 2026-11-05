export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'failed';
  workflow_id: string;
  total_leads?: number;
  completed_calls?: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignTrafficStats {
  total: number;
  answered: number;
  busy: number;
  failed: number;
}

