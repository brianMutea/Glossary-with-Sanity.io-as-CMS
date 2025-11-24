import { sanityFetch } from '@/sanity/live'
import { POSTS_QUERY } from '@/sanity/queries'
import { BlogCard } from '@/components/BlogCard'
import { PageLayout } from '@/components/layout/PageLayout'
import { GridLayout } from '@/components/layout/GridLayout'
import { EmptyState } from '@/components/layout/EmptyState'

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <PageLayout
      title="All Articles"
      description="Explore our collection of programming tutorials and technical articles"
    >
      {posts.length > 0 ? (
        <GridLayout variant="cards">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </GridLayout>
      ) : (
        <EmptyState
          icon="📝"
          title="No articles published yet"
          description="Start creating amazing content for your readers."
          action={{
            label: "Create Your First Post",
            href: "http://localhost:3333"
          }}
        />
      )}
    </PageLayout>
  )
}