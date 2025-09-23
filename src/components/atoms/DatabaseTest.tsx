import React from 'react';
import { useDatabaseTest } from '../../hooks/useDatabaseTest';
import { Button } from './button';
import { Card } from './card';

export function DatabaseTest() {
  const { testConnection, isLoading, result } = useDatabaseTest();

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">🔧 Teste de Conexão com Banco de Dados</h3>

      <Button
        onClick={testConnection}
        disabled={isLoading}
        className="w-full mb-4"
      >
        {isLoading ? 'Testando Conexão...' : 'Testar Conexão com Supabase'}
      </Button>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.ok
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="font-medium text-lg mb-2">
            {result.ok ? '✅ Conexão bem-sucedida!' : '❌ Erro na conexão'}
          </div>

          {result.ok && result.data && (
            <div className="space-y-4">
              <div>
                <div className="font-medium text-sm mb-1">Status da Conexão:</div>
                <div className="text-sm bg-white p-2 rounded border">
                  {result.data.connection}
                </div>
              </div>

              {result.data.user && (
                <div>
                  <div className="font-medium text-sm mb-1">Dados do Usuário:</div>
                  <div className="text-sm bg-white p-2 rounded border">
                    <div><strong>Nome:</strong> {result.data.user.name}</div>
                    <div><strong>Email:</strong> {result.data.user.email}</div>
                    <div><strong>Role:</strong> {result.data.user.role}</div>
                    {result.data.user.photo_url && (
                      <div><strong>Foto:</strong> {result.data.user.photo_url}</div>
                    )}
                  </div>
                </div>
              )}

              {result.data.projects && (
                <div>
                  <div className="font-medium text-sm mb-1">Projetos Encontrados: {result.data.projects.length}</div>
                  <div className="text-sm bg-white p-2 rounded border max-h-32 overflow-y-auto">
                    {result.data.projects.map((project: any, index: number) => (
                      <div key={index} className="mb-1">
                        • {project.title} ({project.category})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {result.error && (
            <div>
              <div className="font-medium text-sm mb-1">Erro:</div>
              <div className="text-sm bg-white p-2 rounded border">
                {result.error}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Instruções:</strong></p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Execute o script SQL no Supabase Dashboard</li>
          <li>Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env</li>
          <li>Reinicie o servidor de desenvolvimento</li>
        </ol>
      </div>
    </Card>
  );
}