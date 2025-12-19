'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { WcaProduct, WcaCategory, WcaAttribute, WcaAttributeTerm } from '@/lib/api/types'
import { getWcaPrimaryImageUrl, getWcaCategories, getWcaAttributes, getWcaAttributeTerms, getWcaProducts } from '@/lib/api/wca'
import { LoadingSpinner } from '@/components/ui/Loading'
import { stripHtml } from '@/lib/utils/text'
import { extractStandard, extractVariantsFromFirstHtmlTable } from '@/lib/utils/wca'

const svgPaths = {
  chevronLeft: 'M15 19l-7-7 7-7',
}

function CategoryChip({
  category,
  selected,
  href,
}: {
  category: WcaCategory
  selected?: boolean
  href: string
}) {
  const icon = category.image || '/images/image 8.svg'
  return (
    <Link
      href={href}
      className={
        'h-[52px] rounded-[999px] px-5 flex items-center gap-3 shrink-0 border border-white/10 ' +
        (selected
          ? 'bg-[#D7B354] text-black'
          : 'bg-gradient-to-b from-[#3A3A3A] to-[#242424] text-white')
      }
      style={{ boxShadow: selected ? '0 18px 40px rgba(0,0,0,0.35)' : undefined }}
    >
      <span className="text-[13px] leading-none whitespace-nowrap">{category.name}</span>
      <div className="relative w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center overflow-hidden">
        {icon && <Image src={icon} alt={category.name} width={30} height={30} className="object-contain" />}
      </div>
    </Link>
  )
}

function ProductCardLoading() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full pt-20">
        <div className="relative w-full h-[230px] rounded-[22px] bg-[#343434] shadow-[0_30px_70px_rgba(0,0,0,0.45)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>

      <div className="mt-4 w-[92%]">
        <div className="h-[34px] rounded-[999px] bg-[#2E2E2E]" />
        <div className="mt-2 flex gap-2">
          <div className="h-[30px] rounded-[999px] bg-[#2E2E2E] flex-1" />
          <div className="h-[30px] rounded-[999px] bg-[#2E2E2E] w-[92px]" />
        </div>
      </div>
    </div>
  )
}

function ProductTile({ product }: { product: WcaProduct }) {
  const image = getWcaPrimaryImageUrl(product) || ''

  const textForStandard = stripHtml(product.description || product.short_description || product.name || '')
  const standard = extractStandard(textForStandard)

  const variants = extractVariantsFromFirstHtmlTable(product.description || '')
  const volume = variants[0]?.volume || ''

  const standardText = standard ? `دارای استاندارد ${standard}` : 'دارای استاندارد'
  const volumeText = volume || '—'

  return (
    <Link href={`/products?slug=${encodeURIComponent(product.slug)}`} className="block">
      <div className="flex flex-col items-center">
        <div className="relative w-full pt-20">
          <div className="relative w-full h-[230px] rounded-[22px] bg-[#343434] shadow-[0_30px_70px_rgba(0,0,0,0.45)]" />

          <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-[185px] h-[270px]">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 w-[92%]">
          <div
            className="h-[34px] rounded-[999px] bg-[#D7B354] text-black flex items-center justify-center px-4 text-[11px] leading-none text-center"
            style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.35)' }}
          >
            <span className="line-clamp-1">{product.name}</span>
          </div>

          <div className="mt-2 flex gap-2">
            <div
              className="h-[30px] rounded-[999px] bg-[#EDEDED] text-black flex items-center justify-center px-3 text-[11px] leading-none flex-1"
              style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.25)' }}
              title={standardText}
            >
              <span className="line-clamp-1">{standardText}</span>
            </div>
            <div
              className="h-[30px] rounded-[999px] bg-[#EDEDED] text-black flex items-center justify-center px-3 text-[11px] leading-none w-[92px]"
              style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.25)' }}
              title={volumeText}
            >
              <span className="line-clamp-1">{volumeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FiltersPanel({
  subcategories,
  attributes,
  attributeTermsMap,
  selectedSubcategoryId,
  selectedAttributeTerms,
  onSubcategoryChange,
  onAttributeTermToggle,
}: {
  subcategories: WcaCategory[]
  attributes: WcaAttribute[]
  attributeTermsMap: Record<number, WcaAttributeTerm[]>
  selectedSubcategoryId: number | null
  selectedAttributeTerms: number[]
  onSubcategoryChange: (subcategoryId: number | null) => void
  onAttributeTermToggle: (termId: number) => void
}) {
  const pillBase = 'h-[36px] rounded-[999px] px-4 flex items-center justify-center text-[12px]'
  const pillOff = 'bg-[#2D2D2D] text-[#D2D2D2]'
  const pillOn = 'bg-[#D7B354] text-black'

  return (
    <aside className="bg-[#343434] rounded-[22px] p-6 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
      <h3 className="text-white text-right text-[14px] mb-6">فیلترها</h3>

      <div className="space-y-8">
        {subcategories.length > 0 && (
          <div>
            <div className="text-[#D2D2D2] text-right text-[12px] mb-3">زیر دسته‌بندی‌ها</div>
            <div className="flex flex-col gap-3">
              {subcategories.map((cat) => {
                const isSelected = selectedSubcategoryId === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${pillBase} ${isSelected ? pillOn : pillOff}`}
                    onClick={() => onSubcategoryChange(isSelected ? null : cat.id)}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {attributes.map((attr) => {
          const terms = attributeTermsMap[attr.id] || []
          if (terms.length === 0) return null

          return (
            <div key={attr.id}>
              <div className="text-[#D2D2D2] text-right text-[12px] mb-3">{attr.label || attr.name}</div>
              <div className="flex flex-col gap-3">
                {terms.map((term) => {
                  const isSelected = selectedAttributeTerms.includes(term.id)
                  return (
                    <button
                      key={term.id}
                      type="button"
                      className={`${pillBase} ${isSelected ? pillOn : pillOff}`}
                      onClick={() => onAttributeTermToggle(term.id)}
                    >
                      {term.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function matchesFilters(
  product: WcaProduct,
  categoryId: number,
  subcategoryId: number | null,
  attributeTermIds: number[]
) {
  // Filter by category/subcategory
  if (subcategoryId !== null) {
    const hasSubcategory = product.categories?.some((c) => c.id === subcategoryId)
    if (!hasSubcategory) return false
  } else {
    const hasCategory = product.categories?.some((c) => c.id === categoryId)
    if (!hasCategory) return false
  }

  // Filter by attribute terms
  if (attributeTermIds.length > 0) {
    // For now, we'll do a simple text-based match
    // This should be improved based on actual API structure
    return true // For now, allow all if we can't properly match
  }

  return true
}

export function CategoryPageClient({ categoryId }: { categoryId: number }) {
  const router = useRouter()

  const [products, setProducts] = useState<WcaProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [category, setCategory] = useState<WcaCategory | null>(null)
  const [subcategories, setSubcategories] = useState<WcaCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [attributes, setAttributes] = useState<WcaAttribute[]>([])
  const [attributeTermsMap, setAttributeTermsMap] = useState<Record<number, WcaAttributeTerm[]>>({})
  const [loadingAttributes, setLoadingAttributes] = useState(true)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null)
  const [selectedAttributeTerms, setSelectedAttributeTerms] = useState<number[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<WcaCategory | null>(null)

  const chipRowRef = useRef<HTMLDivElement | null>(null)

  // Load category and subcategories
  useEffect(() => {
    let cancelled = false
    setLoadingCategories(true)

    async function loadCategory() {
      try {
        // Load all categories to find current one
        // First try to get it directly, then fallback to fetching all
        let current: WcaCategory | undefined
        
        try {
          // Try to fetch all categories to find the current one
          const allCats = await getWcaCategories({ per_page: 100, page: 1, hide_empty: false })
          current = allCats.categories?.find(c => c.id === categoryId)
          
          // If not found in first page, try fetching more pages
          if (!current) {
            let page = 2
            while (page <= 10 && !current) {
              const moreCats = await getWcaCategories({ per_page: 100, page: page, hide_empty: false })
              current = moreCats.categories?.find(c => c.id === categoryId)
              if (moreCats.categories?.length === 0) break
              page++
            }
          }
        } catch (error) {
          console.error('Error fetching category details:', error)
        }
        
        if (!cancelled) {
          setCategory(current || null)
        }

        // Load subcategories (only if this is a parent category, i.e., has no parent or parent is 0)
        // If current category has a parent, it's a subcategory, so don't load subcategories
        if (!current || !current.parent || current.parent === 0) {
          const result = await getWcaCategories({ 
            per_page: 100, 
            page: 1, 
            hide_empty: true,
            parent: categoryId
          })
          if (cancelled) return
          setSubcategories(result.categories || [])
        } else {
          // This is a subcategory, so no subcategories to load
          setSubcategories([])
        }
      } catch (error) {
        console.error('Error fetching category:', error)
        if (!cancelled) {
          setCategory(null)
          setSubcategories([])
        }
      } finally {
        if (!cancelled) setLoadingCategories(false)
      }
    }

    loadCategory()

    return () => {
      cancelled = true
    }
  }, [categoryId])

  // Load attributes
  useEffect(() => {
    let cancelled = false
    setLoadingAttributes(true)

    async function loadAttributes() {
      try {
        const attrsResult = await getWcaAttributes()
        if (cancelled) return
        setAttributes(attrsResult.attributes || [])

        // Load terms for each attribute
        const termsMap: Record<number, WcaAttributeTerm[]> = {}
        for (const attr of attrsResult.attributes || []) {
          try {
            const termsResult = await getWcaAttributeTerms(attr.id)
            if (termsResult && !cancelled) {
              termsMap[attr.id] = termsResult.terms || []
            }
          } catch (error) {
            console.error(`Error fetching terms for attribute ${attr.id}:`, error)
          }
        }
        if (!cancelled) {
          setAttributeTermsMap(termsMap)
        }
      } catch (error) {
        console.error('Error fetching attributes:', error)
        if (!cancelled) {
          setAttributes([])
          setAttributeTermsMap({})
        }
      } finally {
        if (!cancelled) setLoadingAttributes(false)
      }
    }

    loadAttributes()

    return () => {
      cancelled = true
    }
  }, [])

  // Load products
  useEffect(() => {
    let cancelled = false
    setLoadingProducts(true)

    async function loadProducts() {
      try {
        const params: Parameters<typeof getWcaProducts>[0] = {
          per_page: 100,
          page: 1,
          category: selectedSubcategoryId || categoryId,
        }

        const result = await getWcaProducts(params)
        if (cancelled) return
        setProducts(result.products ?? [])
      } catch (error) {
        console.error('Error fetching products:', error)
        if (!cancelled) setProducts([])
      } finally {
        if (!cancelled) setLoadingProducts(false)
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [categoryId, selectedSubcategoryId])

  const visibleProducts = useMemo(() => {
    let filtered = products.filter((p) => 
      matchesFilters(p, categoryId, selectedSubcategoryId, selectedAttributeTerms)
    )
    
    const withImage = filtered
      .map((p) => ({ p, image: getWcaPrimaryImageUrl(p) }))
      .filter((x) => Boolean(x.image))
      .map((x) => x.p)

    return withImage
  }, [products, categoryId, selectedSubcategoryId, selectedAttributeTerms])

  const handleSubcategoryChange = (subcategoryId: number | null) => {
    setSelectedSubcategoryId(subcategoryId)
    if (subcategoryId) {
      const subcat = subcategories.find(c => c.id === subcategoryId)
      setSelectedSubcategory(subcat || null)
    } else {
      setSelectedSubcategory(null)
    }
  }

  const handleAttributeTermToggle = (termId: number) => {
    setSelectedAttributeTerms((prev) => 
      prev.includes(termId) 
        ? prev.filter((id) => id !== termId)
        : [...prev, termId]
    )
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0)_55%)]" />
      <div className="relative max-w-[1240px] mx-auto px-6 pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="flex justify-end mb-6">
          <div className="text-[12px] text-[#9A9A9A]">
            <Link href="/" className="hover:text-[#D7B354]">صفحه اصلی</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-[#D7B354]">محصولات</Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <span className="text-[#D7B354]">{category.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-white text-[16px] font-bold tracking-wide mb-8">
          {selectedSubcategory 
            ? `لیست محصولات ${selectedSubcategory.name}`
            : category 
              ? `لیست محصولات ${category.name}` 
              : 'لیست محصولات'}
        </h1>

        {/* Subcategory chips row */}
        {subcategories.length > 0 && (
          <>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-[#2D2D2D] border border-white/10 flex items-center justify-center text-[#D7B354]"
                style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.35)' }}
                onClick={() => {
                  chipRowRef.current?.scrollBy({ left: -240, behavior: 'smooth' })
                }}
                aria-label="scroll"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={svgPaths.chevronLeft} />
                </svg>
              </button>

              <div
                ref={chipRowRef}
                className="flex-1 flex gap-4 overflow-x-auto no-scrollbar py-1"
                style={{ scrollBehavior: 'smooth' }}
              >
                {loadingCategories ? (
                  <div className="text-[#9A9A9A] text-[13px]">در حال بارگذاری...</div>
                ) : (
                  subcategories.map((c) => (
                    <CategoryChip
                      key={c.id}
                      category={c}
                      selected={false}
                      href={`/products/category/${c.id}`}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-white/10" />
          </>
        )}

        {/* Content */}
        <div dir="ltr" className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Products grid */}
          <div dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {loadingProducts
                ? Array.from({ length: 9 }).map((_, i) => <ProductCardLoading key={`pl-${i}`} />)
                : visibleProducts.map((p) => <ProductTile key={p.id} product={p} />)}
            </div>

            {!loadingProducts && visibleProducts.length === 0 && (
              <div className="mt-12 text-center text-[#9A9A9A]">محصولی برای نمایش وجود ندارد</div>
            )}
          </div>

          {/* Filters */}
          <div dir="rtl">
            <FiltersPanel
              subcategories={subcategories}
              attributes={attributes}
              attributeTermsMap={attributeTermsMap}
              selectedSubcategoryId={selectedSubcategoryId}
              selectedAttributeTerms={selectedAttributeTerms}
              onSubcategoryChange={handleSubcategoryChange}
              onAttributeTermToggle={handleAttributeTermToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

