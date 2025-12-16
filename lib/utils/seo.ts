/**
 * SEO utility functions for structured data (JSON-LD)
 */

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo?: string
  description?: string
  contactPoint?: {
    '@type': string
    telephone?: string
    contactType: string
    areaServed?: string
    availableLanguage?: string[]
  }
  sameAs?: string[]
}

export interface WebSiteSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  description?: string
  potentialAction?: {
    '@type': string
    target: {
      '@type': string
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface BreadcrumbSchema {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

export interface ProductSchema {
  '@context': string
  '@type': string
  name: string
  description?: string
  image?: string | string[]
  brand?: {
    '@type': string
    name: string
  }
  offers?: {
    '@type': string
    priceCurrency: string
    price: string
    availability?: string
    url?: string
  }
  sku?: string
  mpn?: string
}

export interface ArticleSchema {
  '@context': string
  '@type': string
  headline: string
  description?: string
  image?: string | string[]
  datePublished?: string
  dateModified?: string
  author?: {
    '@type': string
    name: string
  }
  publisher?: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romela-oil.com'

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Romela Oil Germany',
    url: baseUrl,
    logo: `${baseUrl}/images/romela new logo 4.svg`,
    description: 'نمایندگی رسمی محصولات Romela Oil Germany',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'IR',
      availableLanguage: ['fa', 'en'],
    },
    sameAs: [
      // Add social media links when available
      // 'https://www.facebook.com/romela-oil',
      // 'https://www.instagram.com/romela-oil',
      // 'https://www.linkedin.com/company/romela-oil',
    ],
  }
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Romela Oil Germany',
    url: baseUrl,
    description: 'نمایندگی رسمی محصولات Romela Oil Germany',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${baseUrl}${item.url}` }),
    })),
  }
}

/**
 * Generate Product structured data
 */
export function generateProductSchema(product: {
  name: string
  description?: string
  image?: string | string[]
  price?: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  sku?: string
  brand?: string
}): ProductSchema {
  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(product.description && { description: product.description }),
    ...(product.image && {
      image: Array.isArray(product.image)
        ? product.image.map((img) => (img.startsWith('http') ? img : `${baseUrl}${img}`))
        : product.image.startsWith('http')
          ? product.image
          : `${baseUrl}${product.image}`,
    }),
    ...(product.brand && {
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
    }),
    ...(product.sku && { sku: product.sku }),
  }

  if (product.price && product.currency) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price.toString(),
      ...(product.availability && { availability: `https://schema.org/${product.availability}` }),
      url: baseUrl,
    }
  }

  return schema
}

/**
 * Generate Article structured data
 */
export function generateArticleSchema(article: {
  headline: string
  description?: string
  image?: string | string[]
  datePublished?: string
  dateModified?: string
  author?: string
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    ...(article.description && { description: article.description }),
    ...(article.image && {
      image: Array.isArray(article.image)
        ? article.image.map((img) => (img.startsWith('http') ? img : `${baseUrl}${img}`))
        : article.image.startsWith('http')
          ? article.image
          : `${baseUrl}${article.image}`,
    }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.author && {
      author: {
        '@type': 'Person',
        name: article.author,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Romela Oil Germany',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/romela new logo 4.svg`,
      },
    },
  }
}
