'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import type { WcaProduct, WcaProductsListResponse, WcaCategory, WcaAttribute, WcaAttributeTerm } from '@/lib/api/types'
import { getWcaPrimaryImageUrl, getWcaCategories, getWcaAttributes, getWcaAttributeTerms, getWcaProducts } from '@/lib/api/wca'
import { LoadingSpinner } from '@/components/ui/Loading'
import { stripHtml } from '@/lib/utils/text'
import { extractStandard, extractVariantsFromFirstHtmlTable } from '@/lib/utils/wca'

import { ProductDetailClient } from './ProductDetailClient'

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
      className="h-[52px] rounded-[999px] px-5 flex items-center gap-3 shrink-0 border border-white/10 bg-gradient-to-b from-[#3A3A3A] to-[#242424] text-white hover:bg-[#D7B354] hover:text-black transition-colors"
      style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.35)' }}
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
    <Link href={`/products?slug=${encodeURIComponent(product.slug)}`} className='relative mt-16'>
    <div className="relative bg-[#343434] h-[355px] rounded-[24px] w-full" />
    <div className="absolute h-[414px] w-full z-10 -top-20" data-name="Mockup ATF-ZF Background Removed">
      {image ? (
        <Image
          src={image}
          alt={product.name}
          fill
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
      )}
    </div>
    <div className='w-[full] flex flex-col items-center justify-center z-10 -mt-5'>
      <div className="bg-[#e6a816ca] z-10 content-stretch flex h-[54px] items-center justify-center overflow-clip p-[10px] rounded-[120px] w-[90%]">
        <div className=" justify-center leading-[0] not-italic relative shrink-0 text-base text-[#FCFBEE] text-center text-nowrap">
          <p className="leading-[16px]" dir="auto">{product.name}</p>
        </div>
      </div>
      <div className='flex items-center bg-[#DEDEDE] rounded-full text-black font-bold text-base'>
      <p className='px-4 py-2'>{volumeText}</p>
         <p className='px-4 py-2 bg-[#C3C3C3] rounded-full'>{standardText}</p>
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
}: {
  attributes: WcaAttribute[]
  attributeTermsMap: Record<number, WcaAttributeTerm[]>
  selectedAttributeTerms: number[]
  onAttributeTermToggle: (termId: number) => void
}) {
  const pillBase = 'h-[36px] rounded-[999px] px-4 flex items-center justify-center text-[12px]'
  const pillOff = 'bg-[#2D2D2D] text-[#D2D2D2]'
  const pillOn = 'bg-[#D7B354] text-black'

  return (
    <aside className="bg-[#343434] rounded-[22px] p-6 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
      <h3 className="text-white text-right text-[14px] mb-6">فیلترها</h3>

      <div className="space-y-8">
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
  attributeTermIds: number[]
) {
  // Filter by attribute terms
  if (attributeTermIds.length > 0) {
    // For now, we'll do a simple text-based match
    // This should be improved based on actual API structure
    return true // For now, allow all if we can't properly match
  }

  return true
}

export default function ProductsPage() {
  const sp = useSearchParams()
  const slug = (sp.get('slug') ?? '').trim()

  const [products, setProducts] = useState<WcaProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [categories, setCategories] = useState<WcaCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [attributes, setAttributes] = useState<WcaAttribute[]>([])
  const [attributeTermsMap, setAttributeTermsMap] = useState<Record<number, WcaAttributeTerm[]>>({})
  const [loadingAttributes, setLoadingAttributes] = useState(true)
  const [selectedAttributeTerms, setSelectedAttributeTerms] = useState<number[]>([])

  const chipRowRef = useRef<HTMLDivElement | null>(null)

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
  }, [])

  const visibleProducts = useMemo(() => {
    let filtered = products.filter((p) => 
      matchesFilters(p, selectedAttributeTerms)
    )
    
    const withImage = filtered
      .map((p) => ({ p, image: getWcaPrimaryImageUrl(p) }))
      .filter((x) => Boolean(x.image))
      .map((x) => x.p)

    return withImage
  }, [products, selectedAttributeTerms])

  const handleAttributeTermToggle = (termId: number) => {
    setSelectedAttributeTerms((prev) => 
      prev.includes(termId) 
        ? prev.filter((id) => id !== termId)
        : [...prev, termId]
    )
  }

  if (slug) {
    return <ProductDetailClient slug={slug} />
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0)_55%)]" />
      <div className="relative px-24 pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="flex justify-start mb-6">
          <div className="text-[12px] text-[#9A9A9A]">
            <Link href="/" className="hover:text-[#D7B354]">صفحه اصلی</Link>
            <span className="mx-2">/</span>
            <span className="text-[#D7B354]">محصولات</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-white text-[16px] font-bold tracking-wide mb-8">سبد محصولات ROMELA</h1>

        {/* Category chips row */}
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
              categories.map((c) => (
                <CategoryChip
                  key={c.id}
                  category={c}
                  href={`/products/category/${c.id}`}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-white/10" />

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
              attributes={attributes}
              attributeTermsMap={attributeTermsMap}
              selectedAttributeTerms={selectedAttributeTerms}
              onAttributeTermToggle={handleAttributeTermToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
