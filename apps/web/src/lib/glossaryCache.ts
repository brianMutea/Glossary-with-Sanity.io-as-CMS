import { sanityFetch } from '@/sanity/live'
import { GLOSSARY_TERMS_FOR_LINKING_QUERY } from '@/sanity/queries'
import { performanceMonitor } from './performanceMonitor'

interface GlossaryTerm {
  _id: string
  term: string
  slug: { current: string }
  shortDefinition: string
  level?: string
  domain?: string
}

interface ProcessedTerm extends GlossaryTerm {
  escapedTerm: string
  regex: RegExp
}

class GlossaryCache {
  private static instance: GlossaryCache
  private cache: ProcessedTerm[] | null = null
  private lastFetch: number = 0
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  static getInstance(): GlossaryCache {
    if (!GlossaryCache.instance) {
      GlossaryCache.instance = new GlossaryCache()
    }
    return GlossaryCache.instance
  }

  async getTerms(): Promise<ProcessedTerm[]> {
    const endTimer = performanceMonitor.startTimer('glossary-cache-fetch')
    
    try {
      const now = Date.now()
      
      // Return cached terms if still valid
      if (this.cache && (now - this.lastFetch) < this.CACHE_DURATION) {
        return this.cache
      }

      // Fetch fresh terms
      const { data: rawTerms } = await sanityFetch({ 
        query: GLOSSARY_TERMS_FOR_LINKING_QUERY 
      })

      // Pre-process terms for performance
      this.cache = (rawTerms || [])
        .filter((term: GlossaryTerm) => term.term && term.slug?.current && term.shortDefinition)
        .map((term: GlossaryTerm) => {
          const escapedTerm = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          return {
            ...term,
            escapedTerm,
            regex: new RegExp(`\\b${escapedTerm}\\b`, 'gi')
          }
        })

      this.lastFetch = now
      return this.cache || []
    } finally {
      endTimer()
    }
  }

  // Find terms that match the given text
  async findMatchingTerms(text: string): Promise<ProcessedTerm[]> {
    if (!text) return []
    
    const terms = await this.getTerms()
    return terms.filter(term => term.regex.test(text))
  }

  // Clear cache (useful for development or when terms are updated)
  clearCache(): void {
    this.cache = null
    this.lastFetch = 0
  }
}

export const glossaryCache = GlossaryCache.getInstance()
export type { ProcessedTerm }