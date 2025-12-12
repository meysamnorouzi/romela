import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { ProductCarousel } from '@/components/home/ProductCarousel'
import { StatsSection } from '@/components/home/StatsSection'
import { getProducts } from '@/lib/api/woocommerce'

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true, per_page: 8 })
  const bestSellingProducts = await getProducts({ per_page: 8 })

  return (
    <>
      <HeroSection />
      <CategoryGrid />
      
      {/* About Romela Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-dark-lighter">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gold"
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
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                معرفی Romela آلمان
              </h2>
              <div className="text-gray-300 space-y-4 text-justify">
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>
                <p>
                  تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Tabs */}
      <section className="py-12 md:py-16 bg-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
            محصولات Romela Oil
          </h2>
          {featuredProducts.length > 0 && (
            <ProductCarousel title="محصولات برتر" products={featuredProducts} />
          )}
        </div>
      </section>

      <StatsSection />

      {/* Bestselling Products */}
      {bestSellingProducts.length > 0 && (
        <ProductCarousel title="محصولات پرفروش" products={bestSellingProducts} />
      )}

      {/* Romela Motor Oil Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-dark-lighter">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
            روغن موتور روملا
          </h2>
          <div className="max-w-4xl mx-auto text-gray-300 space-y-4 text-justify">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
            <p>
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

