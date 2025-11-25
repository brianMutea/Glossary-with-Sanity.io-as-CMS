import { sanityFetch } from '@/sanity/live'
import { GLOSSARY_TERMS_QUERY } from '@/sanity/queries'
import { GlossaryLanding } from '@/components/GlossaryLanding'

export default async function HomePage() {
  try {
    const { data: terms } = await sanityFetch({ 
      query: GLOSSARY_TERMS_QUERY,
      tags: ['glossaryTerm']
    })

    return <GlossaryLanding terms={terms || []} />
  } catch (error) {
    console.error('Error fetching glossary terms:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Glossifyd</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start by creating some glossary terms in your Sanity Studio.
          </p>
          <a 
            href="http://localhost:3333" 
            target="_blank"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Sanity Studio
          </a>
        </div>
      </div>
    )
  }
}
