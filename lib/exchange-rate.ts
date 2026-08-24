export const DEFAULT_RATE = 160

export type ExchangeRate = {
  /** How many JPY one EUR buys (e.g. 160). */
  jpyPerEur: number
  /** ISO date of the upstream quote, or null when the live fetch failed. */
  date: string | null
  /** true when the value came from the live API, false when it is the fallback. */
  live: boolean
}

/**
 * Fetches the live JPY exchange rate server-side.
 *
 * Runs on the server (Server Component / build + ISR), so there is no
 * client-side CORS or cross-origin egress issue that caused the live site to
 * fall back to the static value. The response is cached and revalidated hourly.
 *
 * Frankfurter is queried with from=JPY&to=EUR, which yields EUR-per-1-JPY; we
 * invert it to the "1 EUR = X JPY" figure the calculator displays.
 */
export async function getExchangeRate(): Promise<ExchangeRate> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=JPY&to=EUR', {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`Upstream responded with ${res.status}`)

    const data = (await res.json()) as { rates?: { EUR?: number }; date?: string }
    const eurPerJpy = data?.rates?.EUR

    if (typeof eurPerJpy !== 'number' || !Number.isFinite(eurPerJpy) || eurPerJpy <= 0) {
      throw new Error('Upstream did not return a valid EUR rate')
    }

    return {
      jpyPerEur: Math.round(1 / eurPerJpy),
      date: data.date ?? null,
      live: true,
    }
  } catch (error) {
    console.log('[v0] getExchangeRate failed, using fallback:', (error as Error).message)
    return { jpyPerEur: DEFAULT_RATE, date: null, live: false }
  }
}
