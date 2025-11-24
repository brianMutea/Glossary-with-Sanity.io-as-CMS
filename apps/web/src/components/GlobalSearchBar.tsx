'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SearchResult } from '@/app/api/search/route'

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
    }, 300)

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
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="
            block w-full pl-9 pr-10 py-2 
            border border-gray-300 rounded-lg 
            bg-white placeholder-gray-500 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
          "
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0
                    ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}
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
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {typeLabels[result.type]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.description}
                      </p>
                      {result.metadata && (
                        <div className="flex items-center space-x-2 mt-1">
                          {result.metadata.level && (
                            <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {result.metadata.level}
                            </span>
                          )}
                          {result.metadata.domain && (
                            <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                              {result.metadata.domain}
                            </span>
                          )}
                          {result.metadata.author && (
                            <span className="text-xs text-gray-500">
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
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{query}" →
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords or check spelling</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}