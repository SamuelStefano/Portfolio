export type ContentSlide =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster: string };

export interface ContentPost {
  /** Folder under public/content and key under `content.items` in the locales. */
  slug: string;
  format: 'reel' | 'carousel';
  /** Aspect ratio of the media as published: 9:16 for reels, 4:5 for feed carousels. */
  aspect: '9/16' | '4/5';
  /** Profile the post lives on. */
  account: string;
  /** Instagram collaborators shown next to the account. */
  collaborators: string[];
  /** ISO date the post went out. */
  publishedAt: string;
  url: string;
  cover: string;
  slides: ContentSlide[];
  views: number;
  likes: number;
}

/** Date the view and like counts were read from the Instagram insights. */
export const CONTENT_METRICS_DATE = '2026-11-08';

const dir = (slug: string) => `/content/${slug}`;
const reel = (slug: string): Pick<ContentPost, 'format' | 'aspect' | 'cover' | 'slides'> => ({
  format: 'reel',
  aspect: '9/16',
  cover: `${dir(slug)}/cover.webp`,
  slides: [{ type: 'video', src: `${dir(slug)}/video.mp4`, poster: `${dir(slug)}/cover.webp` }],
});
const pad = (i: number) => String(i + 1).padStart(2, '0');
const imageCarousel = (slug: string, count: number): Pick<ContentPost, 'format' | 'aspect' | 'cover' | 'slides'> => ({
  format: 'carousel',
  aspect: '4/5',
  cover: `${dir(slug)}/cover.webp`,
  slides: Array.from({ length: count }, (_, i) => ({ type: 'image' as const, src: `${dir(slug)}/${pad(i)}.webp` })),
});
const videoCarousel = (slug: string, count: number): Pick<ContentPost, 'format' | 'aspect' | 'cover' | 'slides'> => ({
  format: 'carousel',
  aspect: '4/5',
  cover: `${dir(slug)}/cover.webp`,
  slides: Array.from({ length: count }, (_, i) => ({
    type: 'video' as const,
    src: `${dir(slug)}/${pad(i)}.mp4`,
    poster: `${dir(slug)}/${pad(i)}.webp`,
  })),
});

/** Newest first. */
export const CONTENT_POSTS: ContentPost[] = [
  {
    slug: 'idempotencia',
    ...reel('idempotencia'),
    account: 'samuel.stefano',
    collaborators: [],
    publishedAt: '2026-11-06',
    url: 'https://www.instagram.com/reel/DfaTznEo9jf/',
    views: 354,
    likes: 21,
  },
  {
    slug: 'anthropic-scion',
    ...imageCarousel('anthropic-scion', 10),
    account: 'samuel.stefano',
    collaborators: ['devfellowship'],
    publishedAt: '2026-10-14',
    url: 'https://www.instagram.com/p/DefJMhJlTGR/',
    views: 889,
    likes: 19,
  },
  {
    slug: 'ia-na-semana',
    ...videoCarousel('ia-na-semana', 10),
    account: 'samuel.stefano',
    collaborators: ['devfellowship'],
    publishedAt: '2026-10-07',
    url: 'https://www.instagram.com/p/DeNY8DugaVH/',
    views: 1178,
    likes: 24,
  },
  {
    slug: '54-produtos',
    ...reel('54-produtos'),
    account: 'devfellowship',
    collaborators: ['revera.dev'],
    publishedAt: '2026-10-02',
    url: 'https://www.instagram.com/reel/DeAHd5gDqf3/',
    views: 738,
    likes: 18,
  },
  {
    slug: 'gemini-argon',
    ...imageCarousel('gemini-argon', 6),
    account: 'devfellowship',
    collaborators: ['samuel.stefano'],
    publishedAt: '2026-10-01',
    url: 'https://www.instagram.com/p/Dd9PScqiC5n/',
    views: 848,
    likes: 21,
  },
  {
    slug: 'sonnet-vs-opus',
    ...imageCarousel('sonnet-vs-opus', 10),
    account: 'samuel.stefano',
    collaborators: ['devfellowship'],
    publishedAt: '2026-09-29',
    url: 'https://www.instagram.com/p/Dd42KUTDhi4/',
    views: 1305,
    likes: 22,
  },
  {
    slug: 'gta6-detalhes',
    ...reel('gta6-detalhes'),
    account: 'devfellowship',
    collaborators: ['samuel.stefano'],
    publishedAt: '2026-09-18',
    url: 'https://www.instagram.com/reel/Ddbh--QADWZ/',
    views: 1245,
    likes: 32,
  },
  {
    slug: 'gargalo-review',
    ...reel('gargalo-review'),
    account: 'tainanfidelis',
    collaborators: ['devfellowship'],
    publishedAt: '2026-09-16',
    url: 'https://www.instagram.com/reel/DdXQ-1Dipgn/',
    views: 655,
    likes: 15,
  },
];

export const CONTENT_TOTAL_VIEWS = CONTENT_POSTS.reduce((sum, post) => sum + post.views, 0);
