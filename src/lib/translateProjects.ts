import type { TFunction } from 'i18next';
import type { Project } from '../types/project';

const PROJECT_KEYS: Record<string, string> = {
  ITERA: 'itera',
  Deck: 'deck',
  'Lesson Studio': 'lessonStudio',
  Campaigns: 'campaigns',
  TradeView: 'tradeview',
  'Skill Evals': 'skillEvals',
  Valdez: 'valdez',
  GreenLoop: 'greenloop',
  TalentDAO: 'talentdao',
  'Review Requests': 'reviewRequests',
  'DFL Learn': 'dflLearn',
  'DFL Payments': 'paymentsApp',
  'DFL-Bot Reviewer': 'ciRevisorBot',
  AltPay: 'altpay',
  CodeLibrary: 'codelibrary',
};

/** Locale key under `projectDescriptions` for a project, or null when it has no translation. */
export const getProjectKey = (title: string): string | null => PROJECT_KEYS[title] ?? null;

/**
 * Texts live in the locale files; `mockProjects` keeps the Portuguese originals as the
 * fallback. Section captions are keyed by section id under `projectSectionText`.
 */
export const translateProjectDescriptions = (projects: Project[], t: TFunction): Project[] =>
  projects.map((project) => {
    const key = getProjectKey(project.title);
    const description = key ? t(`projectDescriptions.${key}.description`, { defaultValue: '' }) : '';
    const longDescription = key ? t(`projectDescriptions.${key}.longDescription`, { defaultValue: '' }) : '';

    return {
      ...project,
      description: description || project.description,
      long_description: longDescription || project.long_description,
      project_sections: project.project_sections?.map((section) => ({
        ...section,
        display_name: t(`projectSectionText.${section.id}.title`, { defaultValue: section.display_name }),
        description: t(`projectSectionText.${section.id}.description`, {
          defaultValue: section.description ?? '',
        }) || section.description,
      })),
    };
  });
