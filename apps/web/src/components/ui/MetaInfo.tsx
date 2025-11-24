import Image from 'next/image'
import { format } from 'date-fns'
import { getImageUrl } from '@/sanity/image'
import { textStyles } from '@/lib/designSystem'

interface MetaInfoProps {
  author?: {
    name: string
    avatar?: {
      asset: { _id: string; url: string }
      alt?: string
    }
  }
  publishedAt?: string
  estimatedReadTime?: number
  additionalInfo?: React.ReactNode
  className?: string
}

export function MetaInfo({ 
  author, 
  publishedAt, 
  estimatedReadTime, 
  additionalInfo,
  className = '' 
}: MetaInfoProps) {
  const authorAvatarUrl = author?.avatar ? getImageUrl(author.avatar, 32, 32) : null

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        {author && (
          <>
            {authorAvatarUrl ? (
              <Image
                src={authorAvatarUrl}
                alt={author.avatar?.alt || author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                {author.name.charAt(0) || '?'}
              </div>
            )}
            <div>
              <p className={`text-sm font-medium text-gray-900`}>
                {author.name}
              </p>
              <div className={`flex items-center gap-2 ${textStyles.meta}`}>
                {publishedAt && (
                  <time dateTime={publishedAt}>
                    {format(new Date(publishedAt), 'MMM d, yyyy')}
                  </time>
                )}
                {estimatedReadTime && publishedAt && <span>•</span>}
                {estimatedReadTime && (
                  <span>{estimatedReadTime} min read</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {additionalInfo && (
        <div className={textStyles.meta}>
          {additionalInfo}
        </div>
      )}
    </div>
  )
}