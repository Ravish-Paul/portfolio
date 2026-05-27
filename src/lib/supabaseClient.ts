import { createClient } from '@supabase/supabase-js';

const getEnvValue = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta && 'env' in import.meta) {
      return (import.meta as any).env[key] || '';
    }
  } catch (e) {}
  try {
    const globalProcess = (globalThis as any).process;
    if (typeof globalProcess !== 'undefined' && globalProcess && 'env' in globalProcess) {
      return globalProcess.env[key] || '';
    }
  } catch (e) {}
  return '';
};

const supabaseUrl = getEnvValue('VITE_SUPABASE_URL').trim();
const supabaseAnonKey = getEnvValue('VITE_SUPABASE_ANON_KEY').trim();


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
