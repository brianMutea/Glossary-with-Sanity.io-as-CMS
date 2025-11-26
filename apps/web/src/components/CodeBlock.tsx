'use client'

import { useState, useEffect, useRef } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  theme?: 'light' | 'dark'
}

export function CodeBlock({ code, language = 'javascript', filename, theme = 'light' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const highlightCode = async () => {
      if (typeof window !== 'undefined' && codeRef.current) {
        try {
          // Dynamically import Prism to avoid SSR issues
          const Prism = (await import('prismjs')).default

          // Import common language definitions
          // @ts-ignore
          await import('prismjs/components/prism-javascript')
          // @ts-ignore
          await import('prismjs/components/prism-typescript')
          // @ts-ignore
          await import('prismjs/components/prism-python')
          // @ts-ignore
          await import('prismjs/components/prism-json')
          // @ts-ignore
          await import('prismjs/components/prism-bash')
          // @ts-ignore
          await import('prismjs/components/prism-sql')
          // @ts-ignore
          await import('prismjs/components/prism-css')
          // @ts-ignore
          await import('prismjs/components/prism-markup')

          // Map language aliases
          const languageMap: { [key: string]: string } = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'sh': 'bash',
            'shell': 'bash',
            'html': 'markup',
            'xml': 'markup'
          }

          const prismLanguage = languageMap[language] || language

          if (Prism.languages[prismLanguage]) {
            codeRef.current.innerHTML = Prism.highlight(code, Prism.languages[prismLanguage], prismLanguage)
          } else {
            // Fallback to plain text if language not supported
            codeRef.current.textContent = code
          }
        } catch (error) {
          // Fallback to plain text if Prism fails to load
          if (codeRef.current) {
            codeRef.current.textContent = code
          }
        }
      }
    }

    highlightCode()
  }, [code, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getLanguageDisplayName = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'python': 'Python',
      'py': 'Python',
      'java': 'Java',
      'go': 'Go',
      'rust': 'Rust',
      'php': 'PHP',
      'ruby': 'Ruby',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'dart': 'Dart',
      'bash': 'Bash',
      'sh': 'Shell',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'sql': 'SQL',
      'css': 'CSS',
      'scss': 'SCSS',
      'html': 'HTML',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'r': 'R',
    }
    return languageMap[lang?.toLowerCase()] || lang?.toUpperCase() || 'CODE'
  }

  if (theme === 'dark') {
    return (
      <div className="codeblock-container my-8 not-prose">
        {(filename || language) && (
          <div className="codeblock-header bg-[#2d2d30] text-[#cccccc] px-4 py-3 text-sm font-mono rounded-t-lg border-b border-[#333333] flex items-center justify-between">
            {filename && <span className="text-[#cccccc]">{filename}</span>}
            {language && (
              <span className="text-xs bg-[#3c3c3c] text-[#cccccc] px-2 py-1 rounded font-medium">
                {getLanguageDisplayName(language)}
              </span>
            )}
          </div>
        )}
        <div className="codeblock-content relative">
          <pre className={`codeblock-pre bg-[#0d1117] text-[#e6edf3] p-6 overflow-x-auto text-sm leading-relaxed font-mono border border-[#30363d] ${(filename || language) ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`}>
            <code
              ref={codeRef}
              className={`codeblock-code language-${language}`}
              style={{ 
                fontWeight: 'normal',
                color: '#e6edf3'
              }}
            >
              {code}
            </code>
          </pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] px-3 py-1 rounded text-xs transition-colors font-medium border border-[#30363d]"
            title="Copy to clipboard"
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Light theme (default)
  return (
    <div className="codeblock-container my-8 not-prose">
      {(filename || language) && (
        <div className="codeblock-header bg-gray-100 text-gray-700 px-4 py-3 text-sm font-mono rounded-t-lg border-b border-gray-200 flex items-center justify-between">
          {filename && <span className="text-gray-700 font-medium">{filename}</span>}
          {language && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-medium">
              {getLanguageDisplayName(language)}
            </span>
          )}
        </div>
      )}
      <div className="codeblock-content relative">
        <pre className={`codeblock-pre bg-gray-50 text-gray-800 p-6 overflow-x-auto text-sm leading-relaxed font-mono border border-gray-200 ${(filename || language) ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`}>
          <code
            ref={codeRef}
            className={`codeblock-code light-theme language-${language}`}
            style={{ fontWeight: 'normal' }}
          >
            {code}
          </code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1 rounded text-xs transition-colors font-medium shadow-sm"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
    </div>
  )
}