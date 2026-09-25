'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'

export type FaqItem = {
  id: string
  question: string
  answer: ReactNode
}

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

function FaqIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-[300px] aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10 bg-[#343434] shadow-[0_30px_70px_rgba(0,0,0,0.45)] lg:max-w-none"
      aria-hidden
    >
      <Image
        src="/images/sales-conditions/dealership-faq.svg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 300px, 40vw"
      />
    </div>
  )
}

export function DealershipFaq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? '')

  return (
    <section className="mt-14 md:mt-16 pt-10 md:pt-12 border-t border-white/10" dir="rtl">
      <h2
        className="text-white font-bold font-iranyekan text-center mb-10 md:mb-12"
        style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.625rem)' }}
      >
        سوالات متداول در ارتباط با اعطا نمایندگی
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,1fr)_minmax(0,1.4fr)] gap-10 lg:gap-14 items-start">
        <div className="hidden sm:flex justify-center lg:justify-center lg:order-2">
          <FaqIllustration />
        </div>

        <div className="space-y-3 lg:order-1" dir="rtl">
          {items.map((item) => {
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
                >
                  <span className="flex-1">{item.question}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <div
                    className="px-4 sm:px-5 py-4 sm:py-5 bg-[#2d2d2d]/90 border-t border-white/10 text-white/85 font-iranyekan text-right leading-[1.9]"
                    style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                    dir="rtl"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
