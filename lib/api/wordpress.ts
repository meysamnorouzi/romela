import type { WordPressPost } from './types'

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-site.com'

export async function getPosts(params?: {
  per_page?: number
  page?: number
  categories?: number[]
  search?: string
}): Promise<WordPressPost[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.categories) queryParams.append('categories', params.categories.join(','))
    if (params?.search) queryParams.append('search', params.search)

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/posts?${queryParams.toString()}`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }

    const posts: WordPressPost[] = await response.json()
    return posts[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPage(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${slug}`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch page')
    }

    const pages: WordPressPost[] = await response.json()
    return pages[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

