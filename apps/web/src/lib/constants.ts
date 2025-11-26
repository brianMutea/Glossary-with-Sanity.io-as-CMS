/**
 * Application Constants
 * Centralized configuration for colors, breakpoints, animations, and other constants
 */

// Color Palette
export const COLORS = {
  // Primary Colors
  primary: {
    blue: '#00BFFF',
    gold: '#FFD700',
    green: '#39FF14',
    dark: '#121212',
    darkSecondary: '#1A1A1A',
    gray: '#333333',
    lightGray: '#E0E0E0',
    white: '#FFFFFF',
    coral: '#FF6F61',
    purple: '#E6E6FA',
  },
  
  // Semantic Colors
  success: '#39FF14',
  warning: '#FFD700',
  error: '#FF6F61',
  info: '#00BFFF',
  
  // Background Colors
  background: {
    primary: '#121212',
    secondary: '#1A1A1A',
    tertiary: '#333333',
    card: '#1A1A1A',
    modal: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    muted: '#999999',
    inverse: '#121212',
  },
  
  // Border Colors
  border: {
    primary: '#333333',
    secondary: '#555555',
    accent: '#00BFFF',
  }
} as const

// Typography
export const TYPOGRAPHY = {
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
} as const

// Spacing
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Animation Durations
export const ANIMATIONS = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const

// Z-Index Layers
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
  toast: 60,
} as const

// Content Limits
export const LIMITS = {
  searchResults: 10,
  cardDescriptionLength: 150,
  excerptLength: 200,
  titleLength: 100,
  tagLimit: 5,
} as const

// API Configuration
export const API = {
  searchDebounceMs: 300,
  cacheTimeMs: 5 * 60 * 1000, // 5 minutes
  retryAttempts: 3,
  timeoutMs: 10000, // 10 seconds
} as const

// Content Types
export const CONTENT_TYPES = {
  GLOSSARY: 'glossary',
  BLOG: 'blog',
  SERIES: 'series',
  LEARNING_PATH: 'learningPath',
  AUTHOR: 'author',
} as const

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const

// Domain Categories
export const DOMAINS = {
  AI: 'ai',
  ML: 'ml',
  DATA_SCIENCE: 'data-science',
  SOFTWARE_ENGINEERING: 'software-engineering',
  MATH: 'math',
  STATISTICS: 'statistics',
  DEEP_LEARNING: 'deep-learning',
  COMPUTER_VISION: 'computer-vision',
  NLP: 'nlp',
} as const

// Type Categories
export const TERM_TYPES = {
  ALGORITHM: 'algorithm',
  MODEL: 'model',
  METRIC: 'metric',
  LIBRARY: 'library',
  TECHNIQUE: 'technique',
  CONCEPT: 'concept',
  ARCHITECTURE: 'architecture',
  METHOD: 'method',
} as const

// Social Media Platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  WEBSITE: 'website',
  EMAIL: 'email',
} as const

// File Extensions for Code Blocks
export const CODE_LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
  PYTHON: 'python',
  HTML: 'html',
  CSS: 'css',
  JSON: 'json',
  MARKDOWN: 'markdown',
  BASH: 'bash',
  SQL: 'sql',
  YAML: 'yaml',
} as const

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  GLOSSARY: '/glossary',
  BLOG: '/blog',
  SERIES: '/series',
  LEARNING_PATHS: '/learning-paths',
  AUTHORS: '/authors',
  SEARCH: '/search',
  KNOWLEDGE_GRAPH: '/knowledge-graph',
} as const

// External Links
export const EXTERNAL_LINKS = {
  GITHUB_REPO: 'https://github.com/your-username/tech-glossary',
  DOCUMENTATION: 'https://docs.your-domain.com',
  SUPPORT: 'mailto:support@your-domain.com',
} as const

// Feature Flags
export const FEATURES = {
  KNOWLEDGE_GRAPH: true,
  DARK_MODE_TOGGLE: false,
  ANALYTICS: true,
  SEARCH_SUGGESTIONS: true,
  OFFLINE_MODE: false,
} as const

// Performance Thresholds
export const PERFORMANCE = {
  LAZY_LOAD_THRESHOLD: '100px',
  DEBOUNCE_SEARCH_MS: 300,
  CACHE_DURATION_MS: 300000, // 5 minutes
  MAX_CONCURRENT_REQUESTS: 5,
} as const