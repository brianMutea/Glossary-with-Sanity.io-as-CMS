import React, { useState, useEffect, useCallback } from 'react'
import { StringInputProps, set, unset, useClient } from 'sanity'

export function DomainInput(props: StringInputProps) {
    const { onChange, value = '', validation } = props
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [loading, setLoading] = useState(false)
    const client = useClient({ apiVersion: '2023-01-01' })

    const staticSuggestions = [
        'artificial-intelligence',
        'machine-learning', 
        'data-science',
        'software-engineering',
        'mathematics',
        'statistics',
        'deep-learning',
        'computer-vision',
        'natural-language-processing'
    ]

    // Fetch dynamic suggestions from Sanity
    const fetchSuggestions = useCallback(async () => {
        setLoading(true)
        try {
            const query = `*[_type == "glossaryTerm" && defined(domain)] { domain }`
            const results = await client.fetch(query)

            // Extract unique values and normalize them
            const uniqueValues = [...new Set(
                results
                    .map((item: any) => item.domain)
                    .filter((val: any) => typeof val === 'string' && val.trim().length > 0)
                    .map((val: string) => val.trim().toLowerCase())
            )].sort()

            // Combine with static suggestions
            const allSuggestions = [...new Set([...staticSuggestions, ...uniqueValues])].sort()
            setSuggestions(allSuggestions as string[])
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setSuggestions(staticSuggestions)
        } finally {
            setLoading(false)
        }
    }, [client])

    useEffect(() => {
        fetchSuggestions()
    }, [fetchSuggestions])

    // Filter suggestions based on current input
    useEffect(() => {
        if (!value) {
            setFilteredSuggestions(suggestions.slice(0, 10))
            return
        }

        const filtered = suggestions
            .filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase()) ||
                // Check for abbreviation matches
                (suggestion === 'machine-learning' && value.toLowerCase().includes('ml')) ||
                (suggestion === 'artificial-intelligence' && value.toLowerCase().includes('ai')) ||
                (suggestion === 'natural-language-processing' && value.toLowerCase().includes('nlp')) ||
                (suggestion === 'computer-vision' && value.toLowerCase().includes('cv'))
            )
            .slice(0, 10)

        setFilteredSuggestions(filtered)
    }, [value, suggestions])

    // Normalize input to prevent duplicates
    const normalizeValue = (inputValue: string): string => {
        const normalized = inputValue.trim().toLowerCase().replace(/\s+/g, '-')

        // Check if there's an existing similar value
        const existingSimilar = suggestions.find(suggestion => {
            if (suggestion === normalized) return true

            return (
                (suggestion === 'machine-learning' && (normalized === 'ml' || normalized === 'machinelearning')) ||
                (suggestion === 'artificial-intelligence' && (normalized === 'ai' || normalized === 'artificialintelligence')) ||
                (suggestion === 'natural-language-processing' && (normalized === 'nlp' || normalized === 'naturallanguageprocessing')) ||
                (suggestion === 'computer-vision' && (normalized === 'cv' || normalized === 'computervision')) ||
                (suggestion === 'data-science' && (normalized === 'datascience' || normalized === 'ds'))
            )
        })

        return existingSimilar || normalized
    }

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value

        if (!inputValue) {
            onChange(unset())
            return
        }

        onChange(set(inputValue))
    }, [onChange])

    const handleInputBlur = useCallback(() => {
        if (value) {
            const normalizedValue = normalizeValue(value)
            if (normalizedValue !== value) {
                onChange(set(normalizedValue))
            }
        }

        setTimeout(() => setShowSuggestions(false), 200)
    }, [value, onChange, normalizeValue])

    const handleSuggestionClick = useCallback((suggestion: string) => {
        onChange(set(suggestion))
        setShowSuggestions(false)
    }, [onChange])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Type to search or add new domain..."
                    value={value}
                    onChange={handleInputChange}

                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--card-border-color, #3a3a3a)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        color: 'var(--card-fg-color, #e5e5e5)',
                        backgroundColor: 'var(--card-bg-color, #2a2a2a)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--card-focus-ring-color, #4f9eff)'
                        e.target.style.boxShadow = '0 0 0 2px var(--card-focus-ring-color, rgba(79, 158, 255, 0.2))'
                        setShowSuggestions(true)
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'var(--card-border-color, #3a3a3a)'
                        e.target.style.boxShadow = 'none'
                        handleInputBlur()
                    }}
                />

                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            maxHeight: '200px',
                            overflowY: 'auto',
                            backgroundColor: 'var(--card-bg-color, #2a2a2a)',
                            border: '1px solid var(--card-border-color, #3a3a3a)',
                            borderTop: 'none',
                            borderRadius: '0 0 6px 6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            fontFamily: 'inherit'
                        }}
                    >
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '10px 12px',
                                    cursor: 'pointer',
                                    borderBottom: index < filteredSuggestions.length - 1 ? '1px solid var(--card-border-color, #3a3a3a)' : 'none',
                                    fontSize: '14px',
                                    color: 'var(--card-fg-color, #e5e5e5)',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.2s ease'
                                }}
                                onMouseDown={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--card-hover-bg-color, rgba(255, 255, 255, 0.1))'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {validation && validation.length > 0 && (
                <div style={{ paddingTop: '4px' }}>
                    {validation.map((item, index) => (
                        <div key={index} style={{ fontSize: '12px', color: 'var(--card-critical-fg-color, #ff6b6b)' }}>
                            {item.message}
                        </div>
                    ))}
                </div>
            )}

            <div style={{ fontSize: '12px', color: 'var(--card-muted-fg-color, #999)' }}>
                Start typing to see suggestions from existing domains, or type a new value.
                Similar values will be automatically normalized (e.g., "ML" → "machine-learning").
                {loading && ' (Loading suggestions...)'}
            </div>
        </div>
    )
}