import { useState, useEffect } from 'react';

interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  linesOfCode: number;
  languages: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    linesOfCode: 0,
    languages: {},
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch('/api/github-stats');

        if (!response.ok) {
          throw new Error(`Error fetching GitHub stats: ${response.status}`);
        }

        const data = await response.json();

        setStats({
          totalCommits: data.totalCommits || 0,
          totalRepos: data.totalRepos || 0,
          totalStars: data.totalStars || 0,
          totalForks: data.totalForks || 0,
          linesOfCode: data.linesOfCode || 0,
          languages: data.languages || {},
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);

        setStats({
          totalCommits: 350,
          totalRepos: 15,
          totalStars: 5,
          totalForks: 2,
          linesOfCode: 50000,
          languages: {
            'TypeScript': 40000,
            'JavaScript': 25000,
            'CSS': 15000,
            'HTML': 10000,
            'Python': 5000
          },
          isLoading: false,
          error: 'Using estimated data (GitHub API unavailable)'
        });
      }
    };

    fetchGitHubStats();
  }, []);

  return stats;
};
