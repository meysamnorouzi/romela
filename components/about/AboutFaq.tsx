'use client'

import { useState } from 'react'

export type AboutFaqItem = {
  id: string
  question: string
  answer: string
}

const PAGE_SIZE = 5

const faqItems: AboutFaqItem[] = [
  {
    id: '1',
    question: 'آیا تیره‌شدن روغن موتور به معنای افت کیفیت آن است؟',
    answer:
      'خیر. تیره‌شدن روغن می‌تواند ناشی از دوده، محصولات احتراق یا عملکرد افزودنی‌های پاک‌کننده باشد. رنگ روغن به‌تنهایی معیار قابل‌اعتمادی برای تعیین زمان تعویض نیست.',
  },
  {
    id: '2',
    question: 'تفاوت استانداردهای API و ACEA با تأییدیه خودروسازان چیست؟',
    answer:
      'API و ACEA سطح عملکرد روغن را بر اساس الزامات مشخص تعریف می‌کنند؛ تأییدیه‌های خودروسازان نیز ممکن است الزامات اختصاصی‌تری داشته باشند. عبارت «مطابق با الزامات» لزوماً به معنای دریافت تأییدیه رسمی نیست.',
  },
  {
    id: '3',
    question: 'گرانروی روغن در استارت سرد چه اهمیتی دارد؟',
    answer:
      'روغنی با عملکرد مناسب در دمای پایین، سریع‌تر در مدار روغن‌کاری جریان می‌یابد و به کاهش سایش در لحظات اولیه روشن‌شدن موتور کمک می‌کند. انتخاب گرید SAE باید مطابق توصیه سازنده خودرو باشد.',
  },
  {
    id: '4',
    question: 'روغن موتور چگونه به کاهش سایش و افزایش عمر موتور کمک می‌کند؟',
    answer:
      'روغن با ایجاد لایه روانکار، کاهش تماس مستقیم سطوح، انتقال حرارت و معلق نگه‌داشتن آلاینده‌ها به محافظت از قطعات کمک می‌کند. انتخاب مشخصات صحیح و تعویض به‌موقع نیز ضروری است.',
  },
  {
    id: '5',
    question: 'موتورهای توربوشارژ به چه ویژگی‌هایی در روغن موتور نیاز دارند؟',
    answer:
      'این موتورها به روغنی با مقاومت مناسب در برابر حرارت و اکسیداسیون، پایداری گرانروی و محافظت در برابر سایش نیاز دارند. گرید SAE، استاندارد عملکرد و تأییدیه موردنیاز سازنده باید هم‌زمان بررسی شوند.',
  },
  {
    id: '6',
    question: 'روغن موتور دیزلی چه تفاوتی با روغن موتور بنزینی دارد؟',
    answer:
      'تفاوت فرمولاسیون و الزامات عملکردی به شرایط احتراق، میزان دوده، بار موتور و سامانه کنترل آلایندگی بستگی دارد. برخی روغن‌ها کاربرد دوگانه دارند، اما فقط در صورت تطابق با مشخصات موردنیاز موتور قابل استفاده‌اند.',
  },
  {
    id: '7',
    question: 'روغن موتور چه تأثیری بر عملکرد فیلتر ذرات دیزل (DPF) دارد؟',
    answer:
      'برخی ترکیبات روغن پس از سوختن، خاکستر غیرقابل‌احتراقی ایجاد می‌کنند که در DPF انباشته می‌شود. استفاده از روغن با سطح SAPS و تأییدیه مناسب، مطابق توصیه سازنده، به محافظت از سامانه پس‌پالایش کمک می‌کند.',
  },
  {
    id: '8',
    question: 'کیفیت واقعی روغن موتور چگونه ارزیابی می‌شود؟',
    answer:
      'ارزیابی معتبر به مجموعه‌ای از آزمون‌های فیزیکی، شیمیایی و عملکردی، از جمله اندازه‌گیری گرانروی و بررسی مقاومت در برابر اکسیداسیون نیاز دارد. یک برگه آنالیز معمولی به‌تنهایی اثبات‌کننده دریافت استاندارد یا تأییدیه خودروساز نیست.',
  },
  {
    id: '9',
    question: 'چرا روغن گیربکس اتوماتیک باید با نوع گیربکس سازگار باشد؟',
    answer:
      'روغن گیربکس بر انتقال نیرو، عملکرد کلاچ‌ها، سامانه هیدرولیک و محافظت از قطعات تأثیر می‌گذارد. روغن‌های ATF، CVT و DCT الزاماً قابل‌جایگزینی نیستند؛ مشخصات دقیق سازنده گیربکس را بررسی کنید.',
  },
  {
    id: '10',
    question: 'روغن موتور چگونه از تشکیل رسوبات و لجن جلوگیری می‌کند؟',
    answer:
      'افزودنی‌های پاک‌کننده، پراکنده‌ساز و آنتی‌اکسیدان به کنترل رسوبات و کاهش تخریب روغن کمک می‌کنند. بااین‌حال، شرایط نامناسب کارکرد و تأخیر در تعویض روغن همچنان می‌توانند باعث تشکیل لجن شوند.',
  },
  {
    id: '11',
    question: 'فیلتر روغن چه نقشی در حفظ کیفیت روغن دارد؟',
    answer:
      'فیلتر، ذرات ناشی از سایش و برخی آلودگی‌ها را از جریان روغن جدا می‌کند. اما نمی‌تواند تمام تغییرات شیمیایی روغن یا رقیق‌شدن آن با سوخت را برطرف کند؛ تعویض روغن و فیلتر باید طبق برنامه سرویس انجام شود.',
  },
  {
    id: '12',
    question: 'افزودنی‌های روغن موتور چه نقشی در محافظت از قطعات دارند؟',
    answer:
      'افزودنی‌هایی مانند ضدسایش‌ها، پاک‌کننده‌ها، پراکنده‌سازها و آنتی‌اکسیدان‌ها به بهبود عملکرد روغن کمک می‌کنند. افزایش مقدار افزودنی لزوماً به معنای کیفیت بالاتر نیست و افزودن مکمل‌های متفرقه بدون بررسی فنی توصیه نمی‌شود.',
  },
  {
    id: '13',
    question: 'تفاوت گرانروی در دمای بالا با پایداری گرانروی چیست؟',
    answer:
      'گرانروی در دمای بالا، رفتار جریان روغن را در شرایط دمایی و برشی مشخص توصیف می‌کند؛ پایداری گرانروی، توانایی حفظ گرانروی مناسب در طول کارکرد و در برابر عواملی مانند برش مکانیکی را نشان می‌دهد.',
  },
  {
    id: '14',
    question: 'پایداری حرارتی روغن چه تأثیری بر عملکرد موتور دارد؟',
    answer:
      'پایداری حرارتی مناسب به حفظ خواص روغن در دماهای بالا و کاهش تخریب حرارتی کمک می‌کند. این ویژگی با پایداری اکسیداسیون مرتبط است، اما با آن یکسان نیست.',
  },
  {
    id: '15',
    question: 'آیا آنالیز روغن کارکرده می‌تواند نشانه‌های فرسودگی موتور را مشخص کند؟',
    answer:
      'بله. بررسی فلزات سایشی، تغییر گرانروی و آلودگی‌هایی مانند سوخت یا مایع خنک‌کننده می‌تواند سرنخ‌هایی از مشکلات احتمالی ارائه دهد؛ اما تشخیص قطعی خرابی به بررسی شرایط کارکرد و در صورت نیاز، آزمون‌های تکمیلی نیاز دارد.',
  },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 text-[#E6A816] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AboutFaq() {
  const [openId, setOpenId] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visibleItems = faqItems.slice(0, visibleCount)
  const hasMore = visibleCount < faqItems.length

  const showMore = () => {
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, faqItems.length))
  }

  return (
    <section
      className="mb-12 md:mb-16"
      style={{ marginBottom: 'clamp(3rem, 6.25vw, 6rem)' }}
      aria-labelledby="about-faq-heading"
      dir="rtl"
    >
      <h2
        id="about-faq-heading"
        className="text-white font-bold font-iranyekan text-center mb-8 md:mb-10"
        style={{
          fontSize: 'clamp(1.5rem, 2.08vw, 2rem)',
          marginBottom: 'clamp(2rem, 3.13vw, 3rem)',
        }}
      >
        سوالات متداول
      </h2>

      <div className="w-full space-y-3">
        {visibleItems.map((item) => {
          const isOpen = openId === item.id
          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border border-white/10 bg-[#363636B2]"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full flex items-center justify-between gap-4 text-right px-4 sm:px-5 py-4 bg-[#343434]/80 hover:bg-[#3d3d3d] transition-colors font-iranyekan font-bold text-white"
                style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                aria-expanded={isOpen}
                aria-controls={`about-faq-panel-${item.id}`}
                id={`about-faq-button-${item.id}`}
              >
                <span className="flex-1">{item.question}</span>
                <ChevronIcon open={isOpen} />
              </button>
              {isOpen && (
                <div
                  id={`about-faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`about-faq-button-${item.id}`}
                  className="px-4 sm:px-5 py-4 sm:py-5 bg-[#2d2d2d]/90 border-t border-white/10 text-white/85 font-iranyekan text-right leading-[1.9]"
                  style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={showMore}
            className="font-iranyekan font-bold rounded-xl border border-[#E6A816]/45 bg-[#E6A816]/12 text-[#F9BD65] hover:bg-[#E6A816]/22 hover:border-[#E6A816]/70 transition-colors px-6 sm:px-8 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A816] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
          >
            سوالات بیشتر
          </button>
        </div>
      )}
    </section>
  )
}
