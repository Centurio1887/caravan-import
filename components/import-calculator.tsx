'use client'

import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { Check, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CostRow } from '@/components/cost-row'
import { NumberField } from '@/components/number-field'

const DUTY_RATE = 0.035
const VAT_RATE = 0.19
const HANDLING_FEE = 10
const DEFAULT_RATE = 160

function eur(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function toNumber(value: string) {
  const parsed = Number.parseFloat(value.replace(',', '.'))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

type RateResponse = { rates?: { JPY?: number }; date?: string }

const fetcher = (url: string): Promise<RateResponse> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Kurs konnte nicht geladen werden')
    return res.json()
  })

export function ImportCalculator() {
  const [partPrice, setPartPrice] = useState('')
  const [shipping, setShipping] = useState('0')
  const [rate, setRate] = useState(String(DEFAULT_RATE))
  const [editRate, setEditRate] = useState(false)
  const [rateEdited, setRateEdited] = useState(false)
  const [comparison, setComparison] = useState('')

  const { data: liveRate } = useSWR<RateResponse>(
    'https://api.frankfurter.dev/v1/latest?from=EUR&to=JPY',
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

  const liveJpy = liveRate?.rates?.JPY
  const liveLoaded = typeof liveJpy === 'number' && liveJpy > 0

  // Apply the live rate once on load, unless the user has manually edited it.
  useEffect(() => {
    if (liveLoaded && !rateEdited) {
      setRate(String(Math.round(liveJpy as number)))
    }
  }, [liveLoaded, liveJpy, rateEdited])

  const liveDate = liveRate?.date
    ? new Date(liveRate.date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  const result = useMemo(() => {
    const exchangeRate = toNumber(rate) || DEFAULT_RATE
    const yenTotal = toNumber(partPrice) + toNumber(shipping)
    const base = yenTotal / exchangeRate
    const duty = base * DUTY_RATE
    const vat = (base + duty) * VAT_RATE
    const total = base + duty + vat + HANDLING_FEE

    return { exchangeRate, yenTotal, base, duty, vat, total }
  }, [partPrice, shipping, rate])

  const hasInput = toNumber(partPrice) > 0
  const comparePrice = toNumber(comparison)
  const savings = comparePrice - result.total
  const cheaperInJapan = savings > 0
  const savingsPercent =
    comparePrice > 0 ? Math.round((Math.abs(savings) / comparePrice) * 100) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Eingaben */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          1. Deine Angaben
        </h2>

        <div className="mt-5 flex flex-col gap-5">
          <NumberField
            id="part-price"
            label="Teilepreis in Japan (Yen ¥)"
            prefix="¥"
            placeholder="z. B. 24000"
            value={partPrice}
            onChange={setPartPrice}
            size="lg"
          />
          <NumberField
            id="shipping"
            label="Geschätzte Versandkosten (Yen ¥)"
            prefix="¥"
            placeholder="0"
            value={shipping}
            onChange={setShipping}
          />

          <div className="flex flex-col gap-2">
            {liveLoaded && !rateEdited ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                Live-Wechselkurs geladen{liveDate ? ` · Stand ${liveDate}` : ''}
              </span>
            ) : rateEdited ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
                Eigener Wechselkurs aktiv
              </span>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary px-4 py-3">
            {editRate ? (
              <div className="flex flex-1 items-center gap-2">
                <label htmlFor="rate" className="text-sm font-medium text-secondary-foreground">
                  1 EUR =
                </label>
                <input
                  id="rate"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  value={rate}
                  onChange={(event) => {
                    setRate(event.target.value)
                    setRateEdited(true)
                  }}
                  className="w-24 rounded-lg border border-input bg-card px-3 py-1.5 font-mono text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm font-medium text-secondary-foreground">JPY</span>
              </div>
            ) : (
              <p className="text-sm text-secondary-foreground">
                Wechselkurs:{' '}
                <span className="font-mono font-semibold">
                  1 EUR = {result.exchangeRate} JPY
                </span>
              </p>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditRate((open) => !open)}
              className="gap-1.5 text-primary hover:text-primary"
            >
              {editRate ? (
                <>
                  <Check className="size-4" aria-hidden="true" /> Fertig
                </>
              ) : (
                <>
                  <Pencil className="size-4" aria-hidden="true" /> Kurs ändern
                </>
              )}
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Aufschlüsselung */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          2. So setzt sich der Preis zusammen
        </h2>

        <div className="mt-4 divide-y divide-border">
          <CostRow
            label="Umgerechneter Preis"
            hint={`${result.yenTotal.toLocaleString('de-DE')} ¥ ÷ ${result.exchangeRate}`}
            value={eur(result.base)}
          />
          <CostRow
            label="Geschätzter Zoll"
            hint="ca. 3,5 % auf den Warenwert"
            value={eur(result.duty)}
          />
          <CostRow
            label="Einfuhrumsatzsteuer"
            hint="19 % auf Warenwert + Zoll"
            value={eur(result.vat)}
          />
          <CostRow
            label="Paketdienst-Abwicklungsgebühr"
            hint="Pauschal"
            value={eur(HANDLING_FEE)}
          />
        </div>

      </section>

      {/* Ergebnis-Highlight */}
      <section className="rounded-3xl border-2 border-success bg-card p-6 shadow-lg shadow-success/10 sm:p-9">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-success" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-widest text-success">
            Gesamtkosten frei Haus
          </p>
        </div>
        <p className="mt-4 font-mono text-5xl font-bold tabular-nums text-foreground sm:text-6xl">
          {eur(hasInput ? result.total : 0)}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {hasInput
            ? 'Das zahlst du am Ende insgesamt – Teil, Versand, Zoll, Steuer und Gebühr zusammen. Keine bösen Überraschungen mehr.'
            : 'Gib oben den Teilepreis ein, dann rechnen wir sofort.'}
        </p>
      </section>

      {/* Vergleich */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          3. Lohnt sich das überhaupt?
        </h2>

        <div className="mt-5">
          <NumberField
            id="comparison"
            label="Vergleichspreis in Deutschland (€)"
            prefix="€"
            placeholder="z. B. 249"
            value={comparison}
            onChange={setComparison}
          />
        </div>

        {hasInput && comparePrice > 0 ? (
          <div
            className={`mt-5 flex items-start gap-4 rounded-2xl border-2 px-5 py-6 sm:px-7 ${
              cheaperInJapan
                ? 'border-success bg-success/10'
                : 'border-destructive bg-destructive/10'
            }`}
          >
            <span className="mt-0.5 text-2xl leading-none" aria-hidden="true">
              {cheaperInJapan ? '🟢' : '🔴'}
            </span>
            <div>
              <p
                className={`text-xl font-bold leading-snug text-balance sm:text-2xl ${
                  cheaperInJapan ? 'text-success' : 'text-destructive'
                }`}
              >
                {cheaperInJapan
                  ? `Du sparst ${eur(savings)} (${savingsPercent}%) gegenüber dem Kauf in Deutschland!`
                  : `Kauf in Deutschland ist ${eur(Math.abs(savings))} günstiger.`}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cheaperInJapan
                  ? `Import: ${eur(result.total)} statt ${eur(comparePrice)} in Deutschland.`
                  : `Import: ${eur(result.total)} gegenüber ${eur(comparePrice)} hier vor Ort.`}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Trage einen deutschen Preis ein – wir sagen dir direkt, ob der Import
            günstiger ist.
          </p>
        )}
      </section>
    </div>
  )
}
