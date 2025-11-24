'use server'

import { writeClient } from '@/sanity/client'

export async function createDefaultSiteSettings() {
  try {
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
    
    return { 
      success: true, 
      data: result,
      message: 'Site settings created successfully'
    }
  } catch (error) {
    console.error('Error creating site settings:', error)
    return { 
      success: false, 
      error: 'Failed to create site settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getSiteSettings() {
  try {
    const settings = await writeClient.fetch(`*[_type == "siteSettings"][0]`)
    return { success: true, data: settings }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return { 
      success: false, 
      error: 'Failed to fetch site settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}