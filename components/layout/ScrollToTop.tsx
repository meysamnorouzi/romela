'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function scrollToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/**
 * Next.js skips its scroll reset when it sees a fixed header, so a new page
 * keeps the previous scroll offset. Reset on every route change.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    scrollToTop()
    const frame = requestAnimationFrame(scrollToTop)
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
