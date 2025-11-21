import { sanityFetch } from '@/sanity/live'
import { FEATURED_POSTS_QUERY, CATEGORIES_QUERY, AUTHORS_QUERY, SERIES_QUERY } from '@/sanity/queries'
import { BlogCard } from '@/components/BlogCard'
import { CategoryCard } from '@/components/CategoryCard'
import { AuthorCard } from '@/components/AuthorCard'
import { SeriesCard } from '@/components/SeriesCard'
import { Hero } from '@/components/Hero'


export default async function HomePage() {
  try {
    const [postsResult, categoriesResult, authorsResult, seriesResult] = await Promise.all([
      sanityFetch({ query: FEATURED_POSTS_QUERY }),
      sanityFetch({ query: CATEGORIES_QUERY }),
      sanityFetch({ query: AUTHORS_QUERY }),
      sanityFetch({ query: SERIES_QUERY })
    ])

    const posts = postsResult.data
    const categories = categoriesResult.data
    const authors = authorsResult.data
    const series = seriesResult.data
    const featuredPosts = posts.slice(0, 4)
    const recentPosts = posts.slice(4, 8)

    return (
      <div>
        <Hero />
        
        {/* Glossary Preview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore AI & ML Concepts</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover and understand key concepts through our interactive glossary. Each term includes definitions, examples, and learning connections.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Quick Access Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Glossary Terms</h3>
                <p className="text-gray-600 mb-4">Interactive definitions with examples and connections</p>
                <a href="/glossary" className="text-blue-600 font-medium hover:text-blue-700">
                  Explore Terms →
                </a>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">🕸️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Knowledge Graph</h3>
                <p className="text-gray-600 mb-4">Visual map of how concepts connect and relate</p>
                <a href="/knowledge-graph" className="text-indigo-600 font-medium hover:text-indigo-700">
                  Explore Graph →
                </a>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Learning Paths</h3>
                <p className="text-gray-600 mb-4">Structured journeys from beginner to advanced</p>
                <a href="/learning-paths" className="text-purple-600 font-medium hover:text-purple-700">
                  Start Learning →
                </a>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tutorials</h3>
                <p className="text-gray-600 mb-4">In-depth articles and hands-on guides</p>
                <a href="/blog" className="text-green-600 font-medium hover:text-green-700">
                  Read Tutorials →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Tutorials</h2>
                <a
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  View all tutorials →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post: any) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Series Section */}
        {series.length > 0 && (
          <section className="py-16 bg-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Learning Series</h2>
                <a
                  href="/series"
                  className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  View all series →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {series.slice(0, 4).map((seriesItem: any) => (
                  <SeriesCard key={seriesItem._id} series={seriesItem} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
                <a
                  href="/categories"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  View all categories →
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.slice(0, 8).map((category: any) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Authors Section */}
        {authors.length > 0 && (
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Meet Our Authors</h2>
                <a
                  href="/authors"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  View all authors →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {authors.slice(0, 4).map((author: any) => (
                  <AuthorCard key={author._id} author={author} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post: any) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Tech Glossary</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Your blog is ready! Start by creating some content in your Sanity Studio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">📝 Create Content</h3>
                  <p className="text-gray-600 mb-4">
                    Go to your Sanity Studio to create authors, categories, and blog posts.
                  </p>
                  <a 
                    href="http://localhost:3333" 
                    target="_blank"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Open Studio
                  </a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">🚀 Start Writing</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first blog post with rich content and code blocks.
                  </p>
                  <div className="text-sm text-gray-500">
                    Posts: {posts.length} | Categories: {categories.length}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return (
      <div>
        <Hero />
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your blog is ready! Start your Sanity Studio to begin creating content.
            </p>
            <a 
              href="http://localhost:3333" 
              target="_blank"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Sanity Studio
            </a>
          </div>
        </section>
      </div>
    )
  }
}
