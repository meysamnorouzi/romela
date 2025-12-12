'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { formatToman } from '@/lib/utils/format'
import type { CartItem as CartItemType } from '@/lib/api/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  const handleRemove = () => {
    removeItem(item.id)
  }

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.id, quantity)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-dark-lighter rounded-xl">
      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-dark rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="128px"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <Link
            href={`/products/${item.slug}`}
            className="text-xl font-bold text-white hover:text-gold transition-colors mb-2 block"
          >
            {item.name}
          </Link>
          <div className="text-2xl font-bold text-gold">
            {formatToman(item.price)}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <QuantitySelector
            value={item.quantity}
            onChange={handleQuantityChange}
            stock={item.stock_quantity}
          />
          <div className="text-xl font-bold text-white min-w-[120px] text-left">
            {formatToman(item.price * item.quantity)}
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            aria-label="حذف از سبد"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

