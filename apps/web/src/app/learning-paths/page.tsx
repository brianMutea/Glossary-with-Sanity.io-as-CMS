import { sanityFetch } from '@/sanity/live'
import { LEARNING_PATHS_QUERY } from '@/sanity/queries'
import { LearningPathCard } from '@/components/LearningPathCard'

export default async function LearningPathsPage() {
  const { data: paths } = await sanityFetch({ query: LEARNING_PATHS_QUERY })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learning Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Structured learning journeys that guide you through AI, ML, and Data Science concepts 
            in the right order. Each path builds knowledge systematically from fundamentals to advanced topics.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{paths.length}</div>
              <div className="text-sm text-gray-600">Learning Paths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {paths.filter((p: any) => p.level === 'beginner').length}
              </div>
              <div className="text-sm text-gray-600">Beginner Paths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {paths.filter((p: any) => p.level === 'intermediate').length}
              </div>
              <div className="text-sm text-gray-600">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {paths.filter((p: any) => p.level === 'advanced').length}
              </div>
              <div className="text-sm text-gray-600">Advanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paths.length > 0 ? (
            <>
              {/* Filter by Level */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Level</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['beginner', 'intermediate', 'advanced', 'mixed'].map((level) => {
                    const levelPaths = paths.filter((p: any) => p.level === level)
                    if (levelPaths.length === 0) return null
                    
                    const levelColors = {
                      beginner: 'bg-green-50 border-green-200 text-green-800',
                      intermediate: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                      advanced: 'bg-red-50 border-red-200 text-red-800',
                      mixed: 'bg-purple-50 border-purple-200 text-purple-800',
                    }
                    
                    return (
                      <div
                        key={level}
                        className={`p-4 rounded-lg border-2 ${levelColors[level as keyof typeof levelColors]}`}
                      >
                        <div className="text-lg font-bold capitalize">{level}</div>
                        <div className="text-sm">{levelPaths.length} paths available</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* All Paths */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paths.map((path: any) => (
                  <LearningPathCard key={path._id} path={path} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No learning paths yet
              </h3>
              <p className="text-gray-600">
                Learning paths will appear here once they're created in the Studio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure where to start?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our glossary to discover individual concepts, or browse our tutorials for in-depth learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/glossary"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Glossary
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Read Tutorials
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Learning Paths - Tech Glossary',
  description: 'Structured learning journeys for AI, Machine Learning, and Data Science. Follow curated paths from beginner to advanced levels.',
}