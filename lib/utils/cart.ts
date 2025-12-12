import type { CartItem } from '../api/types'

export function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const cart = localStorage.getItem('romela_cart')
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('romela_cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0)
}

