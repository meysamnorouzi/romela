import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'

export const metadata: Metadata = {
  title: 'Romela Oil Germany - روغن روملا آلمان',
  description: 'نمایندگی رسمی محصولات Romela Oil Germany',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

