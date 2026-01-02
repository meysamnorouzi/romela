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
      href={`/blog/${post.slug}/`}
      className="bg-[#343434] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#E6A816] transition-all duration-300 group"
    >
      <div className="aspect-video bg-[#242424] relative overflow-hidden">
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

      <div className="p-4 sm:p-6" style={{ padding: 'clamp(1rem, 1.56vw, 1.5rem)' }}>
        <h2 className="text-white font-bold font-iranyekan mb-3 line-clamp-2 group-hover:text-[#E6A816] transition-colors" style={{ 
          fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
          marginBottom: 'clamp(0.75rem, 0.94vw, 1rem)'
        }}>
          {post.title}
        </h2>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3 font-iranyekan" style={{ 
          fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
          marginBottom: 'clamp(0.75rem, 0.94vw, 1rem)'
        }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 0.875rem)' }}>
          <span className="text-gray-400 font-iranyekan">{publishedAt ? formatDate(publishedAt.toISOString()) : ''}</span>
          <span className="text-[#E6A816] group-hover:text-[#F58F4A] transition-colors font-iranyekan">ادامه مطلب </span>
        </div>
      </div>
    </Link>
  )
}
