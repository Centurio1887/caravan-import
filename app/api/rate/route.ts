import { NextResponse } from 'next/server'

// Server-side proxy for the live JPY exchange rate.
// Fetching from the client directly against a third-party currency API is
// unreliable in production (CORS restrictions / blocked cross-origin egress),
// which is why the live rate fell back to the static value on the live site.
// Routing the call through our own origin avoids CORS entirely and keeps the
// upstream request server-to-server.

export const revalidate = 3600 // cache upstream result for 1 hour

export async function GET() {
  try {
    const upstream = await fetch(
      'https://api.frankfurter.app/latest?from=EUR&to=JPY',
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 3600 },
      },
    )

    if (!upstream.ok) {
      throw new Error(`Upstream responded with ${upstream.status}`)
    }

    const data = (await upstream.json()) as {
      rates?: { JPY?: number }
      date?: string
    }

    const jpy = data?.rates?.JPY
    if (typeof jpy !== 'number' || !Number.isFinite(jpy) || jpy <= 0) {
      throw new Error('Upstream did not return a valid JPY rate')
    }

    return NextResponse.json(
      { rates: { JPY: jpy }, date: data.date ?? null },
      { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } },
    )
  } catch (error) {
    console.log('[v0] rate route failed:', (error as Error).message)
    return NextResponse.json({ error: 'rate_unavailable' }, { status: 502 })
  }
}
