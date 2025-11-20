import { defineField, defineType } from 'sanity'

export const learningPath = defineType({
  name: 'learningPath',
  title: 'Learning Path',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Path Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What will learners achieve by following this path?',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Overall Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domain',
      title: 'Primary Domain',
      type: 'string',
      options: {
        list: [
          { title: 'Artificial Intelligence', value: 'ai' },
          { title: 'Machine Learning', value: 'ml' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Software Engineering', value: 'software-engineering' },
          { title: 'Deep Learning', value: 'deep-learning' },
          { title: 'Computer Vision', value: 'computer-vision' },
          { title: 'Natural Language Processing', value: 'nlp' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g., "2 weeks", "1 month", "3-4 hours"',
    }),
    defineField({
      name: 'topics',
      title: 'Learning Sequence',
      type: 'array',
      description: 'Ordered list of concepts to learn (drag to reorder)',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      description: 'What should learners know before starting this path?',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'relatedPaths',
      title: 'Related Learning Paths',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'learningPath' }] }],
    }),
    defineField({
      name: 'tutorialSeries',
      title: 'Related Tutorial Series',
      type: 'reference',
      description: 'Link to a blog series that supports this learning path',
      to: [{ type: 'series' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage',
      domain: 'domain',
      level: 'level',
    },
    prepare(selection) {
      const { title, subtitle, domain, level } = selection
      return {
        title,
        subtitle: `${domain} • ${level} • ${subtitle?.substring(0, 50)}...`,
      }
    },
  },
})