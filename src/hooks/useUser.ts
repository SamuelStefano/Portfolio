import { useState, useEffect } from 'react';
import { getUser } from '@/lib/getUser';

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setUser({
          id: 'default',
          name: 'Samuel Stefano',
          email: 'samuel@example.com',
          role: 'owner',
          photo_url: null,
          created_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
