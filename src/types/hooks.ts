// GitHub Stats Types
export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  linesOfCode: number;
  languages: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

// Experience Time Types
export interface ExperienceTime {
  years: number;
  months: number;
  formatted: string;
}

// Scroll Animations Types
export interface ScrollAnimationElement {
  element: HTMLElement;
  animation: string;
  delay?: number;
}

export interface UseScrollAnimationsReturn {
  addElement: (element: HTMLElement, animation: string, delay?: number) => void;
  removeElement: (element: HTMLElement) => void;
}

// Projects Hook Types
export interface UseProjectsReturn {
  projects: import('./project').Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Database Test Types
export interface DatabaseTestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
