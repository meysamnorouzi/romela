'use client'
 
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { BlogCard } from '@/components/blog/BlogCard'
import { estimateReadingTimeMinutesFromHtml, stripHtml } from '@/lib/utils/text'
import { formatDate } from '@/lib/utils/format'
import type { WebsitePost, WebsitePostsListResponse } from '@/lib/api/types'
import { getModifiedDate, getPublishedDate, getBlogPostBySlug, getBlogPosts } from '@/lib/api/website'
import { generateArticleSchema } from '@/lib/utils/seo'

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
        // Next.js already decodes URL params, so slug is already decoded
        // Pass it directly to the API function which will handle encoding for the API call
        console.log('Fetching blog post with slug:', slug)
        const p = await getBlogPostBySlug(slug)
        
        if (cancelled) return
        
        if (!p) {
          console.warn('Blog post not found for slug:', slug)
          // Post not found
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
        // Client-side: go back to blog list if missing
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
       <div className="py-8 md:py-12">
         <div className="container mx-auto px-4 md:px-6 lg:px-8">
           <div className="bg-dark-lighter rounded-xl p-12" />
         </div>
       </div>
     )
   }
 
   if (!post) return null
 
   return (
     <div>
       {articleSchema ? (
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
       ) : null}
 
       <Breadcrumbs
         items={[
           { label: 'مقالات', href: '/blog' },
           { label: post.title, href: undefined },
         ]}
       />
 
       <article className="py-8 md:py-12">
         <div className="container mx-auto px-4 md:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             <div className="mb-8">
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
               <div className="flex items-center gap-4 text-gray-400 text-sm">
                 <span>{publishedAt ? formatDate(publishedAt.toISOString()) : ''}</span>
                 <span>•</span>
                 <span>خواندن {readingTimeMinutes} دقیقه</span>
               </div>
 
               {(post.categories?.length || post.tags?.length) ? (
                 <div className="flex flex-wrap gap-2 mt-4">
                   {(post.categories ?? []).map((c) => (
                     <Badge key={`c-${c.id}`} variant="default">
                       {c.name}
                     </Badge>
                   ))}
                   {(post.tags ?? []).map((t) => (
                     <Badge key={`t-${t.id}`} variant="blue">
                       {t.name}
                     </Badge>
                   ))}
                 </div>
               ) : null}
             </div>
 
             {(post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium) ? (
               <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-8 relative">
                 <Image
                   src={post.thumbnail?.full || post.thumbnail?.large || post.thumbnail?.medium || ''}
                   alt={post.title}
                   fill
                   className="object-cover"
                   sizes="(max-width: 768px) 100vw, 800px"
                   priority
                 />
               </div>
             ) : null}
 
             <div className="prose prose-invert prose-lg max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: post.content }} />
 
             {relatedPosts.length > 0 ? (
               <section className="mt-16 pt-8 border-t border-gray-800">
                 <h2 className="text-2xl font-bold text-white mb-6">مقالات مرتبط</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {relatedPosts.map((relatedPost) => (
                     <BlogCard key={relatedPost.id} post={relatedPost} />
                   ))}
                 </div>
               </section>
             ) : null}
           </div>
         </div>
       </article>
     </div>
   )
 }

