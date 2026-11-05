export interface Tool {
  id: string;
  name: string;
  description: string;
  tool_type: 'http_api' | 'mcp' | 'calculator' | 'end_call' | 'transfer_call';
  definition?: Record<string, any>;
  created_at: string;
}

