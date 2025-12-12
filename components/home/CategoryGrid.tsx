import Link from 'next/link'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          دسته بندی محصولات Romela Oil
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative bg-dark-lighter rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <div className="flex items-center text-gold group-hover:text-gold-dark transition-colors">
                  <span className="text-sm font-medium">مشاهده محصولات</span>
                  <svg
                    className="w-4 h-4 mr-2"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

