import { useState } from 'react';
import { testProjectsTable } from '@/lib/testProjects';
import { getProjectsFromDB } from '@/lib/getProjectsFromDB';
import { testSupabaseConnection } from '@/lib/testSupabaseConnection';
import { Button } from '../atoms/button';
import { Text } from './Text';

export const ProjectsTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleTest = async () => {
    setLoading(true);
    setResult('');

    try {

      await testSupabaseConnection();

      await testProjectsTable();

      const projects = await getProjectsFromDB();

      setResult(`✅ Teste concluído! Encontrados ${projects.length} projetos.`);

      if (projects.length > 0) {
        setResult(prev => prev + `\n\nProjetos:\n${projects.map(p => `- ${p.title} (${p.role})`).join('\n')}`);
      }

    } catch (error) {
      console.error('❌ Erro no teste:', error);
      setResult(`❌ Erro: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <Text variant="large" className="mb-4">🧪 Teste de Projetos</Text>

      <Button
        onClick={handleTest}
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testando...' : 'Testar Projetos'}
      </Button>

      {result && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <Text variant="small" className="whitespace-pre-wrap">
            {result}
          </Text>
        </div>
      )}
    </div>
  );
};
