import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helpers stay inline: Vercel does not bundle relative imports inside api/ reliably, and a
// missing helper fails as FUNCTION_INVOCATION_FAILED with a green build.

const GITHUB_USERNAME = 'SamuelStefano';
const MAX_EXECUTION_TIME = 20000;
const AVERAGE_BYTES_PER_LINE = 35;

// Cached at the edge: the numbers move slowly and a cold run makes ~40 upstream calls. A partial
// answer (GitHub hiccuped on one of the calls) is cached only briefly, so it heals on its own
// instead of showing zeros for six hours.
const CACHE_HEADER = 'public, s-maxage=21600, stale-while-revalidate=86400';
const PARTIAL_CACHE_HEADER = 'public, s-maxage=60';

const CONTRIBUTIONS_QUERY = `
  query {
    viewer {
      createdAt
      contributionsCollection {
        contributionYears
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionsResponse {
  data?: {
    viewer?: {
      createdAt?: string;
      contributionsCollection?: {
        contributionYears?: number[];
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: ContributionDay[] }[];
        };
      };
    };
  };
}

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 4000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

interface YearTotals {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: { totalContributions: number };
}

/** One aliased query for every year on the account: GitHub caps a collection at one year. */
const fetchAllTime = async (headers: Record<string, string>, years: number[]) => {
  if (years.length === 0) return null;
  const fields = years
    .map(
      (year) =>
        `y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") { totalCommitContributions totalPullRequestContributions totalPullRequestReviewContributions contributionCalendar { totalContributions } }`,
    )
    .join('\n');
  try {
    const res = await fetchWithTimeout(
      'https://api.github.com/graphql',
      { method: 'POST', headers, body: JSON.stringify({ query: `query { viewer { ${fields} } }` }) },
      8000,
    );
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: { viewer?: Record<string, YearTotals> } };
    const viewer = body.data?.viewer;
    if (!viewer) return null;
    const perYear = years
      .map((year) => ({ year, data: viewer[`y${year}`] }))
      .filter((y): y is { year: number; data: YearTotals } => Boolean(y.data))
      .sort((a, b) => a.year - b.year);
    return {
      since: perYear[0]?.year ?? null,
      total: perYear.reduce((n, y) => n + y.data.contributionCalendar.totalContributions, 0),
      commits: perYear.reduce((n, y) => n + y.data.totalCommitContributions, 0),
      pullRequests: perYear.reduce((n, y) => n + y.data.totalPullRequestContributions, 0),
      reviews: perYear.reduce((n, y) => n + y.data.totalPullRequestReviewContributions, 0),
      years: perYear.map((y) => ({ year: y.year, total: y.data.contributionCalendar.totalContributions })),
    };
  } catch {
    return null;
  }
};

/** Last 12 months of activity, private contributions included (the token belongs to the owner). */
const fetchContributions = async (headers: Record<string, string>) => {
  try {
    const res = await fetchWithTimeout(
      'https://api.github.com/graphql',
      { method: 'POST', headers, body: JSON.stringify({ query: CONTRIBUTIONS_QUERY }) },
      6000,
    );
    if (!res.ok) return null;
    const body = (await res.json()) as ContributionsResponse;
    const collection = body.data?.viewer?.contributionsCollection;
    if (!collection) return null;

    const days = collection.contributionCalendar.weeks.flatMap((week) => week.contributionDays);

    return {
      total: collection.contributionCalendar.totalContributions,
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      reviews: collection.totalPullRequestReviewContributions,
      // compact calendar: first day + one count per day
      start: days[0]?.date ?? null,
      counts: days.map((day) => day.contributionCount),
      years: collection.contributionYears ?? [],
    };
  } catch {
    return null;
  }
};

/** null when the search call failed, so a failure is never mistaken for "zero pull requests". */
const fetchMergedPullRequests = async (headers: Record<string, string>) => {
  try {
    const query = encodeURIComponent(`is:pr author:${GITHUB_USERNAME} is:merged`);
    const res = await fetchWithTimeout(`https://api.github.com/search/issues?q=${query}&per_page=1`, { headers });
    if (!res.ok) return null;
    const data = (await res.json()) as { total_count?: number };
    return typeof data.total_count === 'number' ? data.total_count : null;
  } catch {
    return null;
  }
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const startTime = Date.now();

  // The edge cache is keyed by the full URL: `?x=1`, `?x=2`… would each start a cold run on the
  // owner's token. Every variant is sent to the one cached URL instead.
  if (request.url?.includes('?')) {
    response.setHeader('Cache-Control', 'public, max-age=86400');
    return response.redirect(308, '/api/github-stats');
  }

  // Only GITHUB_TOKEN: a VITE_ prefix would be inlined into the public client bundle.
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return response.status(500).json({
      error: 'GitHub token not configured',
      hint: 'Set GITHUB_TOKEN (without the VITE_ prefix) in the Vercel project environment.',
    });
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'samuelstefano-portfolio',
    Authorization: `Bearer ${githubToken}`,
  };

  try {
    const [reposResponse, mergedPullRequests, contributions] = await Promise.all([
      fetchWithTimeout(
        'https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator',
        { headers },
        6000,
      ),
      fetchMergedPullRequests(headers),
      fetchContributions(headers),
    ]);

    if (!reposResponse.ok) {
      console.error('GitHub API error:', reposResponse.status);
      return response.status(502).json({ error: 'upstream unavailable' });
    }

    const repos = (await reposResponse.json()) as Array<{
      fork: boolean;
      stargazers_count: number;
      forks_count: number;
      languages_url: string;
    }>;
    const ownRepos = repos.filter((repo) => !repo.fork);

    const languages: Record<string, number> = {};
    const recentRepos = ownRepos.slice(0, 50);
    await Promise.allSettled(
      recentRepos.map(async (repo) => {
        if (Date.now() - startTime > MAX_EXECUTION_TIME) return;
        const res = await fetchWithTimeout(repo.languages_url, { headers }, 3000);
        if (!res.ok) return;
        const repoLanguages = (await res.json()) as Record<string, number>;
        for (const [lang, bytes] of Object.entries(repoLanguages)) {
          languages[lang] = (languages[lang] || 0) + bytes;
        }
      }),
    );

    const totalLanguageBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const allTime = contributions ? await fetchAllTime(headers, contributions.years) : null;
    const complete = contributions !== null && mergedPullRequests !== null && allTime !== null;

    response.setHeader('Cache-Control', complete ? CACHE_HEADER : PARTIAL_CACHE_HEADER);
    return response.status(200).json({
      totalCommits: contributions?.commits ?? 0,
      totalRepos: ownRepos.length,
      totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      mergedPullRequests: mergedPullRequests ?? 0,
      linesOfCode: Math.round(totalLanguageBytes / AVERAGE_BYTES_PER_LINE),
      languages,
      contributions: contributions && {
        total: contributions.total,
        commits: contributions.commits,
        pullRequests: contributions.pullRequests,
        reviews: contributions.reviews,
        start: contributions.start,
        counts: contributions.counts,
      },
      allTime,
    });
  } catch (error) {
    console.error('Error in /api/github-stats:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
