import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { SeriesPostCard } from '@/components/SeriesPostCard'
import { getImageUrl } from '@/sanity/image'

// Query for series details and posts
const SERIES_QUERY = `*[_type == "series" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  status,
  estimatedParts,
  coverImage{
    asset->{
      _id,
      url
    },
    alt
  }
}`

const SERIES_POSTS_QUERY = `*[_type == "blogPost" && series->slug.current == $slug] | order(publishedAt asc) {
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

const SERIES_SLUGS_QUERY = `*[_type == "series" && defined(slug.current)]{
  "slug": slug.current
}`

interface Props {
  params: Promise<{ slug: string }>
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params

  const [seriesResult, postsResult] = await Promise.all([
    sanityFetch({ query: SERIES_QUERY, params: { slug } }),
    sanityFetch({ query: SERIES_POSTS_QUERY, params: { slug } })
  ])

  const series = seriesResult.data
  const posts = postsResult.data

  if (!series) {
    notFound()
  }

  const coverImageUrl = getImageUrl(series.coverImage, 1200, 400)
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Series Header */}
      <section className="bg-white">
        {coverImageUrl && (
          <div className="relative h-64 md:h-80">
            <Image
              src={coverImageUrl}
              alt={series.coverImage?.alt || series.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-purple-600">📚 SERIES</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[series.status as keyof typeof statusColors] || statusColors.draft}`}>
              {series.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {series.title}
          </h1>

          {series.description && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {series.description}
            </p>
          )}

          {/* Series Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{posts.length}</span>
              <span>parts published</span>
            </div>
            {series.estimatedParts && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{series.estimatedParts}</span>
                <span>parts planned</span>
              </div>
            )}
            {posts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {Math.round(posts.reduce((acc: number, post: any) => acc + (post.estimatedReadTime || 5), 0))}
                </span>
                <span>total minutes</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Series Posts */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 || series.estimatedParts ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Learning Path
                </h2>
                <div className="text-sm text-gray-600">
                  {posts.length} of {series.estimatedParts || posts.length} parts
                </div>
              </div>

              {/* Progress Bar */}
              {series.estimatedParts && (
                <div className="mb-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span className="font-medium">Series Progress</span>
                    <span className="font-bold text-purple-600">
                      {Math.round((posts.length / series.estimatedParts) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min((posts.length / series.estimatedParts) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{posts.length} published</span>
                    <span>{(series.estimatedParts || 0) - posts.length} remaining</span>
                  </div>
                </div>
              )}

              {/* Series Timeline */}
              <div className="space-y-8">
                {/* Published Posts */}
                {posts.map((post: any, index: number) => (
                  <SeriesPostCard
                    key={post._id}
                    post={post}
                    index={index}
                    isCompleted={true}
                  />
                ))}

                {/* Upcoming Posts (if estimated parts > published) */}
                {series.estimatedParts && series.estimatedParts > posts.length && (
                  <>
                    {Array.from({ length: Math.min(3, series.estimatedParts - posts.length) }).map((_, index) => (
                      <SeriesPostCard
                        key={`upcoming-${index}`}
                        post={{
                          title: "Coming Soon...",
                          excerpt: "This part of the series is currently being written. Stay tuned!",
                          slug: { current: "#" }
                        }}
                        index={posts.length + index}
                        isCompleted={false}
                      />
                    ))}

                    {series.estimatedParts - posts.length > 3 && (
                      <div className="flex gap-4 items-center">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center font-bold text-sm border-2 border-dashed border-gray-300">
                          ...
                        </div>
                        <div className="flex-1 text-center py-8 text-gray-500">
                          <p className="text-sm">
                            And {series.estimatedParts - posts.length - 3} more parts coming soon!
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Following this series?
                </h3>
                <p className="text-gray-600 mb-4">
                  Get notified when new parts are published
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-md">
                  Subscribe to Updates
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No parts published yet
              </h3>
              <p className="text-gray-600">
                This series is still in development. Check back soon for new parts!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const series = await buildSafeFetch(SERIES_SLUGS_QUERY)

  return series.map((s: any) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const series = await buildSafeFetch(SERIES_QUERY, { slug })

  if (!series) {
    return {
      title: 'Series Not Found',
    }
  }

  return {
    title: `${series.title} - Tech Glossary`,
    description: series.description || `Follow the ${series.title} series on Tech Glossary`,
  }
}