'use client'

import { useState, useRef, useEffect } from 'react'

interface CardTooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

export function CardTooltip({ content, children, className = '' }: CardTooltipProps) {
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
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help"
      >
        {children}
      </div>
      
      {showTooltip && content && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-[90vw] z-50">
          <div className="bg-gray-900 text-white text-sm rounded-lg shadow-xl p-4 max-h-40 overflow-y-auto">
            <p className="leading-relaxed">{content}</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}