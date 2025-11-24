import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/sanity/image'
import { SocialLinks } from './SocialLinks'

interface AuthorCardProps {
  author: {
    _id: string
    name: string
    slug: { current: string }
    avatar?: {
      asset: { _id: string; url: string }
      alt?: string
    }
    bio?: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
      website?: string
    }
  }
}

export function AuthorCard({ author }: AuthorCardProps) {
  const avatarUrl = getImageUrl(author.avatar, 120, 120)

  return (
    <div className="bg-[#1A1A1A] border border-[#333333] rounded p-6 text-center hover:border-[#00BFFF] transition-all duration-200 hover:scale-105">
      <div className="mb-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={author.avatar?.alt || author.name}
            width={80}
            height={80}
            className="rounded-full mx-auto"
          />
        ) : (
          <div className="w-20 h-20 bg-[#333333] rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-[#FFD700]">
            {author.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">
        <Link 
          href={`/author/${author.slug.current}`}
          className="hover:text-[#00BFFF] transition-colors"
        >
          {author.name}
        </Link>
      </h3>
      
      {author.bio && (
        <p className="text-[#E0E0E0] text-sm mb-4 line-clamp-3">
          {author.bio}
        </p>
      )}

      {author.social && (
        <SocialLinks social={author.social} variant="icons" className="justify-center" />
      )}
    </div>
  )
}