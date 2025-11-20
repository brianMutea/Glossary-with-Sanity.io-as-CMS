'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { GlossaryTextProcessor } from './GlossaryTextProcessor'
import Image from 'next/image'
import { CodeBlock } from './CodeBlock'
import { VideoEmbed } from './VideoEmbed'
import { getImageUrl } from '@/sanity/image'

interface GlossaryTerm {
  _id: string
  term: string
  slug: { current: string }
  shortDefinition: string
  level?: string
  domain?: string
}

interface EnhancedPortableTextProps {
  value: any
  glossaryTerms?: GlossaryTerm[]
}

export function EnhancedPortableText({ 
  value, 
  glossaryTerms = [] 
}: EnhancedPortableTextProps) {
  
  // Define all PortableText components inside the client component
  const portableTextComponents: PortableTextComponents = {
    types: {
      code: ({ value }: any) => (
        <CodeBlock
          code={value.code}
          language={value.language}
          filename={value.filename}
          theme="light"
        />
      ),
      videoEmbed: ({ value }: any) => (
        <VideoEmbed
          url={value.url}
          title={value.title}
          caption={value.caption}
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
      // Headings with glossary processing
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight first:mt-0">
          {processChildrenForGlossary(children, glossaryTerms)}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4 leading-tight">
          {processChildrenForGlossary(children, glossaryTerms)}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3 leading-tight">
          {processChildrenForGlossary(children, glossaryTerms)}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3 leading-tight">
          {processChildrenForGlossary(children, glossaryTerms)}
        </h4>
      ),
      // Paragraphs with glossary processing
      normal: ({ children }: any) => (
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {processChildrenForGlossary(children, glossaryTerms)}
        </p>
      ),
      // Blockquotes with glossary processing
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 italic text-gray-700 text-lg">
          {processChildrenForGlossary(children, glossaryTerms)}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 mb-6 space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-lg text-gray-700 leading-relaxed">
          {processChildrenForGlossary(children, glossaryTerms)}
        </li>
      ),
      number: ({ children }: any) => (
        <li className="text-lg text-gray-700 leading-relaxed">
          {processChildrenForGlossary(children, glossaryTerms)}
        </li>
      ),
    },
    marks: {
      code: ({ children }: any) => (
        <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-medium font-mono">
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

  return <PortableText value={value} components={portableTextComponents} />
}

// Helper function to process children and replace text with glossary terms
function processChildrenForGlossary(children: any, glossaryTerms: GlossaryTerm[]) {
  if (!children || !glossaryTerms.length) {
    return children
  }

  // Handle different types of children
  if (typeof children === 'string') {
    return (
      <GlossaryTextProcessor 
        text={children} 
        glossaryTerms={glossaryTerms} 
      />
    )
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') {
        return (
          <GlossaryTextProcessor 
            key={index}
            text={child} 
            glossaryTerms={glossaryTerms} 
          />
        )
      }
      return child
    })
  }

  return children
}