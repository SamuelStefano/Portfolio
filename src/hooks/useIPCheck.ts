import { useState, useEffect } from 'react';

export const useIPCheck = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch('/api/check-access');
        if (response.ok) {
          const data = await response.json();
          setIsAllowed(data.allowed === true);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  return { isAllowed, isLoading };
};

