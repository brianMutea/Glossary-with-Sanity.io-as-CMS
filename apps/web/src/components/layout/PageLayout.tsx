import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  description: string
  className?: string
}

export function PageLayout({ children, title, description, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-[#121212] ${className}`}>
      {/* Header */}
      <section className="bg-[#121212] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            {title}
          </h1>
          <p className="text-xl text-[#E0E0E0] max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </div>
  )
}