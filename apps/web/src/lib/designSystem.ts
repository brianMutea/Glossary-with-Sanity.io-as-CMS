import { COLORS, DIFFICULTY_LEVELS, DOMAINS, TERM_TYPES, ANIMATIONS } from './constants'

// Centralized design system for consistent styling across components

export const levelColors = {
  [DIFFICULTY_LEVELS.BEGINNER]: `bg-[${COLORS.primary.green}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.green}]`,
  [DIFFICULTY_LEVELS.INTERMEDIATE]: `bg-[${COLORS.primary.gold}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.gold}]`,
  [DIFFICULTY_LEVELS.ADVANCED]: `bg-[${COLORS.primary.coral}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.coral}]`,
  mixed: `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.purple}]`,
} as const

export const domainColors = {
  [DOMAINS.AI]: `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}]`,
  'artificial-intelligence': `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.ML]: `bg-[${COLORS.primary.blue}] text-[${COLORS.primary.dark}]`,
  'machine-learning': `bg-[${COLORS.primary.blue}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.DATA_SCIENCE]: `bg-[${COLORS.primary.green}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.SOFTWARE_ENGINEERING]: `bg-[${COLORS.primary.lightGray}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.MATH]: `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}]`,
  'mathematics': `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.STATISTICS]: `bg-[${COLORS.primary.coral}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.DEEP_LEARNING]: `bg-[${COLORS.primary.purple}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.COMPUTER_VISION]: `bg-[${COLORS.primary.gold}] text-[${COLORS.primary.dark}]`,
  [DOMAINS.NLP]: `bg-[${COLORS.primary.coral}] text-[${COLORS.primary.dark}]`,
  'natural-language-processing': `bg-[${COLORS.primary.coral}] text-[${COLORS.primary.dark}]`,
} as const

export const typeIcons = {
  [TERM_TYPES.ALGORITHM]: '⚡',
  [TERM_TYPES.MODEL]: '🧠',
  [TERM_TYPES.METRIC]: '📊',
  [TERM_TYPES.LIBRARY]: '📚',
  [TERM_TYPES.TECHNIQUE]: '🔧',
  [TERM_TYPES.CONCEPT]: '💡',
  [TERM_TYPES.ARCHITECTURE]: '🏗️',
  [TERM_TYPES.METHOD]: '🎯',
} as const

export const statusColors = {
  draft: `bg-[${COLORS.primary.lightGray}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.lightGray}]`,
  'in-progress': `bg-[${COLORS.primary.gold}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.gold}]`,
  completed: `bg-[${COLORS.primary.green}] text-[${COLORS.primary.dark}] border-[${COLORS.primary.green}]`,
} as const

// Base card styling classes
export const cardStyles = {
  base: `bg-[${COLORS.primary.white}] rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-${ANIMATIONS.normal}`,
  hover: 'hover:shadow-lg hover:border-gray-300',
  featured: 'lg:col-span-2',
  group: 'group',
} as const

// Common image styling
export const imageStyles = {
  container: 'relative overflow-hidden',
  image: `object-cover transition-transform duration-${ANIMATIONS.normal}`,
  imageHover: 'group-hover:scale-105',
  overlay: 'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent',
  iconOverlay: 'absolute top-3 left-3',
  iconBadge: `text-2xl bg-[${COLORS.primary.white}]/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center`,
} as const

// Badge styling
export const badgeStyles = {
  base: 'px-2 py-1 text-xs font-medium rounded-full',
  withBorder: 'px-2 py-1 text-xs font-medium rounded-full border',
  large: 'px-3 py-1 text-sm font-medium rounded-full',
} as const

// Typography
export const textStyles = {
  cardTitle: 'font-bold text-gray-900 transition-colors',
  cardTitleLarge: 'text-xl font-bold text-gray-900 transition-colors',
  cardTitleHover: 'group-hover:text-blue-600',
  description: 'text-gray-600 leading-relaxed',
  meta: 'text-sm text-gray-500',
  link: 'text-blue-600 hover:text-blue-700 font-medium',
} as const

// Helper functions
export function getLevelColor(level: string): string {
  return levelColors[level as keyof typeof levelColors] || levelColors.beginner
}

export function getDomainColorClass(domain: string): string {
  const normalizedDomain = domain.toLowerCase().replace(/\s+/g, '-')
  return domainColors[normalizedDomain as keyof typeof domainColors] || domainColors['software-engineering']
}

export function getTypeIcon(type: string): string {
  return typeIcons[type as keyof typeof typeIcons] || '💡'
}

export function getStatusColor(status: string): string {
  return statusColors[status as keyof typeof statusColors] || statusColors.draft
}

// Format display names
export function formatDisplayName(value: string | undefined): string {
  if (!value) return ''
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}