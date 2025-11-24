import { NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/client'

export async function GET() {
  try {
    // First, try to fetch existing site settings
    const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    if (existingSettings) {
      return NextResponse.json({ success: true, data: existingSettings })
    }

    // If no settings exist, create a default one
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

    const createdSettings = await writeClient.createOrReplace(defaultSettings)
    
    return NextResponse.json({ 
      success: true, 
      data: createdSettings,
      message: 'Default site settings created'
    })
  } catch (error) {
    console.error('Site settings API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch or create site settings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    // Create default site settings document
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
      data: result,
      message: 'Site settings created successfully'
    })
  } catch (error) {
    console.error('Error creating site settings:', error)
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