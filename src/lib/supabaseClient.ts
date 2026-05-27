import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const checkConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  try {
    new URL(supabaseUrl);
    return true;
  } catch (e) {
    console.error('Invalid VITE_SUPABASE_URL config:', e);
    return false;
  }
};

export const isSupabaseConfigured = checkConfigured();

let client = null;
if (isSupabaseConfigured) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    client = null;
  }
}

export const supabase = client;
