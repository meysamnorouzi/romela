'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import type { WooCommerceProduct } from '@/lib/api/types'

interface AddToCartButtonProps {
  product: WooCommerceProduct
  quantity?: number
}

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price || '0'),
      quantity,
      image: product.images?.[0]?.src || '/placeholder-product.jpg',
      slug: product.slug,
      stock_quantity: product.stock_quantity,
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleAddToCart}
      disabled={isAdding || product.stock_status !== 'instock'}
      className="flex-1"
    >
      {isAdding ? 'در حال افزودن...' : 'افزودن به سبد'}
    </Button>
  )
}

