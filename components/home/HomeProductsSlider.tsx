'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ProductListImage } from '@/components/product/ProductListImage'
import { getWcaPrimaryImageUrl } from '@/lib/api/wca'
import { getVolumeFromAttributes, getStandardFromAttributes } from '@/lib/utils/wca'
import type { WcaProduct } from '@/lib/api/types'

const AUTOPLAY_DELAY = 4200
const ANIMATION_MS = 680
const IMAGE_HEADROOM = '6.5rem'

type Layout = {
  cols: number
  gap: number
  slideWidth: number
  overflows: boolean
}

function columnsFor(width: number) {
  if (width >= 1024) return 4
  if (width >= 640) return 2
  return 1
}

function gapFor(width: number) {
  return Math.min(32, Math.max(12, width * 0.0156))
}

function mod(index: number, count: number) {
  return ((index % count) + count) % count
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// The scroller is forced to LTR so Safari, Chrome, and Firefox share one
// scroll origin. Slides are laid out reversed: products[0] sits on the right.
function scrollLeftFor(index: number, layout: Layout, count: number, clientWidth: number) {
  const stride = layout.slideWidth + layout.gap
  const setWidth = count * stride
  const base = 2 * setWidth - layout.gap - clientWidth
  return base - index * stride
}

function ProductNameWithTooltip({ text, className }: { text: string; className?: string }) {
  const nameRef = useRef<HTMLParagraphElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (nameRef.current) {
      setShowTooltip(nameRef.current.scrollWidth > nameRef.current.clientWidth)
    }
  }, [text])

  return (
    <div className="relative group w-full">
      <p
        ref={nameRef}
        dir="auto"
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        className={`text-center font-bold ${className ?? ''}`}
      >
        {text}
      </p>
      {showTooltip && (
        <div className="absolute min-w-52 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#2a2a2a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-white/20 shadow-lg">
          {text}
        </div>
      )}
    </div>
  )
}

function ProductSlideCard({ product, eager }: { product: WcaProduct; eager?: boolean }) {
  const productImage = getWcaPrimaryImageUrl(product) || '/images/product-fallback.webp'
  const volume = getVolumeFromAttributes(product)
  const standard = getStandardFromAttributes(product)
  const standardText = standard ? `دارای استاندارد ${standard}` : null
  const hasVolumeOrStandard = volume || standard

  return (
    <Link href={`/products/${product.slug}`} className="relative block cursor-pointer" draggable={false}>
      <div
        className="relative flex w-full items-center justify-center rounded-[24px] bg-[#343434]"
        style={{ height: 'clamp(222px, 18.49vw, 355px)', minHeight: '222px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ProductListImage src={productImage} alt={product.name} loading={eager ? 'eager' : 'lazy'} />
        </div>
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-center" style={{ marginTop: 'clamp(-1.25rem, -2.6vw, -1.25rem)' }}>
        <div
          className="z-10 flex h-fit items-center justify-center rounded-[120px] bg-[#e6a816ca]"
          style={{ padding: 'clamp(1rem, 1.25vw, 1rem)', width: '90%' }}
        >
          <div className="relative w-full justify-center">
            <ProductNameWithTooltip text={product.name} className="text-sm text-[#FCFBEE]" />
          </div>
        </div>
        {hasVolumeOrStandard && (
          <div className="flex items-center rounded-full bg-[#DEDEDE] font-bold text-black" style={{ fontSize: 'clamp(0.875rem, 1.04vw, 1rem)' }}>
            {volume && (
              <p className="text-nowrap" style={{ padding: 'clamp(0.5rem, 0.63vw, 0.5rem) clamp(1rem, 1.25vw, 1rem)' }}>
                {volume}
              </p>
            )}
            {standard && (
              <p className="rounded-full bg-[#C3C3C3]" style={{ padding: 'clamp(0.5rem, 0.63vw, 0.5rem) clamp(1rem, 1.25vw, 1rem)' }}>
                <ProductNameWithTooltip text={standardText!} />
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HomeProductsSlider({ products }: { products: WcaProduct[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<Layout | null>(null)
  const indexRef = useRef(0)
  const targetIndexRef = useRef(0)
  const productsRef = useRef(products)
  const animRef = useRef<number | null>(null)
  const safetyRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const programmaticRef = useRef(false)
  const pauseReasons = useRef(new Set<string>())
  const reducedRef = useRef(false)
  const [layout, setLayout] = useState<Layout | null>(null)
  const [manualPaused, setManualPaused] = useState(false)

  productsRef.current = products
  layoutRef.current = layout

  const count = products.length
  const overflows = Boolean(layout?.overflows)
  const copies = overflows ? [0, 1, 2] : [0]
  const sequence = overflows ? [...products].reverse() : products

  const moveByRef = useRef<(steps: number) => void>(() => {})

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) window.clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  const cancelAnim = useCallback(() => {
    if (animRef.current != null) cancelAnimationFrame(animRef.current)
    animRef.current = null
    if (safetyRef.current != null) window.clearTimeout(safetyRef.current)
    safetyRef.current = null
    programmaticRef.current = false
    scrollerRef.current?.classList.remove('is-animating')
  }, [])

  const schedule = useCallback(() => {
    clearTimer()
    if (pauseReasons.current.size > 0) return
    if (!layoutRef.current?.overflows) return
    if (reducedRef.current) return
    if (productsRef.current.length <= 1) return
    timerRef.current = window.setTimeout(() => {
      moveByRef.current(1)
    }, AUTOPLAY_DELAY)
  }, [clearTimer])

  const setPause = useCallback((reason: string, on: boolean) => {
    if (on) pauseReasons.current.add(reason)
    else pauseReasons.current.delete(reason)
    if (reason === 'manual') setManualPaused(on)
    if (pauseReasons.current.size > 0) clearTimer()
    else schedule()
  }, [clearTimer, schedule])

  const moveBy = useCallback((steps: number) => {
    const el = scrollerRef.current
    const currentLayout = layoutRef.current
    const total = productsRef.current.length
    if (!el || !currentLayout?.overflows || total <= 1 || steps === 0) return

    cancelAnim()
    clearTimer()
    const normalized = mod(targetIndexRef.current, total)
    const destination = normalized + steps
    targetIndexRef.current = destination
    indexRef.current = normalized
    const target = scrollLeftFor(destination, currentLayout, total, el.clientWidth)
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      if (safetyRef.current != null) window.clearTimeout(safetyRef.current)
      safetyRef.current = null
      if (animRef.current != null) cancelAnimationFrame(animRef.current)
      animRef.current = null
      const done = mod(destination, total)
      targetIndexRef.current = done
      indexRef.current = done
      programmaticRef.current = true
      el.classList.add('is-animating')
      el.scrollLeft = scrollLeftFor(done, currentLayout, total, el.clientWidth)
      el.classList.remove('is-animating')
      programmaticRef.current = false
      schedule()
    }

    programmaticRef.current = true
    el.classList.add('is-animating')
    el.scrollLeft = scrollLeftFor(normalized, currentLayout, total, el.clientWidth)

    if (reducedRef.current || Math.abs(target - el.scrollLeft) <= 1) {
      finish()
      return
    }

    // Ease on animation frames. A timeout still lands on the slide if frames are paused
    // (background tabs, iOS low-power) so the controls never get stuck mid-move.
    const start = el.scrollLeft
    const delta = target - start
    const t0 = performance.now()
    const frame = (now: number) => {
      if (settled) return
      const t = Math.min(1, (now - t0) / ANIMATION_MS)
      el.scrollLeft = start + delta * easeInOutCubic(t)
      if (t < 1) animRef.current = requestAnimationFrame(frame)
      else finish()
    }
    animRef.current = requestAnimationFrame(frame)
    safetyRef.current = window.setTimeout(finish, ANIMATION_MS + 160)
  }, [cancelAnim, clearTimer, schedule])

  moveByRef.current = moveBy

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const measure = () => {
      const width = el.clientWidth
      if (width <= 0) return
      const cols = columnsFor(width)
      const gap = gapFor(width)
      const slideWidth = (width - gap * (cols - 1)) / cols
      const next: Layout = {
        cols,
        gap,
        slideWidth,
        overflows: productsRef.current.length > cols,
      }
      setLayout((prev) => {
        if (
          prev &&
          prev.cols === next.cols &&
          prev.overflows === next.overflows &&
          Math.abs(prev.gap - next.gap) < 0.25 &&
          Math.abs(prev.slideWidth - next.slideWidth) < 0.5
        ) {
          return prev
        }
        return next
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [count])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el || !layout) return
    cancelAnim()
    programmaticRef.current = false
    if (!layout.overflows) {
      indexRef.current = 0
      targetIndexRef.current = 0
      el.scrollLeft = 0
      return
    }
    const done = mod(indexRef.current, count)
    indexRef.current = done
    targetIndexRef.current = done
    programmaticRef.current = true
    el.scrollLeft = scrollLeftFor(done, layout, count, el.clientWidth)
    programmaticRef.current = false
  }, [layout, count, cancelAnim])

  useEffect(() => {
    const el = scrollerRef.current
    const root = rootRef.current
    if (!el || !root || !overflows) return

    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => {
      reducedRef.current = motionQuery.matches
      if (motionQuery.matches) setPause('motion', true)
      else setPause('motion', false)
    }
    if (motionQuery.matches) pauseReasons.current.add('motion')
    motionQuery.addEventListener('change', onMotion)

    const syncFromUser = () => {
      if (programmaticRef.current || animRef.current != null) return
      const currentLayout = layoutRef.current
      const total = productsRef.current.length
      if (!currentLayout?.overflows || total <= 0) return
      const stride = currentLayout.slideWidth + currentLayout.gap
      const setWidth = total * stride
      const base = 2 * setWidth - currentLayout.gap - el.clientWidth
      const raw = (base - el.scrollLeft) / stride
      const nearest = Math.round(raw)
      const done = mod(nearest, total)
      indexRef.current = done
      targetIndexRef.current = done
      const desired = scrollLeftFor(done, currentLayout, total, el.clientWidth)
      if (Math.abs(el.scrollLeft - desired) > 2) {
        programmaticRef.current = true
        el.classList.add('is-animating')
        el.scrollLeft = desired
        el.classList.remove('is-animating')
        programmaticRef.current = false
      }
    }

    let scrollTimer = 0
    const onScroll = () => {
      if (programmaticRef.current || animRef.current != null) return
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(syncFromUser, 120)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', syncFromUser)

    const onVisibility = () => setPause('hidden', document.visibilityState !== 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()

    const intersection = new IntersectionObserver(
      ([entry]) => setPause('offscreen', !entry?.isIntersecting),
      { threshold: 0.35 }
    )
    intersection.observe(root)

    schedule()

    return () => {
      clearTimer()
      window.clearTimeout(scrollTimer)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', syncFromUser)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotion)
      intersection.disconnect()
      pauseReasons.current.clear()
    }
  }, [overflows, clearTimer, schedule, setPause])

  const slideStyle = layout
    ? { flex: `0 0 ${layout.slideWidth}px`, width: layout.slideWidth, maxWidth: layout.slideWidth }
    : { flex: '0 0 100%', width: '100%', maxWidth: '100%' }

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ marginTop: 'clamp(1.25rem, 2.2vw, 2.75rem)' }}
      onMouseEnter={() => overflows && setPause('hover', true)}
      onMouseLeave={() => setPause('hover', false)}
      onFocusCapture={() => overflows && setPause('focus', true)}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setPause('focus', false)
      }}
      onPointerDown={(event) => {
        if (!overflows) return
        if (!(event.target as HTMLElement).closest('button')) cancelAnim()
        setPause('pointer', true)
      }}
      onPointerUp={() => setPause('pointer', false)}
      onPointerCancel={() => setPause('pointer', false)}
    >
      <div
        ref={scrollerRef}
        dir={overflows ? 'ltr' : 'rtl'}
        className="home-products-scroller no-scrollbar flex items-start"
        style={{
          gap: layout ? `${layout.gap}px` : '12px',
          overflowX: overflows ? 'auto' : 'hidden',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y',
          overscrollBehaviorX: 'contain',
          scrollBehavior: 'auto',
        }}
        aria-roledescription={overflows ? 'carousel' : undefined}
        aria-label="محصولات Romela Oil"
      >
        {copies.map((copy) =>
          sequence.map((product, index) => (
            <div
              key={`${copy}-${product.id}-${index}`}
              dir="rtl"
              data-home-slide=""
              className="home-product-slide min-w-0"
              style={slideStyle}
            >
              <div aria-hidden="true" style={{ height: IMAGE_HEADROOM }} />
              <ProductSlideCard
                product={product}
                eager={!overflows || (copy === 1 && index >= sequence.length - (layout?.cols ?? 1))}
              />
            </div>
          ))
        )}
      </div>

      {overflows && (
        <>
          <div
            className="absolute right-1.5 z-20 sm:right-3"
            style={{ top: `calc(${IMAGE_HEADROOM} + clamp(111px, 9.245vw, 177.5px))`, transform: 'translateY(-50%)' }}
          >
            <button
              type="button"
              className="flex touch-manipulation items-center justify-center rounded-full text-[#1a1203] shadow-[0_8px_22px_rgba(0,0,0,0.38)] transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9BD65]"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(230, 168, 22, 0.95)',
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="محصولات قبلی"
              onClick={() => moveBy(-(layout?.cols ?? 1))}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
          <div
            className="absolute left-1.5 z-20 sm:left-3"
            style={{ top: `calc(${IMAGE_HEADROOM} + clamp(111px, 9.245vw, 177.5px))`, transform: 'translateY(-50%)' }}
          >
            <button
              type="button"
              className="flex touch-manipulation items-center justify-center rounded-full text-[#1a1203] shadow-[0_8px_22px_rgba(0,0,0,0.38)] transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9BD65]"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(230, 168, 22, 0.95)',
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="محصولات بعدی"
              onClick={() => moveBy(layout?.cols ?? 1)}
            >
              <ArrowIcon direction="left" />
            </button>
          </div>
          <button
            type="button"
            className="sr-only"
            aria-pressed={manualPaused}
            onClick={() => setPause('manual', !manualPaused)}
          >
            {manualPaused ? 'پخش خودکار محصولات' : 'توقف حرکت خودکار محصولات'}
          </button>
        </>
      )}
    </div>
  )
}
