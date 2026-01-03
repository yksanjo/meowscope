export type UserTier = 'basic' | 'enhanced';

export interface Profile {
  id: string;
  email: string;
  tier: UserTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
  created_at: string;
  updated_at: string;
}

export interface AnalysisHistory {
  id: string;
  user_id: string;
  category: string;
  confidence: number;
  fgc_code: string;
  created_at: string;
}
