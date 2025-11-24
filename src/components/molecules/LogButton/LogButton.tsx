import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useIPCheck } from '@/hooks/useIPCheck';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';

export const LogButton = () => {
  const { isAllowed, isLoading } = useIPCheck();
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  if (isLoading) {
    return null;
  }

  if (!isAllowed) {
    return null;
  }

  const handleViewLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const response = await fetch('/api/log');
      const contentType = response.headers.get('content-type');
      
      if (response.ok && contentType?.includes('application/json')) {
        const data = await response.json();
        const logsText = JSON.stringify(data, null, 2);
        const blob = new Blob([logsText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `visits-log-${new Date().toISOString()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        let errorMessage = 'Erro desconhecido';
        try {
          if (contentType?.includes('application/json')) {
            const error = await response.json();
            errorMessage = error.error || error.message || 'Erro ao buscar logs';
          } else {
            const text = await response.text();
            errorMessage = `Erro ${response.status}: ${text.substring(0, 100)}`;
          }
        } catch (e) {
          errorMessage = `Erro ${response.status}: Não foi possível ler a resposta do servidor`;
        }
        alert(`Erro ao buscar logs: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Error fetching logs:', error);
      alert(`Erro ao buscar logs: ${error?.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleViewLogs}
      disabled={isLoadingLogs}
      className="fixed bottom-4 right-4 z-50 bg-background/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg"
      aria-label="Ver logs de visitas"
    >
      <Icon icon={FileText} size="sm" className="w-4 h-4 mr-2" />
      {isLoadingLogs ? 'Carregando...' : 'Log'}
    </Button>
  );
};

