import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/api/wordpress'
import { getProducts } from '@/lib/api/woocommerce'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romela-oil.com'
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = NAVIGATION_ITEMS.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: currentDate,
    changeFrequency: item.href === '/' ? 'daily' : 'weekly',
    priority: item.href === '/' ? 1.0 : 0.8,
  }))

  // Blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = await getPosts({ per_page: 100 })
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Products
  let products: MetadataRoute.Sitemap = []
  try {
    const productList = await getProducts({ per_page: 100 })
    products = productList.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.date_modified),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Additional static pages
  const additionalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...additionalPages, ...blogPosts, ...products]
}
