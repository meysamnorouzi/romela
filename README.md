# Romela Oil Germany - Next.js Headless Frontend

A pixel-perfect Next.js 14+ headless frontend for Romela Oil Germany, built with TypeScript, Tailwind CSS 4, and RTL support for Persian language.

## Features

- 🎨 Pixel-perfect design matching the provided designs
- 🌐 Full RTL (Right-to-Left) support for Persian language
- 🛒 Complete e-commerce functionality with cart and checkout
- 📱 Fully responsive design
- 🔌 WordPress REST API integration
- 🛍️ WooCommerce REST API integration
- 📝 Blog functionality
- 🎯 TypeScript for type safety
- ⚡ Next.js 14+ with App Router
- 🎨 Tailwind CSS 4

## Pages

- **Home** (`/`) - Hero section, categories, products, statistics
- **Products** (`/products`) - Product listing with categories
- **Product Detail** (`/products/[slug]`) - Complete product page with variations, specs, gallery
- **Blog** (`/blog`) - Blog listing and detail pages
- **Contact Us** (`/contact-us`) - Contact form and information
- **About Us** (`/about-us`) - Company information
- **Dealership** (`/نمایندگی`) - Dealership information
- **Sales Conditions** (`/شرایط-فروش`) - Terms and conditions
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Checkout process

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd romela
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your WordPress and WooCommerce API credentials:
```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com/wp-json/wc/v3
WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production version:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
romela/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with RTL
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── blog/              # Blog pages
│   ├── cart/              # Cart page
│   └── checkout/          # Checkout page
├── components/            # React components
│   ├── layout/           # Header, Footer, Breadcrumbs
│   ├── home/            # Homepage components
│   ├── product/         # Product components
│   ├── cart/            # Cart components
│   └── ui/              # Reusable UI components
├── lib/                  # Utilities and API clients
│   ├── api/             # WordPress & WooCommerce API
│   └── utils/           # Helper functions
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── public/              # Static assets
```

## API Integration

### WordPress REST API

The app connects to WordPress REST API for:
- Blog posts (`/wp-json/wp/v2/posts`)
- Pages (`/wp-json/wp/v2/pages`)

### WooCommerce REST API

The app connects to WooCommerce REST API for:
- Products (`/wp-json/wc/v3/products`)
- Categories (`/wp-json/wc/v3/products/categories`)

Make sure to enable REST API in your WordPress/WooCommerce installation and generate API keys.

## Cart Management

Cart state is managed using Zustand and persisted in localStorage. The cart includes:
- Add/remove items
- Update quantities
- Calculate totals
- Persist across sessions

## Design System

### Colors
- **Dark backgrounds**: `#1a1a1a` to `#2d2d2d`
- **Gold accents**: `#f59e0b`, `#d97706`
- **Blue accents**: `#3b82f6`, `#1e40af`
- **White text**: `#ffffff`
- **Gray text**: `#9ca3af`

### Typography
- **Font**: Vazir (Persian font)
- **Headings**: Bold, white
- **Body**: Regular weight, light gray/white

## Technologies

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Swiper** - Carousels
- **WordPress REST API** - Content management
- **WooCommerce REST API** - E-commerce

## License

This project is private and proprietary.

## Support

For support, contact the development team or refer to the documentation.
