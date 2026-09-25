const credentials = [
  { label: 'شماره ثبت', value: '۷۹۴۲' },
  { label: 'شماره ملی', value: '۱۴۰۱۴۳۹۷۷۹۰' },
] as const

export function CompanyCredentials() {
  return (
    <section
      className="mb-12 md:mb-16"
      style={{ marginBottom: 'clamp(3rem, 6.25vw, 6rem)' }}
      aria-labelledby="company-credentials-heading"
    >
      <div className="w-full">
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(230,168,22,0.12),transparent_70%)]"
            aria-hidden
          />

          <div
            className="relative flex flex-col items-center text-center px-6 sm:px-10 py-10 sm:py-12"
            dir="rtl"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#E6A816]/35 bg-[#E6A816]/10 px-4 py-1.5 text-[#F9BD65] font-iranyekan font-semibold mb-6"
              style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A816]" aria-hidden />
              اطلاعات رسمی شرکت
            </span>

            <h2
              id="company-credentials-heading"
              className="text-[#E6A816] font-bold font-iranyekan leading-snug max-w-lg"
              style={{ fontSize: 'clamp(1.375rem, 2.08vw, 2rem)' }}
            >
              شرکت پاد راد صنعت موتور ارس
            </h2>

            <div className="mt-8 sm:mt-10 w-full max-w-md space-y-4">
              {credentials.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 sm:gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 sm:px-5 py-3.5 sm:py-4 min-w-0"
                >
                  <span
                    className="text-white/65 font-iranyekan shrink-0"
                    style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-white font-bold font-iranyekan tracking-wide tabular-nums min-w-0 text-left"
                    style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
                    dir="ltr"
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <span
                className="inline-block rounded-lg border border-[#E6A816]/40 bg-[#E6A816]/15 px-6 py-2.5 text-white font-bold font-iranyekan"
                style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
              >
                نماینده انحصاری
              </span>
              <p
                className="mt-4 text-white/55 font-iranyekan max-w-sm mx-auto"
                style={{ fontSize: 'clamp(0.8125rem, 0.94vw, 0.9375rem)', lineHeight: '1.7' }}
              >
                نماینده رسمی و انحصاری برند Romela Oil در ایران
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
