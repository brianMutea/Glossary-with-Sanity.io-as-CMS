import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { LEARNING_PATH_QUERY, LEARNING_PATHS_SLUGS_QUERY } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/sanity/image'
import { GlossaryCard } from '@/components/GlossaryCard'
import { Badge } from '@/components/ui/Badge'

interface Props {
  params: Promise<{ slug: string }>
}

const levelColors = {
  beginner: 'bg-[#39FF14] bg-opacity-20 text-[#39FF14] border-[#39FF14]',
  intermediate: 'bg-[#FFD700] bg-opacity-20 text-[#FFD700] border-[#FFD700]',
  advanced: 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61] border-[#FF6F61]',
  mixed: 'bg-[#E6E6FA] bg-opacity-20 text-[#E6E6FA] border-[#E6E6FA]',
}

const domainColors = {
  'ai': 'bg-[#E6E6FA] bg-opacity-20 text-[#E6E6FA]',
  'ml': 'bg-[#00BFFF] bg-opacity-20 text-[#00BFFF]',
  'data-science': 'bg-[#39FF14] bg-opacity-20 text-[#39FF14]',
  'software-engineering': 'bg-[#E0E0E0] bg-opacity-20 text-[#E0E0E0]',
  'deep-learning': 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61]',
  'computer-vision': 'bg-[#FFD700] bg-opacity-20 text-[#FFD700]',
  'nlp': 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61]',
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-[#121212]">
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
            <ol className="flex items-center space-x-2 text-sm text-[#E0E0E0]">
              <li><Link href="/" className="hover:text-[#00BFFF]">Home</Link></li>
              <li>→</li>
              <li><Link href="/learning-paths" className="hover:text-[#00BFFF]">Learning Paths</Link></li>
              <li>→</li>
              <li className="text-[#FFD700] font-medium">{path.title}</li>
            </ol>
          </nav>

          {/* Path Header */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🗺️</span>
                <div>
                  <h1 className="text-4xl font-bold text-[#FFD700] mb-2">
                    {path.title}
                  </h1>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="level" value={path.level} size="md">
                      {path.level}
                    </Badge>
                    <Badge variant="domain" value={path.domain} size="md">
                      {path.domain.replace('-', ' ')}
                    </Badge>
                    {path.estimatedDuration && (
                      <Badge variant="custom" size="md">
                        ⏱️ {path.estimatedDuration}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-[#E0E0E0] leading-relaxed mb-6">
                {path.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-[#E0E0E0]">
                <span className="flex items-center gap-2">
                  📚 {path.topics?.length || 0} concepts
                </span>
                {path.prerequisites && path.prerequisites.length > 0 && (
                  <span className="flex items-center gap-2">
                    📋 {path.prerequisites.length} prerequisites
                  </span>
                )}
                {path.tutorialSeries && (
                  <span className="flex items-center gap-2 text-[#00BFFF]">
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
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-8">Learning Sequence</h2>
                  
                  {/* Progress Bar */}
                  <div className="mb-8 bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                    <div className="flex justify-between text-sm text-[#E0E0E0] mb-3">
                      <span className="font-medium">Your Progress</span>
                      <span className="font-bold text-[#00BFFF]">0% Complete</span>
                    </div>
                    <div className="w-full bg-[#333333] rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00BFFF] to-[#FFD700] h-3 rounded-full transition-all duration-500 shadow-sm w-0" />
                    </div>
                    <div className="flex justify-between text-xs text-[#E0E0E0] mt-2">
                      <span>Start here</span>
                      <span>{path.topics.length} concepts to master</span>
                    </div>
                  </div>

                  {/* Topics Timeline */}
                  <div className="space-y-8">
                    {path.topics.map((topic: any, index: number) => (
                      <div key={topic.slug.current} className="flex gap-6">
                        {/* Step Number */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-2xl text-[#FFD700]">
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
                <div className="bg-[#1A1A1A] rounded-xl p-8 shadow-sm border border-[#333333]">
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-6">📖 Related Tutorial Series</h2>
                  <Link 
                    href={`/series/${path.tutorialSeries.slug.current}`}
                    className="block p-6 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">{path.tutorialSeries.title}</h3>
                    {path.tutorialSeries.description && (
                      <p className="text-[#E0E0E0] mb-4">{path.tutorialSeries.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        path.tutorialSeries.status === 'completed' ? 'bg-[#39FF14] text-[#121212]' :
                        path.tutorialSeries.status === 'in-progress' ? 'bg-[#FFD700] text-[#121212]' :
                        'bg-[#333333] text-[#E0E0E0]'
                      }`}>
                        {path.tutorialSeries.status?.replace('-', ' ')}
                      </span>
                      <span className="text-[#00BFFF] font-medium">
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
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">📋 Prerequisites</h3>
                  <p className="text-sm text-[#E0E0E0] mb-4">
                    Make sure you understand these concepts first:
                  </p>
                  <div className="space-y-2">
                    {path.prerequisites.map((prereq: any) => (
                      <Link
                        key={prereq.slug.current}
                        href={`/glossary/${prereq.slug.current}`}
                        className="block p-3 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                      >
                        <div className="font-medium text-[#FFFFFF]">{prereq.term}</div>
                        <div className="text-sm text-[#E0E0E0]">{prereq.shortDefinition}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Paths */}
              {path.relatedPaths && path.relatedPaths.length > 0 && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">🔗 Related Paths</h3>
                  <div className="space-y-3">
                    {path.relatedPaths.map((related: any) => (
                      <Link
                        key={related.slug.current}
                        href={`/learning-paths/${related.slug.current}`}
                        className="block p-3 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                      >
                        <div className="font-medium text-[#FFFFFF]">{related.title}</div>
                        <div className="text-sm text-[#E0E0E0] mb-2">{related.description}</div>
                        <div className="flex gap-2">
                          <Badge variant="level" value={related.level} size="xs">
                            {related.level}
                          </Badge>
                          <Badge variant="domain" value={related.domain} size="xs">
                            {related.domain.replace('-', ' ')}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                <h3 className="text-lg font-bold text-[#FFD700] mb-4">🚀 Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-[#00BFFF] text-[#121212] rounded-lg hover:bg-[#0099CC] transition-colors font-bold">
                    Start Learning Path
                  </button>
                  <button className="w-full px-4 py-2 border border-[#333333] text-[#E0E0E0] rounded-lg hover:bg-[#333333] transition-colors">
                    Save for Later
                  </button>
                  <Link
                    href="/glossary"
                    className="block w-full px-4 py-2 text-center border border-[#333333] text-[#E0E0E0] rounded-lg hover:bg-[#333333] transition-colors"
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