import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'

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
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    completed: 'bg-green-100 text-green-800 border-green-300'
  }

  const publishedCount = series.posts?.length || 0
  const totalParts = series.estimatedParts || publishedCount
  const progressPercentage = totalParts > 0 ? (publishedCount / totalParts) * 100 : 0

  return (
    <Link href={`/series/${series.slug.current}`} className="group">
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
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
              <span className="px-2 py-1 bg-white bg-opacity-90 text-purple-700 text-xs font-bold rounded-full">
                📚 SERIES
              </span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[series.status as keyof typeof statusColors] || statusColors.draft}`}>
              {series.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {series.title}
          </h3>
          
          {series.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {series.description}
            </p>
          )}

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{publishedCount} published</span>
              <span>{totalParts} total parts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                {Math.round(progressPercentage)}% complete
              </span>
            </div>
            <span className="text-purple-600 font-medium group-hover:text-purple-700">
              View Series →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}