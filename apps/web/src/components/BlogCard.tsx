import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { getImageUrl } from '@/sanity/image'
import { memo } from 'react'
import { CardTooltip } from './CardTooltip'

interface BlogCardProps {
  post: any
  featured?: boolean
}

export const BlogCard = memo(function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClass = featured
    ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"

  const mainImageUrl = getImageUrl(post.mainImage, 600, 300)
  const authorAvatarUrl = getImageUrl(post.author?.avatar, 32, 32)

  return (
    <article className={cardClass}>
      {mainImageUrl && (
        <div className="aspect-video relative">
          <Image
            src={mainImageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Series Badge */}
        {post.series && (
          <div className="mb-3">
            <Link
              href={`/series/${post.series.slug.current}`}
              className="inline-flex items-center px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
            >
              📚 {post.series.title}
            </Link>
          </div>
        )}

        {/* Categories and Difficulty */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.categories?.map((category: any) => (
            <Link
              key={category.slug.current}
              href={`/category/${category.slug.current}`}
              className="px-2 py-1 text-xs font-medium rounded-full transition-colors"
              style={{
                backgroundColor: category.color?.hex ? `${category.color.hex}20` : '#f3f4f6',
                color: category.color?.hex || '#374151'
              }}
            >
              {category.title}
            </Link>
          ))}
          {post.difficulty && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {post.difficulty}
            </span>
          )}
        </div>

        <h3 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link
            href={`/blog/${post.slug.current}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <CardTooltip content={post.excerpt}>
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </CardTooltip>
        )}

        {/* Tags and Code Languages */}
        {(post.tags || post.codeLanguages) && (
          <div className="mb-4 flex flex-wrap gap-1">
            {post.codeLanguages?.slice(0, 3).map((lang: string) => (
              <span
                key={lang}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded border"
              >
                {lang}
              </span>
            ))}
            {post.tags?.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded border"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {(post.githubRepo || post.liveDemo) && (
          <div className="flex gap-2 mb-4">
            {post.githubRepo && (
              <a
                href={post.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {post.liveDemo && (
              <a
                href={post.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                🚀 Live Demo
              </a>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {authorAvatarUrl ? (
              <Image
                src={authorAvatarUrl}
                alt={post.author?.avatar?.alt || post.author?.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                {post.author?.name?.charAt(0) || '?'}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author?.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </time>
                {post.estimatedReadTime && (
                  <>
                    <span>•</span>
                    <span>{post.estimatedReadTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
})