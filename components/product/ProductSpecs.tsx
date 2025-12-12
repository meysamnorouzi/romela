interface Spec {
  property: string
  value: string
  standard: string
}

interface ProductSpecsProps {
  specs?: Spec[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const defaultSpecs: Spec[] = [
    {
      property: 'Kinematic viscosity @ 40°C',
      value: '29 mm²/s',
      standard: 'ISO 3104',
    },
    {
      property: 'Kinematic viscosity @ 100°C',
      value: '6.5 mm²/s',
      standard: 'ISO 3104',
    },
    {
      property: 'Viscosity Index',
      value: '165',
      standard: 'ISO 2909',
    },
    {
      property: 'Flash Point',
      value: '220°C',
      standard: 'ISO 2592',
    },
    {
      property: 'Pour Point',
      value: '-45°C',
      standard: 'ISO 3016',
    },
  ]

  const displaySpecs = specs || defaultSpecs

  return (
    <section className="py-12 md:py-16 bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          دیتاشیت محصول
        </h2>
        <div className="mb-8 text-gray-300 space-y-4 text-justify">
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
          </p>
          <p>
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
          </p>
        </div>
        <div className="mb-8">
          <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors">
            دانلود دیتاشیت
          </button>
        </div>
        <div className="bg-dark rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-right text-white font-bold">ویژگی</th>
                <th className="px-6 py-4 text-right text-white font-bold">مقدار</th>
                <th className="px-6 py-4 text-right text-white font-bold">استاندارد روش آزمون</th>
              </tr>
            </thead>
            <tbody>
              {displaySpecs.map((spec, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-dark-lighter transition-colors"
                >
                  <td className="px-6 py-4 text-gray-300">{spec.property}</td>
                  <td className="px-6 py-4 text-white font-medium">{spec.value}</td>
                  <td className="px-6 py-4 text-gray-400">{spec.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

