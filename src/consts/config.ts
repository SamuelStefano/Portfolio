// API Configuration
export const API_CONFIG = {
  GITHUB_USERNAME: 'SamuelStefano',
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Cache Configuration
export const CACHE_CONFIG = {
  PROJECTS_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  GITHUB_STATS_CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
};

// Storage Configuration
export const STORAGE_CONFIG = {
  KNOWN_BUCKETS: [
    'challenge-images',
    'Codelibrary-website', 
    'codelibrary-website',
    'Devfellowship', 
    'devfellowship',
    'Portfolio-bucket'
  ],
  CANDIDATE_PATHS_BY_BUCKET: {
    'challenge-images': [
      'challenges',
      'challenges/DevSharper',
      'challenges/CodeLibrary'
    ],
    'Codelibrary-website': ['codelibrary images'],
    'codelibrary-website': ['codelibrary images'],
    'Devfellowship': ['Devfellowship'],
    'devfellowship': ['Devfellowship'],
    'Portfolio-bucket': []
  }
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5
  },
  EASING: {
    EASE_OUT: 'easeOut',
    EASE_IN_OUT: 'easeInOut'
  }
};

// UI Configuration
export const UI_CONFIG = {
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070
  }
};

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  SMOOTH_SCROLL_OFFSET: 100,
  ACTIVE_SECTION_THRESHOLD: 50
};

