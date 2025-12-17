import { stripHtml } from './text'

export type ProductVariantRow = {
  name: string
  volume: string
  priceText: string
  imageUrl?: string
}

export function extractVariantsFromFirstHtmlTable(descriptionHtml: string): ProductVariantRow[] {
  if (!descriptionHtml) return []

  // Find first <table>...</table>
  const tableMatch = descriptionHtml.match(/<table[\s\S]*?<\/table>/i)
  if (!tableMatch) return []

  const tableHtml = tableMatch[0]

  // Prefer tbody rows
  const tbodyMatch = tableHtml.match(/<tbody[\s\S]*?<\/tbody>/i)
  const rowsHtml = (tbodyMatch ? tbodyMatch[0] : tableHtml)

  const rowMatches = rowsHtml.match(/<tr[\s\S]*?<\/tr>/gi) || []

  const variants: ProductVariantRow[] = []

  for (const row of rowMatches) {
    const cells = row.match(/<td[\s\S]*?<\/td>/gi) || []
    if (cells.length < 3) continue

    // API table is typically: name | volume | price | image
    const nameHtml = cells[0] || ''
    const volumeHtml = cells[1] || ''
    const priceHtml = cells[2] || ''
    const imageHtml = cells[3] || ''

    const name = stripHtml(nameHtml)
    const volume = stripHtml(volumeHtml)
    const priceText = stripHtml(priceHtml)

    const imgSrcMatch = imageHtml.match(/src\s*=\s*"([^"]+)"/i)
    const imageUrl = imgSrcMatch?.[1]

    if (!name && !volume && !priceText && !imageUrl) continue

    variants.push({ name, volume, priceText, imageUrl })
  }

  return variants
}

export function extractViscosity(text: string): string | null {
  const match = text.match(/\b\d{1,2}W-\d{1,2}\b/i)
  return match ? match[0].toUpperCase() : null
}

export function extractStandard(text: string): string | null {
  // Common patterns like MB 226.1, MB 229.51, API SN, ACEA C3 etc.
  const mb = text.match(/\bMB\s*\d{2,3}(?:\.\d+)?\b/i)
  if (mb) return mb[0].toUpperCase().replace(/\s+/g, ' ')

  const api = text.match(/\bAPI\s*[A-Z]{2}\b/i)
  if (api) return api[0].toUpperCase().replace(/\s+/g, ' ')

  const acea = text.match(/\bACEA\s*[A-Z]\d\b/i)
  if (acea) return acea[0].toUpperCase().replace(/\s+/g, ' ')

  return null
}

export function extractBrands(text: string): string[] {
  const candidates = [
    'Mercedes-Benz',
    'Mercedes',
    'Benz',
    'BMW',
    'MAN',
    'DAF',
    'Volvo',
    'Scania',
    'Renault',
    'Iveco',
    'Cummins',
  ]

  const found = new Set<string>()
  for (const b of candidates) {
    const re = new RegExp(`\\b${b.replace(/[-/\\^$*+?.()|[\\]{}]/g, '\\$&')}\\b`, 'i')
    if (re.test(text)) found.add(b)
  }

  return Array.from(found)
}
