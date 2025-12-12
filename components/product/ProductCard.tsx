import Link from 'next/link'
import Image from 'next/image'
import type { WooCommerceProduct } from '@/lib/api/types'
import { formatToman } from '@/lib/utils/format'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: WooCommerceProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.src || '/placeholder-product.jpg'
  const price = product.price ? parseFloat(product.price) : 0

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-dark-lighter rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="orange">پرفروش</Badge>
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        {product.short_description && (
          <p
            className="text-gray-400 text-sm mb-4 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: product.short_description.substring(0, 100),
            }}
          />
        )}
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-gold">
            {price > 0 ? formatToman(price) : 'قیمت تماس بگیرید'}
          </div>
          {product.stock_status === 'instock' && (
            <Badge variant="green" className="text-xs">
              موجود
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}

