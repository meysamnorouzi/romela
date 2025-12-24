import type { Metadata } from 'next'
import { getWcaCategories } from '@/lib/api/wca'
import { CategoryPageClient } from './CategoryPageClient'

// Helper function to fetch all pages of categories
async function fetchAllCategoriesPages(
  categoryIds: Set<number>,
  params: { per_page?: number; hide_empty?: boolean; parent?: number; cache?: RequestCache },
  maxPages: number = 200
): Promise<number> {
  let page = 1
  let hasMore = true
  let consecutiveEmptyPages = 0
  let totalFetched = 0

  while (hasMore && consecutiveEmptyPages < 5 && page <= maxPages) {
    try {
      const result = await getWcaCategories({ 
        ...params,
        page: page,
        cache: params.cache ?? 'force-cache'
      })
      
      const categories = result.categories || []
      
      if (categories.length === 0) {
        consecutiveEmptyPages++
      } else {
        consecutiveEmptyPages = 0
        let added = 0
        for (const cat of categories) {
          if (cat.id && !categoryIds.has(cat.id)) {
            categoryIds.add(cat.id)
            added++
          }
        }
        totalFetched += added
      }
      
      // Determine if there are more pages to fetch
      const total = typeof result.total === 'number' ? result.total : parseInt(String(result.total), 10) || 0
      const fetched = page * (params.per_page || 100)
      
      // If we got a full page, there might be more
      // If total is 0 (unknown), keep going until we get empty pages
      if (total > 0) {
        hasMore = fetched < total
      } else {
        hasMore = categories.length === (params.per_page || 100)
      }
      
      page++
      
      // Log progress every 20 pages
      if (page % 20 === 0) {
        console.log(`  Fetched ${page - 1} pages, found ${totalFetched} new categories (total: ${categoryIds.size})...`)
      }
    } catch (error) {
      console.error(`Error fetching categories page ${page}:`, error)
      consecutiveEmptyPages++
      if (consecutiveEmptyPages >= 5) {
        console.warn(`  Stopping after ${consecutiveEmptyPages} consecutive empty/error pages`)
        break
      }
    }
  }
  
  return totalFetched
}

// Static params generation for build-time
export async function generateStaticParams() {
  try {
    const categoryIds = new Set<number>()
    const perPage = 100

    console.log('🚀 Starting to fetch all categories for static generation...')
    
    // Strategy 1: Fetch ALL categories without any filter (most comprehensive)
    console.log('📋 Strategy 1: Fetching all categories (hide_empty=false)...')
    await fetchAllCategoriesPages(categoryIds, { per_page: perPage, hide_empty: false }, 300)
    console.log(`  ✅ Found ${categoryIds.size} categories so far`)

    // Strategy 2: Also fetch with hide_empty=true to catch any edge cases
    console.log('📋 Strategy 2: Fetching all categories (hide_empty=true)...')
    await fetchAllCategoriesPages(categoryIds, { per_page: perPage, hide_empty: true }, 300)
    console.log(`  ✅ Found ${categoryIds.size} categories so far`)

    // Strategy 3: Fetch root categories (parent=0) and their children recursively
    console.log('📋 Strategy 3: Fetching root categories and recursively fetching children...')
    const rootCategories = Array.from(categoryIds)
    let checkedParents = new Set<number>()
    let recursionDepth = 0
    const maxRecursionDepth = 15

    while (recursionDepth < maxRecursionDepth) {
      const toCheck = rootCategories.filter(id => !checkedParents.has(id))
      if (toCheck.length === 0) break
      
      recursionDepth++
      console.log(`  Recursion level ${recursionDepth}: Checking ${toCheck.length} categories...`)
      
      for (const parentId of toCheck) {
        if (checkedParents.has(parentId)) continue
        checkedParents.add(parentId)
        
        await fetchAllCategoriesPages(
          categoryIds,
          { per_page: perPage, hide_empty: false, parent: parentId },
          100
        )
      }
      
      // Refresh rootCategories with newly found categories
      rootCategories.push(...Array.from(categoryIds).filter(id => !checkedParents.has(id)))
    }

    // Strategy 4: Try fetching categories by known problematic IDs
    const knownCategoryIds = [35, 43] // Add any known missing category IDs here
    console.log('📋 Strategy 4: Verifying known category IDs...')
    for (const knownId of knownCategoryIds) {
      if (!categoryIds.has(knownId)) {
        console.log(`  ⚠️ Known category ${knownId} not found, attempting to fetch by searching all pages...`)
        // Try to find it by searching through pages
        let found = false
        let searchPage = 1
        while (!found && searchPage <= 50) {
          try {
            const result = await getWcaCategories({ 
              per_page: perPage, 
              page: searchPage, 
              hide_empty: false,
              cache: 'force-cache'
            })
            const category = result.categories?.find(c => c.id === knownId)
            if (category) {
              categoryIds.add(knownId)
              found = true
              console.log(`  ✅ Found category ${knownId} on page ${searchPage}`)
            }
            if (result.categories?.length === 0) break
            searchPage++
          } catch (error) {
            console.error(`  Error searching for category ${knownId}:`, error)
            break
          }
        }
        if (!found) {
          // If still not found, add it anyway to prevent build errors
          console.warn(`  ⚠️ Category ${knownId} not found in API, adding to params anyway`)
          categoryIds.add(knownId)
        }
      }
    }
    
    const params = Array.from(categoryIds)
      .sort((a, b) => a - b) // Sort for easier debugging
      .map((id) => ({
        id: String(id),
      }))
    
    console.log(`\n✅ Generated ${params.length} static params for categories`)
    
    // Log category IDs for debugging
    if (params.length <= 100) {
      console.log('Category IDs:', params.map(p => p.id).join(', '))
    } else {
      console.log('Category IDs (first 50):', params.map(p => p.id).slice(0, 50).join(', '), '...')
      console.log('Category IDs (last 50):', '...', params.map(p => p.id).slice(-50).join(', '))
    }
    
    // Verify specific categories
    const categoriesToVerify = [35, 43]
    for (const catId of categoriesToVerify) {
      if (categoryIds.has(catId)) {
        console.log(`✅ Category ${catId} is included in static params`)
      } else {
        console.warn(`⚠️ Category ${catId} is NOT included in static params`)
      }
    }
    
    return params
  } catch (error) {
    console.error('❌ Error generating static params for categories:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const categoryId = parseInt(params.id, 10)
  
  if (!categoryId || isNaN(categoryId)) {
    return {
      title: 'دسته‌بندی یافت نشد',
    }
  }

  try {
    // Fetch category to get its name
    let categoryName = 'لیست محصولات'
    let page = 1
    let found = false
    
    while (page <= 10 && !found) {
      const result = await getWcaCategories({ per_page: 100, page, hide_empty: false, cache: 'force-cache' })
      const category = result.categories?.find(c => c.id === categoryId)
      
      if (category) {
        categoryName = category.name
        found = true
      } else if (result.categories?.length === 0) {
        break
      }
      page++
    }

    return {
      title: `لیست محصولات ${categoryName}`,
      description: `لیست محصولات دسته‌بندی ${categoryName} - روغن موتور، روغن گیربکس و محصولات با کیفیت آلمانی`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'لیست محصولات',
    }
  }
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id, 10)

  if (!categoryId || isNaN(categoryId)) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full flex items-center justify-center">
        <div className="text-white">دسته‌بندی یافت نشد</div>
      </div>
    )
  }

  return <CategoryPageClient categoryId={categoryId} />
}
