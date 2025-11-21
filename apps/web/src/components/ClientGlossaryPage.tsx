'use client'

import { useState, useMemo } from 'react'
import { GlossaryCard } from '@/components/GlossaryCard'
import { GlossaryFilters } from '@/components/GlossaryFilters'
import { getDynamicOptions } from '@/lib/dynamicColors'

interface ClientGlossaryPageProps {
  initialTerms: any[]
}

export function ClientGlossaryPage({ initialTerms }: ClientGlossaryPageProps) {
  const [filters, setFilters] = useState({
    searchTerm: '',
    level: 'all',
    domain: 'all',
    type: 'all',
  })

  // Client-side filtering
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((term) => {
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          term.term.toLowerCase().includes(searchLower) ||
          term.shortDefinition.toLowerCase().includes(searchLower) ||
          term.domain.toLowerCase().includes(searchLower) ||
          term.type.toLowerCase().includes(searchLower) ||
          (term.tags && term.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
        
        if (!matchesSearch) return false
      }

      // Level filter
      if (filters.level !== 'all' && term.level !== filters.level) {
        return false
      }

      // Domain filter
      if (filters.domain !== 'all' && term.domain !== filters.domain) {
        return false
      }

      // Type filter
      if (filters.type !== 'all' && term.type !== filters.type) {
        return false
      }

      return true
    })
  }, [initialTerms, filters])

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  // Get dynamic options from the data
  const { domains, types, levels } = useMemo(() => getDynamicOptions(initialTerms), [initialTerms])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI & ML Glossary
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Explore our comprehensive collection of AI, Machine Learning, and Data Science concepts. 
              Each term includes definitions, examples, and connections to help you build knowledge systematically.
            </p>
            
            {/* Knowledge Graph CTA */}
            <div className="flex justify-center">
              <a
                href="/knowledge-graph"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Knowledge Graph
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{initialTerms.length}</div>
              <div className="text-sm text-gray-600">Total Terms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {initialTerms.filter((t: any) => t.level === 'beginner').length}
              </div>
              <div className="text-sm text-gray-600">Beginner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {initialTerms.filter((t: any) => t.level === 'intermediate').length}
              </div>
              <div className="text-sm text-gray-600">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {initialTerms.filter((t: any) => t.level === 'advanced').length}
              </div>
              <div className="text-sm text-gray-600">Advanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlossaryFilters 
            onFiltersChange={handleFiltersChange}
            availableDomains={domains}
            availableTypes={types}
            availableLevels={levels}
          />
        </div>
      </section>

      {/* Terms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTerms.length > 0 ? (
            <>
              {/* Results count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
                  {(filters.searchTerm || filters.level !== 'all' || filters.domain !== 'all' || filters.type !== 'all') && (
                    <span className="ml-2 text-blue-600">
                      (filtered from {initialTerms.length} total)
                    </span>
                  )}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTerms.map((term: any) => (
                  <GlossaryCard key={term._id} term={term} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {initialTerms.length === 0 ? '🧠' : '🔍'}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {initialTerms.length === 0 
                  ? 'No terms yet'
                  : 'No terms match your filters'
                }
              </h3>
              <p className="text-gray-600">
                {initialTerms.length === 0 
                  ? 'Glossary terms will appear here once they\'re created in the Studio.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}