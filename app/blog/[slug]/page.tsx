import { getBlogPosts } from '@/lib/api/website'
import { BlogDetailClient } from '../BlogDetailClient'

// Disable dynamic params
export const dynamicParams = false

// Generate static params - MUST be async function
export async function generateStaticParams() {
  // Known problematic slugs
  const problematicEncodedSlugs = [
    '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-6',
    '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-7'
  ]
  
  const problematicDecodedSlugs = []
  for (const encoded of problematicEncodedSlugs) {
    try {
      problematicDecodedSlugs.push(decodeURIComponent(encoded))
    } catch (e) {
      console.error('Failed to decode:', encoded)
    }
  }

  const allSlugs = []
  const slugSet = new Set()
  
  // Add problematic slugs first
  for (const decoded of problematicDecodedSlugs) {
    const trimmed = decoded.trim()
    if (trimmed && !slugSet.has(trimmed)) {
      slugSet.add(trimmed)
      allSlugs.push(trimmed)
    }
  }

  // Fetch from API
  try {
    let page = 1
    let hasMore = true
    
    while (hasMore && page <= 100) {
      const result = await getBlogPosts({ per_page: 100, page })
      const posts = result.posts || []
      
      if (posts.length === 0) break
      
      for (const post of posts) {
        if (post.slug) {
          const slug = post.slug.trim()
          if (!slugSet.has(slug)) {
            slugSet.add(slug)
            allSlugs.push(slug)
          }
        }
      }
      
      hasMore = posts.length === 100
      page++
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }
  
  // Ensure problematic slugs are included
  for (const decoded of problematicDecodedSlugs) {
    const trimmed = decoded.trim()
    if (!slugSet.has(trimmed)) {
      allSlugs.push(trimmed)
    }
  }
  
  const params = allSlugs.map(slug => ({ slug }))
  
  console.log(`Generated ${params.length} static params`)
  
  // Always return at least one param
  return params.length > 0 ? params : [{ slug: 'placeholder' }]
}

// Default export - page component
export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Handle both Promise and direct params (Next.js 14+ compatibility)
  const resolvedParams = params instanceof Promise ? await params : params
  let slug = resolvedParams?.slug || ''
  
  // Ensure slug is decoded (Next.js should do this automatically, but handle edge cases)
  if (slug && slug.includes('%')) {
    try {
      slug = decodeURIComponent(slug)
    } catch (e) {
      // If decoding fails, use original
      console.error('Failed to decode slug:', slug, e)
    }
  }
  
  if (!slug) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-dark-lighter rounded-xl p-12 text-center">
            <p className="text-2xl text-gray-400">مقاله یافت نشد</p>
          </div>
        </div>
      </div>
    )
  }
  
  return <BlogDetailClient slug={slug} />
}