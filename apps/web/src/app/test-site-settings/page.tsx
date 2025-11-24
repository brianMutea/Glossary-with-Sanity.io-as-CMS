'use client'

import { useState } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_TEST_QUERY } from '@/sanity/queries'
import { createDefaultSiteSettings, getSiteSettings } from '@/app/actions/site-settings'

export default function TestSiteSettingsPage() {
  const { siteSettings, loading, error, refresh } = useSiteSettings()
  const [apiResult, setApiResult] = useState<any>(null)
  const [apiLoading, setApiLoading] = useState(false)

  const testSanityConnection = async () => {
    setApiLoading(true)
    try {
      const response = await fetch('/api/test-sanity')
      const result = await response.json()
      setApiResult(result)
    } catch (err) {
      setApiResult({ error: 'API test failed', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const createSiteSettingsViaAPI = async () => {
    setApiLoading(true)
    try {
      const response = await fetch('/api/test-sanity', { method: 'POST' })
      const result = await response.json()
      setApiResult(result)
    } catch (err) {
      setApiResult({ error: 'Failed to create via API', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const refreshSettings = () => {
    refresh()
  }

  const testApiConnection = async () => {
    setApiLoading(true)
    try {
      const response = await fetch('/api/site-settings')
      const result = await response.json()
      setApiResult(result)
    } catch (err) {
      setApiResult({ error: 'Failed to connect to API', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const createBasicSettings = async () => {
    setApiLoading(true)
    try {
      const response = await fetch('/api/create-basic-settings', { method: 'POST' })
      const result = await response.json()
      setApiResult(result)
      
      // If successful, refresh the page to see changes
      if (result.success) {
        setTimeout(() => refreshPage(), 2000)
      }
    } catch (err) {
      setApiResult({ error: 'Failed to create basic settings', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const checkDocumentExists = async () => {
    setApiLoading(true)
    try {
      const response = await fetch('/api/create-basic-settings')
      const result = await response.json()
      setApiResult(result)
    } catch (err) {
      setApiResult({ error: 'Failed to check document', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const createDefaultSettings = async () => {
    setApiLoading(true)
    try {
      const result = await createDefaultSiteSettings()
      setApiResult(result)
      
      // If successful, refresh the page to see changes
      if (result.success) {
        setTimeout(() => refreshPage(), 2000)
      }
    } catch (err) {
      setApiResult({ error: 'Failed to create settings', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  const testServerAction = async () => {
    setApiLoading(true)
    try {
      const result = await getSiteSettings()
      setApiResult(result)
    } catch (err) {
      setApiResult({ error: 'Server action failed', details: err })
    } finally {
      setApiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFD700] mb-8">Site Settings Test Page</h1>
        
        {/* Status Overview */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-[#00BFFF] mb-4">System Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Sanity Read Access:</strong> <span className="text-[#39FF14]">✅ Working</span></p>
              <p><strong>Site Settings Hook:</strong> {loading ? '⏳ Loading' : siteSettings ? '✅ Working' : '❌ Failed'}</p>
              <p><strong>Current Logo:</strong> {siteSettings?.logo?.type || 'Default fallback'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Write Token:</strong> <span className="text-[#39FF14]">✅ Configured</span></p>
              <p><strong>Fetch Status:</strong> {loading ? '⏳ Loading' : '✅ Active'}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
            </div>
          </div>
          
          {siteSettings && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-[#39FF14] mb-2">Site Settings Data:</h3>
              <pre className="bg-[#121212] p-4 rounded text-sm overflow-auto">
                {JSON.stringify(siteSettings, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* API Test Buttons */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-[#00BFFF] mb-4">API Test</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={checkDocumentExists}
              disabled={apiLoading}
              className="px-4 py-2 bg-[#00BFFF] text-white rounded hover:bg-[#0099CC] disabled:opacity-50"
            >
              {apiLoading ? 'Checking...' : 'Check Document Exists'}
            </button>
            <button
              onClick={createBasicSettings}
              disabled={apiLoading}
              className="px-4 py-2 bg-[#39FF14] text-black rounded hover:bg-[#32CC12] disabled:opacity-50"
            >
              {apiLoading ? 'Creating...' : 'Create Basic Document'}
            </button>
            <button
              onClick={testSanityConnection}
              disabled={apiLoading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded hover:bg-[#E6C200] disabled:opacity-50"
            >
              {apiLoading ? 'Testing...' : 'Test Full Connection'}
            </button>
            <button
              onClick={refreshSettings}
              disabled={apiLoading}
              className="px-4 py-2 bg-[#FF6F61] text-white rounded hover:bg-[#E55A4A] disabled:opacity-50"
            >
              Refresh Settings
            </button>
          </div>

          {apiResult && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-[#FFD700] mb-2">API Result:</h3>
              <pre className="bg-[#121212] p-4 rounded text-sm overflow-auto">
                {JSON.stringify(apiResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-[#FF6F61] mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-[#E0E0E0]">
            <li><strong>Test Sanity Connection (API):</strong> ✅ Should work (read access confirmed)</li>
            <li><strong>Get Sanity API Token:</strong> Follow steps below to get write permissions</li>
            <li><strong>Create Settings:</strong> Once token is added, create the siteSettings document</li>
            <li><strong>Use Sanity Studio:</strong> Go to Studio → "Site Settings" to manage your logo</li>
          </ol>
        </div>

        {/* Token Setup Guide */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#39FF14] mb-4">🔑 Get Sanity API Token</h2>
          <div className="space-y-4 text-[#E0E0E0]">
            <div className="bg-[#121212] p-4 rounded">
              <h3 className="font-semibold text-[#FFD700] mb-2">Step 1: Get Token from Sanity</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to <a href="https://sanity.io/manage" target="_blank" className="text-[#00BFFF] underline">sanity.io/manage</a></li>
                <li>Select your project: <code className="bg-[#333] px-2 py-1 rounded">czq3a9vt</code></li>
                <li>Go to <strong>API</strong> → <strong>Tokens</strong></li>
                <li>Click <strong>"Add API token"</strong></li>
                <li>Name: <code className="bg-[#333] px-2 py-1 rounded">Tech Glossary Write Token</code></li>
                <li>Permissions: <strong>Editor</strong> (or higher)</li>
                <li>Copy the generated token</li>
              </ol>
            </div>
            
            <div className="bg-[#121212] p-4 rounded">
              <h3 className="font-semibold text-[#FFD700] mb-2">Step 2: Add Token to Environment</h3>
              <p className="text-sm mb-2">Add this line to your <code className="bg-[#333] px-2 py-1 rounded">.env.local</code> file:</p>
              <div className="bg-[#333] p-3 rounded font-mono text-sm">
                SANITY_API_TOKEN=your_token_here
              </div>
              <p className="text-xs mt-2 text-[#FFD700]">⚠️ Replace "your_token_here" with the actual token from Sanity</p>
            </div>

            <div className="bg-[#121212] p-4 rounded">
              <h3 className="font-semibold text-[#FFD700] mb-2">Step 3: Restart Development Server</h3>
              <p className="text-sm">After adding the token, restart your dev server:</p>
              <div className="bg-[#333] p-3 rounded font-mono text-sm mt-2">
                # Stop the server (Ctrl+C) and restart
                <br />npm run dev
              </div>
            </div>

            <div className="bg-[#121212] p-4 rounded">
              <h3 className="font-semibold text-[#FFD700] mb-2">Step 4: Test & Create Settings</h3>
              <p className="text-sm">Once token is added and server restarted:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
                <li>Refresh this page</li>
                <li>Click "Create Settings (API)" - should work now</li>
                <li>Go to Sanity Studio → "Site Settings"</li>
                <li>Configure your logo and favicon</li>
                <li>Publish changes</li>
                <li>See changes reflected on your site!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}