export interface ModelConfiguration {
  uuid: string;
  name: string;
  provider: string;
  model_id: string;
  is_default: boolean;
  temperature?: number;
}

