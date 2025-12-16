'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import svgPaths from "../products/imports/svg-efqwtho29q"
import clsx from "clsx";
import { imgImage24 } from "../products/imports/svg-fckud";
import { imgScreenshot20251215At1246271 } from "../products/imports/image-placeholders";

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
    <div className="relative min-h-screen bg-[#0e0e0e] w-full overflow-hidden pt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/image 24.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* Contact Cards and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-8 lg:mb-12">
          {/* Factory Contact Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-[rgba(97,77,31,0.6)] rounded-full p-3 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <g clipPath="url(#clip0_2_639)">
                    <g>
                      <path d={svgPaths.p1a654450} stroke="#F9BD65" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p29131d00} stroke="#F9BD65" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2_639">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="font-['IRANYekanX:Bold',sans-serif] text-lg sm:text-xl text-white text-center">
                کارخانه
              </h3>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p2e30000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white text-right flex-1">
                  منطقه آزاد ارس، فاز یک صنعتی، خیابان۸/۳
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-white rotate-180 scale-y-[-100%]" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p1f9b9300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white">
                  ۰۴۱-۴۲۰۳۱۴۱۰
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p2d341f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white text-right">
                  ساعت ۸ صبح تا ۱۷
                  <br />
                  با هماهنگی قبلی
                </p>
              </div>
            </div>
          </div>

          {/* Headquarters Contact Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-[rgba(97,77,31,0.6)] rounded-full p-3 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <g clipPath="url(#clip0_2_639_2)">
                    <g>
                      <path d={svgPaths.p1a654450} stroke="#F9BD65" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p29131d00} stroke="#F9BD65" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2_639_2">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="font-['IRANYekanX:Bold',sans-serif] text-lg sm:text-xl text-white text-center">
                دفتر مرکزی
              </h3>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p2e30000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white text-right flex-1">
                  جاده مخصوص کرج، گرمدره، خیابان تاج‌بخش، خیابان زرشکی، پلاک ۱۴، عمارت سام
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-white rotate-180 scale-y-[-100%]" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p1f9b9300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white">
                  ۰۲۶-۳۶۱۰۸۵۰۰
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p2d341f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
                    </g>
                  </svg>
                </div>
                <p className="font-['IRANYekanX:Bold',sans-serif] text-sm sm:text-base text-white text-right">
                  ساعت ۸ صبح تا ۱۷
                  <br />
                  با هماهنگی قبلی
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 lg:col-span-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="نام کامل"
                  className="w-full bg-white/36 rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70 font-['IRANSansX:DemiBold',sans-serif] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
                  dir="auto"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 text-right">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="شماره تماس"
                  className="w-full bg-white/36 rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70 font-['IRANSansX:DemiBold',sans-serif] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
                  dir="auto"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-400 text-right">{errors.phone.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="ایمیل"
                  className="w-full bg-white/36 rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70 font-['IRANSansX:DemiBold',sans-serif] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
                  dir="auto"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 text-right">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="موضوع"
                  className="w-full bg-white/36 rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70 font-['IRANSansX:DemiBold',sans-serif] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
                  dir="auto"
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-400 text-right">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  {...register('message')}
                  placeholder="پیام شما"
                  rows={4}
                  className="w-full bg-white/36 rounded-3xl px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70 font-['IRANSansX:DemiBold',sans-serif] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all resize-none"
                  dir="auto"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400 text-right">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[rgba(230,168,22,0.6)] hover:bg-[rgba(230,168,22,0.8)] rounded-full px-6 py-3 sm:py-4 text-[#fcfbee] font-['IRANSansX:Bold',sans-serif] text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'در حال ارسال...' : isSubmitted ? 'پیام ارسال شد!' : 'ارسال پیام'}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 mb-8 lg:mb-12">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
            <img 
              alt="نقشه" 
              className="w-full h-full object-cover" 
              src="/images/Screenshot 2025-12-15 at 12.46.27 1.png" 
            />
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Instagram */}
              <a 
                href="#" 
                className="w-6 h-6 sm:w-8 sm:h-8 transition-transform hover:scale-110"
                aria-label="اینستاگرام"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <g clipPath="url(#clip0_2_664)">
                    <path d={svgPaths.p1c665200} fill="#C13584" />
                    <path d={svgPaths.pad86880} fill="white" />
                    <path d={svgPaths.p2a2bbd80} fill="white" />
                    <path d={svgPaths.p16e28f80} fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_664">
                      <rect fill="white" height="24" width="24" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              {/* Telegram */}
              <a 
                href="#" 
                className="w-6 h-6 sm:w-8 sm:h-8 transition-transform hover:scale-110"
                aria-label="تلگرام"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <g clipPath="url(#clip0_2_644)">
                    <rect fill="white" height="24" rx="12" width="24" />
                    <path d={svgPaths.p17f74a00} fill="#0FDCF3" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_644">
                      <rect fill="white" height="24" width="24" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#" 
                className="w-6 h-6 sm:w-8 sm:h-8 transition-transform hover:scale-110"
                aria-label="لینکدین"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <g clipPath="url(#clip0_2_622)">
                    <rect fill="white" height="24" rx="12" width="24" />
                    <path d={svgPaths.p351b9f80} fill="#3017EB" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_622">
                      <rect fill="white" height="24" width="24" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href="#" 
                className="w-6 h-6 sm:w-8 sm:h-8 transition-transform hover:scale-110"
                aria-label="واتساپ"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <g>
                    <path d={svgPaths.p23571680} fill="#25D366" />
                    <path d={svgPaths.p38c9ebc0} fill="white" />
                  </g>
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-white/30" />

            {/* Email */}
            <a 
              href="mailto:info@padradarasoil.com"
              className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors"
            >
              <p className="font-['IRANYekanX:Bold',sans-serif] text-xs sm:text-sm text-black">
                info@padradarasoil.com
              </p>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 15">
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p339b37c0} fill="black" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
