import { useEffect, useState } from 'react';

/** Whether this visitor may download the visit log. Any failure simply means "no" — it is an
 *  admin-only affordance, so it never logs to the console of an ordinary visitor. */
export const useIPCheck = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch('/api/check-access')
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        if (!response.ok || !isJson) return false;
        const data = (await response.json()) as { allowed?: boolean };
        return data.allowed === true;
      })
      .catch(() => false)
      .then((allowed) => {
        if (!alive) return;
        setIsAllowed(allowed);
        setIsLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { isAllowed, isLoading };
};
