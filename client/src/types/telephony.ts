export interface TelephonyConfiguration {
  id: string;
  name: string;
  provider: 'twilio' | 'telnyx' | 'plivo' | 'exotel' | 'custom_sip';
  phone_numbers?: string[];
  created_at: string;
}

