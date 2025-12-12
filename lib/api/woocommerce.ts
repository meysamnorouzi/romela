import type { WooCommerceProduct, WooCommerceCategory } from './types'

const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://your-site.com/wp-json/wc/v3'
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || ''

function getAuthHeader(): string {
  if (CONSUMER_KEY && CONSUMER_SECRET) {
    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
    return `Basic ${credentials}`
  }
  return ''
}

export async function getProducts(params?: {
  per_page?: number
  page?: number
  category?: number
  search?: string
  featured?: boolean
}): Promise<WooCommerceProduct[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.category) queryParams.append('category', params.category.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString())

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (CONSUMER_KEY && CONSUMER_SECRET) {
      headers['Authorization'] = getAuthHeader()
    }

    const response = await fetch(
      `${WOOCOMMERCE_URL}/products?${queryParams.toString()}`,
      {
        headers,
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(slug: string): Promise<WooCommerceProduct | null> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (CONSUMER_KEY && CONSUMER_SECRET) {
      headers['Authorization'] = getAuthHeader()
    }

    const response = await fetch(
      `${WOOCOMMERCE_URL}/products?slug=${slug}`,
      {
        headers,
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }

    const products: WooCommerceProduct[] = await response.json()
    return products[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategories(): Promise<WooCommerceCategory[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (CONSUMER_KEY && CONSUMER_SECRET) {
      headers['Authorization'] = getAuthHeader()
    }

    const response = await fetch(
      `${WOOCOMMERCE_URL}/products/categories`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

