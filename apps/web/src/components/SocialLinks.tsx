import { XIcon, GitHubIcon, LinkedInIcon, WebsiteIcon } from './SocialIcons'

interface SocialLinksProps {
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  variant?: 'buttons' | 'icons' | 'compact'
  className?: string
}

export function SocialLinks({ social, variant = 'buttons', className = '' }: SocialLinksProps) {
  if (!social) return null

  const baseClasses = {
    buttons: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
    icons: 'p-2 rounded-full transition-colors',
    compact: 'inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors'
  }

  const iconSize = variant === 'icons' ? 'w-4 h-4' : 'w-4 h-4'

  return (
    <div className={`flex gap-3 ${className}`}>
      {social.twitter && (
        <a
          href={`https://x.com/${social.twitter.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses[variant]} ${
            variant === 'buttons' 
              ? 'bg-black text-white hover:bg-gray-800' 
              : variant === 'icons'
              ? 'text-gray-700 hover:text-black hover:bg-gray-100'
              : 'text-gray-700 hover:text-black hover:bg-gray-100'
          }`}
          title="X (Twitter)"
        >
          <XIcon className={iconSize} />
          {variant !== 'icons' && <span>X</span>}
        </a>
      )}
      
      {social.github && (
        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses[variant]} ${
            variant === 'buttons' 
              ? 'bg-gray-800 text-white hover:bg-gray-900' 
              : variant === 'icons'
              ? 'text-gray-700 hover:text-black hover:bg-gray-100'
              : 'text-gray-700 hover:text-black hover:bg-gray-100'
          }`}
          title="GitHub"
        >
          <GitHubIcon className={iconSize} />
          {variant !== 'icons' && <span>GitHub</span>}
        </a>
      )}
      
      {social.linkedin && (
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses[variant]} ${
            variant === 'buttons' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : variant === 'icons'
              ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
          }`}
          title="LinkedIn"
        >
          <LinkedInIcon className={iconSize} />
          {variant !== 'icons' && <span>LinkedIn</span>}
        </a>
      )}
      
      {social.website && (
        <a
          href={social.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses[variant]} ${
            variant === 'buttons' 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : variant === 'icons'
              ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
              : 'text-green-600 hover:text-green-800 hover:bg-green-50'
          }`}
          title="Website"
        >
          <WebsiteIcon className={iconSize} />
          {variant !== 'icons' && <span>Website</span>}
        </a>
      )}
    </div>
  )
}