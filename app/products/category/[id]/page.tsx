import { getWcaCategories } from '@/lib/api/wca'
import { CategoryPageClient } from './CategoryPageClient'

// Static params generation for build-time
export async function generateStaticParams() {
  try {
    const allCategories: Array<{ id: number }> = []
    const categoryIds = new Set<number>()
    
    // First, fetch all root categories (parent = 0)
    let page = 1
    const perPage = 100
    let hasMore = true
    let consecutiveEmptyPages = 0

    // Fetch all root categories
    while (hasMore && consecutiveEmptyPages < 3) {
      try {
        const result = await getWcaCategories({ 
          per_page: perPage, 
          page: page, 
          hide_empty: false,
          parent: 0,
          cache: 'force-cache'
        })
        
        const categories = result.categories || []
        
        if (categories.length === 0) {
          consecutiveEmptyPages++
        } else {
          consecutiveEmptyPages = 0
          for (const cat of categories) {
            if (cat.id && !categoryIds.has(cat.id)) {
              categoryIds.add(cat.id)
              allCategories.push({ id: cat.id })
            }
          }
        }
        
        const total = typeof result.total === 'number' ? result.total : parseInt(String(result.total), 10) || 0
        const fetched = page * perPage
        hasMore = categories.length === perPage && (total === 0 || fetched < total)
        page++
        
        if (page > 100) break
      } catch (error) {
        console.error(`Error fetching root categories page ${page}:`, error)
        consecutiveEmptyPages++
        if (consecutiveEmptyPages >= 3) break
      }
    }

    // Now fetch all subcategories for each root category
    const rootCategoryIds = Array.from(categoryIds)
    for (const rootId of rootCategoryIds) {
      page = 1
      hasMore = true
      consecutiveEmptyPages = 0

      while (hasMore && consecutiveEmptyPages < 3) {
        try {
          const result = await getWcaCategories({ 
            per_page: perPage, 
            page: page, 
            hide_empty: false,
            parent: rootId,
            cache: 'force-cache'
          })
          
          const categories = result.categories || []
          
          if (categories.length === 0) {
            consecutiveEmptyPages++
          } else {
            consecutiveEmptyPages = 0
            for (const cat of categories) {
              if (cat.id && !categoryIds.has(cat.id)) {
                categoryIds.add(cat.id)
                allCategories.push({ id: cat.id })
              }
            }
          }
          
          const total = typeof result.total === 'number' ? result.total : parseInt(String(result.total), 10) || 0
          const fetched = page * perPage
          hasMore = categories.length === perPage && (total === 0 || fetched < total)
          page++
          
          if (page > 50) break
        } catch (error) {
          console.error(`Error fetching subcategories for category ${rootId}, page ${page}:`, error)
          consecutiveEmptyPages++
          if (consecutiveEmptyPages >= 3) break
        }
      }
    }

    // Also fetch all categories without parent filter as a fallback
    page = 1
    hasMore = true
    consecutiveEmptyPages = 0

    while (hasMore && consecutiveEmptyPages < 3) {
      try {
        const result = await getWcaCategories({ 
          per_page: perPage, 
          page: page, 
          hide_empty: false,
          cache: 'force-cache'
        })
        
        const categories = result.categories || []
        
        if (categories.length === 0) {
          consecutiveEmptyPages++
        } else {
          consecutiveEmptyPages = 0
          for (const cat of categories) {
            if (cat.id && !categoryIds.has(cat.id)) {
              categoryIds.add(cat.id)
              allCategories.push({ id: cat.id })
            }
          }
        }
        
        const total = typeof result.total === 'number' ? result.total : parseInt(String(result.total), 10) || 0
        const fetched = page * perPage
        hasMore = categories.length === perPage && (total === 0 || fetched < total)
        page++
        
        if (page > 100) break
      } catch (error) {
        console.error(`Error fetching all categories page ${page}:`, error)
        consecutiveEmptyPages++
        if (consecutiveEmptyPages >= 3) break
      }
    }
    
    const params = allCategories.map((category) => ({
      id: String(category.id),
    }))
    
    console.log(`Generated ${params.length} static params for categories`)
    if (params.length > 0 && params.length <= 50) {
      console.log('Category IDs:', params.map(p => p.id).join(', '))
    } else if (params.length > 50) {
      console.log('Category IDs (first 50):', params.map(p => p.id).slice(0, 50).join(', '), '...')
    }
    
    return params
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
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
