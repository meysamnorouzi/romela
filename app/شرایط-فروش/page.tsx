export default function SalesConditionsPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">
          شرایط فروش
        </h1>

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* General Terms */}
          <section className="bg-dark-lighter rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              شرایط عمومی
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

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              شرایط پرداخت
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'پرداخت نقدی',
                  description: 'پرداخت کامل مبلغ در زمان ثبت سفارش',
                },
                {
                  title: 'پرداخت اقساطی',
                  description: 'امکان پرداخت اقساطی برای سفارشات بالای ۱۰ میلیون تومان',
                },
                {
                  title: 'چک',
                  description: 'پذیرش چک با هماهنگی قبلی',
                },
              ].map((term, index) => (
                <div
                  key={index}
                  className="bg-dark-lighter rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{term.title}</h3>
                  <p className="text-gray-300">{term.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Terms */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              شرایط ارسال
            </h2>
            <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
              <div className="text-gray-300 space-y-4">
                <p>
                  ارسال محصولات در سراسر کشور انجام می‌شود. هزینه ارسال بر اساس وزن و مقصد محاسبه می‌شود.
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>ارسال رایگان برای سفارشات بالای ۵ میلیون تومان</li>
                  <li>ارسال در تهران: ۱ تا ۲ روز کاری</li>
                  <li>ارسال به شهرستان: ۳ تا ۵ روز کاری</li>
                  <li>امکان ارسال فوری با هزینه اضافی</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Policy */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              شرایط بازگشت کالا
            </h2>
            <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
              <div className="text-gray-300 space-y-4">
                <p>
                  امکان بازگشت کالا در صورت وجود مشکل در محصول یا عدم تطابق با سفارش وجود دارد.
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>بازگشت کالا باید در مدت ۷ روز از زمان دریافت انجام شود</li>
                  <li>کالا باید در بسته‌بندی اصلی و بدون استفاده باشد</li>
                  <li>هزینه بازگشت کالا بر عهده مشتری است</li>
                  <li>بازپرداخت مبلغ در صورت تأیید بازگشت انجام می‌شود</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Warranty */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              گارانتی
            </h2>
            <div className="bg-dark-lighter rounded-xl p-6 md:p-8">
              <div className="text-gray-300 space-y-4">
                <p>
                  تمام محصولات ما دارای گارانتی اصالت و کیفیت هستند. در صورت وجود هرگونه مشکل در محصول، با ما تماس بگیرید.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-dark-lighter rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              سوالی دارید؟
            </h2>
            <p className="text-gray-300 mb-6">
              برای اطلاعات بیشتر در مورد شرایط فروش، با ما تماس بگیرید.
            </p>
            <a
              href="/contact-us"
              className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              تماس با ما
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

