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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Interactive Knowledge Graph
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore how technical concepts connect and build upon each other. 
              Discover learning paths and understand the relationships between AI, ML, and data science terms.
            </p>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="h-[calc(100vh-200px)]">
        <KnowledgeGraph terms={terms} />
      </div>

      {/* Legend and Info */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Node Colors Legend */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Colors</h3>
              <div className="space-y-3">
                {levels.map(level => (
                  <div key={level} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border-2" 
                      style={{ 
                        backgroundColor: getLevelColor(level as 'beginner' | 'intermediate' | 'advanced'),
                        borderColor: getLevelColor(level as 'beginner' | 'intermediate' | 'advanced')
                      }}
                    ></div>
                    <span className="text-sm text-gray-700">{formatDisplayName(level)} Level</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Colors - Dynamic */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Colors</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {domains.map(domain => (
                  <div key={domain} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getDomainColor(domain) }}
                    ></div>
                    <span className="text-gray-700">{formatDisplayName(domain)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use the Knowledge Graph</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Navigation:</h4>
                <ul className="space-y-1">
                  <li>• Click and drag to move nodes around</li>
                  <li>• Scroll or pinch to zoom in/out</li>
                  <li>• Click a node to see details</li>
                  <li>• Double-click to go to term page</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Learning Paths:</h4>
                <ul className="space-y-1">
                  <li>• Gray arrows show prerequisites</li>
                  <li>• Blue arrows show next concepts</li>
                  <li>• Green lines show related terms</li>
                  <li>• Follow arrows to build knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 3600 // Revalidate every hour