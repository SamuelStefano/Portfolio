export interface Hackathon {
  name: string;
  event: string;
  location: string;
  date: string;
  achievementKey: string;
  descriptionKey: string;
  projectLink: string;
  githubLink: string;
  technologies: string[];
  team?: string[];
}

export const HACKATHONS: Hackathon[] = [
  {
    name: 'AltPay',
    event: 'Hackanation 2026 · TokenNation',
    location: 'São Paulo, Brasil',
    date: 'Junho 2026',
    achievementKey: 'hackathons.altpay.achievement',
    descriptionKey: 'hackathons.altpay.description',
    projectLink: 'https://github.com/SamuelStefano',
    githubLink: 'https://github.com/SamuelStefano',
    technologies: ['Solana', 'Anchor', 'Rust', 'Chainlink', 'CCIP', 'Data Feeds', 'Solidity', 'Foundry', 'USDC', 'PIX', 'TypeScript', 'Web3'],
    team: ['Samuel Stefano'],
  },
  {
    name: 'GreenLoop',
    event: 'ETH Latam 2025',
    location: 'São Paulo, Brasil',
    date: 'Março 2025',
    achievementKey: 'hackathons.greenloop.achievement',
    descriptionKey: 'hackathons.greenloop.description',
    projectLink: 'https://greenloop-zeta.vercel.app/',
    githubLink: 'https://github.com/RaulAl3n/GreenLoop',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'Solidity', 'ERC-20', 'ERC-721', 'Base', 'Smart Contracts', 'Web3'],
    team: ['Samuel Stefano', 'Guilherme Biensfeld', 'Raul Alencar'],
  },
  {
    name: 'TalentDAO',
    event: 'DevConnect ETH 2025',
    location: 'Buenos Aires, Argentina',
    date: 'Fevereiro 2025',
    achievementKey: 'hackathons.talentdao.achievement',
    descriptionKey: 'hackathons.talentdao.description',
    projectLink: 'https://devconnect-talent-dao.vercel.app/',
    githubLink: 'https://github.com/taigfs/devconnect-talent-dao',
    technologies: ['TypeScript', 'Next.js', 'Solidity', 'ERC-20', 'ERC-721', 'Scroll', 'WETH', 'Web3', 'Smart Contracts'],
    team: ['Tainan Fidelis', 'Samuel Stefano'],
  },
];
