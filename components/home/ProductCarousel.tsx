'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ProductCard } from '@/components/product/ProductCard'
import type { WooCommerceProduct } from '@/lib/api/types'

interface ProductCarouselProps {
  title: string
  products: WooCommerceProduct[]
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  if (products.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12">
          {title}
        </h2>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-button-prev-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-lighter rounded-full flex items-center justify-center text-white hover:bg-gold transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-lighter rounded-full flex items-center justify-center text-white hover:bg-gold transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

