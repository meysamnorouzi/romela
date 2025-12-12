'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const [oilType, setOilType] = useState('')
  const [application, setApplication] = useState('')
  const [viscosity, setViscosity] = useState('')

  return (
    <section className="relative bg-gradient-to-b from-dark to-dark-lighter py-20 md:py-32 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            پادراد ارس نمایندگی رسمی محصولات{' '}
            <span className="text-gold">ROMELA OIL GERMANY</span>
            <span className="inline-block mr-2">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 inline-block"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <path d="M320 0C196.3 0 96 100.3 96 224c0 70.1 36.9 132.1 93.1 166.7l-9.4 30.9c-2.2 7.2-1.3 15 2.4 21.4 3.7 6.4 10.1 10.8 17.5 12.1l30.9 5.2c7.4 1.2 15.1-.2 21.2-3.9l25.2-15.1c26.8-16.1 57.7-25.1 90.1-25.1C443.7 416 544 315.7 544 192S443.7 0 320 0zm0 352c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
              </svg>
            </span>
          </h1>

          {/* Search Prompt */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            جستجو روغن مناسب کاربری شما
          </p>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            برای تجربه عملکرد بهتر موتور، روغن سازگار با نیازهای فنی خودروی خود را همینجا جستجو کنید.
          </p>

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

