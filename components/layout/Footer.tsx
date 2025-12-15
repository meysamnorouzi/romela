import Link from 'next/link'
import Image from 'next/image'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export function Footer() {
  const socialLinks = [
    { label: 'اینستاگرام', href: '#' },
    { label: 'تلگرام', href: '#' },
    { label: 'لینکدین', href: '#' },
    { label: 'واتساپ', href: '#' },
  ]

  return (
    <footer className="relative w-full bg-[#0e0e0e] mt-16 md:mt-24 lg:mt-32">
      {/* Main Footer Container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12 lg:py-16">
        {/* Background Box with Border */}
        <div className="relative bg-[rgba(119,119,119,0.16)] border border-[#fcd856] rounded-3xl shadow-lg p-6 md:p-8 lg:p-12">
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">

            {/* دسترسی ها */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-6 text-right">
                دسترسی ها
              </h3>
              <div className="h-px w-full bg-white/40 mb-4 md:mb-6" />
              <ul className="space-y-2 md:space-y-3">
                {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white text-sm md:text-base hover:text-[#fcd856] transition-colors text-right block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* شبکه های اجتماعی */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-6 text-right">
                شبکه های اجتماعی
              </h3>
              <div className="h-px w-full bg-white/40 mb-4 md:mb-6" />
              <ul className="space-y-2 md:space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white text-sm md:text-base hover:text-[#fcd856] transition-colors text-right block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#"
                    className="text-white text-sm md:text-base hover:text-[#fcd856] transition-colors text-right block"
                  >
                    سوالات متداول
                  </Link>
                </li>
              </ul>
            </div>

            {/* دفتر مرکزی */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-6 text-right">
                دفتر مرکزی
              </h3>
              <div className="h-px w-full bg-white/40 mb-4 md:mb-6" />
              <div className="space-y-3 md:space-y-4 text-right">
                <p className="text-white text-xs md:text-sm leading-relaxed">
                  جاده مخصوص کرج، گرمدره، خیابان تاج بخش، خیابان زرشکی، پلاک 14، عمارت سام
                </p>
                <p className="text-white text-xs md:text-sm font-medium">
                  تماس شنبه تا پنج شنبه / ۸ الی ۱۶:۳۰
                </p>
                <p className="text-white text-xs md:text-sm" dir="rtl">
                  تلفن: ۳۶۱۰۸۵۰۰-۰۲۶
                </p>
              </div>
            </div>

            {/* کارخانه */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-6 text-right">
                کارخانه
              </h3>
              <div className="h-px w-full bg-white/40 mb-4 md:mb-6" />
              <div className="space-y-3 md:space-y-4 text-right">
                <p className="text-white text-xs md:text-sm leading-relaxed">
                  منطقه آزاد تجاری صنعتی ارس، فاز یک صنعتی، خیابان 8/3
                </p>
                <p className="text-white text-xs md:text-sm font-medium">
                  پاسخگویی با هماهنگی قبلی
                </p>
                <p className="text-white text-xs md:text-sm" dir="rtl">
                  تلفن: ۴۲۰۳۱۴۱۰-۰۴۱
                </p>
              </div>
            </div>
            
            {/* Logo Section - Full width on mobile, first column on desktop */}
            <div className="md:col-span-2 lg:col-span-1 order-1 lg:order-1">
              <div className="bg-white rounded-3xl p-6 md:p-8 flex items-center justify-center h-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px]">
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                  <Image
                    src="/images/romela new logo 4.svg"
                    alt="Romela Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 md:pt-12 lg:pt-16">
      <img src="/images/Group 50.svg" alt="Footer Background" className="w-full h-full object-cover" />
      </div>
    </footer>
  )
}
