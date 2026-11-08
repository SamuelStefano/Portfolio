import type { ContentPost } from '@/consts/content';

export const OWN_HANDLE = 'samuel.stefano';

export interface ContentCredit {
  /** Handle that leads the credit line. */
  lead: string;
  /** True when the post lives on someone else's profile without me as a collaborator. */
  madeFor: boolean;
  /** Remaining handles, shown after "with". */
  partners: string[];
}

/**
 * Posts on my profile, or with me as an Instagram collaborator, read "@me with @partner".
 * Posts I made for another profile read "made for @profile with @partner".
 */
export const getContentCredit = (post: Pick<ContentPost, 'account' | 'collaborators'>): ContentCredit => {
  const handles = [post.account, ...post.collaborators];
  if (handles.includes(OWN_HANDLE)) {
    return { lead: OWN_HANDLE, madeFor: false, partners: handles.filter((h) => h !== OWN_HANDLE) };
  }
  return { lead: post.account, madeFor: true, partners: post.collaborators };
};

const toDate = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatContentDate = (iso: string, language: string) =>
  new Intl.DateTimeFormat(language, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(toDate(iso));

export const formatCompact = (value: number, language: string) =>
  new Intl.NumberFormat(language, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
