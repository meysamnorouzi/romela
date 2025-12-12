import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-400 mb-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  )
}

