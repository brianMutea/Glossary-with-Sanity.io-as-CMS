import { defineField, defineType } from 'sanity'
import { VideoIcon } from '../components/VideoIcon'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Subtitle',
      type: 'string',
      description: 'A compelling subtitle that appears below the title.',
      validation: (Rule) => Rule.max(200).warning('Keep it concise - this appears as your article subtitle'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: { type: 'series' },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes. Leave empty to auto-calculate based on ~200 words per minute.',
      validation: (Rule) => Rule.min(1).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'codeLanguages',
      title: 'Programming Languages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'githubRepo',
      title: 'GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'liveDemo',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'Write your blog post content here. Use the toolbar to format text, add headings, lists, and more.',
      type: 'array',
      of: [
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
                    validation: (Rule) => Rule.uri({
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
              validation: (Rule) => Rule.required()
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
            ],
            withFilename: true,
          },
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
              validation: (Rule) => Rule.required().custom((url: string) => {
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
            prepare({ title, url, caption }) {
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
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'socialImage',
          title: 'Social Share Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})