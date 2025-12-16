# SEO Configuration Guide

This document outlines the SEO optimizations implemented for the Romela Oil Germany website.

## Files Created

### 1. `app/robots.ts`
- Generates `robots.txt` dynamically
- Allows all search engines to crawl the site
- Blocks access to API routes, admin areas, and Next.js internal files
- Includes specific rules for Googlebot and Bingbot
- References the sitemap location

**Access:** `https://your-domain.com/robots.txt`

### 2. `app/sitemap.ts`
- Generates `sitemap.xml` dynamically
- Includes all static pages from navigation
- Automatically includes blog posts from WordPress
- Automatically includes products from WooCommerce
- Sets appropriate priorities and change frequencies

**Access:** `https://your-domain.com/sitemap.xml`

### 3. Enhanced `app/layout.tsx`
- Comprehensive metadata including:
  - Title templates
  - Descriptions and keywords
  - Open Graph tags for social media sharing
  - Twitter Card metadata
  - Robot directives
  - Canonical URLs
  - Language alternates

### 4. `lib/utils/seo.ts`
Utility functions for generating structured data (JSON-LD):
- `generateOrganizationSchema()` - Organization information
- `generateWebSiteSchema()` - Website with search functionality
- `generateBreadcrumbSchema()` - Breadcrumb navigation
- `generateProductSchema()` - Product information
- `generateArticleSchema()` - Blog post/article information

### 5. `public/humans.txt`
- Human-readable information about the site
- Team information and credits

**Access:** `https://your-domain.com/humans.txt`

### 6. `public/manifest.json`
- Web app manifest for PWA support
- Defines app name, icons, theme colors
- RTL support for Persian language

**Access:** `https://your-domain.com/manifest.json`

## Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This is used for:
- Generating absolute URLs in sitemap
- Open Graph images
- Canonical URLs
- Structured data

## Usage Examples

### Adding Structured Data to a Product Page

```tsx
import { generateProductSchema } from '@/lib/utils/seo'

export default function ProductPage({ product }) {
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.images,
    price: product.price,
    currency: 'IRR',
    availability: product.in_stock ? 'InStock' : 'OutOfStock',
    sku: product.sku,
    brand: 'Romela Oil',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {/* Your product page content */}
    </>
  )
}
```

### Adding Structured Data to a Blog Post

```tsx
import { generateArticleSchema } from '@/lib/utils/seo'

export default function BlogPostPage({ post }) {
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image,
    datePublished: post.date,
    dateModified: post.modified,
    author: post.author,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {/* Your blog post content */}
    </>
  )
}
```

### Adding Breadcrumbs

```tsx
import { generateBreadcrumbSchema } from '@/lib/utils/seo'

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'صفحه اصلی', url: '/' },
    { name: 'محصولات', url: '/products' },
    { name: 'روغن موتور', url: '/products/engine-oil' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Your page content */}
    </>
  )
}
```

## Google Search Console Setup

1. **Verify Ownership:**
   - Add verification meta tag to `app/layout.tsx` in the `verification` object
   - Or use DNS verification

2. **Submit Sitemap:**
   - Go to Google Search Console
   - Navigate to Sitemaps
   - Submit: `https://your-domain.com/sitemap.xml`

3. **Test Robots.txt:**
   - Use Google Search Console's robots.txt Tester
   - Verify all important pages are accessible

## Bing Webmaster Tools

1. **Submit Sitemap:**
   - Add your sitemap URL: `https://your-domain.com/sitemap.xml`

2. **Verify Site:**
   - Add verification meta tag similar to Google

## Best Practices

1. **Keep Sitemap Updated:**
   - The sitemap is generated dynamically
   - Ensure WordPress and WooCommerce APIs are accessible
   - Monitor for errors in production

2. **Monitor Crawl Errors:**
   - Regularly check Google Search Console for crawl errors
   - Fix any 404 errors or blocked resources

3. **Optimize Images:**
   - Use Next.js Image component for automatic optimization
   - Add proper alt text to all images
   - Use descriptive filenames

4. **Page Speed:**
   - Optimize images and assets
   - Use Next.js built-in optimizations
   - Monitor Core Web Vitals

5. **Content Quality:**
   - Write unique, valuable content
   - Use proper heading hierarchy (H1, H2, H3)
   - Include relevant keywords naturally

## Testing

### Test Robots.txt
```bash
curl https://your-domain.com/robots.txt
```

### Test Sitemap
```bash
curl https://your-domain.com/sitemap.xml
```

### Validate Structured Data
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Use [Schema.org Validator](https://validator.schema.org/)

### Check Meta Tags
- Use browser dev tools
- Use [Open Graph Debugger](https://www.opengraph.xyz/)
- Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Notes

- The sitemap automatically includes up to 100 blog posts and 100 products
- For larger sites, implement pagination in the sitemap
- All URLs use the `NEXT_PUBLIC_SITE_URL` environment variable
- Structured data is added to the homepage automatically
- Add structured data to product and blog pages as shown in examples
