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
    <header className="relative w-full h-[140px] overflow-hidden">
      {/* Background with golden bubbles/droplets */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0">
          {/* Golden bubbles/droplets effect - multiple layers for depth */}
          <div className="absolute w-full h-full">
            {/* Large background bubbles */}
            <div className="absolute top-8 right-[8%] w-36 h-36 bg-[#FFD700] rounded-full opacity-25 blur-2xl"></div>
            <div className="absolute top-12 right-[25%] w-28 h-28 bg-[#FFA500] rounded-full opacity-30 blur-xl"></div>
            <div className="absolute top-6 right-[48%] w-44 h-44 bg-[#FFD700] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute top-16 right-[68%] w-32 h-32 bg-[#FFA500] rounded-full opacity-28 blur-2xl"></div>
            <div className="absolute top-20 right-[82%] w-40 h-40 bg-[#FFD700] rounded-full opacity-22 blur-2xl"></div>
            
            {/* Medium bubbles */}
            <div className="absolute bottom-12 right-[12%] w-24 h-24 bg-[#FFA500] rounded-full opacity-32 blur-xl"></div>
            <div className="absolute bottom-18 right-[42%] w-48 h-48 bg-[#FFD700] rounded-full opacity-18 blur-3xl"></div>
            <div className="absolute bottom-14 right-[62%] w-30 h-30 bg-[#FFA500] rounded-full opacity-26 blur-xl"></div>
            <div className="absolute bottom-8 right-[78%] w-36 h-36 bg-[#FFD700] rounded-full opacity-28 blur-2xl"></div>
            
            {/* Small focused bubbles */}
            <div className="absolute top-32 right-[18%] w-20 h-20 bg-[#FFA500] rounded-full opacity-38 blur-lg"></div>
            <div className="absolute top-42 right-[55%] w-26 h-26 bg-[#FFD700] rounded-full opacity-32 blur-xl"></div>
            <div className="absolute bottom-32 right-[22%] w-18 h-18 bg-[#FFA500] rounded-full opacity-40 blur-md"></div>
            <div className="absolute bottom-28 right-[38%] w-22 h-22 bg-[#FFD700] rounded-full opacity-35 blur-lg"></div>
            <div className="absolute top-38 right-[72%] w-24 h-24 bg-[#FFA500] rounded-full opacity-30 blur-lg"></div>
            <div className="absolute bottom-38 right-[88%] w-20 h-20 bg-[#FFD700] rounded-full opacity-36 blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full flex items-center justify-between">
          {/* Logo - Far Right (RTL) */}
          <Link href="/" className="flex-shrink-0 ml-6">
            <div className="bg-white rounded-lg px-5 py-3.5 flex flex-col items-center justify-center shadow-lg min-w-[150px]">
              {/* Gear Icon with Droplet */}
              <div className="relative mb-1.5">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124a6.68 6.68 0 01.22-.128c.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  {/* Droplet inside gear - German flag colors (black, red, yellow) */}
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="3"
                    ry="4"
                    fill="url(#dropletGradient)"
                  />
                  <defs>
                    <linearGradient id="dropletGradient" x1="12" y1="8" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="33.33%" stopColor="#000000" />
                      <stop offset="33.34%" stopColor="#DD0000" />
                      <stop offset="66.66%" stopColor="#DD0000" />
                      <stop offset="66.67%" stopColor="#FFCE00" />
                      <stop offset="100%" stopColor="#FFCE00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* ROMELA Text */}
              <span className="text-black text-base font-bold tracking-wider leading-tight">ROMELA</span>
            </div>
          </Link>

          {/* Navigation Bar - Center */}
          <nav className="flex-1 flex items-center justify-center">
            <div className="bg-[rgba(45,45,45,0.85)] backdrop-blur-md rounded-2xl px-8 py-3.5 flex items-center gap-5 shadow-xl border border-[rgba(255,255,255,0.1)]">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-black px-5 py-2.5 rounded-lg font-semibold shadow-md'
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
      </div>
    </header>
  )
}

