'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [previousPath, setPreviousPath] = useState<string>('/')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get the previous page from document.referrer or sessionStorage
    const referrer = document.referrer
    const currentOrigin = window.location.origin
    
    // Check if referrer is from the same site
    if (referrer && referrer.startsWith(currentOrigin)) {
      const referrerPath = referrer.replace(currentOrigin, '')
      setPreviousPath(referrerPath || '/')
    } else {
      // Fallback to sessionStorage or homepage
      const lastPath = sessionStorage.getItem('lastValidPath')
      setPreviousPath(lastPath || '/')
    }
  }, [])

  const handleGoBack = () => {
    if (mounted && window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = previousPath
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#39FF14]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating code snippets */}
      <div className="absolute top-20 left-10 opacity-20 font-mono text-xs text-[#E0E0E0] animate-float">
        <div className="bg-[#1A1A1A] p-2 rounded border border-[#333333]">
          {'{ error: "404" }'}
        </div>
      </div>
      <div className="absolute bottom-32 right-16 opacity-20 font-mono text-xs text-[#E0E0E0] animate-float-delayed">
        <div className="bg-[#1A1A1A] p-2 rounded border border-[#333333]">
          {'null !== found'}
        </div>
      </div>
      <div className="absolute top-1/3 right-20 opacity-20 font-mono text-xs text-[#E0E0E0] animate-float-slow">
        <div className="bg-[#1A1A1A] p-2 rounded border border-[#333333]">
          {'undefined'}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 with glitch effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-[#FFD700] relative">
            404
            <span className="absolute inset-0 text-[#FF6F61] animate-glitch-1">404</span>
            <span className="absolute inset-0 text-[#00BFFF] animate-glitch-2">404</span>
          </h1>
        </div>

        {/* Error message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E0E0E0] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-[#E0E0E0]/80 mb-2">
            Looks like this page got lost in the code...
          </p>
          <div className="font-mono text-sm text-[#39FF14] bg-[#1A1A1A] inline-block px-4 py-2 rounded border border-[#333333]">
            <span className="text-[#FF6F61]">Error:</span> Resource not found in database
          </div>
        </div>

        {/* Terminal-style suggestions */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 mb-8 text-left font-mono text-sm">
          <div className="flex items-center mb-3">
            <div className="flex space-x-2 mr-3">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
              <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
            </div>
            <span className="text-[#E0E0E0]">terminal</span>
          </div>
          <div className="space-y-2">
            <div className="text-[#39FF14]">
              <span className="text-[#00BFFF]">$</span> ls -la /pages/
            </div>
            <div className="text-[#E0E0E0] ml-4">
              drwxr-xr-x  glossary/<br/>
              drwxr-xr-x  blog/<br/>
              drwxr-xr-x  learning-paths/<br/>
              drwxr-xr-x  knowledge-graph/<br/>
              <span className="text-[#FF6F61]">-rw-r--r--  404.html</span>
            </div>
            <div className="text-[#39FF14]">
              <span className="text-[#00BFFF]">$</span> <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group bg-[#FFD700] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#E6C200] transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          
          <Link 
            href="/"
            className="group bg-[#1A1A1A] border border-[#00BFFF] text-[#00BFFF] font-semibold px-6 py-3 rounded-lg hover:bg-[#00BFFF] hover:text-black transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          <Link 
            href="/glossary"
            className="group bg-[#1A1A1A] border border-[#39FF14] text-[#39FF14] font-semibold px-6 py-3 rounded-lg hover:bg-[#39FF14] hover:text-black transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Glossary
          </Link>
        </div>

        {/* Fun fact */}
        <div className="mt-8 text-sm text-[#E0E0E0]/60">
          <p>💡 Fun fact: HTTP 404 was named after room 404 at CERN where the web was born</p>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-glitch-1 { animation: glitch-1 0.3s ease-in-out infinite alternate; }
        .animate-glitch-2 { animation: glitch-2 0.3s ease-in-out infinite alternate; }
      `}</style>
    </div>
  )
}