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

const GITHUB_USERNAME = 'SamuelStefano';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

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

        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        };

        if (GITHUB_TOKEN) {
          headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        const endpoint = GITHUB_TOKEN
          ? `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator`
          : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

        const reposResponse = await fetch(endpoint, {
          headers
        });

        if (!reposResponse.ok) {
          const errorText = await reposResponse.text();
          console.error('? Erro na resposta:', errorText);
          throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        const ownRepos = repos.filter((repo: any) => !repo.fork);

        const totalRepos = ownRepos.length;
        const totalStars = ownRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        const totalForks = ownRepos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);


        const languages: Record<string, number> = {};
        let totalCommits = 0;

        const maxRepos = GITHUB_TOKEN ? 20 : 10;
        const recentRepos = ownRepos.slice(0, maxRepos);

        for (const repo of recentRepos) {
          try {
            const langResponse = await fetch(repo.languages_url, { headers });
            if (langResponse.ok) {
              const repoLanguages = await langResponse.json();
              Object.entries(repoLanguages).forEach(([lang, bytes]) => {
                languages[lang] = (languages[lang] || 0) + (bytes as number);
              });
            }

            const commitsResponse = await fetch(`${repo.url}/commits?per_page=100`, { headers });
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              totalCommits += commits.length;
            }
          } catch (error) {
            console.warn(`Erro ao buscar dados do repo ${repo.name}:`, error);
          }
        }

        const totalLanguageBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
        const estimatedLinesOfCode = Math.round(totalLanguageBytes / 50);


        setStats({
          totalCommits,
          totalRepos,
          totalStars,
          totalForks,
          linesOfCode: estimatedLinesOfCode,
          languages,
          isLoading: false,
          error: null
        });


      } catch (error) {
        console.error('Erro ao buscar estatísticas do GitHub:', error);

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
          error: 'Usando dados estimados (GitHub API indisponível)'
        });
      }
    };

    fetchGitHubStats();
  }, []);

  return stats;
};



