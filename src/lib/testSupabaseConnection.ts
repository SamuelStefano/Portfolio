import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const testSupabaseConnection = async () => {

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variáveis de ambiente não configuradas');
    return;
  }

  const clientWithSchema = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'portfolio' }
  });

  const { data: data1, error: error1 } = await clientWithSchema
    .from('projects')
    .select('*');

  const clientWithoutSchema = createClient(supabaseUrl, supabaseAnonKey);

  const { data: data2, error: error2 } = await clientWithoutSchema
    .from('projects')
    .select('*');

  const { data: data3, error: error3 } = await clientWithoutSchema
    .from('portfolio.projects')
    .select('*');

  const { data: tables, error: tablesError } = await clientWithoutSchema
    .from('information_schema.tables')
    .select('table_name, table_schema')
    .eq('table_schema', 'public');

  const { data: portfolioTables, error: portfolioTablesError } = await clientWithoutSchema
    .from('information_schema.tables')
    .select('table_name, table_schema')
    .eq('table_schema', 'portfolio');
};
