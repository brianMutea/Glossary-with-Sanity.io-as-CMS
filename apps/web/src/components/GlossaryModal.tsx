'use client'

import { useEffect, useRef } from 'react'
import { GlossaryModalContent } from './GlossaryModalContent'
import { calculateTooltipPosition, type TooltipPosition } from '@/lib/tooltipPositioning'

interface GlossaryModalProps {
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
  } | null
  variant: 'desktop' | 'mobile'
  isVisible: boolean
  triggerRect?: DOMRect | null // Only needed for desktop
  onMouseEnter?: () => void // Only used for desktop
  onMouseLeave?: () => void // Only used for desktop
  onClose?: () => void
}

export function GlossaryModal({
  term,
  variant,
  isVisible,
  triggerRect,
  onMouseEnter,
  onMouseLeave,
  onClose
}: GlossaryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Calculate position synchronously to prevent flash
  const calculateCurrentPosition = (): TooltipPosition => {
    if (variant !== 'desktop' || !triggerRect) {
      return { x: 0, y: 0, placement: 'right' }
    }

    const tooltipWidth = 380
    const tooltipHeight = 450

    return calculateTooltipPosition({
      triggerRect,
      tooltipWidth,
      tooltipHeight,
      offset: 15,
      padding: 24,
      preferredPlacement: 'right'
    })
  }

  // Calculate position immediately, not in state
  const position = calculateCurrentPosition()

  // Don't render if position is not ready for desktop
  const shouldRender = variant === 'mobile' || (variant === 'desktop' && triggerRect && position.x !== 0 && position.y !== 0)

  // Handle scroll and resize for desktop
  useEffect(() => {
    if (variant !== 'desktop') return

    const handleScroll = () => {
      if (isVisible && onClose) {
        onClose()
      }
    }

    const handleResize = () => {
      if (isVisible && triggerRect && term) {
        const tooltipWidth = 380
        const tooltipHeight = 450

        const newPosition = calculateTooltipPosition({
          triggerRect,
          tooltipWidth,
          tooltipHeight,
          offset: 15,
          padding: 24,
          preferredPlacement: 'right'
        })

        // Position is calculated synchronously, no need to set state
      }
    }

    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [variant, isVisible, onClose, term, triggerRect])

  // Handle body scroll lock for mobile
  useEffect(() => {
    if (variant !== 'mobile') return

    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [variant, isVisible])

  if (!term || !isVisible || !shouldRender) return null

  // Desktop variant
  if (variant === 'desktop') {
    return (
      <div
        ref={modalRef}
        className={`fixed z-50 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-200 ease-out flex flex-col ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translateZ(0)',
          pointerEvents: isVisible ? 'auto' : 'none',
          maxHeight: `${Math.min(500, window.innerHeight - 80)}px`
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Arrow indicator */}
        {position.arrow && (
          <div
            className="absolute w-3 h-3 bg-white border border-gray-200 rotate-45"
            style={{
              left: position.arrow.side === 'left' ? -6 : position.arrow.side === 'right' ? 'calc(100% - 6px)' : position.arrow.x - position.x - 6,
              top: position.arrow.side === 'top' ? -6 : position.arrow.side === 'bottom' ? 'calc(100% - 6px)' : position.arrow.y - position.y - 6,
              borderColor: position.arrow.side === 'left' ? 'transparent transparent #e5e7eb #e5e7eb' :
                position.arrow.side === 'right' ? '#e5e7eb #e5e7eb transparent transparent' :
                  position.arrow.side === 'top' ? 'transparent #e5e7eb #e5e7eb transparent' :
                    '#e5e7eb transparent transparent #e5e7eb'
            }}
          />
        )}

        <GlossaryModalContent term={term} onClose={onClose} />
      </div>
    )
  }

  // Mobile variant
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-200 ease-out flex flex-col ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        style={{
          left: '50%',
          top: '50%',
          transform: isVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(0.95)',
          maxHeight: `${Math.min(500, window.innerHeight - 80)}px`,
          width: 'min(384px, calc(100vw - 32px))',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <GlossaryModalContent term={term} onClose={onClose} />
      </div>
    </>
  )
}