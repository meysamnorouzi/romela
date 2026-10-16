 'use client'

 import { useEffect } from 'react'
 import { useSearchParams } from 'next/navigation'
 import { BlogPageClient } from './BlogPageClient'
 import { BlogDetailClient } from './BlogDetailClient'

 // Next's static client navigation requests /blog/index.txt. A rewrite that
 // treats that filename as an article slug reloads /blog/?slug=index.txt forever.
 const PAYLOAD_SLUGS = new Set(['index.txt', 'index.html'])

 export default function BlogPage() {
   const sp = useSearchParams()
   const raw = (sp.get('slug') ?? '').trim()
   const slug = PAYLOAD_SLUGS.has(raw) ? '' : raw

   useEffect(() => {
     if (!PAYLOAD_SLUGS.has(raw)) return
     const url = new URL(window.location.href)
     url.searchParams.delete('slug')
     const next = `${url.pathname}${url.search}${url.hash}`
     window.history.replaceState(window.history.state, '', next)
   }, [raw])

   if (slug) return <BlogDetailClient slug={slug} />

   return <BlogPageClient />
 }

