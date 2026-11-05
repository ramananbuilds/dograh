export interface WorkflowDefinition {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
  nodes?: any[];
  edges?: any[];
  version?: number;
}

export interface AgentSummary {
  id: string;
  name: string;
  status: string;
  total_calls?: number;
  avg_duration?: number;
}

