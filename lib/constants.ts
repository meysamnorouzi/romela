export const CONTACT_PHONE = {
  display: '۰۹۱۹ ۹۸۴ ۸۹۴۶',
  href: 'tel:+989199848946',
} as const

export const SOCIAL_LINKS = {
  instagram: {
    label: 'اینستاگرام',
    href: 'https://www.instagram.com/romela_official',
  },
  telegram: {
    label: 'تلگرام',
    href: 'https://t.me/RomelaOfficial',
  },
  whatsapp: {
    label: 'واتساپ',
    href: 'https://wa.me/989004600100',
  },
} as const

export const NAVIGATION_ITEMS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'محصولات', href: '/products' },
  { label: 'مقالات', href: '/blog' },
  { label: 'شرایط فروش', href: '/sales-conditions' },
  { label: 'نمایندگی', href: '/dealers' },
  { label: 'درباره ما', href: '/about-us' },
  { label: 'تماس با ما', href: '/contact-us' },

] as const

export const PRODUCT_CATEGORIES = [
  {
    id: 'engine-oil',
    title: 'روغن موتور',
    image: '/images/category-engine.webp',
    description: 'روغن موتور با کیفیت بالا',
  },
  {
    id: 'gearbox-oil',
    title: 'روغن گیربکس',
    image: '/images/category-gearbox.webp',
    description: 'روغن گیربکس فول سینتتیک',
  },
  {
    id: 'industrial-oil',
    title: 'روغن های صنعتی',
    image: '/images/category-industrial.webp',
    description: 'توربین، کمپرسور، ترانسفورمر، حرارتی، یافت و...',
  },
  {
    id: 'hydraulic-oil',
    title: 'روغن هیدرولیک',
    image: '/images/category-hydraulic.webp',
    description: 'روغن هیدرولیک با کیفیت',
  },
  {
    id: 'grease',
    title: 'گریس',
    image: '/images/category-grease.webp',
    description: 'گریس صنعتی',
  },
  {
    id: 'brake-fluid',
    title: 'روغن ترمز',
    image: '/images/category-brake.webp',
    description: 'روغن ترمز استاندارد',
  },
  {
    id: 'special-additives',
    title: 'افزودنی های خاص',
    image: '/images/category-additives.webp',
    description: 'افزودنی های خاص',
  },
] as const

export const STATS = [
  { label: 'مشتریان', value: '+ ۱۰۰۰' },
  { label: 'تنوع محصولات', value: '+ ۱۰۰' },
  { label: 'محصولات صادر شده', value: '+ ۷۱,۰۰۰' },
  { label: 'تعداد فروش', value: '+ ۱۲۰,۰۰۰' },
] as const

