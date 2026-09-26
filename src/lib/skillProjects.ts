import type { Skill } from '@/consts/data';
import type { Project } from '@/types/project';

/** "Node.js", "node js" and "NODEJS" are the same technology; keep + and # (C++, C#). */
export const normalizeTech = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#]/g, '');

/** Projects that back a skill up: listed explicitly, or carrying a matching stack item. */
export const projectsForSkill = (skill: Skill, projects: Project[]): Project[] => {
  const wanted = new Set((skill.match ?? [skill.name]).map(normalizeTech));
  const byTitle = new Set(skill.projects ?? []);
  return projects.filter(
    (project) => byTitle.has(project.title) || project.stack.some((tech) => wanted.has(normalizeTech(tech))),
  );
};
