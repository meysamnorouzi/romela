'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api/woocommerce'
import type { WooCommerceProduct } from '@/lib/api/types'

export function useProducts(params?: {
  per_page?: number
  page?: number
  category?: number
  search?: string
  featured?: boolean
}) {
  const [products, setProducts] = useState<WooCommerceProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts(params)
        setProducts(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [params?.category, params?.search, params?.featured, params?.page])

  return { products, loading, error }
}

