import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { GLOSSARY_TERM_QUERY, GLOSSARY_TERMS_SLUGS_QUERY } from '@/sanity/queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'
import { getImageUrl } from '@/sanity/image'
import { GlossaryModalContent } from '@/components/GlossaryModalContent'

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
      <h1 className="text-3xl font-bold text-[#FFD700] mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-[#FFD700] mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-[#00BFFF] mt-4 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#E0E0E0] mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#00BFFF] pl-4 py-2 my-6 bg-[#00BFFF] bg-opacity-10 italic text-[#E0E0E0]">
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
      <li className="text-[#E0E0E0]">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-[#E0E0E0]">
        {children}
      </li>
    ),
  },
  marks: {
    code: ({ children }: any) => (
      <code className="bg-[#333333] text-[#39FF14] px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-[#FFFFFF]">
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
        className="text-[#00BFFF] hover:text-[#FFD700] underline transition-colors"
        target={value.href.startsWith('http') ? '_blank' : undefined}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

const levelColors = {
  beginner: 'bg-[#39FF14] text-[#121212] border-[#39FF14]',
  intermediate: 'bg-[#FFD700] text-[#121212] border-[#FFD700]',
  advanced: 'bg-[#FF6F61] text-[#121212] border-[#FF6F61]',
}

const domainColors = {
  'ai': 'bg-[#E6E6FA] text-[#121212]',
  'ml': 'bg-[#00BFFF] text-[#121212]',
  'data-science': 'bg-[#39FF14] text-[#121212]',
  'software-engineering': 'bg-[#E0E0E0] text-[#121212]',
  'math': 'bg-[#E6E6FA] text-[#121212]',
  'statistics': 'bg-[#FF6F61] text-[#121212]',
  'deep-learning': 'bg-[#E6E6FA] bg-opacity-20 text-[#E6E6FA]',
  'computer-vision': 'bg-[#FFD700] bg-opacity-20 text-[#FFD700]',
  'nlp': 'bg-[#FF6F61] bg-opacity-20 text-[#FF6F61]',
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <section className="bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-[#E0E0E0]">
              <li><Link href="/" className="hover:text-[#00BFFF]">Home</Link></li>
              <li>→</li>
              <li><Link href="/glossary" className="hover:text-[#00BFFF]">Glossary</Link></li>
              <li>→</li>
              <li className="text-[#FFD700] font-medium">{term.term}</li>
            </ol>
          </nav>

          {/* Term Header */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl md:text-4xl">{typeIcon}</span>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFD700] mb-2 break-words">
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
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#333333] text-[#E0E0E0]">
                      {term.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Short Definition */}
              <p className="text-xl text-[#E0E0E0] leading-relaxed mb-6">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Deep Explanation */}
              {term.fullExplanation && (
                <div>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Deep Explanation</h2>
                  <div className="max-w-none glossary-content">
                    <PortableText value={term.fullExplanation} components={portableTextComponents} />
                  </div>
                </div>
              )}

              {/* Code Examples */}
              {term.codeExamples && term.codeExamples.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Code Examples</h2>
                  <div className="space-y-6 glossary-content">
                    {term.codeExamples.map((example: any, index: number) => (
                      <CodeBlock
                        key={index}
                        code={example.code}
                        language={example.language}
                        filename={example.filename}
                        theme="dark"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Real-world Use */}
              {term.realWorldUse && (
                <div>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Real-world Applications</h2>
                  <p className="text-[#E0E0E0] leading-relaxed">
                    {term.realWorldUse}
                  </p>
                </div>
              )}

              {/* External Links */}
              {term.externalLinks && term.externalLinks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-6">External Resources</h2>
                  <div className="space-y-3">
                    {term.externalLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                      >
                        <span className="text-lg">
                          {link.sourceType === 'video' ? '🎥' : 
                           link.sourceType === 'docs' ? '📖' : 
                           link.sourceType === 'paper' ? '📄' : 
                           link.sourceType === 'course' ? '🎓' : '🔗'}
                        </span>
                        <div>
                          <div className="font-medium text-[#FFFFFF]">{link.title}</div>
                          <div className="text-sm text-[#E0E0E0] capitalize">{link.sourceType}</div>
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
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">📖 Related Tutorial</h3>
                  <Link 
                    href={`/blog/${term.tutorialArticle.slug.current}`}
                    className="block p-4 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                  >
                    <h4 className="font-medium text-[#FFFFFF] mb-2">{term.tutorialArticle.title}</h4>
                    {term.tutorialArticle.excerpt && (
                      <p className="text-sm text-[#E0E0E0] mb-2">{term.tutorialArticle.excerpt}</p>
                    )}
                    <div className="text-sm text-[#00BFFF]">
                      By {term.tutorialArticle.author?.name} →
                    </div>
                  </Link>
                </div>
              )}

              {/* Prerequisites */}
              {term.prerequisites && term.prerequisites.length > 0 && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">📚 Prerequisites</h3>
                  <div className="space-y-2">
                    {term.prerequisites.map((prereq: any) => (
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

              {/* Next Concepts */}
              {term.nextConcepts && term.nextConcepts.length > 0 && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">🚀 What to Learn Next</h3>
                  <div className="space-y-2">
                    {term.nextConcepts.map((next: any) => (
                      <Link
                        key={next.slug.current}
                        href={`/glossary/${next.slug.current}`}
                        className="block p-3 border border-[#333333] rounded-lg hover:border-[#00BFFF] hover:bg-[#00BFFF] hover:bg-opacity-10 transition-colors"
                      >
                        <div className="font-medium text-[#FFFFFF]">{next.term}</div>
                        <div className="text-sm text-[#E0E0E0]">{next.shortDefinition}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {term.tags && term.tags.length > 0 && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm border border-[#333333]">
                  <h3 className="text-lg font-bold text-[#FFD700] mb-4">🏷️ Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {term.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-[#333333] text-[#E0E0E0] rounded-md"
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
              <h2 className="text-2xl font-bold text-[#FFD700] mb-8">Related Concepts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {term.relatedTerms.map((related: any) => (
                  <div
                    key={related.slug.current}
                    className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-3xl transition-shadow duration-200"
                    style={{ maxHeight: '500px' }}
                  >
                    <GlossaryModalContent term={related} />
                  </div>
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