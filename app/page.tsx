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
      <section className="py-12 md:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Text Content */}
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                معرفی Romela آلمان
              </h2>
              <div className="text-white space-y-4 leading-relaxed">
                <p className="text-base md:text-lg">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>
                <p className="text-base md:text-lg">
                  تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <p className="text-base md:text-lg">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                </p>
              </div>
            </div>
            {/* Engine Image Container */}
            <div className="bg-[#2D2D2D] rounded-2xl overflow-hidden relative aspect-[4/3]">
              <img src="/images/image 9.png" alt="romela-about-us" className="w-full h-full object-cover" />
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

