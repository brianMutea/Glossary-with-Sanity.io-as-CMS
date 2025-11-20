'use client'

import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'

// Lazy load tooltip content for better performance
const TooltipContent = lazy(() => import('./TooltipContent').then(module => ({ default: module.TooltipContent })))

interface GlossaryTooltipProps {
  term: string
  slug: string
  definition: string
  level?: string
  domain?: string
  children: React.ReactNode
}

export function GlossaryTooltip({ 
  term, 
  slug, 
  definition, 
  level, 
  domain, 
  children 
}: GlossaryTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 300) // 300ms delay
  }

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer text-blue-600 underline decoration-dotted hover:decoration-solid hover:text-blue-800 transition-colors"
        style={{ 
          textDecorationThickness: '2px', 
          textUnderlineOffset: '2px',
          textDecorationColor: '#3b82f6'
        }}
      >
        {children}
      </span>
      
      {showTooltip && (
        <span 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm z-50 block"
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <Suspense fallback={
            <span className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 block">
              <span className="text-gray-500 text-sm">Loading...</span>
            </span>
          }>
            <TooltipContent
              term={term}
              slug={slug}
              definition={definition}
              level={level}
              domain={domain}
            />
          </Suspense>
          
          {/* Arrow */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300 block"></span>
        </span>
      )}
    </span>
  )
}