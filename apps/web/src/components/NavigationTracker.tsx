'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Store the current valid path in sessionStorage
    // This will be used by the 404 page to navigate back
    if (typeof window !== 'undefined' && pathname !== '/not-found') {
      sessionStorage.setItem('lastValidPath', pathname)
    }
  }, [pathname])

  return null // This component doesn't render anything
}