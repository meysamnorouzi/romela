'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '@/hooks/useCart'
import { CartItem } from '@/components/cart/CartItem'
import { formatToman } from '@/lib/utils/format'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  phone: z.string().min(10, 'شماره تلفن معتبر نیست'),
  address: z.string().min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد'),
  city: z.string().min(2, 'شهر را وارد کنید'),
  postalCode: z.string().min(5, 'کد پستی معتبر نیست'),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const total = getTotal()
  const shipping = 0
  const finalTotal = total + shipping

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    // Here you would send the order to your backend
    console.log('Order data:', { ...data, items, total: finalTotal })
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Clear cart after successful order
    clearCart()
    setIsSubmitting(false)
    
    // Redirect to success page (you would create this)
    alert('سفارش شما با موفقیت ثبت شد!')
  }

  if (items.length === 0) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-dark-lighter rounded-xl p-12 text-center">
            <p className="text-2xl text-gray-400 mb-6">سبد خرید شما خالی است</p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                مشاهده محصولات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
          تسویه حساب
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="نام"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                  />
                  <Input
                    label="نام خانوادگی"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                  />
                  <Input
                    label="ایمیل"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="شماره تلفن"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>
              </div>

              <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">آدرس ارسال</h2>
                <div className="space-y-4">
                  <Input
                    label="آدرس"
                    {...register('address')}
                    error={errors.address?.message}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="شهر"
                      {...register('city')}
                      error={errors.city?.message}
                    />
                    <Input
                      label="کد پستی"
                      {...register('postalCode')}
                      error={errors.postalCode?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      یادداشت (اختیاری)
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      placeholder="یادداشت یا دستورالعمل خاص برای سفارش..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-dark-lighter rounded-xl p-6 md:p-8 sticky top-32">
                <h2 className="text-2xl font-bold text-white mb-6">خلاصه سفارش</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400">
                          {item.quantity} × {formatToman(item.price)}
                        </p>
                      </div>
                      <p className="text-gold font-bold">
                        {formatToman(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>جمع کل:</span>
                    <span className="text-white font-medium">{formatToman(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>هزینه ارسال:</span>
                    <span className="text-white font-medium">رایگان</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between">
                    <span className="text-xl font-bold text-white">مجموع:</span>
                    <span className="text-2xl font-bold text-gold">
                      {formatToman(finalTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'در حال ثبت سفارش...' : 'ثبت سفارش'}
                </Button>

                <Link href="/cart" className="block mt-4">
                  <Button variant="outline" size="lg" className="w-full">
                    بازگشت به سبد
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

