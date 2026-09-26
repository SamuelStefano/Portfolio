import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { projectCatalog } from '../lib/projectCatalog';
import { translateProjects } from '../lib/translateProjects';

export const useProjects = () => {
  const { t, i18n } = useTranslation();

  const projects = useMemo(
    () => translateProjects(projectCatalog, t),
    // t is stable across languages; the language is what invalidates the texts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language],
  );

  return { projects };
};
