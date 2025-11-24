'use client'

import Link from 'next/link'
import { GlobalSearchBar } from './GlobalSearchBar'

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
  searchPlaceholder = "Search everything...",
  className = "",
  showMenuButton = true,
  containerClassName = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
}: HeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-30 ${className}`}>
      <div className="h-16">
        <div className={`${containerClassName} h-full flex items-center`}>
          {/* Mobile menu button */}
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mr-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Logo - only visible on mobile when sidebar is present */}
          {showMenuButton && (
            <Link href="/" className="lg:hidden flex items-center">
              <span className="text-xl font-bold text-blue-600">
                Tech Glossary
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
                <span className="text-xl font-bold text-blue-600">
                  Tech Glossary
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}