 'use client'

 import { useSearchParams } from 'next/navigation'
 import { BlogPageClient } from './BlogPageClient'
 import { BlogDetailClient } from './BlogDetailClient'

 export default function BlogPage() {
   const sp = useSearchParams()
   const slug = (sp.get('slug') ?? '').trim()

   if (slug) return <BlogDetailClient slug={slug} />

   return <BlogPageClient />
 }

