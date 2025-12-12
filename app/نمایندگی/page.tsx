export default function DealershipPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">
          نمایندگی
        </h1>

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Introduction */}
          <section className="bg-dark-lighter rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              نمایندگی رسمی Romela Oil Germany
            </h2>
            <div className="text-gray-300 space-y-4 text-justify">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
              </p>
              <p>
                و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              مزایای نمایندگی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'پشتیبانی کامل فنی و بازاریابی',
                'دسترسی به محصولات با کیفیت بالا',
                'قیمت‌های رقابتی و تخفیف‌های ویژه',
                'آموزش و دوره‌های تخصصی',
                'مشاوره رایگان در انتخاب محصولات',
                'ارسال سریع و به موقع',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-dark-lighter rounded-xl p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Application Form Info */}
          <section className="bg-dark-lighter rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              درخواست نمایندگی
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                برای درخواست نمایندگی، لطفاً با ما تماس بگیرید یا فرم تماس را پر کنید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact-us"
                  className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  تماس با ما
                </a>
                <a
                  href="tel:00982144990571"
                  className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  تماس تلفنی
                </a>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-dark-lighter rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">دفتر مرکزی</h3>
                <p className="mb-2">جاده مخصوص کرج، گرمدره، خیابان تاج بخش، خیابان زرشکی، پلاک 14</p>
                <p className="mb-2">تلفن: ۰۰۹۸۲۱۴۴۹۹۰۵۷۱</p>
                <p>ساعات کاری: تا پنج شنبه / ۸ الی ۲۳</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">کارخانه</h3>
                <p className="mb-2">منطقه آزاد تجاری صنعتی ارس فاز یک صنعتی خیابان 13</p>
                <p className="mb-2">تلفن: ۰۰۹۸۴۱۴۲۰۲۷۰۷۷</p>
                <p>پاسخگویی: با هماهنگی قبلی</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

