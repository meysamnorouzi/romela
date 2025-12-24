'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
  isVisible: boolean
}

export function Toast({ message, type = 'success', duration = 5000, onClose, isVisible }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setTimeout(() => onClose?.(), 300) // Wait for animation to complete
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!shouldRender) return null

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.6667 5L7.50004 14.1667L3.33337 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 5L15 15M15 5L5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 13.3333V10M10 6.66667H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39765 18.3333 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  }

  const styles = {
    success: {
      bg: 'bg-[#E6A81699]',
      border: 'border-[#F9BD65]',
      text: 'text-[#fcfbee]',
      icon: 'text-[#fcfbee]',
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: 'text-red-400',
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      icon: 'text-blue-400',
    },
  }

  const style = styles[type]

  return (
    <div
      className={cn(
        'fixed top-8 right-4 sm:right-6 md:right-8 z-50 transition-all duration-300',
        isVisible && shouldRender ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg min-w-[320px] max-w-md border-2',
          style.bg,
          style.border
        )}
        style={{
          backdropFilter: 'blur(39px) saturate(180%)',
          WebkitBackdropFilter: 'blur(39px) saturate(180%)',
        }}
      >
        <div className={cn('flex-shrink-0', style.icon)}>{icons[type]}</div>
        <p className={cn('text-right flex-1 font-iranyekan font-bold text-sm sm:text-base', style.text)}>
          {message}
        </p>
        <button
          onClick={() => {
            setShouldRender(false)
            setTimeout(() => onClose?.(), 300)
          }}
          className={cn('flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors', style.icon)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

