'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface LogoData {
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

interface DynamicLogoProps {
  logoData?: LogoData
  variant?: 'sidebar' | 'footer' | 'header'
  className?: string
  onClick?: () => void
}

export function DynamicLogo({ 
  logoData, 
  variant = 'sidebar', 
  className = '',
  onClick 
}: DynamicLogoProps) {
  // Fallback logo if no data is provided
  const fallbackLogo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-[#00BFFF] rounded flex items-center justify-center">
        <span className="text-white font-bold text-xl">T</span>
      </div>
      <div>
        <h1 className="text-xl font-bold text-[#FFD700]">Tech Glossary</h1>
        <p className="text-sm text-[#E0E0E0]">Developer Resources</p>
      </div>
    </div>
  )

  if (!logoData) {
    const linkUrl = '/'
    return (
      <Link href={linkUrl} className={`flex items-center ${className}`} onClick={onClick}>
        {fallbackLogo}
      </Link>
    )
  }

  const linkUrl = logoData.linkUrl || '/'

  const renderLogo = () => {
    switch (logoData.type) {
      case 'text':
        if (!logoData.textLogo) return fallbackLogo
        
        const textColor = logoData.textLogo.color?.hex || '#FFD700'
        const fontSize = logoData.textLogo.fontSize || 'text-xl'
        const fontWeight = logoData.textLogo.fontWeight || 'font-bold'
        
        return (
          <div className="flex items-center">
            <span 
              className={`${fontSize} ${fontWeight}`}
              style={{ color: textColor }}
            >
              {logoData.textLogo.text}
            </span>
          </div>
        )

      case 'image':
        if (!logoData.imageLogo?.image) return fallbackLogo
        
        const imageWidth = logoData.imageLogo.width || 120
        const imageHeight = logoData.imageLogo.height || 40
        
        return (
          <div className="flex items-center">
            <Image
              src={urlFor(logoData.imageLogo.image).url()}
              alt={logoData.imageLogo.image.alt || 'Logo'}
              width={imageWidth}
              height={imageHeight}
              className="object-contain"
              priority
            />
          </div>
        )

      case 'svg':
        if (!logoData.svgLogo?.svgCode) return fallbackLogo
        
        const svgWidth = logoData.svgLogo.width || 120
        const svgHeight = logoData.svgLogo.height || 40
        
        return (
          <div 
            className="flex items-center"
            style={{ width: svgWidth, height: svgHeight }}
            dangerouslySetInnerHTML={{ __html: logoData.svgLogo.svgCode }}
          />
        )

      default:
        return fallbackLogo
    }
  }

  // Apply variant-specific styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'sidebar':
        return 'flex items-center space-x-3'
      case 'footer':
        return 'flex items-center'
      case 'header':
        return 'flex items-center'
      default:
        return 'flex items-center'
    }
  }

  return (
    <Link 
      href={linkUrl} 
      className={`${getVariantClasses()} ${className}`} 
      onClick={onClick}
    >
      {renderLogo()}
    </Link>
  )
}