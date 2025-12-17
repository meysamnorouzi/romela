import type { WcaCategory, WcaProduct, WcaProductsListResponse, WcaCategoriesListResponse, WcaRelatedProductsResponse } from './types'

const WP_JSON_BASE_URL = (
  process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
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

function normalizeProductsList(raw: WcaProductsListResponse): WcaProductsListResponse {
  return {
    ...raw,
    total: toNumber(raw.total) ?? 0,
    per_page: toNumber(raw.per_page) ?? 12,
    products: raw.products ?? [],
  }
}

function normalizeCategoriesList(raw: WcaCategoriesListResponse): WcaCategoriesListResponse {
  return {
    ...raw,
    total: toNumber(raw.total) ?? 0,
    per_page: toNumber(raw.per_page) ?? 20,
    categories: raw.categories ?? [],
  }
}

export async function getWcaProducts(params?: {
  per_page?: number
  page?: number
  category?: number
  tag?: number
  featured?: boolean
  on_sale?: boolean
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'
  orderby?: 'date' | 'price' | 'rating' | 'popularity'
  order?: 'ASC' | 'DESC'
}): Promise<WcaProductsListResponse> {
  const raw = await fetchJson<WcaProductsListResponse>('wca/v1/products', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      category: params?.category,
      tag: params?.tag,
      featured: params?.featured,
      on_sale: params?.on_sale,
      stock_status: params?.stock_status,
      orderby: params?.orderby,
      order: params?.order,
    },
  })

  return normalizeProductsList(raw)
}

export async function getWcaProduct(id: number, params?: { include_variations?: boolean }): Promise<WcaProduct | null> {
  try {
    return await fetchJson<WcaProduct>(`wca/v1/products/${id}`, {
      query: {
        include_variations: params?.include_variations,
      },
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getWcaRelatedProducts(id: number, params?: { limit?: number }): Promise<WcaRelatedProductsResponse | null> {
  try {
    return await fetchJson<WcaRelatedProductsResponse>(`wca/v1/products/${id}/related`, {
      query: {
        limit: params?.limit,
      },
    })
  } catch (error) {
    console.error('Error fetching related products:', error)
    return null
  }
}

export async function getWcaCategories(params?: {
  per_page?: number
  page?: number
  hide_empty?: boolean
  parent?: number
}): Promise<WcaCategoriesListResponse> {
  const raw = await fetchJson<WcaCategoriesListResponse>('wca/v1/categories', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      hide_empty: params?.hide_empty,
      parent: params?.parent,
    },
  })

  return normalizeCategoriesList(raw)
}

export async function getWcaProductBySlug(slug: string): Promise<WcaProduct | null> {
  // The API doesn't reliably filter by slug via querystring.
  // Best-practice here is to fetch with a high per_page (max 100) and match client-side.
  try {
    const { products } = await getWcaProducts({ per_page: 100, page: 1 })
    const match = (products ?? []).find((p) => p.slug === slug)
    if (!match) return null

    // Fetch full details (and variations if available)
    return await getWcaProduct(match.id, { include_variations: true })
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

export function getWcaPrimaryImageUrl(product: WcaProduct): string | undefined {
  return (
    product.featured_image ||
    product.images?.[0]?.sizes?.large ||
    product.images?.[0]?.sizes?.full ||
    product.images?.[0]?.url
  )
}

export function getWcaCategoryName(product: WcaProduct): string | undefined {
  return product.categories?.[0]?.name
}
