'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  alwaysVisible?: boolean
}

export function Sidebar({ isOpen, onClose, alwaysVisible = false }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Glossary', href: '/' },
    { name: 'Knowledge Graph', href: '/knowledge-graph' },
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'Blog', href: '/blog' },
    { name: 'Series', href: '/series' },
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
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-900 z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${alwaysVisible ? 'translate-x-0' : 'lg:translate-x-0'}
      `}>
        {/* Logo/Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3" onClick={onClose}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Tech Glossary</h1>
              <p className="text-xs text-gray-400">Developer Resources</p>
            </div>
          </Link>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${active 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <div className="text-xs text-gray-400 text-center">
            <p>&copy; 2024 Tech Glossary</p>
            <p className="mt-1">Built with Next.js</p>
          </div>
        </div>
      </div>
    </>
  )
}