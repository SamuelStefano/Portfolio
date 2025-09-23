import { useState, useCallback } from 'react';
import { testDatabase, DatabaseTestResult } from '../lib/testDatabase';

export function useDatabaseTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DatabaseTestResult | null>(null);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const testResult = await testDatabase();
      setResult(testResult);
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    testConnection,
    isLoading,
    result
  };
}
