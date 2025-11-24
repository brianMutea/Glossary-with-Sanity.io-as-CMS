import { ReactNode } from 'react'

interface GridLayoutProps {
  children: ReactNode
  variant?: 'cards' | 'compact' | 'wide' | 'masonry'
  className?: string
}

const gridVariants = {
  // Standard card grid (BlogCard, SeriesCard, etc.)
  cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  
  // Compact grid (AuthorCard, small items)
  compact: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6',
  
  // Wide grid (LearningPathCard, featured content)
  wide: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8',
  
  // Masonry-like grid (CompactTermCard)
  masonry: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
}

export function GridLayout({ children, variant = 'cards', className = '' }: GridLayoutProps) {
  return (
    <div className={`${gridVariants[variant]} ${className}`}>
      {children}
    </div>
  )
}