import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/live'
import { KNOWLEDGE_GRAPH_QUERY } from '@/sanity/queries'
import KnowledgeGraph from '@/components/KnowledgeGraph'
import { getDynamicOptions, getDomainColor, getLevelColor, formatDisplayName } from '@/lib/dynamicColors'

export const metadata: Metadata = {
  title: 'Knowledge Graph | Tech Glossary',
  description: 'Interactive visualization of how technical concepts connect and relate to each other. Explore the relationships between AI, ML, and data science terms.',
  keywords: ['knowledge graph', 'concept map', 'technical terms', 'AI', 'machine learning', 'data science', 'visualization'],
}

interface KnowledgeGraphTerm {
  _id: string
  term: string
  slug: { current: string }
  shortDefinition: string
  level: 'beginner' | 'intermediate' | 'advanced'
  domain: string
  type?: string
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  tags?: string[]
  tutorialArticle?: {
    title: string
    slug: { current: string }
  }
  prerequisites?: Array<{
    _id: string
    term: string
    slug: { current: string }
    level: string
    domain: string
  }>
  relatedTerms?: Array<{
    _id: string
    term: string
    slug: { current: string }
    level: string
    domain: string
  }>
  nextConcepts?: Array<{
    _id: string
    term: string
    slug: { current: string }
    level: string
    domain: string
  }>
}

export default async function KnowledgeGraphPage() {
  const { data: terms } = await sanityFetch({
    query: KNOWLEDGE_GRAPH_QUERY,
    tags: ['glossaryTerm'],
  })

  // Get dynamic options for the legend
  const { domains, levels } = getDynamicOptions(terms)

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#FFD700] mb-6">
              Interactive Knowledge Graph
            </h1>
            <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto leading-relaxed">
              Explore how technical concepts connect and build upon each other. 
              Discover learning paths and understand the relationships between <span className="text-[#00BFFF]">AI</span>, <span className="text-[#39FF14]">ML</span>, and <span className="text-[#FF6F61]">data science</span> terms.
            </p>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="h-[calc(100vh-200px)] min-h-[800px]">
        <KnowledgeGraph terms={terms} />
      </div>
    </div>
  )
}

export const revalidate = 3600 // Revalidate every hour