import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 DEBUG SUPABASE:');
console.log('URL:', supabaseUrl);
console.log('KEY exists:', !!supabaseAnonKey);
console.log('KEY length:', supabaseAnonKey?.length);
console.log('KEY starts with eyJ:', supabaseAnonKey?.startsWith('eyJ'));

export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey;
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      db: {
        schema: 'portfolio'
      }
    })
  : null;
