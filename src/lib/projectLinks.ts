import type { Project, ProjectLink } from '@/types/project';

/** First website link, otherwise the first link of any kind (usually the repository). */
export const primaryLink = (project: Project): ProjectLink | undefined =>
  project.project_links.find((link) => link.type === 'website') ?? project.project_links[0];

/** Short label for a link, the way it would read in a browser address bar. */
export const linkLabel = (link?: ProjectLink): string => {
  if (!link) return '';
  try {
    const url = new URL(link.url);
    const host = url.host.replace(/^www\./, '');
    const path = url.pathname.replace(/\/$/, '');
    return host === 'github.com' ? `${host}${path}` : host;
  } catch {
    return '';
  }
};
