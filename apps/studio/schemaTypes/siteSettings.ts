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
      initialValue: 'Glossifyd',
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
              initialValue: 'Glossifyd',
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
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      description: 'Configure the main hero section on the homepage',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Hero Section',
          type: 'boolean',
          description: 'Show/hide the hero section on homepage',
          initialValue: true,
        }),
        defineField({
          name: 'headline',
          title: 'Main Headline',
          type: 'string',
          description: 'The main headline text (supports HTML)',
          initialValue: 'The best place to build, test, and discover front-end code.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          description: 'Supporting text below the main headline',
          initialValue: 'Glossifyd is a comprehensive resource for front-end developers. Build and deploy websites, showcase your work, learn new concepts, and find inspiration.',
          rows: 3,
        }),
        defineField({
          name: 'ctaButtons',
          title: 'Call-to-Action Buttons',
          type: 'array',
          description: 'Add up to 3 action buttons',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'string',
                  description: 'Internal link (e.g., /glossary) or external URL',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary (Green)', value: 'primary' },
                      { title: 'Secondary (Outline)', value: 'secondary' },
                      { title: 'Ghost (Text only)', value: 'ghost' },
                    ],
                  },
                  initialValue: 'primary',
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'url',
                  style: 'style',
                },
                prepare({ title, subtitle, style }) {
                  return {
                    title: title || 'Button',
                    subtitle: `${subtitle} (${style})`,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'object',
          description: 'Configure the right-side image/visual',
          fields: [
            defineField({
              name: 'type',
              title: 'Image Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Upload Image', value: 'image' },
                  { title: 'Code Snippet', value: 'code' },
                  { title: 'Custom HTML', value: 'html' },
                ],
              },
              initialValue: 'code',
            }),
            defineField({
              name: 'image',
              title: 'Hero Image',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  validation: (Rule) => Rule.required(),
                }
              ],
            }),
            defineField({
              name: 'codeSnippet',
              title: 'Code Snippet',
              type: 'object',
              hidden: ({ parent }) => parent?.type !== 'code',
              fields: [
                defineField({
                  name: 'language',
                  title: 'Programming Language',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'HTML', value: 'html' },
                      { title: 'CSS/SCSS', value: 'css' },
                      { title: 'JavaScript', value: 'javascript' },
                      { title: 'TypeScript', value: 'typescript' },
                      { title: 'React JSX', value: 'jsx' },
                      { title: 'Python', value: 'python' },
                      { title: 'JSON', value: 'json' },
                    ],
                  },
                  initialValue: 'html',
                }),
                defineField({
                  name: 'code',
                  title: 'Code Content',
                  type: 'text',
                  rows: 8,
                  initialValue: `<div class="rect"></div>

.rect {
  background: linear-gradient(
    -119deg,
    $gray 0%,
    $dark-gray 100%
  );
}

var colors = [
  "#748007", "#7E7300", "#748007"
];`,
                }),
              ],
            }),
            defineField({
              name: 'customHtml',
              title: 'Custom HTML',
              type: 'text',
              hidden: ({ parent }) => parent?.type !== 'html',
              description: 'Custom HTML content for the hero image area',
              rows: 6,
            }),
          ],
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          description: 'Hero section background color',
          options: {
            disableAlpha: true,
          },
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
          description: 'Hero text color',
          options: {
            disableAlpha: true,
          },
        }),
      ],
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