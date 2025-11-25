import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { BlogCard } from '@/components/BlogCard'
import { getImageUrl } from '@/sanity/image'
import { SocialLinks } from '@/components/SocialLinks'

// Query for author details and their posts
const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  avatar{
    asset->{
      _id,
      url
    },
    alt
  },
  bio,
  social
}`

const AUTHOR_POSTS_QUERY = `*[_type == "blogPost" && author->slug.current == $slug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  updatedAt,
  estimatedReadTime,
  difficulty,
  tags,
  codeLanguages,
  githubRepo,
  liveDemo,
  "author": author->{
    name,
    slug,
    avatar{
      asset->{
        _id,
        url
      },
      alt
    },
    bio,
    social
  },
  "categories": categories[]->{
    title,
    slug,
    description,
    color
  },
  "series": series->{
    title,
    slug
  }
}`

const AUTHORS_SLUGS_QUERY = `*[_type == "author" && defined(slug.current)]{
  "slug": slug.current
}`

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params

  const [authorResult, postsResult] = await Promise.all([
    sanityFetch({ query: AUTHOR_QUERY, params: { slug } }),
    sanityFetch({ query: AUTHOR_POSTS_QUERY, params: { slug } })
  ])

  const author = authorResult.data
  const posts = postsResult.data

  if (!author) {
    notFound()
  }

  const avatarUrl = getImageUrl(author.avatar, 200, 200)

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Author Header */}
      <section className="bg-[#121212] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={author.avatar?.alt || author.name}
                  width={200}
                  height={200}
                  className="rounded-full shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-[#333333] rounded-full flex items-center justify-center text-6xl font-bold text-[#FFD700] shadow-lg">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
                {author.name}
              </h1>
              
              {author.bio && (
                <p className="text-xl text-[#E0E0E0] mb-6 leading-relaxed">
                  {author.bio}
                </p>
              )}

              {/* Social Links */}
              {author.social && (
                <SocialLinks 
                  social={author.social} 
                  variant="buttons" 
                  className="flex-wrap justify-center md:justify-start mb-6" 
                />
              )}

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-[#E0E0E0]">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFFFFF]">{posts.length}</div>
                  <div>Articles Published</div>
                </div>
                {posts.length > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FFFFFF]">
                      {(() => {
                        const postsWithReadTime = posts.filter((post: any) => post.estimatedReadTime && post.estimatedReadTime > 0)
                        if (postsWithReadTime.length === 0) return 'N/A'
                        
                        const totalTime = postsWithReadTime.reduce((acc: number, post: any) => acc + post.estimatedReadTime, 0)
                        return Math.round(totalTime / postsWithReadTime.length)
                      })()}
                    </div>
                    <div>Avg. Read Time (min)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8">
            Articles by {author.name}
          </h2>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
                No articles yet
              </h3>
              <p className="text-[#E0E0E0] text-lg">
                {author.name} hasn't published any articles yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const authors = await buildSafeFetch(AUTHORS_SLUGS_QUERY)

  return authors.map((author: any) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const author = await buildSafeFetch(AUTHOR_QUERY, { slug })

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.name} - Glossifyd`,
    description: author.bio || `Read articles by ${author.name} on Glossifyd`,
  }
}