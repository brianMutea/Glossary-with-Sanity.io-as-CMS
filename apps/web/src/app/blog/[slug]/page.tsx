import { sanityFetch } from '@/sanity/live'
import { buildSafeFetch } from '@/sanity/fetch'
import { POST_QUERY, POSTS_SLUGS_QUERY } from '@/sanity/queries'
import { EnhancedPortableText } from '@/components/EnhancedPortableText'
import { contentProcessor } from '@/lib/contentProcessor'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/sanity/image'
import { SocialLinks } from '@/components/SocialLinks'
import { GitHubIcon } from '@/components/SocialIcons'

interface Props {
    params: Promise<{ slug: string }>
}

// Optimized content analysis using our caching system

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params

    const { data: post } = await sanityFetch({ 
        query: POST_QUERY, 
        params: { slug } 
    })

    if (!post) {
        notFound()
    }

    // Analyze content for glossary terms using optimized processor
    const contentAnalysis = await contentProcessor.getSerializableAnalysis(post.content)
    const { termsFound: termsInContent } = contentAnalysis

    const mainImageUrl = getImageUrl(post.mainImage, 1200, 600)
    const authorAvatarUrl = getImageUrl(post.author?.avatar, 64, 64)

    return (
        <div className="min-h-screen bg-[#121212] py-16">
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                <div className="bg-white rounded border border-gray-200 shadow-lg p-8 md:p-12">
            {/* Header */}
            <header className="mb-12">
                {/* Series Badge */}
                {post.series && (
                    <div className="mb-6">
                        <Link 
                            href={`/series/${post.series.slug.current}`}
                            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
                        >
                            📚 Part of: {post.series.title}
                        </Link>
                    </div>
                )}

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.map((category: any) => (
                            <Link
                                key={category.slug.current}
                                href={`/category/${category.slug.current}`}
                                className="px-3 py-1 text-sm font-medium rounded-full transition-colors"
                                style={{
                                    backgroundColor: category.color?.hex ? `${category.color.hex}20` : '#f3f4f6',
                                    color: category.color?.hex || '#374151'
                                }}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {post.title}
                </h1>

                {post.excerpt && (
                    <h2 className="text-2xl text-gray-700 mb-8 font-normal leading-relaxed">
                        {post.excerpt}
                    </h2>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                        {authorAvatarUrl ? (
                            <Image
                                src={authorAvatarUrl}
                                alt={post.author?.avatar?.alt || post.author?.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                                {post.author?.name?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <Link 
                                href={`/author/${post.author?.slug.current}`}
                                className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                                {post.author?.name}
                            </Link>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <time dateTime={post.publishedAt}>
                                    {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                                </time>
                                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                                    <span>Updated {format(new Date(post.updatedAt), 'MMM d, yyyy')}</span>
                                )}
                                {post.estimatedReadTime && (
                                    <span>{post.estimatedReadTime} min read</span>
                                )}
                                {post.difficulty && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                        {post.difficulty}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags and Code Languages */}
                {(post.tags || post.codeLanguages) && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.codeLanguages?.map((lang: string) => (
                            <span
                                key={lang}
                                className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                            >
                                {lang}
                            </span>
                        ))}
                        {post.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full border border-gray-200"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Project Links */}
                {(post.githubRepo || post.liveDemo) && (
                    <div className="flex gap-4 mb-8">
                        {post.githubRepo && (
                            <a
                                href={post.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <GitHubIcon className="w-4 h-4" />
                                <span>View on GitHub</span>
                            </a>
                        )}
                        {post.liveDemo && (
                            <a
                                href={post.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                🚀 Live Demo
                            </a>
                        )}
                    </div>
                )}
            </header>

            {/* Featured Image */}
            {mainImageUrl && (
                <div className="mb-12">
                    <Image
                        src={mainImageUrl}
                        alt={post.mainImage?.alt || post.title}
                        width={1200}
                        height={600}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-xl max-w-none">
                <EnhancedPortableText 
                    value={post.content} 
                    glossaryTerms={termsInContent}
                />
            </div>

            {/* Related Glossary Terms - Only show if terms are actually found in content */}
            {termsInContent && termsInContent.length > 0 && (
                <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        📚 Technical Terms in this Article
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Hover over highlighted terms in the article above to see quick definitions, or click to explore our glossary.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {termsInContent.slice(0, 8).map((term: any) => (
                            <Link
                                key={term._id}
                                href={`/glossary/${term.slug.current}`}
                                className="px-3 py-2 bg-white text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium"
                            >
                                {term.term}
                            </Link>
                        ))}
                        {termsInContent.length > 8 && (
                            <Link
                                href="/glossary"
                                className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                                +{termsInContent.length - 8} more terms
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Enhanced Author Section */}
            {post.author && (
                <div className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <div className="flex items-start gap-6">
                        {authorAvatarUrl ? (
                            <Image
                                src={authorAvatarUrl}
                                alt={post.author.avatar?.alt || post.author.name}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                                {post.author.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                <Link 
                                    href={`/author/${post.author.slug.current}`}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    About {post.author.name}
                                </Link>
                            </h3>
                            {post.author.bio && (
                                <p className="text-gray-600 mb-4">{post.author.bio}</p>
                            )}
                            
                            {/* Social Links */}
                            {post.author.social && (
                                <SocialLinks social={post.author.social} variant="compact" />
                            )}
                            
                            <div className="mt-4">
                                <Link 
                                    href={`/author/${post.author.slug.current}`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View all posts by {post.author.name} →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                </div>
                </div>
            </article>
        </div>
    )
}

export async function generateStaticParams() {
    const posts = await buildSafeFetch(POSTS_SLUGS_QUERY)

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const post = await buildSafeFetch(POST_QUERY, { slug })

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Tech Glossary`,
    }
}