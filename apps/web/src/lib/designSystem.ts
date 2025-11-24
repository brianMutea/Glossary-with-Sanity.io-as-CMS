// Centralized design system for consistent styling across components

export const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
  mixed: 'bg-purple-100 text-purple-800 border-purple-200',
} as const

export const domainColors = {
  'ai': 'bg-purple-100 text-purple-800',
  'artificial-intelligence': 'bg-purple-100 text-purple-800',
  'ml': 'bg-blue-100 text-blue-800',
  'machine-learning': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'software-engineering': 'bg-gray-100 text-gray-800',
  'math': 'bg-indigo-100 text-indigo-800',
  'mathematics': 'bg-indigo-100 text-indigo-800',
  'statistics': 'bg-pink-100 text-pink-800',
  'deep-learning': 'bg-violet-100 text-violet-800',
  'computer-vision': 'bg-emerald-100 text-emerald-800',
  'nlp': 'bg-orange-100 text-orange-800',
  'natural-language-processing': 'bg-orange-100 text-orange-800',
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
  draft: 'bg-gray-100 text-gray-800 border-gray-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
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
export function formatDisplayName(value: string): string {
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}