'use client'

import { useEffect, useRef, useState } from 'react'

interface MathEquationProps {
  value: {
    equation: string
    displayMode?: boolean
    caption?: string
  }
  theme?: 'light' | 'dark'
}

export function MathEquation({ value, theme = 'light' }: MathEquationProps) {
  const [renderedHtml, setRenderedHtml] = useState<string>('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const renderMath = async () => {
      if (typeof window !== 'undefined' && value.equation) {
        try {
          // Dynamically import KaTeX to avoid SSR issues
          const katex = (await import('katex')).default
          
          // Render the equation to HTML string
          const html = katex.renderToString(value.equation, {
            displayMode: value.displayMode || false,
            throwOnError: false,
            errorColor: theme === 'dark' ? '#ff7b72' : '#d73a49',
            output: 'html',
            strict: false,
            macros: {
              '\\RR': '\\mathbb{R}',
              '\\NN': '\\mathbb{N}',
              '\\ZZ': '\\mathbb{Z}',
              '\\QQ': '\\mathbb{Q}',
              '\\CC': '\\mathbb{C}',
            }
          })
          
          setRenderedHtml(html)
          setIsError(false)
        } catch (error) {
          // Fallback to plain text if KaTeX fails to load
          const errorClass = theme === 'dark' ? 'text-[#ff7b72]' : 'text-red-600'
          setRenderedHtml(`<span class="${errorClass} font-mono text-sm">Error: ${value.equation}</span>`)
          setIsError(true)
        }
      }
    }

    renderMath()
  }, [value.equation, value.displayMode, theme])

  if (!value.equation) {
    return null
  }

  // For inline equations, use span with inline display to stay within text flow
  if (!value.displayMode) {
    return (
      <span 
        className={`inline math-equation ${theme === 'dark' ? 'katex-dark' : 'katex-light'}`}
        style={{
          display: 'inline',
          fontSize: '1em',
          color: theme === 'dark' ? '#e6edf3' : '#24292e',
          verticalAlign: 'baseline',
          margin: '0 0.1em',
          whiteSpace: 'nowrap'
        }}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    )
  }

  // For display mode equations, use div with proper spacing
  return (
    <div className="my-6 text-center">
      <div
        className={`math-equation ${theme === 'dark' ? 'katex-dark' : 'katex-light'}`}
        style={{
          fontSize: '1.2em',
          color: theme === 'dark' ? '#e6edf3' : '#24292e',
          minHeight: '1.2em'
        }}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
      {value.caption && (
        <p className={`text-center text-sm mt-2 italic ${
          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-gray-600'
        }`}>
          {value.caption}
        </p>
      )}
    </div>
  )
}