'use client'

import { useState, useMemo, useEffect } from 'react'
import { CompactTermCard } from './CompactTermCard'
import { GlossaryModal } from './GlossaryModal'
import { getDynamicOptions, formatDisplayName } from '@/lib/dynamicColors'
import { useTooltipHover } from '@/hooks/useTooltipHover'
import { CustomSelect } from './ui/CustomSelect'

interface GlossaryLandingProps {
  terms: Array<{
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: 'beginner' | 'intermediate' | 'advanced'
    domain: string
    type: string
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    tags?: string[]
    relatedCount?: number
    tutorialArticle?: {
      title: string
      slug: { current: string }
    }
  }>
}

export function GlossaryLanding({ terms }: GlossaryLandingProps) {
  const [hoveredTerm, setHoveredTerm] = useState<any>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Use robust tooltip hover management
  const tooltip = useTooltipHover({
    showDelay: 300,
    hideDelay: 150,
    onShow: (term, rect) => {
      setHoveredTerm(term)
      setTriggerRect(rect)
    },
    onHide: () => {
      setHoveredTerm(null)
      setTriggerRect(null)
    }
  })
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterDomain, setFilterDomain] = useState('all')
  const [filterType, setFilterType] = useState('all')

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll to hide tooltip
  useEffect(() => {
    const handleScroll = () => {
      if (tooltip.isVisible) {
        tooltip.forceHide()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tooltip])

  // Listen for global search events
  useEffect(() => {
    const handleGlobalSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail)
    }

    window.addEventListener('globalSearch', handleGlobalSearch as EventListener)
    return () => window.removeEventListener('globalSearch', handleGlobalSearch as EventListener)
  }, [])

  // Get dynamic options for filters
  const { domains, types, levels } = useMemo(() => getDynamicOptions(terms), [terms])

  // Filter terms based on search and filters
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch = 
          term.term.toLowerCase().includes(searchLower) ||
          term.shortDefinition.toLowerCase().includes(searchLower) ||
          term.domain.toLowerCase().includes(searchLower) ||
          term.type.toLowerCase().includes(searchLower) ||
          (term.tags && term.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
        
        if (!matchesSearch) return false
      }

      // Level filter
      if (filterLevel !== 'all' && term.level !== filterLevel) {
        return false
      }

      // Domain filter
      if (filterDomain !== 'all' && term.domain !== filterDomain) {
        return false
      }

      // Type filter
      if (filterType !== 'all' && term.type !== filterType) {
        return false
      }

      return true
    })
  }, [terms, searchTerm, filterLevel, filterDomain, filterType])

  // Group filtered terms alphabetically
  const groupedTerms = useMemo(() => {
    const sorted = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term))
    const groups: Record<string, typeof terms> = {}
    
    sorted.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })
    
    return groups
  }, [filteredTerms])

  const handleHover = (term: any, rect: DOMRect) => {
    if (isMobile) return
    tooltip.handleTriggerEnter(term, rect)
  }

  const handleHoverEnd = () => {
    if (isMobile) return
    tooltip.handleTriggerLeave()
  }

  const handleTap = (term: any) => {
    if (isMobile) {
      setSelectedTerm(term)
    } else {
      // On desktop, clicking goes to the term page
      window.location.href = `/glossary/${term.slug.current}`
    }
  }

  const handleModalClose = () => {
    setSelectedTerm(null)
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
              Tech Glossary
            </h1>
            <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto leading-relaxed">
              Discover and explore <span className="text-[#00BFFF] font-semibold">{terms.length}</span> technical concepts, definitions, and programming terms
              {(searchTerm || filterLevel !== 'all' || filterDomain !== 'all' || filterType !== 'all') && (
                <span className="text-[#39FF14] font-semibold"> ({filteredTerms.length} filtered)</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#1A1A1A] border border-[#333333] rounded p-8 space-y-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-[#FFD700]">Filter Terms</h3>
              </div>
              
              {/* Clear All Button */}
              {(filterLevel !== 'all' || filterDomain !== 'all' || filterType !== 'all') && (
                <button
                  onClick={() => {
                    setFilterLevel('all')
                    setFilterDomain('all')
                    setFilterType('all')
                  }}
                  className="px-4 py-2 text-sm bg-[#FFD700] text-[#121212] hover:bg-[#E6C200] font-bold rounded transition-all duration-200"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Level Filter */}
              <CustomSelect
                label="Difficulty Level"
                value={filterLevel}
                onChange={setFilterLevel}
                options={[
                  { value: 'all', label: 'All Levels' },
                  ...levels.map(level => ({
                    value: level,
                    label: level.charAt(0).toUpperCase() + level.slice(1)
                  }))
                ]}
                placeholder="Select difficulty level"
              />

              {/* Domain Filter */}
              <CustomSelect
                label="Domain"
                value={filterDomain}
                onChange={setFilterDomain}
                options={[
                  { value: 'all', label: 'All Domains' },
                  ...domains.map(domain => ({
                    value: domain,
                    label: formatDisplayName(domain)
                  }))
                ]}
                placeholder="Select domain"
              />

              {/* Type Filter */}
              <CustomSelect
                label="Concept Type"
                value={filterType}
                onChange={setFilterType}
                options={[
                  { value: 'all', label: 'All Types' },
                  ...types.map(type => ({
                    value: type,
                    label: formatDisplayName(type)
                  }))
                ]}
                placeholder="Select concept type"
              />
            </div>

            {/* Active Filters Display */}
            {(searchTerm || filterLevel !== 'all' || filterDomain !== 'all' || filterType !== 'all') && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Active filters:</span>
                  
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      "{searchTerm}"
                    </span>
                  )}
                  
                  {filterLevel !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {filterLevel.charAt(0).toUpperCase() + filterLevel.slice(1)}
                    </span>
                  )}
                  
                  {filterDomain !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {formatDisplayName(filterDomain)}
                    </span>
                  )}
                  
                  {filterType !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {formatDisplayName(filterType)}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {Object.keys(groupedTerms).length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-[#FFD700] mb-4">
              No terms match your filters
            </h3>
            <p className="text-[#E0E0E0] mb-8 text-xl">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterLevel('all')
                setFilterDomain('all')
                setFilterType('all')
              }}
              className="px-8 py-3 bg-[#FFD700] text-[#121212] font-bold rounded hover:bg-[#E6C200] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          Object.entries(groupedTerms).map(([letter, letterTerms]: [string, any[]]) => (
            <div key={letter} className="mb-12">
              {/* Letter Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#00BFFF] text-white rounded flex items-center justify-center font-bold text-xl mr-4">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-[#333333]" />
                <span className="ml-4 text-sm text-[#E0E0E0]">
                  {letterTerms.length} term{letterTerms.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Terms Grid - Brick Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {letterTerms.map((term: any, index: number) => (
                  <div
                    key={term._id}
                    className={`${
                      // Brick-like offset pattern
                      Math.floor(index / 5) % 2 === 1 && index % 5 === 0 
                        ? 'sm:col-start-1 md:col-start-2 lg:col-start-2 xl:col-start-2' 
                        : ''
                    }`}
                  >
                    <CompactTermCard
                      term={term}
                      onHover={handleHover}
                      onHoverEnd={handleHoverEnd}
                      onTap={handleTap}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Modal */}
      <GlossaryModal
        term={hoveredTerm}
        variant="desktop"
        triggerRect={triggerRect}
        isVisible={tooltip.isVisible && !isMobile}
        onMouseEnter={tooltip.handleTooltipEnter}
        onMouseLeave={tooltip.handleTooltipLeave}
        onClose={tooltip.forceHide}
      />

      {/* Mobile Modal */}
      <GlossaryModal
        term={selectedTerm}
        variant="mobile"
        isVisible={!!selectedTerm && isMobile}
        onClose={handleModalClose}
      />
    </div>
  )
}