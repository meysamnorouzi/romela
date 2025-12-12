'use client'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  stock?: number | null
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  stock,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    const newValue = value + 1
    if (!max || newValue <= max) {
      if (stock && newValue > stock) {
        onChange(stock)
      } else {
        onChange(newValue)
      }
    }
  }

  const maxValue = stock ? Math.min(max || stock, stock) : max

  return (
    <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-dark-lighter">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className="px-4 py-2 text-white hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || min
          if (newValue >= min && (!maxValue || newValue <= maxValue)) {
            onChange(newValue)
          }
        }}
        min={min}
        max={maxValue}
        className="w-16 text-center bg-transparent text-white border-0 focus:outline-none focus:ring-0"
      />
      <button
        type="button"
        onClick={handleIncrease}
        disabled={maxValue ? value >= maxValue : false}
        className="px-4 py-2 text-white hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  )
}

