'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface HeroButton {
  text: string
  url: string
  style: 'primary' | 'secondary' | 'ghost'
  openInNewTab?: boolean
}

interface HeroImage {
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

interface HeroSectionProps {
  heroData?: {
    enabled?: boolean
    headline?: string
    subheadline?: string
    ctaButtons?: HeroButton[]
    heroImage?: HeroImage
    backgroundColor?: { hex: string }
    textColor?: { hex: string }
  }
}

export function HeroSection({ heroData }: HeroSectionProps) {
  // Don't render if explicitly disabled
  if (heroData?.enabled === false) {
    return null
  }

  // Use defaults if no hero data provided
  const defaultHeroData = {
    enabled: true,
    headline: 'Glossifyd is a project built on Sanity.io and Next JS',
    subheadline: 'Glossifyd on Sanity.io',
    ctaButtons: [
      {
        text: 'Explore Glossary',
        url: '/glossary',
        style: 'primary' as const,
        openInNewTab: false
      }
    ],
    heroImage: {
      type: 'code' as const,
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

  const finalHeroData = heroData || defaultHeroData

  const backgroundColor = finalHeroData.backgroundColor?.hex || '#1a1a1a'
  const textColor = finalHeroData.textColor?.hex || '#ffffff'

  const getButtonClasses = (style: string) => {
    switch (style) {
      case 'primary':
        return 'bg-[#39FF14] text-black hover:bg-[#32E612] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-center min-w-[140px]'
      case 'secondary':
        return 'border-2 border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 text-center min-w-[140px]'
      case 'ghost':
        return 'text-[#39FF14] hover:text-[#32E612] font-semibold px-6 sm:px-8 py-3 sm:py-4 underline hover:no-underline transition-all duration-200 text-center min-w-[140px]'
      default:
        return 'bg-[#39FF14] text-black hover:bg-[#32E612] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 text-center min-w-[140px]'
    }
  }

  const renderHeroImage = () => {
    if (!finalHeroData.heroImage) return null

    switch (finalHeroData.heroImage.type) {
      case 'image':
        if (!finalHeroData.heroImage.image) return null
        return (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={urlFor(finalHeroData.heroImage.image).width(800).height(450).url()}
              alt={finalHeroData.heroImage.image.alt || 'Hero image'}
              fill
              className="object-contain"
              priority
            />
          </div>
        )

      case 'code':
        if (!finalHeroData.heroImage.codeSnippet) return null
        return (
          <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-[#333333] overflow-hidden">
            {/* Code editor header */}
            <div className="bg-[#2d2d30] text-[#cccccc] px-4 py-3 text-sm font-mono border-b border-[#333333] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
                <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
              </div>
              <span className="text-xs bg-[#3c3c3c] text-[#cccccc] px-2 py-1 rounded font-medium uppercase">
                {finalHeroData.heroImage.codeSnippet.language}
              </span>
            </div>

            {/* Code content */}
            <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm leading-relaxed font-mono">
              <code>
                {finalHeroData.heroImage.codeSnippet.code}
              </code>
            </pre>
          </div>
        )

      case 'html':
        if (!finalHeroData.heroImage.customHtml) return null
        return (
          <div
            className="w-full aspect-video flex items-center justify-center rounded-lg overflow-hidden shadow-2xl"
            dangerouslySetInnerHTML={{ __html: finalHeroData.heroImage.customHtml }}
          />
        )

      default:
        return null
    }
  }

  return (
    <section
      className="relative py-12 sm:py-16 lg:py-24"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Main Headline */}
            {finalHeroData.headline && (
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: finalHeroData.headline }}
              />
            )}

            {/* Subheadline */}
            {finalHeroData.subheadline && (
              <p
                className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto lg:mx-0"
                style={{ color: textColor }}
              >
                {finalHeroData.subheadline}
              </p>
            )}

            {/* CTA Buttons */}
            {finalHeroData.ctaButtons && finalHeroData.ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                {finalHeroData.ctaButtons.map((button, index) => {
                  const isExternal = button.url.startsWith('http')
                  const ButtonComponent = isExternal ? 'a' : Link

                  const buttonProps = isExternal
                    ? {
                      href: button.url,
                      target: button.openInNewTab ? '_blank' : undefined,
                      rel: button.openInNewTab ? 'noopener noreferrer' : undefined
                    }
                    : { href: button.url }

                  return (
                    <ButtonComponent
                      key={index}
                      {...buttonProps}
                      className={getButtonClasses(button.style)}
                    >
                      {button.text}
                    </ButtonComponent>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column - Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="w-full max-w-lg mx-auto lg:max-w-none">
              {renderHeroImage()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}