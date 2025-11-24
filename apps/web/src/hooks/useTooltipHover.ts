import { useCallback, useRef, useState } from 'react'

interface UseTooltipHoverOptions {
  showDelay?: number
  hideDelay?: number
  onShow?: (data: any, rect: DOMRect) => void
  onHide?: () => void
}

export function useTooltipHover(options: UseTooltipHoverOptions = {}) {
  const {
    showDelay = 300,
    hideDelay = 150,
    onShow,
    onHide
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false)
  
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentDataRef = useRef<any>(null)

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current)
      showTimeoutRef.current = null
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const handleTriggerEnter = useCallback((data: any, rect: DOMRect) => {
    clearTimeouts()
    currentDataRef.current = data

    // If already showing same item, don't delay
    const delay = isVisible && currentDataRef.current?._id === data._id ? 0 : showDelay

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      onShow?.(data, rect)
    }, delay)
  }, [isVisible, showDelay, onShow, clearTimeouts])

  const handleTriggerLeave = useCallback(() => {
    clearTimeouts()

    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringTooltip) {
        setIsVisible(false)
        onHide?.()
        currentDataRef.current = null
      }
    }, hideDelay)
  }, [isHoveringTooltip, hideDelay, onHide, clearTimeouts])

  const handleTooltipEnter = useCallback(() => {
    clearTimeouts()
    setIsHoveringTooltip(true)
  }, [clearTimeouts])

  const handleTooltipLeave = useCallback(() => {
    setIsHoveringTooltip(false)
    
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
      onHide?.()
      currentDataRef.current = null
    }, 100) // Quick hide when leaving tooltip
  }, [onHide])

  const forceHide = useCallback(() => {
    clearTimeouts()
    setIsVisible(false)
    setIsHoveringTooltip(false)
    onHide?.()
    currentDataRef.current = null
  }, [clearTimeouts, onHide])

  return {
    isVisible,
    currentData: currentDataRef.current,
    handleTriggerEnter,
    handleTriggerLeave,
    handleTooltipEnter,
    handleTooltipLeave,
    forceHide
  }
}