import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'
import { CardTooltip } from './CardTooltip'

interface GlossaryCardProps {
  term: {
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: string
    domain: string
    type: string
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    tags?: string[]
    relatedCount?: number
    tutorialArticle?: {
      title: string
      slug: { current: string }
    }
  }
  featured?: boolean
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
}

const domainColors = {
  'ai': 'bg-purple-100 text-purple-800',
  'ml': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'software-engineering': 'bg-gray-100 text-gray-800',
  'math': 'bg-indigo-100 text-indigo-800',
  'statistics': 'bg-pink-100 text-pink-800',
  'deep-learning': 'bg-violet-100 text-violet-800',
  'computer-vision': 'bg-emerald-100 text-emerald-800',
  'nlp': 'bg-orange-100 text-orange-800',
}

const typeIcons = {
  algorithm: '⚡',
  model: '🧠',
  metric: '📊',
  library: '📚',
  technique: '🔧',
  concept: '💡',
  architecture: '🏗️',
  method: '🎯',
}

export function GlossaryCard({ term, featured = false }: GlossaryCardProps) {
  const imageUrl = term.image ? getImageUrl(term.image, 400, 200) : null
  const levelColor = levelColors[term.level as keyof typeof levelColors] || levelColors.beginner
  const domainColor = domainColors[term.domain as keyof typeof domainColors] || domainColors['software-engineering']
  const typeIcon = typeIcons[term.type as keyof typeof typeIcons] || '💡'

  return (
    <Link href={`/glossary/${term.slug.current}`}>
      <div className={`group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}>
        {/* Image Section */}
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={term.image?.alt || term.term}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Type Icon Overlay */}
            <div className="absolute top-3 left-3">
              <span className="text-2xl bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
                {typeIcon}
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {term.term}
              </h3>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${levelColor}`}>
                  {term.level}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${domainColor}`}>
                  {term.domain.replace('-', ' ')}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  {term.type}
                </span>
              </div>
            </div>
            
            {!imageUrl && (
              <span className="text-3xl ml-4">
                {typeIcon}
              </span>
            )}
          </div>

          {/* Definition */}
          <CardTooltip content={term.shortDefinition}>
            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
              {term.shortDefinition}
            </p>
          </CardTooltip>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {term.relatedCount !== undefined && (
                <span className="flex items-center gap-1">
                  🔗 {term.relatedCount} related
                </span>
              )}
              
              {term.tutorialArticle && (
                <span className="flex items-center gap-1 text-blue-600">
                  📖 Tutorial available
                </span>
              )}
            </div>
            
            <span className="text-blue-600 group-hover:text-blue-700 font-medium">
              Learn more →
            </span>
          </div>

          {/* Tags */}
          {term.tags && term.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-100">
              {term.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {term.tags.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-400">
                  +{term.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}