import { sanityFetch } from '@/sanity/live'
import { AUTHORS_QUERY } from '@/sanity/queries'
import { AuthorCard } from '@/components/AuthorCard'
import { PageLayout } from '@/components/layout/PageLayout'
import { GridLayout } from '@/components/layout/GridLayout'
import { EmptyState } from '@/components/layout/EmptyState'

export default async function AuthorsPage() {
  const { data: authors } = await sanityFetch({ query: AUTHORS_QUERY })

  return (
    <PageLayout
      title="Our Authors"
      description="Meet the talented writers and developers who share their knowledge and expertise on Glossifyd."
    >
      {authors.length > 0 ? (
        <GridLayout variant="compact">
          {authors.map((author: any) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </GridLayout>
      ) : (
        <EmptyState
          icon="👥"
          title="No authors yet"
          description="Authors will appear here once they're added to the system."
        />
      )}
    </PageLayout>
  )
}

export const metadata = {
  title: 'Authors - Glossifyd',
  description: 'Meet the talented writers and developers who contribute to Glossifyd.',
}