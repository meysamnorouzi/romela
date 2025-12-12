export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
  }).format(numPrice)
}

export function formatToman(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return `${new Intl.NumberFormat('fa-IR').format(numPrice)} تومان`
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

