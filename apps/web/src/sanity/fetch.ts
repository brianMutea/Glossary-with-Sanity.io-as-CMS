import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { draftMode } from 'next/headers'

/**
 * Smart fetch function that automatically chooses between sanityFetch and client.fetch
 * based on the execution context (build time vs request time)
 */
export async function smartFetch<T = any>(query: string, params?: any): Promise<T> {
  try {
    // Try to access draftMode - this will throw if we're at build time
    const draft = draftMode()
    
    // If we get here, we're in a request context, so use sanityFetch for live updates
    const { data } = await sanityFetch({ query, params })
    return data
  } catch (error) {
    // If draftMode throws, we're at build time, so use regular client
    return params ? await client.fetch(query, params) : await client.fetch(query)
  }
}

/**
 * Build-safe fetch that always uses the regular client
 * Use this in generateStaticParams and generateMetadata
 */
export async function buildSafeFetch<T = any>(query: string, params?: any): Promise<T> {
  return params ? await client.fetch(query, params) : await client.fetch(query)
}