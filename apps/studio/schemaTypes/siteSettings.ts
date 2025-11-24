import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [
    // Disable create and delete actions to make it a singleton
    'update',
    'publish'
  ],
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
      title: 'Site Logo Configuration',
      type: 'object',
      description: 'Configure how your logo appears across the site',
      fields: [
        defineField({
          name: 'type',
          title: 'Logo Type',
          type: 'string',
          options: {
            list: [
              { title: 'Text Logo', value: 'text' },
              { title: 'Image Logo', value: 'image' },
              { title: 'SVG Logo', value: 'svg' },
            ],
          },
          initialValue: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'textLogo',
          title: 'Text Logo',
          type: 'object',
          hidden: ({ parent }) => parent?.type !== 'text',
          fields: [
            defineField({
              name: 'text',
              title: 'Logo Text',
              type: 'string',
              description: 'The text to display as your logo',
              validation: (Rule) => Rule.required(),
              initialValue: 'Tech Glossary',
            }),
            defineField({
              name: 'fontSize',
              title: 'Font Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'text-lg' },
                  { title: 'Medium', value: 'text-xl' },
                  { title: 'Large', value: 'text-2xl' },
                  { title: 'Extra Large', value: 'text-3xl' },
                ],
              },
              initialValue: 'text-xl',
            }),
            defineField({
              name: 'fontWeight',
              title: 'Font Weight',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal', value: 'font-normal' },
                  { title: 'Medium', value: 'font-medium' },
                  { title: 'Semibold', value: 'font-semibold' },
                  { title: 'Bold', value: 'font-bold' },
                ],
              },
              initialValue: 'font-bold',
            }),
            defineField({
              name: 'color',
              title: 'Text Color',
              type: 'color',
              description: 'Color of the logo text',
              options: {
                disableAlpha: true,
              },
            }),
          ],
        }),
        defineField({
          name: 'imageLogo',
          title: 'Image Logo',
          type: 'object',
          hidden: ({ parent }) => parent?.type !== 'image',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              description: 'Upload your logo image (PNG, JPG, WebP)',
              options: {
                hotspot: true,
                accept: 'image/png,image/jpeg,image/webp',
              },
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for accessibility',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'width',
              title: 'Logo Width (px)',
              type: 'number',
              description: 'Width of the logo in pixels',
              initialValue: 120,
              validation: (Rule) => Rule.min(20).max(500),
            }),
            defineField({
              name: 'height',
              title: 'Logo Height (px)',
              type: 'number',
              description: 'Height of the logo in pixels',
              initialValue: 40,
              validation: (Rule) => Rule.min(20).max(200),
            }),
          ],
        }),
        defineField({
          name: 'svgLogo',
          title: 'SVG Logo',
          type: 'object',
          hidden: ({ parent }) => parent?.type !== 'svg',
          fields: [
            defineField({
              name: 'svgCode',
              title: 'SVG Code',
              type: 'text',
              description: 'Paste your SVG code here (including <svg> tags)',
              validation: (Rule) => Rule.required(),
              rows: 10,
            }),
            defineField({
              name: 'width',
              title: 'Logo Width (px)',
              type: 'number',
              description: 'Width of the logo in pixels',
              initialValue: 120,
              validation: (Rule) => Rule.min(20).max(500),
            }),
            defineField({
              name: 'height',
              title: 'Logo Height (px)',
              type: 'number',
              description: 'Height of the logo in pixels',
              initialValue: 40,
              validation: (Rule) => Rule.min(20).max(200),
            }),
          ],
        }),
        defineField({
          name: 'linkUrl',
          title: 'Logo Link URL',
          type: 'url',
          description: 'URL to navigate to when logo is clicked (leave empty for homepage)',
          placeholder: 'https://example.com',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'object',
      description: 'Configure your site favicon (appears in browser tabs)',
      fields: [
        defineField({
          name: 'image',
          title: 'Favicon Image',
          type: 'image',
          description: 'Upload favicon (recommended: 32x32px, PNG/ICO/SVG)',
          options: {
            accept: 'image/png,image/x-icon,image/svg+xml',
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'appleTouchIcon',
          title: 'Apple Touch Icon',
          type: 'image',
          description: 'Icon for Apple devices (recommended: 180x180px PNG)',
          options: {
            accept: 'image/png',
          },
        }),
      ],
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