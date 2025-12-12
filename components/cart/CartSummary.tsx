'use client'

import { useCart } from '@/hooks/useCart'
import { formatToman } from '@/lib/utils/format'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function CartSummary() {
  const { items, getTotal, clearCart } = useCart()
  const total = getTotal()
  const subtotal = total
  const shipping = 0 // Free shipping or calculate based on location
  const finalTotal = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="bg-dark-lighter rounded-xl p-8 text-center">
        <p className="text-gray-400 mb-6">سبد خرید شما خالی است</p>
        <Link href="/products">
          <Button variant="primary">مشاهده محصولات</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">خلاصه سفارش</h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>جمع کل:</span>
          <span className="text-white font-medium">{formatToman(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>هزینه ارسال:</span>
          <span className="text-white font-medium">
            {shipping === 0 ? 'رایگان' : formatToman(shipping)}
          </span>
        </div>
        <div className="border-t border-gray-700 pt-4 flex justify-between">
          <span className="text-xl font-bold text-white">مجموع:</span>
          <span className="text-2xl font-bold text-gold">{formatToman(finalTotal)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <Link href="/checkout" className="block">
          <Button variant="primary" size="lg" className="w-full">
            ادامه به پرداخت
          </Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={clearCart}
        >
          پاک کردن سبد
        </Button>
      </div>
    </div>
  )
}

