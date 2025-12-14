'use client'

import Link from 'next/link'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

// Category configuration matching the image
const categoryConfig = {
  'industrial-oil': {
    gradientFrom: '#A0522D',
    gradientTo: '#1a1a1a',
    textColor: '#FFFFFF',
    linkColor: '#D3D3D3',
    description: 'توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ...',
    showDescription: true,
  },
  'engine-oil': {
    gradientFrom: '#B8860B',
    gradientTo: '#1a1a1a',
    textColor: '#FFD700',
    linkColor: '#FFD700',
    description: 'روغن موتور با کیفیت بالا',
    showDescription: false,
  },
  'gearbox-oil': {
    gradientFrom: '#5A5A5A',
    gradientTo: '#1a1a1a',
    textColor: '#FFFFFF',
    linkColor: '#FFFFFF',
    description: 'روغن گیربکس فول سینتتیک',
    showDescription: false,
  },
  'brake-fluid': {
    gradientFrom: '#DC143C',
    gradientTo: '#1a1a1a',
    textColor: '#FF0000',
    linkColor: '#FF0000',
    description: 'روغن ترمز استاندارد',
    showDescription: false,
  },
  'hydraulic-oil': {
    gradientFrom: '#4169E1',
    gradientTo: '#4B0082',
    textColor: '#00BFFF',
    linkColor: '#00BFFF',
    description: 'روغن هیدرولیک با کیفیت',
    showDescription: false,
  },
  'grease': {
    gradientFrom: '#FF8C00',
    gradientTo: '#8B4513',
    textColor: '#FFA500',
    linkColor: '#FFA500',
    description: 'گریس صنعتی',
    showDescription: false,
  },
  'special-additives': {
    gradientFrom: '#9370DB',
    gradientTo: '#4B0082',
    textColor: '#DDA0DD',
    linkColor: '#DDA0DD',
    description: 'افزودنی های خاص',
    showDescription: false,
  },
} as const

// Order of categories as shown in the image (RTL: right to left, top to bottom)
const categoryOrder = [
  'industrial-oil',
  'engine-oil',
  'gearbox-oil',
  'brake-fluid',
  'hydraulic-oil',
  'grease',
  'special-additives',
] as const

type CategoryWithConfig = {
  id: string
  title: string
  image: string
  description: string
  gradientFrom: string
  gradientTo: string
  textColor: string
  linkColor: string
  showDescription?: boolean
}

export function CategoryGrid() {
  const categories: CategoryWithConfig[] = categoryOrder
    .map((id) => {
      const category = PRODUCT_CATEGORIES.find((cat) => cat.id === id)
      const config = categoryConfig[id]
      if (category && config) {
        return {
          ...category,
          ...config,
        } as CategoryWithConfig
      }
      return null
    })
    .filter((cat): cat is CategoryWithConfig => cat !== null)

  return (
    <section className="w-full py-16 px-6 bg-[#1A1A1A]">
      {/* Title */}
      <h2 className="text-center text-white text-3xl font-bold mb-12">
        دسته بندی محصولات Romela Oil
      </h2>

      {/* Category Grid */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative rounded-2xl overflow-hidden h-[450px] flex flex-col cursor-pointer transition-transform hover:scale-[1.02]"
            >
              {/* Gradient Background - from top-right to bottom-left (RTL) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                }}
              />

              {/* Image Container - positioned on the left side (RTL) */}
              <div className="relative flex-1 flex items-center justify-start overflow-hidden">
                <div className="relative h-full w-full flex items-center justify-start">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-auto object-contain opacity-90"
                    style={{ 
                      maxWidth: '85%',
                      height: '100%',
                      objectPosition: 'left center'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Content Overlay - positioned at top-right and bottom-right (RTL) */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-10 pointer-events-none">
                {/* Category Title and Description - Top Right (RTL) */}
                <div className="text-right pointer-events-auto pr-0">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: category.textColor }}
                  >
                    {category.title}
                  </h3>
                  {category.showDescription && (
                    <p 
                      className="text-sm leading-relaxed mt-1"
                      style={{ 
                        color: category.id === 'industrial-oil' ? '#D3D3D3' : undefined 
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                {/* View Products Link - Bottom Right (RTL) */}
                <div className="flex items-center justify-end gap-2 pointer-events-auto pr-0">
                  <span
                    className="text-sm font-medium"
                    style={{ color: category.linkColor }}
                  >
                    مشاهده محصولات
                  </span>
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: category.linkColor }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

