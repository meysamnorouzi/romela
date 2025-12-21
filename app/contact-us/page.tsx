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
 <div className='w-full 2xl:mb-96 mb-16'>
     <div className="min-h-screen w-full overflow-hidden rounded-[1.5rem]" style={{
      backgroundImage: "url('/images/image 24.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
   <div className="w-full h-full absolute top-0 left-0 bg-[#0000004D] z-10"/>
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-80">

        <div className='w-full bg-white/20 backdrop-blur-sm rounded-xl py-16 px-24 border border-white/10'>
          {/* Contact Cards and Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-8 lg:mb-12">

            {/* Contact Form */}
            <div className="bg-[#FFFFFF33] backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 lg:col-span-1">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="نام کامل"
                    className="w-full bg-[#FFFFFF5C] rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
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
                    className="w-full bg-[#FFFFFF7F] rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
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
                    className="w-full bg-[#FFFFFF5C] rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
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
                    className="w-full bg-[#FFFFFF5C] rounded-full px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all"
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
                    className="w-full bg-[#FFFFFF5C] rounded-3xl px-6 py-3 sm:py-4 text-right text-black placeholder:text-black/70  text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F9BD65] transition-all resize-none"
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
                  className="w-full bg-[#E6A81699] hover:bg-[#E6A81699] rounded-full px-6 py-3 sm:py-4 text-[#fcfbee]  text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'در حال ارسال...' : isSubmitted ? 'پیام ارسال شد!' : 'ارسال پیام'}
                </button>
              </form>
            </div>

            <div className='col-span-2 grid grid-cols-2 gap-6 h-full'>
              {/* Factory Contact Card */}
              <div className="bg-[#FFFFFF33] backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
                <div className="flex flex-col items-center mb-6">
                  <div className="bg-[#614D1F99] rounded-full p-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99998 10.4167C11.3807 10.4167 12.5 9.29737 12.5 7.91666C12.5 6.53594 11.3807 5.41666 9.99998 5.41666C8.61927 5.41666 7.49998 6.53594 7.49998 7.91666C7.49998 9.29737 8.61927 10.4167 9.99998 10.4167Z" stroke="#F9BD65" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.99998 18.3333C11.6666 15 16.6666 12.8486 16.6666 8.33332C16.6666 4.65142 13.6819 1.66666 9.99998 1.66666C6.31808 1.66666 3.33331 4.65142 3.33331 8.33332C3.33331 12.8486 8.33331 15 9.99998 18.3333Z" stroke="#F9BD65" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </div>
                  <h3 className=" text-lg sm:text-xl text-white text-center font-iranyekan">
                    کارخانه
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 14.2864C3.14864 15.1031 2 16.2412 2 17.5C2 19.9853 6.47715 22 12 22C17.5228 22 22 19.9853 22 17.5C22 16.2412 20.8514 15.1031 19 14.2864M18 8C18 12.0637 13.5 14 12 17C10.5 14 6 12.0637 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </div>
                    <p className=" text-sm sm:text-base text-white text-right flex-1 font-iranyekan">
                      منطقه آزاد ارس، فاز یک صنعتی، خیابان۸/۳
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6197 8.85323C14.9237 10.3028 13.9749 11.6615 12.7734 12.8631C11.5718 14.0646 10.2131 15.0134 8.76352 15.7094C8.63883 15.7693 8.57648 15.7992 8.49759 15.8222C8.21724 15.904 7.87298 15.8453 7.63555 15.6752C7.56874 15.6274 7.51158 15.5702 7.39727 15.4559C7.04767 15.1063 6.87286 14.9315 6.69708 14.8172C6.03419 14.3862 5.17961 14.3862 4.51672 14.8172C4.34094 14.9315 4.16614 15.1063 3.81653 15.4559L3.62167 15.6508C3.09022 16.1822 2.8245 16.448 2.68016 16.7333C2.39309 17.3009 2.39309 17.9712 2.68016 18.5387C2.8245 18.8241 3.09022 19.0898 3.62167 19.6213L3.7793 19.7789C4.30892 20.3085 4.57374 20.5733 4.93377 20.7756C5.33327 21 5.95376 21.1614 6.41199 21.16C6.82493 21.1588 7.10716 21.0787 7.6716 20.9185C10.705 20.0575 13.5674 18.433 15.9553 16.045C18.3433 13.6571 19.9678 10.7947 20.8288 7.76131C20.989 7.19687 21.0691 6.91464 21.0703 6.5017C21.0717 6.04347 20.9103 5.42298 20.6859 5.02348C20.4836 4.66345 20.2188 4.39863 19.6892 3.86901L19.5316 3.71138C19.0001 3.17993 18.7344 2.91421 18.449 2.76987C17.8815 2.4828 17.2112 2.4828 16.6436 2.76987C16.3583 2.91421 16.0925 3.17993 15.5611 3.71138L15.3662 3.90625C15.0166 4.25585 14.8418 4.43065 14.7275 4.60643C14.2965 5.26932 14.2965 6.1239 14.7275 6.78679C14.8418 6.96257 15.0166 7.13738 15.3662 7.48698C15.4805 7.60129 15.5377 7.65845 15.5855 7.72526C15.7555 7.96269 15.8142 8.30695 15.7325 8.5873C15.7095 8.6662 15.6796 8.72854 15.6197 8.85323Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p className=" text-sm sm:text-base text-white font-iranyekan">
                      ۰۴۱-۴۲۰۳۱۴۱۰
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p className=" text-sm sm:text-base text-white text-right font-iranyekan">
                      ساعت ۸ صبح تا ۱۷
                      <br />
                      با هماهنگی قبلی
                    </p>
                  </div>
                </div>
              </div>

              {/* Headquarters Contact Card */}
              <div className="bg-[#FFFFFF33] backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="flex flex-col items-center mb-6">
                  <div className="bg-[#614D1F99] rounded-full p-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99998 10.4167C11.3807 10.4167 12.5 9.29737 12.5 7.91666C12.5 6.53594 11.3807 5.41666 9.99998 5.41666C8.61927 5.41666 7.49998 6.53594 7.49998 7.91666C7.49998 9.29737 8.61927 10.4167 9.99998 10.4167Z" stroke="#F9BD65" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.99998 18.3333C11.6666 15 16.6666 12.8486 16.6666 8.33332C16.6666 4.65142 13.6819 1.66666 9.99998 1.66666C6.31808 1.66666 3.33331 4.65142 3.33331 8.33332C3.33331 12.8486 8.33331 15 9.99998 18.3333Z" stroke="#F9BD65" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </div>
                  <h3 className=" text-lg sm:text-xl text-white text-center font-iranyekan">
                    دفتر مرکزی
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 14.2864C3.14864 15.1031 2 16.2412 2 17.5C2 19.9853 6.47715 22 12 22C17.5228 22 22 19.9853 22 17.5C22 16.2412 20.8514 15.1031 19 14.2864M18 8C18 12.0637 13.5 14 12 17C10.5 14 6 12.0637 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p className=" text-sm sm:text-base text-white text-right flex-1 font-iranyekan">
                      جاده مخصوص کرج، گرمدره، خیابان تاج‌بخش، خیابان زرشکی، پلاک ۱۴، عمارت سام
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6197 8.85323C14.9237 10.3028 13.9749 11.6615 12.7734 12.8631C11.5718 14.0646 10.2131 15.0134 8.76352 15.7094C8.63883 15.7693 8.57648 15.7992 8.49759 15.8222C8.21724 15.904 7.87298 15.8453 7.63555 15.6752C7.56874 15.6274 7.51158 15.5702 7.39727 15.4559C7.04767 15.1063 6.87286 14.9315 6.69708 14.8172C6.03419 14.3862 5.17961 14.3862 4.51672 14.8172C4.34094 14.9315 4.16614 15.1063 3.81653 15.4559L3.62167 15.6508C3.09022 16.1822 2.8245 16.448 2.68016 16.7333C2.39309 17.3009 2.39309 17.9712 2.68016 18.5387C2.8245 18.8241 3.09022 19.0898 3.62167 19.6213L3.7793 19.7789C4.30892 20.3085 4.57374 20.5733 4.93377 20.7756C5.33327 21 5.95376 21.1614 6.41199 21.16C6.82493 21.1588 7.10716 21.0787 7.6716 20.9185C10.705 20.0575 13.5674 18.433 15.9553 16.045C18.3433 13.6571 19.9678 10.7947 20.8288 7.76131C20.989 7.19687 21.0691 6.91464 21.0703 6.5017C21.0717 6.04347 20.9103 5.42298 20.6859 5.02348C20.4836 4.66345 20.2188 4.39863 19.6892 3.86901L19.5316 3.71138C19.0001 3.17993 18.7344 2.91421 18.449 2.76987C17.8815 2.4828 17.2112 2.4828 16.6436 2.76987C16.3583 2.91421 16.0925 3.17993 15.5611 3.71138L15.3662 3.90625C15.0166 4.25585 14.8418 4.43065 14.7275 4.60643C14.2965 5.26932 14.2965 6.1239 14.7275 6.78679C14.8418 6.96257 15.0166 7.13738 15.3662 7.48698C15.4805 7.60129 15.5377 7.65845 15.5855 7.72526C15.7555 7.96269 15.8142 8.30695 15.7325 8.5873C15.7095 8.6662 15.6796 8.72854 15.6197 8.85323Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </div>
                    <p className=" text-sm sm:text-base text-white font-iranyekan">
                      ۰۲۶-۳۶۱۰۸۵۰۰
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p className=" text-sm sm:text-base text-white text-right font-iranyekan">
                      ساعت ۸ صبح تا ۱۷
                      <br />
                      با هماهنگی قبلی
                    </p>
                  </div>
                </div>
              </div>
              {/* Social Media Bar */}
              <div className="bg-[#FFFFFF33] backdrop-blur-sm rounded-xl p-5 border border-white/10 col-span-2 h-fit">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">

                  {/* Email */}
                  <a
                    href="mailto:info@padradarasoil.com"
                    className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.4161L9.96393 11.7282L2.8604 19H20.9591L13.9863 11.7159L12 13.4161ZM15.0026 10.9441L21.7579 17.9678C21.7966 17.8315 21.8242 17.6903 21.8242 17.5411V5.4008L15.0026 10.9441ZM2.17578 5.37256V17.5411C2.17578 17.6903 2.20341 17.8315 2.2421 17.9678L9.0202 10.9668L2.17578 5.37256ZM21.2102 4.25751H2.7898L12 11.6374L21.2102 4.25751Z" fill="black" />
                      </svg>
                    </div>
                    <p className=" text-xs sm:text-sm text-black font-iranyekan">
                      info@padradarasoil.com
                    </p>
                  </a>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-12 bg-white/30" />

                  {/* Social Icons */}
                  <div className="flex items-center gap-5 sm:gap-6">
                    <img src="/images/whatsapp-whats-app-svgrepo-com.svg" alt="" />
                    <img src="/images/linkedin-round-svgrepo-com.svg" alt="" />
                    <img src="/images/telegram-svgrepo-com.svg" alt="" />
                    <img src="/images/instagram-svgrepo-com.svg" alt="" />
                  </div>
                </div>
              </div>
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

        </div>
      </div>
    </div>
 </div>
  )
}
