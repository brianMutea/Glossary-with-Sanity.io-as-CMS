import Link from 'next/link'

interface FooterProps {
  className?: string
  containerClassName?: string
  variant?: 'default' | 'minimal' | 'compact'
}

export function Footer({ 
  className = "", 
  containerClassName = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  variant = 'default'
}: FooterProps) {
  
  if (variant === 'minimal') {
    return (
      <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
        <div className={`${containerClassName} py-6`}>
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Tech Glossary. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }

  if (variant === 'compact') {
    return (
      <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
        <div className={`${containerClassName} py-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-blue-600">
                Tech Glossary
              </h3>
              <p className="text-gray-600 text-sm">
                Developer resources and tutorials
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Glossary
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Blog
              </Link>
              <Link href="/series" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Series
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Tech Glossary. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // Default variant
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className={`${containerClassName} py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Tech Glossary
            </h3>
            <p className="text-gray-600 mb-4">
              Your go-to resource for code tutorials and technical articles
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/learning-paths" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Series
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Tech Glossary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}