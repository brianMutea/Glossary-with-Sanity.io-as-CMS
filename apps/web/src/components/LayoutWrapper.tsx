'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Show search on all pages
  const showSearch = true

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      {/* Main content area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header 
          onMenuToggle={handleMenuToggle}
          showSearch={showSearch}
        />
        
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}