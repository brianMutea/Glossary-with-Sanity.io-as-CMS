import Link from 'next/link'

interface TooltipContentProps {
  term: string
  slug: string
  definition: string
  level?: string
  domain?: string
}

export function TooltipContent({ 
  term, 
  slug, 
  definition, 
  level, 
  domain 
}: TooltipContentProps) {
  return (
    <span 
      className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 block relative glossary-tooltip-torn"
    >
      <span className="flex items-start justify-between mb-2">
        <span className="font-semibold text-gray-900 text-base">{term}</span>
        {level && (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 ml-2">
            {level}
          </span>
        )}
      </span>
      
      <span className="text-gray-700 text-sm leading-relaxed mb-2 block">
        {definition}
      </span>
      
      {domain && (
        <span className="text-xs text-gray-500 mb-2 block">
          Domain: {domain}
        </span>
      )}
      
      <Link
        href={`/glossary/${slug}`}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Learn more →
      </Link>
    </span>
  )
}