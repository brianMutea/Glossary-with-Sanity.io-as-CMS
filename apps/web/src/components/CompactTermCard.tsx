'use client'

import { useState, useRef } from 'react'
import { getLevelColor } from '@/lib/dynamicColors'


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
      className="group relative inline-block bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-3 hover:from-[#222222] hover:to-[#1A1A1A] transition-all duration-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Subtle accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#E0E0E0] opacity-30 rounded-t-xl" />
      
      {/* Level indicator */}
      <div 
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: levelColor }}
      />

      {/* Term name */}
      <div className="flex-1 pr-4 py-1">
        <h3 className="font-bold text-[#E0E0E0] group-hover:text-[#00BFFF] transition-colors leading-tight text-base">
          {term.term}
        </h3>
        
        {/* Small type indicator */}
        <p className="text-sm text-[#E0E0E0] mt-1 capitalize opacity-80">
          {term.type.replace('-', ' ')}
        </p>
      </div>
    </div>
  )
}