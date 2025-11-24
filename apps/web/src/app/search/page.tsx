import { Suspense } from 'react'
import { SearchResults } from '@/components/SearchResults'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-[#333333] rounded w-1/3 animate-pulse"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333333]">
            <div className="h-6 bg-[#333333] rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-[#333333] rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-[#333333] rounded w-2/3 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}