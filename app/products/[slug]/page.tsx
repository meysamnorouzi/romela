import svgPaths from "../imports/svg-efqwtho29q";
import clsx from "clsx";
import {
  imgMockupAtfXlBackgroundRemoved,
  imgImg2889N1,
  imgImage1,
  imgImage2,
  imgImage9,
  imgImage25,
  imgScreenshot20251215At1246271,
} from "../imports/image-placeholders";
import { imgImage24 } from "../imports/svg-fckud";

// Divider Component
function Divider() {
  return (
    <div className="w-full h-px my-8 md:my-12 lg:my-16">
      <svg className="w-full h-full" fill="none" viewBox="0 0 1824 1" preserveAspectRatio="none">
        <line
          x1="0.5"
          y1="0.5"
          x2="1823.5"
          y2="0.5"
          stroke="url(#gradient)"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1824" y1="1.5" y2="1.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full">
      {/* Container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 pt-56">
        
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-right justify-end">
            <span className=" text-[#717171] text-lg" dir="auto">روغن گیربکس</span>
            <span className=" text-[#717171] text-lg"> / </span>
            <span className=" text-[#717171] text-lg" dir="auto">روغن نوع یک</span>
            <span className=" text-[#717171] text-lg"> / </span>
            <span className=" text-[#f58f4a] text-lg" dir="auto">زیر صفحه نوع دو</span>
          </div>
        </div>

        {/* Product Header Section */}
        <div className="w-full mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-[#343434] rounded-3xl p-8 md:p-12 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="relative w-full max-w-[294px] h-[524px]">
                  <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-[#f9bd65] px-6 py-2 rounded-[120px]">
                  <span className=" text-black text-base" dir="auto">
                    دارای استاندارد xum
                  </span>
                </div>
                <div className="bg-[#65cdf9] px-6 py-2 rounded-[120px]">
                  <span className=" text-black text-base" dir="auto">
                    ۳ لیتر
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className=" text-2xl md:text-3xl lg:text-4xl text-[#fcfbee] text-right" dir="auto">
                روغن گیربکس فول سینتتیک Romela ATF-XL
              </h1>

              {/* Product Description */}
              <p className="font-['IRANSansX:Light',sans-serif] text-base md:text-lg text-[#fcfbee] text-right leading-relaxed" dir="auto">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنا
              </p>

              {/* Product Specs */}
              <div className="font-['IRANSansX:Light',sans-serif] text-base md:text-lg text-[#f58f4a] text-right" dir="auto">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span>استاندارد: </span>
                    <span className="font-['IRANSansX:Black',sans-serif]">MB 226.1</span>
                  </li>
                  <li>
                    <span>ویسکوزیته: </span>
                    <span className="font-['IRANSansX:Black',sans-serif]">10W-40</span>
                  </li>
                  <li>
                    برند های قابل استفاده: <span className="font-['IRANSansX:Black',sans-serif]">Benz, BMW</span>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="font-['IRANSansX:Light',sans-serif] text-2xl text-[#fcfbee] text-right" dir="auto">قیمت</span>
                <span className="font-['IRANSansX:Black',sans-serif] text-3xl md:text-4xl text-[#fcfbee] text-right" dir="auto">
                  ۲۳,۰۰۰,۰۰۰ <span className="font-['IRANSansX:Light',sans-serif]">تومان</span>
                </span>
              </div>

              {/* Stock Counter */}
              <div className="flex flex-col gap-4">
                <p className="font-['IRANSansX:Light',sans-serif] text-base text-[#fcfbee] text-right" dir="auto">
                  <span>تنها </span>
                  <span className="text-[#f58f4a]">۲ عدد</span>
                  <span> در انبار باقی مانده!</span>
                </p>
                <div className="bg-[rgba(255,255,255,0.12)] flex items-center justify-center gap-6 h-[59px] px-4 rounded-[120px] max-w-[239px]">
                  <button className="size-6">
                    <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p2a6e0600} fill="#A7A7A7" />
                    </svg>
                  </button>
                  <div className="bg-[#686868] flex items-center justify-center h-[43px] px-4 rounded-[120px] min-w-[86px]">
                    <span className="font-['SF_Pro:Medium',sans-serif] text-[#d2d2d2] text-sm">1</span>
                  </div>
                  <button className="size-6">
                    <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                      <path d="M6 13V11H18V13H6Z" fill="#A7A7A7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white flex items-center justify-center h-[56px] px-8 rounded-[70px] flex-1 sm:flex-none">
                  <span className=" text-black text-base" dir="auto">
                    افزودن به سبد
                  </span>
                </button>
                <button className="border border-white flex items-center justify-center h-[56px] px-8 rounded-[70px] flex-1 sm:flex-none">
                  <span className=" text-white text-base" dir="auto">
                    ثبت سفارش
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Introduction Section */}
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-12" dir="auto">
            معرفی روغنX
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-[#343434] rounded-3xl p-8 md:p-12">
                <div className="relative w-full h-[256px] md:h-[300px] flex items-center justify-center">
                  <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgImage9.src} />
                </div>
                <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center mt-4">
                  <div className="relative w-[201px] h-[359px]">
                    <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="font-['IRANSansX:Medium',sans-serif] text-lg md:text-xl text-white text-right leading-relaxed" dir="auto">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Product Variants Section */}
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-12" dir="auto">
            مدل های مختلف  این محصول
          </h2>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="bg-[#242424] rounded-t-3xl p-4">
                <div className="grid grid-cols-4 gap-4 text-right">
                  <div className=" text-[#f9bd65] text-lg" dir="auto">تصویر محصول</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">نام محصول</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">حجم</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">قیمت</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="bg-[rgba(249,189,101,0.4)] border border-[#3b3b3b] p-4">
                <div className="grid grid-cols-4 gap-4 items-center text-right">
                  <div className="flex justify-center">
                    <div className="relative w-[99px] h-[175px]">
                      <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                    </div>
                  </div>
                  <div>
                    <p className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg" dir="auto">
                      روغن گیربکس فول سینتتیک Romela ATF-XL
                    </p>
                    <p className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-base mt-1" dir="auto">
                      (انتخاب شده)
                    </p>
                  </div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">۱ لیتر</div>
                  <div className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg" dir="auto">۲۳,۰۰۰,۰۰۰ تومان</div>
                </div>
              </div>

              <div className="bg-[#161616] border border-[#3b3b3b] p-4">
                <div className="grid grid-cols-4 gap-4 items-center text-right">
                  <div className="flex justify-center">
                    <div className="relative w-[99px] h-[175px]">
                      <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                    </div>
                  </div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">
                    روغن گیربکس فول سینتتیک Romela ATF-XL
                  </div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">۳ لیتر</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">۲۳,۰۰۰,۰۰۰ تومان</div>
                </div>
              </div>

              <div className="bg-[#161616] border border-[#3b3b3b] rounded-b-3xl p-4">
                <div className="grid grid-cols-4 gap-4 items-center text-right">
                  <div className="flex justify-center">
                    <div className="relative w-[99px] h-[175px]">
                      <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                    </div>
                  </div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">
                    روغن گیربکس فول سینتتیک Romela ATF-XL
                  </div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">۳ لیتر</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">۲۳,۰۰۰,۰۰۰ تومان</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Data Sheet Section */}
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-12" dir="auto">
            دیتاشیت محصول
          </h2>

          <div className="mb-8">
            <p className="font-['IRANSansX:Medium',sans-serif] text-lg md:text-xl text-white text-right leading-relaxed mb-6" dir="auto">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#fdba74] flex items-center gap-2 h-[56px] px-6 rounded-[70px]">
                <span className=" text-black text-base" dir="auto">دانلود دیتا شیت</span>
                <div className="size-6">
                  <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p173bbf80} fill="black" />
                  </svg>
                </div>
              </button>
              <button className="bg-[#fdba74] flex items-center gap-2 h-[56px] px-6 rounded-[70px]">
                <span className=" text-black text-base" dir="auto">دانلود کاتالوگ</span>
                <div className="size-6">
                  <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p16f45de0} fill="black" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="bg-[#202020] rounded-t-3xl p-4">
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div className=" text-[#f9bd65] text-lg" dir="auto">ویژگی (Property)</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">مقدار (Typical Value)</div>
                  <div className=" text-[#f9bd65] text-lg" dir="auto">استاندارد/روش آزمون</div>
                </div>
              </div>

              {/* Table Rows */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className={`bg-[#161616] border border-[#3b3b3b] p-4 ${i === 7 ? 'rounded-b-3xl' : ''}`}>
                  <div className="grid grid-cols-3 gap-4 text-right">
                    <div className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg" dir="auto">
                      Kinematic viscosity @40°C
                    </div>
                    <div className=" text-[#f9bd65] text-lg" dir="auto">
                      29 mm²/s
                    </div>
                    <div className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg" dir="auto">
                      ISO 3104
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Photo Gallery Section */}
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-12" dir="auto">
            تصویر محصول
          </h2>

          <div className="relative bg-[#222] rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-[#2c2c2c] rounded-3xl p-8 md:p-12">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgImg2889N1.src} />
              </div>
            </div>
          </div>

          <p className="font-['IRANSansX:Medium',sans-serif] text-lg md:text-xl text-white text-right leading-relaxed mt-8" dir="auto">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای
          </p>
        </section>

        <Divider />

        {/* Similar Products Section */}
        <section className="w-full mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl  text-white text-right mb-6" dir="auto">
                محصولا مشابه
              </h2>
              <p className="font-['IRANYekanX:Regular',sans-serif] text-base md:text-lg text-white text-right leading-relaxed" dir="auto">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {/* Similar Product Card 1 */}
                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full h-[202px] mb-4 flex items-center justify-center">
                    <div className="bg-[rgba(255,255,255,0.3)] rounded-lg w-full h-full" />
                  </div>
                  <h3 className="font-['IRANYekan:Bold',sans-serif] text-[#f9bd65] text-base" dir="auto">
                    Romela Drive 0w-20
                  </h3>
                </div>

                {/* Similar Product Card 2 */}
                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full h-[202px] mb-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgImage1.src} />
                    </div>
                  </div>
                  <h3 className="font-['IRANYekan:Bold',sans-serif] text-[#f9bd65] text-base" dir="auto">
                    Romela Drive 10w-40
                  </h3>
                </div>

                {/* Similar Product Card 3 */}
                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full h-[202px] mb-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={imgImage2.src} />
                    </div>
                  </div>
                  <h3 className="font-['IRANYekan:Bold',sans-serif] text-[#f9bd65] text-base" dir="auto">
                    Romela Drive 5w-30
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
