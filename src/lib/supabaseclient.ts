import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug - remover depois
console.log('🔍 DEBUG Supabase Config:');
console.log('URL exists:', !!supabaseUrl);
console.log('URL value:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);
console.log('Key length:', supabaseAnonKey?.length);

// Verificação de configuração do Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas. Usando dados mock.');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl || 'UNDEFINED');
  console.warn('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'EXISTS' : 'UNDEFINED');
}

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
