'use client'

import { useState, useEffect } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  theme?: 'light' | 'dark'
}

export function CodeBlock({ code, language = 'javascript', filename, theme = 'light' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(() => {
    // Simple syntax highlighting for common languages
    const highlightCode = (code: string, lang: string) => {
      let highlighted = code

      if (lang === 'python' || lang === 'py') {
        highlighted = code
          .replace(/#.*$/gm, '<span style="color: #6a737d; font-style: italic;">$&</span>') // Comments
          .replace(/\b(import|from|as|def|class|if|else|elif|for|while|return|try|except|finally|with|lambda|yield|async|await|True|False|None)\b/g, '<span style="color: #d73a49; font-weight: 600;">$1</span>') // Keywords
          .replace(/"([^"\\]|\\.)*"/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/'([^'\\]|\\.)*'/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/\b\d+\.?\d*\b/g, '<span style="color: #005cc5;">$&</span>') // Numbers
          .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #6f42c1;">$1</span>(') // Functions
      } else if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
        highlighted = code
          .replace(/\/\/.*$/gm, '<span style="color: #6a737d; font-style: italic;">$&</span>') // Comments
          .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a737d; font-style: italic;">$&</span>') // Block comments
          .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|class|extends|async|await|try|catch|throw|new|this|super|static|public|private|protected|interface|type|enum)\b/g, '<span style="color: #d73a49; font-weight: 600;">$1</span>') // Keywords
          .replace(/"([^"\\]|\\.)*"/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/'([^'\\]|\\.)*'/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/`([^`\\]|\\.)*`/g, '<span style="color: #032f62;">$&</span>') // Template strings
          .replace(/\b\d+\.?\d*\b/g, '<span style="color: #005cc5;">$&</span>') // Numbers
          .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #005cc5;">$&</span>') // Booleans/null
          .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span style="color: #6f42c1;">$1</span>(') // Functions
      } else if (lang === 'json') {
        highlighted = code
          .replace(/"([^"\\]|\\.)*":/g, '<span style="color: #005cc5; font-weight: 600;">$&</span>') // Keys
          .replace(/:\s*"([^"\\]|\\.)*"/g, ': <span style="color: #032f62;">$1</span>') // String values
          .replace(/:\s*(true|false|null)/g, ': <span style="color: #005cc5;">$1</span>') // Boolean/null values
          .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color: #005cc5;">$1</span>') // Number values
      } else if (lang === 'sql') {
        highlighted = code
          .replace(/--.*$/gm, '<span style="color: #6a737d; font-style: italic;">$&</span>') // Comments
          .replace(/\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|DATABASE|SCHEMA)\b/gi, '<span style="color: #d73a49; font-weight: 600;">$&</span>') // Keywords
          .replace(/'([^'\\]|\\.)*'/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/\b\d+\.?\d*\b/g, '<span style="color: #005cc5;">$&</span>') // Numbers
      } else if (lang === 'r') {
        highlighted = code
          .replace(/#.*$/gm, '<span style="color: #6a737d; font-style: italic;">$&</span>') // Comments
          .replace(/\b(function|if|else|for|while|repeat|next|break|TRUE|FALSE|NULL|NA|Inf|NaN|library|require|source|data|summary|plot|print|cat|paste|length|dim|names|str|head|tail)\b/g, '<span style="color: #d73a49; font-weight: 600;">$1</span>') // Keywords
          .replace(/"([^"\\]|\\.)*"/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/'([^'\\]|\\.)*'/g, '<span style="color: #032f62;">$&</span>') // Strings
          .replace(/\b\d+\.?\d*\b/g, '<span style="color: #005cc5;">$&</span>') // Numbers
          .replace(/([a-zA-Z_][a-zA-Z0-9_\.]*)\s*\(/g, '<span style="color: #6f42c1;">$1</span>(') // Functions
      }

      return highlighted
    }

    setHighlightedCode(highlightCode(code, language))
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
      <div className="my-8">
        {(filename || language) && (
          <div className="bg-gray-800 text-gray-300 px-4 py-3 text-sm font-mono rounded-t-lg border-b border-gray-700 flex items-center justify-between">
            {filename && <span className="text-gray-300">{filename}</span>}
            {language && (
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-medium">
                {getLanguageDisplayName(language)}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <pre className={`bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed font-mono ${(filename || language) ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`}>
            <code 
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
            />
          </pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors font-medium"
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
    <div className="my-8">
      {(filename || language) && (
        <div className="bg-gray-100 text-gray-700 px-4 py-3 text-sm font-mono rounded-t-lg border-b border-gray-200 flex items-center justify-between">
          {filename && <span className="text-gray-700 font-medium">{filename}</span>}
          {language && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-medium">
              {getLanguageDisplayName(language)}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <pre className={`bg-gray-50 text-gray-800 p-6 overflow-x-auto text-sm leading-relaxed font-mono border border-gray-200 ${(filename || language) ? 'rounded-t-none rounded-b-lg' : 'rounded-lg'}`}>
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
          />
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