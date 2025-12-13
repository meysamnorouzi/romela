import Link from 'next/link'
import { getPosts } from '@/lib/api/wordpress'
import { formatDate } from '@/lib/utils/format'
import Image from 'next/image'

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 12 })

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
          مقالات
        </h1>

        {posts.length === 0 ? (
          <div className="bg-dark-lighter rounded-xl p-12 text-center">
            <p className="text-2xl text-gray-400">مقاله‌ای یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-dark-lighter rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  {post.featured_media ? (
                    <Image
                      src={`https://via.placeholder.com/800x600?text=${encodeURIComponent(post.title.rendered)}`}
                      alt={post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 
                    className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="text-gray-400 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered.substring(0, 150),
                    }}
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    <span className="text-gold group-hover:text-gold-dark transition-colors">
                      ادامه مطلب →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

