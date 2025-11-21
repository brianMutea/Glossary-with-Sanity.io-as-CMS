/**
 * Dynamic color generation and management for domains, types, and levels
 * This eliminates the need to hardcode colors and makes the system fully scalable
 */

// Base color palettes for different categories
const DOMAIN_COLORS = [
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6366f1', // indigo
    '#14b8a6', // teal
    '#f43f5e', // rose
    '#a855f7', // violet
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#3b82f6', // blue
    '#22c55e', // green
    '#8b5a2b', // brown
    '#6b7280', // gray
]

const TYPE_COLORS = [
    '#7c3aed', // violet
    '#0891b2', // cyan
    '#65a30d', // lime
    '#ea580c', // orange
    '#db2777', // pink
    '#4f46e5', // indigo
    '#0d9488', // teal
    '#e11d48', // rose
]

// Fixed level colors (these should remain consistent)
export const LEVEL_COLORS = {
    beginner: '#10b981',    // green
    intermediate: '#f59e0b', // amber
    advanced: '#ef4444'      // red
} as const

/**
 * Generate a consistent color for any string using a hash function
 */
function stringToColor(str: string, palette: string[]): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }

    const index = Math.abs(hash) % palette.length
    return palette[index]
}

/**
 * Get color for a domain - automatically generates consistent colors
 */
export function getDomainColor(domain: string): string {
    return stringToColor(domain.toLowerCase(), DOMAIN_COLORS)
}

/**
 * Get color for a type - automatically generates consistent colors
 */
export function getTypeColor(type: string): string {
    return stringToColor(type.toLowerCase(), TYPE_COLORS)
}

/**
 * Get color for a level - uses fixed colors for consistency
 */
export function getLevelColor(level: 'beginner' | 'intermediate' | 'advanced'): string {
    return LEVEL_COLORS[level]
}

/**
 * Extract unique values from an array of objects
 */
export function extractUniqueValues<T extends Record<string, any>>(
    items: T[],
    key: keyof T
): string[] {
    const values = items
        .map(item => item[key])
        .filter((value: any): value is string => typeof value === 'string' && value.length > 0)

    return [...new Set(values)].sort()
}

/**
 * Format domain/type names for display
 */
export function formatDisplayName(value: string): string {
    return value
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Generate a color palette for a list of items
 */
export function generateColorPalette(
    items: string[],
    type: 'domain' | 'type' = 'domain'
): Record<string, string> {
    const palette = type === 'domain' ? DOMAIN_COLORS : TYPE_COLORS
    const colorMap: Record<string, string> = {}

    items.forEach(item => {
        colorMap[item] = stringToColor(item.toLowerCase(), palette)
    })

    return colorMap
}

/**
 * Get all available options dynamically from data
 */
export function getDynamicOptions<T extends { domain?: string; type?: string; level?: string }>(
    data: T[]
): {
    domains: string[]
    types: string[]
    levels: string[]
    domainColors: Record<string, string>
    typeColors: Record<string, string>
} {
    const domains = extractUniqueValues(data, 'domain')
    const types = extractUniqueValues(data, 'type')
    const levels = extractUniqueValues(data, 'level')

    return {
        domains,
        types,
        levels,
        domainColors: generateColorPalette(domains, 'domain'),
        typeColors: generateColorPalette(types, 'type')
    }
}