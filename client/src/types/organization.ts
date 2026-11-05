export interface OrganizationPreferences {
  default_timezone: string;
  default_voice_provider?: string;
  default_llm_provider?: string;
  webhook_url?: string;
}

export interface OrganizationContext {
  id: string;
  name: string;
  role: string;
  created_at: string;
}

