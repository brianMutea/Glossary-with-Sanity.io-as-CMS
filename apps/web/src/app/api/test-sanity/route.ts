import { NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/client'

export async function GET() {
  try {
    // Test basic read access
    const blogPosts = await client.fetch(`*[_type == "blogPost"][0]{_id, title}`)
    
    // Test site settings query
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    return NextResponse.json({
      success: true,
      message: 'Sanity connection successful',
      data: {
        blogPostsTest: blogPosts,
        siteSettingsTest: siteSettings,
        hasWriteToken: !!process.env.SANITY_API_TOKEN
      }
    })
  } catch (error) {
    console.error('Sanity connection test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Sanity connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        config: {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          hasWriteToken: !!process.env.SANITY_API_TOKEN
        }
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'No write token configured' },
        { status: 400 }
      )
    }

    // Try to create a site settings document
    const defaultSettings = {
      _type: 'siteSettings',
      _id: 'siteSettings',
      title: 'Tech Glossary',
      tagline: 'Your go-to resource for code tutorials and technical articles',
      logo: {
        type: 'text',
        textLogo: {
          text: 'Tech Glossary',
          fontSize: 'text-xl',
          fontWeight: 'font-bold',
          color: { hex: '#FFD700' }
        }
      }
    }

    const result = await writeClient.createOrReplace(defaultSettings)
    
    return NextResponse.json({
      success: true,
      message: 'Site settings created successfully',
      data: result
    })
  } catch (error) {
    console.error('Failed to create site settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create site settings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}