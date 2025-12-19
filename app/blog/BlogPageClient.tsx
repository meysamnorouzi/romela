 'use client'
 
 import Link from 'next/link'
 import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
 import { Input } from '@/components/ui/Input'
 import { Button } from '@/components/ui/Button'
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
    'https://padradarasoil.com/wp-json'
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
     <div className="py-8 md:py-12">
       <div className="container mx-auto px-4 md:px-6 lg:px-8">
         <div className="flex flex-col gap-6 mb-8 mt-20">
           {/* <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">مقالات</h1> */}
 
           <form action="/blog" method="get" className="flex flex-col md:flex-row gap-3">
             <Input
               name="q"
               defaultValue={q}
               placeholder="جستجو در مقالات..."
               className="md:flex-1"
             />
             {categorySlug ? <input type="hidden" name="category_slug" value={categorySlug} /> : null}
             <Button type="submit" variant="primary" className="md:w-40">
               جستجو
             </Button>
             {(q || categorySlug) && (
               <Link href="/blog" className="md:w-40">
                 <Button type="button" variant="outline" className="w-full">
                   پاک کردن
                 </Button>
               </Link>
             )}
           </form>
 
           {categories.length > 0 && (
             <div className="flex flex-wrap gap-2">
               <Link
                 href={buildQueryString({ ...(q ? { q } : undefined), ...(searchParams.per_page ? { per_page: String(perPage) } : undefined) })}
                 className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                   !categorySlug ? 'bg-gold text-white border-gold' : 'bg-dark-lighter text-white border-gray-700 hover:border-gold'
                 }`}
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
                   className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                     categorySlug === c.slug
                       ? 'bg-gold text-white border-gold'
                       : 'bg-dark-lighter text-white border-gray-700 hover:border-gold'
                   }`}
                 >
                   {c.name}
                 </Link>
               ))}
             </div>
           )}
         </div>
 
        {!loading && posts.length === 0 ? (
           <div className="bg-dark-lighter rounded-xl p-12 text-center">
             <p className="text-2xl text-gray-400">مقاله‌ای یافت نشد</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {posts.map((post) => (
               <BlogCard key={post.id} post={post} />
             ))}
           </div>
         )}
 
         {totalPages > 1 && (
           <div className="mt-10 flex items-center justify-center gap-3">
             <Link
               aria-disabled={safePage <= 1}
               className={`px-4 py-2 rounded-lg border ${
                 safePage <= 1 ? 'border-gray-800 text-gray-600 pointer-events-none' : 'border-gray-700 text-white hover:border-gold'
               }`}
               href={buildQueryString({
                 ...(q ? { q } : undefined),
                 ...(categorySlug ? { category_slug: categorySlug } : undefined),
                 ...(perPage ? { per_page: String(perPage) } : undefined),
                 page: String(Math.max(1, safePage - 1)),
               })}
             >
               قبلی
             </Link>
             <span className="text-gray-400 text-sm">
               صفحه {safePage} از {totalPages}
             </span>
             <Link
               aria-disabled={safePage >= totalPages}
               className={`px-4 py-2 rounded-lg border ${
                 safePage >= totalPages
                   ? 'border-gray-800 text-gray-600 pointer-events-none'
                   : 'border-gray-700 text-white hover:border-gold'
               }`}
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

