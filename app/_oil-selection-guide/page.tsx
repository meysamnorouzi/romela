'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getPsgBrands,
  getPsgModels,
  getPsgResults,
  getPsgVehicleTypes,
  getPsgYears,
} from '@/lib/api/selection-guide'
import type { PsgGuideCategoryGroup, PsgGuideResultsResponse } from '@/lib/api/types'
import { getWcaPrimaryImageUrl } from '@/lib/api/wca'
import { stripHtml } from '@/lib/utils/text'
import { LoadingSpinner } from '@/components/ui/Loading'
import { PAGE_BOTTOM_PADDING_TALL_STYLE, PAGE_TITLE_TOP_CLASS } from '@/lib/page-layout'

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  id,
  disabled = false,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  id: string
  disabled?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (disabled) setIsOpen(false)
  }, [disabled])

  return (
    <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={dropdownRef}>
      <div
        className="relative rounded-[70px] border border-white/30 flex items-center cursor-pointer transition-all hover:opacity-90 bg-[#343434]"
        style={{ height: 'clamp(3rem, 3.75vw, 3.375rem)', paddingLeft: '1rem', paddingRight: '1rem' }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="text-white text-right flex-1 text-base font-semibold" dir="auto">
          {value || label}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ width: '1.25rem', height: '1.25rem' }}
        >
          <path d="M7 10L12 15L17 10H7Z" fill="white" />
        </svg>
      </div>
      {isOpen && options.length > 0 && (
        <div
          className="absolute top-full w-full rounded-2xl border border-white/20 overflow-hidden z-50 max-h-60 overflow-y-auto"
          style={{
            background: 'rgb(52 52 52 / 95%)',
            backdropFilter: 'blur(10px)',
            marginTop: '0.5rem',
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer hover:bg-white/10 transition-colors text-right px-4 py-3 text-white text-sm"
              dir="auto"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GuideProductCard({
  name,
  slug,
  image,
}: {
  name: string
  slug: string
  image: string
}) {
  return (
    <Link
      href={`/products/${slug}`}
      className="block shrink-0 w-full max-w-[220px] sm:max-w-[260px]"
    >
      <div
        className="relative bg-[#343434] rounded-[24px] w-full flex items-center justify-center"
        style={{ height: '220px', minHeight: '200px' }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-contain"
            style={{
              height: 'calc(100% + 4rem)',
              marginTop: '-4rem',
              maxWidth: '88%',
            }}
          />
        ) : (
          <LoadingSpinner size="md" />
        )}
      </div>
      <div className="mt-3 w-full flex justify-center">
        <div className="bg-[#e6a816ca] rounded-[120px] px-4 py-3 w-[92%] text-center">
          <p className="text-[#FCFBEE] text-sm font-bold truncate" dir="auto">
            {name}
          </p>
        </div>
      </div>
    </Link>
  )
}

function CategorySection({ group }: { group: PsgGuideCategoryGroup }) {
  return (
    <section className="mb-12 md:mb-16">
      <h3
        className="text-[#E6A816] font-bold font-iranyekan text-lg sm:text-xl mb-6"
        dir="auto"
      >
        {group.name}
      </h3>
      <div className="flex flex-col gap-8">
        {group.products.map((item, index) => {
          const image = getWcaPrimaryImageUrl(item.product) || ''
          const desc = stripHtml(
            item.description ||
              item.product.short_description ||
              item.product.description ||
              ''
          ).slice(0, 320)
          const lines = desc.split(/\n/).filter(Boolean).slice(0, 4)
          const displayText = lines.length > 0 ? lines.join('\n') : '—'

          return (
            <div
              key={`${item.product.id}-${index}`}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-10 border-b border-white/10 pb-8 last:border-0"
              dir="rtl"
            >
              <div className="flex justify-center sm:justify-end shrink-0">
                <GuideProductCard
                  name={item.product.name}
                  slug={item.product.slug}
                  image={image}
                />
              </div>
              <div className="flex-1 text-right min-w-0">
                <p
                  className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-line line-clamp-4"
                  dir="auto"
                >
                  {displayText}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function OilSelectionGuidePage() {
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])

  const [vehicleType, setVehicleType] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')

  const [loadingFilters, setLoadingFilters] = useState(true)
  const [loadingBrands, setLoadingBrands] = useState(false)
  const [loadingModels, setLoadingModels] = useState(false)
  const [loadingYears, setLoadingYears] = useState(false)

  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<PsgGuideResultsResponse | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    let cancelled = false
    getPsgVehicleTypes()
      .then((items) => {
        if (!cancelled) setVehicleTypes(items)
      })
      .catch(() => {
        if (!cancelled) setVehicleTypes([])
      })
      .finally(() => {
        if (!cancelled) setLoadingFilters(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!vehicleType) {
      setBrands([])
      setBrand('')
      return
    }
    let cancelled = false
    setLoadingBrands(true)
    setBrand('')
    setModel('')
    setYear('')
    getPsgBrands(vehicleType)
      .then((items) => {
        if (!cancelled) setBrands(items)
      })
      .catch(() => {
        if (!cancelled) setBrands([])
      })
      .finally(() => {
        if (!cancelled) setLoadingBrands(false)
      })
    return () => {
      cancelled = true
    }
  }, [vehicleType])

  useEffect(() => {
    if (!vehicleType || !brand) {
      setModels([])
      setModel('')
      return
    }
    let cancelled = false
    setLoadingModels(true)
    setModel('')
    setYear('')
    getPsgModels(vehicleType, brand)
      .then((items) => {
        if (!cancelled) setModels(items)
      })
      .catch(() => {
        if (!cancelled) setModels([])
      })
      .finally(() => {
        if (!cancelled) setLoadingModels(false)
      })
    return () => {
      cancelled = true
    }
  }, [vehicleType, brand])

  useEffect(() => {
    if (!vehicleType || !brand || !model) {
      setYears([])
      setYear('')
      return
    }
    let cancelled = false
    setLoadingYears(true)
    setYear('')
    getPsgYears(vehicleType, brand, model)
      .then((items) => {
        if (!cancelled) setYears(items)
      })
      .catch(() => {
        if (!cancelled) setYears([])
      })
      .finally(() => {
        if (!cancelled) setLoadingYears(false)
      })
    return () => {
      cancelled = true
    }
  }, [vehicleType, brand, model])

  const canSearch = Boolean(vehicleType && brand && model && year)

  const handleSearch = useCallback(async () => {
    if (!canSearch) return
    setSearching(true)
    setSearchError(null)
    setHasSearched(true)
    try {
      const data = await getPsgResults(vehicleType, brand, model, year)
      setResults(data)
    } catch {
      setResults(null)
      setSearchError('خطا در دریافت نتایج. لطفاً دوباره تلاش کنید.')
    } finally {
      setSearching(false)
    }
  }, [canSearch, vehicleType, brand, model, year])

  const summaryLines =
    results?.categories.map((cat) => `${cat.name} ${brand} ${model} ${year}`) ?? []

  return (
    <div className="bg-[#0e0e0e] min-h-screen w-full relative xl:px-0 2xl:px-6 sm:px-6 -mx-4 sm:-mx-6">
      <div className={PAGE_TITLE_TOP_CLASS} style={PAGE_BOTTOM_PADDING_TALL_STYLE}>
        <h1
          className="text-center text-white font-bold tracking-wide font-iranyekan text-xl sm:text-[2.125rem] mb-6 md:mb-10"
          dir="auto"
        >
          راهنمای انتخاب روغن خودرو
        </h1>

        <div className="flex justify-start mb-8 md:mb-12">
          <div className="font-bold text-[#9A9A9A] text-base">
            <Link href="/" className="hover:text-[#717171]">
              صفحه اصلی
            </Link>
            <span className="mx-3">/</span>
            <span className="text-[#F58F4A]">راهنمای انتخاب روغن</span>
          </div>
        </div>

        <div
          className="rounded-3xl border border-white/10 mb-10 md:mb-14 p-6 md:p-10"
          style={{ background: 'rgba(52, 52, 52, 0.6)' }}
        >
          <p className="text-white/90 text-justify leading-relaxed mb-8 text-sm sm:text-base" dir="rtl">
            برای یافتن روغن‌های پیشنهادی متناسب با خودروی خود، ابتدا{' '}
            <strong className="text-[#E6A816]">نوع خودرو</strong> را انتخاب کنید؛ سپس{' '}
            <strong className="text-[#E6A816]">برند</strong>،{' '}
            <strong className="text-[#E6A816]">مدل</strong> و{' '}
            <strong className="text-[#E6A816]">سال ساخت</strong> را از فهرست‌های وابسته به هم مشخص
            نمایید. پس از کلیک روی «جستجو»، محصولات پیشنهادی به تفکیک دسته‌بندی (مانند روغن موتور،
            روغن گیربکس و …) نمایش داده می‌شوند.
          </p>

          {loadingFilters ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <FilterDropdown
                id="vehicleType"
                label="نوع خودرو"
                options={vehicleTypes}
                value={vehicleType}
                onChange={setVehicleType}
              />
              <FilterDropdown
                id="brand"
                label="برند"
                options={brands}
                value={brand}
                onChange={setBrand}
                disabled={!vehicleType || loadingBrands}
              />
              <FilterDropdown
                id="model"
                label="مدل"
                options={models}
                value={model}
                onChange={setModel}
                disabled={!brand || loadingModels}
              />
              <FilterDropdown
                id="year"
                label="سال"
                options={years}
                value={year}
                onChange={setYear}
                disabled={!model || loadingYears}
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!canSearch || searching}
              className="rounded-[120px] bg-[#E6A81699] px-8 py-3 text-[#fcfbee] font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              dir="auto"
            >
              {searching ? 'در حال جستجو...' : 'جستجو محصولات پیشنهادی'}
            </button>
          </div>

          {hasSearched && summaryLines.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
              {summaryLines.map((line) => (
                <p key={line} className="text-[#E6A816] font-bold text-base sm:text-lg" dir="auto">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {searching && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {searchError && (
          <p className="text-center text-red-400 py-8" dir="auto">
            {searchError}
          </p>
        )}

        {!searching && hasSearched && !searchError && results && results.categories.length === 0 && (
          <p className="text-center text-white/70 py-12 text-lg" dir="auto">
            برای ترکیب انتخاب‌شده محصولی ثبت نشده است. لطفاً گزینه دیگری را امتحان کنید یا با پشتیبانی
            تماس بگیرید.
          </p>
        )}

        {!searching &&
          results?.categories.map((group) => <CategorySection key={group.name} group={group} />)}
      </div>
    </div>
  )
}
