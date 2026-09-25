import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DealershipFaq, type FaqItem } from '@/components/dealers/DealershipFaq'
import { PAGE_BLEED_CLASS, PAGE_BOTTOM_PADDING_TALL_STYLE, PAGE_TITLE_TOP_COMPACT_CLASS } from '@/lib/page-layout'

export const metadata: Metadata = {
  title: 'نمایندگی‌های فروش روغن Romela',
  description:
    'اعطای نمایندگی رسمی Romela Oil توسط پاد راد صنعت موتور ارس — جدول نمایندگی‌ها، اطلاعات تماس و سوالات متداول.',
}

const bodyTextStyle = {
  fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
  lineHeight: '1.9',
} as const

const headingStyle = {
  fontSize: 'clamp(1.125rem, 1.46vw, 1.375rem)',
} as const

const TABLE_HEADER = '#4A3228'

const agencies = [
  {
    name: 'نمایندگی مرکزی',
    province: 'تهران',
    address: 'تهران، خیابان بهشتی، خیابان احمد قصیر (بخارست)، کوچه یکم، پلاک ۶، واحد ۷',
    phone: '۰۲۱۸۸۵۴۹۹۰۳',
    phoneHref: 'tel:02188549903',
  },
  { name: 'نمایندگی ۱', province: 'تهران', address: '—', phone: '—', phoneHref: undefined },
  { name: 'نمایندگی ۲', province: 'تهران', address: '—', phone: '—', phoneHref: undefined },
  { name: 'نمایندگی ۳', province: 'تهران', address: '—', phone: '—', phoneHref: undefined },
  { name: 'نمایندگی ۴', province: 'تهران', address: '—', phone: '—', phoneHref: undefined },
] as const

function ContactIcon({ children }: { children: ReactNode }) {
  return <div className="flex-shrink-0 mt-0.5 text-[#E6A816]">{children}</div>
}

const faqItems: FaqItem[] = [
  {
    id: '1',
    question: '۱- آیا نماینده به شناسنامه فنی محصولات دسترسی دارد؟',
    answer: (
      <p>
        بله، شرکت پاد راد صنعت موتور ارس برای تمامی محصولات خود{' '}
        <strong className="font-bold text-[#F9BD65]">شناسنامه فنی اختصاصی</strong> ارائه می‌دهد که
        شامل مشخصات فنی، استانداردها، نتایج آزمایشگاهی، تاریخ تولید، شماره بچ و اطلاعات ردیابی کالا
        است. این شناسنامه‌ها به نمایندگان ارائه می‌شوند تا بتوانند با اطمینان کامل به مشتریان خود
        خدمات مشاوره‌ای ارائه دهند.
      </p>
    ),
  },
  {
    id: '2',
    question: '۲- حداقل میزان سفارش برای دریافت نمایندگی چقدر است؟',
    answer: (
      <p>
        حداقل میزان سفارش بسته به نوع روغن، حجم مصرفی منطقه و شرایط تأمین محصول متفاوت است. معمولاً
        برای آغاز همکاری، یک حداقل حجم مشخص تعیین می‌شود تا امکان ارائه قیمت رقابتی و پایداری تأمین
        برای نماینده فراهم باشد. این مقدار پس از بررسی اولیه بازار منطقه‌ای اعلام می‌گردد.
      </p>
    ),
  },
  {
    id: '3',
    question: '۳- آیا امکان اعطای نمایندگی انحصاری در یک استان یا شهر وجود دارد؟',
    answer: (
      <p>
        بله؛ در صورت عملکرد مناسب نماینده و رعایت کامل استانداردهای شرکت، امکان اعطای{' '}
        <strong className="font-bold text-[#F9BD65]">انحصار منطقه‌ای</strong> وجود دارد. معیارهای
        اصلی شامل میزان فروش، رضایت مشتریان، نحوه نگهداری کالا در انبار، پایبندی به قیمت‌گذاری واحد
        و گزارش‌دهی منظم است.
      </p>
    ),
  },
  {
    id: '4',
    question: '۴- شرایط پرداخت سفارش‌ها چگونه است؟',
    answer: (
      <p>
        سفارش‌ها بر اساس پیش‌فاکتور رسمی صادر می‌شوند و شرایط پرداخت می‌تواند به‌صورت نقدی،
        نیمه‌نقدی یا توافقی برای نمایندگان فعال در نظر گرفته شود. قیمت محصولات تا تاریخ درج‌شده در
        پیش‌فاکتور ثابت بوده و نماینده از هرگونه تغییر احتمالی در هزینه‌های تأمین و حمل، پیشاپیش
        مطلع خواهد شد.
      </p>
    ),
  },
  {
    id: '5',
    question: '۵- آیا شرکت آموزش فنی یا پشتیبانی تخصصی برای نمایندگان ارائه می‌دهد؟',
    answer: (
      <div className="space-y-3">
        <p>بله، شرکت پاد راد صنعت موتور ارس علاوه بر تأمین محصول، خدمات کاملی شامل:</p>
        <ul className="space-y-2 pr-1">
          {[
            'آموزش انتخاب روغن بر اساس کاربرد',
            'بررسی مسائل فنی و عملکردی',
            'ارائه بروشورهای فنی',
            'تحلیل نتایج آنالیزها',
            'مشاوره تخصصی برای مشتریان صنعتی',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6A816]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          به نمایندگان ارائه می‌دهد تا بتوانند به‌عنوان نماینده فنی و تخصصی شرکت در بازار فعالیت
          کنند.
        </p>
      </div>
    ),
  },
]

export default function DealershipPage() {
  return (
    <div className={PAGE_BLEED_CLASS}>
      <div
        className={PAGE_TITLE_TOP_COMPACT_CLASS}
        style={PAGE_BOTTOM_PADDING_TALL_STYLE}
      >
        <h1
          className="text-center text-white font-bold tracking-wide font-iranyekan mb-6 md:mb-8"
          style={{ fontSize: 'clamp(1.25rem, 2.08vw, 2.125rem)' }}
        >
          نمایندگی‌های فروش روغن Romela
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
            <span className="text-[#F58F4A]">نمایندگی</span>
          </div>
        </div>

        <section
          dir="rtl"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch lg:items-center mb-12 md:mb-14"
        >
          <div
            className="space-y-5 text-white/90 font-iranyekan text-right min-w-0 order-1"
            style={bodyTextStyle}
          >
            <p>
              شرکت پاد راد صنعت موتور ارس به‌عنوان یکی از مجموعه‌های فعال و متخصص در حوزه تأمین،
              واردات و توزیع روانکارهای صنعتی و خودرویی، با هدف توسعه شبکه فروش، بهبود سرعت دسترسی
              مشتریان به محصولات اصلی و ارتقای کیفیت خدمات در سراسر کشور، اقدام به اعطای نمایندگی
              رسمی در استان‌ها و شهرهای منتخب می‌نماید. این شرکت با تکیه بر تجربه فنی، شناخت عمیق از
              بازار روانکارها و ارتباطات گسترده با تولیدکنندگان معتبر بین‌المللی، بستری مطمئن و
              حرفه‌ای برای همکاری بلندمدت با فعالان واقعی این صنعت فراهم کرده است.
            </p>
            <p>
              ماموریت شرکت در اعطای نمایندگی، ایجاد یک ساختار منسجم فروش بر پایه اصالت کالا، شفافیت،
              خدمات پس از فروش، تحویل سریع و پایدار و ارائه مشاوره تخصصی به مصرف‌کنندگان نهایی است. در
              همین راستا تنها اشخاص حقیقی یا حقوقی که توانایی ارائه خدمات استاندارد در سطح برند را
              داشته باشند، امکان پیوستن به شبکه نمایندگان Romela را خواهند داشت.
            </p>
            <p className="font-bold text-white pt-2">
              برای اعطا نمایندگی با نمایندگی فروش مرکزی در ارتباط باشید.
            </p>
          </div>

          <aside
            className="bg-[#363636B2] rounded-[22px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] w-full min-w-0 h-full self-stretch order-2"
            style={{ padding: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
          >
          <h2 className="text-white font-bold font-iranyekan mb-6 text-right" style={headingStyle}>
            اطلاعات نمایندگی فروش مرکزی
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <ContactIcon>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ContactIcon>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-1">آدرس:</p>
                <p className="text-white font-bold font-iranyekan leading-relaxed" style={bodyTextStyle}>
                  تهران، خیابان بهشتی، خیابان احمد قصیر (بخارست)، کوچه یکم، پلاک ۶، واحد ۷
                  <span className="block text-white/70 font-normal mt-1 text-sm">
                    (به منظور اعطا نمایندگی)
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ContactIcon>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 6v6l4 2M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6 2 12 2s10 4.48 10 10z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ContactIcon>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-1">ساعات پاسخگویی:</p>
                <p className="text-white font-bold font-iranyekan" style={bodyTextStyle}>
                  شنبه تا پنج‌شنبه از ساعت ۸ الی ۱۷
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ContactIcon>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15.62 8.85a14.9 14.9 0 01-3.85 4.01 14.9 14.9 0 01-4.01 3.85c-.12.06-.27.04-.37-.04l-1.1-1.1a.5.5 0 00-.45-.12l-1.66.55a.5.5 0 00-.34.45V20a1 1 0 01-1 1 9 9 0 01-9-9 1 1 0 011-1h1.4a.5.5 0 00.45-.34l.55-1.66a.5.5 0 00-.12-.45l-1.1-1.1a.3.3 0 00-.37-.04z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ContactIcon>
              <div>
                <p className="text-white/60 font-iranyekan text-sm mb-2">تلفن‌ها:</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:02188549903"
                    className="text-white font-bold font-iranyekan hover:text-[#E6A816] transition-colors"
                    style={bodyTextStyle}
                    dir="ltr"
                  >
                    ۰۲۱۸۸۵۴۹۹۰۳
                  </a>
                  <a
                    href="tel:09126482681"
                    className="text-white font-bold font-iranyekan hover:text-[#E6A816] transition-colors"
                    style={bodyTextStyle}
                    dir="ltr"
                  >
                    ۰۹۱۲۶۴۸۲۶۸۱
                  </a>
                </div>
              </div>
            </div>
          </div>
          </aside>
        </section>

        <section className="mb-12 md:mb-14" dir="rtl">
          <h2 className="text-white font-bold font-iranyekan mb-6 text-right" style={headingStyle}>
            جدول نمایندگی‌ها
          </h2>

          <div className="md:hidden space-y-3">
            {agencies.map((row) => (
              <article
                key={row.name}
                className="rounded-2xl border border-white/10 bg-[#2d2d2d]/95 p-4 text-right font-iranyekan"
              >
                <h3 className="text-white font-bold mb-3" style={bodyTextStyle}>
                  {row.name}
                </h3>
                <dl className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-white/50 shrink-0">استان</dt>
                    <dd className="text-white/85 text-left" dir="auto">{row.province}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-white/50 shrink-0">آدرس</dt>
                    <dd className="text-white/85 text-right leading-relaxed">{row.address}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-white/50 shrink-0">تلفن</dt>
                    <dd className="text-white/85">
                      {row.phoneHref ? (
                        <a
                          href={row.phoneHref}
                          className="font-bold text-white hover:text-[#E6A816] transition-colors"
                          dir="ltr"
                        >
                          {row.phone}
                        </a>
                      ) : (
                        <span className="text-white/40">{row.phone}</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <table className="w-full min-w-[640px] border-collapse font-iranyekan text-center">
              <thead>
                <tr style={{ backgroundColor: TABLE_HEADER }}>
                  {['نمایندگی', 'استان', 'آدرس', 'تلفن تماس'].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-4 text-white font-bold whitespace-nowrap"
                      style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)' }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agencies.map((row, index) => (
                  <tr
                    key={row.name}
                    className={
                      index % 2 === 1
                        ? 'bg-[#363636]/90'
                        : 'bg-[#2d2d2d]/95'
                    }
                  >
                    <td
                      className="px-4 py-4 text-white font-bold border-t border-white/10"
                      style={bodyTextStyle}
                    >
                      {row.name}
                    </td>
                    <td
                      className="px-4 py-4 text-white/85 border-t border-white/10"
                      style={bodyTextStyle}
                    >
                      {row.province}
                    </td>
                    <td
                      className="px-4 py-4 text-white/85 border-t border-white/10 max-w-xs leading-relaxed"
                      style={bodyTextStyle}
                    >
                      {row.address}
                    </td>
                    <td
                      className="px-4 py-4 text-white/85 border-t border-white/10 whitespace-nowrap"
                      style={bodyTextStyle}
                    >
                      {row.phoneHref ? (
                        <a
                          href={row.phoneHref}
                          className="font-bold text-white hover:text-[#E6A816] transition-colors"
                          dir="ltr"
                        >
                          {row.phone}
                        </a>
                      ) : (
                        <span className="text-white/40">{row.phone}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <DealershipFaq items={faqItems} />
      </div>
    </div>
  )
}
