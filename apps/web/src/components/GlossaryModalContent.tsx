import Link from 'next/link'
import { ImageWithFallback } from './ui/ImageWithFallback'
import { Badge } from './ui/Badge'
import { textStyles, getTypeIcon, formatDisplayName } from '@/lib/designSystem'

interface GlossaryModalContentProps {
  term: {
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: 'beginner' | 'intermediate' | 'advanced'
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
  onClose?: () => void
}

export function GlossaryModalContent({ term, onClose }: GlossaryModalContentProps) {
  const typeIcon = getTypeIcon(term.type)

  return (
    <>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white hover:text-gray-800 transition-colors shadow-sm cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Section */}
      <ImageWithFallback
        image={term.image}
        alt={term.term}
        width={400}
        height={200}
        containerClassName="h-48"
        showOverlay={true}
        icon={typeIcon}
        iconPosition="top-left"
      />

      {/* Content Section */}
      <div className="p-6 overflow-y-auto flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`${textStyles.cardTitleLarge} mb-2 leading-tight`}>
              {term.term}
            </h3>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="level" value={term.level}>
                {term.level}
              </Badge>
              <Badge variant="domain" value={term.domain}>
                {formatDisplayName(term.domain)}
              </Badge>
              <Badge>
                {formatDisplayName(term.type)}
              </Badge>
            </div>
          </div>
          
          {!term.image && (
            <span className="text-3xl ml-4">
              {typeIcon}
            </span>
          )}
        </div>

        {/* Definition */}
        <p className={`${textStyles.description} mb-4 line-clamp-2`}>
          {term.shortDefinition}
        </p>

        {/* Footer */}
        <div className={`flex items-center justify-between ${textStyles.meta}`}>
          <div className="flex items-center gap-4">
            {term.relatedCount !== undefined && (
              <span className="flex items-center gap-1" title={`${term.relatedCount} related concepts`}>
                🔗 {term.relatedCount} related
              </span>
            )}
            
            {term.tutorialArticle && (
              <Link
                href={`/blog/${term.tutorialArticle.slug.current}`}
                className={`flex items-center gap-1 ${textStyles.link} cursor-pointer`}
                title={`Read tutorial: ${term.tutorialArticle.title}`}
              >
                📖 Tutorial available
              </Link>
            )}
          </div>
          
          <Link
            href={`/glossary/${term.slug.current}`}
            className={textStyles.link}
          >
            Learn more →
          </Link>
        </div>

        {/* Tags */}
        {term.tags && term.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-100">
            {term.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="bg-gray-50 text-gray-600">
                #{tag}
              </Badge>
            ))}
            {term.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-400">
                +{term.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}