import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_USERNAME = 'SamuelStefano';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      return response.status(500).json({ 
        error: 'GitHub token not configured' 
      });
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'my-portfolio',
      'Authorization': `Bearer ${githubToken}`
    };

    const endpoint = `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator`;

    const reposResponse = await fetch(endpoint, { headers });

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('GitHub API error:', errorText);
      return response.status(reposResponse.status).json({ 
        error: `GitHub API error: ${reposResponse.status}` 
      });
    }

    const repos = await reposResponse.json();
    const ownRepos = repos.filter((repo: any) => !repo.fork);

    const totalRepos = ownRepos.length;
    const totalStars = ownRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = ownRepos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

    const languages: Record<string, number> = {};
    let totalCommits = 0;

    const maxRepos = 20;
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
        console.warn(`Error fetching data for repo ${repo.name}:`, error);
      }
    }

    const totalLanguageBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const estimatedLinesOfCode = Math.round(totalLanguageBytes / 50);

    return response.status(200).json({
      totalCommits,
      totalRepos,
      totalStars,
      totalForks,
      linesOfCode: estimatedLinesOfCode,
      languages
    });
  } catch (error: any) {
    console.error('Error in /api/github-stats:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error'
    });
  }
}

