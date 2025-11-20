import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'

interface LearningPathCardProps {
  path: {
    _id: string
    title: string
    slug: { current: string }
    description: string
    level: string
    domain: string
    estimatedDuration?: string
    coverImage?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    topicsCount?: number
    tutorialSeries?: {
      title: string
      slug: { current: string }
    }
  }
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
  mixed: 'bg-purple-100 text-purple-800 border-purple-200',
}

const domainColors = {
  'ai': 'bg-purple-100 text-purple-800',
  'ml': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'software-engineering': 'bg-gray-100 text-gray-800',
  'deep-learning': 'bg-violet-100 text-violet-800',
  'computer-vision': 'bg-emerald-100 text-emerald-800',
  'nlp': 'bg-orange-100 text-orange-800',
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  const imageUrl = path.coverImage ? getImageUrl(path.coverImage, 400, 200) : null
  const levelColor = levelColors[path.level as keyof typeof levelColors] || levelColors.beginner
  const domainColor = domainColors[path.domain as keyof typeof domainColors] || domainColors['software-engineering']

  return (
    <Link href={`/learning-paths/${path.slug.current}`}>
      <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden">
        {/* Image Section */}
        {imageUrl ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={path.coverImage?.alt || path.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Path Icon Overlay */}
            <div className="absolute top-3 left-3">
              <span className="text-2xl bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
                🗺️
              </span>
            </div>

            {/* Duration Badge */}
            {path.estimatedDuration && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
                  ⏱️ {path.estimatedDuration}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <span className="text-6xl opacity-60">🗺️</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {path.title}
            </h3>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${levelColor}`}>
                {path.level}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${domainColor}`}>
                {path.domain.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {path.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              {path.topicsCount && (
                <span className="flex items-center gap-1">
                  📚 {path.topicsCount} concepts
                </span>
              )}
              
              {path.tutorialSeries && (
                <span className="flex items-center gap-1 text-blue-600">
                  🎓 Series included
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {/* Progress indicator dots */}
                {Array.from({ length: Math.min(path.topicsCount || 5, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-200 border border-white"
                  />
                ))}
                {(path.topicsCount || 0) > 5 && (
                  <span className="text-xs text-gray-400 ml-2">
                    +{(path.topicsCount || 0) - 5}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-blue-600 group-hover:text-blue-700 font-medium">
              Start learning →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}