'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const pathname = usePathname()

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0000004D',
        }}
      />

      {/* Main Hero Content - Centered */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-20 z-10">
        <div className="container mx-auto max-w-6xl w-full">
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-[2.75rem] font-bold text-white leading-tight drop-shadow-lg">
              پادراد ارس نمایندگی رسمی محصولات - ROMELA OIL GERMANY 🇩🇪
            </h1>
          </div>

          {/* Search/Filter Module */}
          <div className="bg-[#FFFFFF14] backdrop-blur-md  px-8 py-4 shadow-xl border border-[rgba(255,255,255,0.1)] rounded-[35px] p-10 md:p-12">
            {/* Module Title */}
            <div className="text-right mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                جستجو روغن مناسب کاربری شما
              </h2>
              <p className="text-gray-200/90 text-base md:text-lg leading-relaxed pr-2">
                برای تجربه عملکرد بهتر موتور، روغن سازگار با نیازهای فنی خودروی خود را همینجا جستجو کنید.
              </p>
            </div>

            {/* Dropdown Filters and Search Button */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5">
              {/* Dropdown Filters */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="relative">
                  <select className="w-full bg-gray-800/90 text-white px-6 py-4.5 rounded-full border border-gray-500/60 appearance-none cursor-pointer hover:bg-gray-700/90 transition-all text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-gold/50">
                    <option value="" className="bg-gray-800">نوع روغن</option>
                    <option value="engine" className="bg-gray-800">روغن موتور</option>
                    <option value="gearbox" className="bg-gray-800">روغن گیربکس</option>
                    <option value="industrial" className="bg-gray-800">روغن صنعتی</option>
                  </select>
                  <svg 
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="relative">
                  <select className="w-full bg-gray-800/90 text-white px-6 py-4.5 rounded-full border border-gray-500/60 appearance-none cursor-pointer hover:bg-gray-700/90 transition-all text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-gold/50">
                    <option value="" className="bg-gray-800">کاربرد روغن</option>
                    <option value="passenger" className="bg-gray-800">خودروی سواری</option>
                    <option value="commercial" className="bg-gray-800">خودروی تجاری</option>
                    <option value="industrial" className="bg-gray-800">صنعتی</option>
                  </select>
                  <svg 
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="relative">
                  <select className="w-full bg-gray-800/90 text-white px-6 py-4.5 rounded-full border border-gray-500/60 appearance-none cursor-pointer hover:bg-gray-700/90 transition-all text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-gold/50">
                    <option value="" className="bg-gray-800">ویسکوزیتو</option>
                    <option value="5w30" className="bg-gray-800">5W-30</option>
                    <option value="5w40" className="bg-gray-800">5W-40</option>
                    <option value="10w40" className="bg-gray-800">10W-40</option>
                    <option value="15w40" className="bg-gray-800">15W-40</option>
                  </select>
                  <svg 
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="relative">
                  <select className="w-full bg-gray-800/90 text-white px-6 py-4.5 rounded-full border border-gray-500/60 appearance-none cursor-pointer hover:bg-gray-700/90 transition-all text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-gold/50">
                    <option value="" className="bg-gray-800">سطح کیفیت</option>
                    <option value="premium" className="bg-gray-800">پریمیوم</option>
                    <option value="standard" className="bg-gray-800">استاندارد</option>
                    <option value="economy" className="bg-gray-800">اقتصادی</option>
                  </select>
                  <svg 
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Search Product Button */}
              <button 
                className="text-white px-10 py-4.5 rounded-full font-bold text-base md:text-lg shadow-xl transition-all transform hover:scale-105 active:scale-100 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(to left, #d97706, #f59e0b)',
                }}
              >
                جستجو محصول
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

