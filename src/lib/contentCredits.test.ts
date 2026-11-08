import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import { CONTENT_POSTS } from '@/consts/content';
import { formatContentDate, getContentCredit } from './contentCredits';

const PUBLIC = join(__dirname, '../../public');
const locales = { pt, en, es } as Record<string, { content: { items: Record<string, { title: string; summary: string }> } }>;

describe('getContentCredit', () => {
  it('leads with my handle on my own profile', () => {
    expect(getContentCredit({ account: 'samuel.stefano', collaborators: ['devfellowship'] })).toEqual({
      lead: 'samuel.stefano',
      madeFor: false,
      partners: ['devfellowship'],
    });
  });

  it('leads with my handle when I am a collaborator on another profile', () => {
    expect(getContentCredit({ account: 'devfellowship', collaborators: ['samuel.stefano'] })).toEqual({
      lead: 'samuel.stefano',
      madeFor: false,
      partners: ['devfellowship'],
    });
  });

  it('marks a post made for another profile', () => {
    expect(getContentCredit({ account: 'tainanfidelis', collaborators: ['devfellowship'] })).toEqual({
      lead: 'tainanfidelis',
      madeFor: true,
      partners: ['devfellowship'],
    });
  });
});

describe('formatContentDate', () => {
  it('does not shift the day across time zones', () => {
    expect(formatContentDate('2026-11-06', 'en')).toContain('06');
  });
});

describe('content posts', () => {
  it('has unique slugs, newest first', () => {
    expect(new Set(CONTENT_POSTS.map((p) => p.slug)).size).toBe(CONTENT_POSTS.length);
    const dates = CONTENT_POSTS.map((p) => p.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it('only references media that exist in public/', () => {
    const missing: string[] = [];
    for (const post of CONTENT_POSTS) {
      const files = [post.cover, ...post.slides.flatMap((s) => (s.type === 'video' ? [s.src, s.poster] : [s.src]))];
      for (const file of files) if (!existsSync(join(PUBLIC, file))) missing.push(file);
    }
    expect(missing).toEqual([]);
  });

  it('links every post to Instagram', () => {
    for (const post of CONTENT_POSTS) expect(post.url).toMatch(/^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/$/);
  });

  it.each(Object.keys(locales))('has every post text in %s', (lang) => {
    for (const post of CONTENT_POSTS) {
      const text = locales[lang].content.items[post.slug];
      expect(text?.title, `${lang}:${post.slug}`).toBeTruthy();
      expect(text?.summary, `${lang}:${post.slug}`).toBeTruthy();
    }
  });
});
