import { useMemo } from 'react';
import { mockProjects } from '../lib/mockProjects';
import { translateProjectDescriptions } from '../lib/translateProjects';
import { useTranslation } from 'react-i18next';

export const useProjects = () => {
  const { t, i18n } = useTranslation();

  const projects = useMemo(
    () => translateProjectDescriptions(mockProjects, t),
    [t, i18n.language],
  );

  return { projects, loading: false, error: null as string | null };
};
