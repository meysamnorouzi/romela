import Link from 'next/link'
import Image from 'next/image'

export default function AboutUsPage() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative xl:px-0 2xl:px-6 sm:px-6">
      <div className="relative w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-24 md:pt-32" style={{
        paddingBottom: 'clamp(3rem, 10.42vw, 5rem)'
      }}>
        {/* Title */}
        <h1 className="text-center text-white font-bold tracking-wide font-iranyekan text-xl sm:text-[2.125rem]  mb-6 md:mb-10">درباره ما</h1>

        {/* Breadcrumb */}
        <div className="flex justify-start mb-14">
          <div className="font-bold text-[#9A9A9A]" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
            <Link href="/" className="hover:text-[#717171]">صفحه اصلی</Link>
            <span style={{ marginLeft: 'clamp(0.7rem, 0.83vw, 0.7rem)', marginRight: 'clamp(0.7rem, 0.83vw, 0.7rem)' }}>/</span>
            <span className="text-[#F58F4A]">درباره ما</span>
          </div>
        </div>

        {/* Hero Section - معرفی Romela آلمان */}
        <section className="mb-12 md:mb-16" style={{ marginBottom: 'clamp(3rem, 6.25vw, 6rem)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-[#343434] rounded-[24px] overflow-hidden relative" style={{
              aspectRatio: '16/9',
              minHeight: 'clamp(200px, 25vw, 400px)'
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                 <img src="/images/image 9.png" alt="Romela Logo" className="w-[70%] object-contain" />
              </div>
            </div>
            <div dir="rtl">
              <h2 className="text-white font-bold font-iranyekan mb-6" style={{
                fontSize: 'clamp(1.5rem, 2.08vw, 2rem)',
                marginBottom: 'clamp(1.5rem, 2.08vw, 2rem)'
              }}>
                معرفی Romela آلمان
              </h2>
              <div className="text-white/90 space-y-4 text-justify" style={{
                fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
                lineHeight: '1.8'
              }}>
                <p>
                  شرکت Romela Oil یک برند آلمانی در حوزه تولید انواع روانکارها و روغن‌های صنعتی و خودرویی است که محصولات خود را بر پایه‌ی فناوری روز اروپا و استانداردهای کیفی بین‌المللی تولید می‌کند. تمرکز اصلی Romela بر طراحی و تولید روانکارهایی است که علاوه بر محافظت مؤثر از موتور و تجهیزات صنعتی، موجب افزایش کارایی، کاهش استهلاک و بهبود بهره‌وری سیستم‌ها شوند.
                </p>
                <p>
                  محصولات Romela شامل طیف گسترده‌ای از روغن موتور، روغن گیربکس، روغن‌های صنعتی، روغن هیدرولیک و افزودنی‌های تخصصی است که برای خودروهای سبک و سنگین، ماشین‌آلات صنعتی و تجهیزات پیشرفته طراحی شده‌اند. این محصولات مطابق با استانداردهای جهانی نظیر API و ACEA بوده و بسیاری از آن‌ها دارای تأییدیه خودروسازان (OEM Approvals) هستند.
                </p>
                <p>
                  کیفیت پایدار، دقت در فرمولاسیون و استفاده از مواد اولیه مرغوب، Romela را به برندی مطمئن برای حرفه‌ای‌ها، صنایع و مصرف‌کنندگان تبدیل کرده است. هدف این برند ارائه راهکارهای روانکاری قابل‌اعتماد و اقتصادی، همراه با عملکردی مداوم و پایدار در شرایط کاری مختلف است.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section - همکاری با Romela Oil */}
        <section className="mb-12 md:mb-16" style={{ marginBottom: 'clamp(3rem, 6.25vw, 6rem)' }}>
          <h2 className="text-white font-bold font-iranyekan mb-8 text-center" style={{
            fontSize: 'clamp(1.5rem, 2.08vw, 2rem)',
            marginBottom: 'clamp(2rem, 3.13vw, 3rem)'
          }}>
            همکاری با شرکت Romela Oil آلمان
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                image: '/images/Group-4-1.png',
                alt: 'Romela Oil - تصویر 1'
              },
              {
                image: '/images/Group-6-1.png',
                alt: 'Romela Oil - تصویر 2'
              },
              {
                image: '/images/Group-7.png',
                alt: 'Romela Oil - تصویر 3'
              },
              {
                image: '/images/Group-8.png',
                alt: 'Romela Oil - تصویر 4'
              },
              {
                image: '/images/Group-9.png',
                alt: 'Romela Oil - تصویر 5'
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative w-full h-20 bg-[#343434] rounded-[16px] overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-contain p-4 md:p-6"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-[#363636B2] rounded-[22px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] mb-12 md:mb-16" style={{
          padding: 'clamp(2rem, 3.13vw, 3rem)',
          marginBottom: 'clamp(3rem, 6.25vw, 6rem)'
        }}>
          <h2 className="text-white font-bold font-iranyekan mb-6" style={{
            fontSize: 'clamp(1.5rem, 2.08vw, 2rem)',
            marginBottom: 'clamp(1.5rem, 2.08vw, 2rem)'
          }}>ماموریت پاد راد صنعت موتور ارس</h2>
          <div className="text-white/90 space-y-4 text-justify" dir="rtl" style={{
            fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
            lineHeight: '1.8'
          }}>
            <p>
              شرکت پاد راد صنعت موتور ارس به عنوان یک مجموعه تخصصی در زمینه تأمین و واردات انواع روانکارهای صنعتی و موتوری، فعالیت خود را از سال ۱۴۰۴ با هدف ایجاد یک زنجیره تأمین پایدار، مطمئن و مطابق با استانداردهای بین‌المللی آغاز کرده است. این شرکت با همکاری مستقیم با Romela Oil آلمان به‌عنوان یکی از تولیدکنندگان معتبر اروپایی، متعهد است محصولات باکیفیت و استاندارد را در اختیار مشتریان و صنایع داخلی قرار دهد.
            </p>
            <p>
              ماموریت اصلی پاد راد صنعت موتور ارس، دسترسی صنایع کشور به روانکارهای قابل‌اعتماد و دارای تأییدیه‌های فنی معتبر می باشد. به همین دلیل، تمام محصولات عرضه‌شده توسط این شرکت مطابق با استانداردهای بین‌المللی مانند API و ACEA بوده و دارای تأییدیه خودروسازان (OEM Approvals) هستند. همچنین اطلاعات فنی کامل محصولات شامل برگه‌های SDS و TDS به‌صورت معتبر ارائه می‌شود تا واحدهای فنی و مهندسی بتوانند با اطمینان و آگاهی بیشتر، انتخاب درست‌تری انجام دهند.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-white font-bold font-iranyekan mb-8 text-center" style={{
            fontSize: 'clamp(1.5rem, 2.08vw, 2rem)',
            marginBottom: 'clamp(2rem, 3.13vw, 3rem)'
          }}>ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" style={{
            gap: 'clamp(1.5rem, 2.08vw, 2rem)'
          }}>
            {[
              {
                title: 'ضمانت اصالت کالا',
                description: 'محصولات اصلی و دارای استاندارد خودروسازان',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'ارسال سریع به سراسر ایران',
                description: 'تحویل سریع ۱ تا ۳ روزه با بسته‌بندی ایمن',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: 'مشاوره تخصصی رایگان',
                description: 'انتخاب روغن مناسب بر اساس مدل خودرو و سبک رانندگی شما',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'تضمین قیمت منصفانه',
                description: 'هم‌قیمت یا ارزان‌تر از نمایندگی‌ها و بازار فیزیکی',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#363636B2] rounded-[22px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] p-6 text-center hover:shadow-[0_30px_70px_rgba(230,168,22,0.2)] transition-all duration-300"
                style={{
                  padding: 'clamp(1.5rem, 2.08vw, 2rem)'
                }}
              >
                <div className="text-[#E6A816] mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-white font-bold font-iranyekan mb-3" style={{
                  fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
                  marginBottom: 'clamp(0.75rem, 1.04vw, 1rem)'
                }}>{value.title}</h3>
                <p className="text-white/70" style={{
                  fontSize: 'clamp(0.875rem, 1.04vw, 1rem)'
                }}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

