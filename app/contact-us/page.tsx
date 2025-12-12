'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  phone: z.string().min(10, 'شماره تلفن معتبر نیست'),
  subject: z.string().min(5, 'موضوع باید حداقل ۵ کاراکتر باشد'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Here you would send the form to your backend
    console.log('Contact form data:', data)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
          تماس با ما
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">فرم تماس</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="نام و نام خانوادگی"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="ایمیل"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                <Input
                  label="شماره تلفن"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
                <Input
                  label="موضوع"
                  {...register('subject')}
                  error={errors.subject?.message}
                />
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    پیام
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-dark-lighter rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">دفتر مرکزی</h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>جاده مخصوص کرج، گرمدره، خیابان تاج بخش، خیابان زرشکی، پلاک 14</p>
                <p>
                  <span className="font-medium">ساعات کاری:</span> تا پنج شنبه / ۸ الی ۲۳
                </p>
                <p>
                  <span className="font-medium">تلفن:</span> ۰۰۹۸۲۱۴۴۹۹۰۵۷۱
                </p>
              </div>
            </div>

            <div className="bg-dark-lighter rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">کارخانه</h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>منطقه آزاد تجاری صنعتی ارس فاز یک صنعتی خیابان 13</p>
                <p>
                  <span className="font-medium">پاسخگویی:</span> با هماهنگی قبلی
                </p>
                <p>
                  <span className="font-medium">تلفن:</span> ۰۰۹۸۴۱۴۲۰۲۷۰۷۷
                </p>
              </div>
            </div>

            <div className="bg-dark-lighter rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">شبکه های اجتماعی</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="px-4 py-2 bg-dark rounded-lg text-white hover:bg-gold transition-colors text-sm"
                >
                  اینستاگرام
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-dark rounded-lg text-white hover:bg-gold transition-colors text-sm"
                >
                  تلگرام
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-dark rounded-lg text-white hover:bg-gold transition-colors text-sm"
                >
                  لینکدین
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-dark rounded-lg text-white hover:bg-gold transition-colors text-sm"
                >
                  واتساپ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

