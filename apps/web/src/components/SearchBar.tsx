'use client'

import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ 
  onSearchChange, 
  placeholder = "Search terms, definitions, or concepts...",
  className = ""
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm, onSearchChange])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          block w-full pl-9 pr-3 py-2 
          border border-gray-300 rounded-lg 
          bg-white placeholder-gray-500 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
        "
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}