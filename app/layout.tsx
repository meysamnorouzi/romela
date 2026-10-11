import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CallButton } from '@/components/layout/CallButton'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import '@/styles/globals.css'

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
    icon: [
      { url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
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
        url: '/images/og-cover.jpg',
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
    images: ['/images/og-cover.jpg'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/iranyekan/woff2/IRANYekanX-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/iransans/woff2/IRANSansX-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen-safe">
        {/* Clip overflow in an LTR box. Clipping an RTL box pins content to the right. */}
        <div className="site-shell min-h-screen-safe" dir="ltr">
          <Header />
          {/* Reserve space for the fixed header on all pages.
              Home cancels main pt-6 with -mt-6 on its root wrapper. */}
          <main dir="rtl" className="min-h-screen-safe w-full max-w-full px-4 sm:px-6 pt-6">
            {children}
            {/* After page content so this runs once the new page (and the contact map) has mounted. */}
            <ScrollToTop />
          </main>
          <Footer />
        </div>
        <CallButton />
      </body>
    </html>
  )
}

