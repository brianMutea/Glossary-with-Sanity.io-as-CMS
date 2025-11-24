import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/sanity/live'

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
  }
}

// Global search query that searches across all content types
const GLOBAL_SEARCH_QUERY = `
{
  "glossaryTerms": *[_type == "glossaryTerm" && (
    term match $query + "*" ||
    shortDefinition match $query + "*" ||
    domain match $query + "*" ||
    tags[]->title match $query + "*"
  )][0...5] {
    _id,
    term,
    shortDefinition,
    level,
    domain,
    slug,
    tags
  },
  "blogPosts": *[_type == "blogPost" && (
    title match $query + "*" ||
    excerpt match $query + "*" ||
    tags[] match $query + "*"
  )][0...5] {
    _id,
    title,
    excerpt,
    slug,
    publishedAt,
    tags,
    "author": author->name
  },
  "series": *[_type == "series" && (
    title match $query + "*" ||
    description match $query + "*"
  )][0...3] {
    _id,
    title,
    description,
    slug,
    status
  },
  "learningPaths": *[_type == "learningPath" && (
    title match $query + "*" ||
    description match $query + "*" ||
    domain match $query + "*"
  )][0...3] {
    _id,
    title,
    description,
    slug,
    level,
    domain
  },
  "authors": *[_type == "author" && (
    name match $query + "*" ||
    bio match $query + "*"
  )][0...3] {
    _id,
    name,
    bio,
    slug
  }
}
`

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    // Fetch all content types
    const { data } = await sanityFetch({
      query: GLOBAL_SEARCH_QUERY,
      params: { query: query.toLowerCase() },
      tags: ['glossaryTerm', 'blogPost', 'series', 'learningPath', 'author'],
    })

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
      const aExact = a.title.toLowerCase().includes(query.toLowerCase())
      const bExact = b.title.toLowerCase().includes(query.toLowerCase())
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      return a.title.localeCompare(b.title)
    })

    return NextResponse.json({ 
      results: sortedResults.slice(0, 10), // Limit to 10 results
      query,
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