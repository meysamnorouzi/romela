import type {
  WebsitePost,
  WebsitePostsListResponse,
  WebsitePostsSearchResponse,
  WebsiteTermsListResponse,
  WebsiteTerm,
} from './types'

const WP_JSON_BASE_URL = (
  process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
  // Backwards-compat if you previously used NEXT_PUBLIC_WORDPRESS_URL
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  'https://padradarasoil.com/wp-json'
).replace(/\/+$/, '')

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

function buildUrl(path: string, query?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${WP_JSON_BASE_URL}/${path.replace(/^\/+/, '')}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue
      url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

async function fetchJson<T>(
  path: string,
  options?: {
    query?: Record<string, string | number | boolean | undefined>
  }
): Promise<T> {
  const response = await fetch(buildUrl(path, options?.query), {
    headers: {
      Accept: 'application/json',
    },
    // Static export (SSG): cacheable at build-time
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`)
  }

  return response.json() as Promise<T>
}

function normalizeTerm(raw: WebsiteTerm): WebsiteTerm {
  return {
    ...raw,
    id: toNumber(raw.id) ?? raw.id,
  }
}

function normalizePost(raw: WebsitePost): WebsitePost {
  return {
    ...raw,
    id: toNumber(raw.id) ?? raw.id,
    date_unix: toNumber(raw.date_unix) ?? raw.date_unix,
    comment_count: toNumber(raw.comment_count) ?? raw.comment_count,
    categories: raw.categories?.map(normalizeTerm),
    tags: raw.tags?.map(normalizeTerm),
    author: raw.author
      ? {
          ...raw.author,
          id: raw.author.id,
        }
      : undefined,
  }
}

function normalizeListResponse<T extends { total: number | string; per_page: number | string }>(
  raw: T
): Omit<T, 'total' | 'per_page'> & { total: number; per_page: number } {
  return {
    ...raw,
    total: toNumber(raw.total) ?? 0,
    per_page: toNumber(raw.per_page) ?? 10,
  }
}

export async function getBlogPosts(params?: {
  per_page?: number
  page?: number
  id?: number
  slug?: string
  category_id?: number
  category_ids?: string
  category_slug?: string
  category_slugs?: string
  category_name?: string
  category_names?: string
  tag_id?: number
  tag_ids?: string
  tag_slug?: string
  tag_slugs?: string
  tag_name?: string
  tag_names?: string
}): Promise<WebsitePostsListResponse> {
  const raw = await fetchJson<WebsitePostsListResponse>('website/v1/post-list', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      id: params?.id,
      slug: params?.slug,
      category_id: params?.category_id,
      category_ids: params?.category_ids,
      category_slug: params?.category_slug,
      category_slugs: params?.category_slugs,
      category_name: params?.category_name,
      category_names: params?.category_names,
      tag_id: params?.tag_id,
      tag_ids: params?.tag_ids,
      tag_slug: params?.tag_slug,
      tag_slugs: params?.tag_slugs,
      tag_name: params?.tag_name,
      tag_names: params?.tag_names,
    },
  })

  const normalized = normalizeListResponse(raw)
  return {
    ...normalized,
    posts: (normalized.posts ?? []).map(normalizePost),
  }
}

export async function searchBlogPosts(params: {
  q: string
  per_page?: number
  page?: number
  category_slug?: string
  tag_slug?: string
}): Promise<WebsitePostsSearchResponse> {
  const raw = await fetchJson<WebsitePostsSearchResponse>('website/v1/post-search', {
    query: {
      q: params.q,
      per_page: params.per_page,
      page: params.page,
      category_slug: params.category_slug,
      tag_slug: params.tag_slug,
    },
  })

  const normalized = normalizeListResponse(raw)
  return {
    ...normalized,
    query: raw.query,
    posts: (raw.posts ?? []).map(normalizePost),
  }
}

export async function getBlogPostBySlug(slug: string): Promise<WebsitePost | null> {
  try {
    if (!slug || !slug.trim()) {
      console.error('Empty slug provided to getBlogPostBySlug')
      return null
    }

    // The slug should already be decoded (from Next.js params)
    // But handle both cases: if it contains % it might be encoded, otherwise it's decoded
    let finalSlug = slug.trim()
    
    // Check if slug is URL-encoded (contains %)
    if (slug.includes('%')) {
      try {
        finalSlug = decodeURIComponent(slug)
      } catch (e) {
        // If decoding fails, use original
        finalSlug = slug
      }
    }
    
    // Encode the slug for the API URL path
    const encoded = encodeURIComponent(finalSlug)
    const apiPath = `website/v1/post-by-slug/${encoded}`
    
    console.log('🔍 Fetching blog post:')
    console.log('  Original slug:', slug)
    console.log('  Final slug:', finalSlug)
    console.log('  Encoded slug:', encoded)
    console.log('  API path:', apiPath)
    
    // Use buildUrl helper to ensure consistent base URL from env
    const fullUrl = buildUrl(apiPath)
    console.log('  Full URL:', fullUrl)
    
    // Determine if this is a client-side or server-side call
    // In browser, we want no-store. On server (build time), we want force-cache
    const isClient = typeof window !== 'undefined'
    const cacheMode: RequestCache = isClient ? 'no-store' : 'force-cache'
    
    const response = await fetch(fullUrl, {
      headers: {
        Accept: 'application/json',
      },
      cache: cacheMode,
    })

    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status} ${response.statusText}`)
      console.error(`   URL: ${fullUrl}`)
      throw new Error(`Request failed (${response.status}) for ${apiPath}`)
    }

    const raw = await response.json() as WebsitePost
    console.log('✅ Blog post fetched successfully:', raw.title || 'No title')
    
    return normalizePost(raw)
  } catch (error) {
    console.error('❌ Error fetching blog post by slug:', error)
    console.error('   Slug that failed:', slug)
    if (error instanceof Error) {
      console.error('   Error message:', error.message)
    }
    return null
  }
}

export async function getBlogCategories(params?: {
  per_page?: number
  page?: number
  hide_empty?: boolean
  posts_per_category?: number
}): Promise<{ total: number; page: number; per_page: number; categories: WebsiteTerm[] }> {
  const raw = await fetchJson<WebsiteTermsListResponse>('website/v1/categories', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      hide_empty: params?.hide_empty,
      posts_per_category: params?.posts_per_category,
    },
  })

  const normalized = normalizeListResponse(raw)
  return {
    total: normalized.total,
    page: normalized.page,
    per_page: normalized.per_page,
    categories: (raw.categories ?? []).map(normalizeTerm),
  }
}

export async function getBlogTags(params?: {
  per_page?: number
  page?: number
  hide_empty?: boolean
  posts_per_tag?: number
}): Promise<{ total: number; page: number; per_page: number; tags: WebsiteTerm[] }> {
  const raw = await fetchJson<WebsiteTermsListResponse>('website/v1/tags', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      hide_empty: params?.hide_empty,
      posts_per_tag: params?.posts_per_tag,
    },
  })

  const normalized = normalizeListResponse(raw)
  return {
    total: normalized.total,
    page: normalized.page,
    per_page: normalized.per_page,
    tags: (raw.tags ?? []).map(normalizeTerm),
  }
}

export function getPublishedDate(post: WebsitePost): Date | null {
  if (post.date_unix) return new Date(post.date_unix * 1000)
  if (post.date_full) {
    const d = new Date(post.date_full.replace(' ', 'T'))
    if (!Number.isNaN(d.getTime())) return d
  }
  if (post.date) {
    const d = new Date(post.date)
    if (!Number.isNaN(d.getTime())) return d
  }
  return null
}

export function getModifiedDate(post: WebsitePost): Date | null {
  if (post.modified_date) {
    const d = new Date(post.modified_date.replace(' ', 'T'))
    if (!Number.isNaN(d.getTime())) return d
  }
  return getPublishedDate(post)
}
