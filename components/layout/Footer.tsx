import Link from 'next/link'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-dark border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* دسترسی ها */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">دسترسی ها</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* شبکه های اجتماعی */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">شبکه های اجتماعی</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  اینستاگرام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  تلگرام
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  لینکدین
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  واتساپ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          {/* دفتر مرکزی */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">دفتر مرکزی</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>جاده مخصوص کرج، گرمدره، خیابان تاج بخش، خیابان زرشکی، پلاک 14</p>
              <p>تا پنج شنبه / ۸ الی ۲۳</p>
              <p>تلفن: ۰۰۹۸۲۱۴۴۹۹۰۵۷۱</p>
            </div>
          </div>

          {/* کارخانه */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">کارخانه</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>منطقه آزاد تجاری صنعتی ارس فاز یک صنعتی خیابان 13</p>
              <p>پاسخگویی با هماهنگی قبلی</p>
              <p>تلفن: ۰۰۹۸۴۱۴۲۰۲۷۰۷۷</p>
            </div>
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-dark"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">ROMELA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

