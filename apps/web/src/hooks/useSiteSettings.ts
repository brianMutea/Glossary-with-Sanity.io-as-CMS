'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'

interface SiteSettings {
  _id: string
  title: string
  tagline: string
  logo?: {
    type: 'text' | 'image' | 'svg'
    textLogo?: {
      text: string
      fontSize?: string
      fontWeight?: string
      color?: {
        hex: string
      }
    }
    imageLogo?: {
      image: {
        asset: {
          _id: string
          url: string
        }
        alt: string
      }
      width?: number
      height?: number
    }
    svgLogo?: {
      svgCode: string
      width?: number
      height?: number
    }
    linkUrl?: string
  }
  favicon?: {
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    appleTouchIcon?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  primaryColor?: {
    hex: string
  }
  accentColor?: {
    hex: string
  }
}

// Default fallback settings
const defaultSiteSettings: SiteSettings = {
  _id: 'default',
  title: 'Tech Glossary',
  tagline: 'Your go-to resource for code tutorials and technical articles',
  logo: {
    type: 'text',
    textLogo: {
      text: 'Tech Glossary',
      fontSize: 'text-xl',
      fontWeight: 'font-bold',
      color: { hex: '#FFD700' }
    }
  }
}

export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSiteSettings = async () => {
    try {
      setLoading(true)
      
      // Fetch via our API route instead of direct Sanity client
      const response = await fetch('/api/get-site-settings')
      
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          setSiteSettings(result.data)
          setError(null)
        } else {
          setSiteSettings(defaultSiteSettings)
          setError('No site settings found - using defaults')
        }
      } else {
        throw new Error(`API responded with ${response.status}`)
      }
    } catch (err) {
      console.error('Error fetching site settings via API:', err)
      // Fallback to defaults
      setSiteSettings(defaultSiteSettings)
      setError('Using default settings - API fetch failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSiteSettings()
  }, [])

  const refresh = () => {
    fetchSiteSettings()
  }

  return { siteSettings, loading, error, refresh }
}