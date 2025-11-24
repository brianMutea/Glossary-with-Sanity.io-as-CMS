import { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  href?: string
  variant?: 'default' | 'compact' | 'featured'
  className?: string
  onClick?: () => void
}

const cardVariants = {
  default: 'bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden hover:border-[#00BFFF] transition-all duration-200 hover:scale-105',
  compact: 'bg-[#1A1A1A] border border-[#333333] rounded p-6 hover:border-[#00BFFF] transition-all duration-200 hover:scale-105',
  featured: 'bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden hover:border-[#00BFFF] transition-all duration-200 hover:scale-105 lg:col-span-2'
}

export function Card({ children, href, variant = 'default', className = '', onClick }: CardProps) {
  const cardClass = `group ${cardVariants[variant]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {children}
      </Link>
    )
  }
  
  if (onClick) {
    return (
      <button onClick={onClick} className={cardClass}>
        {children}
      </button>
    )
  }
  
  return (
    <div className={cardClass}>
      {children}
    </div>
  )
}