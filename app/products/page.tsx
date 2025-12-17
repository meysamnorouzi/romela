'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import type { WcaProduct, WcaProductsListResponse } from '@/lib/api/types'
import { getWcaPrimaryImageUrl } from '@/lib/api/wca'
import { LoadingSpinner } from '@/components/ui/Loading'
import { stripHtml } from '@/lib/utils/text'
import { extractStandard, extractVariantsFromFirstHtmlTable } from '@/lib/utils/wca'

import { ProductDetailClient } from './ProductDetailClient'

const svgPaths = {
  chevronLeft: 'M15 19l-7-7 7-7',
}

const categoryChips = [
  { id: 'industrial-oil', label: 'روغن صنعتی', icon: '/images/image 8.svg' },
  { id: 'engine-oil', label: 'روغن موتور', icon: '/images/406618088_4cf1da23-4ada-498f-9987-8e38474b39b9 1.svg' },
  { id: 'gearbox-oil', label: 'روغن گیربکس', icon: '/images/image 2.svg' },
  { id: 'brake-fluid', label: 'روغن ترمز', icon: '/images/image 5.svg' },
  { id: 'hydraulic-oil', label: 'روغن هیدرولیک', icon: '/images/image 6.svg' },
  { id: 'grease', label: 'گریس', icon: '/images/image 3.svg' },
]

function CategoryChip({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string
  icon: string
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'h-[52px] rounded-[999px] px-5 flex items-center gap-3 shrink-0 border border-white/10 ' +
        (selected
          ? 'bg-[#D7B354] text-black'
          : 'bg-gradient-to-b from-[#3A3A3A] to-[#242424] text-white')
      }
      style={{ boxShadow: selected ? '0 18px 40px rgba(0,0,0,0.35)' : undefined }}
    >
      <span className="text-[13px] leading-none whitespace-nowrap">{label}</span>
      <div className="relative w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center overflow-hidden">
        <Image src={icon} alt={label} width={30} height={30} className="object-contain" />
      </div>
    </button>
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

function FiltersPanel() {
  const [category, setCategory] = useState<'dasteh' | 'dasteh2' | 'dasteh3'>('dasteh')
  const [viscosity, setViscosity] = useState<'۲۰-W' | '۱۰-W' | '۵-W' | '۳-W'>('۲۰-W')
  const [volume, setVolume] = useState<'۲۰ لیتر' | '۳۰ لیتر' | 'فیلتر'>('۲۰ لیتر')

  const pillBase = 'h-[36px] rounded-[999px] px-4 flex items-center justify-center text-[12px]'
  const pillOff = 'bg-[#2D2D2D] text-[#D2D2D2]'
  const pillOn = 'bg-[#D7B354] text-black'

  return (
    <aside className="bg-[#343434] rounded-[22px] p-6 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
      <h3 className="text-white text-right text-[14px] mb-6">فیلترها</h3>

      <div className="space-y-8">
        <div>
          <div className="text-[#D2D2D2] text-right text-[12px] mb-3">دسته بندی ها</div>
          <div className="flex flex-col gap-3">
            <button type="button" className={`${pillBase} ${category === 'dasteh' ? pillOn : pillOff}`} onClick={() => setCategory('dasteh')}>
              دسته بندی ها
            </button>
            <button type="button" className={`${pillBase} ${category === 'dasteh2' ? pillOn : pillOff}`} onClick={() => setCategory('dasteh2')}>
              دسته بندی ها
            </button>
            <button type="button" className={`${pillBase} ${category === 'dasteh3' ? pillOn : pillOff}`} onClick={() => setCategory('dasteh3')}>
              دسته بندی ها
            </button>
          </div>
        </div>

        <div>
          <div className="text-[#D2D2D2] text-right text-[12px] mb-3">ویسکوزیته</div>
          <div className="grid grid-cols-2 gap-3">
            {(['۲۰-W', '۵-W', '۱۰-W', '۳-W'] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={`${pillBase} ${viscosity === v ? pillOn : pillOff}`}
                onClick={() => setViscosity(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[#D2D2D2] text-right text-[12px] mb-3">حجم</div>
          <div className="flex flex-col gap-3">
            {(['۲۰ لیتر', '۳۰ لیتر', 'فیلتر'] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={`${pillBase} ${volume === v ? pillOn : pillOff}`}
                onClick={() => setVolume(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function matchesChip(product: WcaProduct, chipId: string) {
  const hay = [
    product.name || '',
    stripHtml(product.short_description || ''),
    stripHtml(product.description || ''),
    ...(product.categories ?? []).map((c) => `${c.name ?? ''} ${c.slug ?? ''}`),
  ]
    .join(' ')
    .toLowerCase()

  const includesAny = (needles: string[]) => needles.some((n) => hay.includes(n))

  switch (chipId) {
    case 'industrial-oil':
      return includesAny(['industrial', 'صنعت', 'توربین', 'کمپرسور', 'transformer', 'ترانسفورمر'])
    case 'engine-oil':
      return includesAny(['engine', 'موتور', 'سواری'])
    case 'gearbox-oil':
      return includesAny(['gear', 'gearbox', 'گیربکس', 'atf', 'cvt'])
    case 'brake-fluid':
      return includesAny(['brake', 'ترمز', 'dot'])
    case 'hydraulic-oil':
      return includesAny(['hydraulic', 'هیدرولیک', 'hydraul'])
    case 'grease':
      return includesAny(['grease', 'گریس'])
    default:
      return true
  }
}

export default function ProductsPage() {
  const sp = useSearchParams()
  const slug = (sp.get('slug') ?? '').trim()

  const [products, setProducts] = useState<WcaProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  const chipRowRef = useRef<HTMLDivElement | null>(null)
  const [activeChip, setActiveChip] = useState<string>('industrial-oil')

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

  useEffect(() => {
    let cancelled = false
    setLoadingProducts(true)

    async function loadProducts() {
      try {
        const url = new URL(`${WP_JSON_BASE_URL}/wca/v1/products`)
        url.searchParams.set('per_page', '100')
        url.searchParams.set('page', '1')

        const raw = await fetchJson<WcaProductsListResponse>(url.toString())
        if (cancelled) return
        setProducts(raw.products ?? [])
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
  }, [WP_JSON_BASE_URL])

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((p) => matchesChip(p, activeChip))
    const withImage = filtered
      .map((p) => ({ p, image: getWcaPrimaryImageUrl(p) }))
      .filter((x) => Boolean(x.image))
      .map((x) => x.p)

    // Layout in the screenshot shows 3 columns x 3 rows
    return withImage.slice(0, 9)
  }, [products, activeChip])

  if (slug) {
    return <ProductDetailClient slug={slug} />
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0)_55%)]" />
      <div className="relative max-w-[1240px] mx-auto px-6 pt-36 pb-20">
        {/* Breadcrumb */}
        <div className="flex justify-end mb-6">
          <div className="text-[12px] text-[#9A9A9A]">
            <span>صفحه اصلی</span>
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
            {categoryChips.map((c) => (
              <CategoryChip
                key={c.id}
                label={c.label}
                icon={c.icon}
                selected={activeChip === c.id}
                onClick={() => setActiveChip(c.id)}
              />
            ))}
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
            <FiltersPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
