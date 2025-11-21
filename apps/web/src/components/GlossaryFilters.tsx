'use client'

import { useState, useEffect } from 'react'

interface GlossaryFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string
    level: string
    domain: string
    type: string
  }) => void
  availableDomains?: string[]
  availableTypes?: string[]
  availableLevels?: string[]
}

export function GlossaryFilters({ 
  onFiltersChange, 
  availableDomains = [], 
  availableTypes = [], 
  availableLevels = ['beginner', 'intermediate', 'advanced'] 
}: GlossaryFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({
        searchTerm,
        level: selectedLevel,
        domain: selectedDomain,
        type: selectedType,
      })
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm, selectedLevel, selectedDomain, selectedType]) // Removed onFiltersChange from deps

  const handleClearAll = () => {
    setSearchTerm('')
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
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search terms, definitions, or concepts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Level Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Domain Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Domain:</label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {domains.map((domain) => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={handleClearAll}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedLevel !== 'all' || selectedDomain !== 'all' || selectedType !== 'all') && (
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {searchTerm && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Search: "{searchTerm}"
            </span>
          )}
          
          {selectedLevel !== 'all' && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Level: {levels.find(l => l.value === selectedLevel)?.label}
            </span>
          )}
          
          {selectedDomain !== 'all' && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Domain: {domains.find(d => d.value === selectedDomain)?.label}
            </span>
          )}
          
          {selectedType !== 'all' && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Type: {types.find(t => t.value === selectedType)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}