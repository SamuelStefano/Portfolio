import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação de configuração do Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas. Usando dados mock.');
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
