const MAX_CONCURRENT = 3
let active = 0
const waiters: Array<() => void> = []

function schedule<T>(task: () => Promise<T>): Promise<T> {
  if (typeof window !== 'undefined') return task()

  return new Promise((resolve, reject) => {
    const start = () => {
      active += 1
      task().then(resolve, reject).finally(() => {
        active -= 1
        const next = waiters.shift()
        if (next) next()
      })
    }

    if (active < MAX_CONCURRENT) start()
    else waiters.push(start)
  })
}

function isRetryable(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const message = error instanceof Error ? error.message : ''
  const cause = 'cause' in error ? (error as { cause?: { code?: string } }).cause : undefined
  const code = cause?.code || ''
  return (
    code === 'UND_ERR_SOCKET' ||
    code === 'ECONNRESET' ||
    code === 'ETIMEDOUT' ||
    message.includes('fetch failed') ||
    message.includes('other side closed')
  )
}

export async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  return schedule(async () => {
    let lastError: unknown
    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        const response = await fetch(url, init)
        if (response.status >= 500 && attempt < 4) {
          lastError = new Error(`Request failed (${response.status})`)
        } else {
          return response
        }
      } catch (error) {
        lastError = error
        if (!isRetryable(error) && attempt > 0) throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt))
    }
    throw lastError
  })
}
