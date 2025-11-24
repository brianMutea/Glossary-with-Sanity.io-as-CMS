'use client'

import { useState, useEffect } from 'react'

interface GlossaryFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string
    level: string
    domain: string
    type: string
  }) => void
  searchTerm?: string // Now comes from parent
  availableDomains?: string[]
  availableTypes?: string[]
  availableLevels?: string[]
}

export function GlossaryFilters({ 
  onFiltersChange, 
  searchTerm = '',
  availableDomains = [], 
  availableTypes = [], 
  availableLevels = ['beginner', 'intermediate', 'advanced'] 
}: GlossaryFiltersProps) {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Update filters when any value changes
  useEffect(() => {
    onFiltersChange({
      searchTerm,
      level: selectedLevel,
      domain: selectedDomain,
      type: selectedType,
    })
  }, [searchTerm, selectedLevel, selectedDomain, selectedType, onFiltersChange])

  const handleClearAll = () => {
    setSelectedLevel('all')
    setSelectedDomain('all')
    setSelectedType('all')
  }

  // Dynamic options based on actual data
  const levels = [
    { value: 'all', label: 'All Levels' },
    ...availableLevels.map(level => ({
      value: level,
      label: level.charAt(0).toUpperCase() + level.slice(1)
    }))
  ]

  const domains = [
    { value: 'all', label: 'All Domains' },
    ...availableDomains.map(domain => ({
      value: domain,
      label: domain.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }))
  ]

  const types = [
    { value: 'all', label: 'All Types' },
    ...availableTypes.map(type => ({
      value: type,
      label: type.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }))
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Filter Terms</h3>
        </div>
        
        {/* Clear All Button */}
        {(selectedLevel !== 'all' || selectedDomain !== 'all' || selectedType !== 'all') && (
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Level Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Domain Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Domain
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
          >
            {domains.map((domain) => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Concept Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedLevel !== 'all' || selectedDomain !== 'all' || selectedType !== 'all') && (
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
            
            {selectedLevel !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {levels.find(l => l.value === selectedLevel)?.label}
              </span>
            )}
            
            {selectedDomain !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {domains.find(d => d.value === selectedDomain)?.label}
              </span>
            )}
            
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-200">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {types.find(t => t.value === selectedType)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}