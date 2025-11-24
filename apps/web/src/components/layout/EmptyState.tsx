import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  children?: ReactNode
}

export function EmptyState({ icon, title, description, action, children }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
        {title}
      </h3>
      <p className="text-[#E0E0E0] text-lg mb-8">
        {description}
      </p>
      
      {action && (
        action.href ? (
          <a 
            href={action.href}
            target="_blank"
            className="inline-block bg-[#FFD700] text-[#121212] px-8 py-3 rounded font-bold hover:bg-[#E6C200] transition-colors"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-block bg-[#FFD700] text-[#121212] px-8 py-3 rounded font-bold hover:bg-[#E6C200] transition-colors"
          >
            {action.label}
          </button>
        )
      )}
      
      {children}
    </div>
  )
}