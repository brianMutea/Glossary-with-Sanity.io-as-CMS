import { defineField } from 'sanity'
import { VideoIcon } from '../../components/VideoIcon'

// Shared rich text content schema that can be reused across different content types
export const richTextContent = [
  {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H1', value: 'h1' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'H4', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        { title: 'Code', value: 'code' },
        { title: 'Underline', value: 'underline' },
        { title: 'Strike', value: 'strike-through' },
      ],
      annotations: [
        {
          title: 'URL',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'URL',
              name: 'href',
              type: 'url',
              validation: (Rule: any) => Rule.uri({
                allowRelative: true,
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            },
            {
              title: 'Open in new tab',
              name: 'blank',
              type: 'boolean'
            }
          ]
        },
        {
          title: 'Inline Math',
          name: 'inlineMath',
          type: 'object',
          description: 'Add inline mathematical equations using LaTeX syntax',
          fields: [
            {
              name: 'equation',
              title: 'LaTeX Equation',
              type: 'string',
              description: 'Enter your equation using LaTeX syntax (e.g., E = mc^2, \\hat{Y}, x_i)',
              validation: (Rule: any) => Rule.required().custom((equation: string) => {
                if (!equation) return 'Equation is required'
                if (equation.trim().length === 0) return 'Equation cannot be empty'
                return true
              })
            }
          ]
        },
      ],
    },
  },
  {
    type: 'image',
    title: 'Image',
    options: {
      hotspot: true,
      metadata: ['blurhash', 'lqip', 'palette']
    },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
        description: 'Important for SEO and accessibility.',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Caption',
        description: 'Optional caption displayed below the image.'
      }
    ],
  },
  {
    type: 'code',
    title: 'Code Block',
    description: 'Add syntax-highlighted code snippets',
    options: {
      language: 'javascript',
      languageAlternatives: [
        { title: 'JavaScript', value: 'javascript' },
        { title: 'TypeScript', value: 'typescript' },
        { title: 'HTML', value: 'html' },
        { title: 'CSS', value: 'css' },
        { title: 'SCSS', value: 'scss' },
        { title: 'Python', value: 'python' },
        { title: 'Java', value: 'java' },
        { title: 'C++', value: 'cpp' },
        { title: 'C#', value: 'csharp' },
        { title: 'Go', value: 'go' },
        { title: 'Rust', value: 'rust' },
        { title: 'PHP', value: 'php' },
        { title: 'Ruby', value: 'ruby' },
        { title: 'Swift', value: 'swift' },
        { title: 'Kotlin', value: 'kotlin' },
        { title: 'Dart', value: 'dart' },
        { title: 'Shell/Bash', value: 'bash' },
        { title: 'PowerShell', value: 'powershell' },
        { title: 'JSON', value: 'json' },
        { title: 'YAML', value: 'yaml' },
        { title: 'XML', value: 'xml' },
        { title: 'SQL', value: 'sql' },
        { title: 'GraphQL', value: 'graphql' },
        { title: 'Markdown', value: 'markdown' },
        { title: 'Docker', value: 'dockerfile' },
        { title: 'R', value: 'r' },
      ],
      withFilename: true,
    },
  },
  {
    type: 'object',
    name: 'mathEquation',
    title: 'Block Math Equation',
    description: 'Add block mathematical equations using LaTeX syntax (displayed centered on their own line)',
    fields: [
      {
        name: 'equation',
        title: 'LaTeX Equation',
        type: 'text',
        rows: 3,
        description: 'Enter your equation using LaTeX syntax (e.g., E = mc^2, \\frac{a}{b}, \\sum_{i=1}^{n} x_i)',
        validation: (Rule: any) => Rule.required().custom((equation: string) => {
          if (!equation) return 'Equation is required'
          if (equation.trim().length === 0) return 'Equation cannot be empty'
          return true
        })
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'Optional caption or description for the equation'
      }
    ],
    preview: {
      select: {
        equation: 'equation',
        caption: 'caption'
      },
      prepare({ equation, caption }: { equation?: string; caption?: string }) {
        return {
          title: equation ? equation.substring(0, 50) + (equation.length > 50 ? '...' : '') : 'Block Math Equation',
          subtitle: caption || 'Block equation (centered)',
          media: () => '∑' // Math symbol as icon
        }
      }
    }
  },
  {
    type: 'object',
    name: 'videoEmbed',
    title: 'Video Embed',
    description: 'Embed videos from YouTube, Vimeo, or Loom',
    fields: [
      {
        name: 'url',
        title: 'Video URL',
        type: 'url',
        description: 'Paste the full URL from YouTube, Vimeo, or Loom',
        validation: (Rule: any) => Rule.required().custom((url: string) => {
          if (!url) return true

          const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/
          const vimeoRegex = /(?:vimeo\.com\/)/
          const loomRegex = /(?:loom\.com\/share\/)/
          const twitchRegex = /(?:twitch\.tv\/videos\/)/

          if (youtubeRegex.test(url) || vimeoRegex.test(url) || loomRegex.test(url) || twitchRegex.test(url)) {
            return true
          }

          return 'Please enter a valid YouTube, Vimeo, Loom, or Twitch URL'
        })
      },
      {
        name: 'title',
        title: 'Video Title',
        type: 'string',
        description: 'Optional title for the video (for accessibility)'
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'Optional caption displayed below the video'
      }
    ],
    preview: {
      select: {
        title: 'title',
        url: 'url',
        caption: 'caption'
      },
      prepare({ title, url, caption }: { title?: string; url?: string; caption?: string }) {
        // Extract platform from URL for preview
        let platform = 'Video'
        if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
          platform = 'YouTube'
        } else if (url?.includes('vimeo.com')) {
          platform = 'Vimeo'
        } else if (url?.includes('loom.com')) {
          platform = 'Loom'
        } else if (url?.includes('twitch.tv')) {
          platform = 'Twitch'
        }

        return {
          title: title || `${platform} Video`,
          subtitle: caption || (url ? url.substring(0, 60) + (url.length > 60 ? '...' : '') : ''),
          media: VideoIcon
        }
      }
    }
  },
]