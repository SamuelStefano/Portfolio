import { describe, expect, it } from 'vitest';
import type { Project, ProjectLink } from '@/types/project';
import { linkLabel, primaryLink } from './projectLinks';

const link = (url: string, type?: string): ProjectLink => ({ id: url, label: 'x', url, type, created_at: '' });

describe('primaryLink', () => {
  it('prefers a website over the repository', () => {
    const project = { project_links: [link('https://github.com/a/b', 'github'), link('https://a.dev', 'website')] } as Project;
    expect(primaryLink(project)?.url).toBe('https://a.dev');
  });

  it('falls back to the first link, and to nothing', () => {
    expect(primaryLink({ project_links: [link('https://github.com/a/b', 'github')] } as Project)?.url).toBe(
      'https://github.com/a/b',
    );
    expect(primaryLink({ project_links: [] as ProjectLink[] } as Project)).toBeUndefined();
  });
});

describe('linkLabel', () => {
  it('reads like an address bar', () => {
    expect(linkLabel(link('https://www.app.iterahq.dev/'))).toBe('app.iterahq.dev');
    expect(linkLabel(link('https://github.com/SamuelStefano/valdez-bot/'))).toBe('github.com/SamuelStefano/valdez-bot');
    expect(linkLabel(link('not a url'))).toBe('');
    expect(linkLabel(undefined)).toBe('');
  });
});
