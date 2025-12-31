 'use client'
 
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import type {
  WebsitePost,
  WebsitePostsListResponse,
  WebsitePostsSearchResponse,
  WebsiteTerm,
  WebsiteTermsListResponse,
} from '@/lib/api/types'
 
 type BlogSearchParams = {
   page?: string
   per_page?: string
   q?: string
   category_slug?: string
 }
 
 function buildQueryString(params: Record<string, string | undefined>) {
   const qp = new URLSearchParams()
   for (const [k, v] of Object.entries(params)) {
     if (!v) continue
     qp.set(k, v)
   }
   const s = qp.toString()
   return s ? `?${s}` : ''
 }
 
 export function BlogPageClient({
}: {}) {
   const sp = useSearchParams()
 
   const searchParams: BlogSearchParams = {
     page: sp.get('page') ?? undefined,
     per_page: sp.get('per_page') ?? undefined,
     q: sp.get('q') ?? undefined,
     category_slug: sp.get('category_slug') ?? undefined,
   }
 
   const page = Math.max(1, Number(searchParams.page ?? 1) || 1)
   const perPage = Math.min(24, Math.max(6, Number(searchParams.per_page ?? 12) || 12))
   const q = (searchParams.q ?? '').trim()
   const categorySlug = (searchParams.category_slug ?? '').trim()
 
  const [categories, setCategories] = useState<WebsiteTerm[]>([])
  const [posts, setPosts] = useState<WebsitePost[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / perPage)), [total, perPage])
  const safePage = Math.min(page, totalPages)

  const WP_JSON_BASE_URL = (
    process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    'https://admin.padradarasoil.com/wp-json'
  ).replace(/\/+$/, '')

  function buildApiUrl(path: string, query?: Record<string, string | number | boolean | undefined>) {
    const url = new URL(`${WP_JSON_BASE_URL}/${path.replace(/^\/+/, '')}`)
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v === undefined) continue
        url.searchParams.set(k, String(v))
      }
    }
    return url.toString()
  }

  async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return res.json() as Promise<T>
  }

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        const raw = await fetchJson<WebsiteTermsListResponse>(
          buildApiUrl('website/v1/categories', { per_page: 100, page: 1, hide_empty: true })
        )
        if (cancelled) return
        setCategories((raw.categories ?? []) as WebsiteTerm[])
      } catch {
        // ignore
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function loadPosts() {
      try {
        const url = q
          ? buildApiUrl('website/v1/post-search', {
              q,
              per_page: perPage,
              page: safePage,
              ...(categorySlug ? { category_slug: categorySlug } : undefined),
            })
          : buildApiUrl('website/v1/post-list', {
              per_page: perPage,
              page: safePage,
              ...(categorySlug ? { category_slug: categorySlug } : undefined),
            })

        const raw = q
          ? await fetchJson<WebsitePostsSearchResponse>(url)
          : await fetchJson<WebsitePostsListResponse>(url)

        if (cancelled) return

        const t = Number((raw as any).total ?? 0)
        setTotal(Number.isFinite(t) ? t : 0)
        setPosts((((raw as any).posts ?? []) as WebsitePost[]) || [])
      } catch {
        if (cancelled) return
        setTotal(0)
        setPosts([])
      } finally {
        if (cancelled) return
        setLoading(false)
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [q, categorySlug, perPage, safePage])
 
   return (
     <div className="bg-[#0e0e0e] min-h-screen w-full xl:px-0 2xl:px-6 sm:px-6">
       <div className="relative w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-24 md:pt-32" style={{ 
         paddingBottom: 'clamp(2rem, 6.25vw, 5rem)'
       }}>
         {/* Title */}
         <h1 className="text-center text-white font-bold tracking-wide font-iranyekan text-xl sm:text-[2.125rem] mb-6 md:mb-10">
           مقالات
         </h1>
         
         {/* Breadcrumb */}
         <div className="flex justify-start mb-8 sm:mb-10 md:mb-14">
           <div className="font-bold text-[#9A9A9A]" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
             <Link href="/" className="hover:text-[#F58F4A]">صفحه اصلی</Link>
             <span style={{ marginLeft: 'clamp(0.7rem, 0.83vw, 0.7rem)', marginRight: 'clamp(0.7rem, 0.83vw, 0.7rem)' }}>/</span>
             <span className="text-[#F58F4A]">مقالات</span>
           </div>
         </div>

         {/* Search and Filters */}
         <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-14">
           <form action="/blog" method="get" className="flex flex-col md:flex-row gap-3">
             <input
               name="q"
               defaultValue={q}
               placeholder="...جستجو در مقالات"
               className="flex-1 bg-[#343434] text-right border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F58F4A] transition-all font-iranyekan"
               dir="auto"
             />
             {categorySlug ? <input type="hidden" name="category_slug" value={categorySlug} /> : null}
             <button 
               type="submit" 
               className="bg-[#E6A816] text-white px-6 py-3 rounded-full font-bold font-iranyekan hover:bg-[#F58F4A] transition-colors md:w-40"
             >
               جستجو
             </button>
             {(q || categorySlug) && (
               <Link href="/blog" className="md:w-40">
                 <button 
                   type="button" 
                   className="w-full border border-white/20 text-white px-6 py-3 rounded-full font-bold font-iranyekan hover:bg-white/10 transition-colors"
                 >
                   پاک کردن
                 </button>
               </Link>
             )}
           </form>
 
           {categories.length > 0 && (
             <div className="flex flex-wrap gap-2 sm:gap-3">
               <Link
                 href={buildQueryString({ ...(q ? { q } : undefined), ...(searchParams.per_page ? { per_page: String(perPage) } : undefined) })}
                 className={`px-4 py-2 rounded-full text-sm font-bold font-iranyekan border transition-colors ${
                   !categorySlug 
                     ? 'bg-[#E6A816] text-white border-[#E6A816]' 
                     : 'bg-[#343434] text-white border-white/20 hover:border-[#E6A816]'
                 }`}
                 style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
               >
                 همه
               </Link>
               {categories.map((c) => (
                 <Link
                   key={c.id}
                   href={buildQueryString({
                     ...(q ? { q } : undefined),
                     category_slug: c.slug,
                     ...(searchParams.per_page ? { per_page: String(perPage) } : undefined),
                   })}
                   className={`px-4 py-2 rounded-full text-sm font-bold font-iranyekan border transition-colors ${
                     categorySlug === c.slug
                       ? 'bg-[#E6A816] text-white border-[#E6A816]'
                       : 'bg-[#343434] text-white border-white/20 hover:border-[#E6A816]'
                   }`}
                   style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                 >
                   {c.name}
                 </Link>
               ))}
             </div>
           )}
         </div>
 
        {loading ? (
           <div className="flex items-center justify-center py-20">
             <div className="text-white font-iranyekan" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.25rem)' }}>
               در حال بارگذاری...
             </div>
           </div>
        ) : !loading && posts.length === 0 ? (
           <div className="bg-[#343434] rounded-2xl sm:rounded-3xl p-12 text-center" style={{ padding: 'clamp(3rem, 4.69vw, 4rem)' }}>
             <p className="text-white font-iranyekan" style={{ fontSize: 'clamp(1.125rem, 1.56vw, 1.5rem)' }}>
               مقاله‌ای یافت نشد
             </p>
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ 
             gap: 'clamp(1rem, 1.95vw, 2rem)'
           }}>
             {posts.map((post) => (
               <BlogCard key={post.id} post={post} />
             ))}
           </div>
         )}
 
         {totalPages > 1 && (
           <div className="mt-10 sm:mt-12 md:mt-16 flex items-center justify-center gap-3 sm:gap-4" style={{ 
             marginTop: 'clamp(2.5rem, 3.91vw, 4rem)'
           }}>
             <Link
               aria-disabled={safePage <= 1}
               className={`px-4 py-2 rounded-lg border font-bold font-iranyekan transition-colors ${
                 safePage <= 1 
                   ? 'border-white/10 text-gray-600 pointer-events-none' 
                   : 'border-white/20 text-white hover:border-[#E6A816] hover:text-[#E6A816]'
               }`}
               style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
               href={buildQueryString({
                 ...(q ? { q } : undefined),
                 ...(categorySlug ? { category_slug: categorySlug } : undefined),
                 ...(perPage ? { per_page: String(perPage) } : undefined),
                 page: String(Math.max(1, safePage - 1)),
               })}
             >
               قبلی
             </Link>
             <span className="text-white font-iranyekan" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
               صفحه {safePage} از {totalPages}
             </span>
             <Link
               aria-disabled={safePage >= totalPages}
               className={`px-4 py-2 rounded-lg border font-bold font-iranyekan transition-colors ${
                 safePage >= totalPages
                   ? 'border-white/10 text-gray-600 pointer-events-none'
                   : 'border-white/20 text-white hover:border-[#E6A816] hover:text-[#E6A816]'
               }`}
               style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
               href={buildQueryString({
                 ...(q ? { q } : undefined),
                 ...(categorySlug ? { category_slug: categorySlug } : undefined),
                 ...(perPage ? { per_page: String(perPage) } : undefined),
                 page: String(Math.min(totalPages, safePage + 1)),
               })}
             >
               بعدی
             </Link>
           </div>
         )}
       </div>
     </div>
   )
 }

