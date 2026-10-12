'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function scrollToTop() {
  const scrollingElement = document.scrollingElement
  if (scrollingElement) scrollingElement.scrollTop = 0
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document.querySelector('.site-shell')?.scrollTo(0, 0)
}

/**
 * Next.js skips its own scroll reset when the header is fixed, and iPhone
 * Safari restores the previous offset after that reset. Keep forcing the top
 * until the user actually scrolls.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let userMoved = false
    const markUserMoved = () => {
      userMoved = true
    }

    const reset = () => {
      if (userMoved) return
      const active = document.activeElement
      if (active instanceof HTMLAnchorElement) active.blur()
      scrollToTop()
    }

    reset()
    const frame = requestAnimationFrame(reset)
    const timers = [0, 50, 150, 400].map((delay) => window.setTimeout(reset, delay))

    window.addEventListener('touchstart', markUserMoved, { passive: true })
    window.addEventListener('wheel', markUserMoved, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
      window.removeEventListener('touchstart', markUserMoved)
      window.removeEventListener('wheel', markUserMoved)
    }
  }, [pathname])

  return null
}
