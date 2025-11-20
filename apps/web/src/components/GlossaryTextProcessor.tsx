'use client'

import { ReactNode, useMemo } from 'react'
import { GlossaryTooltip } from './GlossaryTooltip'

interface GlossaryTerm {
  _id: string
  term: string
  slug: { current: string }
  shortDefinition: string
  level?: string
  domain?: string
}

interface GlossaryTextProcessorProps {
  text: string
  glossaryTerms: GlossaryTerm[]
  className?: string
}

export function GlossaryTextProcessor({ 
  text, 
  glossaryTerms, 
  className 
}: GlossaryTextProcessorProps) {
  // Memoize the processed result to avoid re-computation
  const processedContent = useMemo(() => {
    // Early return if no text or no glossary terms
    if (!text || !glossaryTerms?.length) {
      return <span className={className}>{text}</span>
    }

    // Pre-filter terms that actually appear in this text
    const relevantTerms = glossaryTerms.filter(term => {
      if (!term.term || !term.slug?.current || !term.shortDefinition) return false
      
      // Quick case-insensitive check before regex
      const lowerText = text.toLowerCase()
      const lowerTerm = term.term.toLowerCase()
      
      if (!lowerText.includes(lowerTerm)) return false
      
      // Confirm with word boundary regex
      const escapedTerm = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const termRegex = new RegExp(`\\b${escapedTerm}\\b`, 'gi')
      return termRegex.test(text)
    })

    // If no relevant terms, return original text
    if (relevantTerms.length === 0) {
      return <span className={className}>{text}</span>
    }

    // Create term map for fast lookup
    const termMap = new Map<string, GlossaryTerm>()
    relevantTerms.forEach(term => {
      termMap.set(term.term.toLowerCase(), term)
    })

    // Sort terms by length (longest first) to avoid partial matches
    const sortedTerms = relevantTerms
      .map(term => term.term)
      .sort((a, b) => b.length - a.length)

    // Create optimized regex pattern
    const pattern = sortedTerms
      .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')

    // Process text and create tooltip components
    const regex = new RegExp(`\\b(${pattern})\\b`, 'gi')
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match
    let matchCount = 0

    while ((match = regex.exec(text)) !== null && matchCount < 20) { // Reduced limit for performance
      const matchedText = match[0]
      const matchIndex = match.index
      matchCount++

      // Add text before the match
      if (matchIndex > lastIndex) {
        parts.push(text.slice(lastIndex, matchIndex))
      }

      // Find the corresponding term data
      const termData = termMap.get(matchedText.toLowerCase())
      
      if (termData) {
        // Add the glossary term with tooltip
        parts.push(
          <GlossaryTooltip
            key={`${termData._id}-${matchIndex}`}
            term={termData.term}
            slug={termData.slug.current}
            definition={termData.shortDefinition}
            level={termData.level}
            domain={termData.domain}
          >
            {matchedText}
          </GlossaryTooltip>
        )
      } else {
        parts.push(matchedText)
      }

      lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return <span className={className}>{parts}</span>
  }, [text, glossaryTerms, className]) // Memoize based on these dependencies

  return processedContent
}