import Link from 'next/link'
import { CardTooltip } from './CardTooltip'
import { ImageWithFallback } from './ui/ImageWithFallback'
import { Badge } from './ui/Badge'
import { cardStyles, textStyles, getTypeIcon, formatDisplayName } from '@/lib/designSystem'

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

export function GlossaryCard({ term, featured = false }: GlossaryCardProps) {
  const typeIcon = getTypeIcon(term.type)

  return (
    <Link href={`/glossary/${term.slug.current}`}>
      <div className={`${cardStyles.group} ${cardStyles.base} ${cardStyles.hover} ${featured ? cardStyles.featured : ''}`}>
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
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className={`${textStyles.cardTitleLarge} ${textStyles.cardTitleHover} mb-2`}>
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
                <Badge variant="type">
                  {term.type}
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
          <CardTooltip content={term.shortDefinition}>
            <p className={`${textStyles.description} mb-4 line-clamp-2`}>
              {term.shortDefinition}
            </p>
          </CardTooltip>

          {/* Footer */}
          <div className={`flex items-center justify-between ${textStyles.meta}`}>
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
            
            <span className={textStyles.link}>
              Learn more →
            </span>
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
      </div>
    </Link>
  )
}