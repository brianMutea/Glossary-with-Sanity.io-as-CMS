'use client'

import { useState, useRef } from 'react'
import { getDomainColor, getLevelColor } from '@/lib/dynamicColors'

interface CompactTermCardProps {
  term: {
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: 'beginner' | 'intermediate' | 'advanced'
    domain: string
    type: string
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    tags?: string[]
    relatedCount?: number
    tutorialArticle?: {
      title: string
      slug: { current: string }
    }
  }
  onHover?: (term: any, rect: DOMRect) => void
  onHoverEnd?: () => void
  onTap?: (term: any) => void
}

export function CompactTermCard({ term, onHover, onHoverEnd, onTap }: CompactTermCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const domainColor = getDomainColor(term.domain)
  const levelColor = getLevelColor(term.level)

  const handleMouseEnter = () => {
    if (onHover && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      onHover(term, rect)
    }
  }

  const handleMouseLeave = () => {
    if (onHoverEnd) {
      onHoverEnd()
    }
  }

  const handleClick = () => {
    if (onTap) {
      onTap(term)
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#1A1A1A] border border-[#333333] p-4 hover:border-[#00BFFF] transition-all duration-200 cursor-pointer min-h-[80px] flex items-center hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Color accent bar */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: domainColor }}
      />
      
      {/* Level indicator */}
      <div 
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: levelColor }}
      />

      {/* Term name */}
      <div className="flex-1">
        <h3 className="font-bold text-[#FFFFFF] group-hover:text-[#00BFFF] transition-colors leading-tight">
          {term.term}
        </h3>
        
        {/* Small type indicator */}
        <p className="text-xs text-[#E0E0E0] mt-1 capitalize">
          {term.type.replace('-', ' ')}
        </p>
      </div>
    </div>
  )
}