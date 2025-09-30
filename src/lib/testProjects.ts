import { supabase } from './supabaseclient';

export const testProjectsTable = async () => {
  if (!supabase) {
    console.error('Supabase não está configurado');
    return;
  }

  try {

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Erro ao acessar tabela projects:', error);
      return;
    }


    const { data: allProjects, error: allError } = await supabase
      .from('projects')
      .select('id, title, role, description, stack, icon_name, created_at')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Erro ao buscar todos os projetos:', allError);
      return;
    }


  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
};
