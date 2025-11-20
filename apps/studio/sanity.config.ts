import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Tech Glossary Blog',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'czq3a9vt',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Glossary Section
            S.listItem()
              .title('🧠 Glossary Terms')
              .child(
                S.documentTypeList('glossaryTerm')
                  .title('Glossary Terms')
                  .defaultOrdering([{ field: 'term', direction: 'asc' }])
              ),
            S.listItem()
              .title('🗺️ Learning Paths')
              .child(
                S.documentTypeList('learningPath')
                  .title('Learning Paths')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
              ),
            S.divider(),
            // Blog Section
            S.listItem()
              .title('📝 Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('📚 Series')
              .child(
                S.documentTypeList('series')
                  .title('Series')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
              ),
            S.divider(),
            // Organization
            S.listItem()
              .title('🏷️ Categories')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
              ),
            S.listItem()
              .title('👥 Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
          ])
    }),
    visionTool(),
    codeInput(),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },
})