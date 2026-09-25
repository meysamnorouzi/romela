/**
 * Shared top spacing for pages with a main title (h1).
 * Uses CSS classes in globals.css (header offset + 1rem extra) so spacing works
 * even when classes are composed in this file (Tailwind must scan lib/ too).
 * Do not use on home or full-bleed pages without a page title (e.g. contact-us).
 */

export const PAGE_SHELL_CLASS =
  'relative w-full max-w-[1920px] mx-auto xl:px-8 2xl:px-16'

/** Page background. Do not use negative margins — they shift content in RTL when the shell clips overflow. */
export const PAGE_BLEED_CLASS =
  'bg-[#0e0e0e] min-h-screen w-full relative'

/** about-us, products list, blog list, category / subcategory, sales-conditions, dealers */
export const PAGE_TITLE_TOP_CLASS = `${PAGE_SHELL_CLASS} page-title-offset`

/** @deprecated Use PAGE_TITLE_TOP_CLASS — same header-safe offset */
export const PAGE_TITLE_TOP_COMPACT_CLASS = PAGE_TITLE_TOP_CLASS

/** product detail, blog detail */
export const PAGE_TITLE_TOP_DETAIL_CLASS = `${PAGE_SHELL_CLASS} page-title-offset-detail`

/** cart, checkout, error, not-found */
export const PAGE_TITLE_TOP_SIMPLE_CLASS =
  'page-title-offset-simple pb-6 sm:pb-8 md:pb-12'

export const PAGE_BOTTOM_PADDING_STYLE = {
  paddingBottom: 'clamp(2rem, 6.25vw, 5rem)',
} as const

export const PAGE_BOTTOM_PADDING_TALL_STYLE = {
  paddingBottom: 'clamp(3rem, 10.42vw, 5rem)',
} as const
