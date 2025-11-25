'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DynamicLogo } from './DynamicLogo'
import { useSiteSettings } from '@/hooks/useSiteSettings'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  alwaysVisible?: boolean
}

export function Sidebar({ isOpen, onClose, alwaysVisible = false }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { siteSettings, loading } = useSiteSettings()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Glossary', href: '/' },
    { name: 'Knowledge Graph', href: '/knowledge-graph' },
    { name: 'Blog', href: '/blog' },
    { name: 'Series', href: '/series' },
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'Authors', href: '/authors' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-[218px] z-50 flex flex-col
        bg-[#1A1A1A] shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${alwaysVisible ? 'translate-x-0' : 'lg:translate-x-0'}
      `}>
        {/* Logo/Brand */}
        <div className="flex items-center justify-between p-6 flex-shrink-0">
          <DynamicLogo
            logoData={siteSettings?.logo}
            variant="sidebar"
            onClick={onClose}
          />

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#222222] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg mx-2
                  ${active
                    ? 'text-[#00BFFF] bg-[#00BFFF]/10 border-l-3 border-[#00BFFF]'
                    : 'text-[#E0E0E0] hover:text-[#00BFFF] hover:bg-[#222222]'
                  }
                `}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 flex-shrink-0">
          <div className="text-sm text-[#E0E0E0] text-center">
            {/* <p>&copy; 2024 Glossifyd</p> */}
            {/* <p className="mt-1 text-[#39FF14]">Built with by:</p> */}
          </div>
        </div>
      </div>
    </>
  )
}