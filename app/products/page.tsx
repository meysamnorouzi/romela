import { ProductCarousel } from '@/components/home/ProductCarousel'
import { getProducts } from '@/lib/api/woocommerce'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export default async function ProductsPage() {
  const allProducts = await getProducts({ per_page: 20 })

  const categories = [
    {
      title: 'محصولات موتور سواری سبک',
      id: 'light-duty',
      products: allProducts.slice(0, 3),
    },
    {
      title: 'محصولات موتور سواری سنگین',
      id: 'heavy-duty',
      products: allProducts.slice(3, 6),
    },
    {
      title: 'روغن موتور ماشین آلات راه سازی',
      id: 'construction',
      products: allProducts.slice(6, 9),
    },
    {
      title: 'روغن موتور کشتی',
      id: 'marine',
      products: allProducts.slice(9, 12),
    },
    {
      title: 'روغن موتور سیکلت',
      id: 'motorcycle',
      products: allProducts.slice(12, 15),
    },
  ]

  return (
    <div className="py-8 md:py-12">
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          دسته بندی محصولات روغن موتور
        </h1>
        <p className="text-gray-400 max-w-3xl text-justify">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
        </p>
      </div>

      {/* Category Cards */}
      <section className="py-8 md:py-12 bg-dark-lighter">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {[
              {
                title: 'روغن موتور سواری سنگین',
                image: '/categories/heavy-duty.jpg',
              },
              {
                title: 'روغن موتور سواری سبک',
                image: '/categories/light-duty.jpg',
              },
              {
                title: 'روغن موتور کشتی',
                image: '/categories/marine.jpg',
              },
              {
                title: 'روغن موتور ماشین آلات راه سازی',
                image: '/categories/construction.jpg',
              },
              {
                title: 'روغن موتور سیکلت',
                image: '/categories/motorcycle.jpg',
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-dark rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
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
                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                  <div className="flex items-center text-gold">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousels */}
      {categories.map((category) => (
        <ProductCarousel
          key={category.id}
          title={category.title}
          products={category.products}
        />
      ))}

      {/* Bottom Text */}
      <section className="py-12 md:py-16 bg-dark-lighter">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-gray-300 space-y-4 text-justify">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

