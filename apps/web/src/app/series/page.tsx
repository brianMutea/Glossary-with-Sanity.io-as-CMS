import { sanityFetch } from '@/sanity/live'
import { SERIES_QUERY } from '@/sanity/queries'
import { SeriesCard } from '@/components/SeriesCard'

export default async function SeriesPage() {
  const { data: series } = await sanityFetch({ query: SERIES_QUERY })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learning Series
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into comprehensive learning paths. Our series break down complex topics into digestible, sequential parts.
          </p>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {series.length > 0 ? (
            <>
              {/* Filter by Status */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full cursor-pointer hover:bg-green-200 transition-colors">
                    Completed ({series.filter((s: any) => s.status === 'completed').length})
                  </span>
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full cursor-pointer hover:bg-yellow-200 transition-colors">
                    In Progress ({series.filter((s: any) => s.status === 'in-progress').length})
                  </span>
                  <span className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                    Draft ({series.filter((s: any) => s.status === 'draft').length})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {series.map((seriesItem: any) => (
                  <SeriesCard key={seriesItem._id} series={seriesItem} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No series yet
              </h3>
              <p className="text-gray-600">
                Learning series will appear here once they're created.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Learning Series - Tech Glossary',
  description: 'Explore comprehensive learning paths and tutorial series on Tech Glossary.',
}