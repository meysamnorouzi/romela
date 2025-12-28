'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import type { WcaProduct, WcaProductsListResponse, WcaCategory, WcaAttribute, WcaAttributeTerm } from '@/lib/api/types'
import { getWcaPrimaryImageUrl, getWcaCategories, getWcaAttributes, getWcaAttributeTerms, getWcaProducts } from '@/lib/api/wca'
import { LoadingSpinner } from '@/components/ui/Loading'
import { stripHtml } from '@/lib/utils/text'
import { extractStandard, extractVariantsFromFirstHtmlTable } from '@/lib/utils/wca'
import { ProductDetailClient } from './ProductDetailClient'

// Product Name with Tooltip Component
function ProductNameWithTooltip({ text, className }: { text: string, className?: string }) {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      const isOverflowing = nameRef.current.scrollWidth > nameRef.current.clientWidth;
      setShowTooltip(isOverflowing);
    }
  }, [text]);

  return (
    <div className="relative group w-full">
      <p
        ref={nameRef}
        dir="auto"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        className={`text-center cursor-pointer ${className}`}
      >
        {text}
      </p>
      {showTooltip && (
        <div className="absolute min-w-52 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#2a2a2a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-white/20 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}

const svgPaths = {
  chevronLeft: 'M15 19l-7-7 7-7',
}

function CategoryChip({
  category,
  href,
}: {
  category: WcaCategory
  href: string
}) {
  const icon = category.image || '/images/image 8.svg'
  return (
    <Link
      href={href}
      className="rounded-[999px] px-12 flex items-center shrink-0 text-white transition-colors py-1"
      style={{
        gap: 'clamp(0.75rem, 0.94vw, 0.75rem)',
        background: 'radial-gradient(circle at left, #595959 0%, #353535 62%)'
      }}
    >
      <span className="leading-none whitespace-nowrap font-iranyekan text-base font-bold">{category.name}</span>
      <div className="relative flex items-center justify-center overflow-hidden h-16 w-16">
        {icon && <Image src={icon} alt={category.name} fill className="object-contain w-full h-full" />}
      </div>
    </Link>
  )
}

// Divider Component
function Divider() {
  return (
    <div className="w-full h-px" style={{ marginTop: 'clamp(2rem, 3.13vw, 2rem)', marginBottom: 'clamp(2rem, 3.13vw, 2rem)' }}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 1824 1" preserveAspectRatio="none">
        <line
          x1="0.5"
          y1="0.5"
          x2="1823.5"
          y2="0.5"
          stroke="url(#gradient)"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1824" y1="1.5" y2="1.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
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
    <Link href={`/products?slug=${encodeURIComponent(product.slug)}`} className='relative' style={{ marginTop: 'clamp(4rem, 5.21vw, 4rem)' }}>
      <div className="relative bg-[#343434] rounded-[24px] w-full flex items-center justify-center" style={{ height: 'clamp(222px, 18.49vw, 355px)' }}>
        <div className="h-full flex items-center justify-center" style={{
        }} data-name="Mockup ATF-ZF Background Removed">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="size-full -mt-24"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
        </div>
      </div>
      <div className='w-full flex flex-col items-center justify-center z-10' style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
        <div className="bg-[#e6a816ca] z-10 flex h-fit items-center justify-center rounded-[120px]" style={{
          padding: 'clamp(1rem, 1.25vw, 1rem)',
          width: '90%'
        }}>
          <div className="justify-center relative w-full">
            <ProductNameWithTooltip text={product.name} className="text-[#FCFBEE] text-sm" />
          </div>
        </div>
        <div className='flex items-center bg-[#DEDEDE] rounded-full text-black font-bold' style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
          <p style={{ paddingLeft: 'clamp(1rem, 1.25vw, 1rem)', paddingRight: 'clamp(1rem, 1.25vw, 1rem)', paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)', paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)' }}>{volumeText}</p>
          <p className='bg-[#C3C3C3] rounded-full' style={{ paddingLeft: 'clamp(1rem, 1.25vw, 1rem)', paddingRight: 'clamp(1rem, 1.25vw, 1rem)', paddingTop: 'clamp(0.5rem, 0.63vw, 0.5rem)', paddingBottom: 'clamp(0.5rem, 0.63vw, 0.5rem)' }}>
            <ProductNameWithTooltip text={standardText} />
          </p>
        </div>
      </div>
    </Link>
  )
}

function FiltersPanel({
  attributes,
  attributeTermsMap,
  selectedAttributeTerms,
  onAttributeTermToggle,
  loadingAttributes,
}: {
  attributes: WcaAttribute[]
  attributeTermsMap: Record<number, WcaAttributeTerm[]>
  selectedAttributeTerms: number[]
  onAttributeTermToggle: (termId: number) => void
  loadingAttributes: boolean
}) {
  const pillOff = 'bg-[#343434] border border-[#343434]'
  const pillOn = 'bg-[#E6A816] border border-[#E6A816]'

  const hasFilters = attributes.some(attr => {
    const terms = attributeTermsMap[attr.id] || []
    return terms.length > 0
  })

  return (
    <aside className="bg-[#363636B2] rounded-[22px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]" style={{
      paddingLeft: 'clamp(1.5rem, 1.56vw, 1.5rem)',
      paddingRight: 'clamp(1.5rem, 1.56vw, 1.5rem)',
      paddingTop: 'clamp(2rem, 2.08vw, 2rem)',
      paddingBottom: 'clamp(2rem, 2.08vw, 2rem)'
    }}>
      <h3 className="text-white font-bold text-center" style={{ fontSize: 'clamp(1.125rem, 1.25vw, 1.125rem)' }}>فیلترها</h3>
      <Divider />
      {loadingAttributes ? (
        <div className="text-center text-[#9A9A9A]" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
          در حال بارگذاری فیلترها...
        </div>
      ) : !hasFilters ? (
        <div className="text-center text-[#9A9A9A]" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
          فیلتری در دسترس نیست
        </div>
      ) : (
        <div className="flex flex-col" style={{ gap: 'clamp(2rem, 2.08vw, 2rem)' }}>
          {attributes.map((attr) => {
            const terms = attributeTermsMap[attr.id] || []
            if (terms.length === 0) return null

            return (
              <div key={attr.id}>
                <div className="text-white text-lg font-bold text-right mb-6">{attr.label || attr.name}</div>
                <div className="grid grid-cols-2" style={{ gap: 'clamp(0.75rem, 0.94vw, 0.75rem)' }}>
                  {terms.map((term) => {
                    const isSelected = selectedAttributeTerms.includes(term.id)
                    return (
                      <button
                        key={term.id}
                        type="button"
                        className={`rounded-[999px] text-white text-sm font-bold flex items-center justify-center py-3 ${isSelected ? pillOn : pillOff}`}
                        onClick={() => onAttributeTermToggle(term.id)}
                        style={{
                          paddingLeft: 'clamp(1rem, 1.25vw, 1rem)',
                          paddingRight: 'clamp(1rem, 1.25vw, 1rem)',
                        }}
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
      )}
    </aside>
  )
}

function matchesFilters(
  product: WcaProduct,
  categoryId: number | null,
  subcategoryId: number | null,
  attributeTermIds: number[],
  attributeTermsMap: Record<number, WcaAttributeTerm[]>
) {
  // Filter by category/subcategory
  if (subcategoryId !== null) {
    const hasSubcategory = product.categories?.some((c) => c.id === subcategoryId)
    if (!hasSubcategory) return false
  } else if (categoryId !== null) {
    const hasCategory = product.categories?.some((c) => c.id === categoryId)
    if (!hasCategory) return false
  }

  // Filter by attribute terms
  if (attributeTermIds.length > 0) {
    // Get selected term names
    const selectedTermNames = new Set<string>()
    const selectedTermSlugs = new Set<string>()

    // Build sets of selected term names and slugs from all attributes
    Object.values(attributeTermsMap).forEach(terms => {
      terms.forEach(term => {
        if (attributeTermIds.includes(term.id)) {
          selectedTermNames.add(term.name.toLowerCase().trim())
          selectedTermSlugs.add(term.slug.toLowerCase().trim())
        }
      })
    })

    // Check if product has attributes that match selected terms
    const productAttributes = product.attributes || []

    // Try to match against product attributes
    let hasMatchingAttribute = false

    for (const attr of productAttributes) {
      if (!attr || typeof attr !== 'object') continue

      // Try different possible structures
      const attrObj = attr as any

      // Check if attributes have options array (WooCommerce style)
      if (Array.isArray(attrObj.options)) {
        for (const option of attrObj.options) {
          if (typeof option === 'string') {
            const optionLower = option.toLowerCase().trim()
            if (selectedTermNames.has(optionLower) || selectedTermSlugs.has(optionLower)) {
              hasMatchingAttribute = true
              break
            }
          } else if (typeof option === 'object' && option !== null) {
            const optionName = String(option.name || option.slug || option).toLowerCase().trim()
            if (selectedTermNames.has(optionName) || selectedTermSlugs.has(optionName)) {
              hasMatchingAttribute = true
              break
            }
          }
        }
      }

      // Check if attribute has a name/slug that matches
      if (attrObj.name && typeof attrObj.name === 'string') {
        const attrName = attrObj.name.toLowerCase().trim()
        if (selectedTermNames.has(attrName) || selectedTermSlugs.has(attrName)) {
          hasMatchingAttribute = true
        }
      }

      if (hasMatchingAttribute) break
    }

    // Also check product name and description for term matches as fallback
    if (!hasMatchingAttribute) {
      const productText = `${product.name || ''} ${product.description || ''} ${product.short_description || ''}`.toLowerCase()
      for (const termName of selectedTermNames) {
        if (productText.includes(termName)) {
          hasMatchingAttribute = true
          break
        }
      }
    }

    return hasMatchingAttribute
  }

  return true
}

export default function ProductsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const slug = (sp.get('slug') ?? '').trim()
  const categoryParam = sp.get('category')
  const subcategoryParam = sp.get('subcategory')
  const attributeTermParam = sp.get('attribute_term')
  const attributeTermsParam = sp.get('attribute_terms') // Support multiple terms

  const [products, setProducts] = useState<WcaProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [categories, setCategories] = useState<WcaCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null)
  const [attributes, setAttributes] = useState<WcaAttribute[]>([])
  const [attributeTermsMap, setAttributeTermsMap] = useState<Record<number, WcaAttributeTerm[]>>({})
  const [loadingAttributes, setLoadingAttributes] = useState(true)
  const [selectedAttributeTerms, setSelectedAttributeTerms] = useState<number[]>([])

  const chipRowRef = useRef<HTMLDivElement | null>(null)
  const [showRightButton, setShowRightButton] = useState(false)
  const [showLeftButton, setShowLeftButton] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const filterRef = useRef<HTMLDivElement | null>(null)

  const WP_JSON_BASE_URL = (
    process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    'https://padradarasoil.com/wp-json'
  ).replace(/\/+$/, '')

  async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return res.json() as Promise<T>
  }

  // Load root categories
  useEffect(() => {
    let cancelled = false
    setLoadingCategories(true)

    async function loadCategories() {
      try {
        // Load root categories only
        const result = await getWcaCategories({
          per_page: 100,
          page: 1,
          hide_empty: true,
          parent: 0
        })
        if (cancelled) return
        setCategories(result.categories || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
        if (!cancelled) {
          setCategories([])
        }
      } finally {
        if (!cancelled) setLoadingCategories(false)
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  // Load attributes
  useEffect(() => {
    let cancelled = false
    setLoadingAttributes(true)

    async function loadAttributes() {
      try {
        console.log('Loading attributes from API...')
        const attrsResult = await getWcaAttributes()
        if (cancelled) return

        const fetchedAttributes = attrsResult.attributes || []
        console.log(`Fetched ${fetchedAttributes.length} attributes:`, fetchedAttributes.map(a => ({ id: a.id, name: a.name, label: a.label })))
        setAttributes(fetchedAttributes)

        // Load terms for each attribute
        const termsMap: Record<number, WcaAttributeTerm[]> = {}
        for (const attr of fetchedAttributes) {
          try {
            const termsResult = await getWcaAttributeTerms(attr.id)
            if (termsResult && !cancelled) {
              const terms = termsResult.terms || []
              if (terms.length > 0) {
                termsMap[attr.id] = terms
                console.log(`Loaded ${terms.length} terms for attribute ${attr.name} (${attr.id}):`, terms.map(t => t.name))
              }
            }
          } catch (error) {
            console.error(`Error fetching terms for attribute ${attr.id} (${attr.name}):`, error)
          }
        }
        if (!cancelled) {
          console.log('Final terms map:', Object.keys(termsMap).length, 'attributes with terms')
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

  // Initialize filters from URL parameters
  useEffect(() => {
    if (categoryParam) {
      const categoryId = parseInt(categoryParam, 10)
      if (!isNaN(categoryId)) {
        setSelectedCategoryId(categoryId)
      }
    } else {
      setSelectedCategoryId(null)
    }
    if (subcategoryParam) {
      const subcategoryId = parseInt(subcategoryParam, 10)
      if (!isNaN(subcategoryId)) {
        setSelectedSubcategoryId(subcategoryId)
      }
    } else {
      setSelectedSubcategoryId(null)
    }

    // Support both single attribute_term and multiple attribute_terms
    const terms: number[] = []
    if (attributeTermParam) {
      const termId = parseInt(attributeTermParam, 10)
      if (!isNaN(termId)) {
        terms.push(termId)
      }
    }
    if (attributeTermsParam) {
      const termIds = attributeTermsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
      terms.push(...termIds)
    }
    setSelectedAttributeTerms([...new Set(terms)]) // Remove duplicates
  }, [categoryParam, subcategoryParam, attributeTermParam, attributeTermsParam])

  // Load products
  useEffect(() => {
    let cancelled = false
    setLoadingProducts(true)

    async function loadProducts() {
      try {
        const params: Parameters<typeof getWcaProducts>[0] = {
          per_page: 100,
          page: 1,
        }

        // Filter by category or subcategory
        if (selectedSubcategoryId) {
          params.category = selectedSubcategoryId
        } else if (selectedCategoryId) {
          params.category = selectedCategoryId
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
  }, [selectedCategoryId, selectedSubcategoryId])

  const visibleProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      matchesFilters(p, selectedCategoryId, selectedSubcategoryId, selectedAttributeTerms, attributeTermsMap)
    )

    const withImage = filtered
      .map((p) => ({ p, image: getWcaPrimaryImageUrl(p) }))
      .filter((x) => Boolean(x.image))
      .map((x) => x.p)

    return withImage
  }, [products, selectedCategoryId, selectedSubcategoryId, selectedAttributeTerms, attributeTermsMap])

  // Update URL when filters change (but skip initial load to avoid loop)
  const isInitialLoad = useRef(true)
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }

    const params = new URLSearchParams()

    // Update category param
    if (selectedCategoryId) {
      params.set('category', selectedCategoryId.toString())
    }

    // Update subcategory param
    if (selectedSubcategoryId) {
      params.set('subcategory', selectedSubcategoryId.toString())
    }

    // Update attribute terms param
    if (selectedAttributeTerms.length > 0) {
      params.set('attribute_terms', selectedAttributeTerms.join(','))
    }

    // Update URL without causing navigation
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl, { scroll: false })
  }, [selectedCategoryId, selectedSubcategoryId, selectedAttributeTerms, pathname, router])

  const handleAttributeTermToggle = (termId: number) => {
    setSelectedAttributeTerms((prev) => {
      const newTerms = prev.includes(termId)
        ? prev.filter((id) => id !== termId)
        : [...prev, termId]
      return newTerms
    })
  }

  // Check scroll position to show/hide navigation buttons
  useEffect(() => {
    const checkScroll = () => {
      if (chipRowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = chipRowRef.current
        // In RTL, scrollLeft can be negative when scrolled left
        // scrollLeft starts at 0 (at start/rightmost) and goes negative as we scroll left
        // At end (leftmost): scrollLeft ≈ -(scrollWidth - clientWidth)

        const maxScroll = scrollWidth - clientWidth
        const isAtStart = Math.abs(scrollLeft) < 1 || (scrollLeft === 0 && maxScroll <= 0)
        const isAtEnd = maxScroll > 0 && Math.abs(scrollLeft + maxScroll) < 1

        // Right button: show when we've scrolled left (can go back right)
        setShowRightButton(!isAtStart && maxScroll > 0)
        // Left button: show when we're not at the end (can scroll left)
        setShowLeftButton(!isAtEnd && maxScroll > 0)
      }
    }

    const scrollContainer = chipRowRef.current
    if (scrollContainer) {
      // Initial check after a small delay to ensure layout is complete
      setTimeout(checkScroll, 100)
      scrollContainer.addEventListener('scroll', checkScroll)
      // Also check on resize
      window.addEventListener('resize', checkScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('resize', checkScroll)
    }
  }, [categories])

  // Apply sticky positioning for large screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (filterRef.current && isLargeScreen) {
      filterRef.current.style.position = 'sticky'
      filterRef.current.style.top = '7rem'
      filterRef.current.style.maxHeight = 'calc(100vh - 7rem)'
      filterRef.current.style.overflowY = 'auto'
      filterRef.current.style.alignSelf = 'flex-start'
    } else if (filterRef.current) {
      filterRef.current.style.position = 'static'
      filterRef.current.style.top = 'auto'
      filterRef.current.style.maxHeight = 'none'
      filterRef.current.style.overflowY = 'visible'
      filterRef.current.style.alignSelf = 'auto'
    }
  }, [isLargeScreen])

  if (slug) {
    return <ProductDetailClient slug={slug} />
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative xl:px-0 2xl:px-6 sm:px-6">
      <div className="relative w-full max-w-[1920px] mx-auto 2xl:px-16 xl:px-4" style={{
        paddingTop: 'clamp(6rem, 18.75vw, 9rem)',
        paddingBottom: 'clamp(3rem, 10.42vw, 5rem)'
      }}>
        {/* Title */}
        <h1 className="text-center text-white font-bold tracking-wide font-iranyekan text-xl sm:text-[2.125rem]" style={{
          marginBottom: 'clamp(1.5rem, 5.21vw, 2.5rem)'
        }}>لیست محصولات</h1>
        {/* Breadcrumb */}
        <div className="flex justify-start mb-14">
          <div className="font-bold text-[#9A9A9A]" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
            <Link href="/" className="hover:text-[#717171]">صفحه اصلی</Link>
            <span style={{ marginLeft: 'clamp(0.7rem, 0.83vw, 0.7rem)', marginRight: 'clamp(0.7rem, 0.83vw, 0.7rem)' }}>/</span>
            <span className="text-[#F58F4A]">محصولات</span>
          </div>
        </div>
        {/* Category chips row */}
        <div className="flex items-center" style={{ gap: 'clamp(1rem, 1.25vw, 1rem)' }}>
          {showRightButton && (
            <button
              type="button"
              className="rounded-full bg-[#FDBA7433] flex items-center justify-center text-[#E2951A] py-7 px-4"
              onClick={() => {
                chipRowRef.current?.scrollBy({ left: 240, behavior: 'smooth' })
              }}
              aria-label="scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2L17.5 12L7.5 22L5.725 20.225L13.95 12L5.725 3.775L7.5 2Z" fill="#E2951A" />
              </svg>
            </button>
          )}

          <div
            ref={chipRowRef}
            dir="rtl"
            className="flex-1 flex overflow-x-auto no-scrollbar"
            style={{
              scrollBehavior: 'smooth',
              gap: 'clamp(1rem, 1.25vw, 1rem)',
              paddingTop: 'clamp(0.25rem, 0.31vw, 0.25rem)',
              paddingBottom: 'clamp(0.25rem, 0.31vw, 0.25rem)'
            }}
          >
            {loadingCategories ? (
              <div className="text-[#9A9A9A]" style={{ fontSize: 'clamp(0.8125rem, 0.94vw, 0.8125rem)' }}>در حال بارگذاری...</div>
            ) : (
              categories.map((c) => (
                <CategoryChip
                  key={c.id}
                  category={c}
                  href={`/products/category/${c.id}`}
                />
              ))
            )}
          </div>

          {showLeftButton && (
            <button
              type="button"
              className="rounded-full bg-[#FDBA7433] flex items-center justify-center text-[#E2951A] py-7 px-4"
              onClick={() => {
                chipRowRef.current?.scrollBy({ left: -240, behavior: 'smooth' })
              }}
              aria-label="scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 2L6.5 12L16.5 22L18.275 20.225L10.05 12L18.275 3.775L16.5 2Z" fill="#E2951A" />
              </svg>
            </button>
          )}
        </div>

        <Divider />

        {/* Content */}
        <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-[1fr_360px] items-start" style={{
          marginTop: 'clamp(2rem, 3.13vw, 3rem)',
          gap: 'clamp(1.5rem, 2.6vw, 2.5rem)'
        }}>
          {/* Products grid */}
          <div dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{
              columnGap: 'clamp(1rem, 2.6vw, 2.5rem)',
              rowGap: 'clamp(2rem, 5.21vw, 4rem)'
            }}>
              {loadingProducts
                ? Array.from({ length: 9 }).map((_, i) => <ProductCardLoading key={`pl-${i}`} />)
                : visibleProducts.map((p) => <ProductTile key={p.id} product={p} />)}
            </div>

            {!loadingProducts && visibleProducts.length === 0 && (
              <div className="text-center text-[#9A9A9A]" style={{
                marginTop: 'clamp(3rem, 3.13vw, 3rem)',
                fontSize: 'clamp(1rem, 1.25vw, 1rem)'
              }}>محصولی برای نمایش وجود ندارد</div>
            )}
          </div>

          {/* Filters */}
          <div dir="rtl" ref={filterRef} className="filter-sticky">
            <FiltersPanel
              attributes={attributes}
              attributeTermsMap={attributeTermsMap}
              selectedAttributeTerms={selectedAttributeTerms}
              onAttributeTermToggle={handleAttributeTermToggle}
              loadingAttributes={loadingAttributes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

