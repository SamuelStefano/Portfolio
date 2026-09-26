export interface Hackathon {
  name: string;
  event: string;
  place: 1 | 2 | 4;
  photo?: string;
  location: string;
  date: string;
  achievementKey: string;
  descriptionKey: string;
  /** The hackathon page on Taikai (or the organiser's site). */
  eventLink: string;
  projectLink?: string;
  githubLink?: string;
  technologies: string[];
  team?: string[];
  /** Translated team line, for teams that are more than a list of names. */
  teamKey?: string;
}

export const HACKATHONS: Hackathon[] = [
  {
    name: 'PIX On-Chain',
    place: 1,
    event: 'ETH Latam 2025',
    location: 'São Paulo, BR',
    date: 'Aug 2025',
    achievementKey: 'hackathons.pixonchain.achievement',
    descriptionKey: 'hackathons.pixonchain.description',
    eventLink: 'https://taikai.network/en/ethsamba/hackathons/ethlatam25/overview',
    technologies: ['Base', 'Pix', 'Web3'],
  },
  {
    name: 'AltPay',
    place: 1,
    photo: '/podium/hackanation-1.jpg',
    event: 'Hackanation 2026 · TokenNation',
    location: 'São Paulo, BR',
    date: 'May 2026',
    achievementKey: 'hackathons.altpay.achievement',
    descriptionKey: 'hackathons.altpay.description',
    eventLink: 'https://taikai.network/en/TokenNation/hackathons/Hackanation2026/overview',
    projectLink: 'https://github.com/SamuelStefano/AltPay',
    githubLink: 'https://github.com/SamuelStefano/AltPay',
    technologies: ['Solana', 'Anchor', 'Rust', 'Chainlink', 'CCIP', 'Data Feeds', 'Solidity', 'Foundry', 'USDC', 'PIX', 'TypeScript', 'Web3'],
    team: ['Samuel Stefano'],
    teamKey: 'hackathons.altpay.team',
  },
  {
    name: 'GreenLoop',
    place: 4,
    event: 'ETH Latam 2025',
    location: 'São Paulo, BR',
    date: 'Aug 2025',
    achievementKey: 'hackathons.greenloop.achievement',
    descriptionKey: 'hackathons.greenloop.description',
    eventLink: 'https://taikai.network/en/ethsamba/hackathons/ethlatam25/overview',
    projectLink: 'https://greenloop-zeta.vercel.app/',
    githubLink: 'https://github.com/RaulAl3n/GreenLoop',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'Solidity', 'ERC-20', 'ERC-721', 'Base', 'Smart Contracts', 'Web3'],
    team: ['Samuel Stefano', 'Guilherme Biensfeld', 'Raul Alencar'],
  },
  {
    name: 'TalentDAO',
    place: 2,
    event: 'DevConnect ETH 2025',
    location: 'Buenos Aires, AR',
    date: 'Nov 2025',
    achievementKey: 'hackathons.talentdao.achievement',
    descriptionKey: 'hackathons.talentdao.description',
    eventLink: 'https://taikai.network/en/ethargentina/hackathons/tierra-de-buidlers-2025/overview',
    projectLink: 'https://devconnect-talent-dao.vercel.app/',
    githubLink: 'https://github.com/taigfs/devconnect-talent-dao',
    technologies: ['TypeScript', 'Next.js', 'Solidity', 'ERC-20', 'ERC-721', 'Scroll', 'WETH', 'Web3', 'Smart Contracts'],
    team: ['Tainan Fidelis', 'Samuel Stefano'],
  },
];
