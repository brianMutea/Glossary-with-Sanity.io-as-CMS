import { glossaryCache, ProcessedTerm } from './glossaryCache'
import { performanceMonitor } from './performanceMonitor'
import { API, PERFORMANCE } from './constants'

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

interface CacheEntry {
  data: ContentAnalysis
  timestamp: number
  accessCount: number
}

class ContentProcessor {
  private static instance: ContentProcessor
  private analysisCache = new Map<string, CacheEntry>()
  private readonly MAX_CACHE_SIZE = 100
  private cacheHits = 0
  private cacheMisses = 0

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
    const startTime = performance.now()
    const cacheKey = this.generateCacheKey(content)
    
    // Check cache first with expiration
    const cachedEntry = this.getCachedEntry(cacheKey)
    if (cachedEntry) {
      this.cacheHits++
      cachedEntry.accessCount++
      return cachedEntry.data
    }
    
    this.cacheMisses++

    // Extract text content with performance monitoring
    const extractTimer = performanceMonitor.startTimer('contentProcessor.extractText')
    const textContent = this.extractTextFromPortableText(content)
    extractTimer()
    
    // Find matching terms with performance monitoring
    const findTimer = performanceMonitor.startTimer('contentProcessor.findTerms')
    const termsFound = await glossaryCache.findMatchingTerms(textContent)
    findTimer()
    
    const analysis: ContentAnalysis = {
      termsFound,
      textContent,
      termCount: termsFound.length
    }

    // Cache the analysis with metadata
    this.setCachedEntry(cacheKey, analysis)
    
    const analyzeTimer = performanceMonitor.startTimer('contentProcessor.analyze')
    analyzeTimer()
    
    return analysis
  }

  private getCachedEntry(key: string): CacheEntry | null {
    const entry = this.analysisCache.get(key)
    
    if (!entry) return null
    
    // Check if entry is expired
    const now = Date.now()
    if (now - entry.timestamp > API.cacheTimeMs) {
      this.analysisCache.delete(key)
      return null
    }
    
    return entry
  }

  private setCachedEntry(key: string, data: ContentAnalysis): void {
    // Implement LRU eviction if cache is full
    if (this.analysisCache.size >= this.MAX_CACHE_SIZE) {
      this.evictLeastRecentlyUsed()
    }
    
    this.analysisCache.set(key, {
      data,
      timestamp: Date.now(),
      accessCount: 1
    })
  }

  private evictLeastRecentlyUsed(): void {
    let lruKey = ''
    let lruAccessCount = Infinity
    let oldestTimestamp = Infinity
    
    for (const [key, entry] of this.analysisCache.entries()) {
      if (entry.accessCount < lruAccessCount || 
          (entry.accessCount === lruAccessCount && entry.timestamp < oldestTimestamp)) {
        lruKey = key
        lruAccessCount = entry.accessCount
        oldestTimestamp = entry.timestamp
      }
    }
    
    if (lruKey) {
      this.analysisCache.delete(lruKey)
    }
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

  // Performance and debugging methods
  getCacheStats(): {
    size: number
    hits: number
    misses: number
    hitRate: number
    maxSize: number
  } {
    const total = this.cacheHits + this.cacheMisses
    return {
      size: this.analysisCache.size,
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total > 0 ? this.cacheHits / total : 0,
      maxSize: this.MAX_CACHE_SIZE
    }
  }

  // Clear analysis cache
  clearCache(): void {
    this.analysisCache.clear()
    this.cacheHits = 0
    this.cacheMisses = 0
  }

  // Optimize cache by removing expired entries
  optimizeCache(): void {
    const now = Date.now()
    for (const [key, entry] of this.analysisCache.entries()) {
      if (now - entry.timestamp > API.cacheTimeMs) {
        this.analysisCache.delete(key)
      }
    }
  }
}

export const contentProcessor = ContentProcessor.getInstance()
export type { ContentAnalysis, SerializableContentAnalysis }