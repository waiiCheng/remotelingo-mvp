import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use dummy values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Job {
  id: number;
  title: string;
  company: string;
  logo?: string;
  initials?: string;
  logoBg?: string;
  color?: string;
  languages: string[];
  level?: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  location: string;
  type: string;
  tags: string[];
  apply_url?: string;
  description?: string;
  posted_at: string;
  featured: boolean;
  ai_verified: boolean;
  source: string;
  match_score: number;
  summary?: string;
  created_at?: string;
  updated_at?: string;
}
