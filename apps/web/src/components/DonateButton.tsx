'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function DonateButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPaypalModal, setShowPaypalModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handlePaypalClick = () => {
    setShowPaypalModal(true)
    setIsOpen(false)
  }

  const handleBuyMeCoffeeClick = () => {
    window.open('https://buymeacoffee.com/brianmk', '_blank')
    setIsOpen(false)
  }

  const donationOptions = [
    {
      name: 'PayPal',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.421c-.315-.178-.7-.284-1.139-.284H12.12l-.98 6.22h2.426c2.963 0 4.307-1.432 4.307-4.307 0-.69-.12-1.208-.651-1.208z" />
        </svg>
      ),
      onClick: handlePaypalClick
    },
    {
      name: 'Buy Me a Coffee',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-.766-1.688a4.436 4.436 0 0 0-1.288-1.23c-.829-.53-1.798-.687-2.76-.687-4.024 0-4.95 1.42-4.95 2.434 0 .214.363.403.534.434.408.073.84-.132 1.154-.1.888.088 1.738.54 2.358 1.15.333.328.629.722.629 1.15v.71c0 .334-.077.67-.225.972-.148.302-.362.579-.629.79-.267.211-.577.364-.918.445-.34.081-.7.081-1.04 0-.34-.081-.65-.234-.918-.445-.267-.211-.481-.488-.629-.79-.148-.302-.225-.638-.225-.972v-.71c0-.428.296-.822.629-1.15.62-.61 1.47-1.062 2.358-1.15.314-.032.746.027 1.154.1.171-.031.534-.22.534-.434 0-1.014-.926-2.434-4.95-2.434-.962 0-1.931.157-2.76.687a4.436 4.436 0 0 0-1.288 1.23c-.378.525-.647 1.09-.766 1.688L3.784 6.415c-.16.8-.24 1.617-.24 2.439v4.272c0 1.272.322 2.4.968 3.382.645.983 1.51 1.557 2.595 1.557 1.085 0 1.95-.574 2.595-1.557.646-.982.968-2.11.968-3.382V8.854c0-.822-.08-1.639-.24-2.439z" />
        </svg>
      ),
      onClick: handleBuyMeCoffeeClick
    }
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-[#E0E0E0] hover:text-[#FFD700] bg-[#1A1A1A] hover:bg-[#222222] rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-200 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="hidden sm:inline">Support</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#333333] rounded-lg shadow-2xl z-50"
        >
          <div className="py-2">
            {donationOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.onClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#E0E0E0] hover:text-[#FFD700] hover:bg-[#222222] transition-colors text-left"
              >
                <span className="text-[#FFD700]">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PayPal Modal */}
      {showPaypalModal && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowPaypalModal(false)}
        >
          <div
            className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 sm:p-6 shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-[#FFD700]">PayPal Support</h3>
              <button
                onClick={() => setShowPaypalModal(false)}
                className="text-[#E0E0E0] hover:text-[#FFD700] transition-colors cursor-pointer "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#E0E0E0] mb-4 text-sm sm:text-base">
              Thanks for choosing to support! Please use the following email to support via PayPal:
            </p>
            <div className="bg-[#2A2A2A] border border-[#444444] rounded p-3 mb-4">
              <code className="text-[#39FF14] font-mono text-xs sm:text-sm break-all">briankmutea@gmail.com</code>
            </div>
            <button
              onClick={() => setShowPaypalModal(false)}
              className="w-full cursor-pointer bg-[#FFD700] text-black font-semibold py-2 sm:py-3 px-4 rounded hover:bg-[#E6C200] transition-colors text-sm sm:text-base"
            >
              Got it!
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}