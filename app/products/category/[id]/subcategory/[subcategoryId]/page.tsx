import type { Metadata } from 'next'
import { getWcaCategories } from '@/lib/api/wca'
import { SubcategoryPageClient } from './SubcategoryPageClient'

// Static params generation for build-time
export async function generateStaticParams() {
  try {
    const categoryIds = new Set<number>()
    const subcategoryParams: Array<{ id: string; subcategoryId: string }> = []
    const perPage = 100

    console.log('🚀 Starting to fetch all categories and subcategories for static generation...')
    
    // Helper function to fetch all pages
    async function fetchAllCategoriesPages(
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
          
          const total = typeof result.total === 'number' ? result.total : parseInt(String(result.total), 10) || 0
          const fetched = page * (params.per_page || 100)
          
          if (total > 0) {
            hasMore = fetched < total
          } else {
            hasMore = categories.length === (params.per_page || 100)
          }
          
          page++
        } catch (error) {
          console.error(`Error fetching categories page ${page}:`, error)
          consecutiveEmptyPages++
          if (consecutiveEmptyPages >= 5) break
        }
      }
      
      return totalFetched
    }

    // Fetch all categories
    console.log('📋 Fetching all categories...')
    await fetchAllCategoriesPages({ per_page: perPage, hide_empty: false }, 300)
    console.log(`  ✅ Found ${categoryIds.size} categories`)

    // For each category, fetch its subcategories
    console.log('📋 Fetching subcategories for each category...')
    const allCategoryIds = Array.from(categoryIds)
    
    for (const categoryId of allCategoryIds) {
      try {
        const result = await getWcaCategories({
          per_page: perPage,
          page: 1,
          hide_empty: false,
          parent: categoryId,
          cache: 'force-cache'
        })
        
        const subcategories = result.categories || []
        
        for (const subcat of subcategories) {
          if (subcat.id) {
            subcategoryParams.push({
              id: String(categoryId),
              subcategoryId: String(subcat.id),
            })
          }
        }
      } catch (error) {
        console.error(`Error fetching subcategories for category ${categoryId}:`, error)
      }
    }

    console.log(`✅ Generated ${subcategoryParams.length} static params for subcategories`)
    return subcategoryParams
  } catch (error) {
    console.error('❌ Error generating static params for subcategories:', error)
    return []
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string; subcategoryId: string } 
}): Promise<Metadata> {
  const categoryId = parseInt(params.id, 10)
  const subcategoryId = parseInt(params.subcategoryId, 10)
  
  if (!categoryId || isNaN(categoryId) || !subcategoryId || isNaN(subcategoryId)) {
    return {
      title: 'دسته‌بندی یافت نشد',
    }
  }

  try {
    // Fetch subcategory to get its name
    let subcategoryName = 'لیست محصولات'
    let page = 1
    let found = false
    
    while (page <= 20 && !found) {
      const result = await getWcaCategories({ per_page: 100, page, hide_empty: false, cache: 'force-cache' })
      const subcategory = result.categories?.find(c => c.id === subcategoryId)
      
      if (subcategory) {
        subcategoryName = subcategory.name
        found = true
      } else if (result.categories?.length === 0) {
        break
      }
      page++
    }

    return {
      title: `لیست محصولات ${subcategoryName}`,
      description: `لیست محصولات دسته‌بندی ${subcategoryName} - روغن موتور، روغن گیربکس و محصولات با کیفیت آلمانی`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'لیست محصولات',
    }
  }
}

export default function SubcategoryPage({ 
  params 
}: { 
  params: { id: string; subcategoryId: string } 
}) {
  const categoryId = parseInt(params.id, 10)
  const subcategoryId = parseInt(params.subcategoryId, 10)

  if (!categoryId || isNaN(categoryId) || !subcategoryId || isNaN(subcategoryId)) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full flex items-center justify-center">
        <div className="text-white">دسته‌بندی یافت نشد</div>
      </div>
    )
  }

  return <SubcategoryPageClient categoryId={categoryId} subcategoryId={subcategoryId} />
}
