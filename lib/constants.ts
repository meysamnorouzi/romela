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
    image: '/images/406618088_4cf1da23-4ada-498f-9987-8e38474b39b9 1.svg',
    description: 'روغن موتور با کیفیت بالا',
  },
  {
    id: 'gearbox-oil',
    title: 'روغن گیربکس',
    image: '/images/image 2.svg',
    description: 'روغن گیربکس فول سینتتیک',
  },
  {
    id: 'industrial-oil',
    title: 'روغن های صنعتی',
    image: '/images/image 8.svg',
    description: 'توربین، کمپرسور، ترانسفورمر، حرارتی، یافت و...',
  },
  {
    id: 'hydraulic-oil',
    title: 'روغن هیدرولیک',
    image: '/images/image 6.svg',
    description: 'روغن هیدرولیک با کیفیت',
  },
  {
    id: 'grease',
    title: 'گریس',
    image: '/images/image 3.svg',
    description: 'گریس صنعتی',
  },
  {
    id: 'brake-fluid',
    title: 'روغن ترمز',
    image: '/images/image 5.svg',
    description: 'روغن ترمز استاندارد',
  },
  {
    id: 'special-additives',
    title: 'افزودنی های خاص',
    image: '/images/image 7.svg',
    description: 'افزودنی های خاص',
  },
] as const

export const STATS = [
  { label: 'مشتریان', value: '+ ۱۰۰۰' },
  { label: 'تنوع محصولات', value: '+ ۱۰۰' },
  { label: 'محصولات صادر شده', value: '+ ۷۱,۰۰۰' },
  { label: 'تعداد فروش', value: '+ ۱۲۰,۰۰۰' },
] as const

