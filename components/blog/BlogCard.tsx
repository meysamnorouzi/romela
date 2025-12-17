import Link from 'next/link'
import Image from 'next/image'
import type { WebsitePost } from '@/lib/api/types'
import { formatDate } from '@/lib/utils/format'
import { getPublishedDate } from '@/lib/api/website'

interface BlogCardProps {
  post: WebsitePost
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.thumbnail?.large || post.thumbnail?.medium || post.thumbnail?.full
  const publishedAt = getPublishedDate(post)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-dark-lighter rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 group"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{publishedAt ? formatDate(publishedAt.toISOString()) : ''}</span>
          <span className="text-gold group-hover:text-gold-dark transition-colors">ادامه مطلب →</span>
        </div>
      </div>
    </Link>
  )
}
