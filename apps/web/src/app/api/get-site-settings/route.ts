import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'

export async function GET() {
  try {
    // Try to fetch site settings from server-side (should work better)
    const data = await client.fetch(SITE_SETTINGS_QUERY)
    
    if (data) {
      return NextResponse.json({
        success: true,
        data: data
      })
    } else {
      // No document found, return success but no data
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No site settings document found'
      })
    }
  } catch (error) {
    console.error('Server-side site settings fetch failed:', error)
    
    // Try a simpler query as fallback
    try {
      const simpleData = await client.fetch(`*[_type == "siteSettings"][0]{_id, title, tagline}`)
      
      if (simpleData) {
        return NextResponse.json({
          success: true,
          data: {
            _id: simpleData._id,
            title: simpleData.title,
            tagline: simpleData.tagline,
            logo: {
              type: 'text',
              textLogo: {
                text: simpleData.title || 'Tech Glossary',
                fontSize: 'text-xl',
                fontWeight: 'font-bold',
                color: { hex: '#FFD700' }
              }
            }
          },
          message: 'Using simplified settings'
        })
      }
    } catch (simpleError) {
      console.error('Simple query also failed:', simpleError)
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch site settings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}