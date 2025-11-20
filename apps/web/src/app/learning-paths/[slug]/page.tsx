import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { LEARNING_PATH_QUERY, LEARNING_PATHS_SLUGS_QUERY } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/sanity/image'
import { GlossaryCard } from '@/components/GlossaryCard'

interface Props {
  params: Promise<{ slug: string }>
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
  mixed: 'bg-purple-100 text-purple-800 border-purple-200',
}

const domainColors = {
  'ai': 'bg-purple-100 text-purple-800',
  'ml': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'software-engineering': 'bg-gray-100 text-gray-800',
  'deep-learning': 'bg-violet-100 text-violet-800',
  'computer-vision': 'bg-emerald-100 text-emerald-800',
  'nlp': 'bg-orange-100 text-orange-800',
}

export default async function LearningPathPage({ params }: Props) {
  const { slug } = await params

  const { data: path } = await sanityFetch({ 
    query: LEARNING_PATH_QUERY, 
    params: { slug } 
  })

  if (!path) {
    notFound()
  }

  const coverImageUrl = path.coverImage ? getImageUrl(path.coverImage, 1200, 400) : null
  const levelColor = levelColors[path.level as keyof typeof levelColors] || levelColors.beginner
  const domainColor = domainColors[path.domain as keyof typeof domainColors] || domainColors['software-engineering']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white">
        {coverImageUrl && (
          <div className="relative h-64 md:h-80">
            <Image
              src={coverImageUrl}
              alt={path.coverImage?.alt || path.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li>→</li>
              <li><Link href="/learning-paths" className="hover:text-gray-700">Learning Paths</Link></li>
              <li>→</li>
              <li className="text-gray-900 font-medium">{path.title}</li>
            </ol>
          </nav>

          {/* Path Header */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🗺️</span>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {path.title}
                  </h1>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${levelColor}`}>
                      {path.level}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${domainColor}`}>
                      {path.domain.replace('-', ' ')}
                    </span>
                    {path.estimatedDuration && (
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                        ⏱️ {path.estimatedDuration}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {path.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  📚 {path.topics?.length || 0} concepts
                </span>
                {path.prerequisites && path.prerequisites.length > 0 && (
                  <span className="flex items-center gap-2">
                    📋 {path.prerequisites.length} prerequisites
                  </span>
                )}
                {path.tutorialSeries && (
                  <span className="flex items-center gap-2 text-blue-600">
                    🎓 Tutorial series included
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Learning Sequence */}
              {path.topics && path.topics.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Learning Sequence</h2>
                  
                  {/* Progress Bar */}
                  <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span className="font-medium">Your Progress</span>
                      <span className="font-bold text-blue-600">0% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm w-0" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Start here</span>
                      <span>{path.topics.length} concepts to master</span>
                    </div>
                  </div>

                  {/* Topics Timeline */}
                  <div className="space-y-8">
                    {path.topics.map((topic: any, index: number) => (
                      <div key={topic.slug.current} className="flex gap-6">
                        {/* Step Number */}
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg border-2 border-blue-200">
                          {index + 1}
                        </div>
                        
                        {/* Topic Card */}
                        <div className="flex-1">
                          <GlossaryCard term={topic} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutorial Series */}
              {path.tutorialSeries && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 Related Tutorial Series</h2>
                  <Link 
                    href={`/series/${path.tutorialSeries.slug.current}`}
                    className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{path.tutorialSeries.title}</h3>
                    {path.tutorialSeries.description && (
                      <p className="text-gray-600 mb-4">{path.tutorialSeries.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        path.tutorialSeries.status === 'completed' ? 'bg-green-100 text-green-800' :
                        path.tutorialSeries.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {path.tutorialSeries.status?.replace('-', ' ')}
                      </span>
                      <span className="text-blue-600 font-medium">
                        Read series →
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Prerequisites */}
              {path.prerequisites && path.prerequisites.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Prerequisites</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Make sure you understand these concepts first:
                  </p>
                  <div className="space-y-2">
                    {path.prerequisites.map((prereq: any) => (
                      <Link
                        key={prereq.slug.current}
                        href={`/glossary/${prereq.slug.current}`}
                        className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{prereq.term}</div>
                        <div className="text-sm text-gray-600">{prereq.shortDefinition}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Paths */}
              {path.relatedPaths && path.relatedPaths.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 Related Paths</h3>
                  <div className="space-y-3">
                    {path.relatedPaths.map((related: any) => (
                      <Link
                        key={related.slug.current}
                        href={`/learning-paths/${related.slug.current}`}
                        className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{related.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{related.description}</div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${levelColors[related.level as keyof typeof levelColors]}`}>
                            {related.level}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${domainColors[related.domain as keyof typeof domainColors]}`}>
                            {related.domain.replace('-', ' ')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start Learning Path
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Save for Later
                  </button>
                  <Link
                    href="/glossary"
                    className="block w-full px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Browse All Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const paths = await buildSafeFetch(LEARNING_PATHS_SLUGS_QUERY)
  return paths.map((path: any) => ({
    slug: path.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const path = await buildSafeFetch(LEARNING_PATH_QUERY, { slug })

  if (!path) {
    return {
      title: 'Learning Path Not Found',
    }
  }

  return {
    title: `${path.title} - Learning Paths`,
    description: path.description || `Follow the ${path.title} learning path to master key concepts systematically.`,
  }
}