'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
  heroSection?: {
    enabled?: boolean
    headline?: string
    subheadline?: string
    ctaButtons?: Array<{
      text: string
      url: string
      style: 'primary' | 'secondary' | 'ghost'
      openInNewTab?: boolean
    }>
    heroImage?: {
      type: 'image' | 'code' | 'html'
      image?: {
        asset: {
          _id: string
          url: string
        }
        alt: string
      }
      codeSnippet?: {
        language: string
        code: string
      }
      customHtml?: string
    }
    backgroundColor?: { hex: string }
    textColor?: { hex: string }
  }
}

// Default fallback settings
const defaultSiteSettings: SiteSettings = {
  _id: 'default',
  title: 'Glossifyd',
  tagline: 'Your go-to resource for code tutorials and technical articles',
  logo: {
    type: 'text',
    textLogo: {
      text: 'Glossifyd',
      fontSize: 'text-xl',
      fontWeight: 'font-bold',
      color: { hex: '#FFD700' }
    }
  },
  heroSection: {
    enabled: true,
    headline: 'The best place to build, test, and discover front-end code.',
    subheadline: 'Glossifyd is a comprehensive resource for front-end developers. Build and deploy websites, showcase your work, learn new concepts, and find inspiration.',
    ctaButtons: [
      {
        text: 'Explore Glossary',
        url: '/glossary',
        style: 'primary'
      }
    ],
    heroImage: {
      type: 'code',
      codeSnippet: {
        language: 'html',
        code: `<div class="rect"></div>

.rect {
  background: linear-gradient(
    -119deg,
    $gray 0%,
    $dark-gray 100%
  );
}

var colors = [
  "#748007", "#7E7300", "#748007"
];`
      }
    },
    backgroundColor: { hex: '#1a1a1a' },
    textColor: { hex: '#ffffff' }
  }
}

interface SiteSettingsContextType {
  siteSettings: SiteSettings
  loading: boolean
  error: string | null
  refresh: () => void
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

interface SiteSettingsProviderProps {
  children: ReactNode
  initialSettings?: SiteSettings | null
}

export function SiteSettingsProvider({ children, initialSettings }: SiteSettingsProviderProps) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(
    initialSettings || defaultSiteSettings
  )
  const [loading, setLoading] = useState(!initialSettings)
  const [error, setError] = useState<string | null>(null)

  const fetchSiteSettings = async () => {
    try {
      setLoading(true)
      
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
      setSiteSettings(defaultSiteSettings)
      setError('Using default settings - API fetch failed')
    } finally {
      setLoading(false)
    }
  }

  // Only fetch if we don't have initial settings
  useEffect(() => {
    if (!initialSettings) {
      fetchSiteSettings()
    }
  }, [initialSettings])

  const refresh = () => {
    fetchSiteSettings()
  }

  const value = {
    siteSettings,
    loading,
    error,
    refresh
  }

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}