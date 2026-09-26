import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helpers stay inline: Vercel does not bundle relative imports inside api/ reliably, and a
// missing helper fails as FUNCTION_INVOCATION_FAILED with a green build.

const GITHUB_USERNAME = 'SamuelStefano';
const MAX_EXECUTION_TIME = 20000;
const AVERAGE_BYTES_PER_LINE = 35;

// Cached at the edge: the numbers move slowly and a cold run makes ~40 upstream calls.
const CACHE_HEADER = 'public, s-maxage=21600, stale-while-revalidate=86400';

const CONTRIBUTIONS_QUERY = `
  query {
    viewer {
      contributionsCollection {
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

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 4000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
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
    const body = await res.json();
    const collection = body?.data?.viewer?.contributionsCollection;
    if (!collection) return null;

    const days: ContributionDay[] = collection.contributionCalendar.weeks.flatMap(
      (week: { contributionDays: ContributionDay[] }) => week.contributionDays,
    );

    return {
      total: collection.contributionCalendar.totalContributions as number,
      commits: collection.totalCommitContributions as number,
      pullRequests: collection.totalPullRequestContributions as number,
      reviews: collection.totalPullRequestReviewContributions as number,
      // compact calendar: first day + one count per day
      start: days[0]?.date ?? null,
      counts: days.map((day) => day.contributionCount),
    };
  } catch {
    return null;
  }
};

const fetchMergedPullRequests = async (headers: Record<string, string>) => {
  try {
    const query = encodeURIComponent(`is:pr author:${GITHUB_USERNAME} is:merged`);
    const res = await fetchWithTimeout(`https://api.github.com/search/issues?q=${query}&per_page=1`, { headers });
    if (!res.ok) return 0;
    const data = await res.json();
    return (data.total_count as number) || 0;
  } catch {
    return 0;
  }
};

export default async function handler(_request: VercelRequest, response: VercelResponse) {
  const startTime = Date.now();

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

    response.setHeader('Cache-Control', CACHE_HEADER);
    return response.status(200).json({
      totalCommits: contributions?.commits ?? 0,
      totalRepos: ownRepos.length,
      totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      mergedPullRequests,
      linesOfCode: Math.round(totalLanguageBytes / AVERAGE_BYTES_PER_LINE),
      languages,
      contributions,
    });
  } catch (error) {
    console.error('Error in /api/github-stats:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
