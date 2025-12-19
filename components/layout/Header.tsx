'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if a nav item is active, handling nested routes
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className='fixed left-0 top-0 w-full z-50 px-4 md:px-6 bg-transparent pt-4'
    >
      {/* Content Container */} 
        <div className="w-full flex items-center justify-between py-4 px-6 md:px-12 lg:px-24">
          {/* Logo - Far Right (RTL) */}
          <Link href="/" className="flex-shrink-0 ml-6" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white rounded-3xl px-8 py-1 flex flex-col items-center justify-center shadow-lg ">
              <img src="/images/romela new logo 4.svg" alt="romela-logo" className="w-[4.5rem]" />
            </div>
          </Link>

          {/* Desktop Navigation Bar - Center - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <div className="bg-[#FFFFFF14] backdrop-blur-md rounded-full px-8 py-4 flex items-center gap-5 shadow-xl border border-[rgba(255,255,255,0.1)]">
              {NAVIGATION_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all whitespace-nowrap ${
                      active
                        ? 'bg-white text-black px-5 py-2.5 rounded-full font-semibold shadow-md'
                        : 'text-white hover:text-gray-200 px-3 py-1.5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 bg-[#FFFFFF14] backdrop-blur-md rounded-full shadow-xl border border-[rgba(255,255,255,0.1)]"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>

          {/* Spacer for balance - Left side - Hidden on mobile/tablet */}
          <div className="hidden lg:block flex-shrink-0 w-[150px]"></div>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 mx-4 md:mx-12">
            <div className="bg-[#FFFFFF14] backdrop-blur-md rounded-3xl px-6 py-6 flex flex-col items-center gap-4 shadow-xl border border-[rgba(255,255,255,0.1)]">
              {NAVIGATION_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-all whitespace-nowrap w-full text-center ${
                      active
                        ? 'bg-white text-black px-5 py-2.5 rounded-full font-semibold shadow-md'
                        : 'text-white hover:text-gray-200 px-3 py-1.5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
    </header>
  )
}

