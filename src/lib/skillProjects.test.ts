import { describe, expect, it } from 'vitest';
import type { Skill } from '@/consts/data';
import type { Project } from '@/types/project';
import { normalizeTech, projectsForSkill } from './skillProjects';

const project = (title: string, stack: string[]): Project =>
  ({ id: title, title, stack, project_links: [], project_collaborators: [] }) as unknown as Project;

const catalog = [
  project('A', ['React 19', 'Node.js']),
  project('B', ['React', 'Supabase Edge Functions']),
  project('C', ['Next.js 16', 'TailwindCSS v4']),
  project('Reviewer', ['GitHub Actions']),
];

describe('normalizeTech', () => {
  it('ignores case, spaces and punctuation but keeps + and #', () => {
    expect(normalizeTech('Node.js')).toBe(normalizeTech('nodejs'));
    expect(normalizeTech('C++')).not.toBe(normalizeTech('C#'));
  });
});

describe('projectsForSkill', () => {
  it('matches the skill name by default', () => {
    const skill: Skill = { name: 'node.js', level: 80 };
    expect(projectsForSkill(skill, catalog).map((p) => p.title)).toEqual(['A']);
  });

  it('uses the match list when a skill spans several stack items', () => {
    const skill: Skill = { name: 'React', level: 90, match: ['React', 'React 19'] };
    expect(projectsForSkill(skill, catalog).map((p) => p.title)).toEqual(['A', 'B']);
  });

  it('adds explicitly listed projects', () => {
    const skill: Skill = { name: 'Code review', level: 85, projects: ['Reviewer'] };
    expect(projectsForSkill(skill, catalog).map((p) => p.title)).toEqual(['Reviewer']);
  });

  it('returns nothing for a skill without evidence', () => {
    const skill: Skill = { name: 'Git & GitHub', level: 90, match: [] };
    expect(projectsForSkill(skill, catalog)).toEqual([]);
  });
});
