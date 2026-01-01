import { getWcaProducts } from '@/lib/api/wca'
import { ProductDetailClient } from '../ProductDetailClient'

// Disable dynamic params - only use pre-generated static params
// This is required for static export
export const dynamicParams = false

// Static params generation for build-time
export async function generateStaticParams() {
  const allSlugs: string[] = []
  const slugSet = new Set<string>()

  let page = 1
  const perPage = 100
  let hasMore = true
  let consecutiveEmptyPages = 0
  let lastTotal = 0
  let apiErrorOccurred = false

  // Fetch all products with pagination
  try {
    while (hasMore && consecutiveEmptyPages < 3) {
      try {
        console.log(`Fetching products page ${page}...`)
        const result = await getWcaProducts({ 
          per_page: perPage, 
          page: page 
        })
        
        const products = result.products || []
        // Ensure total is a number
        const totalNum = typeof result.total === 'number' ? result.total : (typeof result.total === 'string' ? parseInt(result.total, 10) : 0)
        lastTotal = isNaN(totalNum) ? 0 : totalNum
        
        if (products.length === 0) {
          consecutiveEmptyPages++
          console.log(`No products found on page ${page}, consecutive empty pages: ${consecutiveEmptyPages}`)
        } else {
          consecutiveEmptyPages = 0
          // Add all product slugs (use raw slug as-is from API)
          for (const product of products) {
            if (product.slug) {
              const rawSlug = product.slug.trim()
              
              // Add the raw slug (Next.js will handle URL encoding)
              if (!slugSet.has(rawSlug)) {
                slugSet.add(rawSlug)
                allSlugs.push(rawSlug)
              }
            }
          }
          console.log(`Added ${products.length} products from page ${page}, total slugs: ${allSlugs.length}`)
        }
        
        // Check if there are more pages
        const total = totalNum
        const fetched = page * perPage
        hasMore = products.length === perPage && (total === 0 || fetched < total)
        
        page++
        
        // Safety limit to prevent infinite loops
        if (page > 100) {
          console.warn('Reached safety limit for product pagination')
          break
        }
      } catch (error) {
        apiErrorOccurred = true
        console.error(`Error fetching products page ${page}:`, error)
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
  }
  
  // Generate params - Next.js expects decoded slugs, it will handle encoding
  const paramsMap = new Map<string, { slug: string }>()
  
  // Add all slugs to the map (this ensures uniqueness)
  for (const slug of allSlugs) {
    const trimmed = slug.trim()
    if (trimmed) {
      paramsMap.set(trimmed, { slug: trimmed })
    }
  }
  
  const uniqueParams = Array.from(paramsMap.values())
  
  console.log(`\n📊 Product Static Params Summary:`)
  console.log(`   Total params generated: ${uniqueParams.length}`)
  console.log(`   API total (if available): ${lastTotal}`)
  console.log(`   API errors occurred: ${apiErrorOccurred ? 'YES' : 'NO'}`)
  
  if (uniqueParams.length > 0 && uniqueParams.length <= 20) {
    console.log(`\n📝 All slugs: ${uniqueParams.map(p => p.slug).join(', ')}`)
  } else if (uniqueParams.length > 20) {
    console.log(`\n📝 First 20: ${uniqueParams.map(p => p.slug).slice(0, 20).join(', ')}...`)
  }
  
  // NEVER return empty array
  if (uniqueParams.length === 0) {
    console.error('⚠️  WARNING: No params generated')
    return []
  }
  
  return uniqueParams
}

export default function ProductSlugPage({ params }: { params: { slug: string } }) {
  // Next.js automatically decodes URL params, so params.slug is already decoded
  // Just pass it directly to the client component
  const slug = params?.slug || ''
  
  if (!slug) {
    // This shouldn't happen with dynamicParams = false, but handle it gracefully
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400">محصول یافت نشد</p>
        </div>
      </div>
    )
  }
  
  return <ProductDetailClient slug={slug} />
}

