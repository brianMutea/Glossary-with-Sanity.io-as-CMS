import { sanityFetch } from '@/sanity/live'
import { POSTS_QUERY } from '@/sanity/queries'
import { BlogCard } from '@/components/BlogCard'

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#FFD700] mb-6">All Articles</h1>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto leading-relaxed">
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
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">No articles published yet</h3>
            <p className="text-[#E0E0E0] mb-8">Start creating amazing content for your readers.</p>
            <a 
              href="http://localhost:3333" 
              target="_blank"
              className="inline-block bg-[#FFD700] text-[#121212] px-8 py-3 rounded font-bold hover:bg-[#E6C200] transition-colors"
            >
              Create Your First Post
            </a>
          </div>
        )}
      </div>
    </div>
  )
}