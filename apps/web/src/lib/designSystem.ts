// Centralized design system for consistent styling across components

export const levelColors = {
  beginner: 'bg-[#39FF14] text-[#121212] border-[#39FF14]',
  intermediate: 'bg-[#FFD700] text-[#121212] border-[#FFD700]',
  advanced: 'bg-[#FF6F61] text-[#121212] border-[#FF6F61]',
  mixed: 'bg-[#E6E6FA] text-[#121212] border-[#E6E6FA]',
} as const

export const domainColors = {
  'ai': 'bg-[#E6E6FA] text-[#121212]',
  'artificial-intelligence': 'bg-[#E6E6FA] text-[#121212]',
  'ml': 'bg-[#00BFFF] text-[#121212]',
  'machine-learning': 'bg-[#00BFFF] text-[#121212]',
  'data-science': 'bg-[#39FF14] text-[#121212]',
  'software-engineering': 'bg-[#E0E0E0] text-[#121212]',
  'math': 'bg-[#E6E6FA] text-[#121212]',
  'mathematics': 'bg-[#E6E6FA] text-[#121212]',
  'statistics': 'bg-[#FF6F61] text-[#121212]',
  'deep-learning': 'bg-[#E6E6FA] text-[#121212]',
  'computer-vision': 'bg-[#FFD700] text-[#121212]',
  'nlp': 'bg-[#FF6F61] text-[#121212]',
  'natural-language-processing': 'bg-[#FF6F61] text-[#121212]',
} as const

export const typeIcons = {
  algorithm: '⚡',
  model: '🧠',
  metric: '📊',
  library: '📚',
  technique: '🔧',
  concept: '💡',
  architecture: '🏗️',
  method: '🎯',
} as const

export const statusColors = {
  draft: 'bg-[#E0E0E0] text-[#121212] border-[#E0E0E0]',
  'in-progress': 'bg-[#FFD700] text-[#121212] border-[#FFD700]',
  completed: 'bg-[#39FF14] text-[#121212] border-[#39FF14]',
} as const

// Base card styling classes
export const cardStyles = {
  base: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300',
  hover: 'hover:shadow-lg hover:border-gray-300',
  featured: 'lg:col-span-2',
  group: 'group',
} as const

// Common image styling
export const imageStyles = {
  container: 'relative overflow-hidden',
  image: 'object-cover transition-transform duration-300',
  imageHover: 'group-hover:scale-105',
  overlay: 'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent',
  iconOverlay: 'absolute top-3 left-3',
  iconBadge: 'text-2xl bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center',
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