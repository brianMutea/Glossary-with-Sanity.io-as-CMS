import { sanityFetch } from '@/sanity/live'
import { LEARNING_PATHS_QUERY } from '@/sanity/queries'
import { LearningPathCard } from '@/components/LearningPathCard'

export default async function LearningPathsPage() {
  const { data: paths } = await sanityFetch({ query: LEARNING_PATHS_QUERY })

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-[#121212] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            Learning Paths
          </h1>
          <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto mb-8 leading-relaxed">
            Structured learning journeys that guide you through <span className="text-[#00BFFF]">AI</span>, <span className="text-[#39FF14]">ML</span>, and <span className="text-[#FF6F61]">Data Science</span> concepts 
            in the right order. Each path builds knowledge systematically from fundamentals to advanced topics.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00BFFF]">{paths.length}</div>
              <div className="text-sm text-[#E0E0E0]">Learning Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#39FF14]">
                {paths.filter((p: any) => p.level === 'beginner').length}
              </div>
              <div className="text-sm text-[#E0E0E0]">Beginner Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFD700]">
                {paths.filter((p: any) => p.level === 'intermediate').length}
              </div>
              <div className="text-sm text-[#E0E0E0]">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF6F61]">
                {paths.filter((p: any) => p.level === 'advanced').length}
              </div>
              <div className="text-sm text-[#E0E0E0]">Advanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {paths.length > 0 ? (
            <>
              {/* Filter by Level */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#FFD700] mb-8">Choose Your Level</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['beginner', 'intermediate', 'advanced', 'mixed'].map((level) => {
                    const levelPaths = paths.filter((p: any) => p.level === level)
                    if (levelPaths.length === 0) return null
                    
                    const levelColors = {
                      beginner: 'bg-[#39FF14] bg-opacity-20 border-[#39FF14] text-[#39FF14]',
                      intermediate: 'bg-[#FFD700] bg-opacity-20 border-[#FFD700] text-[#FFD700]',
                      advanced: 'bg-[#FF6F61] bg-opacity-20 border-[#FF6F61] text-[#FF6F61]',
                      mixed: 'bg-[#E6E6FA] bg-opacity-20 border-[#E6E6FA] text-[#E6E6FA]',
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
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
                No learning paths yet
              </h3>
              <p className="text-[#E0E0E0] text-lg">
                Learning paths will appear here once they're created in the Studio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-6">
            Not sure where to start?
          </h2>
          <p className="text-xl text-[#E0E0E0] mb-8 leading-relaxed">
            Explore our glossary to discover individual concepts, or browse our tutorials for in-depth learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/glossary"
              className="px-8 py-3 bg-[#FFD700] text-[#121212] rounded font-bold hover:bg-[#E6C200] transition-colors"
            >
              Browse Glossary
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border-2 border-[#00BFFF] text-[#00BFFF] rounded font-bold hover:bg-[#00BFFF] hover:text-[#121212] transition-colors"
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