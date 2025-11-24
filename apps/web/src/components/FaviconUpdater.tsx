'use client'

import { useEffect } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { urlFor } from '@/sanity/image'

export function FaviconUpdater() {
  const { siteSettings } = useSiteSettings()

  useEffect(() => {
    if (!siteSettings?.favicon?.image) return

    // Get the favicon URL
    const faviconUrl = urlFor(siteSettings.favicon.image).width(32).height(32).url()
    
    // Update or create favicon link
    let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    }
    faviconLink.href = faviconUrl

    // Update or create shortcut icon link
    let shortcutIconLink = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement
    if (!shortcutIconLink) {
      shortcutIconLink = document.createElement('link')
      shortcutIconLink.rel = 'shortcut icon'
      document.head.appendChild(shortcutIconLink)
    }
    shortcutIconLink.href = faviconUrl

    // Handle Apple Touch Icon if available
    if (siteSettings.favicon.appleTouchIcon) {
      const appleTouchIconUrl = urlFor(siteSettings.favicon.appleTouchIcon).width(180).height(180).url()
      
      let appleTouchIconLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement
      if (!appleTouchIconLink) {
        appleTouchIconLink = document.createElement('link')
        appleTouchIconLink.rel = 'apple-touch-icon'
        document.head.appendChild(appleTouchIconLink)
      }
      appleTouchIconLink.href = appleTouchIconUrl
    }

    // Update document title if available
    if (siteSettings.title) {
      document.title = siteSettings.title
    }

  }, [siteSettings])

  return null // This component doesn't render anything
}