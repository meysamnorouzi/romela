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
    <footer className="relative w-full bg-[#0e0e0e] xl:px-4 2xl:px-6">
      {/* Main Footer Container */}
      <div className="w-full max-w-[1920px] mx-auto xl:px-0 2xl:px-6" style={{ 
        paddingTop: 'clamp(2rem, 3.13vw, 4rem)', 
        paddingBottom: 'clamp(2rem, 3.13vw, 4rem)',
        paddingLeft: 'clamp(1rem, 1.56vw, 3rem)',
        paddingRight: 'clamp(1rem, 1.56vw, 3rem)'
      }}>
     <div className="2xl:px-16 xl:px-4">
         {/* Background Box with Border */}
         <div className="relative bg-[rgba(119,119,119,0.16)] border border-[#fcd856] rounded-3xl shadow-lg" style={{ 
          padding: 'clamp(1.5rem, 2.6vw, 3rem)'
        }}>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5" style={{ gap: 'clamp(2rem, 3.13vw, 3rem)' }}>

            {/* دسترسی ها */}
            <div>
              <h3 className="text-white font-bold text-right" style={{ 
                fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)'
              }}>
                دسترسی ها
              </h3>
              <div className="h-px w-full bg-white/40" style={{ marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)' }} />
              <ul style={{ gap: 'clamp(0.5rem, 0.78vw, 0.75rem)' }} className="flex flex-col">
                {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white hover:text-[#fcd856] transition-colors text-right block"
                      style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* شبکه های اجتماعی */}
            <div>
              <h3 className="text-white font-bold text-right" style={{ 
                fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)'
              }}>
                شبکه های اجتماعی
              </h3>
              <div className="h-px w-full bg-white/40" style={{ marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)' }} />
              <ul style={{ gap: 'clamp(0.5rem, 0.78vw, 0.75rem)' }} className="flex flex-col">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-[#fcd856] transition-colors text-right block"
                      style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#"
                    className="text-white hover:text-[#fcd856] transition-colors text-right block"
                    style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                  >
                    سوالات متداول
                  </Link>
                </li>
              </ul>
            </div>

            {/* دفتر مرکزی */}
            <div>
              <h3 className="text-white font-bold text-right" style={{ 
                fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)'
              }}>
                دفتر مرکزی
              </h3>
              <div className="h-px w-full bg-white/40" style={{ marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)' }} />
              <div className="text-right flex flex-col" style={{ gap: 'clamp(0.75rem, 1.04vw, 1rem)' }}>
                <p className="text-white leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  جاده مخصوص کرج، گرمدره، خیابان تاج بخش، خیابان زرشکی، پلاک 14، عمارت سام
                </p>
                <p className="text-white font-medium" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  تماس شنبه تا پنج شنبه / ۸ الی ۱۶:۳۰
                </p>
                <p className="text-white" dir="rtl" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  تلفن: ۳۶۱۰۸۵۰۰-۰۲۶
                </p>
              </div>
            </div>

            {/* کارخانه */}
            <div>
              <h3 className="text-white font-bold text-right" style={{ 
                fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)'
              }}>
                کارخانه
              </h3>
              <div className="h-px w-full bg-white/40" style={{ marginBottom: 'clamp(1rem, 1.56vw, 1.5rem)' }} />
              <div className="text-right flex flex-col" style={{ gap: 'clamp(0.75rem, 1.04vw, 1rem)' }}>
                <p className="text-white leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  منطقه آزاد تجاری صنعتی ارس، فاز یک صنعتی، خیابان 8/3
                </p>
                <p className="text-white font-medium" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  پاسخگویی با هماهنگی قبلی
                </p>
                <p className="text-white" dir="rtl" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
                  تلفن: ۴۲۰۳۱۴۱۰-۰۴۱
                </p>
              </div>
            </div>
            
            {/* Logo Section - Full width on mobile, first column on desktop */}
            <div className="md:col-span-2 lg:col-span-1 order-1 lg:order-1">
              <div className="bg-white rounded-3xl flex items-center justify-center h-full" style={{ 
                padding: 'clamp(1.5rem, 2.08vw, 2rem)',
                minHeight: 'clamp(200px, 15.63vw, 300px)'
              }}>
                <div className="relative" style={{ 
                  width: 'clamp(8rem, 10.42vw, 12rem)', 
                  height: 'clamp(8rem, 10.42vw, 12rem)' 
                }}>
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
      </div>
      <div className="w-full max-w-[1920px] mx-auto xl:px-0 2xl:px-6" style={{ 
        paddingTop: 'clamp(2rem, 3.13vw, 4rem)',
        paddingLeft: 'clamp(1rem, 1.56vw, 3rem)',
        paddingRight: 'clamp(1rem, 1.56vw, 3rem)'
      }}>
        <div className="2xl:px-16 xl:px-4">
        <img src="/images/Group 50.svg" alt="Footer Background" className="w-full h-full object-cover" />
        </div>
      </div>
    </footer>
  )
}
