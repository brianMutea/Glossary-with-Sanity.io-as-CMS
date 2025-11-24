import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'
import { imageStyles } from '@/lib/designSystem'

interface ImageWithFallbackProps {
  image?: {
    asset: { _id: string; url: string }
    alt?: string
  }
  alt: string
  width: number
  height: number
  className?: string
  containerClassName?: string
  showOverlay?: boolean
  icon?: string
  iconPosition?: 'top-left' | 'top-right' | 'center'
  fallbackGradient?: string
  priority?: boolean
}

export function ImageWithFallback({
  image,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  showOverlay = false,
  icon,
  iconPosition = 'top-left',
  fallbackGradient,
  priority = false
}: ImageWithFallbackProps) {
  const imageUrl = image ? getImageUrl(image, width, height) : null

  if (!imageUrl && !fallbackGradient && !icon) {
    return null
  }

  const iconPositionClasses = {
    'top-left': 'absolute top-3 left-3',
    'top-right': 'absolute top-3 right-3',
    'center': 'absolute inset-0 flex items-center justify-center'
  }

  return (
    <div className={`${imageStyles.container} ${containerClassName}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={image?.alt || alt}
          fill
          className={`${imageStyles.image} ${imageStyles.imageHover} ${className}`}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : fallbackGradient ? (
        <div className={`absolute inset-0 ${fallbackGradient}`} />
      ) : null}
      
      {showOverlay && <div className={imageStyles.overlay} />}
      
      {icon && (
        <div className={iconPositionClasses[iconPosition]}>
          <span className={imageStyles.iconBadge}>
            {icon}
          </span>
        </div>
      )}
    </div>
  )
}