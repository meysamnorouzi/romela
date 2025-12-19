import { getBlogPosts } from '@/lib/api/website'
import { BlogDetailClient } from '../BlogDetailClient'

// Static params generation for build-time
export async function generateStaticParams() {
  try {
    const allSlugs: string[] = []
    const slugSet = new Set<string>()
    let page = 1
    const perPage = 100
    let hasMore = true
    let consecutiveEmptyPages = 0
    let lastTotal = 0

    // Known problematic slugs that might not be returned by the API
    // Add these FIRST to ensure they're always included
    const problematicEncodedSlugs = [
      '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-6',
      '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-7'
    ]
    const problematicDecodedSlugs: string[] = []
    for (const encoded of problematicEncodedSlugs) {
      try {
        const decoded = decodeURIComponent(encoded)
        problematicDecodedSlugs.push(decoded)
        // Add immediately to ensure it's always included
        if (!slugSet.has(decoded)) {
          slugSet.add(decoded)
          allSlugs.push(decoded)
          console.log('Pre-added problematic slug:', decoded)
        }
      } catch (e) {
        console.error('Failed to decode problematic slug:', e)
      }
    }

    // Fetch all blog posts with pagination
    while (hasMore && consecutiveEmptyPages < 3) {
      try {
        const result = await getBlogPosts({ 
          per_page: perPage, 
          page: page 
        })
        
        const posts = result.posts || []
        lastTotal = result.total || 0
        
        if (posts.length === 0) {
          consecutiveEmptyPages++
        } else {
          consecutiveEmptyPages = 0
          // Add all post slugs (use raw slug as-is from API)
          for (const post of posts) {
            if (post.slug) {
              const rawSlug = post.slug.trim()
              
              // Check if this is a problematic slug
              if (problematicDecodedSlugs.length > 0 && problematicDecodedSlugs.some(p => rawSlug === p || rawSlug.includes('اشتباهات'))) {
                console.log('Found problematic slug in API:', rawSlug)
              }
              
              // Add the raw slug (Next.js will handle URL encoding)
              if (!slugSet.has(rawSlug)) {
                slugSet.add(rawSlug)
                allSlugs.push(rawSlug)
              }
            }
          }
        }
        
        // Check if there are more pages
        const total = result.total || 0
        const fetched = page * perPage
        hasMore = posts.length === perPage && (total === 0 || fetched < total)
        
        page++
        
        // Safety limit to prevent infinite loops
        if (page > 100) {
          console.warn('Reached safety limit for blog post pagination')
          break
        }
      } catch (error) {
        console.error(`Error fetching blog posts page ${page}:`, error)
        consecutiveEmptyPages++
        if (consecutiveEmptyPages >= 3) break
      }
    }
    
    // Always add problematic slugs to ensure they're included
    // This is a workaround for slugs that might not be returned by the API
    for (const problematicDecoded of problematicDecodedSlugs) {
      const normalizedProblematic = problematicDecoded.trim()
      const hasProblematicSlug = allSlugs.some(s => {
        const normalized = s.trim()
        return normalized === normalizedProblematic || 
               normalized === problematicDecoded ||
               s === problematicDecoded
      })
      
      if (!hasProblematicSlug) {
        console.warn('Missing problematic slug in API response, adding it manually:', problematicDecoded)
        console.warn('Total posts fetched:', allSlugs.length, 'Total from API:', lastTotal)
        // Add the exact decoded slug
        allSlugs.push(problematicDecoded)
        slugSet.add(problematicDecoded)
      } else {
        console.log('Problematic slug found in API:', problematicDecoded)
      }
    }
    
    const params = allSlugs.map((slug) => ({
      slug: slug.trim(), // Ensure trimmed slugs
    }))
    
    console.log(`Generated ${params.length} static params for blog posts (API total: ${lastTotal})`)
    if (params.length > 0 && params.length <= 20) {
      console.log('Blog slugs:', params.map(p => p.slug).join(', '))
    } else if (params.length > 20) {
      console.log('Blog slugs (first 20):', params.map(p => p.slug).slice(0, 20).join(', '), '...')
    }
    
    // Verify all problematic slugs are included with exact matching
    for (const problematicDecoded of problematicDecodedSlugs) {
      const found = params.some(p => {
        const pSlug = p.slug.trim()
        const probSlug = problematicDecoded.trim()
        return pSlug === probSlug || pSlug === problematicDecoded || p.slug === problematicDecoded
      })
      if (!found) {
        console.error('CRITICAL: Problematic slug NOT found in params:', problematicDecoded)
        console.error('Available slugs sample:', params.slice(0, 5).map(p => p.slug))
      } else {
        console.log('✓ Problematic slug verified:', problematicDecoded)
      }
    }
    
    return params
  } catch (error) {
    console.error('Error generating static params for blog posts:', error)
    return []
  }
}

export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  // Decode the slug if it's URL-encoded (Next.js passes it as-is from the path)
  let decodedSlug = params.slug
  try {
    decodedSlug = decodeURIComponent(params.slug)
  } catch {
    // If decoding fails, use original
    decodedSlug = params.slug
  }
  
  return <BlogDetailClient slug={decodedSlug} />
}

