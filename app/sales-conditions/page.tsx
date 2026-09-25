import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { PAGE_BLEED_CLASS, PAGE_BOTTOM_PADDING_TALL_STYLE, PAGE_TITLE_TOP_COMPACT_CLASS } from '@/lib/page-layout'

export const metadata: Metadata = {
  title: 'شرایط فروش برند Romela Oil',
  description:
    'شرایط فروش Romela Oil توسط پاد راد صنعت موتور ارس — شناسنامه محصول، فروش عمده، اعتبارسنجی پیامکی و اطلاعات نمایندگی.',
}

const bodyTextStyle = {
  fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
  lineHeight: '1.9',
} as const

const headingStyle = {
  fontSize: 'clamp(1.25rem, 1.67vw, 1.625rem)',
} as const

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 sm:space-y-2.5 mt-4 pr-1 w-full" dir="rtl">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-white/85 font-iranyekan text-right"
          style={bodyTextStyle}
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6A816]" aria-hidden />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SectionImage({
  src,
  alt,
  objectFit = 'cover',
  objectPosition = 'center',
}: {
  src: string
  alt: string
  objectFit?: 'cover' | 'contain'
  objectPosition?: string
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[24px] bg-[#343434] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
      style={{ aspectRatio: '4/3', minHeight: 'clamp(220px, 28vw, 380px)' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={objectFit === 'contain' ? 'object-contain p-4 md:p-6' : 'object-cover'}
        style={{ objectPosition }}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  )
}

type SectionRowProps = {
  rowIndex: number
  title?: string
  children: ReactNode
  imageSrc: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
  imagePosition?: string
}

const sectionBodyClass = 'text-white/90 font-iranyekan text-right'

function SectionRow({
  rowIndex,
  title,
  children,
  imageSrc,
  imageAlt,
  imageFit = 'cover',
  imagePosition = 'center',
}: SectionRowProps) {
  const textOrder = rowIndex % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
  const imageOrder = rowIndex % 2 === 0 ? 'lg:order-2' : 'lg:order-1'

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center"
      style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}
    >
      <div className={`flex flex-col justify-center min-w-0 ${textOrder}`} dir="rtl">
        {title && (
          <h2
            className="text-white font-bold font-iranyekan mb-4 sm:mb-5 text-right"
            style={headingStyle}
          >
            {title}
          </h2>
        )}
        <div className={sectionBodyClass}>{children}</div>
      </div>
      <div className={`min-w-0 ${imageOrder}`}>
        <SectionImage
          src={imageSrc}
          alt={imageAlt}
          objectFit={imageFit}
          objectPosition={imagePosition}
        />
      </div>
    </section>
  )
}

export default function SalesConditionsPage() {
  const certificateItems = [
    'گرید ویسکوزیته و نوع روغن',
    'استانداردهای بین‌المللی (API ،ACEA ،MB ،ZF و ...)',
    'شماره بچ (Batch Number)، تاریخ تولید و تاریخ انقضا',
    'اطلاعات آزمایشگاهی اصلی از جمله ویسکوزیته، شاخص گرانروی، نقطه ریزش، نقطه اشتعال',
    'نوع بسته‌بندی و مشخصات پلمپ',
    'کاربردها، سازگاری‌ها و توصیه‌های فنی',
    'روش‌های نگهداری و شرایط حمل',
  ]

  const wholesalePurchaseItems = [
    'قیمت همکاری و تخفیف‌های پلکانی',
    'تأمین مستمر و قرارداد تأمین دوره‌ای',
    'امکان سفارش‌سازی محصول (در صورت نیاز)',
    'پشتیبانی فنی مستقیم از طرف متخصصان برند',
  ]

  const labReportItems = [
    'شاخص جذب فلزات (TAN/TBN)',
    'پایداری اکسیداسیون',
    'تست سایش و محافظت قطعات (Wear Test)',
    'تست پایداری برشی',
    'سازگاری با آب‌بندی‌ها',
    'سایر گزارش‌های کیفیت معتبر',
  ]

  const smsItems = [
    'اصالت کالا',
    'شماره سری تولید',
    'تاریخ تولید و انقضا',
    'مشخصات اصلی فنی',
    'وضعیت فعال یا غیرفعال بودن کد',
  ]

  return (
    <div className={PAGE_BLEED_CLASS}>
      <div
        className={PAGE_TITLE_TOP_COMPACT_CLASS}
        style={PAGE_BOTTOM_PADDING_TALL_STYLE}
        dir="rtl"
      >
        <h1
          className="text-center text-white font-bold tracking-wide font-iranyekan mb-6 md:mb-8"
          style={{ fontSize: 'clamp(1.25rem, 2.08vw, 2.125rem)' }}
        >
          شرایط فروش برند Romela Oil
        </h1>

        <div className="flex justify-start mb-10 md:mb-14 min-w-0">
          <div
            className="font-bold text-[#9A9A9A] font-iranyekan flex flex-wrap items-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)' }}
          >
            <Link href="/" className="hover:text-[#717171]">
              صفحه اصلی
            </Link>
            <span
              style={{
                marginLeft: 'clamp(0.7rem, 0.83vw, 0.7rem)',
                marginRight: 'clamp(0.7rem, 0.83vw, 0.7rem)',
              }}
            >
              /
            </span>
            <span className="text-[#F58F4A]">شرایط فروش</span>
          </div>
        </div>

        <p
          className="text-white/90 font-iranyekan text-right md:text-center max-w-4xl mx-auto mb-12 md:mb-16"
          dir="rtl"
          style={{
            ...bodyTextStyle,
            fontSize: 'clamp(0.9rem, 1.1vw, 1.0625rem)',
          }}
        >
          هدف شرکت پاد راد صنعت موتور ارس در واردات سبد محصولات Romela Oil ارائه تجربه‌ای شفاف،
          حرفه‌ای و مبتنی بر اعتماد در فرآیند خرید محصولات روانکاری است. تمامی مراحل از انتخاب
          محصول تا تحویل نهایی، بر پایه اصول کنترل کیفیت، اصالت کالا و پشتیبانی فنی طراحی شده
          است. در همین راستا، شرایط فروش Romela با رویکردی دقیق و مشتری‌محور تدوین شده تا
          خریداران (چه مصرف‌کنندگان خرد و چه مشتریان عمده) بتوانند با اطمینان و آگاهی کامل
          خرید کنند.
        </p>

        {/* Row 0 — RTL: text right, image left */}
        <SectionRow
          rowIndex={0}
          title="ارائه شناسنامه کامل محصول"
          imageSrc="/images/sales-conditions/product-certificate.svg"
          imageAlt="محصولات Romela Oil — شناسنامه کامل"
          imageFit="cover"
        >
          <p style={bodyTextStyle}>
            تمامی محصولات Romela همراه با شناسنامه اختصاصی ارائه می‌شوند. شناسنامه‌ای علمی، دقیق
            و قابل استناد که به مشتری کمک می‌کند مشخصات فنی محصول را به‌صورت شفاف مشاهده کند.
          </p>
          <p className="mt-4 text-right" style={bodyTextStyle}>
            این شناسنامه شامل:
          </p>
          <BulletList items={certificateItems} />
          <p className="mt-5" style={bodyTextStyle}>
            هدف از ارائه این شناسنامه، افزایش شفافیت و حذف هرگونه ابهام در انتخاب محصول است و به
            مشتری امکان می‌دهد از اصالت و کیفیت محصول مطمئن شود.
          </p>
        </SectionRow>

        {/* Row 1 — RTL */}
        <SectionRow
          rowIndex={1}
          title="شرایط فروش عمده و ارائه نتایج آزمایشگاهی معتبر"
          imageSrc="/images/sales-conditions/wholesale-lab.svg"
          imageAlt="فروش عمده و گزارش آزمایشگاهی Romela"
          imageFit="cover"
        >
          <p style={bodyTextStyle}>
            Romela برای شرکت‌ها، نمایندگی‌ها، کارگاه‌ها، ناوگان حمل‌ونقل و مصرف‌کنندگان صنعتی،
            شرایط فروش عمده ویژه‌ای ارائه می‌دهد.
          </p>
          <p className="mt-4 text-right" style={bodyTextStyle}>
            در خریدهای عمده:
          </p>
          <BulletList items={wholesalePurchaseItems} />
          <p className="mt-5" style={bodyTextStyle}>
            همچنین مشتریان عمده می‌توانند نتایج کامل آزمایشگاهی محصول را دریافت کنند.
          </p>
          <p className="font-bold mt-5 mb-1 text-right" style={bodyTextStyle}>
            این اطلاعات شامل:
          </p>
          <BulletList items={labReportItems} />
          <p className="mt-5" style={bodyTextStyle}>
            این موارد برای شرکت‌هایی که نیاز به مستندات رسمی دارند بسیار ارزشمند است.
          </p>
        </SectionRow>

        <SectionRow
          rowIndex={2}
          title="سیستم اعتبارسنجی پیامکی و تشخیص اصالت کالا"
          imageSrc="/images/sales-conditions/sms-authenticity.svg"
          imageAlt="اعتبارسنجی پیامکی و اصالت کالا Romela"
          imageFit="cover"
        >
          <p style={bodyTextStyle}>
            Romela یکی از معدود برندهایی است که برای جلوگیری از عرضه محصولات جعلی، سیستم
            اعتبارسنجی پیامکی پیشرفته ارائه می‌دهد.
          </p>
          <p className="mt-4 text-right" style={bodyTextStyle}>
            روی هر محصول، کد شناسایی یکتا قرار داده شده که مشتری می‌تواند با ارسال آن به شماره
            پیامکی درج‌شده، اطلاعات زیر را دریافت کند:
          </p>
          <BulletList items={smsItems} />
          <p className="mt-5" style={bodyTextStyle}>
            این سیستم بخش مهمی از سیاست مبارزه با کالای تقلبی است و امنیت خرید را برای مشتریان
            تضمین می‌کند.
          </p>
        </SectionRow>

        <section
          className="bg-[#363636B2] rounded-[22px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
          dir="rtl"
          style={{
            padding: 'clamp(2rem, 3.13vw, 3rem)',
            marginTop: 'clamp(1rem, 2vw, 2rem)',
          }}
        >
          <h2
            className="text-white font-bold font-iranyekan mb-8 text-right"
            style={headingStyle}
          >
            ارتباط با پاد راد صنعت موتور ارس برای اخذ نمایندگی
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1 text-[#E6A816]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-1">نمایندگی فروش مرکزی:</p>
                <p className="text-white font-bold font-iranyekan leading-relaxed" style={bodyTextStyle}>
                  تهران، خیابان بهشتی، خیابان احمد قصیر (بخارست)، کوچه یکم، پلاک ۶، واحد ۷
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1 text-[#E6A816]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 6v6l4 2M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6 2 12 2s10 4.48 10 10z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-1">پاسخگویی:</p>
                <p className="text-white font-bold font-iranyekan" style={bodyTextStyle}>
                  شنبه تا پنجشنبه از ساعت ۸ الی ۱۷
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1 text-[#E6A816]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15.6197 8.85323C14.9237 10.3028 13.9749 11.6615 12.7734 12.8631C11.5718 14.0646 10.2131 15.0134 8.76352 15.7094C8.63883 15.7693 8.57648 15.7992 8.49759 15.8222C8.21724 15.904 7.87298 15.8453 7.63555 15.6752C7.56874 15.6274 7.51158 15.5702 7.39727 15.4559C7.04767 15.1063 6.87286 14.9315 6.69708 14.8172C6.03419 14.3862 5.17961 14.3862 4.51672 14.8172C4.34094 14.9315 4.16614 15.1063 3.81653 15.4559L3.62167 15.6508C3.09022 16.1822 2.8245 16.448 2.68016 16.7333C2.39309 17.3009 2.39309 17.9712 2.68016 18.5387C2.8245 18.8241 3.09022 19.0898 3.62167 19.6213L3.7793 19.7789C4.30892 20.3085 4.57374 20.5733 4.93377 20.7756C5.33327 21 5.95376 21.1614 6.41199 21.16C6.82493 21.1588 7.10716 21.0787 7.6716 20.9185C10.705 20.0575 13.5674 18.433 15.9553 16.045C18.3433 13.6571 19.9678 10.7947 20.8288 7.76131C20.989 7.19687 21.0691 6.91464 21.0703 6.5017C21.0717 6.04347 20.9103 5.42298 20.6859 5.02348C20.4836 4.66345 20.2188 4.39863 19.6892 3.86901L19.5316 3.71138C19.0001 3.17993 18.7344 2.91421 18.449 2.76987C17.8815 2.4828 17.2112 2.4828 16.6436 2.76987C16.3583 2.91421 16.0925 3.17993 15.5611 3.71138L15.3662 3.90625C15.0166 4.25585 14.8418 4.43065 14.7275 4.60643C14.2965 5.26932 14.2965 6.1239 14.7275 6.78679C14.8418 6.96257 15.0166 7.13738 15.3662 7.48698C15.4805 7.60129 15.5377 7.65845 15.5855 7.72526C15.7555 7.96269 15.8142 8.30695 15.7325 8.5873C15.7095 8.6662 15.6796 8.72854 15.6197 8.85323Z"
                    stroke="currentColor"
                    strokeWidth="1.38889"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-1">تلفن:</p>
                <a
                  href="tel:02188549903"
                  className="text-white font-bold font-iranyekan hover:text-[#E6A816] transition-colors tracking-wide"
                  style={bodyTextStyle}
                  dir="ltr"
                >
                  88549903
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
