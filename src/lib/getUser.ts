import { supabase, isSupabaseConfigured } from "@/lib/supabaseclient";

export async function getUser() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase não configurado');
  }

  console.log('🔍 Buscando usuário no Supabase...');
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "owner")
    .single();

  console.log('📊 Resposta completa do Supabase:', { data, error });
  
  if (error) {
    console.error('❌ Erro do Supabase:', error);
    throw error;
  }
  
  console.log('✅ Dados do usuário:', data);
  console.log('📸 Photo URL:', data?.photo_url);
  
  return data;
}
