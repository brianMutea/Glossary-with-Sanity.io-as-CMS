'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SearchResult } from '@/app/api/search/route'
import { Badge } from './ui/Badge'
import { getComponentClasses } from '@/lib/theme'
import { combineClasses } from '@/lib/colorUtils'
import { COLORS, API, Z_INDEX } from '@/lib/constants'

interface GlobalSearchBarProps {
  placeholder?: string
  className?: string
}

const typeLabels = {
  glossary: 'Glossary Term',
  blog: 'Tutorial',
  series: 'Series',
  learningPath: 'Learning Path',
  author: 'Author',
}

const typeIcons = {
  glossary: '📖',
  blog: '📝',
  series: '📚',
  learningPath: '🎯',
  author: '👤',
}

export function GlobalSearchBar({ 
  placeholder = "Search everything...",
  className = ""
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setIsOpen(data.results?.length > 0)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, API.searchDebounceMs)

    return () => clearTimeout(timer)
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, results])

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
    router.push(result.url)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-[#E0E0E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={combineClasses(
            getComponentClasses('input', 'default'),
            getComponentClasses('input', undefined, undefined, 'focus'),
            'pl-9 pr-10'
          )}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#E0E0E0] hover:text-[#00BFFF]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-[#00BFFF] border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className={combineClasses(
          'absolute top-full left-0 right-0 mt-1',
          `bg-[${COLORS.background.card}] border border-[${COLORS.border.primary}]`,
          'rounded-lg shadow-lg max-h-96 overflow-y-auto',
          `z-[${Z_INDEX.dropdown}]`
        )}>
          {results.length > 0 ? (
            <>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    px-4 py-3 cursor-pointer border-b border-[#333333] last:border-b-0
                    ${index === selectedIndex ? 'bg-[#00BFFF] bg-opacity-20' : 'hover:bg-[#333333]'}
                    transition-colors duration-150
                  `}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {typeIcons[result.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-[#FFFFFF] truncate">
                          {result.title}
                        </h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#333333] text-[#E0E0E0]">
                          {typeLabels[result.type]}
                        </span>
                      </div>
                      <p className="text-sm text-[#E0E0E0] line-clamp-2">
                        {result.description}
                      </p>
                      {result.metadata && (
                        <div className="flex items-center space-x-2 mt-1">
                          {result.metadata.level && (
                            <Badge variant="level" value={result.metadata.level} size="xs">
                              {result.metadata.level}
                            </Badge>
                          )}
                          {result.metadata.domain && (
                            <Badge variant="domain" value={result.metadata.domain} size="xs">
                              {result.metadata.domain}
                            </Badge>
                          )}
                          {result.type && (
                            <Badge variant="type" size="xs">
                              {result.type}
                            </Badge>
                          )}
                          {result.metadata.author && (
                            <span className="text-xs text-[#E0E0E0]">
                              by {result.metadata.author}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* View All Results Link */}
              <div className="px-4 py-3 border-t border-[#333333] bg-[#333333]">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-sm text-[#00BFFF] hover:text-[#FFD700] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{query}" →
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-[#E0E0E0]">
              <svg className="mx-auto h-12 w-12 text-[#E0E0E0] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-[#E0E0E0] mt-1">Try different keywords or check spelling</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}