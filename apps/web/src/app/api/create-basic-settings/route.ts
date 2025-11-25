import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/client'

export async function POST() {
  try {
    console.log('Creating basic site settings document...')
    
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'No write token configured' },
        { status: 400 }
      )
    }

    // Create the most basic document possible
    const basicSettings = {
      _type: 'siteSettings',
      _id: 'siteSettings',
      title: 'Glossifyd',
      tagline: 'Your go-to resource for code tutorials and technical articles'
    }

    console.log('Creating document with data:', basicSettings)
    
    // Use createOrReplace to ensure it works even if document exists
    const result = await writeClient.createOrReplace(basicSettings)
    
    console.log('Document created successfully:', result._id)
    
    return NextResponse.json({
      success: true,
      message: 'Basic site settings created successfully',
      data: result
    })
  } catch (error) {
    console.error('Failed to create basic site settings:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create basic site settings',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if document exists
    const existing = await writeClient.fetch(`*[_type == "siteSettings"][0]`)
    
    return NextResponse.json({
      success: true,
      exists: !!existing,
      data: existing || null
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check document',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}