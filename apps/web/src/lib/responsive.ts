/**
 * Centralized responsive design system
 * Ensures consistent breakpoints and responsive behavior across all components
 */

// Standard breakpoints (matching Tailwind defaults)
export const breakpoints = {
  sm: '640px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X large devices
} as const

// Container max-widths for consistent layout
export const containers = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
} as const

// Standard padding/spacing
export const spacing = {
  page: 'px-4 sm:px-6 lg:px-8',
  section: 'py-16',
  sectionSm: 'py-8',
  sectionLg: 'py-24',
  card: 'p-6',
  cardSm: 'p-4',
  cardLg: 'p-8'
} as const

// Grid responsive patterns
export const grids = {
  // 1 -> 2 -> 3 columns (most common)
  standard: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  
  // 1 -> 2 -> 3 -> 4 columns (compact items)
  compact: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  
  // 1 -> 2 -> 3 -> 4 -> 5 columns (very small items)
  dense: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  
  // 1 -> 2 columns (wide items)
  wide: 'grid grid-cols-1 lg:grid-cols-2',
  
  // 1 -> 2 -> 3 -> 4 -> 6 columns (flexible)
  flexible: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
} as const

// Gap sizes
export const gaps = {
  sm: 'gap-4',
  md: 'gap-6', 
  lg: 'gap-8',
  xl: 'gap-12'
} as const

// Typography responsive scales
export const typography = {
  // Page titles
  hero: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  title: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  subtitle: 'text-2xl md:text-3xl font-bold',
  
  // Body text
  lead: 'text-lg md:text-xl',
  body: 'text-base',
  small: 'text-sm',
  
  // Card titles
  cardTitle: 'text-lg md:text-xl font-bold',
  cardTitleLarge: 'text-xl md:text-2xl font-bold'
} as const

// Common responsive utility combinations
export const utils = {
  // Page container
  pageContainer: `${containers.lg} mx-auto ${spacing.page}`,
  
  // Section wrapper
  section: `${spacing.section}`,
  
  // Card grid with standard spacing
  cardGrid: `${grids.standard} ${gaps.lg}`,
  
  // Compact grid
  compactGrid: `${grids.compact} ${gaps.md}`,
  
  // Dense grid for small items
  denseGrid: `${grids.dense} ${gaps.sm}`
} as const

/**
 * Responsive helper functions
 */

// Get responsive grid classes based on item count and size
export function getResponsiveGrid(itemSize: 'small' | 'medium' | 'large' = 'medium') {
  switch (itemSize) {
    case 'small':
      return `${grids.dense} ${gaps.sm}`
    case 'large': 
      return `${grids.wide} ${gaps.xl}`
    default:
      return `${grids.standard} ${gaps.lg}`
  }
}

// Get responsive container based on content width needs
export function getContainer(size: keyof typeof containers = 'lg') {
  return `${containers[size]} mx-auto ${spacing.page}`
}

// Combine responsive classes safely
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}