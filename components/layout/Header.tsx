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
      className='fixed left-0 top-0 w-full z-50 bg-transparent'
      style={{ 
        paddingLeft: 'clamp(0.5rem, 1.56vw, 1.5rem)',
        paddingRight: 'clamp(0.5rem, 1.56vw, 1.5rem)',
        paddingTop: 'clamp(0.75rem, 1.25vw, 1rem)'
      }}
    >
      {/* Content Container */} 
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between 2xl:px-20 xl:px-8" style={{ 
          paddingTop: 'clamp(1rem, 1.25vw, 1rem)',
          paddingBottom: 'clamp(1rem, 1.25vw, 1rem)',
        }}>
          {/* Logo - Far Right (RTL) */}
          <Link href="/" className="flex-shrink-0" style={{ marginLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)' }} onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white rounded-3xl flex flex-col items-center justify-center shadow-lg" style={{ 
              paddingLeft: 'clamp(2rem, 2.08vw, 2rem)',
              paddingRight: 'clamp(2rem, 2.08vw, 2rem)',
              paddingTop: 'clamp(0.25rem, 0.31vw, 0.25rem)',
              paddingBottom: 'clamp(0.25rem, 0.31vw, 0.25rem)'
            }}>
              <img src="/images/romela new logo 4.svg" alt="romela-logo" style={{ width: 'clamp(4.5rem, 4.69vw, 4.5rem)' }} />
            </div>
          </Link>

          {/* Desktop Navigation Bar - Center - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex flex-1 items-center justify-center">
            <div className="bg-[#FFFFFF14] backdrop-blur-md rounded-full flex items-center shadow-xl border border-[rgba(255,255,255,0.1)]" style={{ 
              paddingLeft: 'clamp(2rem, 2.08vw, 2rem)',
              paddingRight: 'clamp(2rem, 2.08vw, 2rem)',
              paddingTop: 'clamp(1rem, 1.25vw, 1rem)',
              paddingBottom: 'clamp(1rem, 1.25vw, 1rem)',
              gap: 'clamp(1.25rem, 1.56vw, 1.25rem)'
            }}>
              {NAVIGATION_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-bold transition-all whitespace-nowrap"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
                      ...(active
                        ? {
                            background: 'white',
                            color: 'black',
                            paddingLeft: 'clamp(1.25rem, 1.56vw, 1.25rem)',
                            paddingRight: 'clamp(1.25rem, 1.56vw, 1.25rem)',
                            paddingTop: 'clamp(0.625rem, 0.78vw, 0.625rem)',
                            paddingBottom: 'clamp(0.625rem, 0.78vw, 0.625rem)',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }
                        : {
                            color: 'white',
                            paddingLeft: 'clamp(0.75rem, 0.94vw, 0.75rem)',
                            paddingRight: 'clamp(0.75rem, 0.94vw, 0.75rem)',
                            paddingTop: 'clamp(0.375rem, 0.47vw, 0.375rem)',
                            paddingBottom: 'clamp(0.375rem, 0.47vw, 0.375rem)'
                          })
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#e5e7eb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'white'
                      }
                    }}
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
            className="lg:hidden flex items-center justify-center bg-[#FFFFFF14] backdrop-blur-md rounded-full shadow-xl border border-[rgba(255,255,255,0.1)]"
            aria-label="Toggle menu"
            style={{ 
              width: 'clamp(3rem, 3.75vw, 3rem)',
              height: 'clamp(3rem, 3.75vw, 3rem)'
            }}
          >
            <div className="flex flex-col" style={{ gap: 'clamp(0.375rem, 0.47vw, 0.375rem)' }}>
              <span
                className={`block bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                style={{ 
                  height: '2px',
                  width: 'clamp(1.5rem, 1.56vw, 1.5rem)'
                }}
              />
              <span
                className={`block bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
                style={{ 
                  height: '2px',
                  width: 'clamp(1.5rem, 1.56vw, 1.5rem)'
                }}
              />
              <span
                className={`block bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                style={{ 
                  height: '2px',
                  width: 'clamp(1.5rem, 1.56vw, 1.5rem)'
                }}
              />
            </div>
          </button>

          {/* Spacer for balance - Left side - Hidden on mobile/tablet */}
          <div className="hidden lg:block flex-shrink-0" style={{ width: 'clamp(9.375rem, 9.38vw, 9.375rem)' }}></div>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" style={{ 
            marginTop: 'clamp(1rem, 1.25vw, 1rem)',
            marginLeft: 'clamp(1rem, 1.56vw, 3rem)',
            marginRight: 'clamp(1rem, 1.56vw, 3rem)'
          }}>
            <div className="bg-[#FFFFFF14] backdrop-blur-md rounded-3xl flex flex-col items-center shadow-xl border border-[rgba(255,255,255,0.1)]" style={{ 
              padding: 'clamp(1.5rem, 1.56vw, 1.5rem)',
              gap: 'clamp(1rem, 1.25vw, 1rem)'
            }}>
              {NAVIGATION_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-bold transition-all whitespace-nowrap w-full text-center"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
                      ...(active
                        ? {
                            background: 'white',
                            color: 'black',
                            paddingLeft: 'clamp(1.25rem, 1.56vw, 1.25rem)',
                            paddingRight: 'clamp(1.25rem, 1.56vw, 1.25rem)',
                            paddingTop: 'clamp(0.625rem, 0.78vw, 0.625rem)',
                            paddingBottom: 'clamp(0.625rem, 0.78vw, 0.625rem)',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }
                        : {
                            color: 'white',
                            paddingLeft: 'clamp(0.75rem, 0.94vw, 0.75rem)',
                            paddingRight: 'clamp(0.75rem, 0.94vw, 0.75rem)',
                            paddingTop: 'clamp(0.375rem, 0.47vw, 0.375rem)',
                            paddingBottom: 'clamp(0.375rem, 0.47vw, 0.375rem)'
                          })
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#e5e7eb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'white'
                      }
                    }}
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

