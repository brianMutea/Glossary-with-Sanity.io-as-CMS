import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { GLOSSARY_TERM_QUERY, GLOSSARY_TERMS_SLUGS_QUERY } from '@/sanity/queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'
import { getImageUrl } from '@/sanity/image'
import { GlossaryCard } from '@/components/GlossaryCard'

interface Props {
  params: Promise<{ slug: string }>
}

const portableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <CodeBlock
        code={value.code}
        language={value.language}
        filename={value.filename}
        theme="light"
      />
    ),
    image: ({ value }: any) => {
      const imageUrl = getImageUrl(value, 800, 600)
      if (!imageUrl) return null
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="w-full rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-center text-gray-600 text-sm mt-3 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">
        {children}
      </li>
    ),
  },
  marks: {
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">
        {children}
      </em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target={value.href.startsWith('http') ? '_blank' : undefined}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
}

const domainColors = {
  'ai': 'bg-purple-100 text-purple-800',
  'ml': 'bg-blue-100 text-blue-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'software-engineering': 'bg-gray-100 text-gray-800',
  'math': 'bg-indigo-100 text-indigo-800',
  'statistics': 'bg-pink-100 text-pink-800',
  'deep-learning': 'bg-violet-100 text-violet-800',
  'computer-vision': 'bg-emerald-100 text-emerald-800',
  'nlp': 'bg-orange-100 text-orange-800',
}

const typeIcons = {
  algorithm: '⚡',
  model: '🧠',
  metric: '📊',
  library: '📚',
  technique: '🔧',
  concept: '💡',
  architecture: '🏗️',
  method: '🎯',
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params

  const { data: term } = await sanityFetch({ 
    query: GLOSSARY_TERM_QUERY, 
    params: { slug } 
  })

  if (!term) {
    notFound()
  }

  const imageUrl = term.image ? getImageUrl(term.image, 800, 400) : null
  const levelColor = levelColors[term.level as keyof typeof levelColors] || levelColors.beginner
  const domainColor = domainColors[term.domain as keyof typeof domainColors] || domainColors['software-engineering']
  const typeIcon = typeIcons[term.type as keyof typeof typeIcons] || '💡'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li>→</li>
              <li><Link href="/glossary" className="hover:text-gray-700">Glossary</Link></li>
              <li>→</li>
              <li className="text-gray-900 font-medium">{term.term}</li>
            </ol>
          </nav>

          {/* Term Header */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl md:text-4xl">{typeIcon}</span>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 break-words">
                    {term.term}
                  </h1>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${levelColor}`}>
                      {term.level}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${domainColor}`}>
                      {term.domain.replace('-', ' ')}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                      {term.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Short Definition */}
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {term.shortDefinition}
              </p>
            </div>

            {/* Image */}
            {imageUrl && (
              <div className="flex-shrink-0 w-full lg:w-auto">
                <Image
                  src={imageUrl}
                  alt={term.image?.alt || term.term}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md w-full lg:w-80 h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Deep Explanation */}
              {term.fullExplanation && (
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Deep Explanation</h2>
                  <div className="prose prose-lg max-w-none glossary-content">
                    <PortableText value={term.fullExplanation} components={portableTextComponents} />
                  </div>
                </div>
              )}

              {/* Code Examples */}
              {term.codeExamples && term.codeExamples.length > 0 && (
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Examples</h2>
                  <div className="space-y-6 glossary-content">
                    {term.codeExamples.map((example: any, index: number) => (
                      <CodeBlock
                        key={index}
                        code={example.code}
                        language={example.language}
                        filename={example.filename}
                        theme="light"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Real-world Use */}
              {term.realWorldUse && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-world Applications</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {term.realWorldUse}
                  </p>
                </div>
              )}

              {/* External Links */}
              {term.externalLinks && term.externalLinks.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">External Resources</h2>
                  <div className="space-y-3">
                    {term.externalLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-lg">
                          {link.sourceType === 'video' ? '🎥' : 
                           link.sourceType === 'docs' ? '📖' : 
                           link.sourceType === 'paper' ? '📄' : 
                           link.sourceType === 'course' ? '🎓' : '🔗'}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{link.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{link.sourceType}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Tutorial Article */}
              {term.tutorialArticle && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📖 Related Tutorial</h3>
                  <Link 
                    href={`/blog/${term.tutorialArticle.slug.current}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">{term.tutorialArticle.title}</h4>
                    {term.tutorialArticle.excerpt && (
                      <p className="text-sm text-gray-600 mb-2">{term.tutorialArticle.excerpt}</p>
                    )}
                    <div className="text-sm text-blue-600">
                      By {term.tutorialArticle.author?.name} →
                    </div>
                  </Link>
                </div>
              )}

              {/* Prerequisites */}
              {term.prerequisites && term.prerequisites.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Prerequisites</h3>
                  <div className="space-y-2">
                    {term.prerequisites.map((prereq: any) => (
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

              {/* Next Concepts */}
              {term.nextConcepts && term.nextConcepts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 What to Learn Next</h3>
                  <div className="space-y-2">
                    {term.nextConcepts.map((next: any) => (
                      <Link
                        key={next.slug.current}
                        href={`/glossary/${next.slug.current}`}
                        className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{next.term}</div>
                        <div className="text-sm text-gray-600">{next.shortDefinition}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {term.tags && term.tags.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🏷️ Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {term.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Concepts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {term.relatedTerms.map((related: any) => (
                  <GlossaryCard key={related.slug.current} term={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const terms = await buildSafeFetch(GLOSSARY_TERMS_SLUGS_QUERY)
  return terms.map((term: any) => ({
    slug: term.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const term = await buildSafeFetch(GLOSSARY_TERM_QUERY, { slug })

  if (!term) {
    return {
      title: 'Term Not Found',
    }
  }

  return {
    title: `${term.term} - AI & ML Glossary`,
    description: term.shortDefinition || `Learn about ${term.term} in our comprehensive AI and ML glossary.`,
  }
}