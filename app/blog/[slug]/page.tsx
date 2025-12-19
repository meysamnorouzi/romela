import { getBlogPosts } from '@/lib/api/website'
import { BlogDetailClient } from '../BlogDetailClient'

// Disable dynamic params - only use pre-generated static params
// This is required for static export
export const dynamicParams = false

// Static params generation for build-time
export async function generateStaticParams() {
  // Known problematic slugs that might not be returned by the API
  // These MUST be included regardless of API response
  const problematicEncodedSlugs = [
    '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-6',
    '%D8%A7%D8%B4%D8%AA%D8%A8%D8%A7%D9%87%D8%A7%D8%AA-%D8%B1%D8%A7%DB%8C%D8%AC-%D8%AF%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D9%88%D8%BA%D9%86-%D9%85%D9%88%D8%AA%D9%88%D8%B1-7'
  ]
  
  // Decode problematic slugs first - these will ALWAYS be included
  const problematicDecodedSlugs: string[] = []
  for (const encoded of problematicEncodedSlugs) {
    try {
      const decoded = decodeURIComponent(encoded)
      problematicDecodedSlugs.push(decoded)
    } catch (e) {
      console.error('Failed to decode problematic slug:', encoded, e)
    }
  }

  const allSlugs: string[] = []
  const slugSet = new Set<string>()
  
  // ALWAYS add problematic slugs FIRST, before any API calls
  for (const decoded of problematicDecodedSlugs) {
    const trimmed = decoded.trim()
    if (trimmed && !slugSet.has(trimmed)) {
      slugSet.add(trimmed)
      allSlugs.push(trimmed)
      console.log('✓ Pre-added required slug:', trimmed)
    }
  }

  let page = 1
  const perPage = 100
  let hasMore = true
  let consecutiveEmptyPages = 0
  let lastTotal = 0
  let apiErrorOccurred = false

  // Fetch all blog posts with pagination
  try {
    while (hasMore && consecutiveEmptyPages < 3) {
      try {
        console.log(`Fetching blog posts page ${page}...`)
        const result = await getBlogPosts({ 
          per_page: perPage, 
          page: page 
        })
        
        const posts = result.posts || []
        // Ensure total is a number
        const totalNum = typeof result.total === 'number' ? result.total : (typeof result.total === 'string' ? parseInt(result.total, 10) : 0)
        lastTotal = isNaN(totalNum) ? 0 : totalNum
        
        if (posts.length === 0) {
          consecutiveEmptyPages++
          console.log(`No posts found on page ${page}, consecutive empty pages: ${consecutiveEmptyPages}`)
        } else {
          consecutiveEmptyPages = 0
          // Add all post slugs (use raw slug as-is from API)
          for (const post of posts) {
            if (post.slug) {
              const rawSlug = post.slug.trim()
              
              // Add the raw slug (Next.js will handle URL encoding)
              if (!slugSet.has(rawSlug)) {
                slugSet.add(rawSlug)
                allSlugs.push(rawSlug)
              }
            }
          }
          console.log(`Added ${posts.length} posts from page ${page}, total slugs: ${allSlugs.length}`)
        }
        
        // Check if there are more pages
        const total = totalNum
        const fetched = page * perPage
        hasMore = posts.length === perPage && (total === 0 || fetched < total)
        
        page++
        
        // Safety limit to prevent infinite loops
        if (page > 100) {
          console.warn('Reached safety limit for blog post pagination')
          break
        }
      } catch (error) {
        apiErrorOccurred = true
        console.error(`Error fetching blog posts page ${page}:`, error)
        consecutiveEmptyPages++
        if (consecutiveEmptyPages >= 3) {
          console.warn('Too many consecutive errors, stopping pagination')
          break
        }
      }
    }
  } catch (error) {
    apiErrorOccurred = true
    console.error('Critical error during API fetch:', error)
    // Continue - we still have the problematic slugs added above
  }
  
  // Final check: ensure ALL problematic slugs are included
  // This is critical for static export
  for (const problematicDecoded of problematicDecodedSlugs) {
    const trimmed = problematicDecoded.trim()
    if (!slugSet.has(trimmed)) {
      console.warn('⚠️  Problematic slug missing, force-adding:', trimmed)
      slugSet.add(trimmed)
      allSlugs.push(trimmed)
    }
  }
  
  // Generate params - Next.js expects decoded slugs, it will handle encoding
  // But we need to ensure exact matches for problematic slugs
  const paramsMap = new Map<string, { slug: string }>()
  
  // Add all slugs to the map (this ensures uniqueness)
  for (const slug of allSlugs) {
    const trimmed = slug.trim()
    if (trimmed) {
      paramsMap.set(trimmed, { slug: trimmed })
    }
  }
  
  // CRITICAL: Double-check that problematic slugs are included
  // Next.js might be doing exact string matching, so we need perfect matches
  for (const problematicDecoded of problematicDecodedSlugs) {
    const trimmed = problematicDecoded.trim()
    if (trimmed && !paramsMap.has(trimmed)) {
      console.warn(`⚠️  Force-adding missing problematic slug: ${trimmed}`)
      paramsMap.set(trimmed, { slug: trimmed })
    }
  }
  
  const uniqueParams = Array.from(paramsMap.values())
  
  console.log(`\n📊 Static Params Summary:`)
  console.log(`   Total params generated: ${uniqueParams.length}`)
  console.log(`   API total (if available): ${lastTotal}`)
  console.log(`   API errors occurred: ${apiErrorOccurred ? 'YES' : 'NO'}`)
  console.log(`   Required problematic slugs: ${problematicDecodedSlugs.length}`)
  
  // Final verification - check each problematic slug exists
  for (let i = 0; i < problematicDecodedSlugs.length; i++) {
    const problematicDecoded = problematicDecodedSlugs[i]
    const problematicEncoded = problematicEncodedSlugs[i]
    const trimmed = problematicDecoded.trim()
    
    const found = uniqueParams.some(p => {
      const pSlug = p.slug.trim()
      return pSlug === trimmed
    })
    
    if (!found) {
      console.error(`❌ CRITICAL: Required slug NOT found: ${trimmed}`)
      console.error(`   Encoded: ${problematicEncoded}`)
      // This should never happen due to the check above, but add it anyway
      uniqueParams.push({ slug: trimmed })
    } else {
      console.log(`✓ Verified: ${trimmed}`)
      // Also log the encoded version for debugging
      console.log(`  → Encoded: ${problematicEncoded}`)
    }
  }
  
  if (uniqueParams.length > 0 && uniqueParams.length <= 20) {
    console.log(`\n📝 All slugs: ${uniqueParams.map(p => p.slug).join(', ')}`)
  } else if (uniqueParams.length > 20) {
    console.log(`\n📝 First 20: ${uniqueParams.map(p => p.slug).slice(0, 20).join(', ')}...`)
  }
  
  // NEVER return empty array
  if (uniqueParams.length === 0) {
    console.error('⚠️  WARNING: No params, returning problematic slugs only')
    return problematicDecodedSlugs.map(slug => ({ slug: slug.trim() }))
  }
  
  return uniqueParams
}

export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  // Next.js automatically decodes URL params, so params.slug is already decoded
  // Just pass it directly to the client component
  // The client component will handle any edge cases
  const slug = params?.slug || ''
  
  if (!slug) {
    // This shouldn't happen with dynamicParams = false, but handle it gracefully
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

