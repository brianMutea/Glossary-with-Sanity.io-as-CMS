import { sanityFetch } from '@/sanity/live'
import { GLOSSARY_TERMS_QUERY } from '@/sanity/queries'
import { ClientGlossaryPage } from '@/components/ClientGlossaryPage'

export default async function GlossaryPage() {
  const { data: allTerms } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY })

  return <ClientGlossaryPage initialTerms={allTerms} />
}

