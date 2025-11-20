import { defineField, defineType } from 'sanity'

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDefinition',
      title: 'Short Definition',
      type: 'text',
      description: '2-line human-friendly summary for cards and tooltips',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullExplanation',
      title: 'Deep Explanation',
      type: 'array',
      description: 'Full guided explanation in article style',
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
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'python',
            languageAlternatives: [
              { title: 'Python', value: 'python' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'R', value: 'r' },
              { title: 'SQL', value: 'sql' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
            ],
            withFilename: true,
          },
        },
      ],
    }),
    defineField({
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'string',
      options: {
        list: [
          { title: 'Artificial Intelligence', value: 'ai' },
          { title: 'Machine Learning', value: 'ml' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Software Engineering', value: 'software-engineering' },
          { title: 'Mathematics', value: 'math' },
          { title: 'Statistics', value: 'statistics' },
          { title: 'Deep Learning', value: 'deep-learning' },
          { title: 'Computer Vision', value: 'computer-vision' },
          { title: 'Natural Language Processing', value: 'nlp' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Concept Type',
      type: 'string',
      options: {
        list: [
          { title: 'Algorithm', value: 'algorithm' },
          { title: 'Model', value: 'model' },
          { title: 'Metric', value: 'metric' },
          { title: 'Library/Framework', value: 'library' },
          { title: 'Technique', value: 'technique' },
          { title: 'Concept', value: 'concept' },
          { title: 'Architecture', value: 'architecture' },
          { title: 'Method', value: 'method' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Illustration / Diagram',
      type: 'image',
      description: 'Visual representation of the concept',
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
      name: 'codeExamples',
      title: 'Code Examples',
      type: 'array',
      of: [
        {
          type: 'code',
          title: 'Code Example',
          options: {
            language: 'python',
            languageAlternatives: [
              { title: 'Python', value: 'python' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'R', value: 'r' },
              { title: 'SQL', value: 'sql' },
            ],
            withFilename: true,
          },
        }
      ],
    }),
    defineField({
      name: 'realWorldUse',
      title: 'Real-world Applications',
      type: 'text',
      description: 'How this concept is used in real applications and industry',
      rows: 3,
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      description: 'Concepts you should understand first',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      description: 'Concepts that are closely related',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'nextConcepts',
      title: 'What to Learn Next',
      type: 'array',
      description: 'Concepts to explore after mastering this one',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'tutorialArticle',
      title: 'Related Tutorial',
      type: 'reference',
      description: 'Link to an in-depth tutorial blog post',
      to: [{ type: 'blogPost' }],
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'External Link',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sourceType',
              title: 'Source Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Blog Post', value: 'blog' },
                  { title: 'Video', value: 'video' },
                  { title: 'Documentation', value: 'docs' },
                  { title: 'Research Paper', value: 'paper' },
                  { title: 'Course', value: 'course' },
                ],
              },
            },
          ],
        }
      ],
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
  ],
  preview: {
    select: {
      title: 'term',
      subtitle: 'shortDefinition',
      media: 'image',
      domain: 'domain',
      level: 'level',
    },
    prepare(selection) {
      const { title, subtitle, domain, level } = selection
      return {
        title,
        subtitle: `${domain} • ${level} • ${subtitle?.substring(0, 60)}...`,
      }
    },
  },
})