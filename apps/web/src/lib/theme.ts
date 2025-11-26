import { COLORS, TYPOGRAPHY, SPACING, ANIMATIONS, Z_INDEX } from './constants'

/**
 * Comprehensive theme configuration
 * Provides a centralized theme system for consistent styling
 */

export interface ThemeConfig {
  colors: typeof COLORS
  typography: typeof TYPOGRAPHY
  spacing: typeof SPACING
  animations: typeof ANIMATIONS
  zIndex: typeof Z_INDEX
  components: ComponentThemes
}

interface ComponentThemes {
  button: ButtonTheme
  card: CardTheme
  input: InputTheme
  modal: ModalTheme
  tooltip: TooltipTheme
}

interface ButtonTheme {
  variants: {
    primary: string
    secondary: string
    ghost: string
    danger: string
  }
  sizes: {
    sm: string
    md: string
    lg: string
  }
  base: string
}

interface CardTheme {
  base: string
  variants: {
    default: string
    elevated: string
    outlined: string
  }
  interactive: string
}

interface InputTheme {
  base: string
  states: {
    focus: string
    error: string
    disabled: string
  }
}

interface ModalTheme {
  overlay: string
  content: string
  header: string
  body: string
  footer: string
}

interface TooltipTheme {
  base: string
  arrow: string
  variants: {
    dark: string
    light: string
  }
}

export const theme: ThemeConfig = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  animations: ANIMATIONS,
  zIndex: Z_INDEX,
  
  components: {
    button: {
      base: `
        inline-flex items-center justify-center
        font-[${TYPOGRAPHY.fontWeights.medium}]
        rounded-lg
        transition-all duration-[${ANIMATIONS.normal}]
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
      `,
      variants: {
        primary: `
          bg-[${COLORS.primary.blue}] text-[${COLORS.text.primary}]
          hover:bg-[${COLORS.primary.blue}]/90
          focus:ring-[${COLORS.primary.blue}]
        `,
        secondary: `
          bg-[${COLORS.background.secondary}] text-[${COLORS.text.primary}]
          border border-[${COLORS.border.primary}]
          hover:bg-[${COLORS.background.tertiary}]
          focus:ring-[${COLORS.border.accent}]
        `,
        ghost: `
          bg-transparent text-[${COLORS.text.secondary}]
          hover:bg-[${COLORS.background.secondary}] hover:text-[${COLORS.text.primary}]
          focus:ring-[${COLORS.border.accent}]
        `,
        danger: `
          bg-[${COLORS.error}] text-[${COLORS.text.primary}]
          hover:bg-[${COLORS.error}]/90
          focus:ring-[${COLORS.error}]
        `,
      },
      sizes: {
        sm: `px-3 py-1.5 text-[${TYPOGRAPHY.fontSizes.sm}]`,
        md: `px-4 py-2 text-[${TYPOGRAPHY.fontSizes.base}]`,
        lg: `px-6 py-3 text-[${TYPOGRAPHY.fontSizes.lg}]`,
      },
    },
    
    card: {
      base: `
        bg-[${COLORS.background.card}]
        border border-[${COLORS.border.primary}]
        rounded-xl
        transition-all duration-[${ANIMATIONS.normal}]
      `,
      variants: {
        default: '',
        elevated: `shadow-lg hover:shadow-xl`,
        outlined: `border-2 border-[${COLORS.border.accent}]`,
      },
      interactive: `
        cursor-pointer
        hover:border-[${COLORS.border.accent}]
        hover:shadow-md
        active:scale-[0.98]
      `,
    },
    
    input: {
      base: `
        w-full px-3 py-2
        bg-[${COLORS.background.secondary}]
        border border-[${COLORS.border.primary}]
        rounded-lg
        text-[${COLORS.text.primary}]
        placeholder-[${COLORS.text.muted}]
        transition-all duration-[${ANIMATIONS.fast}]
      `,
      states: {
        focus: `
          outline-none
          border-[${COLORS.border.accent}]
          ring-2 ring-[${COLORS.border.accent}]/20
        `,
        error: `
          border-[${COLORS.error}]
          ring-2 ring-[${COLORS.error}]/20
        `,
        disabled: `
          opacity-50
          cursor-not-allowed
          bg-[${COLORS.background.tertiary}]
        `,
      },
    },
    
    modal: {
      overlay: `
        fixed inset-0
        bg-[${COLORS.background.modal}]
        backdrop-blur-sm
        z-[${Z_INDEX.modal}]
        flex items-center justify-center
        p-4
      `,
      content: `
        bg-[${COLORS.background.card}]
        border border-[${COLORS.border.primary}]
        rounded-xl
        shadow-2xl
        max-w-lg w-full
        max-h-[90vh]
        overflow-hidden
      `,
      header: `
        px-6 py-4
        border-b border-[${COLORS.border.primary}]
        flex items-center justify-between
      `,
      body: `
        px-6 py-4
        overflow-y-auto
      `,
      footer: `
        px-6 py-4
        border-t border-[${COLORS.border.primary}]
        flex items-center justify-end gap-3
      `,
    },
    
    tooltip: {
      base: `
        px-2 py-1
        text-[${TYPOGRAPHY.fontSizes.sm}]
        rounded
        z-[${Z_INDEX.tooltip}]
        pointer-events-none
        transition-opacity duration-[${ANIMATIONS.fast}]
      `,
      arrow: `
        absolute w-2 h-2
        rotate-45
      `,
      variants: {
        dark: `
          bg-[${COLORS.background.primary}]
          text-[${COLORS.text.primary}]
          border border-[${COLORS.border.primary}]
        `,
        light: `
          bg-[${COLORS.primary.white}]
          text-[${COLORS.text.inverse}]
          border border-[${COLORS.border.primary}]
          shadow-lg
        `,
      },
    },
  },
}

/**
 * Get theme-aware classes for a component
 */
export function getComponentClasses(
  component: keyof ComponentThemes,
  variant?: string,
  size?: string,
  state?: string
): string {
  const componentTheme = theme.components[component] as any
  
  let classes = componentTheme.base || ''
  
  if (variant && componentTheme.variants?.[variant]) {
    classes += ' ' + componentTheme.variants[variant]
  }
  
  if (size && componentTheme.sizes?.[size]) {
    classes += ' ' + componentTheme.sizes[size]
  }
  
  if (state && componentTheme.states?.[state]) {
    classes += ' ' + componentTheme.states[state]
  }
  
  return classes.replace(/\s+/g, ' ').trim()
}

/**
 * Create a custom theme variant
 */
export function createThemeVariant<T extends keyof ComponentThemes>(
  component: T,
  variantName: string,
  classes: string
): void {
  const componentTheme = theme.components[component] as any
  if (!componentTheme.variants) {
    componentTheme.variants = {}
  }
  componentTheme.variants[variantName] = classes
}

/**
 * Get responsive classes based on breakpoints
 */
export function getResponsiveClasses(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}): string {
  let result = classes.base || ''
  
  if (classes.sm) result += ` sm:${classes.sm}`
  if (classes.md) result += ` md:${classes.md}`
  if (classes.lg) result += ` lg:${classes.lg}`
  if (classes.xl) result += ` xl:${classes.xl}`
  
  return result.trim()
}