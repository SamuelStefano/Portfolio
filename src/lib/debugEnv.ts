// Script de debug temporário para verificar variáveis de ambiente

export const debugEnv = () => {
  console.log('🔍 === DEBUG ENVIRONMENT VARIABLES ===');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_URL (tipo):', typeof import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_URL (length):', import.meta.env.VITE_SUPABASE_URL?.length);
  console.log('');
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Definida' : '❌ Não definida');
  console.log('VITE_SUPABASE_ANON_KEY (tipo):', typeof import.meta.env.VITE_SUPABASE_ANON_KEY);
  console.log('VITE_SUPABASE_ANON_KEY (length):', import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
  console.log('');
  console.log('Todas as variáveis VITE_*:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  console.log('🔍 === FIM DEBUG ===');
};

