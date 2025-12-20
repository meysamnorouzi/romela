'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import svgPaths from './imports/svg-efqwtho29q'
import {
  imgMockupAtfXlBackgroundRemoved,
  imgImage1,
  imgImage2,
  imgImage9,
} from './imports/image-placeholders'

import { getWcaPrimaryImageUrl } from '@/lib/api/wca'
import type { WcaProduct, WcaProductsListResponse, WcaRelatedProductsResponse } from '@/lib/api/types'
import { stripHtml } from '@/lib/utils/text'
import { extractBrands, extractStandard, extractVariantsFromFirstHtmlTable, extractViscosity } from '@/lib/utils/wca'

// Divider Component (kept identical)
function Divider() {
  return (
    <div className="w-full h-px my-8 md:my-12 lg:my-16">
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

export function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter()

  const [product, setProduct] = useState<WcaProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<WcaProduct[]>([])
  const [loading, setLoading] = useState(true)

  const WP_JSON_BASE_URL = (
    process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    'https://padradarasoil.com/wp-json'
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
    const categoryName = product.categories?.[0]?.name || 'محصولات'
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
    const datasheetText = stripHtml(product.description || '').slice(520, 1100) || ' '
    const galleryText = stripHtml(product.description || '').slice(1100, 1650) || ' '
    const similarText = stripHtml(product.description || '').slice(1650, 2050) || ' '

    const variants = extractVariantsFromFirstHtmlTable(product.description || '')
    const badgeStandard = extractStandard(fullText) || categoryName
    const badgeVolume = variants[0]?.volume || ''

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

    const techRows = [
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
        value: (product.categories ?? []).map((c) => c.name).filter(Boolean).join(', ') || '—',
        method: '—',
      },
    ]

    return {
      primaryImage,
      categoryName,
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
    }
  }, [product])

  if (loading && !product) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen w-full">
        <div className="px-8 sm:px-12 lg:px-16 xl:px-24 py-8 md:py-12 lg:py-16 pb-8 pt-56" />
      </div>
    )
  }

  if (!product || !computed) return null

  const related1 = relatedProducts[0]
  const related2 = relatedProducts[1]
  const related3 = relatedProducts[2]

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full pt-40">
      {/* Container */}
      <div className="px-8 sm:px-12 lg:px-16 xl:px-24 py-8 md:py-12 lg:py-16 pb-8 pt-56">
        {/* Breadcrumb */}
        <div className="mb-6 md:mb-16">
          <div className="flex items-center gap-2 text-right justify-start">
            <span className=" text-[#717171] text-lg" dir="auto">
              {computed.categoryName}
            </span>
            <span className=" text-[#717171] text-lg"> / </span>
            <span className=" text-[#717171] text-lg" dir="auto">
              محصولات
            </span>
            <span className=" text-[#717171] text-lg"> / </span>
            <span className=" text-[#F58F4A] text-lg" dir="auto">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Header Section */}
        <div className="w-full mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="w-full lg:w-1/2 bg-[#343434] rounded-3xl flex items-center justify-center">
              <div className="relative w-full max-w-72">
                <img
                  alt=""
                  className="w-full object-contain pointer-events-none"
                  src={computed.primaryImage}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className='flex gap-4 flex-wrap items-center'>

                {/* Product Title */}
                <h1 className=" text-base text-[#FCFBEE] text-right" dir="auto">
                  {product.name}
                </h1>
                {/* Badges */}
                <div className="flex gap-4">
                  <div className="bg-[#f9bd65] px-6 py-2 rounded-[120px]">
                    <span className=" text-black text-base" dir="auto">
                      {computed.badgeStandard}
                    </span>
                  </div>
                  {computed.badgeVolume ? (
                    <div className="bg-[#65cdf9] px-6 py-2 rounded-[120px]">
                      <span className=" text-black text-base" dir="auto">
                        {computed.badgeVolume}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Product Description */}
              <p
                className="text-base md:text-lg text-[#fcfbee] text-right leading-relaxed"
                dir="auto"
              >
                {computed.descriptionText || ' '}
              </p>

              {/* Product Specs */}
              <div
                className=" text-base md:text-lg text-[#f58f4a] text-right"
                dir="auto"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span>استاندارد: </span>
                    <span className="font-['IRANSansX:Black',sans-serif]">{computed.standard || '—'}</span>
                  </li>
                  <li>
                    <span>ویسکوزیته: </span>
                    <span className="font-['IRANSansX:Black',sans-serif]">{computed.viscosity || '—'}</span>
                  </li>
                  <li>
                    برند های قابل استفاده:{' '}
                    <span className="font-['IRANSansX:Black',sans-serif]">
                      {computed.brands.length ? computed.brands.join(', ') : '—'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span
                  className=" text-2xl text-[#fcfbee] text-right"
                  dir="auto"
                >
                  قیمت
                </span>
                <span
                  className="font-['IRANSansX:Black',sans-serif] text-3xl md:text-4xl text-[#fcfbee] text-right"
                  dir="auto"
                >
                  {computed.priceText}{' '}
                  <span className="">تومان</span>
                </span>
              </div>

              {/* Stock Counter */}
              <div className="flex items-center gap-4">
                <div className="bg-[rgba(255,255,255,0.12)] flex items-center justify-center gap-6 h-[59px] px-4 rounded-[120px] max-w-[239px]">
                  <button className="size-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 13H5V11H11V5H13V11L19 11V13L13 13L13 19H11L11 13Z" fill="#A7A7A7" />
                    </svg>

                  </button>
                  <div className="bg-[#686868] flex items-center justify-center h-[43px] px-4 rounded-[120px] min-w-[86px]">
                    <span className="font-['SF_Pro:Medium',sans-serif] text-[#d2d2d2] text-sm">1</span>
                  </div>
                  <button className="size-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 13V11L18 11V13L6 13Z" fill="#A7A7A7" />
                    </svg>

                  </button>
                </div>
                <p className=" text-base text-[#fcfbee] text-right" dir="auto">
                  <span>تنها </span>
                  <span className="text-[#f58f4a]">{computed.stockCountText} عدد</span>
                  <span> در انبار باقی مانده!</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white flex items-center justify-center h-[56px] px-8 rounded-[70px] flex-1 sm:flex-none">
                  <span className=" text-black text-base" dir="auto">
                    افزودن به سبد
                  </span>
                </button>
                <button className="border border-white flex items-center justify-center h-[56px] px-8 rounded-[70px] flex-1 sm:flex-none">
                  <span className=" text-white text-base" dir="auto">
                    ثبت سفارش
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Introduction Section */}
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-[34px]lg:text-[34px]  text-white  mb-8 md:mb-12" dir="auto">
            معرفی {product.name}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            <div className="w-full lg:w-1/2">
              <p className=" text-lg text-white text-right leading-10" dir="auto">
                {computed.introText}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <button className="bg-[#FDBA74] flex items-center gap-2 h-[56px] px-6 rounded-[70px]">
                  <div className="size-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12.5H10V10.5H11C11.2833 10.5 11.5208 10.4042 11.7125 10.2125C11.9042 10.0208 12 9.78333 12 9.5V8.5C12 8.21667 11.9042 7.97917 11.7125 7.7875C11.5208 7.59583 11.2833 7.5 11 7.5H9V12.5ZM10 9.5V8.5H11V9.5H10ZM13 12.5H15C15.2833 12.5 15.5208 12.4042 15.7125 12.2125C15.9042 12.0208 16 11.7833 16 11.5V8.5C16 8.21667 15.9042 7.97917 15.7125 7.7875C15.5208 7.59583 15.2833 7.5 15 7.5H13V12.5ZM14 11.5V8.5H15V11.5H14ZM17 12.5H18V10.5H19V9.5H18V8.5H19V7.5H17V12.5ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z" fill="black" />
                    </svg>
                  </div>
                  <span className=" text-black text-base" dir="auto">
                    دانلود دیتا شیت
                  </span>
                </button>
                <button className="bg-[#FDBA74] flex items-center gap-2 h-[56px] px-6 rounded-[70px]">
                  <div className="size-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="black" />
                    </svg>
                  </div>
                  <span className=" text-black text-base" dir="auto">
                    دانلود کاتالوگ
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative bg-[#343434] rounded-3xl p-8 md:p-12">


                <div className="relative w-full h-[256px] md:h-[300px] flex items-center justify-center">
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
        <section className="w-full mb-12 md:mb-16">
          <h2 className="text-2xl md:text-[34px] lg:text-[34px]  text-white  mb-8 md:mb-12" dir="auto">
            مدل های مختلف  این محصول
          </h2>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="bg-[#242424] rounded-t-3xl p-4">
                <div className="grid grid-cols-4 gap-4 text-right">

                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    نام محصول
                  </div>
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    حجم
                  </div>
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    قیمت
                  </div>
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    تصویر محصول
                  </div>
                </div>
              </div>

              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={clsx(
                    idx === 0 ? 'bg-[rgba(249,189,101,0.4)]' : 'bg-[#161616]',
                    'border border-[#3b3b3b]',
                    idx === 2 ? 'rounded-b-3xl' : '',
                    'p-4'
                  )}
                >
                  <div className="grid grid-cols-4 gap-4 items-center text-right">

                    <div className='text-center'>
                      <p className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg" dir="auto">
                        {computed.variants[idx]?.name || product.name}
                      </p>
                      {idx === 0 ? (
                        <p className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-base mt-1" dir="auto">
                          (انتخاب شده)
                        </p>
                      ) : null}
                    </div>
                    <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                      {computed.variants[idx]?.volume || '—'}
                    </div>
                    <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                      {computed.variants[idx]?.priceText || '—'}
                    </div>
                    <div className="flex justify-center">
                      <div className="relative w-[99px] h-[175px]">
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                          src={computed.variants[idx]?.imageUrl || computed.primaryImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Data Sheet Section */}
        <section className="w-full mb-12 md:mb-16">
          <div className="flex  gap-4 items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-[34px] lg:text-[34px]  text-white" dir="auto">
              دیتاشیت محصول
            </h2>
            <button className="bg-[#FDBA74] flex items-center gap-2 h-[56px] px-6 rounded-[70px]">
              <div className="size-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12.5H10V10.5H11C11.2833 10.5 11.5208 10.4042 11.7125 10.2125C11.9042 10.0208 12 9.78333 12 9.5V8.5C12 8.21667 11.9042 7.97917 11.7125 7.7875C11.5208 7.59583 11.2833 7.5 11 7.5H9V12.5ZM10 9.5V8.5H11V9.5H10ZM13 12.5H15C15.2833 12.5 15.5208 12.4042 15.7125 12.2125C15.9042 12.0208 16 11.7833 16 11.5V8.5C16 8.21667 15.9042 7.97917 15.7125 7.7875C15.5208 7.59583 15.2833 7.5 15 7.5H13V12.5ZM14 11.5V8.5H15V11.5H14ZM17 12.5H18V10.5H19V9.5H18V8.5H19V7.5H17V12.5ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z" fill="black" />
                </svg>
              </div>
              <span className=" text-black text-base" dir="auto">
                دانلود دیتا شیت
              </span>
            </button>
          </div>
          <div className="mb-8">
            <p className=" text-lg md:text-[18px] text-white text-right leading-relaxed mb-14" dir="auto">
              {computed.datasheetText}
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="bg-[#202020] rounded-t-3xl p-4">
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    ویژگی (Property)
                  </div>
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    مقدار (Typical Value)
                  </div>
                  <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                    استاندارد/روش آزمون
                  </div>
                </div>
              </div>

              {computed.techRows.map((row, i) => (
                <div
                  key={row.property}
                  className={`bg-[#161616] border border-[#3b3b3b] p-4 ${i === computed.techRows.length - 1 ? 'rounded-b-3xl' : ''}`}
                >
                  <div className="grid grid-cols-3 gap-4 text-right">
                    <div className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg text-center" dir="auto">
                      {row.property}
                    </div>
                    <div className=" text-[#f9bd65] text-lg text-center" dir="auto">
                      {row.value}
                    </div>
                    <div className="font-['IRANSansX:Black',sans-serif] text-[#f9bd65] text-lg text-center" dir="auto">
                      {row.method}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-14">
            <p className=" text-lg md:text-[18px] text-white text-right leading-relaxed" dir="auto">
              {computed.datasheetText}
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="w-full mb-12 md:mb-16">
          <div className="relative bg-[#222] rounded-3xl shadow-lg overflow-hidden flex items-center justify-between pr-12 gap-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white text-center mb-8 md:mb-12 flex-shrink-0" dir="auto">
              تصویر محصول
            </h2>
            <div className="bg-[#2c2c2c] rounded-3xl p-8 md:p-12 flex-grow">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  src={'/images/detail.png'}
                />
              </div>
            </div>
          </div>

          <p className=" text-lg md:text-xl text-white text-right mt-14 leading-10" dir="auto">
            {computed.galleryText}
          </p>
        </section>
        <Divider />
        {/* Similar Products Section */}
        <section className="w-full mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl  text-white text-right mb-6" dir="auto">
                محصولا مشابه
              </h2>
              <p className=" text-base md:text-lg text-white text-right leading-relaxed" dir="auto">
                {computed.similarText}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full mb-4">
                    <h3 className=" text-[#f9bd65] text-base" dir="auto">
                      {related1?.name || ' '}
                    </h3>
                    <div className="relative w-full h-full">
                      <img
                        alt=""
                        className="w-full h-full object-contain pointer-events-none"
                        src={(related1 && getWcaPrimaryImageUrl(related1)) || computed.primaryImage}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full mb-4">
                    <h3 className=" text-[#f9bd65] text-base" dir="auto">
                      {related2?.name || ' '}
                    </h3>
                    <div className="relative w-full h-full">
                      <img
                        alt=""
                        className="w-full h-full object-contain pointer-events-none"
                        src={(related2 && getWcaPrimaryImageUrl(related2)) || imgImage1.src}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.16)] border border-white rounded-3xl p-4 text-center">
                  <div className="relative w-full mb-4">
                  <h3 className="text-[#f9bd65] text-base" dir="auto">
                        {related3?.name || ' '}
                      </h3>
                    <div className="relative w-full h-full">
                      <img
                        alt=""
                        className="w-full h-full object-contain pointer-events-none"
                        src={(related3 && getWcaPrimaryImageUrl(related3)) || imgImage2.src}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

