import { sanityFetch } from '@/sanity/live'
import { SERIES_QUERY } from '@/sanity/queries'
import { SeriesCard } from '@/components/SeriesCard'

export default async function SeriesPage() {
  const { data: series } = await sanityFetch({ query: SERIES_QUERY })

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-[#121212] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            Learning Series
          </h1>
          <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto leading-relaxed">
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
                <span className="text-sm font-medium text-[#FFD700]">Filter by status:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs bg-[#39FF14] bg-opacity-20 text-[#39FF14] rounded-full cursor-pointer hover:bg-opacity-30 transition-colors">
                    Completed ({series.filter((s: any) => s.status === 'completed').length})
                  </span>
                  <span className="px-3 py-1 text-xs bg-[#FFD700] bg-opacity-20 text-[#FFD700] rounded-full cursor-pointer hover:bg-opacity-30 transition-colors">
                    In Progress ({series.filter((s: any) => s.status === 'in-progress').length})
                  </span>
                  <span className="px-3 py-1 text-xs bg-[#E0E0E0] bg-opacity-20 text-[#E0E0E0] rounded-full cursor-pointer hover:bg-opacity-30 transition-colors">
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
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
                No series yet
              </h3>
              <p className="text-[#E0E0E0] text-lg">
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