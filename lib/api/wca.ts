import type { WcaCategory, WcaProduct, WcaProductsListResponse, WcaCategoriesListResponse, WcaRelatedProductsResponse, WcaAttributesListResponse, WcaAttributeTermsResponse } from './types'

const WP_JSON_BASE_URL = (
  process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  'https://admin.padradarasoil.com/wp-json'
).replace(/\/+$/, '')

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

function buildUrl(path: string, query?: Record<string, string | number | boolean | undefined | Array<string | number>>): string {
  const url = new URL(`${WP_JSON_BASE_URL}/${path.replace(/^\/+/, '')}`)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue
      if (Array.isArray(value)) {
        // For arrays, append each value (allows multiple query params with same name)
        for (const item of value) {
          url.searchParams.append(key, String(item))
        }
      } else {
        url.searchParams.set(key, String(value))
      }
    }
  }
  return url.toString()
}

async function fetchJson<T>(
  path: string,
  options?: {
    query?: Record<string, string | number | boolean | undefined | Array<string | number>>
    cache?: RequestCache
  }
): Promise<T> {
  const response = await fetch(buildUrl(path, options?.query), {
    headers: {
      Accept: 'application/json',
    },
    // Use provided cache option or default to no-store for client-side compatibility
    cache: options?.cache ?? 'no-store',
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

// Helper function to check if a category is the uncategorized category
function isUncategorizedCategory(category: { id?: number; name?: string; slug?: string }): boolean {
  // Check by ID (17 is the uncategorized category ID)
  if (category.id === 17) return true
  
  // Check by name
  if (category.name === 'دسته-بندی-نشده') return true
  
  // Check by slug (both decoded and URL-encoded versions)
  if (!category.slug) return false
  
  // Try to decode the slug, but handle cases where it's already decoded
  try {
    const decodedSlug = decodeURIComponent(category.slug)
    if (decodedSlug === 'دسته-بندی-نشده') return true
  } catch {
    // If decoding fails, slug might already be decoded
  }
  
  if (category.slug === 'دسته-بندی-نشده') return true
  
  return false
}

function normalizeCategoriesList(raw: WcaCategoriesListResponse): WcaCategoriesListResponse {
  // Filter out the "دسته-بندی-نشده" (uncategorized) category
  const filteredCategories = (raw.categories ?? []).filter(
    (category) => !isUncategorizedCategory(category)
  )
  
  return {
    ...raw,
    total: toNumber(raw.total) ?? 0,
    per_page: toNumber(raw.per_page) ?? 20,
    categories: filteredCategories,
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
  bestseller?: boolean
  romela_first?: boolean
  attribute_id?: number | number[]
  attribute_term?: number | number[] | Array<number | number[]>
  // Support multiple attribute pairs: [{attribute_id: 1, attribute_term: [73,79]}, {attribute_id: 5, attribute_term: 75}]
  attribute_pairs?: Array<{ attribute_id: number; attribute_term: number | number[] }>
}): Promise<WcaProductsListResponse> {
  const query: Record<string, string | number | boolean | undefined | Array<string | number>> = {
    per_page: params?.per_page,
    page: params?.page,
    category: params?.category,
    tag: params?.tag,
    featured: params?.featured,
    on_sale: params?.on_sale,
    stock_status: params?.stock_status,
    orderby: params?.orderby,
    order: params?.order,
    bestseller: params?.bestseller,
    romela_first: params?.romela_first,
  }

  // Handle multiple attribute pairs (multiple attribute_id/attribute_term combinations)
  if (params?.attribute_pairs && params.attribute_pairs.length > 0) {
    const attributeIds: number[] = []
    const attributeTerms: string[] = []
    
    for (const pair of params.attribute_pairs) {
      attributeIds.push(pair.attribute_id)
      // Convert attribute_term to comma-separated string if array
      if (Array.isArray(pair.attribute_term)) {
        attributeTerms.push(pair.attribute_term.join(','))
      } else {
        attributeTerms.push(String(pair.attribute_term))
      }
    }
    
    query.attribute_id = attributeIds
    query.attribute_term = attributeTerms
  } else if (params?.attribute_id !== undefined && params?.attribute_term !== undefined) {
    // Single attribute_id/attribute_term pair (backward compatibility)
    query.attribute_id = Array.isArray(params.attribute_id) ? params.attribute_id : params.attribute_id
    
    if (Array.isArray(params.attribute_term)) {
      // Multiple terms for single attribute - comma-separated
      query.attribute_term = params.attribute_term.join(',')
    } else {
      query.attribute_term = params.attribute_term
    }
  }

  const raw = await fetchJson<WcaProductsListResponse>('wca/v1/products', { query })

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
  cache?: RequestCache
}): Promise<WcaCategoriesListResponse> {
  const raw = await fetchJson<WcaCategoriesListResponse>('wca/v1/categories', {
    query: {
      per_page: params?.per_page,
      page: params?.page,
      hide_empty: params?.hide_empty,
      parent: params?.parent,
      include_subcategories: true,
      include_all: true,
    },
    cache: params?.cache ?? 'no-store',
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
  // Filter out "دسته-بندی-نشده" (uncategorized) category
  const validCategories = (product.categories ?? []).filter(c => !isUncategorizedCategory(c))
  return validCategories[0]?.name
}

export async function getWcaAttributes(): Promise<WcaAttributesListResponse> {
  const raw = await fetchJson<WcaAttributesListResponse>('wca/v1/attributes', {
    query: {
      include_all: true,
    },
  })
  return {
    ...raw,
    total: toNumber(raw.total) ?? 0,
    attributes: raw.attributes ?? [],
  }
}

export async function getWcaAttributeTerms(attributeId: number): Promise<WcaAttributeTermsResponse | null> {
  try {
    return await fetchJson<WcaAttributeTermsResponse>(`wca/v1/attributes/${attributeId}/terms`, {})
  } catch (error) {
    console.error('Error fetching attribute terms:', error)
    return null
  }
}
