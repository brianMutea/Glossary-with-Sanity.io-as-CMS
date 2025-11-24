import { sanityFetch } from '@/sanity/live'
import { AUTHORS_QUERY } from '@/sanity/queries'
import { AuthorCard } from '@/components/AuthorCard'

export default async function AuthorsPage() {
  const { data: authors } = await sanityFetch({ query: AUTHORS_QUERY })

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-[#121212] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            Our Authors
          </h1>
          <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto leading-relaxed">
            Meet the talented writers and developers who share their knowledge and expertise on Tech Glossary.
          </p>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {authors.map((author: any) => (
                <AuthorCard key={author._id} author={author} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">👥</div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
                No authors yet
              </h3>
              <p className="text-[#E0E0E0] text-lg">
                Authors will appear here once they're added to the system.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Authors - Tech Glossary',
  description: 'Meet the talented writers and developers who contribute to Tech Glossary.',
}