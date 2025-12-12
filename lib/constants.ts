export const NAVIGATION_ITEMS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'محصولات', href: '/products' },
  { label: 'درباره ما', href: '/about-us' },
  { label: 'تماس با ما', href: '/contact-us' },
  { label: 'شرایط فروش', href: '/شرایط-فروش' },
  { label: 'نمایندگی', href: '/نمایندگی' },
  { label: 'مقالات', href: '/blog' },
] as const

export const PRODUCT_CATEGORIES = [
  {
    id: 'engine-oil',
    title: 'روغن موتور',
    image: '/categories/engine-oil.jpg',
    description: 'روغن موتور با کیفیت بالا',
  },
  {
    id: 'gearbox-oil',
    title: 'روغن گیربکس',
    image: '/categories/gearbox-oil.jpg',
    description: 'روغن گیربکس فول سینتتیک',
  },
  {
    id: 'industrial-oil',
    title: 'روغن های صنعتی',
    image: '/categories/industrial-oil.jpg',
    description: 'توربین، کمپرسور، ترانسفورمر، حرارتی، یافت و...',
  },
  {
    id: 'hydraulic-oil',
    title: 'روغن هیدرولیک',
    image: '/categories/hydraulic-oil.jpg',
    description: 'روغن هیدرولیک با کیفیت',
  },
  {
    id: 'grease',
    title: 'گریس',
    image: '/categories/grease.jpg',
    description: 'گریس صنعتی',
  },
  {
    id: 'brake-fluid',
    title: 'روغن ترمز',
    image: '/categories/brake-fluid.jpg',
    description: 'روغن ترمز استاندارد',
  },
  {
    id: 'special-additives',
    title: 'افزودنی های خاص',
    image: '/categories/additives.jpg',
    description: 'افزودنی های خاص',
  },
] as const

export const STATS = [
  { label: 'مشتریان', value: '+ ۱۰۰۰' },
  { label: 'تنوع محصولات', value: '+ ۱۰۰' },
  { label: 'محصولات صادر شده', value: '+ ۷۱,۰۰۰' },
  { label: 'تعداد فروش', value: '+ ۱۲۰,۰۰۰' },
] as const

