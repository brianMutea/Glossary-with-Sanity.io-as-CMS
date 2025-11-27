import { defineField, defineType } from 'sanity'
import { DomainInput } from '../components/DomainInput'
import { TypeInput } from '../components/TypeInput'
import { richTextContent } from './shared/richTextContent'

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
            description: 'Full guided explanation in article style with support for text, images, code, math equations, and videos',
            of: richTextContent,
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
            description: 'The field or area this concept belongs to. Start typing to see existing domains or create a new one.',
            components: {
                input: DomainInput
            },
            validation: (Rule) => Rule.required().custom((value) => {
                if (!value) return 'Domain is required'
                if (typeof value !== 'string') return 'Domain must be a string'
                if (value.length < 2) return 'Domain must be at least 2 characters'
                if (!/^[a-z0-9-]+$/.test(value)) return 'Domain should use lowercase letters, numbers, and hyphens only'
                return true
            }),
        }),
        defineField({
            name: 'type',
            title: 'Concept Type',
            type: 'string',
            description: 'The type or category of this concept. Start typing to see existing types or create a new one.',
            components: {
                input: TypeInput
            },
            validation: (Rule) => Rule.required().custom((value) => {
                if (!value) return 'Type is required'
                if (typeof value !== 'string') return 'Type must be a string'
                if (value.length < 2) return 'Type must be at least 2 characters'
                if (!/^[a-z0-9-]+$/.test(value)) return 'Type should use lowercase letters, numbers, and hyphens only'
                return true
            }),
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