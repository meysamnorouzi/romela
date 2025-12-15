'use client';

import Link from 'next/link';
import Image from 'next/image';

// Placeholder SVG paths
const svgPaths = {
  p38ded900: "M15 19l-7-7 7-7",
  p2788ff80: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
};

// Image paths
const imgRomelaNewLogo4 = "/images/romela new logo 4.svg";
const imgImage11 = "/images/image 11.png";
const imgImage13 = "/images/image 13.png";
const imgImage17 = "/images/image 17.png";
const imgImage12 = "/images/image 12.svg";
const imgImage14 = "/images/image 14.png";
const imgMockupAtfXlBackgroundRemoved = "/images/mockup-atf-zf.png";
const imgMockupAtfZfBackgroundRemoved = "/images/mockup-atf-zf.png";
const imgMockupAtfVmBackgroundRemoved = "/images/mockup-atf-zf.png";

// Category Card Component
interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  bgColor: string;
  textColor: string;
  imagePosition?: 'left' | 'right';
  href?: string;
}

function CategoryCard({
  title,
  description,
  image,
  color,
  bgColor,
  textColor,
  imagePosition = 'right',
  href = '#'
}: CategoryCardProps) {
  const CardContent = (
    <div className={`relative bg-[#343434] rounded-2xl overflow-hidden h-full min-h-[260px] md:min-h-[300px] lg:min-h-[350px] flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Background blur effect */}
      <div
        className={`absolute ${imagePosition === 'right' ? 'left-0 md:left-1/4' : 'right-0 md:right-1/4'} top-1/2 -translate-y-1/2 w-64 h-32 md:w-96 md:h-48 rounded-full blur-3xl opacity-50`}
        style={{ backgroundColor: bgColor }}
      />

      {/* Image */}
      <div className={`relative ${imagePosition === 'right' ? 'order-2' : 'order-1'} w-full md:w-1/2 h-48 md:h-auto flex items-center justify-center p-4 md:p-8`}>
        <div className="relative w-full h-full max-w-xs">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`relative ${imagePosition === 'right' ? 'order-1' : 'order-2'} w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 gap-3 md:gap-4`}>
        <h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-right"
          style={{ color: textColor }}
        >
          {title}
        </h3>
        <p
          className="text-sm md:text-base lg:text-lg text-right"
          style={{ color: textColor }}
        >
          {description}
        </p>
        <Link
          href={href}
          className="flex items-center gap-2 mt-2 md:mt-4 group"
          style={{ color: textColor }}
        >
          <span className="text-sm md:text-base">مشاهده محصولات</span>
          <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d={svgPaths.p38ded900} />
          </svg>
        </Link>
      </div>
    </div>
  );

  if (href && href !== '#') {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

// Product Card Component
interface ProductCardProps {
  image: string;
  title: string;
  bgColor: string;
  textColor: string;
  href?: string;
}

function ProductCard({ image, title, bgColor, textColor, href = '#' }: ProductCardProps) {
  const CardContent = (
    <div className='relative'>
      <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
      <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMockupAtfZfBackgroundRemoved} />
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
  );

  if (href && href !== '#') {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

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

export default function ProductsPage() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      {/* Container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 md:pb-12 lg:pb-16 pt-52">

        {/* Main Title */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-8 md:mt-12 lg:mt-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-shadow-lg">
            دسته بندی محصولات روغن موتور
          </h1>
        </div>

        {/* Description Text */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <p className="text-sm md:text-base lg:text-lg text-white text-right leading-relaxed">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
          {/* روغن موتور سواری سبک */}
          <CategoryCard
            title="روغن موتور سواری سبک"
            description="توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ..."
            image={imgImage11}
            color="#b1b1b1"
            bgColor="rgba(177,177,177,0.5)"
            textColor="#b1b1b1"
            imagePosition="right"
          />

          {/* روغن موتور سواری سنگین */}
          <CategoryCard
            title="روغن موتور سواری سنگین"
            description="توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ..."
            image={imgImage12}
            color="#b7b7b7"
            bgColor="rgba(183,183,183,0.5)"
            textColor="#b7b7b7"
            imagePosition="left"
          />

          {/* روغن موتور ماشین آلات راه سازی */}
          <CategoryCard
            title="روغن موتور ماشین آلات راه سازی"
            description="توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ..."
            image={imgImage13}
            color="#e09b1b"
            bgColor="rgba(224,155,27,0.5)"
            textColor="#e09b1b"
            imagePosition="right"
          />

          {/* روغن موتور کشتی */}
          <CategoryCard
            title="روغن موتور کشتی"
            description="توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ..."
            image={imgImage14}
            color="#77a3f0"
            bgColor="rgba(119,163,240,0.5)"
            textColor="#77a3f0"
            imagePosition="left"
          />

          {/* روغن موتور سیکلت */}
          <CategoryCard
            title="روغن موتور سیکلت"
            description="توربین، کمپرسور، ترانسفورمر، حرارتی، بافت و ..."
            image={imgImage17}
            color="#e0491b"
            bgColor="rgba(224,73,27,0.5)"
            textColor="#e0491b"
            imagePosition="right"
          />
        </div>

        {/* Product Sections */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* محصولات موتور سواری سبک */}
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12">
              محصولات موتور سواری سبک
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-20">
              {[1, 2, 3, 4].map((i) => (
                <ProductCard
                  key={i}
                  image={i % 2 === 0 ? imgMockupAtfZfBackgroundRemoved : imgMockupAtfXlBackgroundRemoved}
                  title="روغن گیربکس فول سینتتیک Romela ATF-XL"
                  bgColor="#ededed"
                  textColor="#000"
                />
              ))}
            </div>
            <Divider />
          </section>

          {/* محصولات موتور سواری سنگین */}
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12">
              محصولات موتور سواری سنگین
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-20">
              {[1, 2, 3, 4].map((i) => (
                <ProductCard
                  key={i}
                  image={i % 2 === 0 ? imgMockupAtfZfBackgroundRemoved : imgMockupAtfXlBackgroundRemoved}
                  title="روغن گیربکس فول سینتتیک Romela ATF-XL"
                  bgColor="#b7b7b7"
                  textColor="#000"
                />
              ))}
            </div>
            <Divider />
          </section>

          {/* روغن موتور ماشین آلات راه سازی */}
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12">
              روغن موتور ماشین آلات راه سازی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-20">
              {[1, 2, 3, 4].map((i) => (
                <ProductCard
                  key={i}
                  image={i % 2 === 0 ? imgMockupAtfZfBackgroundRemoved : imgMockupAtfXlBackgroundRemoved}
                  title="روغن گیربکس فول سینتتیک Romela ATF-XL"
                  bgColor="#e09b1b"
                  textColor="#000"
                />
              ))}
            </div>
            <Divider />
          </section>

          {/* روغن موتور کشتی */}
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12">
              روغن موتور کشتی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-20">
              {[1, 2, 3, 4].map((i) => (
                <ProductCard
                  key={i}
                  image={i % 2 === 0 ? imgMockupAtfZfBackgroundRemoved : imgMockupAtfXlBackgroundRemoved}
                  title="روغن گیربکس فول سینتتیک Romela ATF-XL"
                  bgColor="#77a3f0"
                  textColor="#000"
                />
              ))}
            </div>
            <Divider />
          </section>

          {/* روغن موتور سیکلت */}
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12">
              روغن موتور سیکلت
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-20">
              {[1, 2, 3, 4].map((i) => (
                <ProductCard
                  key={i}
                  image={i % 2 === 0 ? imgMockupAtfZfBackgroundRemoved : imgMockupAtfXlBackgroundRemoved}
                  title="روغن گیربکس فول سینتتیک Romela ATF-XL"
                  bgColor="#e0491b"
                  textColor="#fcfbee"
                />
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Description Text */}
        <div className="mt-16 md:mt-20 lg:mt-24">
          <p className="text-sm md:text-base lg:text-lg text-white text-right leading-relaxed">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تای
          </p>
        </div>
      </div>
    </div>
  );
}
