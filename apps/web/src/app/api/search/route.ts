import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/sanity/live'
import { GLOBAL_SEARCH_QUERY } from '@/sanity/queries'
import type { SearchData } from '@/sanity/types'

// Define search result interface
export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'glossary' | 'blog' | 'series' | 'learningPath' | 'author'
  url: string
  metadata?: {
    level?: string
    domain?: string
    publishedAt?: string
    author?: string
    tags?: string[]
    status?: string
    // Note: 'type' is available directly on the SearchResult object, not in metadata
  }
}



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('q')

    if (!searchQuery || searchQuery.length < 2) {
      return NextResponse.json({ results: [] })
    }

    // Ensure searchQuery is not null before using it
    const queryParam = searchQuery.toLowerCase()

    // Fetch all content types
    const result = await sanityFetch({
      query: GLOBAL_SEARCH_QUERY,
      params: { query: queryParam } as any,
      tags: ['glossaryTerm', 'blogPost', 'series', 'learningPath', 'author'],
    })
    const data = result.data as SearchData

    const results: SearchResult[] = []

    // Process glossary terms
    if (data?.glossaryTerms) {
      data.glossaryTerms.forEach((term: any) => {
        results.push({
          id: term._id,
          title: term.term,
          description: term.shortDefinition,
          type: 'glossary',
          url: `/glossary/${term.slug.current}`,
          metadata: {
            level: term.level,
            domain: term.domain,
            tags: term.tags,
          },
        })
      })
    }

    // Process blog posts
    if (data?.blogPosts) {
      data.blogPosts.forEach((post: any) => {
        results.push({
          id: post._id,
          title: post.title,
          description: post.excerpt,
          type: 'blog',
          url: `/blog/${post.slug.current}`,
          metadata: {
            publishedAt: post.publishedAt,
            author: post.author,
            tags: post.tags,
          },
        })
      })
    }

    // Process series
    if (data?.series) {
      data.series.forEach((series: any) => {
        results.push({
          id: series._id,
          title: series.title,
          description: series.description,
          type: 'series',
          url: `/series/${series.slug.current}`,
          metadata: {
            status: series.status,
          },
        })
      })
    }

    // Process learning paths
    if (data?.learningPaths) {
      data.learningPaths.forEach((path: any) => {
        results.push({
          id: path._id,
          title: path.title,
          description: path.description,
          type: 'learningPath',
          url: `/learning-paths/${path.slug.current}`,
          metadata: {
            level: path.level,
            domain: path.domain,
          },
        })
      })
    }

    // Process authors
    if (data?.authors) {
      data.authors.forEach((author: any) => {
        results.push({
          id: author._id,
          title: author.name,
          description: author.bio,
          type: 'author',
          url: `/author/${author.slug.current}`,
        })
      })
    }

    // Sort results by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(queryParam)
      const bExact = b.title.toLowerCase().includes(queryParam)
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      return a.title.localeCompare(b.title)
    })

    return NextResponse.json({ 
      results: sortedResults.slice(0, 10), // Limit to 10 results
      query: searchQuery,
      total: sortedResults.length 
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    )
  }
}