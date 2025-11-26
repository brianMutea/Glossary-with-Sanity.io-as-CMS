import { COLORS } from './constants'

/**
 * Color utility functions for dynamic styling
 */

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ColorIntensity = 'light' | 'normal' | 'dark'

/**
 * Generate dynamic color classes based on variant and intensity
 */
export function getColorClasses(
  variant: ColorVariant = 'primary',
  intensity: ColorIntensity = 'normal'
): {
  background: string
  text: string
  border: string
} {
  const colorMap = {
    primary: {
      light: { bg: COLORS.primary.blue, text: COLORS.text.primary, border: COLORS.primary.blue },
      normal: { bg: COLORS.primary.blue, text: COLORS.text.primary, border: COLORS.primary.blue },
      dark: { bg: COLORS.primary.dark, text: COLORS.text.primary, border: COLORS.primary.dark },
    },
    secondary: {
      light: { bg: COLORS.primary.lightGray, text: COLORS.text.inverse, border: COLORS.primary.lightGray },
      normal: { bg: COLORS.primary.gray, text: COLORS.text.primary, border: COLORS.primary.gray },
      dark: { bg: COLORS.primary.darkSecondary, text: COLORS.text.primary, border: COLORS.primary.darkSecondary },
    },
    success: {
      light: { bg: COLORS.success + '20', text: COLORS.success, border: COLORS.success },
      normal: { bg: COLORS.success, text: COLORS.text.inverse, border: COLORS.success },
      dark: { bg: COLORS.success, text: COLORS.text.inverse, border: COLORS.success },
    },
    warning: {
      light: { bg: COLORS.warning + '20', text: COLORS.warning, border: COLORS.warning },
      normal: { bg: COLORS.warning, text: COLORS.text.inverse, border: COLORS.warning },
      dark: { bg: COLORS.warning, text: COLORS.text.inverse, border: COLORS.warning },
    },
    error: {
      light: { bg: COLORS.error + '20', text: COLORS.error, border: COLORS.error },
      normal: { bg: COLORS.error, text: COLORS.text.primary, border: COLORS.error },
      dark: { bg: COLORS.error, text: COLORS.text.primary, border: COLORS.error },
    },
    info: {
      light: { bg: COLORS.info + '20', text: COLORS.info, border: COLORS.info },
      normal: { bg: COLORS.info, text: COLORS.text.primary, border: COLORS.info },
      dark: { bg: COLORS.info, text: COLORS.text.primary, border: COLORS.info },
    },
  }

  const colors = colorMap[variant][intensity]
  
  return {
    background: `bg-[${colors.bg}]`,
    text: `text-[${colors.text}]`,
    border: `border-[${colors.border}]`,
  }
}

/**
 * Generate hover state classes
 */
export function getHoverClasses(variant: ColorVariant = 'primary'): string {
  const hoverMap = {
    primary: `hover:bg-[${COLORS.primary.blue}] hover:text-[${COLORS.text.primary}]`,
    secondary: `hover:bg-[${COLORS.primary.gray}] hover:text-[${COLORS.text.primary}]`,
    success: `hover:bg-[${COLORS.success}] hover:text-[${COLORS.text.inverse}]`,
    warning: `hover:bg-[${COLORS.warning}] hover:text-[${COLORS.text.inverse}]`,
    error: `hover:bg-[${COLORS.error}] hover:text-[${COLORS.text.primary}]`,
    info: `hover:bg-[${COLORS.info}] hover:text-[${COLORS.text.primary}]`,
  }

  return hoverMap[variant]
}

/**
 * Generate focus state classes
 */
export function getFocusClasses(): string {
  return `focus:outline-none focus:ring-2 focus:ring-[${COLORS.primary.blue}] focus:ring-offset-2`
}

/**
 * Generate transition classes
 */
export function getTransitionClasses(properties: string[] = ['all']): string {
  const props = properties.join(', ')
  return `transition-[${props}] duration-200 ease-in-out`
}

/**
 * Generate shadow classes based on elevation
 */
export function getShadowClasses(elevation: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'sm'): string {
  const shadowMap = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  return shadowMap[elevation]
}

/**
 * Generate responsive classes
 */
export function getResponsiveClasses(
  mobile: string,
  tablet?: string,
  desktop?: string
): string {
  let classes = mobile
  
  if (tablet) {
    classes += ` md:${tablet}`
  }
  
  if (desktop) {
    classes += ` lg:${desktop}`
  }
  
  return classes
}

/**
 * Combine multiple class strings safely
 */
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}