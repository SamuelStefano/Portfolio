import { supabase } from './supabaseclient';

export const testProjectsTable = async () => {
  if (!supabase) {
    console.error('Supabase não está configurado');
    return;
  }

  try {
    console.log('🔍 Testando tabela projects...');
    
    // Teste 1: Verificar se a tabela existe
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Erro ao acessar tabela projects:', error);
      return;
    }

    console.log('✅ Tabela projects acessível');
    console.log('📊 Dados encontrados:', data?.length || 0, 'projetos');
    
    if (data && data.length > 0) {
      console.log('📋 Primeiro projeto:', data[0]);
    }

    // Teste 2: Verificar estrutura da tabela
    const { data: allProjects, error: allError } = await supabase
      .from('projects')
      .select('id, title, role, description, stack, icon_name, created_at')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Erro ao buscar todos os projetos:', allError);
      return;
    }

    console.log('📊 Total de projetos:', allProjects?.length || 0);
    
    if (allProjects && allProjects.length > 0) {
      console.log('📋 Todos os projetos:');
      allProjects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.title} (${project.role}) - ${project.icon_name}`);
      });
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
};
