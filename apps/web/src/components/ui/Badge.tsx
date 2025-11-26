import { badgeStyles, getLevelColor, getDomainColorClass, getStatusColor } from '@/lib/designSystem'
import { combineClasses } from '@/lib/colorUtils'
import { COLORS, TYPOGRAPHY } from '@/lib/constants'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'level' | 'domain' | 'status' | 'type' | 'language' | 'progress' | 'custom'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  value?: string // Used for level, domain, status, type variants
  className?: string
  style?: React.CSSProperties
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  value, 
  className = '',
  style 
}: BadgeProps) {
  // Size classes using constants
  const sizeClasses = {
    xs: `px-1.5 py-0.5 text-[${TYPOGRAPHY.fontSizes.xs}]`,
    sm: `px-2 py-1 text-[${TYPOGRAPHY.fontSizes.xs}]`,
    md: `px-3 py-1 text-[${TYPOGRAPHY.fontSizes.sm}]`,
    lg: `px-4 py-2 text-[${TYPOGRAPHY.fontSizes.base}]`
  }
  
  const sizeClass = combineClasses(
    sizeClasses[size],
    `font-[${TYPOGRAPHY.fontWeights.medium}]`,
    'rounded-full'
  )
  
  let variantClass = ''

  switch (variant) {
    case 'level':
      variantClass = value ? getLevelColor(value) : 'bg-[#39FF14] text-[#121212]'
      break
    case 'domain':
      variantClass = value ? getDomainColorClass(value) : 'bg-[#00BFFF] text-[#121212]'
      break
    case 'type':
      variantClass = `bg-[${COLORS.primary.gold}] text-[${COLORS.primary.dark}]`
      break
    case 'language':
      variantClass = `bg-[${COLORS.primary.blue}] text-[${COLORS.primary.dark}] border border-[${COLORS.primary.blue}]`
      break
    case 'status':
      if (value === 'completed') {
        variantClass = `bg-[${COLORS.success}] text-[${COLORS.primary.dark}]`
      } else if (value === 'in-progress') {
        variantClass = `bg-[${COLORS.warning}] text-[${COLORS.primary.dark}]`
      } else if (value === 'draft') {
        variantClass = `bg-[${COLORS.primary.lightGray}] text-[${COLORS.primary.dark}]`
      } else {
        variantClass = `bg-[${COLORS.primary.gray}] text-[${COLORS.text.primary}]`
      }
      break
    case 'progress':
      variantClass = `bg-[${COLORS.success}] bg-opacity-20 text-[${COLORS.success}] border border-[${COLORS.success}]`
      break
    case 'custom':
      variantClass = `bg-[${COLORS.primary.gray}] text-[${COLORS.text.primary}]`
      break
    default:
      variantClass = `bg-[${COLORS.primary.gray}] text-[${COLORS.text.primary}]`
  }

  return (
    <span 
      className={combineClasses(sizeClass, variantClass, className)}
      style={style}
    >
      {children}
    </span>
  )
}