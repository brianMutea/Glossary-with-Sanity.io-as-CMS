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
  beginner: 'bg-[#39FF14] bg-opacity-20 text-[#39FF14] border-[#39FF14]',
  intermediate: 'bg-[#FFD700] bg-opacity-20 text-[#FFD700] border-[#FFD700]',
  advanced: 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61] border-[#FF6F61]',
  mixed: 'bg-[#E6E6FA] bg-opacity-20 text-[#E6E6FA] border-[#E6E6FA]',
}

const domainColors = {
  'ai': 'bg-[#E6E6FA] bg-opacity-20 text-[#E6E6FA]',
  'ml': 'bg-[#00BFFF] bg-opacity-20 text-[#00BFFF]',
  'data-science': 'bg-[#39FF14] bg-opacity-20 text-[#39FF14]',
  'software-engineering': 'bg-[#E0E0E0] bg-opacity-20 text-[#E0E0E0]',
  'deep-learning': 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61]',
  'computer-vision': 'bg-[#FFD700] bg-opacity-20 text-[#FFD700]',
  'nlp': 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61]',
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  const imageUrl = path.coverImage ? getImageUrl(path.coverImage, 400, 200) : null
  const levelColor = levelColors[path.level as keyof typeof levelColors] || levelColors.beginner
  const domainColor = domainColors[path.domain as keyof typeof domainColors] || domainColors['software-engineering']

  return (
    <Link href={`/learning-paths/${path.slug.current}`}>
      <div className="group bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden hover:border-[#00BFFF] transition-all duration-200 hover:scale-105">
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
          <div className="h-48 bg-gradient-to-br from-[#00BFFF] to-[#FFD700] flex items-center justify-center">
            <span className="text-6xl text-[#121212]">🗺️</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-[#FFFFFF] group-hover:text-[#00BFFF] transition-colors mb-2">
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
          <p className="text-[#E0E0E0] mb-4 leading-relaxed line-clamp-3">
            {path.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-[#E0E0E0] mb-4">
            <div className="flex items-center gap-4">
              {path.topicsCount && (
                <span className="flex items-center gap-1">
                  📚 {path.topicsCount} concepts
                </span>
              )}
              
              {path.tutorialSeries && (
                <span className="flex items-center gap-1 text-[#00BFFF]">
                  🎓 Series included
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {/* Progress indicator dots */}
                {Array.from({ length: Math.min(path.topicsCount || 5, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#00BFFF] bg-opacity-40 border border-[#00BFFF]"
                  />
                ))}
                {(path.topicsCount || 0) > 5 && (
                  <span className="text-xs text-[#E0E0E0] ml-2">
                    +{(path.topicsCount || 0) - 5}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-[#00BFFF] group-hover:text-[#FFD700] font-medium">
              Start learning →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}