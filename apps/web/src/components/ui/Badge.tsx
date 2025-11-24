import { badgeStyles, getLevelColor, getDomainColorClass, getStatusColor } from '@/lib/designSystem'

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
  // Size classes
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const sizeClass = `${sizeClasses[size]} font-medium rounded-full`
  
  let variantClass = ''

  switch (variant) {
    case 'level':
      variantClass = value ? getLevelColor(value) : 'bg-[#39FF14] text-[#121212]'
      break
    case 'domain':
      variantClass = value ? getDomainColorClass(value) : 'bg-[#00BFFF] text-[#121212]'
      break
    case 'type':
      variantClass = 'bg-[#FFD700] text-[#121212]'
      break
    case 'language':
      variantClass = 'bg-[#00BFFF] text-[#121212] border border-[#00BFFF]'
      break
    case 'status':
      if (value === 'completed') {
        variantClass = 'bg-[#39FF14] text-[#121212]'
      } else if (value === 'in-progress') {
        variantClass = 'bg-[#FFD700] text-[#121212]'
      } else if (value === 'draft') {
        variantClass = 'bg-[#E0E0E0] text-[#121212]'
      } else {
        variantClass = 'bg-[#333333] text-[#E0E0E0]'
      }
      break
    case 'progress':
      variantClass = 'bg-[#39FF14] bg-opacity-20 text-[#39FF14] border border-[#39FF14]'
      break
    case 'custom':
      variantClass = 'bg-[#333333] text-[#E0E0E0]'
      break
    default:
      variantClass = 'bg-[#333333] text-[#E0E0E0]'
  }

  return (
    <span 
      className={`${sizeClass} ${variantClass} ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}