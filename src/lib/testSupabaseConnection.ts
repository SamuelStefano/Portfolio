import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const testSupabaseConnection = async () => {
  console.log('🧪 Testando conexão com Supabase...');
  console.log('🔧 URL:', supabaseUrl);
  console.log('🔑 Key configurada:', !!supabaseAnonKey);

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variáveis de ambiente não configuradas');
    return;
  }

  const clientWithSchema = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'portfolio' }
  });

  console.log('🔍 Teste 1: Cliente com schema portfolio');
  const { data: data1, error: error1 } = await clientWithSchema
    .from('projects')
    .select('*');

  console.log('Resultado 1:', { data: data1, error: error1 });

  const clientWithoutSchema = createClient(supabaseUrl, supabaseAnonKey);

  console.log('🔍 Teste 2: Cliente sem schema (public)');
  const { data: data2, error: error2 } = await clientWithoutSchema
    .from('projects')
    .select('*');

  console.log('Resultado 2:', { data: data2, error: error2 });

  console.log('🔍 Teste 3: Cliente sem schema, tabela portfolio.projects');
  const { data: data3, error: error3 } = await clientWithoutSchema
    .from('portfolio.projects')
    .select('*');

  console.log('Resultado 3:', { data: data3, error: error3 });

  console.log('🔍 Teste 4: Listar tabelas disponíveis');
  const { data: tables, error: tablesError } = await clientWithoutSchema
    .from('information_schema.tables')
    .select('table_name, table_schema')
    .eq('table_schema', 'public');

  console.log('Tabelas no schema public:', { data: tables, error: tablesError });

  const { data: portfolioTables, error: portfolioTablesError } = await clientWithoutSchema
    .from('information_schema.tables')
    .select('table_name, table_schema')
    .eq('table_schema', 'portfolio');

  console.log('Tabelas no schema portfolio:', { data: portfolioTables, error: portfolioTablesError });
};
