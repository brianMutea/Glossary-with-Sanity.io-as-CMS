/**
 * Robust tooltip positioning utility
 * Based on industry standards for tooltip/popover positioning
 */

export interface TooltipPosition {
  x: number
  y: number
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center'
  arrow?: {
    x: number
    y: number
    side: 'top' | 'bottom' | 'left' | 'right'
  }
}

export interface PositionOptions {
  triggerRect: DOMRect
  tooltipWidth: number
  tooltipHeight: number
  offset?: number
  padding?: number
  preferredPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

/**
 * Calculate optimal tooltip position with collision detection
 */
export function calculateTooltipPosition(options: PositionOptions): TooltipPosition {
  const {
    triggerRect,
    tooltipWidth,
    tooltipHeight,
    offset = 12,
    padding = 16,
    preferredPlacement = 'right'
  } = options

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  }

  // Available space in each direction
  const spaces = {
    top: triggerRect.top - padding,
    bottom: viewport.height - triggerRect.bottom - padding,
    left: triggerRect.left - padding,
    right: viewport.width - triggerRect.right - padding
  }

  // Check if tooltip fits in each direction
  const fits = {
    top: spaces.top >= tooltipHeight + offset,
    bottom: spaces.bottom >= tooltipHeight + offset,
    left: spaces.left >= tooltipWidth + offset,
    right: spaces.right >= tooltipWidth + offset
  }

  // Placement priority based on available space and preference
  const placements: Array<'top' | 'bottom' | 'left' | 'right'> = [preferredPlacement]
  
  // Add other placements in order of available space
  const otherPlacements = (['top', 'bottom', 'left', 'right'] as const)
    .filter(p => p !== preferredPlacement)
    .sort((a, b) => {
      const spaceA = a === 'top' || a === 'bottom' ? spaces[a] : spaces[a]
      const spaceB = b === 'top' || b === 'bottom' ? spaces[b] : spaces[b]
      return spaceB - spaceA
    })
  
  placements.push(...otherPlacements)

  // Try each placement
  for (const placement of placements) {
    if (fits[placement]) {
      const position = calculatePositionForPlacement(
        placement,
        triggerRect,
        tooltipWidth,
        tooltipHeight,
        offset,
        viewport,
        padding
      )
      
      if (position) {
        return position
      }
    }
  }

  // Fallback: find the best position that doesn't overlap
  // Try to position away from the trigger element
  const triggerCenterX = triggerRect.left + triggerRect.width / 2
  const triggerCenterY = triggerRect.top + triggerRect.height / 2
  
  let fallbackX: number, fallbackY: number
  
  // Position on the side of viewport with more space
  if (triggerCenterX < viewport.width / 2) {
    // Trigger is on left side, position tooltip on right side
    fallbackX = Math.max(triggerRect.right + offset, viewport.width - tooltipWidth - padding)
  } else {
    // Trigger is on right side, position tooltip on left side  
    fallbackX = Math.min(triggerRect.left - tooltipWidth - offset, padding)
  }
  
  // Center vertically, but ensure it fits
  fallbackY = Math.max(padding, Math.min(
    triggerCenterY - tooltipHeight / 2,
    viewport.height - tooltipHeight - padding
  ))
  
  // Final safety bounds check
  fallbackX = Math.max(padding, Math.min(fallbackX, viewport.width - tooltipWidth - padding))
  fallbackY = Math.max(padding, Math.min(fallbackY, viewport.height - tooltipHeight - padding))
  
  return {
    x: fallbackX,
    y: fallbackY,
    placement: 'center'
  }
}

function calculatePositionForPlacement(
  placement: 'top' | 'bottom' | 'left' | 'right',
  triggerRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
  offset: number,
  viewport: { width: number; height: number },
  padding: number
): TooltipPosition | null {
  let x: number, y: number

  switch (placement) {
    case 'right':
      x = triggerRect.right + offset
      y = triggerRect.top + (triggerRect.height - tooltipHeight) / 2
      
      // Check if it fits in viewport
      if (x + tooltipWidth > viewport.width - padding || 
          y < padding || 
          y + tooltipHeight > viewport.height - padding) {
        return null
      }
      break
      
    case 'left':
      x = triggerRect.left - tooltipWidth - offset
      y = triggerRect.top + (triggerRect.height - tooltipHeight) / 2
      
      // Check if it fits in viewport
      if (x < padding || 
          y < padding || 
          y + tooltipHeight > viewport.height - padding) {
        return null
      }
      break
      
    case 'bottom':
      x = triggerRect.left + (triggerRect.width - tooltipWidth) / 2
      y = triggerRect.bottom + offset
      
      // Adjust x to stay in viewport
      x = Math.max(padding, Math.min(x, viewport.width - tooltipWidth - padding))
      
      // Check if it fits in viewport
      if (y + tooltipHeight > viewport.height - padding) {
        return null
      }
      break
      
    case 'top':
      x = triggerRect.left + (triggerRect.width - tooltipWidth) / 2
      y = triggerRect.top - tooltipHeight - offset
      
      // Adjust x to stay in viewport
      x = Math.max(padding, Math.min(x, viewport.width - tooltipWidth - padding))
      
      // Check if it fits in viewport
      if (y < padding) {
        return null
      }
      break
  }

  // Calculate arrow position
  const tooltipRect = {
    left: x,
    right: x + tooltipWidth,
    top: y,
    bottom: y + tooltipHeight
  }
  
  const arrow = calculateArrowPosition(placement, triggerRect, tooltipRect, offset)

  return { x, y, placement, arrow }
}

function calculateArrowPosition(
  placement: 'top' | 'bottom' | 'left' | 'right',
  triggerRect: DOMRect,
  tooltipRect: { left: number; right: number; top: number; bottom: number },
  offset: number
) {
  const triggerCenterX = triggerRect.left + triggerRect.width / 2
  const triggerCenterY = triggerRect.top + triggerRect.height / 2

  switch (placement) {
    case 'right':
      return {
        x: tooltipRect.left - 6,
        y: Math.max(
          tooltipRect.top + 12,
          Math.min(triggerCenterY, tooltipRect.bottom - 12)
        ),
        side: 'left' as const
      }
    case 'left':
      return {
        x: tooltipRect.right + 6,
        y: Math.max(
          tooltipRect.top + 12,
          Math.min(triggerCenterY, tooltipRect.bottom - 12)
        ),
        side: 'right' as const
      }
    case 'bottom':
      return {
        x: Math.max(
          tooltipRect.left + 12,
          Math.min(triggerCenterX, tooltipRect.right - 12)
        ),
        y: tooltipRect.top - 6,
        side: 'top' as const
      }
    case 'top':
      return {
        x: Math.max(
          tooltipRect.left + 12,
          Math.min(triggerCenterX, tooltipRect.right - 12)
        ),
        y: tooltipRect.bottom + 6,
        side: 'bottom' as const
      }
  }
}