import Image from 'next/image'
import type { WooCommerceProduct } from '@/lib/api/types'

interface ProductGalleryProps {
  product: WooCommerceProduct
  images?: string[]
}

export function ProductGallery({ product, images }: ProductGalleryProps) {
  const productImages = images || product.images?.map((img) => img.src) || []
  
  // If no images, use placeholder
  if (productImages.length === 0) {
    productImages.push('/placeholder-product.jpg')
  }

  // Add more placeholder images for gallery
  const galleryImages = [
    ...productImages,
    ...Array.from({ length: Math.max(0, 3 - productImages.length) }, () => '/placeholder-product.jpg'),
  ].slice(0, 3)

  return (
    <section className="py-12 md:py-16 bg-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          تصویر محصول
        </h2>
        <div className="mb-8 text-gray-300 space-y-4 text-justify">
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-square bg-dark-lighter rounded-xl overflow-hidden relative group"
            >
              <Image
                src={imageUrl}
                alt={`${product.name} - تصویر ${index + 1}`}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

