import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, getProducts } from '@/lib/api/woocommerce'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { ProductVariations } from '@/components/product/ProductVariations'
import { ProductSpecs } from '@/components/product/ProductSpecs'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCarousel } from '@/components/home/ProductCarousel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatToman } from '@/lib/utils/format'
import { AddToCartButton } from '@/components/product/AddToCartButton'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getProducts({ per_page: 4 })
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 3)

  const imageUrl = product.images?.[0]?.src || '/placeholder-product.jpg'
  const price = product.price ? parseFloat(product.price) : 0

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'روغن گیربکس', href: '/products' },
          { label: 'روغن نوع یک', href: '/products' },
          { label: 'زیر صفحه نوع دو', href: undefined },
        ]}
      />

      {/* Main Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="orange" className="rounded-full px-4 py-2">
                  دارای استاندارد 2019
                </Badge>
                <Badge variant="blue" className="rounded-full px-4 py-2">
                  ۲ لیتر
                </Badge>
              </div>

              {/* Description */}
              {product.short_description && (
                <div
                  className="text-gray-300 mb-6 text-justify"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              {/* Price */}
              <div className="text-4xl md:text-5xl font-bold text-gold mb-4">
                {price > 0 ? formatToman(price) : 'قیمت تماس بگیرید'}
              </div>

              {/* Stock */}
              <div className="mb-6">
                {product.stock_status === 'instock' && product.stock_quantity ? (
                  <p className="text-gray-400">
                    تنها {product.stock_quantity} عدد در انبار باقی مانده
                  </p>
                ) : (
                  <p className="text-red-400">موجود نیست</p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  تعداد
                </label>
                <QuantitySelector
                  value={1}
                  onChange={() => {}}
                  stock={product.stock_quantity}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartButton product={product} />
                <Button variant="outline" size="lg" className="flex-1">
                  ثبت سفارش
                </Button>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="relative aspect-square bg-dark-lighter rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-dark-lighter">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            معرفی روغن X
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div
                className="text-gray-300 space-y-4 text-justify mb-6"
                dangerouslySetInnerHTML={{ __html: product.description || product.short_description || '' }}
              />
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="rounded-full px-6 py-3">
                  دانلود دیتاشیت
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-3">
                  دانلود کاتالوگ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductVariations product={product} currentSlug={params.slug} />
      <ProductSpecs />
      <ProductGallery product={product} />

      {/* Similar Products */}
      {filteredRelated.length > 0 && (
        <ProductCarousel title="محصولات مشابه" products={filteredRelated} />
      )}
    </div>
  )
}

