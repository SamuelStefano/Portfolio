import { supabase, isSupabaseConfigured } from './supabaseclient';

export interface DatabaseTestResult {
  ok: boolean;
  data?: any;
  error?: string;
  tables?: string[];
}

export async function testDatabase(): Promise<DatabaseTestResult> {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return { 
        ok: false, 
        error: 'Supabase não configurado. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY' 
      };
    }
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (connectionError) {
      return { 
        ok: false, 
        error: `Erro de conexão: ${connectionError.message}` 
      };
    }

    // Buscar usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'owner')
      .single();

    if (userError) {
      return { 
        ok: false, 
        error: `Erro ao buscar usuário: ${userError.message}` 
      };
    }

    // Buscar projetos
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectsError) {
      return { 
        ok: false, 
        error: `Erro ao buscar projetos: ${projectsError.message}` 
      };
    }

    return { 
      ok: true, 
      data: {
        user: userData,
        projects: projectsData,
        connection: 'Conectado com sucesso!'
      }
    };
  } catch (err) {
    return { 
      ok: false, 
      error: err instanceof Error ? err.message : 'Erro desconhecido ao testar o banco de dados' 
    };
  }
}
