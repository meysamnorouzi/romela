'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogCard } from '@/components/blog/BlogCard'
import { estimateReadingTimeMinutesFromHtml, stripHtml } from '@/lib/utils/text'
import { formatDate } from '@/lib/utils/format'
import type { WebsitePost } from '@/lib/api/types'
import { getModifiedDate, getPublishedDate, getBlogPostBySlug, getBlogPosts } from '@/lib/api/website'
import { generateArticleSchema } from '@/lib/utils/seo'

// Divider Component
function Divider() {
  return (
    <div className="w-full h-px" style={{ marginTop: 'clamp(2rem, 3.13vw, 4rem)', marginBottom: 'clamp(2rem, 3.13vw, 4rem)' }}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 1824 1" preserveAspectRatio="none">
        <line x1="0.5" y1="0.5" x2="1823.5" y2="0.5" stroke="url(#gradient)" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1824" y1="1.5" y2="1.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function BlogDetailClient({ slug }: { slug: string }) {
  const router = useRouter()
  const [post, setPost] = useState<WebsitePost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<WebsitePost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function load() {
      if (!slug) {
        console.error('No slug provided')
        router.replace('/blog')
        return
      }

      try {
        console.log('Fetching blog post with slug:', slug)
        const p = await getBlogPostBySlug(slug)
        
        if (cancelled) return
        
        if (!p) {
          console.warn('Blog post not found for slug:', slug)
          router.replace('/blog')
          return
        }
        
        console.log('Blog post loaded:', p.title)
        setPost(p)

        try {
          const list = await getBlogPosts({ per_page: 6, page: 1 })
          if (cancelled) return
          const rel = (list.posts ?? []).filter((x) => x.id !== p.id).slice(0, 3)
          setRelatedPosts(rel)
        } catch (error) {
          console.error('Error fetching related posts:', error)
          if (!cancelled) setRelatedPosts([])
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        console.error('Slug that failed:', slug)
        if (cancelled) return
        setPost(null)
        router.replace('/blog')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [slug, router])

  const publishedAt = post ? getPublishedDate(post) : null
  const readingTimeMinutes = post ? estimateReadingTimeMinutesFromHtml(post.content) : 1

  const articleSchema = useMemo(() => {
    if (!post) return null
    return generateArticleSchema({
      headline: post.title,
      description: post.excerpt || stripHtml(post.content).slice(0, 160),
      image: post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium,
      datePublished: publishedAt ? publishedAt.toISOString() : undefined,
      dateModified: getModifiedDate(post)?.toISOString(),
      author: post.author?.name,
    })
  }, [post, publishedAt])

  if (loading && !post) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full xl:px-0 2xl:px-6 sm:px-6">
        <div className="w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-32 lg:pt-64">
          <div className="bg-[#343434] rounded-2xl sm:rounded-3xl" style={{ 
            padding: 'clamp(2rem, 3.13vw, 4rem)',
            minHeight: 'clamp(20rem, 25vw, 30rem)'
          }} />
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full xl:px-0 2xl:px-6 sm:px-6">
      {articleSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      ) : null}

      {/* Container */}
      <div className="w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-32 lg:pt-64" style={{ 
        paddingBottom: 'clamp(1.5rem, 2.34vw, 4rem)'
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'clamp(1rem, 2.6vw, 4rem)' }}>
          <div className="flex items-center text-right justify-start font-bold flex-wrap" style={{ gap: 'clamp(0.25rem, 0.47vw, 0.5rem)' }}>
            <Link href="/" className="hover:text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>صفحه اصلی</Link>
            <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
            <Link href="/blog" className="hover:text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>مقالات</Link>
            <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
            <span className="text-[#F58F4A] truncate max-w-[150px] sm:max-w-none" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>
              {post.title}
            </span>
          </div>
        </div>

        {/* Article Header Section */}
        <div className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.08vw, 3rem)' }}>
            {/* Article Image */}
            {(post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium) ? (
              <div className="w-full lg:w-1/2 bg-[#343434] rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden" style={{ padding: 'clamp(0.75rem, 1.56vw, 2rem)' }}>
                <div className="relative w-full" style={{ 
                  height: 'clamp(200px, 25vw, 400px)',
                  minHeight: 'clamp(200px, 25vw, 400px)'
                }}>
                  <Image
                    src={post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium || ''}
                    alt={post.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            ) : null}

            {/* Article Info */}
            <div className={`w-full ${(post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium) ? 'lg:w-1/2' : ''} flex flex-col`} style={{ gap: 'clamp(1rem, 1.3vw, 1.5rem)' }}>
              {/* Article Title */}
              <h1 className="text-[#FCFBEE] text-right font-bold font-iranyekan" dir="auto" style={{ fontSize: 'clamp(1.5rem, 2.08vw, 2.5rem)' }}>
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center flex-wrap text-[#FCFBEE]" style={{ gap: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                {publishedAt ? (
                  <>
                    <span className="text-right font-light" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      {formatDate(publishedAt.toISOString())}
                    </span>
                    <span className="text-[#717171]" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>•</span>
                  </>
                ) : null}
                <span className="text-right font-light" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                  خواندن {readingTimeMinutes} دقیقه
                </span>
                {post.author?.name ? (
                  <>
                    <span className="text-[#717171]" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>•</span>
                    <span className="text-right font-light" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      {post.author.name}
                    </span>
                  </>
                ) : null}
              </div>

              {/* Categories and Tags */}
              {(post.categories?.length || post.tags?.length) ? (
                <div className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 0.78vw, 1rem)' }}>
                  {(post.categories ?? []).map((c) => (
                    <div key={`c-${c.id}`} className="bg-[#f9bd65] rounded-[120px]" style={{ 
                      paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                      paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)'
                    }}>
                      <span className="text-black font-bold font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {c.name}
                      </span>
                    </div>
                  ))}
                  {(post.tags ?? []).map((t) => (
                    <div key={`t-${t.id}`} className="bg-[#65cdf9] rounded-[120px]" style={{ 
                      paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                      paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)'
                    }}>
                      <span className="text-black font-bold font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Excerpt */}
              {post.excerpt ? (
                <p className="text-[#FCFBEE] text-right font-light leading-relaxed font-iranyekan" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                  {stripHtml(post.excerpt)}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <Divider />

        {/* Article Content Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div 
            className="text-[#FCFBEE] text-right font-iranyekan leading-relaxed prose prose-invert max-w-none" 
            dir="auto"
            style={{ 
              fontSize: 'clamp(0.875rem, 1.17vw, 1.125rem)',
              lineHeight: 'clamp(1.75rem, 2.34vw, 2.5rem)'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </section>

        {relatedPosts.length > 0 ? (
          <>
            <Divider />
            {/* Related Posts Section */}
            <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
              <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.08vw, 3rem)' }}>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-white text-right font-iranyekan font-bold" dir="auto" style={{ 
                    marginBottom: 'clamp(0.75rem, 1.17vw, 1.5rem)',
                    fontSize: 'clamp(1.25rem, 1.88vw, 2.125rem)'
                  }}>
                    مقالات مرتبط
                  </h2>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(0.5rem, 1.17vw, 1.5rem)' }}>
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}

