'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'

export function Header() {
  const pathname = usePathname()
  const { getItemCount } = useCart()
  const cartCount = getItemCount()

  return (
    <header className="absolute top-14 left-0 w-full z-10 px-4 md:px-6 lg:px-32">
      {/* Content Container */} 
        <div className="w-full flex items-center justify-between">
          {/* Logo - Far Right (RTL) */}
          <Link href="/" className="flex-shrink-0 ml-6">
            <div className="bg-white rounded-3xl px-8 py-1 flex flex-col items-center justify-center shadow-lg ">
              <img src="/images/romela new logo 4.svg" alt="romela-logo" className="w-[4.5rem]" />
            </div>
          </Link>

          {/* Navigation Bar - Center */}
          <nav className="flex-1 flex items-center justify-center">
            <div className="bg-[#FFFFFF14] backdrop-blur-md rounded-full px-8 py-4 flex items-center gap-5 shadow-xl border border-[rgba(255,255,255,0.1)]">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
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

          {/* Spacer for balance - Left side */}
          <div className="flex-shrink-0 w-[150px]"></div>
        </div>
    </header>
  )
}

