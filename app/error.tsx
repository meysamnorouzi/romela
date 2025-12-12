'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-4">خطا</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          مشکلی پیش آمده است
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" onClick={reset}>
            تلاش مجدد
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  )
}

