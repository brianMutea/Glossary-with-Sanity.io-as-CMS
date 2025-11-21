import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo / Site Title */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Tech Glossary
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/glossary" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Glossary
            </Link>
            <Link 
              href="/knowledge-graph" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Knowledge Graph
            </Link>
            <Link 
              href="/learning-paths" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Learning Paths
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tutorials
            </Link>
            <Link 
              href="/series" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Series
            </Link>
          </nav>

          {/* Mobile menu button - placeholder for now */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}