import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { getImageUrl } from '@/sanity/image'

interface SeriesPostCardProps {
  post: any
  index: number
  isCompleted?: boolean
}

export function SeriesPostCard({ post, index, isCompleted = true }: SeriesPostCardProps) {
  const mainImageUrl = getImageUrl(post.mainImage, 300, 160)
  const authorAvatarUrl = getImageUrl(post.author?.avatar, 24, 24)

  return (
    <div className="relative">
      {/* Connection Line (except for last item) */}
      <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-purple-300 to-transparent z-0" />
      
      <div className="flex gap-4 relative z-10">
        {/* Part Number Badge */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
          isCompleted 
            ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' 
            : 'bg-gray-200 text-gray-500 border-2 border-dashed border-gray-300'
        }`}>
          {index + 1}
        </div>

        {/* Post Card */}
        <div className="flex-1 min-w-0">
          <Link href={`/blog/${post.slug.current}`}>
            <article className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border ${
              isCompleted 
                ? 'border-gray-200 hover:border-purple-300' 
                : 'border-gray-100 opacity-60'
            }`}>
              <div className="flex">
                {/* Image */}
                {mainImageUrl && (
                  <div className="w-32 h-24 flex-shrink-0 relative">
                    <Image
                      src={mainImageUrl}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-bold text-lg line-clamp-2 ${
                      isCompleted 
                        ? 'text-gray-900 hover:text-purple-600' 
                        : 'text-gray-500'
                    } transition-colors`}>
                      {post.title}
                    </h3>
                    
                    {!isCompleted && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full ml-2 flex-shrink-0">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  {post.excerpt && (
                    <p className={`text-sm mb-3 line-clamp-2 ${
                      isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {post.codeLanguages && post.codeLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.codeLanguages.slice(0, 3).map((lang: string) => (
                        <span
                          key={lang}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded border"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      {authorAvatarUrl ? (
                        <Image
                          src={authorAvatarUrl}
                          alt={post.author?.name}
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                          {post.author?.name?.charAt(0)}
                        </div>
                      )}
                      <span>{post.author?.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {post.estimatedReadTime && (
                        <span>{post.estimatedReadTime} min</span>
                      )}
                      {isCompleted && (
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), 'MMM d')}
                        </time>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </div>
  )
}