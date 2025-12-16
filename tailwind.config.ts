import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2d2d2d',
          light: '#3a3a3a',
        },
        gold: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        blue: {
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
          light: '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['IranSans', 'Tahoma', 'Arial', 'sans-serif'],
        title: ['IranYekan', 'IranSans', 'Tahoma', 'Arial', 'sans-serif'],
        iransans: ['IranSans', 'Tahoma', 'Arial', 'sans-serif'],
        iranyekan: ['IranYekan', 'IranSans', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

