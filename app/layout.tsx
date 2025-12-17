import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romela-oil.com'
const siteName = 'Romela Oil Germany'
const siteDescription = 'نمایندگی رسمی محصولات Romela Oil Germany - روغن موتور، روغن گیربکس، روغن های صنعتی و محصولات با کیفیت آلمانی'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - روغن روملا آلمان`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'روغن موتور',
    'روغن گیربکس',
    'روغن صنعتی',
    'Romela Oil',
    'روغن روملا',
    'روغن آلمانی',
    'روغن موتور آلمان',
    'روغن هیدرولیک',
    'گریس',
    'روغن ترمز',
  ],
  authors: [{ name: 'Romela Oil Germany' }],
  creator: 'Romela Oil Germany',
  publisher: 'Romela Oil Germany',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/romela new logo 4.svg',
    shortcut: '/images/romela new logo 4.svg',
    apple: '/images/romela new logo 4.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: baseUrl,
    siteName: siteName,
    title: `${siteName} - روغن روملا آلمان`,
    description: siteDescription,
    images: [
      {
        url: '/images/romela new logo 4.svg',
        width: 1200,
        height: 630,
        alt: 'Romela Oil Germany Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - روغن روملا آلمان`,
    description: siteDescription,
    images: ['/images/romela new logo 4.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'fa-IR': baseUrl,
      'x-default': baseUrl,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen">
        <Header />
        {/* Reserve space for the fixed header on all pages.
            Home page cancels this with a negative top margin on its hero wrapper. */}
        <main className="min-h-screen pt-24 md:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

