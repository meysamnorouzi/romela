'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import Link from "next/link";
import svgPaths from './imports/svg-efqwtho29q'
import {
  imgMockupAtfXlBackgroundRemoved,
  imgImage1,
  imgImage2,
  imgImage9,
} from './imports/image-placeholders'

import { getWcaPrimaryImageUrl, getWcaCategories } from '@/lib/api/wca'
import type { WcaProduct, WcaProductsListResponse, WcaRelatedProductsResponse, WcaCategory } from '@/lib/api/types'
import { stripHtml } from '@/lib/utils/text'
import { extractBrands, extractStandard, extractVariantsFromFirstHtmlTable, extractViscosity, getVolumeFromAttributes, getStandardFromAttributes, extractDatasheetTable } from '@/lib/utils/wca'

// Divider Component (kept identical)
function Divider() {
  return (
    <div className="w-full h-px" style={{ marginTop: 'clamp(2rem, 3.13vw, 4rem)', marginBottom: 'clamp(2rem, 3.13vw, 4rem)' }}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 1824 1" preserveAspectRatio="none">
        <line x1="0.5" y1="0.5" x2="1823.5" y2="0.5" stroke="url(#gradient)" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1824" y1="1.5" y2="1.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Related Product Card Component
function RelatedProductCard({ 
  product, 
  imageUrl, 
  fallbackImage 
}: { 
  product: WcaProduct | undefined
  imageUrl: string
  fallbackImage: string
}) {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (nameRef.current && product?.name) {
        const isOverflowing = nameRef.current.scrollWidth > nameRef.current.clientWidth
        setShowTooltip(isOverflowing)
      }
    }

    // Check immediately
    checkOverflow()

    // Check after a short delay to ensure layout is complete
    const timeoutId = setTimeout(checkOverflow, 100)

    // Check on window resize
    window.addEventListener('resize', checkOverflow)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [product?.name])

  return (
    <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl text-center flex items-center justify-center " style={{ padding: 'clamp(1rem, 1.25vw, 1rem)' }}>
      <div className="relative w-full">
        <div className="relative group w-full">
          <h3 
            ref={nameRef}
            className="text-[#f9bd65] cursor-pointer font-iranyekan" 
            dir="auto" 
            style={{ 
              fontSize: 'clamp(0.875rem, 1.04vw, 1rem)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%'
            }}
          >
            {product?.name || ' '}
          </h3>
          {showTooltip && product?.name && (
            <div className="absolute font-iranyekan min-w-52 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#2a2a2a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-white/20 shadow-lg">
              {product.name}
            </div>
          )}
        </div>
        <div className="relative w-full h-full">
          <img
            alt=""
            className="w-full h-full object-contain pointer-events-none"
            src={imageUrl || fallbackImage}
          />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter()

  const [product, setProduct] = useState<WcaProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<WcaProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [parentCategory, setParentCategory] = useState<WcaCategory | null>(null)
  const [subcategory, setSubcategory] = useState<WcaCategory | null>(null)

  const WP_JSON_BASE_URL = (
    process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    'https://admin.padradarasoil.com/wp-json'
  ).replace(/\/+$/, '')

  function buildApiUrl(path: string, query?: Record<string, string | number | boolean | undefined>) {
    const url = new URL(`${WP_JSON_BASE_URL}/${path.replace(/^\/+/, '')}`)
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v === undefined) continue
        url.searchParams.set(k, String(v))
      }
    }
    return url.toString()
  }

  async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return res.json() as Promise<T>
  }

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function load() {
      try {
        // API supports slug filtering in list endpoint
        const list = await fetchJson<WcaProductsListResponse>(
          buildApiUrl('wca/v1/products', { per_page: 1, page: 1, slug })
        )
        const match = list.products?.[0]
        if (!match?.id) throw new Error('Product not found')

        const full = await fetchJson<WcaProduct>(buildApiUrl(`wca/v1/products/${match.id}`, { include_variations: true }))
        if (cancelled) return
        setProduct(full)

        // Load category hierarchy
        if (full.categories && full.categories.length > 0) {
          try {
            // Fetch all categories to get parent information
            const allCategoriesResult = await getWcaCategories({ per_page: 100, page: 1, hide_empty: false })
            const allCategories = allCategoriesResult.categories || []
            
            // Find categories from product in the full categories list to get parent info
            // Filter out the "دسته-بندی-نشده" (uncategorized) category
            const isUncategorized = (cat: { id?: number; name?: string; slug?: string }) => {
              if (cat.id === 17) return true
              if (cat.name === 'دسته-بندی-نشده') return true
              if (cat.slug) {
                try {
                  const decoded = decodeURIComponent(cat.slug)
                  if (decoded === 'دسته-بندی-نشده') return true
                } catch {
                  // If decoding fails, slug might already be decoded
                }
                if (cat.slug === 'دسته-بندی-نشده') return true
              }
              return false
            }
            const productCategories = full.categories
              .filter(pc => !isUncategorized(pc))
              .map(pc => {
                return allCategories.find(ac => ac.id === pc.id) || pc
              })
              .filter(cat => !isUncategorized(cat))
            
            // Determine parent and subcategory
            // A category is a subcategory if it has a parent that matches another category's id
            let foundParent: WcaCategory | null = null
            let foundSubcategory: WcaCategory | null = null
            
            for (const cat of productCategories) {
              if (cat.parent && cat.parent !== 0) {
                // This is a subcategory, find its parent
                const parent = productCategories.find(c => c.id === cat.parent)
                if (parent) {
                  foundParent = parent
                  foundSubcategory = cat
                  break
                } else {
                  // Parent not in product categories, fetch it
                  const parentFromAll = allCategories.find(c => c.id === cat.parent)
                  if (parentFromAll) {
                    foundParent = parentFromAll
                    foundSubcategory = cat
                    break
                  }
                }
              }
            }
            
            // If no subcategory found, check if we have multiple categories and one is parent of another
            if (!foundSubcategory && productCategories.length >= 2) {
              for (const cat1 of productCategories) {
                for (const cat2 of productCategories) {
                  if (cat2.parent === cat1.id) {
                    foundParent = cat1
                    foundSubcategory = cat2
                    break
                  }
                }
                if (foundSubcategory) break
              }
            }
            
            // If still no hierarchy found, use first category as parent
            if (!foundParent && !foundSubcategory && productCategories.length > 0) {
              // Check if first category has a parent
              const firstCat = productCategories[0]
              if (firstCat.parent && firstCat.parent !== 0) {
                // First category is a subcategory, find its parent
                const parentFromAll = allCategories.find(c => c.id === firstCat.parent)
                if (parentFromAll) {
                  foundParent = parentFromAll
                  foundSubcategory = firstCat
                }
              } else {
                // First category is a parent, check if second is its child
                if (productCategories.length > 1) {
                  const secondCat = productCategories[1]
                  if (secondCat.parent === firstCat.id) {
                    foundParent = firstCat
                    foundSubcategory = secondCat
                  }
                }
              }
            }
            
            if (!cancelled) {
              setParentCategory(foundParent)
              setSubcategory(foundSubcategory)
            }
          } catch (error) {
            console.error('Error loading category hierarchy:', error)
            if (!cancelled) {
              setParentCategory(null)
              setSubcategory(null)
            }
          }
        }

        try {
          const rel = await fetchJson<WcaRelatedProductsResponse>(
            buildApiUrl(`wca/v1/products/${match.id}/related`, { limit: 3 })
          )
          if (cancelled) return
          setRelatedProducts(rel.related_products ?? [])
        } catch {
          if (!cancelled) setRelatedProducts([])
        }
      } catch {
        if (cancelled) return
        setProduct(null)
        router.replace('/products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [slug, router])

  const computed = useMemo(() => {
    if (!product) return null

    const primaryImage = getWcaPrimaryImageUrl(product) || imgMockupAtfXlBackgroundRemoved.src
    
    // Determine category name and ID - prefer parent category if available
    // Filter out "دسته-بندی-نشده" from product categories
    const isUncategorized = (cat: { id?: number; name?: string; slug?: string }) => {
      if (cat.id === 17) return true
      if (cat.name === 'دسته-بندی-نشده') return true
      if (cat.slug) {
        try {
          const decoded = decodeURIComponent(cat.slug)
          if (decoded === 'دسته-بندی-نشده') return true
        } catch {
          // If decoding fails, slug might already be decoded
        }
        if (cat.slug === 'دسته-بندی-نشده') return true
      }
      return false
    }
    const validProductCategories = (product.categories ?? []).filter(c => !isUncategorized(c))
    const categoryName = parentCategory?.name || validProductCategories[0]?.name || 'محصولات'
    const categoryId = parentCategory?.id || validProductCategories[0]?.id || 1
    
    // Subcategory info
    const subcategoryName = subcategory?.name || null
    const subcategoryId = subcategory?.id || null
    
    const descriptionText = stripHtml(product.short_description || product.description || '').slice(0, 160)

    const fullText = stripHtml(product.description || '')

    const allImages = Array.from(
      new Set(
        [
          getWcaPrimaryImageUrl(product),
          ...(product.images ?? [])
            .map((img: any) => img?.sizes?.large || img?.sizes?.full || img?.url)
            .filter(Boolean),
        ].filter(Boolean) as string[]
      )
    )

    const introImageTop = allImages[1] || primaryImage
    const introImageBottom = allImages[0] || primaryImage

    const introText = stripHtml(product.description || '').slice(0, 520) || ' '
    const datasheetText = (product.product_datasheet?.initial_description ? stripHtml(product.product_datasheet.initial_description) : stripHtml(product.description || '').slice(520, 1100)) || ' '
    const galleryText = (product.additional_description ? stripHtml(product.additional_description) : stripHtml(product.description || '').slice(1100, 1650)) || ' '
    const similarText = (product.similar_products_description ? stripHtml(product.similar_products_description) : stripHtml(product.description || '').slice(1650, 2050)) || ' '

    const variants = extractVariantsFromFirstHtmlTable(product.description || '')
    // Get volume and standard from product attributes (preferred) or fallback to text extraction
    const badgeVolume = getVolumeFromAttributes(product) || variants[0]?.volume || ''
    const badgeStandard = getStandardFromAttributes(product) || extractStandard(fullText) || categoryName

    const viscosity = extractViscosity(product.name) || extractViscosity(fullText) || ''
    const standard = extractStandard(fullText) || ''
    const brands = extractBrands(fullText)

    const priceRial = Number(product.price || 0)
    const isRial = (product.price_html || '').includes('ریال')
    const priceToman =
      Number.isFinite(priceRial) && priceRial > 0 ? Math.round(isRial ? priceRial / 10 : priceRial) : 0
    const priceText = priceToman > 0 ? new Intl.NumberFormat('fa-IR').format(priceToman) : 'تماس بگیرید'

    const stockCount =
      typeof product.stock_quantity === 'number' ? product.stock_quantity : product.in_stock ? 1 : 0
    const stockCountText = new Intl.NumberFormat('fa-IR').format(stockCount)

    // Extract datasheet table from description HTML, or use product_datasheet.table_data if available
    const extractedDatasheetRows = extractDatasheetTable(product.description || '')
    const datasheetTableData = product.product_datasheet?.table_data || []
    const techRows = extractedDatasheetRows.length > 0 
      ? extractedDatasheetRows.map(row => ({ 
          property: row.property || '—', 
          value: row.value || '—', 
          method: row.method || '—' 
        }))
      : datasheetTableData.length > 0
      ? datasheetTableData.map((row: any) => ({
          property: row.property || '—',
          value: row.value || '—',
          method: row.method || '—',
        }))
      : [
          { property: 'SKU', value: product.sku || '—', method: '—' },
          { property: 'Type', value: product.type || '—', method: '—' },
          { property: 'Stock status', value: product.stock_status || '—', method: '—' },
          {
            property: 'Stock quantity',
            value: typeof product.stock_quantity === 'number' ? String(product.stock_quantity) : '—',
            method: '—',
          },
          { property: 'Weight', value: (product as any).weight || '—', method: '—' },
          { property: 'Last modified', value: product.date_modified || '—', method: '—' },
          {
            property: 'Categories',
            value: (product.categories ?? [])
              .filter(c => {
                if (c.id === 17) return false
                if (c.name === 'دسته-بندی-نشده') return false
                if (c.slug) {
                  try {
                    const decoded = decodeURIComponent(c.slug)
                    if (decoded === 'دسته-بندی-نشده') return false
                  } catch {
                    // If decoding fails, slug might already be decoded
                  }
                  if (c.slug === 'دسته-بندی-نشده') return false
                }
                return true
              })
              .map((c) => c.name)
              .filter(Boolean)
              .join(', ') || '—',
            method: '—',
          },
        ]

    // Get datasheet download link
    const datasheetDownloadLink = product.product_datasheet?.download_link || ''

    return {
      primaryImage,
      categoryName,
      categoryId,
      subcategoryName,
      subcategoryId,
      descriptionText,
      introImageTop,
      introImageBottom,
      introText,
      datasheetText,
      galleryText,
      similarText,
      variants,
      badgeStandard,
      badgeVolume,
      viscosity,
      standard,
      brands,
      priceText,
      stockCountText,
      techRows,
      datasheetDownloadLink,
    }
  }, [product, parentCategory, subcategory])

  if (loading && !product) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full xl:px-0 2xl:px-6">
        <div className="w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-32 lg:pt-64" style={{ 
          paddingBottom: 'clamp(2rem, 3.13vw, 4rem)'
        }} />
      </div>
    )
  }

  if (!product || !computed) return null

  const related1 = relatedProducts[0]
  const related2 = relatedProducts[1]
  const related3 = relatedProducts[2]

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full xl:px-0 2xl:px-6 sm:px-6">
      {/* Container */}
      <div className="w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4 pt-32 lg:pt-64" style={{ 
        paddingBottom: 'clamp(1.5rem, 2.34vw, 4rem)'
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'clamp(1rem, 2.6vw, 4rem)' }}>

          <div className="flex items-center text-right justify-start font-bold flex-wrap" style={{ gap: 'clamp(0.25rem, 0.47vw, 0.5rem)' }}>
          <Link href="/" className="hover:text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>صفحه اصلی</Link>
          <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
          <Link href="/products" className="hover:text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>محصولات</Link>
          <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
            <Link href={`/products/category/${computed.categoryId}`} className="text-[#717171]" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>
              {computed.categoryName}
            </Link>
            {computed.subcategoryName && computed.subcategoryId ? (
              <>
                <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
                <Link href={`/products/category/${computed.categoryId}/subcategory/${computed.subcategoryId}`} className="text-[#717171]" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>
                  {computed.subcategoryName}
                </Link>
              </>
            ) : null}
            <span className="text-[#717171]" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}> / </span>
            <span className="text-[#F58F4A] truncate max-w-[150px] sm:max-w-none" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1.125rem)' }}>
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Header Section */}
        <div className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.08vw, 3rem)' }}>
            {/* Product Image */}
            <div className="w-full lg:w-1/2 bg-[#343434] rounded-2xl sm:rounded-3xl flex items-center justify-center" style={{ padding: 'clamp(0.75rem, 1.56vw, 2rem)' }}>
              <div className="relative w-full" style={{ maxWidth: 'clamp(10rem, 15.63vw, 18rem)' }}>
                <img
                  alt=""
                  className="w-full object-contain pointer-events-none"
                  src={computed.primaryImage}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col" style={{ gap: 'clamp(1rem, 1.3vw, 1.5rem)' }}>
              <div className='flex flex-wrap items-center' style={{ gap: 'clamp(0.75rem, 0.94vw, 1rem)' }}>

                {/* Product Title */}
                <h1 className="text-[#FCFBEE] text-right font-bold" dir="auto" style={{ fontSize: 'clamp(1.125rem, 1.56vw, 2rem)' }}>
                  {product.name}
                </h1>
                {/* Badges */}
                <div className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 0.78vw, 1rem)' }}>
                {computed.badgeVolume ? (
                    <div className="bg-[#65cdf9] rounded-[120px]" style={{ 
                      paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                      paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                      paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)'
                    }}>
                      <span className="text-black font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {computed.badgeVolume}
                      </span>
                    </div>
                  ) : null}
                  <div className="bg-[#f9bd65] rounded-[120px]" style={{ 
                    paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                    paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                    paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                    paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)'
                  }}>
                    <span className="text-black font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                      {computed.badgeStandard}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <p
                className="text-[#FCFBEE] text-right font-light leading-relaxed"
                dir="auto"
                style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
              >
                {computed.descriptionText || ' '}
              </p>

              {/* Product Specs */}
              <div
                className="text-[#f58f4a] text-right"
                dir="auto"
                style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
              >
                <ul className="list-disc list-inside flex flex-col font-light" style={{ gap: 'clamp(0.375rem, 0.47vw, 0.5rem)' }}>
                  <li>
                    <span>استاندارد: </span>
                    <span className="font-black">{computed.standard || '—'}</span>
                  </li>
                  <li>
                    <span>ویسکوزیته: </span>
                    <span className="font-black">{computed.viscosity || '—'}</span>
                  </li>
                  <li>
                    برند های قابل استفاده:{' '}
                    <span className="font-black">
                      {computed.brands.length ? computed.brands.join(', ') : '—'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="flex items-center flex-wrap" style={{ gap: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                <span
                  className="text-[#fcfbee] text-right font-light"
                  dir="auto"
                  style={{ fontSize: 'clamp(1.125rem, 1.41vw, 1.5rem)' }}
                >
                  قیمت
                </span>
                <span
                  className="text-[#fcfbee] text-right font-light"
                  dir="auto"
                  style={{ fontSize: 'clamp(1.1rem, 1.88vw, 1.1rem)' }}
                >
                  <span className='font-black'>تماس بگیرید</span>
                </span>
              </div>

              {/* Stock Counter */}
              {/* <div className="flex items-center flex-wrap" style={{ gap: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                <div className="bg-[rgba(255,255,255,0.12)] flex items-center justify-center rounded-[120px]" style={{ 
                  gap: 'clamp(1rem, 1.17vw, 1.5rem)',
                  height: 'clamp(2.75rem, 2.93vw, 3.6875rem)',
                  paddingLeft: 'clamp(0.75rem, 0.94vw, 1rem)',
                  paddingRight: 'clamp(0.75rem, 0.94vw, 1rem)',
                  maxWidth: 'clamp(12rem, 12.5vw, 14.9375rem)'
                }}>
                  <button style={{ width: 'clamp(1.5rem, 1.56vw, 1.5rem)', height: 'clamp(1.5rem, 1.56vw, 1.5rem)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                      <path d="M11 13H5V11H11V5H13V11L19 11V13L13 13L13 19H11L11 13Z" fill="#A7A7A7" />
                    </svg>
                  </button>
                  <div className="bg-[#686868] flex items-center justify-center rounded-[120px]" style={{ 
                    height: 'clamp(2.625rem, 2.81vw, 2.6875rem)',
                    paddingLeft: 'clamp(1rem, 1.25vw, 1rem)',
                    paddingRight: 'clamp(1rem, 1.25vw, 1rem)',
                    minWidth: 'clamp(5.25rem, 5.38vw, 5.375rem)'
                  }}>
                    <span className="font-['SF_Pro:Medium',sans-serif] text-[#d2d2d2]" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>1</span>
                  </div>
                  <button style={{ width: 'clamp(1.5rem, 1.56vw, 1.5rem)', height: 'clamp(1.5rem, 1.56vw, 1.5rem)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                      <path d="M6 13V11L18 11V13L6 13Z" fill="#A7A7A7" />
                    </svg>
                  </button>
                </div>
                <p className="text-[#fcfbee] text-right font-light" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                  <span>تنها </span>
                  <span className="text-[#f58f4a]">{computed.stockCountText} عدد</span>
                  <span> در انبار باقی مانده!</span>
                </p>
              </div> */}

              {/* Action Buttons */}
              {/* <div className="flex flex-col sm:flex-row" style={{ gap: 'clamp(0.5rem, 0.94vw, 1rem)' }}>
                <button className="bg-white flex items-center justify-center py-3 sm:py-4 rounded-[50px] sm:rounded-[70px] flex-1 sm:flex-none" style={{ 
                  paddingLeft: 'clamp(1rem, 1.56vw, 2rem)',
                  paddingRight: 'clamp(1rem, 1.56vw, 2rem)'
                }}>
                  <span className="text-black font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                    افزودن به سبد
                  </span>
                </button>
                <button className="border border-white flex items-center py-3 sm:py-4 justify-center rounded-[50px] sm:rounded-[70px] flex-1 sm:flex-none" style={{ 
                  paddingLeft: 'clamp(1rem, 1.56vw, 2rem)',
                  paddingRight: 'clamp(1rem, 1.56vw, 2rem)'
                }}>
                  <span className="text-white font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.75rem, 0.94vw, 1rem)' }}>
                    ثبت سفارش
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <Divider />

        {/* Introduction Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <h2 className="text-white font-iranyekan font-bold" dir="auto" style={{ 
            marginBottom: 'clamp(1rem, 2.08vw, 3rem)',
            fontSize: 'clamp(1.25rem, 1.88vw, 2.125rem)'
          }}>
            معرفی {product.name}
          </h2>

          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.08vw, 3rem)' }}>

            <div className="w-full lg:w-1/2">
              <p className="text-white text-right font-medium" dir="auto" style={{ 
                lineHeight: 'clamp(1.5rem, 3.91vw, 2.5rem)',
                fontSize: 'clamp(0.875rem, 1.17vw, 1.5rem)'
              }}>
                {computed.introText}
              </p>
              <div className="flex flex-col md:flex-row w-full" style={{ gap: 'clamp(0.5rem, 0.94vw, 1rem)', marginTop: 'clamp(0.75rem, 1.17vw, 1.5rem)' }}>
                <a 
                  href={computed.datasheetDownloadLink || '#'} 
                  target={computed.datasheetDownloadLink ? '_blank' : undefined}
                  rel={computed.datasheetDownloadLink ? 'noopener noreferrer' : undefined}
                  className="bg-[#FDBA74] flex items-center justify-center rounded-[50px] sm:rounded-[70px] py-4 w-fll md:w-fit" 
                  style={{ 
                    gap: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                    paddingLeft: 'clamp(1rem, 1.56vw, 1.5rem)',
                    paddingRight: 'clamp(1rem, 1.56vw, 1.5rem)',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ width: 'clamp(1.5rem, 1.56vw, 1.5rem)', height: 'clamp(1.5rem, 1.56vw, 1.5rem)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                      <path d="M9 12.5H10V10.5H11C11.2833 10.5 11.5208 10.4042 11.7125 10.2125C11.9042 10.0208 12 9.78333 12 9.5V8.5C12 8.21667 11.9042 7.97917 11.7125 7.7875C11.5208 7.59583 11.2833 7.5 11 7.5H9V12.5ZM10 9.5V8.5H11V9.5H10ZM13 12.5H15C15.2833 12.5 15.5208 12.4042 15.7125 12.2125C15.9042 12.0208 16 11.7833 16 11.5V8.5C16 8.21667 15.9042 7.97917 15.7125 7.7875C15.5208 7.59583 15.2833 7.5 15 7.5H13V12.5ZM14 11.5V8.5H15V11.5H14ZM17 12.5H18V10.5H19V9.5H18V8.5H19V7.5H17V12.5ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z" fill="black" />
                    </svg>
                  </div>
                  <span className="text-black font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                    دانلود دیتاشیت
                  </span>
                </a>
                <button className="bg-[#FDBA74] flex items-center justify-center rounded-[70px] py-4 w-fll md:w-fit" style={{ 
                  gap: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                  paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
                  paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)'
                }}>
                  <div style={{ width: 'clamp(1.5rem, 1.56vw, 1.5rem)', height: 'clamp(1.5rem, 1.56vw, 1.5rem)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                      <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="black" />
                    </svg>
                  </div>
                  <span className="text-black font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                    دانلود کاتالوگ
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative bg-[#343434] rounded-2xl sm:rounded-3xl h-auto md:h-full flex items-center justify-center" style={{ 
                padding: 'clamp(1rem, 2.08vw, 3rem)'
              }}>
                <div className="relative w-full flex items-center justify-center" style={{ 
                  height: 'clamp(150px, 11.72vw, 300px)'
                }}>
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    src={computed.introImageTop}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Product Variants Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <h2 className="text-white font-iranyekan font-bold" dir="auto" style={{ 
            marginBottom: 'clamp(1rem, 2.08vw, 3rem)',
            fontSize: 'clamp(1.25rem, 1.88vw, 2.125rem)'
          }}>
            مدل های مختلف  این محصول
          </h2>

          {/* Mobile: Card View */}
          <div className="w-full md:hidden flex flex-col" style={{ gap: 'clamp(1rem, 1.56vw, 1.5rem)' }}>
            {computed.variants.length > 0 ? computed.variants.map((variant, idx) => (
              <div
                key={idx}
                className={clsx(
                  idx === 0 ? 'bg-[#161616]' : 'bg-[#161616]',
                  'border border-[#3b3b3b] rounded-2xl'
                )}
                style={{ padding: 'clamp(1rem, 1.56vw, 1.5rem)' }}
              >
                <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(0.75rem, 1.17vw, 1rem)' }}>
                  {/* Product Image */}
                  <div className="flex justify-center">
                    <div className="relative" style={{ 
                      width: 'clamp(8rem, 10vw, 10rem)',
                      height: 'clamp(12rem, 15vw, 15rem)'
                    }}>
                      <img
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        src={variant.imageUrl || computed.primaryImage}
                      />
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <div>
                    <p className="text-[#f9bd65] font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                      {variant.name || product.name}
                    </p>
                    {idx === 0 ? (
                      <p className="text-[#f9bd65] font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)', marginTop: 'clamp(0.25rem, 0.31vw, 0.25rem)' }}>
                        (انتخاب شده)
                      </p>
                    ) : null}
                  </div>
                  
                  {/* Volume and Price */}
                  <div className="flex flex-col w-full" style={{ gap: 'clamp(0.5rem, 0.78vw, 0.75rem)' }}>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-400 font-iranyekan" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>حجم:</span>
                      <span className="text-[#f9bd65] font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {variant.volume || '—'}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-400 font-iranyekan" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>قیمت:</span>
                      <span className="text-[#f9bd65] font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                        {variant.priceText || 'تماس بگیرید'}
                      </span>
                    </div>
                  </div>

                  {/* View More Link */}
                  <div className="mt-2">
                    <Link 
                      href={`/products/${product.slug}`}
                      className="text-[#f9bd65] font-bold hover:underline" 
                      dir="auto" 
                      style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                    >
                      مشاهده بیشتر
                    </Link>
                  </div>
                </div>
              </div>
            )) : null}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-full">
              <div className="bg-[#242424] rounded-t-2xl sm:rounded-t-3xl" style={{ padding: 'clamp(0.75rem, 1.25vw, 1rem)' }}>
                <div className="grid grid-cols-5 text-right text-xs sm:text-sm" style={{ gap: 'clamp(0.5rem, 1.25vw, 1rem)' }}>

                  <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    نام محصول
                  </div>
                  <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    حجم
                  </div>
                  <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    قیمت
                  </div>
                  <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    تصویر محصول
                  </div>
                  <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    مشاهده بیشتر
                  </div>
                </div>
              </div>

              {computed.variants.length > 0 ? computed.variants.map((variant, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    idx === 0 ? 'bg-[#161616]' : 'bg-[#161616]',
                    'border border-[#3b3b3b]',
                    idx === computed.variants.length - 1 ? 'rounded-b-3xl' : ''
                  )}
                  style={{ padding: 'clamp(1rem, 1.25vw, 1rem)' }}
                >
                  <div className="grid grid-cols-5 items-center text-right" style={{ gap: 'clamp(1rem, 1.25vw, 1rem)' }}>

                    <div className='text-center'>
                      <p className=" text-[#f9bd65] font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                        {variant.name || product.name}
                      </p>
                      {idx === 0 ? (
                        <p className=" text-[#f9bd65]  font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)', marginTop: 'clamp(0.25rem, 0.31vw, 0.25rem)' }}>
                          (انتخاب شده)
                        </p>
                      ) : null}
                    </div>
                    <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                      {variant.volume || '—'}
                    </div>
                    <div className="text-[#f9bd65] text-center font-bold" dir="auto" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                      {variant.priceText || 'تماس بگیرید'}
                    </div>
                    <div className="flex justify-center">
                      <div className="relative" style={{ 
                        width: 'clamp(6rem, 6.19vw, 6.1875rem)',
                        height: 'clamp(10.75rem, 11.15vw, 10.9375rem)'
                      }}>
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                          src={variant.imageUrl || computed.primaryImage}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <Link 
                        href={`/products/${product.slug}`}
                        className="text-[#f9bd65] font-bold hover:underline" 
                        dir="auto" 
                        style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}
                      >
                        مشاهده بیشتر
                      </Link>
                    </div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        </section>

        <Divider />

        {/* Data Sheet Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between" style={{ 
            gap: 'clamp(0.75rem, 0.94vw, 1rem)',
            marginBottom: 'clamp(1rem, 2.08vw, 3rem)'
          }}>
            <h2 className="text-white font-iranyekan font-bold" dir="auto" style={{ 
              fontSize: 'clamp(1.25rem, 1.88vw, 2.125rem)'
            }}>
              دیتاشیت محصول
            </h2>
            <a 
              href={computed.datasheetDownloadLink || '#'} 
              target={computed.datasheetDownloadLink ? '_blank' : undefined}
              rel={computed.datasheetDownloadLink ? 'noopener noreferrer' : undefined}
              className="bg-[#FDBA74] flex items-center rounded-[50px] sm:rounded-[70px]" 
              style={{ 
                gap: 'clamp(0.5rem, 0.63vw, 0.5rem)',
                height: 'clamp(2.75rem, 3.75vw, 3.5rem)',
                paddingLeft: 'clamp(1rem, 1.56vw, 1.5rem)',
                paddingRight: 'clamp(1rem, 1.56vw, 1.5rem)',
                textDecoration: 'none'
              }}
            >
              <div style={{ width: 'clamp(1.5rem, 1.56vw, 1.5rem)', height: 'clamp(1.5rem, 1.56vw, 1.5rem)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  <path d="M9 12.5H10V10.5H11C11.2833 10.5 11.5208 10.4042 11.7125 10.2125C11.9042 10.0208 12 9.78333 12 9.5V8.5C12 8.21667 11.9042 7.97917 11.7125 7.7875C11.5208 7.59583 11.2833 7.5 11 7.5H9V12.5ZM10 9.5V8.5H11V9.5H10ZM13 12.5H15C15.2833 12.5 15.5208 12.4042 15.7125 12.2125C15.9042 12.0208 16 11.7833 16 11.5V8.5C16 8.21667 15.9042 7.97917 15.7125 7.7875C15.5208 7.59583 15.2833 7.5 15 7.5H13V12.5ZM14 11.5V8.5H15V11.5H14ZM17 12.5H18V10.5H19V9.5H18V8.5H19V7.5H17V12.5ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z" fill="black" />
                </svg>
              </div>
              <span className="text-black font-iranyekan font-bold" dir="auto" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
                دانلود دیتاشیت
              </span>
            </a>
          </div>
          <div style={{ marginBottom: 'clamp(2rem, 2.08vw, 2rem)' }}>
            <p className="text-white text-right leading-relaxed text-base md:text-lg font-medium" dir="auto" style={{ 
              marginBottom: 'clamp(3.5rem, 7.29vw, 3.5rem)'
            }}>
              {computed.datasheetText}
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="bg-[#202020] rounded-t-2xl sm:rounded-t-3xl" style={{ padding: 'clamp(0.75rem, 1.25vw, 1rem)' }}>
                <div className="grid grid-cols-3 text-right text-xs sm:text-sm" style={{ gap: 'clamp(0.5rem, 1.25vw, 1rem)' }}>
                  <div className="text-[#f9bd65] text-center text-sm md:text-lg font-bold" dir="auto">
                    ویژگی (Property)
                  </div>
                  <div className="text-[#f9bd65] text-center text-sm md:text-lg font-bold" dir="auto">
                    مقدار (Typical Value)
                  </div>
                  <div className="text-[#f9bd65] text-center text-sm md:text-lg font-bold" dir="auto">
                    استاندارد/روش آزمون
                  </div>
                </div>
              </div>

              {computed.techRows.map((row, i) => (
                <div
                  key={row.property}
                  className={`bg-[#161616] border border-[#3b3b3b] ${i === computed.techRows.length - 1 ? 'rounded-b-3xl' : ''}`}
                  style={{ padding: 'clamp(1rem, 1.25vw, 1rem)' }}
                >
                  <div className="grid grid-cols-3 text-right" style={{ gap: 'clamp(1rem, 1.25vw, 1rem)' }}>
                    <div className=" text-[#f9bd65] text-center  text-sm md:text-lg font-bold" dir="auto">
                      {row.property}
                    </div>
                    <div className="text-[#f9bd65] text-center  text-sm md:text-lg font-bold" dir="auto">
                      {row.value}
                    </div>
                    <div className=" text-[#f9bd65] text-center  text-sm md:text-lg font-bold" dir="auto">
                      {row.method}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'clamp(3.5rem, 7.29vw, 3.5rem)', marginBottom: 'clamp(3.5rem, 7.29vw, 3.5rem)' }}>
            <p className="text-white text-right leading-relaxed font-medium text-base md:text-lg" dir="auto">
              {computed.datasheetText}
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div className="relative bg-[#222] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center justify-between" style={{ 
            padding: 'clamp(1rem, 2.08vw, 3rem)',
            gap: 'clamp(1rem, 2.08vw, 3rem)'
          }}>
            <h2 className="text-white text-center flex-shrink-0 font-iranyekan font-bold" dir="auto" style={{ 
              marginBottom: 'clamp(0.75rem, 1.56vw, 3rem)',
              fontSize: 'clamp(1.25rem, 1.88vw, 2.125rem)'
            }}>
              تصویر محصول
            </h2>
            <div className="bg-[#2c2c2c] rounded-2xl sm:rounded-3xl flex-grow w-full" style={{ 
              padding: 'clamp(1rem, 2.08vw, 3rem)'
            }}>
              <div className="relative w-full" style={{ 
                height: 'clamp(180px, 23.44vw, 600px)'
              }}>
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  src={'/images/detail.png'}
                />
              </div>
            </div>
          </div>

          <p className="text-white text-right font-medium text-base md:text-lg" dir="auto" style={{ 
            marginTop: 'clamp(3.5rem, 7.29vw, 3.5rem)',
          }}>
            {computed.galleryText}
          </p>
        </section>
        <Divider />
        {/* Similar Products Section */}
        <section className="w-full" style={{ marginBottom: 'clamp(1.5rem, 2.6vw, 4rem)' }}>
          <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2.08vw, 3rem)' }}>
            <div className="w-full lg:w-1/2">
              <h2 className="text-white text-right font-iranyekan font-bold" dir="auto" style={{ 
                marginBottom: 'clamp(0.75rem, 1.17vw, 1.5rem)',
                fontSize: 'clamp(1.125rem, 1.41vw, 1.375rem)'
              }}>
                محصولا مشابه
              </h2>
              <p className="text-white text-right font-iranyekan" dir="auto" style={{ 
                fontSize: 'clamp(0.875rem, 1.04vw, 1.125rem)',
                lineHeight: 'clamp(1.5rem, 1.88vw, 2.5rem)'
              }}>
                {computed.similarText}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 'clamp(0.5rem, 1.17vw, 1.5rem)' }}>
                <RelatedProductCard 
                  product={related1}
                  imageUrl={(related1 && getWcaPrimaryImageUrl(related1)) || ''}
                  fallbackImage={computed.primaryImage}
                />
                <RelatedProductCard 
                  product={related2}
                  imageUrl={(related2 && getWcaPrimaryImageUrl(related2)) || ''}
                  fallbackImage={imgImage1.src}
                />
                <RelatedProductCard 
                  product={related3}
                  imageUrl={(related3 && getWcaPrimaryImageUrl(related3)) || ''}
                  fallbackImage={imgImage2.src}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

