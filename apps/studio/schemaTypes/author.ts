import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'X (Twitter) Handle',
          type: 'string',
          placeholder: '@username',
        }),
        defineField({
          name: 'github',
          title: 'GitHub Username',
          type: 'string',
          placeholder: 'username',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn Profile',
          type: 'url',
          placeholder: 'https://linkedin.com/in/username',
        }),
        defineField({
          name: 'website',
          title: 'Personal Website',
          type: 'url',
          placeholder: 'https://yourwebsite.com',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
})