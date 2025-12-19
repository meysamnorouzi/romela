export interface WordPressPost {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: Record<string, unknown>
  categories: number[]
  tags: number[]
  _links: Record<string, unknown>
}

// Romela Website (custom) API - Blog
export interface WebsitePostAuthor {
  id: number | string
  name: string
  nicename: string
}

export interface WebsitePostThumbnail {
  medium?: string
  large?: string
  full?: string
}

export interface WebsiteTerm {
  id: number
  name: string
  slug: string
  description?: string
  link?: string
  count?: number
}

export interface WebsitePost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author?: WebsitePostAuthor
  date?: string
  date_full?: string
  date_unix?: number
  modified_date?: string
  link?: string
  thumbnail?: WebsitePostThumbnail
  categories?: WebsiteTerm[]
  category_names?: string[]
  tags?: WebsiteTerm[]
  tag_names?: string[]
  comment_count?: number
}

export interface WebsitePostsListResponse {
  total: number | string
  page: number
  per_page: number | string
  posts: WebsitePost[]
}

export interface WebsitePostsSearchResponse {
  query: string
  total: number | string
  page: number
  per_page: number | string
  posts: WebsitePost[]
}

export interface WebsiteTermsListResponse {
  total: number | string
  page: number
  per_page: number | string
  categories?: WebsiteTerm[]
  tags?: WebsiteTerm[]
}

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_to: string | null
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: unknown[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  }>
  attributes: Array<{
    id: number
    name: string
    slug: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }>
  default_attributes: unknown[]
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: Array<{
    id: number
    key: string
    value: unknown
  }>
  _links: Record<string, unknown>
}

export interface WooCommerceCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: {
    id: number
    src: string
    name: string
    alt: string
  } | null
  menu_order: number
  count: number
  _links: Record<string, unknown>
}

// Romela Website (custom) API - WooCommerce (wca/v1)
export interface WcaImageSizes {
  thumbnail?: string
  medium?: string
  medium_large?: string
  large?: string
  full?: string
}

export interface WcaImage {
  id: number | string
  url: string
  alt: string
  title: string
  sizes?: WcaImageSizes
}

export interface WcaCategory {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
  link?: string
  image?: string
  parent?: number
  display?: string | null
}

export interface WcaProductMeta {
  title?: string
  description?: string
  keywords?: string
  og_title?: string
  og_description?: string
  og_image?: string
  [key: string]: unknown
}

export interface WcaProduct {
  id: number
  name: string
  slug: string
  permalink?: string
  sku?: string
  type?: string
  status?: string
  featured?: boolean
  catalog_visibility?: string
  description?: string
  short_description?: string
  price?: string
  regular_price?: string
  sale_price?: string
  price_html?: string
  on_sale?: boolean
  purchasable?: boolean
  in_stock?: boolean
  stock_status?: string
  stock_quantity?: number | null
  manage_stock?: boolean
  weight?: string
  length?: string
  width?: string
  height?: string
  date_created?: string
  date_modified?: string
  images?: WcaImage[]
  featured_image?: string
  categories?: WcaCategory[]
  tags?: Array<{ id: number; name: string; slug: string }>
  attributes?: unknown[]
  meta?: WcaProductMeta
  related_ids?: Array<number | string>
  variations?: unknown[]
}

export interface WcaProductsListResponse {
  total: number | string
  page: number
  per_page: number | string
  products: WcaProduct[]
}

export interface WcaCategoriesListResponse {
  total: number | string
  page: number
  per_page: number | string
  categories: WcaCategory[]
}

export interface WcaRelatedProductsResponse {
  product_id: number
  related_products: WcaProduct[]
}

export interface WcaAttribute {
  id: number
  name: string
  label: string
  type: string
  orderby: string
  public: number
}

export interface WcaAttributeTerm {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
}

export interface WcaAttributesListResponse {
  total: number | string
  attributes: WcaAttribute[]
}

export interface WcaAttributeTermsResponse {
  attribute: {
    id: number
    name: string
    label: string
  }
  terms: WcaAttributeTerm[]
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  slug: string
  stock_quantity?: number | null
}

