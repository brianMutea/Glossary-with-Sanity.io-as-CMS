import { glossaryCache, ProcessedTerm } from './glossaryCache'

interface ContentAnalysis {
  termsFound: ProcessedTerm[]
  textContent: string
  termCount: number
}

interface SerializableContentAnalysis {
  termsFound: Array<{
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level?: string
    domain?: string
  }>
  textContent: string
  termCount: number
}

class ContentProcessor {
  private static instance: ContentProcessor
  private analysisCache = new Map<string, ContentAnalysis>()
  private readonly MAX_CACHE_SIZE = 100

  private constructor() {}

  static getInstance(): ContentProcessor {
    if (!ContentProcessor.instance) {
      ContentProcessor.instance = new ContentProcessor()
    }
    return ContentProcessor.instance
  }

  // Extract text content from PortableText efficiently
  private extractTextFromPortableText(content: any[]): string {
    if (!content || !Array.isArray(content)) return ''
    
    const textParts: string[] = []
    
    for (const block of content) {
      if (block._type === 'block' && block.children) {
        for (const child of block.children) {
          if (child._type === 'span' && child.text) {
            textParts.push(child.text)
          }
        }
      }
    }
    
    return textParts.join(' ')
  }

  // Generate cache key for content
  private generateCacheKey(content: any[]): string {
    return JSON.stringify(content).slice(0, 100) // Use first 100 chars as key
  }

  // Analyze content and find matching terms
  async analyzeContent(content: any[]): Promise<ContentAnalysis> {
    const cacheKey = this.generateCacheKey(content)
    
    // Check cache first
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey)!
    }

    // Extract text content
    const textContent = this.extractTextFromPortableText(content)
    
    // Find matching terms
    const termsFound = await glossaryCache.findMatchingTerms(textContent)
    
    const analysis: ContentAnalysis = {
      termsFound,
      textContent,
      termCount: termsFound.length
    }

    // Cache the analysis (with size limit)
    if (this.analysisCache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.analysisCache.keys().next().value
      if (firstKey) {
        this.analysisCache.delete(firstKey)
      }
    }
    
    this.analysisCache.set(cacheKey, analysis)
    
    return analysis
  }

  // Get serializable analysis for server-to-client transfer
  async getSerializableAnalysis(content: any[]): Promise<SerializableContentAnalysis> {
    const analysis = await this.analyzeContent(content)
    
    return {
      termsFound: analysis.termsFound.map(term => ({
        _id: term._id,
        term: term.term,
        slug: term.slug,
        shortDefinition: term.shortDefinition,
        level: term.level,
        domain: term.domain
      })),
      textContent: analysis.textContent,
      termCount: analysis.termCount
    }
  }

  // Clear analysis cache
  clearCache(): void {
    this.analysisCache.clear()
  }
}

export const contentProcessor = ContentProcessor.getInstance()
export type { ContentAnalysis, SerializableContentAnalysis }