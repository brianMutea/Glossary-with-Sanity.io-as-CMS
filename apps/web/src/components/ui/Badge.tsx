import { badgeStyles, getLevelColor, getDomainColorClass, getStatusColor } from '@/lib/designSystem'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'level' | 'domain' | 'status' | 'custom'
  size?: 'sm' | 'md'
  value?: string // Used for level, domain, status variants
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
  const sizeClass = size === 'md' ? badgeStyles.large : badgeStyles.base
  
  let variantClass = ''
  let customStyle = style

  switch (variant) {
    case 'level':
      variantClass = `${badgeStyles.withBorder} ${value ? getLevelColor(value) : 'bg-gray-100 text-gray-800'}`
      break
    case 'domain':
      variantClass = `${badgeStyles.base} ${value ? getDomainColorClass(value) : 'bg-gray-100 text-gray-800'}`
      break
    case 'status':
      variantClass = `${badgeStyles.withBorder} ${value ? getStatusColor(value) : 'bg-gray-100 text-gray-800'}`
      break
    case 'custom':
      variantClass = badgeStyles.base
      break
    default:
      variantClass = `${badgeStyles.base} bg-gray-100 text-gray-700`
  }

  return (
    <span 
      className={`${sizeClass} ${variantClass} ${className}`}
      style={customStyle}
    >
      {children}
    </span>
  )
}