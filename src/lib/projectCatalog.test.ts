import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import { projectCatalog } from './projectCatalog';
import { getProjectKey } from './translateProjects';

const PUBLIC = join(__dirname, '../../public');
const locales = { pt, en, es } as Record<string, { projectDescriptions: Record<string, { description: string; longDescription: string }>; projectSectionText: Record<string, { title: string }> }>;

describe('project catalog', () => {
  it('has unique ids and titles', () => {
    expect(new Set(projectCatalog.map((p) => p.id)).size).toBe(projectCatalog.length);
    expect(new Set(projectCatalog.map((p) => p.title)).size).toBe(projectCatalog.length);
  });

  it('gives every project a status and features exactly six', () => {
    expect(projectCatalog.every((p) => p.status)).toBe(true);
    expect(projectCatalog.filter((p) => p.featured)).toHaveLength(6);
  });

  it.each(Object.keys(locales))('has every project text in %s', (lang) => {
    for (const project of projectCatalog) {
      const key = getProjectKey(project.title);
      expect(key, project.title).not.toBeNull();
      const text = locales[lang].projectDescriptions[key!];
      expect(text?.description, `${lang}:${project.title}`).toBeTruthy();
      expect(text?.longDescription, `${lang}:${project.title}`).toBeTruthy();
      for (const section of project.project_sections ?? []) {
        expect(locales[lang].projectSectionText[section.id]?.title, `${lang}:${section.id}`).toBeTruthy();
      }
    }
  });

  it('only references images that exist in public/', () => {
    const missing: string[] = [];
    for (const project of projectCatalog) {
      const images = [
        project.thumbnail_url,
        ...(project.project_sections ?? []).flatMap((s) => s.project_images.map((i) => i.image_url)),
        ...Object.values(project.image_categories ?? {}).flat(),
        ...project.project_collaborators.map((c) => c.avatar_url),
      ].filter((src): src is string => Boolean(src));
      for (const src of images) if (!existsSync(join(PUBLIC, src))) missing.push(`${project.title}: ${src}`);
    }
    expect(missing).toEqual([]);
  });
});
