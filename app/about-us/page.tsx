import Image from 'next/image'

export default function AboutUsPage() {
  return (
    <div className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-12">
          درباره ما
        </h1>

        {/* Hero Section */}
        <section className="mb-12 md:mb-16">
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                معرفی Romela آلمان
              </h2>
              <div className="text-gray-300 space-y-4 text-justify">
                <p>
                  شرکت Romela Oil یک برند آلمانی در حوزه تولید انواع روانکارها و روغن‌های صنعتی و خودرویی است که محصولات خود را بر پایه‌ی فناوری روز اروپا و استانداردهای کیفی بین‌المللی تولید می‌کند. تمرکز اصلی Romela بر طراحی و تولید روانکارهایی است که علاوه بر محافظت مؤثر از موتور و تجهیزات صنعتی، موجب افزایش کارایی، کاهش استهلاک و بهبود بهره‌وری سیستم‌ها شوند.
                </p>
                <p>
                  محصولات Romela شامل طیف گسترده‌ای از روغن موتور، روغن گیربکس، روغن‌های صنعتی، روغن هیدرولیک و افزودنی‌های تخصصی است که برای خودروهای سبک و سنگین، ماشین‌آلات صنعتی و تجهیزات پیشرفته طراحی شده‌اند. این محصولات مطابق با استانداردهای جهانی نظیر API و ACEA بوده و بسیاری از آن‌ها دارای تأییدیه خودروسازان (OEM Approvals) هستند.
                </p>
                <p>
                  کیفیت پایدار، دقت در فرمولاسیون و استفاده از مواد اولیه مرغوب، Romela را به برندی مطمئن برای حرفه‌ای‌ها، صنایع و مصرف‌کنندگان تبدیل کرده است. هدف این برند ارائه راهکارهای روانکاری قابل‌اعتماد و اقتصادی، همراه با عملکردی مداوم و پایدار در شرایط کاری مختلف است.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-dark-lighter rounded-xl p-8 md:p-12 mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">ماموریت پاد راد صنعت موتور ارس</h2>
          <div className="text-gray-300 space-y-4 text-justify">
            <p>
              شرکت پاد راد صنعت موتور ارس به عنوان یک مجموعه تخصصی در زمینه تأمین و واردات انواع روانکارهای صنعتی و موتوری، فعالیت خود را از سال ۱۴۰۴ با هدف ایجاد یک زنجیره تأمین پایدار، مطمئن و مطابق با استانداردهای بین‌المللی آغاز کرده است. این شرکت با همکاری مستقیم با Romela Oil آلمان به‌عنوان یکی از تولیدکنندگان معتبر اروپایی، متعهد است محصولات باکیفیت و استاندارد را در اختیار مشتریان و صنایع داخلی قرار دهد.
            </p>
            <p>
              ماموریت اصلی پاد راد صنعت موتور ارس، دسترسی صنایع کشور به روانکارهای قابل‌اعتماد و دارای تأییدیه‌های فنی معتبر می باشد. به همین دلیل، تمام محصولات عرضه‌شده توسط این شرکت مطابق با استانداردهای بین‌المللی مانند API و ACEA بوده و دارای تأییدیه خودروسازان (OEM Approvals) هستند. همچنین اطلاعات فنی کامل محصولات شامل برگه‌های SDS و TDS به‌صورت معتبر ارائه می‌شود تا واحدهای فنی و مهندسی بتوانند با اطمینان و آگاهی بیشتر، انتخاب درست‌تری انجام دهند.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'کیفیت',
                description: 'تعهد به ارائه محصولات با بالاترین کیفیت',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'اعتماد',
                description: 'ساخت روابط پایدار با مشتریان و شرکای تجاری',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'نوآوری',
                description: 'پیشرو در فناوری و توسعه محصولات جدید',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-dark-lighter rounded-xl p-6 text-center hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
              >
                <div className="text-gold mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

