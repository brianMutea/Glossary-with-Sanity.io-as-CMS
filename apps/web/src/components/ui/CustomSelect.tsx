'use client'

import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
  disabled = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  // Find the selected option
  const selectedOption = options.find(option => option.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          )
          break
        case 'Enter':
          event.preventDefault()
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value)
            setIsOpen(false)
            setHighlightedIndex(-1)
          }
          break
        case 'Escape':
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, highlightedIndex, options, onChange])

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        })
      }
    }
  }, [highlightedIndex, isOpen])

  const handleToggle = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Set highlighted index to current selection when opening
      const currentIndex = options.findIndex(option => option.value === value)
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
    }
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Select Button */}
      <div
        ref={selectRef}
        className={`
          relative w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer
          transition-all duration-200 ease-in-out
          ${isOpen ? 'border-transparent ring-2 ring-blue-500' : 'hover:border-gray-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
          focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500
        `}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${label}-label` : undefined}
      >
        {/* Selected Value */}
        <div className="flex items-center justify-between">
          <span className={`block truncate text-sm ${
            selectedOption ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          {/* Arrow Icon */}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            ref={optionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto left-0 right-0"
            style={{ top: '100%' }}
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150
                  ${highlightedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  ${option.value === value ? 'bg-blue-100 text-blue-800 font-medium' : ''}
                  hover:bg-blue-50 hover:text-blue-700
                  first:rounded-t-lg last:rounded-b-lg
                `}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={option.value === value}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{option.label}</span>
                  {option.value === value && (
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}