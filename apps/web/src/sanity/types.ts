// Sanity schema types
// This file can be auto-generated using: pnpm typegen

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface Slug {
  current: string
  _type: 'slug'
}

export interface SanityImageAsset {
  _id: string
  _type: 'sanity.imageAsset'
  url: string
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
}

export interface GlossaryTerm extends SanityDocument {
  _type: 'glossaryTerm'
  term: string
  slug: Slug
  shortDefinition: string
  fullExplanation?: any[]
  level: 'beginner' | 'intermediate' | 'advanced'
  domain: string
  type: string
  image?: SanityImage
  tags?: string[]
  prerequisites?: GlossaryTerm[]
  relatedTerms?: GlossaryTerm[]
  nextConcepts?: GlossaryTerm[]
}

export interface BlogPost extends SanityDocument {
  _type: 'blogPost'
  title: string
  slug: Slug
  excerpt?: string
  publishedAt: string
  tags?: string[]
  author?: Author
}

export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: Slug
  bio?: string
}

export interface Series extends SanityDocument {
  _type: 'series'
  title: string
  slug: Slug
  description?: string
  status?: string
}

export interface LearningPath extends SanityDocument {
  _type: 'learningPath'
  title: string
  slug: Slug
  description?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  domain: string
}

// Search result types
export interface SearchData {
  glossaryTerms?: GlossaryTerm[]
  blogPosts?: BlogPost[]
  series?: Series[]
  learningPaths?: LearningPath[]
  authors?: Author[]
}