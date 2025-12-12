import { STATS } from '@/lib/constants'

export function StatsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          آمار Romela Oil
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="bg-dark rounded-xl p-6 md:p-8 text-center hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-4">
                {stat.value}
              </div>
              <div className="text-lg md:text-xl text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

