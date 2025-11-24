import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'
import { Badge } from './ui/Badge'

interface SeriesCardProps {
  series: {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    status: string
    estimatedParts?: number
    coverImage?: {
      asset: { _id: string; url: string }
      alt?: string
    }
    posts?: Array<{
      title: string
      slug: { current: string }
      publishedAt: string
    }>
  }
}

export function SeriesCard({ series }: SeriesCardProps) {
  const coverImageUrl = getImageUrl(series.coverImage, 300, 160)
  const publishedCount = series.posts?.length || 0
  const totalParts = series.estimatedParts || publishedCount
  const progressPercentage = totalParts > 0 ? (publishedCount / totalParts) * 100 : 0

  return (
    <Link href={`/series/${series.slug.current}`} className="group">
      <article className="bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden hover:border-[#00BFFF] transition-all duration-200 hover:scale-105">
        {/* Header with image or gradient */}
        <div className="relative h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={series.coverImage?.alt || series.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600" />
          )}

          {/* Overlay with series info */}
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="custom" size="xs" className="bg-white bg-opacity-90 text-purple-700">
                📚 SERIES
              </Badge>
            </div>
            <Badge variant="status" value={series.status} size="xs">
              {series.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-[#FFFFFF] mb-2 line-clamp-2 group-hover:text-[#00BFFF] transition-colors">
            {series.title}
          </h3>

          {series.description && (
            <p className="text-[#E0E0E0] text-sm mb-3 line-clamp-2">
              {series.description}
            </p>
          )}

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-[#E0E0E0] mb-1">
              <span>{publishedCount} published</span>
              <span>{totalParts} total parts</span>
            </div>
            <div className="w-full bg-[#333333] rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-[#00BFFF] to-[#39FF14] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-[#E0E0E0]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full"></span>
                {Math.round(progressPercentage)}% complete
              </span>
            </div>
            <span className="text-[#00BFFF] font-medium group-hover:text-[#FFD700]">
              View Series →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}