import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of your blog (appears in browser tab and header)',
      validation: (Rule) => Rule.required(),
      initialValue: 'Tech Glossary',
    }),
    defineField({
      name: 'tagline',
      title: 'Site Tagline',
      type: 'string',
      description: 'A short description of your blog (appears in hero and meta tags)',
      validation: (Rule) => Rule.max(160),
      initialValue: 'Your go-to resource for code tutorials and technical articles',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Upload a logo image. If not provided, the site title will be used as text.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility',
        }
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon that appears in browser tabs (recommended: 32x32px)',
      options: {
        accept: 'image/png,image/ico,image/svg+xml',
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      description: 'Main brand color used for buttons, links, and accents',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      description: 'Secondary color for highlights and special elements',
      options: {
        disableAlpha: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tagline: 'tagline',
      media: 'logo',
    },
    prepare(selection) {
      const { title, tagline } = selection
      return {
        title: title || 'Site Settings',
        subtitle: tagline || 'Configure your blog appearance',
      }
    },
  },
})