'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { GlossaryTextProcessor } from './GlossaryTextProcessor'
import Image from 'next/image'
import { CodeBlock } from './CodeBlock'
import { VideoEmbed } from './VideoEmbed'
import { MathEquation } from './MathEquation'
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
  theme?: 'light' | 'dark'
}

export function EnhancedPortableText({ 
  value, 
  glossaryTerms = [],
  theme = 'light'
}: EnhancedPortableTextProps) {
  
  // Define all PortableText components inside the client component
  const portableTextComponents: PortableTextComponents = {
    types: {
      code: ({ value }: any) => (
        <CodeBlock
          code={value.code}
          language={value.language}
          filename={value.filename}
          theme={theme}
        />
      ),
      videoEmbed: ({ value }: any) => (
        <VideoEmbed
          url={value.url}
          title={value.title}
          caption={value.caption}
        />
      ),
      mathEquation: ({ value }: any) => (
        <MathEquation
          value={{ ...value, displayMode: true }}
          theme={theme}
        />
      ),
      image: ({ value }: any) => {
        const imageUrl = getImageUrl(value)
        if (!imageUrl) return null
        
        return (
          <div className="my-8 flex justify-center">
            <div className="max-w-full">
              <Image
                src={imageUrl}
                alt={value.alt || ''}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-auto max-w-full max-h-[600px] rounded-lg shadow-lg object-contain"
              />
              {value.caption && (
                <p className={`text-center text-sm mt-3 italic ${
                  theme === 'dark' ? 'text-[#E0E0E0]' : 'text-gray-600'
                }`}>
                  {value.caption}
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    block: {
      // Headings with glossary processing
      h1: ({ children }: any) => (
        <h1 className={`text-4xl font-bold mt-12 mb-6 leading-tight first:mt-0 ${
          theme === 'dark' ? 'text-[#FFD700]' : 'text-gray-900'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className={`text-3xl font-bold mt-10 mb-4 leading-tight ${
          theme === 'dark' ? 'text-[#FFD700]' : 'text-gray-900'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className={`text-2xl font-semibold mt-8 mb-3 leading-tight ${
          theme === 'dark' ? 'text-[#00BFFF]' : 'text-gray-900'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className={`text-xl font-semibold mt-6 mb-3 leading-tight ${
          theme === 'dark' ? 'text-[#00BFFF]' : 'text-gray-900'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </h4>
      ),
      // Paragraphs with glossary processing
      normal: ({ children }: any) => (
        <p className={`text-lg mb-6 leading-relaxed ${
          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-gray-700'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </p>
      ),
      // Blockquotes with glossary processing
      blockquote: ({ children }: any) => (
        <blockquote className={`border-l-4 pl-6 py-4 my-8 italic text-lg bg-transparent ${
          theme === 'dark' 
            ? 'border-[#E0E0E0] text-[#E0E0E0]' 
            : 'border-gray-400 text-gray-700'
        }`}>
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
        <li className={`text-lg leading-relaxed ${
          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-gray-700'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </li>
      ),
      number: ({ children }: any) => (
        <li className={`text-lg leading-relaxed ${
          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-gray-700'
        }`}>
          {processChildrenForGlossary(children, glossaryTerms)}
        </li>
      ),
    },
    marks: {
      code: ({ children }: any) => (
        <code className={`px-2 py-1 rounded text-sm font-medium font-mono ${
          theme === 'dark' 
            ? 'bg-[#333333] text-[#39FF14]' 
            : 'bg-gray-100 text-red-600'
        }`}>
          {children}
        </code>
      ),
      strong: ({ children }: any) => (
        <strong className={`font-bold ${
          theme === 'dark' ? 'text-[#FFFFFF]' : 'text-gray-900'
        }`}>
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
          className={`underline transition-colors ${
            theme === 'dark' 
              ? 'text-[#00BFFF] hover:text-[#FFD700]' 
              : 'text-blue-600 hover:text-blue-800'
          }`}
          target={value.href.startsWith('http') ? '_blank' : undefined}
          rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
      inlineMath: ({ children, value }: any) => (
        <MathEquation
          value={{ equation: value.equation, displayMode: false }}
          theme={theme}
        />
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