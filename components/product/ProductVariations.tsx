import type { WooCommerceProduct } from '@/lib/api/types'
import { formatToman } from '@/lib/utils/format'
import Link from 'next/link'

interface ProductVariationsProps {
  product: WooCommerceProduct
  currentSlug?: string
  variations?: Array<{
    id: number
    name: string
    price: string
    volume: string
    slug: string
  }>
}

export function ProductVariations({ product, currentSlug, variations }: ProductVariationsProps) {

  // Mock variations if not provided
  const defaultVariations = [
    {
      id: 1,
      name: `${product.name}`,
      price: product.price,
      volume: '۱ لیتر',
      slug: product.slug,
    },
    {
      id: 2,
      name: product.name,
      price: (parseFloat(product.price || '0') * 2).toString(),
      volume: '۲ لیتر',
      slug: `${product.slug}-2l`,
    },
    {
      id: 3,
      name: product.name,
      price: (parseFloat(product.price || '0') * 3).toString(),
      volume: '۳ لیتر',
      slug: `${product.slug}-3l`,
    },
    {
      id: 4,
      name: product.name,
      price: (parseFloat(product.price || '0') * 4).toString(),
      volume: '۴ لیتر',
      slug: `${product.slug}-4l`,
    },
  ]

  const displayVariations = variations ?? defaultVariations

  return (
    <section className="py-12 md:py-16 bg-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          مدل های مختلف این محصول
        </h2>
        <div className="bg-dark-lighter rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-right text-white font-bold">نام محصول</th>
                <th className="px-6 py-4 text-right text-white font-bold">قیمت</th>
                <th className="px-6 py-4 text-right text-white font-bold">حجم</th>
              </tr>
            </thead>
            <tbody>
              {displayVariations.map((variation, index) => {
                const isSelected = variation.slug === currentSlug
                return (
                  <tr
                    key={variation.id}
                    className={`border-b border-gray-800 hover:bg-dark transition-colors ${
                      isSelected ? 'bg-dark' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/products/${variation.slug}`}
                        className={`text-white hover:text-gold transition-colors ${
                          isSelected ? 'font-bold text-gold' : ''
                        }`}
                      >
                        {variation.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gold font-bold">
                      {formatToman(variation.price)}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{variation.volume}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

