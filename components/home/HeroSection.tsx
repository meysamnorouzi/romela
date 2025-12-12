'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const [oilType, setOilType] = useState('')
  const [application, setApplication] = useState('')
  const [viscosity, setViscosity] = useState('')

  return (
    <section className="relative bg-[#0000004D] pt-52 pb-24">
      {/* Background Effect */}
      <div className="absolute inset-0">
       <img src="/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png" alt="hero-bg" className="w-full h-full object-cover rounded-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-20">
          پادراد ارس نمایندگی رسمی محصولات ROMELA OIL GERMANY 🇩🇪
          </h1>

          {/* Search Form */}
          <div className="bg-dark-lighter rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                  نوع روغن
                </label>
                <select
                  value={oilType}
                  onChange={(e) => setOilType(e.target.value)}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="engine">روغن موتور</option>
                  <option value="gearbox">روغن گیربکس</option>
                  <option value="hydraulic">روغن هیدرولیک</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                  کاربرد روغن
                </label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="light">سواری سبک</option>
                  <option value="heavy">سواری سنگین</option>
                  <option value="marine">کشتی</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                  ویسکوزیته
                </label>
                <select
                  value={viscosity}
                  onChange={(e) => setViscosity(e.target.value)}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="5w20">5W-20</option>
                  <option value="5w30">5W-30</option>
                  <option value="10w40">10W-40</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-white px-8 py-4 text-lg">
                جستجو محصول
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                <svg
                  className="w-5 h-5 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                راهنمای انتخاب روغن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

