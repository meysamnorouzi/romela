import svgPaths from "./imports/svg-vwybhmkqfj";
import clsx from "clsx";
import {
  imgVibrantColorsWaterCreateAbstractWavePatternGeneratedByAi3,
  img4066180884Cf1Da234Ada498F99878E38474B39B91,
  imgImage5,
  imgImage7,
  imgImage8,
  imgImage2,
  imgImage9,
  img1,
  imgImage6,
  imgImage3,
  imgMockupAtfXlBackgroundRemoved,
  imgMockupAtfZfBackgroundRemoved,
  imgMockupAtfVmBackgroundRemoved,
  imgImage1,
  imgImage4,
} from "./imports/image-placeholders";
import { imgVibrantColorsWaterCreateAbstractWavePatternGeneratedByAi2, img, imgRectangle45, imgRectangle42, imgRectangle43, imgRectangle44 } from "./imports/svg-65x1p";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/utils/seo";

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
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {/* Hero Section with Masked Background */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden flex items-center justify-center" style={{ backgroundImage: `url('/images/vibrant-colors-water-create-abstract-wave-pattern-generated-by-ai 2.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
        <div className="flex flex-col items-center justify-center z-10">
          <p className="text-2xl font-['IRANYekanX:Bold',sans-serif] md:text-3xl lg:text-4xl xl:text-5xl leading-normal text-shadow-[0px_2px_12px_rgba(0,0,0,0.75)] mb-8 md:mb-12" dir="auto">
            پادراد ارس نمایندگی رسمی محصولات ROMELA OIL GERMANY 🇩🇪
          </p>
          <div
            className="w-full max-w-7xl rounded-3xl p-6 md:p-8 lg:p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(39px) saturate(180%)',
              WebkitBackdropFilter: 'blur(39px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
            }}
          >
            {/* Guide Button */}
            <div className="mb-6">
              <button
                className="flex items-center gap-2 h-12 px-6 md:px-8 py-2 rounded-[120px] transition-all hover:opacity-90"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span className="flex flex-col font-['IRANSansX:Bold',sans-serif] text-[#fcfbee] text-base" dir="auto">
                  راهنمای انتخاب روغن
                </span>
                <div className="h-[18px] w-[11px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 18">
                    <path d={svgPaths.p2064e000} fill="var(--fill-0, #FCFBEE)" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Title and Description */}
            <div className="mb-8 text-right">
              <h2 className="font-['IRANSansX:DemiBold',sans-serif] text-xl md:text-2xl lg:text-3xl text-white mb-4" dir="auto">
                جستجو روغن مناسب کاربری شما
              </h2>
              <p className="font-['IRANSansX:Regular',sans-serif] text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-relaxed" dir="auto">
                برای تجربه عملکرد بهتر موتور، روغن سازگار با نیازهای فنی خودروی خود را همینجا جستجو کنید.
              </p>
            </div>

            {/* Filters and Search Button */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              {/* Search Button */}
              <button
                className="w-full md:w-auto flex items-center justify-center h-[54px] px-8 md:px-12 rounded-[120px] order-1 md:order-0 transition-all hover:opacity-90"
                style={{
                  background: 'rgba(230, 168, 22, 0.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(230, 168, 22, 0.3)',
                }}
              >
                <span className="font-['IRANSansX:Bold',sans-serif] text-[#fcfbee] text-base" dir="auto">
                  جستجو محصول
                </span>
              </button>

              {/* Dropdown Filters */}
              <div className="flex flex-col md:flex-row gap-4 flex-1 w-full md:w-auto order-0 md:order-1">
                <div
                  className="relative h-[54px] rounded-[70px] flex items-center px-4 cursor-pointer transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="size-6 ml-2">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g clipPath="url(#clip0_3_1145)">
                        <path d="M7 10L12 15L17 10H7Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_1145">
                          <rect fill="white" height="24" width="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-['IRANSansX:DemiBold',sans-serif] text-base text-white text-right flex-1" dir="auto">
                    نوع روغن
                  </span>
                </div>

                <div
                  className="relative h-[54px] rounded-[70px] flex items-center px-4 cursor-pointer transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="size-6 ml-2">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g clipPath="url(#clip0_3_1145_2)">
                        <path d="M7 10L12 15L17 10H7Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_1145_2">
                          <rect fill="white" height="24" width="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-['IRANSansX:DemiBold',sans-serif] text-base text-white text-right flex-1" dir="auto">
                    کاربرد روغن
                  </span>
                </div>

                <div
                  className="relative h-[54px] rounded-[70px] flex items-center px-4 cursor-pointer transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="size-6 ml-2">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g clipPath="url(#clip0_3_1145_3)">
                        <path d="M7 10L12 15L17 10H7Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_1145_3">
                          <rect fill="white" height="24" width="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-['IRANSansX:DemiBold',sans-serif] text-base text-white text-right flex-1" dir="auto">
                    ویسکوزیته
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 md:pb-12 lg:pb-16">

        <Divider />

        {/* Category Section */}
        <section className="max-w-7xl mx-auto mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-['IRANYekanX:Bold',sans-serif] text-white text-center mb-8 md:mb-16" dir="auto">
            دسته‌بندی محصولات Romela Oil
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Engine Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(229,160,69,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="w-[213px] h-[265px] flex items-center justify-center">
                        <img alt="" className="w-full h-full object-contain pointer-events-none" src={img4066180884Cf1Da234Ada498F99878E38474B39B91.src} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-4 order-1 md:order-2">
                  <h3 className="font-['IRANYekanX:Bold',sans-serif] text-2xl md:text-3xl text-[#fede59] text-right" dir="auto">
                    روغن موتور
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className="font-['IRANYekanX:Regular',sans-serif] text-[#fede59] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="#FEDE59" viewBox="0 0 24 24">
                      <path d={svgPaths.p38ded900} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial Oils Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px] lg:col-span-2">
              <div className="absolute bg-[rgba(215,105,105,0.5)] blur-[57px] w-96 h-48 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage8.src} />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-3">
                  <h3 className="font-['IRANYekanX:Bold',sans-serif] text-2xl md:text-3xl text-[#e39c9c] text-right" dir="auto">
                    روغن های صنعتی
                  </h3>
                  <p className="font-['IRANYekanX:Regular',sans-serif] text-lg text-[#e39c9c] text-right" dir="auto">
                    توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ...
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className="font-['IRANYekanX:Regular',sans-serif] text-[#e39c9c] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="#E39C9C" viewBox="0 0 24 24">
                      <path d={svgPaths.p38ded900} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Oil Card (Wide) */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px] lg:col-span-2">
              <div className="absolute bg-[rgba(229,160,69,0.5)] blur-[57px] w-96 h-48 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage2.src} />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-3 order-1 md:order-2">
                  <h3 className="font-['IRANYekanX:Bold',sans-serif] text-2xl md:text-3xl text-[#fede59] text-right" dir="auto">
                    روغن گیربکس
                  </h3>
                  <p className="font-['IRANYekanX:Regular',sans-serif] text-lg text-[#fede59] text-right" dir="auto">
                    ATF، CVT و ...
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className="font-['IRANYekanX:Regular',sans-serif] text-[#fede59] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="#FEDE59" viewBox="0 0 24 24">
                      <path d={svgPaths.p38ded900} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Brake Oil Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(255,35,39,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row-reverse h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage5.src} />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-4 order-1 md:order-2">
                  <h3 className="font-['IRANYekanX:Bold',sans-serif] text-2xl md:text-3xl text-[#ff2023] text-right" dir="auto">
                    روغن ترمز
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className="font-['IRANYekanX:Regular',sans-serif] text-[#ff2023] text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="#FF2023" viewBox="0 0 24 24">
                      <path d={svgPaths.p38ded900} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Additives Card */}
            <div className="relative bg-[#343434] rounded-3xl overflow-hidden min-h-[260px] md:min-h-[300px]">
              <div className="absolute bg-[rgba(255,255,255,0.5)] blur-[57px] w-64 h-32 rounded-full top-1/2 left-1/4 -translate-y-1/2" />
              <div className="relative flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
                  <div className="w-full max-w-xs flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage7.src} />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-4 order-1 md:order-2">
                  <h3 className="font-['IRANYekanX:Bold',sans-serif] text-2xl md:text-3xl text-white text-right" dir="auto">
                    افزودنی های خاص
                  </h3>
                  <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                    <span className="font-['IRANYekanX:Regular',sans-serif] text-white text-base text-right" dir="auto">
                      مشاهده محصولات
                    </span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="white" viewBox="0 0 24 24">
                      <path d={svgPaths.p38ded900} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-['IRANYekanX:Bold',sans-serif] text-white text-center mb-8 md:mb-16" dir="auto">
            معرفی Romela آلمان
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="bg-[#343434] rounded-3xl p-8 md:p-12">
                <div className="w-full h-[256px] md:h-[300px] flex items-center justify-center">
                  <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgImage9.src} />
                </div>
                <div className="w-full h-[200px] md:h-[250px] flex items-center justify-center mt-4">
                  <div className="w-[201px] h-[359px] flex items-center justify-center">
                    <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgMockupAtfXlBackgroundRemoved.src} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="font-['IRANSansX:Medium',sans-serif] text-lg md:text-xl text-white text-right leading-relaxed" dir="auto">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Products Section */}
        <section className="max-w-7xl mx-auto mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-['IRANYekanX:Bold',sans-serif] text-white text-center mb-8 md:mb-16" dir="auto">
            محصولات Romela Oil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 md:mt-28">
            {/* Product Card 1 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-XL Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfXlBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="absolute bg-[#ededed] h-[54px] rounded-[120px] w-[90%]" />
                <div className="bg-[rgba(177,177,177,0.1)] content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className="flex flex-col font-['IRANSansX:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-XL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="absolute bg-[#ededed] h-[54px] rounded-[120px] w-[90%]" />
                <div className="bg-[rgba(177,177,177,0.1)] content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className="flex flex-col font-['IRANSansX:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-ZF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-VM Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfVmBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="absolute bg-[#ededed] h-[54px] rounded-[120px] w-[90%]" />
                <div className="bg-[rgba(177,177,177,0.1)] content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className="flex flex-col font-['IRANSansX:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-VM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className='relative'>
              <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
              <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-XL Background Removed">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfXlBackgroundRemoved.src} />
              </div>
              <div className='w-[full] flex items-center justify-center z-10 -mt-5'>
                <div className="absolute bg-[#ededed] h-[54px] rounded-[120px] w-[90%]" />
                <div className="bg-[rgba(177,177,177,0.1)] content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
                  <div className="flex flex-col font-['IRANSansX:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">
                    <p className="leading-[16px]" dir="auto">روغن گیربکس فول سینتتیک Romela ATF-XL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Products Button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <button className="bg-[rgba(230,168,22,0.1)] flex items-center justify-center h-[54px] px-8 md:px-12 rounded-[120px]">
              <span className="font-['IRANSansX:Bold',sans-serif] text-[#fcfbee] text-base" dir="auto">
                مشاهده همه محصولات
              </span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
