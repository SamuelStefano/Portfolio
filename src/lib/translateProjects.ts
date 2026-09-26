import type { TFunction } from 'i18next';
import type { Project, ProjectSeed } from '../types/project';

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

/** Locale key under `projectDescriptions` for a project, or null when it has none. */
export const getProjectKey = (title: string): string | null => PROJECT_KEYS[title] ?? null;

/**
 * The catalog holds structure only; every text a visitor reads comes from the locale files:
 * `projectDescriptions.<key>` for the project and `projectSectionText.<section id>` for the
 * screenshot captions (the catalog's Portuguese section name is the fallback title).
 */
export const translateProjects = (seeds: ProjectSeed[], t: TFunction): Project[] =>
  seeds.map((seed) => {
    const key = getProjectKey(seed.title);
    return {
      ...seed,
      description: key ? t(`projectDescriptions.${key}.description`, { defaultValue: '' }) : '',
      long_description: key ? t(`projectDescriptions.${key}.longDescription`, { defaultValue: '' }) : '',
      project_sections: seed.project_sections?.map((section) => ({
        ...section,
        display_name: t(`projectSectionText.${section.id}.title`, { defaultValue: section.display_name }),
        description: t(`projectSectionText.${section.id}.description`, { defaultValue: '' }) || null,
      })),
    };
  });
