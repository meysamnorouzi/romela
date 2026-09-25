import type {
  PsgGuideResultsResponse,
  PsgListResponse,
} from './types'

const WP_JSON_BASE_URL = (
  process.env.NEXT_PUBLIC_WP_JSON_BASE_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  'https://admin.padradarasoil.com/wp-json'
).replace(/\/+$/, '')

function buildUrl(
  path: string,
  query?: Record<string, string | undefined>
): string {
  const url = new URL(`${WP_JSON_BASE_URL}/${path.replace(/^\/+/, '')}`)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value)
      }
    }
  }
  return url.toString()
}

async function fetchPsg<T>(
  endpoint: string,
  query?: Record<string, string | undefined>
): Promise<T> {
  const response = await fetch(buildUrl(`wca/v1/selection-guide/${endpoint}`, query), {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error(`Selection guide request failed (${response.status})`)
  }
  return response.json() as Promise<T>
}

export async function getPsgVehicleTypes(): Promise<string[]> {
  const data = await fetchPsg<PsgListResponse>('vehicle-types')
  return data.items ?? []
}

export async function getPsgBrands(vehicleType: string): Promise<string[]> {
  const data = await fetchPsg<PsgListResponse>('brands', { vehicle_type: vehicleType })
  return data.items ?? []
}

export async function getPsgModels(vehicleType: string, brand: string): Promise<string[]> {
  const data = await fetchPsg<PsgListResponse>('models', {
    vehicle_type: vehicleType,
    brand,
  })
  return data.items ?? []
}

export async function getPsgYears(
  vehicleType: string,
  brand: string,
  model: string
): Promise<string[]> {
  const data = await fetchPsg<PsgListResponse>('years', {
    vehicle_type: vehicleType,
    brand,
    model,
  })
  return data.items ?? []
}

export async function getPsgResults(
  vehicleType: string,
  brand: string,
  model: string,
  year: string
): Promise<PsgGuideResultsResponse> {
  return fetchPsg<PsgGuideResultsResponse>('results', {
    vehicle_type: vehicleType,
    brand,
    model,
    year,
  })
}
