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
        console.log('🔍 Buscando estatísticas do GitHub...');
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        };

        if (GITHUB_TOKEN) {
          headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
          console.log('✅ Token GitHub encontrado');
        } else {
          console.log('⚠️ Token GitHub não encontrado - usando limite público');
        }

        const endpoint = GITHUB_TOKEN
          ? `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator`
          : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

        console.log(`📡 Fazendo requisição para: ${endpoint}`);
        const reposResponse = await fetch(endpoint, {
          headers
        });

        console.log('📊 Status da resposta:', reposResponse.status);

        if (!reposResponse.ok) {
          const errorText = await reposResponse.text();
          console.error('❌ Erro na resposta:', errorText);
          throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();
        console.log('📚 Repositórios encontrados:', repos.length);

        console.log('📚 Todos os repos:', repos.map((r: any) => ({
          name: r.name,
          private: r.private,
          fork: r.fork,
          owner: r.owner.login
        })));

        const ownRepos = repos.filter((repo: any) => !repo.fork);
        console.log('🏠 Repositórios próprios:', ownRepos.length);
        console.log('📋 Lista de repos próprios:', ownRepos.map((r: any) => ({
          name: r.name,
          private: r.private,
          size: r.size,
          language: r.language
        })));

        const totalRepos = ownRepos.length;
        const totalStars = ownRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        const totalForks = ownRepos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

        console.log('📊 Stats básicas:', { totalRepos, totalStars, totalForks });

        const languages: Record<string, number> = {};
        let totalCommits = 0;

        const maxRepos = GITHUB_TOKEN ? 20 : 10;
        const recentRepos = ownRepos.slice(0, maxRepos);
        console.log(`🔬 Analisando ${recentRepos.length} repos:`, recentRepos.map((r: any) => r.name));

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

        console.log('💻 Linguagens encontradas:', Object.keys(languages));
        console.log('📏 Total de bytes:', totalLanguageBytes);
        console.log('🔢 Linhas estimadas:', estimatedLinesOfCode);

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

        console.log('✅ GitHub stats atualizadas com sucesso!');

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
