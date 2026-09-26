import { useEffect, useState } from 'react';

export interface GitHubContributions {
  total: number;
  commits: number;
  pullRequests: number;
  reviews: number;
  /** First day of the calendar (a Sunday), YYYY-MM-DD */
  start: string | null;
  /** One count per day from `start` */
  counts: number[];
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  mergedPullRequests: number;
  linesOfCode: number;
  languages: Record<string, number>;
  contributions: GitHubContributions | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Shown when /api/github-stats is unreachable (local dev, GitHub outage). Deliberately at or
 * below the last real numbers — a fallback must never overstate. No calendar: an invented
 * heatmap would be worse than none.
 */
const FALLBACK: Omit<GitHubStats, 'isLoading' | 'error'> = {
  totalCommits: 1600,
  totalRepos: 33,
  totalStars: 6,
  totalForks: 1,
  mergedPullRequests: 990,
  linesOfCode: 360000,
  languages: {},
  contributions: null,
};

// One request per page load, shared by every component that reads the stats.
let pending: Promise<GitHubStats> | null = null;

const load = (): Promise<GitHubStats> => {
  pending ??= fetch('/api/github-stats')
    .then(async (response) => {
      if (!response.ok) throw new Error(`GitHub stats responded ${response.status}`);
      const data = await response.json();
      // a figure GitHub failed to answer arrives as 0; the fallback is a floor, never "0+"
      return {
        totalCommits: data.totalCommits || FALLBACK.totalCommits,
        totalRepos: data.totalRepos || FALLBACK.totalRepos,
        totalStars: data.totalStars || 0,
        totalForks: data.totalForks || 0,
        mergedPullRequests: data.mergedPullRequests || FALLBACK.mergedPullRequests,
        linesOfCode: data.linesOfCode || FALLBACK.linesOfCode,
        languages: data.languages || {},
        contributions: data.contributions?.counts?.length ? data.contributions : null,
        isLoading: false,
        error: null,
      };
    })
    .catch((error: unknown) => {
      console.warn('GitHub stats unavailable, using fallback numbers:', error);
      return { ...FALLBACK, isLoading: false, error: 'fallback' };
    });
  return pending;
};

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats>({ ...FALLBACK, isLoading: true, error: null });

  useEffect(() => {
    let alive = true;
    load().then((result) => {
      if (alive) setStats(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  return stats;
};
