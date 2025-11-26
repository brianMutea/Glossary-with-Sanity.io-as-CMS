'use client'

import Link from 'next/link'
import { GlobalSearchBar } from './GlobalSearchBar'
import { DonateButton } from './DonateButton'

interface HeaderProps {
  onMenuToggle: () => void
  showSearch?: boolean
  searchPlaceholder?: string
  className?: string
  showMenuButton?: boolean
  containerClassName?: string
}

export function Header({
  onMenuToggle,
  showSearch = false,
  searchPlaceholder = "Search glossify...",
  className = "",
  showMenuButton = true,
  containerClassName = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
}: HeaderProps) {
  return (
    <header className={`bg-[#0F0F0F] border-b border-[#00BFFF]/10 sticky top-0 z-30 relative ${className}`}>
      <div className="h-16">
        <div className={`${containerClassName} h-full flex items-center`}>
          {/* Mobile menu button */}
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded text-[#E0E0E0] hover:text-[#00BFFF] hover:bg-[#333333] transition-colors mr-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Logo - only visible on mobile when sidebar is present */}
          {showMenuButton && (
            <Link href="/" className="lg:hidden flex items-center">
              <span className="text-xl font-bold text-[#FFD700]">
                {/* Glossify */}
              </span>
            </Link>
          )}

          {/* Global Search Bar - aligned with content */}
          {showSearch && (
            <div className="flex-1 lg:flex-none lg:w-full">
              <GlobalSearchBar
                placeholder={searchPlaceholder}
                className="max-w-2xl"
              />
            </div>
          )}

          {/* Spacer for pages without search */}
          {!showSearch && !showMenuButton && (
            <div className="flex-1">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-[#FFD700]">
                  Glossify
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Donate Button - positioned at content edge */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2">
          <DonateButton />
        </div>
      </div>
    </header>
  )
}