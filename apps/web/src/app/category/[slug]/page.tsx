import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { notFound } from 'next/navigation'
import { BlogCard } from '@/components/BlogCard'

// Query for category details and posts
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  color
}`

const CATEGORY_POSTS_QUERY = `*[_type == "blogPost" && $slug in categories[]->slug.current] | order(publishedAt desc) {
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

const CATEGORIES_SLUGS_QUERY = `*[_type == "category" && defined(slug.current)]{
  "slug": slug.current
}`

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const [categoryResult, postsResult] = await Promise.all([
    sanityFetch({ query: CATEGORY_QUERY, params: { slug } }),
    sanityFetch({ query: CATEGORY_POSTS_QUERY, params: { slug } })
  ])

  const category = categoryResult.data
  const posts = postsResult.data

  if (!category) {
    notFound()
  }

  const bgColor = category.color?.hex || '#2563eb'
  const lightBgColor = category.color?.hex ? `${category.color.hex}15` : '#dbeafe'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section 
        className="py-20"
        style={{ backgroundColor: lightBgColor }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
               style={{ backgroundColor: bgColor, color: 'white' }}>
            📂 CATEGORY
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: bgColor }}>
            {category.title}
          </h1>
          
          {category.description && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {category.description}
            </p>
          )}

          <div className="text-lg text-gray-600">
            <span className="font-semibold" style={{ color: bgColor }}>
              {posts.length}
            </span>
            {' '}
            {posts.length === 1 ? 'article' : 'articles'} in this category
          </div>
        </div>
      </section>

      {/* Category Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Latest Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600">
                No articles have been published in the {category.title} category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await buildSafeFetch(CATEGORIES_SLUGS_QUERY)

  return categories.map((category: any) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = await buildSafeFetch(CATEGORY_QUERY, { slug })

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Glossifyd`,
    description: category.description || `Browse ${category.title} articles on Glossifyd`,
  }
}