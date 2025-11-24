import { sanityFetch } from '@/sanity/live'
import { POSTS_QUERY } from '@/sanity/queries'
import { BlogCard } from '@/components/BlogCard'

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our collection of programming tutorials and technical articles
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles published yet.</p>
          <a 
            href="http://localhost:3333" 
            target="_blank"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Post
          </a>
        </div>
      )}
    </div>
  )
}