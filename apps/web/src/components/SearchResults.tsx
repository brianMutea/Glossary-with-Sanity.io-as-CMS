'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SearchResult } from '@/app/api/search/route'

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

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setTotal(data.total || 0)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (!query) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search</h1>
        <p className="text-gray-600">Enter a search term to find content across the site.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600">
          {isLoading ? (
            'Searching...'
          ) : (
            `${total} result${total !== 1 ? 's' : ''} for "${query}"`
          )}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <span className="text-2xl flex-shrink-0 mt-1">
                  {typeIcons[result.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {result.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {typeLabels[result.type]}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {result.description}
                  </p>
                  {result.metadata && (
                    <div className="flex items-center space-x-3 text-sm">
                      {result.metadata.level && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {result.metadata.level}
                        </span>
                      )}
                      {result.metadata.domain && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700">
                          {result.metadata.domain}
                        </span>
                      )}
                      {result.metadata.author && (
                        <span className="text-gray-500">
                          by {result.metadata.author}
                        </span>
                      )}
                      {result.metadata.publishedAt && (
                        <span className="text-gray-500">
                          {new Date(result.metadata.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find anything matching "{query}". Try different keywords or check your spelling.
          </p>
          <div className="text-sm text-gray-500">
            <p className="mb-2">Search tips:</p>
            <ul className="space-y-1">
              <li>• Try more general terms</li>
              <li>• Check your spelling</li>
              <li>• Use different keywords</li>
              <li>• Try searching for related concepts</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}